

## Problem

Facebook's crawler does NOT execute JavaScript. It only reads the static `index.html`, which currently shows:
- **og:title**: "Lovable App"
- **og:description**: "Lovable Generated Project"
- **og:image**: Lovable's default image

React Helmet updates these client-side, but bots never see those updates.

## Solution: Two-part fix

### Part 1 — Fix `index.html` defaults (quick win)

Update `index.html` with proper site-level OG tags so at minimum, non-article pages (homepage, blog listing) show correct branding:

```html
<title>Šport & Body Terapia - Fyzioterapia Dubnica nad Váhom</title>
<meta property="og:title" content="Šport & Body Terapia" />
<meta property="og:description" content="Profesionálna fyzioterapia v Dubnici nad Váhom. André Heynes - 25+ rokov skúseností." />
<meta property="og:image" content="https://sportandbodyterapia.org/og-default.png" />
<meta property="og:url" content="https://sportandbodyterapia.org" />
<meta property="og:site_name" content="Šport & Body Terapia" />
```

This alone won't fix article-specific previews (all articles would show the same generic card).

### Part 2 — Edge Function for article-specific OG tags

Create a backend function (`og-metadata`) that:
1. Receives an article slug
2. Fetches the article from the database
3. Returns a minimal HTML page with the correct `og:title`, `og:description`, `og:image`, and `og:url` tags
4. Includes a JavaScript redirect so real users are instantly sent to the SPA

Then configure **Cloudflare** (which you already use) to detect bot user agents (`facebookexternalhit`, `Twitterbot`) on `/article/*` routes and proxy those requests to the edge function. This way:
- **Bots** get a static HTML page with perfect OG tags
- **Humans** get the normal SPA experience

### Files affected

| File | Action |
|------|--------|
| `index.html` | Update default OG meta tags with real branding |
| `supabase/functions/og-metadata/index.ts` | Create — edge function that returns HTML with article OG tags |
| Cloudflare Worker (manual) | I'll provide the worker script — you'll paste it in Cloudflare dashboard |

### What you'll need to do manually
After implementation, you'll need to add a **Cloudflare Worker** route for `sportandbodyterapia.org/article/*` that proxies bot requests to the edge function. I'll give you the exact script and setup steps.

### After deployment
Re-scrape all article URLs in Facebook's Sharing Debugger to see the corrected previews.

