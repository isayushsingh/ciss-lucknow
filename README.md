# CISS Lucknow — website

Marketing site for CISS Lucknow (Civil & Industrial Security Services), built with
**Next.js (App Router)** and plain CSS. Mobile-first, deploys to **Vercel**.

## Run locally

Requires Node.js 18.18+ (or 20+).

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

```
app/
  layout.jsx      # <html> shell, metadata, loads globals.css
  page.jsx        # renders <Site />
  globals.css     # all styles + Google Fonts (Instrument Serif + Inter)
components/
  Site.jsx        # the whole site (nav, hero, services, why-us, process,
                  # testimonials, contact form, footer) — one client component
public/
  images/
    logo.png      # the CISS crest (already wired into the hero + footer)
    PLACEHOLDERS.md  # list of the photos to add later
```

Everything lives in `components/Site.jsx`. Section components are defined top to
bottom; copy, service list, testimonials, and process steps are plain arrays near
the top of the file — edit those to change content.

## Images

Photos currently render as labelled placeholder tiles. See
`public/images/PLACEHOLDERS.md` for the exact paths to drop real images into.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Go to vercel.com → **Add New → Project** → import the repo.
3. Framework preset auto-detects **Next.js**. No env vars needed yet.
4. Click **Deploy**. You'll get a free `*.vercel.app` URL.

(Or, from this folder: `npx vercel` and follow the prompts.)

## Still to do

- Wire the contact form (currently shows a confirmation but doesn't send). Planned:
  Web3Forms — free, emails each inquiry, no backend.
- Replace placeholder photos and copy.
- Swap in your real phone number, email, and office address (search the file for
  `+91 00000 00000` and `hello@cisslucknow.com`).
