// Sync the public capability docs from the total-recall repo into this site.
// Single source of truth = total-recall/docs/capabilities. Re-run after the
// brain's capability docs change:  npm run sync:docs
//
// Only files marked `access: public` are published. index.md and faq.md in the
// destination are hand-authored and never touched here.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, '..', '..', 'total-recall', 'docs', 'capabilities');
const DEST = join(HERE, '..', 'src', 'content', 'docs', 'docs');
const KEEP = new Set(['index.md', 'faq.md']); // hand-authored, don't clobber

if (!existsSync(SRC)) {
  console.error(`Source not found: ${SRC}\nClone total-recall next to this repo, or update the path.`);
  process.exit(1);
}
mkdirSync(DEST, { recursive: true });

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
const yaml = (s) => JSON.stringify(String(s ?? '')); // safe double-quoted scalar

let published = 0,
  skipped = 0;
for (const file of readdirSync(SRC)) {
  if (!file.endsWith('.md')) continue;
  if (KEEP.has(file)) continue;
  const { data, body } = parseFrontmatter(readFileSync(join(SRC, file), 'utf8'));
  if ((data.access || '').toLowerCase() !== 'public') {
    skipped++;
    continue;
  }
  const fm = [
    '---',
    `title: ${yaml(data.title || file.replace(/\.md$/, ''))}`,
    data.summary ? `description: ${yaml(data.summary)}` : null,
    '---',
    '',
  ]
    .filter(Boolean)
    .join('\n');
  writeFileSync(join(DEST, file), fm + body.replace(/^\n+/, ''));
  published++;
}
console.log(`synced ${published} public capability pages -> ${DEST} (skipped ${skipped} non-public)`);
