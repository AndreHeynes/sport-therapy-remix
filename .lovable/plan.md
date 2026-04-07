

## Blog Evolution Plan

### Current State
- Articles exist at `/article/:slug` (direct deep links already work for social media sharing)
- Homepage Patient Resources section shows all published articles as cards
- Articles have `created_at` timestamps but no visible dates
- No dedicated blog listing page

### What You Need

**For social media campaigns:** Each article already has a unique URL (`/article/your-slug`) that you can share directly on social media. A visitor clicking that link sees only that article. This already works.

**For general visitors:** You want a proper blog listing page showing articles chronologically (newest first) with visible dates, rather than dumping everything on the homepage.

### Proposed Changes

**1. Add a dedicated `/blog` page**
- Lists all published articles in reverse chronological order (newest first)
- Each card shows the published date, category, read time, and excerpt
- Paginated or "load more" for when you have many articles
- Bilingual, matching existing site design

**2. Update the homepage Patient Resources section**
- Show only the 2 most recent articles (a "latest posts" preview)
- Add a "View All Articles" button linking to `/blog`
- This keeps the homepage clean while highlighting fresh content

**3. Add published dates to articles**
- Show the formatted `created_at` date on the blog listing cards
- Show the date on the individual article page as well

**4. Social media deep-link best practice**
- The existing `/article/:slug` routes are your SM share links -- no change needed
- Add Open Graph meta tags (`og:title`, `og:description`, `og:image`) to the Article page so social media previews look professional when shared

### Technical Details

| Change | Files |
|--------|-------|
| New blog listing page | `src/pages/Blog.tsx` (new) |
| Route registration | `src/App.tsx` |
| Homepage section update | `src/components/PatientResourcesSection.tsx` |
| Date display + OG tags on articles | `src/pages/Article.tsx` |
| Navigation link to blog | `src/components/Header.tsx` |

No database changes needed -- `created_at` already exists on the articles table.

