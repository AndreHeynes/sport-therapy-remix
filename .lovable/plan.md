

## Plan: Test worker interception now that everything is deployed

### Current state
- ✅ Worker `og-bot-router` re-deployed (version `4ca85d80`, 2 min ago)
- ✅ Both article routes bound and active
- ✅ Apex `sportandbodyterapia.org` Active in Lovable
- ⏳ `www.sportandbodyterapia.org` Setting up (DNS propagating)

### Step 1 — I run live curl tests on the apex domain
```
curl -sI -A "facebookexternalhit/1.1" https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti
curl -s  -A "facebookexternalhit/1.1" https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti | grep -iE "og:title|og:image|og:url"
```

**Success indicators:**
- Headers should NOT contain `x-deployment-id` (that's Lovable origin); should show `cf-ray` only
- `og:title` = the Slovak article title (not site default)
- `og:image` = article-specific image URL (not `/og-default.png`)
- `og:url` = full article URL

**Browser control test** (must still work normally):
```
curl -sI https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti
```
Expected: passes through to Lovable's React app for real users.

### Step 2 — Wait for www and re-test
Once `www.sportandbodyterapia.org` shows Active in Lovable (refresh the Domains page in a few minutes):
```
curl -s -A "facebookexternalhit/1.1" https://www.sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti | grep -iE "og:title|og:image"
```

### Step 3 — Facebook Debugger re-scrape
If apex curl passes:
1. Open https://developers.facebook.com/tools/debug/
2. Enter `https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti`
3. Click **Scrape Again** **twice** (Facebook caches the first response — second scrape shows the truth)
4. Article-specific title and image should appear in the preview

### Step 4 — If apex curl STILL returns default OG tags
Diagnostic options I'll explore:
- Check Cloudflare Worker **Logs/Observability** tab for any incoming requests during the curl test (you can enable real-time logs and I'll tell you what to look for)
- Verify the bot-detection regex in the worker actually matches `facebookexternalhit/1.1`
- Check if Cloudflare cache rules are intercepting before the worker runs (unlikely on a new domain, but possible)

### What I won't change
No project code. The codebase, edge function, and Worker are all ready. This is pure verification.

