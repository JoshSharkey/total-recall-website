---
title: "Notes"
description: "Your notes from Notion, Apple Notes, Google Keep, and other apps can be loaded into the brain (Notion syncs automatically through its API), with an automatic safety check that drops anything sensitive first."
---# Notes

**In plain terms:** the half-formed thoughts, lists, and ideas you keep in a notes
app can become part of your brain, so a stray idea you jotted months ago can
actually resurface when it is relevant.

Because notes often contain private things (passwords, health details, personal
reflections), every note passes through an automatic safety check before it can
enter the brain. Anything that looks sensitive is dropped, not stored.

## What you can do with it

- "Find my note about the family trip plan."
- "What ideas did I jot down for the new product?"
- Old notes surface naturally when you search a related topic.

## How it works (simply)

There are two ways notes get in, depending on the app:

- **A live feed (best):** if the app has an API, the brain pulls your notes
  automatically on a schedule. Notion works this way: you connect it once, and
  changed pages flow in by themselves.
- **An export:** apps without a usable API need a one-time (ideally recurring)
  export of their notes into a folder the brain reads.

Either way, the brain then runs a strict, automatic secret check. Anything that
looks sensitive (a password, a private detail) is dropped before it can enter
the brain.

## Supported note apps

- **Notion** (a live feed): connect a Notion integration once and the brain
  pulls every page you share with it, automatically and on a schedule. It only
  ever adds and updates, so your brain is the durable copy: deleting notes in
  Notion, or stopping Notion entirely, never erases what the brain already
  learned.
- **Apple Notes** (on a Mac): a guided export, curate, review, and promote flow.
- **Google Keep**: exported via Google Takeout, then run through the same safety
  pipeline. Refreshes when you re-export.
- **OneNote, Obsidian, others**: export to Markdown into the source folder, then
  load.

## Honest limits

- Notion refreshes automatically once connected. Most other notes apps refresh
  on a manual export, not a live sync (Apple Notes can be scheduled).
- The safety check is deliberately strict; it would rather drop a borderline note
  than risk storing something sensitive.

## Set it up

- [Notion](../notion-sync.md)
- [Apple Notes](../apple-notes-sync.md)
- [Google Keep](../google-keep-sync.md)
