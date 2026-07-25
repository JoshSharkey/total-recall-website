// The help center sidebar. One source of truth for the docs nav — the sidebar,
// the prev/next footer links, and the "all articles" list on /docs/ all read it.
export type DocsLink = { label: string; href: string };
export type DocsGroup = { label: string; items: DocsLink[] };

export const docsNav: DocsGroup[] = [
  {
    label: 'Start here',
    items: [
      { label: 'Help center', href: '/docs/' },
      { label: 'What is Total Recall', href: '/docs/overview/' },
      { label: 'Who is theo', href: '/docs/who-is-theo/' },
      { label: 'What is the Ask Theo app', href: '/docs/ask-theo-app/' },
      { label: 'FAQ', href: '/docs/faq/' },
    ],
  },
  {
    label: 'How it works',
    items: [
      { label: 'How search works', href: '/docs/search/' },
      { label: 'Synthesis', href: '/docs/synthesis/' },
      { label: 'Daily brief', href: '/docs/daily-brief/' },
      { label: 'Using it from your phone', href: '/docs/phone-access/' },
    ],
  },
  {
    label: 'Privacy & ownership',
    items: [
      { label: 'Your data & ownership', href: '/docs/ownership/' },
      { label: 'Privacy & backups', href: '/docs/backups-privacy/' },
    ],
  },
];

/** Flat reading order, used for the prev/next links at the foot of each article. */
export const docsOrder: DocsLink[] = docsNav.flatMap((g) => g.items);
