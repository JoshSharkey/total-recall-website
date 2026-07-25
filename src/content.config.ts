import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Help center articles. Rendered by src/pages/docs/[...slug].astro through the
// site's own Marketing chrome, so the docs share the site header, footer, and brand.
export const collections = {
  help: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/help' }),
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
    }),
  }),
};
