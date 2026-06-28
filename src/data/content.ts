// Shared marketing content — single place to edit features, sources, surfaces, use cases.
// Sourced from the intake form (docs/intake-questionnaire.md) + capability docs.
// Positioning: Total Recall = the brain (memory + synthesis). Theo = the agent built on it.
// Use it anywhere: Theo app + messaging channels, or plug your brain into any AI.

export const STREAM = {
  teal: '#46c2c2',
  blue: '#6aa6ef',
  green: '#3fae74',
  gold: '#e3b34d',
  orange: '#f0a35a',
  violet: '#a78be6',
  rose: '#e07a8b',
};

// Capability groups — memory + synthesis lead; action is a supporting act (not the pitch).
export const capabilityGroups = [
  {
    color: STREAM.green,
    title: 'Total memory',
    blurb: 'Bring your whole world in, then ask anything in plain language.',
    items: ['Documents, notes, email, messages, meetings', 'Search by meaning, not keywords', 'Answers grounded in your own data, with the receipts'],
  },
  {
    color: STREAM.gold,
    title: 'Synthesis',
    blurb: 'The heart of it: it connects everything and thinks with you.',
    items: ['Patterns across work, health, and life', 'Blind spots your own biases hide', 'A daily brief, plus weekly and monthly synthesis', 'Pressure-test decisions against all you know'],
  },
  {
    color: STREAM.blue,
    title: 'People',
    blurb: 'A personal CRM that surfaces the right person at the right moment.',
    items: ['Everyone you know, remembered', 'Prep before a call or meeting', 'Who to reconnect with, and why now'],
  },
  {
    color: STREAM.rose,
    title: 'Health & life',
    blurb: 'Your body in context with the rest of your life.',
    items: ['WHOOP, Oura, recovery and sleep', 'Medications and supplements', 'Correlations you would never spot alone'],
  },
  {
    color: STREAM.violet,
    title: 'Capture',
    blurb: 'Catch fleeting thoughts before they are gone.',
    items: ['Notes, journal, dreams, ideas', 'Voice capture on the go', 'Write straight to your brain'],
  },
  {
    color: STREAM.orange,
    title: 'It can act',
    blurb: 'When you want it to, it does more than answer.',
    items: ['Reaches out on Telegram, Slack, or the app', 'Reminders and relationship cadence', 'Closes tasks, marks goals, drafts and sends'],
  },
];

// What it CONNECTS — the sources it ingests (from intake "what should your brain know about").
export const sourceGroups = [
  { title: 'Work & documents', tools: ['Google Drive', 'OneDrive', 'Dropbox', 'Notion', 'iCloud', 'Spreadsheets', 'Decks', 'Figma'] },
  { title: 'Notes', tools: ['Apple Notes', 'Notion', 'Obsidian', 'OneNote', 'Evernote', 'Google Keep', 'Bear', 'Roam / Logseq'] },
  { title: 'Communication', tools: ['Gmail', 'Google Workspace', 'Outlook', 'Slack', 'iMessage / SMS', 'WhatsApp'] },
  { title: 'Meetings & people', tools: ['Calendar', 'Meeting transcripts', 'Contacts', 'Sales & customer calls'] },
  { title: 'Health & life', tools: ['WHOOP', 'Oura', 'Medications'] },
  { title: 'Media', tools: ['Podcasts', 'Books', 'Newsletters'] },
];

// Where you USE it — two modes. Theo (first-party) + your brain in any AI.
export const surfaceGroups = [
  {
    title: 'Theo, your agent',
    blurb: 'Purpose-built for your brain. The app at full strength, plus messaging wherever you are.',
    tools: ['Theo app', 'Telegram', 'Slack', 'WhatsApp'],
  },
  {
    title: 'Or any AI you already use',
    blurb: 'Your brain is portable. Plug it into the tools you live in.',
    tools: ['Claude', 'ChatGPT', 'Gemini', 'Any MCP-capable tool'],
  },
];

// "What would you ask your brain?" — straight from the intake form options.
export const useCasesAsk = [
  { q: 'What am I missing about my team’s morale right now?', c: STREAM.orange },
  { q: 'Summarize everything I know about a person or company.', c: STREAM.blue },
  { q: 'Pull the action items from my last meeting.', c: STREAM.teal },
  { q: 'What did we decide last week about the new pricing model?', c: STREAM.gold },
  { q: 'Prep me before my next call.', c: STREAM.blue },
  { q: 'Spot patterns in my habits, mood, and health.', c: STREAM.rose },
  { q: 'Find that note or idea I can’t locate.', c: STREAM.green },
  { q: 'Who should I reconnect with, and why now?', c: STREAM.orange },
  { q: 'Send a Slack to Sarah about the launch.', c: STREAM.violet },
  { q: 'What book should I read next?', c: STREAM.gold },
];

// "What made you want a second brain?" — motivations / outcomes.
export const motivations = [
  'Make better decisions',
  'Make faster decisions',
  'Catch blind spots in your thinking',
  'Be a better friend and colleague',
  'Never forget what matters',
  'Find anything instantly',
  'Find patterns that help you improve',
  'Build documents and artifacts faster',
];

// How it works — the simple mechanism (fills the "how" gap; safe, generic).
export const howItWorks = [
  { n: '1', color: STREAM.green, title: 'Connect your world', body: 'Point it at the sources you already use. It ingests them privately and keeps up to date in the background.' },
  { n: '2', color: STREAM.gold, title: 'It builds your brain', body: 'Everything is organized and linked into one private memory, then synthesized so the connections surface on their own.' },
  { n: '3', color: STREAM.blue, title: 'Ask Theo anywhere', body: 'Talk to your agent in the Theo app or your messaging channels, or plug your brain into the AI you already use.' },
  { n: '4', color: STREAM.orange, title: 'It compounds', body: 'A daily brief, proactive nudges, and sharper answers. It gets more valuable every day it learns.' },
];
