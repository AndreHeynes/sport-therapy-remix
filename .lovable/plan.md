

## Plan: Replace Blog OG Images with Language-Neutral Versions

### What needs to change
All 5 article OG images currently have English or Slovak text baked into them. We need to regenerate them as **language-neutral** versions — keeping the medical illustrations and teal gradient background with only the brand logo "Sport & Body Terapia" (no article titles).

### Images to regenerate

| File | Current text | New design |
|------|-------------|------------|
| `og-preco-boli.png` | Slovak title | Spine/body illustration + brand logo only |
| `og-exercises-lower-back.png` | English title | Stretching figure illustration + brand logo only |
| `og-headache-management.png` | English title | Brain/head illustration + brand logo only |
| `og-sports-injury-prevention.png` | English title | Running figures illustration + brand logo only |
| `og-understanding-sciatica.png` | English title | Spine illustration + brand logo only |

### Design specs
- **Size**: 1200x630px (standard OG image ratio, replacing current mixed sizes)
- **Background**: Teal gradient matching brand (`#0D9488` to `#115E59`)
- **Content**: Medical illustration silhouettes (similar style to current) + "Sport & Body Terapia" logo text in bottom-right corner
- **No article titles or descriptive text** — keeps them language-neutral
- Generated programmatically using Python (Pillow) with the existing illustration style

### Steps
1. Generate 5 new language-neutral OG images at 1200x630px
2. Replace the existing files in `public/`
3. No code changes needed — the filenames stay the same

### Also
- Save user preference: communicate in English only (no Slovak)
- Restore the Cloudflare Worker bot-only check now that verification is complete — provide updated Worker code snippet

