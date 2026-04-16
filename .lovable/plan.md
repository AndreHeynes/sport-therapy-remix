

## Plan: Add Blog Article Directly to Database

Since you're having difficulty with the admin interface, I'll insert the blog article directly into the database for you.

### What I'll do

1. **Insert the article** into the `articles` table with all the Slovak and English content you provided, using a SQL migration
2. Set it as **published** so it appears immediately on the blog page
3. Use the slug `preco-boli-pochopenie-bolesti` / URL: `sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti`

### Article details
- **Slug**: `preco-boli-pochopenie-bolesti`
- **Category SK/EN**: Vzdelávanie o bolesti / Pain Education
- **Read time SK/EN**: 10 min čítania / 10 min read
- **Image**: 🧠
- **Published**: Yes
- **Content**: Full HTML-formatted version of both Slovak and English texts you provided

### Technical notes
- The content will be wrapped in proper HTML tags (`<p>`, `<h2>`, `<h3>`, `<blockquote>`, `<ul>`, `<li>`, `<strong>`) for clean rendering
- Single database insert via migration tool — no code changes needed

