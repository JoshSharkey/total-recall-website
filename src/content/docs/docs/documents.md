---
title: "Documents & files"
description: "Point the brain at a folder of your files (Google Drive or OneDrive) and they become searchable memory, including PDFs, Word docs, and spreadsheets."
---# Documents & files

**In plain terms:** the brain turns your existing pile of files into something you
can actually ask questions of. Instead of hunting through folders, you ask "where
did we land on the vendor contract?" and it answers from the documents
themselves.

It reads a folder you choose. Whatever you keep in sync with that folder becomes
part of the brain, and it stays current as you add or change files.

## What you can do with it

- "Find the deck from the board meeting."
- "What were the terms in the latest contract draft?"
- "Pull the numbers from the budget spreadsheet."

## What it can read

- Plain text and Markdown, Word documents, PDFs, and spreadsheets.
- Files in **Google Drive** or **OneDrive** (via each service's sync app, which
  mirrors the files to a folder the brain reads).

## How it works (simply)

You designate one source folder. The brain scans it, reads each supported file,
and stores its meaning for search. Re-scanning is smart: unchanged files are
skipped, so feeding it again is quick and safe. Sensitive files (anything that
looks like credentials) are automatically refused before they are ever read.

## Honest limits

- Files that are "online only" placeholders (not downloaded) look empty. Keep the
  folder fully downloaded.
- A cloud-hosted brain has no sync app, so documents are loaded at setup and
  refreshed by re-uploading, rather than syncing live.

## Set it up

- [Google Drive source folder](../SETUP-NEW-INSTANCE.md)
- [OneDrive](../onedrive-sync.md)
