# retiringroom.com

Independent guide to IRCTC retiring rooms at Indian Railway stations. Static SEO/affiliate content site built with Astro + Tailwind.

## What this is

A monetized content site indexing IRCTC retiring rooms across 600+ Indian Railway stations. Three revenue streams planned:

1. **Phase 1 (M1–M3)** — AdSense + affiliate (MakeMyTrip / OYO / redBus). Currently shipped.
2. **Phase 2 (M4–M6)** — WhatsApp concierge bot (gated on Phase 1 hitting 5K monthly visitors).
3. **Phase 3 (M6–M12)** — public MCP/REST data feed for travel aggregators (gated on Phase 2 hitting 500+ bookings).

**60-day kill criterion:** 1,000+ organic monthly visitors AND AdSense approved AND ≥$1 affiliate revenue, else sell the domain.

## Stack

- **Astro 4** (static output)
- **Tailwind 3** with custom Indian Railway palette
- **@astrojs/sitemap** for SEO
- Fonts: Fraunces (display) + DM Sans (body) + JetBrains Mono
- Deploy target: Vercel

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → ./dist
npm run preview  # serve the build locally
```

## Data

- `data/stations.json` — 121 seed stations across all 16 IR zones, 22 states, 106 cities
- Each station has: code, name, city, state, zone, lat/lng, room types, hourly flag, tariff bands per room type
- To expand to the full 600+: run `npm run scrape` from your own machine (IRCTC blocks sandbox IPs)

## Environment variables

Copy `.env.example` to `.env.local` and fill in once you have them:

```
PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
PUBLIC_AFF_MMT=your_makemytrip_affiliate_id
PUBLIC_AFF_OYO=your_oyo_affiliate_id
PUBLIC_AFF_REDBUS=your_redbus_affiliate_id
```

Until set, AdSense slots show a dashed placeholder and affiliate links use `YOUR_*_ID` placeholders. Site builds and deploys cleanly without these set.

## Deploy to Vercel

### Option A — via GitHub (recommended)

This repo is already on GitHub at https://github.com/WEBWORKSA1/retiring-room.

1. Go to vercel.com → New Project → Import Git Repository → WEBWORKSA1/retiring-room
2. Framework auto-detects as Astro. Click Deploy.
3. Add custom domain: retiringroom.com (Settings → Domains)

### Option B — direct CLI

```bash
npm install -g vercel
vercel --prod
# Follow prompts; first deploy creates the project
```

## Post-deploy checklist

- [ ] Google Search Console — add property, submit sitemap (`/sitemap-index.xml`)
- [ ] Google Analytics 4 — add tracking via Astro layout
- [ ] AdSense application (need ~30 days of traffic + 15+ content pages — you have 20+)
- [ ] MakeMyTrip Partner Program signup
- [ ] OYO Affiliate signup
- [ ] redBus Hotels affiliate signup
- [ ] Run `npm run scrape` from your machine to expand station coverage
- [ ] Submit to IndexNow / Bing Webmaster Tools

## Site structure

```
/                       Homepage with featured stations
/stations               All 121 stations (sortable table)
/stations/[code]        Programmatic station detail (LodgingBusiness schema)
/cities                 City index
/cities/[slug]          City detail with all its stations
/states                 State index
/states/[slug]          State detail with station table
/guides                 10 evergreen guides
/guides/[topic]         Individual guide (Article schema)
/sitemap-index.xml      Auto-generated
/robots.txt             Allow all, point to sitemap
/llms.txt               Agent-readable site description
```

## Monetization slots

- `<AdSlot />` component renders AdSense when `PUBLIC_ADSENSE_CLIENT` is set; renders placeholder otherwise. Used on station detail and guide pages.
- `<AffiliateBlock />` component renders MakeMyTrip / OYO / redBus links with affiliate IDs from env. Used on every station detail page.

## Compliance

- Site is informational only — no booking is taken on this domain.
- Tariffs displayed are indicative bands compiled from publicly listed IRCTC rates.
- IRCTC is the only legitimate booking destination; we link to `rr.irctc.co.in` throughout.
- Affiliate links carry `rel="sponsored"` per Google guidelines.

## License

Private. © 2026 retiringroom.com.
