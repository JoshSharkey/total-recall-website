// Sync a CURATED set of help articles from the total-recall repo into the help center.
// The marketing pages (Features/Plans) illustrate capabilities; the help center is for
// genuine support articles only — not every capability doc.
//
//   npm run sync:docs
//
// Source of truth = total-recall/docs/capabilities (files marked `access: public`).
// index.md and faq.md here are hand-authored and never touched.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, '..', '..', 'total-recall', 'docs', 'capabilities');
const DEST = join(HERE, '..', 'src', 'content', 'help');
const KEEP = new Set([
  'index.md',
  'faq.md',
  'synthesis.md',
  'overview.md',
  'ownership.md',
  'who-is-theo.md',
  'ask-theo-app.md',
]); // hand-authored

// curated help articles: filename -> display title override
const ALLOW = {
  'search.md': 'How search works',
  'daily-brief.md': 'Daily brief',
  'phone-access.md': 'Using it from your phone',
  'backups-privacy.md': 'Privacy & backups',
};

// Repo-relative links that DO have a home on the website. Anything not listed here
// is stripped to plain text, because a repo path 404s for a reader on the site.
const LINK_MAP = {
  'overview.md': '/docs/overview/',
  'search.md': '/docs/search/',
  'daily-brief.md': '/docs/daily-brief/',
  'phone-access.md': '/docs/phone-access/',
  'backups-privacy.md': '/docs/backups-privacy/',
  'synthesis.md': '/docs/synthesis/',
  '../deploy-cloud.md': '/plans/',
};

if (!existsSync(SRC)) {
  console.error(`Source not found: ${SRC}\nClone total-recall next to this repo, or update the path.`);
  process.exit(1);
}
mkdirSync(DEST, { recursive: true });

// clean previously-synced files (anything not hand-authored)
for (const f of readdirSync(DEST)) {
  if (f.endsWith('.md') && !KEEP.has(f)) rmSync(join(DEST, f));
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split('\n')) {
    const km = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (km) data[km[1]] = km[2].replace(/^["']|["']$/g, '').trim();
  }
  return { data, body: m[2] };
}
const yaml = (s) => JSON.stringify(String(s ?? ''));

let published = 0;
for (const [file, title] of Object.entries(ALLOW)) {
  const path = join(SRC, file);
  if (!existsSync(path)) {
    console.warn(`skip (missing): ${file}`);
    continue;
  }
  const { data, body } = parseFrontmatter(readFileSync(path, 'utf8'));
  if ((data.access || '').toLowerCase() !== 'public') {
    console.warn(`skip (not public): ${file}`);
    continue;
  }
  // NOTE: the trailing '' must survive, or the closing --- fence ends up glued to
  // the first line of the body and the frontmatter stops parsing. filter(Boolean)
  // used to eat it, which is how four articles shipped with a broken fence.
  const fm =
    [
      '---',
      `title: ${yaml(title)}`,
      data.summary ? `description: ${yaml(data.summary)}` : null,
      '---',
    ]
      .filter(Boolean)
      .join('\n') + '\n\n';
  // sanitize body: drop the leading H1 (the layout renders the title) and strip
  // repo-relative / .md links that would 404 on the site (keep http + /site links).
  let clean = body.replace(/^\n+/, '').replace(/^#\s+.*\n+/, '');
  clean = clean.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, href) => {
    if (href.startsWith('http') || href.startsWith('/')) return m;
    const mapped = LINK_MAP[href.split('#')[0]];
    return mapped ? `[${text}](${mapped})` : text;
  });
  // Drop a trailing "## Learn more" section. Its links all point at repo docs that
  // do not exist on the site, so link-stripping leaves a list of dead plain text.
  // The help center sidebar and prev/next pager already do this job.
  clean = clean.replace(/\n##\s+Learn more\b[\s\S]*$/, '\n');
  writeFileSync(join(DEST, file), clean ? fm + clean.replace(/\s*$/, '\n') : fm);
  published++;
}
console.log(`synced ${published} curated help articles -> ${DEST}`);
