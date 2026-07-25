// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/consts.ts';

// The help center used to run on Starlight, which brought its own header, footer,
// sidebar and colour system — that is why /docs/ read as a different product.
// It is now plain Astro pages rendered through src/layouts/Docs.astro, so the docs
// share the site's real chrome. See src/pages/docs/[...slug].astro.
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
});
