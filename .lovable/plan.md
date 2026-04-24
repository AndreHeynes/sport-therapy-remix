## Plan: Fix OG metadata for shared articles — without Cloudflare Worker

### Worker code review — pass-through is safe ✅
Your worker correctly passes through:
- Non-`/article/*` paths → fetch origin
- Non-bot user agents → fetch origin

So binding it as a Custom Domain wouldn't immediately break the site for users. **But it would break Lovable's SSL-for-SaaS binding**, which is why I want to avoid that path.

### Root cause hypothesis
Lovable connects custom domains via **Cloudflare for SaaS**. When `sportandbodyterapia.org` was added to Lovable, Lovable's Cloudflare account claims the hostname at the SNI/SSL level. Even though your zone has Worker Routes for `sportandbodyterapia.org/article/*`, the request is intercepted by Lovable's edge before your zone's worker ever sees it. This perfectly matches all symptoms:
- Traffic reaches Lovable (`x-deployment-id` header present) ✅
- Worker logs show zero entries ✅
- Routes saved correctly but never fire ✅
- Direct `*.workers.dev` URL works fine ✅

### Recommended fix: switch shared URLs to the edge function

Your `og-metadata` edge function already does exactly what bots need:
- Returns OG-tagged HTML with article-specific title/image/description
- Includes `<meta http-equiv="refresh">` and JS `window.location.replace()` to bounce real users to the article instantly

So instead of fighting Cloudflare routing, **just share the edge function URL on social media**. Bots see OG tags; humans get redirected in <100ms.

Edge function URL format:
```
https://tlodzjsmaxkugmzhzdze.supabase.co/functions/v1/og-metadata?slug=<slug>
```

### Code change (default mode)

Once approved, I'll switch to default mode and:

1. **Edit `src/components/ArticleShareButtons.tsx`**
   - Add a `shareUrl` derived from the article slug → edge function URL
   - Use `shareUrl` for WhatsApp, Facebook, Twitter/X, LinkedIn, Email, and Copy Link buttons
   - Keep the user-facing `url` prop unchanged for any in-app navigation

2. **Verify in `src/pages/Article.tsx`**
   - Confirm the slug is passed correctly to ArticleShareButtons
   - May need to pass `slug` as a separate prop alongside `url`

### What I won't touch
- Cloudflare Worker (can be deleted later, or left dormant — it's not hurting anything)
- DNS records
- Lovable domain bindings
- The SEO component (still serves correct metadata to crawlers that fetch the canonical URL directly)

### Trade-offs to be aware of
- **Pro**: Works immediately, no infra changes, zero risk to live site
- **Pro**: Edge function is already deployed and tested
- **Con**: Shared links visible in chat apps will show the long Supabase URL (until the redirect happens). Users who hover see the Supabase domain, not yours
- **Mitigation**: We could later set up a short URL like `https://sportandbodyterapia.org/s/<slug>` that proxies to the edge function — but that's a follow-up if the visual matters

### Approve to proceed
Reply approve and I'll switch to default mode and make the single-file change to `ArticleShareButtons.tsx`. Done in ~30 seconds, then you can re-test in Facebook Debugger using the new share URL format.