// Central site constants. Update SITE_URL once the domain is purchased —
// it drives canonical URLs, sitemap, robots, and Open Graph tags.
export const SITE_URL = 'https://totalrecallhq.com';
// Pre-launch: keep search engines from indexing the preview. Flip to false at launch.
export const PRELAUNCH = true;
export const SITE_NAME = 'Total Recall';
export const SITE_TAGLINE = 'Your whole world, remembered.';
export const SITE_DESCRIPTION =
  'Total Recall is a private, single-owner second brain. It collects your documents, notes, emails, messages, meetings, people, and health into one place and lets you ask questions about all of it in plain language. theo is the agent you talk to.';
// The cockpit (theo) app — link out to the product when ready.
export const APP_URL = 'https://asktheo.totalrecallhq.com';
export const CONTACT_EMAIL = 'hello@totalrecallhq.com'; // needs Cloudflare Email Routing forward before launch
// Early access: the real intake form (theo #298). It renders from the vendored
// question set in src/data/intake-config.json (one source: theo's wizard
// questions) and submits to theo's public intake endpoint, which stores a
// pending lead — admission stays a human decision. The old Google Form and the
// mailto fallback are retired.
export const EARLY_ACCESS_PATH = '/early-access';
export const INTAKE_ENDPOINT = `${APP_URL}/api/intake`;
