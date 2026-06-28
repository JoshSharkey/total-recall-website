// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/consts.ts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [
    starlight({
      title: 'Total Recall Docs',
      description: 'Help center and documentation for Total Recall and the Theo app.',
      logo: {
        light: './src/assets/brand/mark.svg',
        dark: './src/assets/brand/mark.svg',
        replacesTitle: false,
      },
      customCss: [
        '@fontsource/fraunces/400.css',
        '@fontsource/fraunces/600.css',
        './src/styles/brand.css',
      ],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/JoshSharkey' },
      ],
      sidebar: [
        { label: '← Back to Total Recall', link: '/' },
        {
          label: 'Start here',
          items: [
            { label: 'Help center', link: '/docs/' },
            { label: 'What is Total Recall', link: '/docs/overview/' },
            { label: 'FAQ', link: '/docs/faq/' },
          ],
        },
        {
          label: 'How it works',
          items: [
            { label: 'How search works', link: '/docs/search/' },
            { label: 'Synthesis', link: '/docs/synthesis/' },
            { label: 'Daily brief', link: '/docs/daily-brief/' },
            { label: 'Using it from your phone', link: '/docs/phone-access/' },
          ],
        },
        {
          label: 'Privacy',
          items: [{ label: 'Privacy & backups', link: '/docs/backups-privacy/' }],
        },
        {
          label: 'More',
          items: [
            { label: 'Features', link: '/features/' },
            { label: 'Plans', link: '/plans/' },
          ],
        },
      ],
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: `${SITE_URL}/og.png` } },
      ],
    }),
    sitemap(),
  ],
});
