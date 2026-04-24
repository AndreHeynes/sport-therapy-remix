import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const siteUrl = "https://sportandbodyterapia.org";

function resolveImage(image: string | null | undefined): string {
  if (!image) return `${siteUrl}/og-default.png`;
  if (image.startsWith("http")) return image;
  return `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;
}

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
    return new Response(buildHtml({
      title: "Šport & Body Terapia - Fyzioterapia Dubnica nad Váhom",
      description: "Profesionálna fyzioterapia v Dubnici nad Váhom. André Heynes - 25+ rokov skúseností.",
      image: `${siteUrl}/og-default.png`,
      url: siteUrl,
      redirectUrl: siteUrl,
    }), {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  }

  const ogImage = resolveImage(article.image);
  const articleUrl = `${siteUrl}/article/${article.slug}`;

  return new Response(buildHtml({
    title: article.title_sk,
    description: article.excerpt_sk,
    image: ogImage,
    url: articleUrl,
    redirectUrl: articleUrl,
  }), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
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
  <style>
    body { font-family: 'Open Sans', sans-serif; background: #f8fafb; color: #2d3748; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; padding: 1rem; }
    .card { max-width: 600px; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,.08); }
    .card img { width: 100%; height: auto; display: block; }
    .card .body { padding: 1.5rem; }
    .card h1 { font-size: 1.25rem; margin: 0 0 .5rem; }
    .card p { font-size: .9rem; color: #666; margin: 0 0 1rem; }
    .card a { color: #0d9488; text-decoration: none; font-weight: 600; }
  </style>
  <script>window.location.replace("${esc(meta.redirectUrl)}");</script>
</head>
<body>
  <div class="card">
    <img src="${esc(meta.image)}" alt="${esc(meta.title)}" />
    <div class="body">
      <h1>${esc(meta.title)}</h1>
      <p>${esc(meta.description)}</p>
      <a href="${esc(meta.redirectUrl)}">Pokračovať na článok &rarr;</a>
    </div>
  </div>
</body>
</html>`;
}
