

## Plan: Restore the live site (HTTP 421 fix)

### What's broken
Every request to `sportandbodyterapia.org` and `www.sportandbodyterapia.org` returns **HTTP 421** from Cloudflare. The site is fully offline. This is why preview images and the site itself aren't loading.

DNS records in Cloudflare are correct. The issue is on Lovable's side: the custom domain is not in **Active** status, so Lovable's edge refuses the TLS handshake for your hostname.

### Fix steps (you do these in Lovable, not in code)

**Step 1 — Check domain status in Lovable**
1. Open **Project Settings → Domains**
2. Look at the status of `sportandbodyterapia.org` and `www.sportandbodyterapia.org`
3. Status will be one of: Active / Verifying / Setting up / Offline / Failed / Action required / Removed

**Step 2 — Act based on status**

| Status | Action |
|---|---|
| **Active** | Domain should work. If it doesn't, click `⋯ → Reconnect` to force re-provisioning |
| **Offline / Failed** | Click **Retry** — re-runs SSL provisioning |
| **Action required** | Click **Complete Setup** and finish the flow |
| **Verifying / Setting up** | Wait — but if stuck >1 hour, remove and re-add the domain |
| **Removed** | Re-add the domain via **Connect Domain** |

**Step 3 — Confirm proxy mode matches**
When connecting/reconnecting, in the **Advanced** section, make sure **"Domain uses Cloudflare or a similar proxy"** is **checked**. Your DNS shows the records are Proxied (orange cloud), so Lovable must be told the same. A mismatch here is a common cause of 421.

**Step 4 — Clean up duplicate verification records**
Your DNS shows two `_lovable` TXT records. Once the domain is Active again, remove the older/duplicate one (keep only the value Lovable currently shows in its verification instructions). Leaving stale verification records is harmless but tidier to clean up.

### Verification (I'll run after you've done the above)
```
curl -I https://sportandbodyterapia.org/
curl -I https://www.sportandbodyterapia.org/
```
Both should return **HTTP 200**, not 421.

Once the site is back up, the Facebook Debugger investigation can resume — but the site needs to be reachable first or nothing else matters.

### What I won't change
No code changes. The codebase is fine. This is purely a domain/SSL provisioning issue on the hosting side.

### About the preview images
The Lovable preview (`id-preview--*.lovable.app`) uses a different domain and shouldn't be affected by this 421 issue. If preview images are also broken, that's a separate problem — please share a screenshot of the preview with the browser console open (F12 → Console tab) so I can see what's failing there.

