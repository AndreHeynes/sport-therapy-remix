

## Plan: Fix Facebook OG Warnings + Generate OG Images for All Blogs

### Facebook warnings explained

1. **`og:url` missing** — The SEO component already outputs `og:url` (line 44), but it relies on the `canonical` prop being passed. If `canonical` isn't set, it falls back to the site root. This is likely a Facebook caching issue from before the fix, but I'll make it more robust by always outputting `og:url` based on the current path.

2. **`fb:app_id` missing** — Facebook recommends this but it's **not required** for preview cards to work. It enables Facebook Insights for your domain. You'd need to create a Facebook App at developers.facebook.com to get one. I can add the meta tag if you provide an app ID, but **the preview card will work without it**.

### What I'll do

1. **Fix `og:url`** in `SEO.tsx` — always output a proper `og:url` even when `canonical` isn't explicitly passed (use `window.location` as fallback)

2. **Generate 4 OG images** (1200×630px, teal branded) for the remaining blogs:
   - `/og-understanding-sciatica.png` — Sciatica article
   - `/og-exercises-lower-back.png` — Lower back exercises
   - `/og-headache-management.png` — Headache management
   - `/og-sports-injury-prevention.png` — Sports injury prevention

3. **Update all 4 articles** in the database to point to their new OG images

4. **Fix Article.tsx `ogImage` logic** — currently the emoji check (`article.image !== '📝'`) won't catch all emoji values (🦴, 🏋️, 🧠, 🏃). I'll update the logic to check if the image starts with `/` (a real path) rather than checking against specific emojis.

### About `fb:app_id`
This is optional. If you want Facebook Insights tracking, you'll need to create a Facebook App at developers.facebook.com and give me the App ID. The preview cards will work fine without it.

### Files affected
| File | Action |
|------|--------|
| `src/components/SEO.tsx` | Fix `og:url` fallback |
| `src/pages/Article.tsx` | Fix image detection logic |
| `public/og-understanding-sciatica.png` | Create |
| `public/og-exercises-lower-back.png` | Create |
| `public/og-headache-management.png` | Create |
| `public/og-sports-injury-prevention.png` | Create |
| Database: `articles` table | Update `image` field for 4 articles |

### After deployment
Re-scrape all article URLs in Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/) to refresh the cached previews.

