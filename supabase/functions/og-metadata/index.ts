import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const siteUrl = "https://sportandbodyterapia.org";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: article, error } = await supabase
    .from("articles")
    .select("title_sk, excerpt_sk, image, slug")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !article) {
    // Fallback to site defaults
    return new Response(buildHtml({
      title: "Šport & Body Terapia - Fyzioterapia Dubnica nad Váhom",
      description: "Profesionálna fyzioterapia v Dubnici nad Váhom. André Heynes - 25+ rokov skúseností.",
      image: `${siteUrl}/og-default.png`,
      url: siteUrl,
      redirectUrl: siteUrl,
    }), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const ogImage = article.image && article.image.startsWith("/")
    ? `${siteUrl}${article.image}`
    : `${siteUrl}/og-default.png`;

  const articleUrl = `${siteUrl}/article/${article.slug}`;

  return new Response(buildHtml({
    title: article.title_sk,
    description: article.excerpt_sk,
    image: ogImage,
    url: articleUrl,
    redirectUrl: articleUrl,
  }), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
});

function buildHtml(meta: {
  title: string;
  description: string;
  image: string;
  url: string;
  redirectUrl: string;
}): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="sk">
<head>
  <meta charset="utf-8" />
  <title>${esc(meta.title)}</title>
  <meta name="description" content="${esc(meta.description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(meta.title)}" />
  <meta property="og:description" content="${esc(meta.description)}" />
  <meta property="og:image" content="${esc(meta.image)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${esc(meta.url)}" />
  <meta property="og:site_name" content="Šport &amp; Body Terapia" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(meta.title)}" />
  <meta name="twitter:description" content="${esc(meta.description)}" />
  <meta name="twitter:image" content="${esc(meta.image)}" />
  <script>window.location.replace("${esc(meta.redirectUrl)}");</script>
</head>
<body>
  <p>Redirecting to <a href="${esc(meta.redirectUrl)}">${esc(meta.title)}</a>...</p>
</body>
</html>`;
}
