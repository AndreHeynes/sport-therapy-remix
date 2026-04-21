

## Plan: Fix expired Recover link in Lovable Domains

### What's happening
When you click **Recover** on the disconnected domain in Project Settings → Domains, Lovable shows a "link expired" error. This is a known Lovable behavior — the recovery token has a short TTL, and once expired the only path forward is to fully **remove and re-add** the domain. The Recover button cannot be reissued.

### Fix steps (do in this order)

**Step 1 — Remove both domains from Lovable**
1. Open **Project Settings → Domains**
2. For `sportandbodyterapia.org`: click the **⋯** menu → **Remove**
3. For `www.sportandbodyterapia.org`: click the **⋯** menu → **Remove**
4. Confirm removal for both

**Step 2 — Clean Cloudflare DNS before re-adding**
The old `_lovable` TXT records will no longer match anything. In **Cloudflare → DNS → Records**:
1. Delete **all** `_lovable` TXT records (apex)
2. Delete any `_lovable.www` TXT record
3. Keep the two A records (`@` and `www` → `185.158.133.1`, both proxied) — these are still valid
4. Remove any AAAA or stray CNAME records on `@` or `www`

**Step 3 — Re-add the apex domain**
1. In Lovable: **Domains → Connect Domain**
2. Enter `sportandbodyterapia.org`
3. Expand **Advanced** → check **"Domain uses Cloudflare or a similar proxy"**
4. Lovable will show **fresh** DNS records (new TXT verification value)
5. Add the new TXT record in Cloudflare exactly as shown
6. Click **Verify** in Lovable

**Step 4 — Re-add the www subdomain**
1. **Connect Domain** again
2. Enter `www.sportandbodyterapia.org`
3. Same Advanced → proxy checkbox
4. Add the new `_lovable.www` TXT record in Cloudflare
5. Click **Verify**

**Step 5 — Set primary**
Once both show **Active**, mark `sportandbodyterapia.org` (or whichever you prefer) as **Primary**. The other will redirect to it.

**Step 6 — I verify**
After both domains show Active in Lovable, I'll run:
```
curl -I https://sportandbodyterapia.org/
curl -I https://www.sportandbodyterapia.org/
curl -A "facebookexternalhit/1.1" https://sportandbodyterapia.org/article/preco-boli-pochopenie-bolesti
```
Expected: HTTP 200 on the first two, full article OG HTML on the third.

### Why Recover failed
Lovable's recovery flow uses a signed token tied to the original disconnect event. Once expired (typically 24–48h), the only supported recovery path is removal + re-add. There is no "resend recovery link" option in the UI today.

### What I won't change
No code. Codebase is healthy. The edge function and Worker are ready and waiting — they just need the domain back online to receive traffic.

### After domain is restored
We resume the Facebook Debugger investigation:
1. Confirm only `og-bot-router` is bound to `*sportandbodyterapia.org/article/*` (delete `og-bot-proxy`)
2. Re-scrape in Facebook Debugger → Scrape Again twice
3. Article OG tags should now appear

