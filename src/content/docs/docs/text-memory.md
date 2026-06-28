---
title: "Text-message memory"
description: "The brain reads your text threads (iMessage on a Mac, regular SMS/MMS on Android) and remembers the meaningful life updates people share, so you can ask what is new with someone. Android cannot capture RCS or most group chats."
---# Text-message memory

**In plain terms:** the brain can read your text-message threads and quietly
remember the meaningful things people tell you, so you do not have to. If a
friend mentions they got a new job, moved cities, or had a baby, that ends up in
their profile in your brain without you lifting a finger. Later you can ask "what
is going on with Jane lately?" and get the answer.

It only pays attention to things worth remembering. The "running 5 min late" and
"ok " and "" messages are ignored. Life updates, milestones, plans, and changes
are what it keeps.

## What you can do with it

- "What is new with Jane since we last talked?"
- "Did anyone mention a job change recently?"
- "Remind me what my brother said about the family trip."
- Birthdays, kids' names, new roles, and moves picked up from texts show up on
  people's profiles automatically.

## How it works (and why the device matters)

The brain learns from texts by reading them on a computer you control. That is
the important part: **a text message lives on your phone and your computer, and
the brain reads it there.** This is different from a website or a cloud service,
which can never reach into your phone.

There are two cases, depending on your phone:

### iPhone (iMessage)
If the brain runs on **your own Mac**, it can read your iMessage history directly
on that Mac (Macs keep a copy of your messages). This is the smoothest version:
it stays current on its own and captures essentially all of your iMessage
conversations.

### Android (SMS / text messages)
Android is trickier, and it comes with one real limitation worth understanding.

**The plain-English version:** modern Android phones actually have two kinds of
"texts." The older kind (regular SMS and picture messages) can be backed up and
read by the brain. The newer kind (called RCS, which is what most up-to-date
Android phones and most group chats now use) is locked down by the phone and
**cannot** be backed up or read by any outside tool. So on Android, the brain can
remember your standard texts, but it will **miss RCS messages and most group
chats**.

The honest summary for an Android person: "I can pull in your regular text
messages, but not the newer encrypted ones or most group threads." If your most
important conversations happen in Android group chats, this feature will only
capture part of the picture.

How it gets the texts: you install a small "text backup" app on your Android
phone that saves your texts to a folder, which then syncs to the Mac where the
brain reads them. Because it depends on that app running on a
schedule, it is also a little less up-to-the-minute than the iPhone version.

## What it needs

- **A Mac** (a Mac for iPhone texts; a Mac with the Android backup folder synced
  to it for Android texts). A phone or a cloud server alone cannot do this.
- It does **not** have to be an *always-on* Mac. An always-on Mac (a Mac mini)
  keeps your texts current minute-to-minute. But your **everyday MacBook works
  too** — it reads your texts on a schedule and catches up whenever you open the
  lid and it's online. You still get *every* message; brand-new ones just show
  up in the brain a little later instead of instantly. The tradeoff is freshness,
  not coverage.
- For Android: a one-time setup of a text-backup app on the phone.

## Honest limits

- **Cloud-only brains cannot do this at all.** A server cannot read anyone's
  phone. Text memory only works when the brain runs on your own Mac (a Mac mini
  for always-current, or your own MacBook for everything-but-delayed).
- **Android: standard SMS/MMS only.** RCS and most group chats are not captured.
- **Privacy:** texts are personal. The brain extracts facts objectively and you
  can exclude specific threads. See the privacy notes in the runbooks.

## Set it up

- iPhone: the iMessage extractor (operator setup; runs on the owner's Mac).
- Android: [Android text-message memory runbook](../android-sms-sync.md).
