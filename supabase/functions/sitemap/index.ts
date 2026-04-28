import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const siteUrl = "https://sportandbodyterapia.org";

const staticUrls: Array<{ loc: string; changefreq: string; priority: string }> = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/about", changefreq: "monthly", priority: "0.8" },
  { loc: "/blog", changefreq: "weekly", priority: "0.9" },
  { loc: "/gdpr-compliance", changefreq: "yearly", priority: "0.3" },
  { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { loc: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
  { loc: "/medical-disclaimer", changefreq: "yearly", priority: "0.3" },
  { loc: "/cookie-policy", changefreq: "yearly", priority: "0.3" },
];

Deno.serve(async (_req) => {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: articles } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("published", true)
    .order("updated_at", { ascending: false });

  const urls: string[] = [];

  for (const u of staticUrls) {
    urls.push(
      `  <url>\n    <loc>${siteUrl}${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    );
  }

  for (const a of articles ?? []) {
    const lastmod = a.updated_at ? new Date(a.updated_at).toISOString().split("T")[0] : "";
    urls.push(
      `  <url>\n    <loc>${siteUrl}/article/${a.slug}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
});
