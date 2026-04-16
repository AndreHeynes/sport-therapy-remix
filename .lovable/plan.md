

## Plan: Redesign Article Layout + Social Sharing (Facebook & Instagram only)

### Files to create/edit

**1. Create `src/components/ArticleShareButtons.tsx`**
- Facebook share button (URL-based: `facebook.com/sharer/sharer.php?u=...`)
- Instagram note: Instagram doesn't support URL sharing — show a "Copy Link" button with a tooltip saying "Paste on Instagram"
- Copy Link button with clipboard feedback toast
- Bilingual labels (SK/EN)
- Styled with brand teal colors, horizontal layout at bottom of article

**2. Rewrite `src/pages/Article.tsx`**
- **Hero banner**: Teal gradient background with category badge, date, read time, and series indicator (e.g., "Blog 1 z 5" / "Blog 1 of 5")
- **Reading progress bar**: Fixed at top of viewport, tracks scroll position using the existing `Progress` component
- **Excerpt highlight box**: Styled intro paragraph below hero with left teal border
- **Table of Contents**: Auto-generated from `<h2>` tags in the HTML content, collapsible on mobile
- **Clean content area**: Remove Card wrapper, use `article-prose` styling with generous spacing
- **Share buttons**: `ArticleShareButtons` component at bottom
- **Bottom CTA**: "Book an appointment" button linking to contact section, plus "Back to Blog"
- Keep existing loading/error states

**3. Edit `src/components/SEO.tsx`**
- Add `og:image` meta tag (use `ogImage` prop or default fallback)
- Add Twitter Card meta tags for completeness (`twitter:card`, `twitter:title`, `twitter:description`)

**4. Edit `src/index.css`**
- Add `.article-prose` class with:
  - Teal-colored `h2`/`h3` headings with subtle bottom border
  - Increased paragraph spacing and line height
  - Styled blockquotes with left teal border
  - Teal bullet markers on lists
  - Better `strong` tag visibility

**5. Install `@tailwindcss/typography` + update `tailwind.config.ts`**
- Add plugin for base prose defaults
- Configure prose color overrides in the plugin config

### No database changes needed
All articles share the same `Article.tsx` template — existing and future articles automatically get the new layout.

