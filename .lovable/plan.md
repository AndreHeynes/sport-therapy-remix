

## Two Problems Found

### Problem 1: Edge function returns `Content-Type: text/plain`
The Supabase Edge Runtime is **overriding** the `Content-Type` header to `text/plain`, even though the code sets `text/html; charset=utf-8`. This is why the metadata URL shows raw code instead of a rendered page. Facebook's crawler may still parse the OG tags from plain text, but it's unreliable.

**Fix**: Change how the Response headers are constructed. Instead of `new Headers({...})`, use the simpler object form which the Edge Runtime respects:
```typescript
return new Response(html, {
  headers: {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "public, max-age=300",
  },
});
```

### Problem 2: Article images don't show in preview
All article images in the database use relative paths (e.g., `/og-preco-boli.png`). These files exist on `sportandbodyterapia.org` but **not** on the Lovable preview domain. The `<img>` tag renders but the image 404s.

**Fix**: In `Article.tsx`, resolve relative image paths to the full `sportandbodyterapia.org` URL so they display everywhere:
```tsx
const displayImage = article.image?.startsWith('http')
  ? article.image
  : `https://sportandbodyterapia.org${article.image}`;
```

### Cloudflare Worker — Step-by-step guide

Your Cloudflare Worker needs to intercept `/article/*` requests from social bots and proxy them to the edge function. Here's exactly where to add the code:

1. Go to **Cloudflare Dashboard** → **Workers & Pages** → click your `og-bot-proxy` worker
2. Click **"Edit Code"** (top right, or "Quick Edit")
3. Replace ALL the code in the editor with this:

```javascript
const BOT_UA = /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|WhatsApp|Slackbot|TelegramBot|Pinterest|Discordbot/i;
const EDGE_FN = "https://tlodzjsmaxkugmzhzdze.supabase.co/functions/v1/og-metadata";

export default {
  async fetch(request) {
    const ua = request.headers.get("user-agent") || "";
    const url = new URL(request.url);

    // Only intercept bot requests to /article/* paths
    const match = url.pathname.match(/^\/article\/([^/?#]+)/);
    if (!match || !BOT_UA.test(ua)) {
      return fetch(request); // Pass through to origin
    }

    const slug = match[1];
    const edgeUrl = `${EDGE_FN}?slug=${encodeURIComponent(slug)}`;
    const resp = await fetch(edgeUrl);
    
    // Force correct Content-Type (fixes the text/plain issue)
    return new Response(resp.body, {
      status: resp.status,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  },
};
```

4. Click **"Deploy"**
5. Then go to **Settings → Triggers → Routes** and ensure BOTH routes exist:
   - `sportandbodyterapia.org/article/*` → Zone: `sportandbodyterapia.org`
   - `www.sportandbodyterapia.org/article/*` → Zone: `sportandbodyterapia.org`

### Files to update

| File | Change |
|------|--------|
| `supabase/functions/og-metadata/index.ts` | Fix headers to use plain object instead of `new Headers()` |
| `src/pages/Article.tsx` | Resolve relative image paths to absolute URLs |

### After deployment
1. Visit the edge function URL directly — it should now render as HTML, not raw code
2. Re-scrape in Facebook Debugger — the Worker will serve the correct OG tags to Facebook's bot
3. Article pages will show images on all domains including preview

