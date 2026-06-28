// Shared marketing content — single place to edit features, integrations, use cases.
// Sourced from the intake form (docs/intake-questionnaire.md) + capability docs.

export const STREAM = {
  teal: '#46c2c2',
  blue: '#6aa6ef',
  green: '#3fae74',
  gold: '#e3b34d',
  orange: '#f0a35a',
  violet: '#a78be6',
  rose: '#e07a8b',
};

// The core capability groups — how the product is illustrated on Features/Home/Plans.
export const capabilityGroups = [
  {
    color: STREAM.green,
    title: 'Memory & search',
    blurb: 'Bring your whole world in, then ask anything in plain language.',
    items: ['Documents, notes, email, messages, meetings', 'Semantic search by meaning, not keywords', 'Answers with the receipts, grounded in your data'],
  },
  {
    color: STREAM.gold,
    title: 'Synthesis & intelligence',
    blurb: 'The point of it all: it connects everything and thinks with you.',
    items: ['Patterns across work, health, and life', 'Blind spots your own biases hide', 'Daily brief + weekly & monthly synthesis', 'Pressure-test decisions against everything you know'],
  },
  {
    color: STREAM.orange,
    title: 'Proactive agents & action',
    blurb: 'It does, not just remembers. It can reach out and act.',
    items: ['Messages you on Telegram or Slack', 'Reminders and relationship cadence', 'Close tasks, mark goals, draft and send'],
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
    items: ['WHOOP, Oura, recovery & sleep', 'Medications & supplements', 'Correlations you would never spot alone'],
  },
  {
    color: STREAM.violet,
    title: 'Capture',
    blurb: 'Catch the fleeting stuff before it is gone.',
    items: ['Notes, journal, dreams, ideas', 'Voice capture on the go', 'Write straight to your brain'],
  },
];

// Integrations / sources — grouped, drawn from intake "what should your brain know about".
export const integrationGroups = [
  { title: 'Work & documents', tools: ['Google Drive', 'OneDrive', 'Dropbox', 'Notion', 'iCloud', 'Spreadsheets', 'Decks', 'Figma'] },
  { title: 'Notes', tools: ['Apple Notes', 'Notion', 'Obsidian', 'OneNote', 'Evernote', 'Google Keep', 'Bear', 'Roam / Logseq'] },
  { title: 'Communication', tools: ['Gmail', 'Google Workspace', 'Outlook', 'Slack', 'iMessage / SMS', 'WhatsApp'] },
  { title: 'Meetings & people', tools: ['Calendar', 'Meeting transcripts', 'Contacts', 'Sales & customer calls'] },
  { title: 'Health & life', tools: ['WHOOP', 'Oura', 'Medications'] },
  { title: 'Media', tools: ['Podcasts', 'Books', 'Newsletters'] },
  { title: 'It reaches you', tools: ['Telegram', 'Slack'] },
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

// "What made you want a second brain?" — the motivations / outcomes.
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
