# CISS Lucknow — website

Next.js (App Router) + plain CSS. Mobile-first. Deploys to Vercel.

## Run locally
```bash
npm install
npm run dev     # http://localhost:3000
```

## ⚠️ Before you go live — edit these

**1. Contact form key** (`components/Site.jsx`, top of file)
   - Go to https://web3forms.com, enter `contact.cisslucknow@gmail.com`, get your Access Key.
   - Paste it into `const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE";`
   - Both forms (the Get-a-Quote modal and the Request-Assessment form) use it.
   - Test once after deploying — check spam the first time.

**2. Business details** (`components/Site.jsx`, top of file)
   - `ADDRESS` — your real office address
   - `MAPS_QUERY` — exact address or business name, used for the map + directions link
   - PHONE and EMAIL are already set.

**3. Founder details** (`components/Site.jsx`, WhyUs section)
   - Replace `[Founder Name]` and the IPS designation line.

**4. SEO domain** (`app/layout.jsx`)
   - Set `SITE_URL` to your real domain once you have one.

**5. Structured data** (`app/page.jsx`)
   - Fill in `streetAddress` and `postalCode` in the `localBusiness` object.

## Structure
```
app/
  layout.jsx    # metadata, SEO, SITE_URL
  page.jsx      # JSON-LD structured data + <Site />
  globals.css   # all styles + fonts
  robots.js     # /robots.txt
  sitemap.js    # /sitemap.xml
components/
  Site.jsx      # entire site; content arrays at the top
public/images/  # logo + PLACEHOLDERS.md
```

## Deploy to Vercel
1. Push to a GitHub repo.
2. vercel.com → Add New → Project → import it.
3. Auto-detects Next.js → Deploy. Free `*.vercel.app` URL.

## SEO checklist after launch
- [ ] Create a **Google Business Profile** for CISS Lucknow (biggest single win for
      "security guards near me" searches — more than anything on the site itself).
- [ ] Submit the site to **Google Search Console** and add the sitemap.
- [ ] Get the business listed on JustDial, IndiaMART, Sulekha (local citations).
- [ ] Ask happy clients for Google reviews.
- [ ] Add real photos with descriptive filenames.
- [ ] Once you have a custom domain, update `SITE_URL` in `app/layout.jsx`.
