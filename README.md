# Total Recall — marketing site

The public marketing site + help center for **Total Recall** (the brain) and **Theo** (the app).
Built with [Astro](https://astro.build), deployed as static files (Cloudflare Pages recommended).
The help center at `/docs/*` is plain Astro pages rendered through the site layout, so it
shares the site header, footer, and brand.

## Structure

- `src/pages/index.astro` — home (animated mind-graph hero)
- `src/pages/theo.astro` — the Theo app product page
- `src/pages/plans.astro` — plans (pricing intentionally TBD)
- `src/content/help/` — the help center articles, served at `/docs/*`
- `src/layouts/Docs.astro` + `src/pages/docs/[...slug].astro` — how those articles render
- `src/data/docsNav.ts` — the help center sidebar (one source of truth for the nav)
- `src/components/` — `Header`, `Footer`, `BaseHead` (SEO + JSON-LD)
- `src/styles/` — `marketing.css` (site-wide), `docs.css` (help center sidebar + article)
- `public/` — brand assets, favicon, `og.png`, `robots.txt` (`llms.txt` is generated from
  the content collection by `src/pages/llms.txt.ts`, so it cannot list a page that 404s)

## Content is a published view of the brain docs

The capability pages are the single source of truth in the **total-recall** repo at
`docs/capabilities/` (files marked `access: public`). They are synced here, not edited here.

```bash
npm run sync:docs   # pulls public capability docs from ../total-recall/docs/capabilities
```

To update the site as Total Recall / Theo capabilities change: edit the docs in the
total-recall repo, run `npm run sync:docs`, rebuild, redeploy. New pages appear in the
docs sidebar automatically. Hand-authored articles (`index`, `faq`, `overview`, `ownership`, `synthesis`, `who-is-theo`,
`ask-theo-app`) are listed in `KEEP` in the sync script and are never overwritten. New pages
need a matching entry in `src/data/docsNav.ts` to appear in the sidebar.

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
