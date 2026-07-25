// The indexing switch, said out loud and then checked.
//
// PRELAUNCH in src/consts.ts decides one thing: whether every page ships with a
// "do not index" tag telling Google and friends to stay away. It is one boolean
// with two silent failure modes. Left true at launch, the site goes live invisible
// and nothing complains. Flipped false too early, half-finished pages get indexed
// and cached, which is slow and only partly reversible. Neither one is an error,
// the build is green either way, so the wrongness never shows up in a log.
//
// So this integration does the two things a silent setting needs:
//   1. Every build prints where the switch is set, in plain words. No deploy can
//      happen without the posture being stated in the build log.
//   2. After the build, every emitted HTML page is read back and compared against
//      the flag. Intent has to match output, or the build fails with a non-zero
//      exit and names the files that disagree. That catches the page that hardcodes
//      the tag, and the new page that skips BaseHead.astro entirely.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PRELAUNCH, SITE_URL } from '../consts.ts';

const RULE = '='.repeat(72);

/** Collect every HTML file under a directory, recursively, as paths relative to it. */
function htmlFilesIn(dir, prefix = '') {
  const found = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) found.push(...htmlFilesIn(join(dir, entry.name), rel));
    else if (/\.html?$/i.test(entry.name)) found.push(rel);
  }
  return found;
}

// Match the tag by meaning, not by exact string, because the attributes can be in
// either order and a minifier may drop the quotes. A tag counts as hiding the page
// if it addresses search robots and its content says noindex (or "none", which
// Google reads as the same thing).
function hidesFromSearch(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.some((tag) => {
    const name = tag.match(/\bname\s*=\s*["']?([\w-]+)/i)?.[1] ?? '';
    const content = tag.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1] ?? '';
    const addressesRobots = /^(robots|[\w-]*bot[\w-]*)$/i.test(name);
    return addressesRobots && /\b(noindex|none)\b/i.test(content);
  });
}

// Astro writes its own tiny stub page for every entry in `redirects`, and that stub
// hardcodes a noindex tag we do not control (astro/dist/core/routing/3xx.js). A stub
// is a signpost, not a page, so it is exempt from both directions of the check.
// Without this, adding a single redirect at launch would fail the build with advice
// that leads nowhere.
const isRedirectStub = (html) => /<meta\b[^>]*http-equiv\s*=\s*["']?refresh/i.test(html);

function banner(lines) {
  console.log(`\n${RULE}\n${lines.map((l) => `  ${l}`.trimEnd()).join('\n')}\n${RULE}\n`);
}

export default function prelaunchGuard() {
  // Filled in from the resolved config, so the check knows which files in the
  // output are just copies of public/ rather than pages the site rendered.
  let publicHtml = new Set();

  return {
    name: 'prelaunch-guard',
    hooks: {
      'astro:config:done': ({ config }) => {
        const publicDir = fileURLToPath(config.publicDir);
        publicHtml = new Set(existsSync(publicDir) ? htmlFilesIn(publicDir) : []);
      },

      'astro:build:start': () => {
        if (PRELAUNCH) {
          banner([
            'SEARCH ENGINES: HIDDEN (this is the pre-launch setting)',
            '',
            'Every page of',
            `${SITE_URL} will carry a "do not index" tag.`,
            'Google and other search engines are being told to keep this site',
            'out of their results. That is on purpose while the site is not',
            'launched yet.',
            '',
            'When you want the site to be findable, open src/consts.ts and set',
            'PRELAUNCH = false, then build again.',
          ]);
        } else {
          banner([
            'SEARCH ENGINES: ALLOWED (this site is being built as public)',
            '',
            'No page of',
            `${SITE_URL} will carry a "do not index" tag.`,
            'Search engines may crawl this site, list it, and show it in their',
            'results.',
            '',
            'Once pages are indexed they are slow to pull back and that part is',
            'not fully in our hands, so only ship this build if the site is',
            'meant to be public. To hide it again, set PRELAUNCH = true in',
            'src/consts.ts.',
          ]);
        }
      },

      // astro:build:done runs after the files are written and hands us the output
      // directory, so we are reading this build's pages, not whatever happened to
      // be sitting in dist/ from last time.
      'astro:build:done': ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const emitted = htmlFilesIn(outDir);

        // Files we copied verbatim out of public/ are not pages we render, so no
        // layout ever put a tag on them. The usual example is the little
        // verification file a search console asks you to host. Skipping them is
        // announced below, never silent.
        const copied = emitted.filter((p) => publicHtml.has(p));
        const stubs = [];
        const pages = [];
        for (const p of emitted) {
          if (publicHtml.has(p)) continue;
          const html = readFileSync(join(outDir, p), 'utf8');
          if (isRedirectStub(html)) stubs.push(p);
          else pages.push({ path: p, hidden: hidesFromSearch(html) });
        }
        const skipped = copied.length + stubs.length;
        if (skipped > 0) {
          console.log(
            `[prelaunch-guard] not checking ${skipped} file(s): ${[...copied, ...stubs].join(', ')} (copied from public/ or redirect stubs).`
          );
        }

        // No pages at all means the build emitted nothing or we are looking in the
        // wrong place. Either way the check below would pass without testing
        // anything, and a check that cannot fail is not a check.
        if (pages.length === 0) {
          fail([
            'The indexing check found no HTML pages to inspect.',
            `Looked in: ${outDir}`,
            'The build may have emitted nothing, or the output directory moved.',
          ]);
          return;
        }

        if (PRELAUNCH) {
          const missing = pages.filter((p) => !p.hidden);
          if (missing.length > 0) {
            fail([
              'PRELAUNCH is true, so every page must carry the "do not index" tag.',
              `${missing.length} of ${pages.length} pages do not:`,
              '',
              ...missing.map((p) => `  ${p.path}`),
              '',
              'A page usually ends up here because it does not render',
              'src/components/BaseHead.astro, which is what adds the tag.',
              'Search engines would be free to index those pages today.',
            ]);
            return;
          }
          console.log(
            `[prelaunch-guard] checked ${pages.length} pages: all carry the "do not index" tag, as expected while PRELAUNCH is true.\n`
          );
          return;
        }

        const stillHidden = pages.filter((p) => p.hidden);
        if (stillHidden.length > 0) {
          fail([
            'PRELAUNCH is false, so no page may carry the "do not index" tag.',
            `${stillHidden.length} of ${pages.length} pages still do:`,
            '',
            ...stillHidden.map((p) => `  ${p.path}`),
            '',
            'Those pages would stay invisible to search engines even though the',
            'rest of the site went public. Look for a hardcoded robots meta tag',
            'in the page or layout that produced them.',
          ]);
          return;
        }
        console.log(
          `[prelaunch-guard] checked ${pages.length} pages: none carry the "do not index" tag, as expected while PRELAUNCH is false.\n`
        );
      },
    },
  };
}

// Fail loudly and fail the exit code. Throwing from a hook is what stops Astro
// today (it exits 1). Setting exitCode too is insurance against a future version
// that logs a hook error and carries on, because a build that reports success is
// exactly how this kind of thing ships wrong.
function fail(lines) {
  banner(['INDEXING CHECK FAILED', '', ...lines]);
  process.exitCode = 1;
  throw new Error(
    `prelaunch-guard: the built pages do not match PRELAUNCH = ${PRELAUNCH} in src/consts.ts. See the details above.`
  );
}
