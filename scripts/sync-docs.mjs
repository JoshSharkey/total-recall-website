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
const DEST = join(HERE, '..', 'src', 'content', 'docs', 'docs');
const KEEP = new Set(['index.md', 'faq.md', 'synthesis.md', 'overview.md']); // hand-authored

// curated help articles: filename -> display title override
const ALLOW = {
  'search.md': 'How search works',
  'daily-brief.md': 'Daily brief',
  'phone-access.md': 'Using it from your phone',
  'backups-privacy.md': 'Privacy & backups',
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
  const fm = [
    '---',
    `title: ${yaml(title)}`,
    data.summary ? `description: ${yaml(data.summary)}` : null,
    '---',
    '',
  ].filter(Boolean).join('\n');
  // sanitize body: drop the leading H1 (Starlight renders the title) and strip
  // repo-relative / .md links that would 404 on the site (keep http + /site links).
  let clean = body.replace(/^\n+/, '').replace(/^#\s+.*\n+/, '');
  clean = clean.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (m, text, href) =>
    href.startsWith('http') || href.startsWith('/') ? m : text
  );
  writeFileSync(join(DEST, file), fm + clean);
  published++;
}
console.log(`synced ${published} curated help articles -> ${DEST}`);
