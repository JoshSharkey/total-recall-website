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
// Waitlist: a hosted form the CTA links to (Google Form for now). Takes priority.
export const WAITLIST_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSffNSdRkqnk3CC8HDF_OuhCtNL0jSCecwA18hVILAIf8ta8xg/viewform';
// Optional inline POST endpoint (Formspree / Tally / Buttondown). Used only if no form URL.
export const WAITLIST_ENDPOINT = '';
