// /llms.txt — the map we hand to AI crawlers.
//
// This used to be a hand-maintained file in public/. It rotted: it pointed at the
// old totalrecall.app domain and listed eleven /docs/ URLs that were never built.
// It is now generated from the same two sources the site itself uses (SITE_URL and
// the help center collection), so it cannot list a page that does not exist.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL, SITE_DESCRIPTION } from '../consts';
import { docsOrder } from '../data/docsNav';

const PRODUCT_PAGES: Array<[string, string]> = [
  ['Home', '/'],
  ['Features', '/features/'],
  ['theo, the agent', '/theo/'],
  ['Integrations', '/integrations/'],
  ['Plans', '/plans/'],
  ['Privacy policy', '/privacy/'],
  ['Support', '/support/'],
];

export const GET: APIRoute = async () => {
  const entries = await getCollection('help');
  const byHref = new Map(
    entries.map((e) => [`/docs/${e.id === 'index' ? '' : `${e.id}/`}`, e])
  );

  // Sidebar order, so the list reads the way the help center reads. Anything in
  // the collection but not in the sidebar still gets listed, so nothing is hidden.
  const ordered = [
    ...docsOrder.map((l) => byHref.get(l.href)).filter(Boolean),
    ...entries.filter((e) => !docsOrder.some((l) => byHref.get(l.href) === e)),
  ];

  // The llms.txt convention is `- [Name](url): notes`.
  const line = (label: string, path: string, blurb?: string) =>
    `- [${label}](${new URL(path, SITE_URL).href})${blurb ? `: ${blurb}` : ''}`;

  const body = [
    '# Total Recall',
    '',
    `> ${SITE_DESCRIPTION} One brain belongs to one person; data is never mixed between people.`,
    '',
    '## Products',
    '- Total Recall: the brain, the private memory and reasoning layer.',
    '- theo: the agent built on that brain, the intelligence you talk to.',
    '- The theo app: where you read your brief, ask anything, and act on what surfaces.',
    '',
    '## Help center',
    ...ordered.map((e) =>
      line(e!.data.title, `/docs/${e!.id === 'index' ? '' : `${e!.id}/`}`, e!.data.description)
    ),
    '',
    '## Product pages',
    ...PRODUCT_PAGES.map(([label, path]) => line(label, path)),
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
