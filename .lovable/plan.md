
## What I found

1. The missing blog images on `www.sportandbodyterapia.org/blog` are a separate frontend bug.
   - `src/pages/Blog.tsx` currently renders `{article.image}` as plain text, so the card shows `/og-preco-boli.png` instead of an image.
   - `src/components/PatientResourcesSection.tsx` has the same bug for the homepage article cards.

2. The Facebook Debugger issue is still a Cloudflare routing issue, not the article data.
   - `index.html` still contains only the default site-wide OG tags.
   - That means if the Worker does not intercept the request, Facebook will keep seeing the generic default preview.
   - Your project memory says the `@` and `www` DNS records are set to **DNS only**. Cloudflare Worker routes require the hostname to be **proxied** for the Worker to run.

## Plan

### 1. Fix blog card images in the app
Update both article-card UIs to render real images instead of text:
- `src/pages/Blog.tsx`
- `src/components/PatientResourcesSection.tsx`

Implementation:
- resolve relative image paths to absolute URLs
- render a proper `<img>` block at the top of each card
- keep a safe fallback if an article has no image

### 2. Keep article page image handling aligned
Review the current article image logic in `src/pages/Article.tsx` and reuse the same image-resolution pattern in the blog cards so all article views behave consistently.

### 3. Fix Cloudflare so the Worker can actually run
In Cloudflare:
- switch both DNS records for `sportandbodyterapia.org` and `www.sportandbodyterapia.org` from **DNS only** to **Proxied**
- keep both Worker routes:
  - `sportandbodyterapia.org/article/*`
  - `www.sportandbodyterapia.org/article/*`

Without proxied DNS, the Worker route will not intercept article requests.

### 4. Make Worker verification easier
Temporarily adjust the Worker so it handles **all** `/article/*` requests during testing, not just bot user agents.
That will let us confirm immediately in a browser whether the Worker is serving the metadata HTML. Once confirmed, we can restore the bot-only condition if desired.

### 5. Re-test the OG flow
After the app changes are published and Cloudflare is corrected:
- verify `/blog` now shows image thumbnails instead of file paths
- open one article URL directly and confirm the Worker response is being served during testing
- re-run Facebook Debugger on both:
  - `https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti`
  - `https://www.sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti`

## Technical notes

- The on-site blog image issue is definitely in code.
- The unchanged Facebook preview is most likely because Cloudflare is still serving the normal app page, so Facebook falls back to the default OG tags from `index.html`.
- No database change is needed for this fix.
