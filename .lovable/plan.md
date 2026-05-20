## Add "What Your Scan Does — and Doesn't — Tell You About Pain" as a draft

Insert one row into `articles` with `published = false`. HTML uses only tags already supported by `Article.tsx` (`p, h2, h3, blockquote, ul, li, strong, em`). Slug follows existing series convention.

### Row fields
- **slug**: `co-vam-sken-povie-o-bolesti`
- **title_sk**: `Čo vám sken (ne)povie o bolesti`
- **title_en**: `What Your Scan Does — and Doesn't — Tell You About Pain`
- **category_sk / category_en**: `Vzdelávanie o bolesti` / `Pain Education`
- **read_time**: `5 min čítania` / `5 min read`
- **image**: `/og-preco-boli.png` (matches series)
- **excerpt_en**: "Why a normal scan doesn't mean no pain — and an abnormal one isn't always the cause."
- **excerpt_sk**: Slovak equivalent
- **published**: `false`

### Content structure (both SK + EN)
- Series label: *Making Sense of Pain | Blog 2 of 5* / *Séria: Pochopenie bolesti | Blog 2 z 5*
- H2: Opening question + reframe
- H2: A scan shows anatomy — not pain (with stats: 96% / 93% / 10-year longitudinal)
- H2: Scans can sometimes make things worse
- H2: When is imaging genuinely useful?
- H2: What should guide your care?
- H2: Key takeaways (ul with 5 bullets)
- H2: Coming Up Next (teaser for Blog 3)
- Closing italic disclaimer (matching series footer)

Slovak version will be a faithful translation in the same clinical, reassuring register as the existing two Blog 1 variants (PEACE & LOVE-aligned, evidence-based, active recovery framing).

### After approval
1. Row appears in `/admin` as a draft
2. You can review/edit either language
3. Toggle `published = true` when ready

Original articles are not touched.
