

## Plan: Live-test the worker interception

### What's confirmed from your screenshots
- Both article routes are bound to `og-bot-router` with correct patterns
- Failure mode is **Fail open** (safe default)
- Worker code logic is correct (bot detection + slug extraction + edge function fetch)
- Edge function `og-metadata` works correctly when called directly

### What I'll do once approved
Run two diagnostic curl commands to verify end-to-end:

**Test 1 — Apex domain bot request**
```
curl -sI -A "facebookexternalhit/1.1" https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti
curl -s -A "facebookexternalhit/1.1" https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti | grep -iE "og:title|og:image|og:url"
```

**Test 2 — www subdomain bot request**
```
curl -s -A "facebookexternalhit/1.1" https://www.sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti | grep -iE "og:title|og:image|og:url"
```

**Test 3 — Real browser request (control)**
```
curl -sI https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti
```
Expected: passes through to Lovable's React app (no worker interception).

### Success criteria
- Bot tests must return article-specific OG tags:
  - `og:title` = the Slovak article title (not site default)
  - `og:image` = article image URL (not `/og-default.png`)
  - `og:url` = the article URL
- Browser test should return Lovable's normal React app HTML

### If tests pass
1. Open Facebook Debugger: https://developers.facebook.com/tools/debug/
2. Enter `https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti`
3. Click **Scrape Again** **twice** (Facebook caches the first scrape)
4. Article title and image should appear in the preview card

### If tests fail (worker not intercepting)
Likely causes and next steps:
- DNS A records are grey-cloud (DNS only) instead of orange-cloud (Proxied) → toggle proxy on
- Worker code has an undeployed change → click **Deploy** in worker editor
- Cloudflare cache serving old response → purge cache for `/article/*`

I'll diagnose based on the curl response headers (looking for `cf-ray`, `server: cloudflare`, and absence of Lovable's `x-deployment-id`).

### What I won't change
No project code. All changes (if needed) are in Cloudflare configuration only.

