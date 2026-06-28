# Total Recall — marketing site

The public marketing site + help center for **Total Recall** (the brain) and **Theo** (the app).
Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) (docs),
deployed as static files (Cloudflare Pages recommended).

## Structure

- `src/pages/index.astro` — home (animated mind-graph hero)
- `src/pages/theo.astro` — the Theo app product page
- `src/pages/plans.astro` — plans (pricing intentionally TBD)
- `src/content/docs/docs/` — the help center / capability docs (Starlight) at `/docs/*`
- `src/components/` — `Header`, `Footer`, `BaseHead` (SEO + JSON-LD)
- `src/styles/` — `marketing.css` (marketing pages), `brand.css` (Starlight theme)
- `public/` — brand assets, favicon, `og.png`, `robots.txt`, `llms.txt`

## Content is a published view of the brain docs

The capability pages are the single source of truth in the **total-recall** repo at
`docs/capabilities/` (files marked `access: public`). They are synced here, not edited here.

```bash
npm run sync:docs   # pulls public capability docs from ../total-recall/docs/capabilities
```

To update the site as Total Recall / Theo capabilities change: edit the docs in the
total-recall repo, run `npm run sync:docs`, rebuild, redeploy. New pages appear in the
docs sidebar automatically. Hand-authored `docs/index.md` and `docs/faq.md` are never overwritten.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output -> ./dist
npm run preview   # serve the build
```

## Before launch

1. **Set the domain.** Edit `SITE_URL` (and `APP_URL`) in `src/consts.ts`, and the
   `Sitemap:` line in `public/robots.txt`. This drives canonical URLs, sitemap, OG tags.
2. **Deploy.** Cloudflare Pages: framework preset Astro, build `npm run build`, output `dist`.
3. **SEO/GEO is already wired:** sitemap (`/sitemap-index.xml`), `robots.txt` (search + AI
   crawlers allowed), `llms.txt`, JSON-LD (Organization / WebSite / SoftwareApplication),
   per-page meta + Open Graph, semantic static HTML.

## Brand

Logo, font (Fraunces), palette, and the hero come from the total-recall `docs/brand/` system.
