

## Plan: Generate OG Image for Facebook Previews

### Problem
Facebook isn't showing a nice preview card when sharing the blog URL because there's no actual `og-default.png` image file — the SEO component references it but the file doesn't exist.

### What I'll do

1. **Generate a branded OG image** (1200×630px, the Facebook-recommended size) using AI image generation
   - Teal gradient background matching the brand
   - "Šport & Body Terapia" branding
   - Clean, professional design with the site name and tagline
   - Save as `public/og-default.png`

2. **Generate an article-specific OG image** for the pain blog post
   - Same brand style but with the article title
   - Save as `public/og-preco-boli.png`

3. **Update the database** to set the article's `image_url` field to the article-specific OG image path so it's used in the `og:image` meta tag

4. **Update SEO component** if needed to ensure the article image is passed through as `ogImage`

### After deployment
You'll need to clear Facebook's cache of the old (broken) preview by pasting the article URL into Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/) and clicking "Scrape Again".

### Files affected
| File | Action |
|------|--------|
| `public/og-default.png` | Create — default branded OG image |
| `public/og-preco-boli.png` | Create — article-specific OG image |
| `src/pages/Article.tsx` | Minor edit — pass article image to SEO `ogImage` prop |

