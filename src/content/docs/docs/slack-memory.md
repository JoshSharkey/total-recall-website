---
title: "Slack memory"
description: "The brain can learn from your team chat, capturing decisions and context from Slack so they are searchable later, and your assistant can also read and post messages live."
---# Slack memory

**In plain terms:** a lot of real decisions happen in team chat and then vanish up
the scroll. The brain can remember the parts that matter from Slack, so "what did
we decide about the launch date?" has an answer even weeks later.

## What you can do with it

- "What did the team decide about the new pricing?"
- "Catch me up on the customer-escalation channel."
- Your assistant can also **read channels and send messages** on your behalf.

## How it works (simply)

There are two layers, like email:

1. **Memory:** a background job reads relevant channels and stores the meaningful
   signals (decisions, customer signals, context) into the brain.
2. **Live actions:** through Claude's Slack connector, your assistant can search,
   read, and post in real time, from anywhere.

## What it needs

- The background "remember Slack" job runs on an always-on computer today.
- Live Slack actions work anywhere through the connector.

## Honest limits

- The automatic Slack *memory* job is scheduled on a Mac today and is not yet
  ported to a cloud-only brain.
- Reason about channels by topic, not by hard-coded names; channel names drift.

## Learn more

- [Search & retrieval](search.md)
- [Phone access & connectors](phone-access.md)
