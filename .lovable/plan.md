
## What the screenshot confirms

- The direct metadata URL is returning raw HTML source instead of behaving like a normal rendered HTML page.
- The Slovak text is incorrectly encoded (`PreÄo...`), so there is a UTF-8/response-format issue in the metadata function path.
- This is separate from the article page itself: `src/pages/Article.tsx` currently uses `article.image` only for SEO tags and never renders the image visibly on the page.

## Updated plan

### 1. Fix the metadata function response
Update `supabase/functions/og-metadata/index.ts` so it returns a proper UTF-8 HTML document that browsers and crawlers can parse reliably:
- keep the OG/Twitter tags
- strengthen the response headers for HTML + UTF-8
- add a non-JS fallback redirect in addition to the current JS redirect
- replace the bare text body with a tiny branded fallback page showing the article title, excerpt, and image

This will make the URL stop looking like “just code” when opened directly and remove the broken character rendering.

### 2. Fix image handling consistency
Harden image URL logic so both of these work correctly:
- relative paths like `/og-preco-boli.png`
- full absolute URLs like `https://...`

I’ll apply the same logic in:
- `supabase/functions/og-metadata/index.ts`
- `src/pages/Article.tsx`
- `src/components/SEO.tsx` if needed for consistency

### 3. Show the article image on the real article page
Update `src/pages/Article.tsx` to render the article’s image below the hero/title area so visitors see the same visual that social previews use.
- keep current brand styling
- keep bilingual behavior
- include a safe fallback when no article image exists

### 4. Re-verify the Facebook flow after code fixes
Once the function output is corrected:
- test the direct metadata URL again to confirm it renders properly and redirects
- re-scrape both domain variants in Facebook Debugger:
  - `https://sportandbodyterapia.org/article/...`
  - `https://www.sportandbodyterapia.org/article/...`

If Facebook still shows the generic image after that, the remaining issue will be Cloudflare routing/cache rather than the app code.

## Files to update

- `supabase/functions/og-metadata/index.ts`
- `src/pages/Article.tsx`
- `src/components/SEO.tsx` (only if needed to align image URL resolution)

## Technical details

- The screenshot strongly suggests the metadata response is not being interpreted as clean HTML somewhere in the delivery chain.
- The mojibake confirms encoding is not clean, even though the function code intends UTF-8.
- The missing on-page article image is a separate UI gap: the page computes `ogImage` but never renders an `<img>` for readers.
