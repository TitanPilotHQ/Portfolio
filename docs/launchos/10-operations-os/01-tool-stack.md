# Operations OS — 01. Tool Stack

## The real current stack

> Current stack includes GitHub, Claude Code, ChatGPT, Vercel, Upstash,
> Resend, Hostinger, GitHub Actions, and self-managed VPS infrastructure.

*(Source: `INTAKE-REQUEST.md` §5.2, verbatim.)*

Nine items, listed in the order Emad gave them. This file states what each
is used for based on what's independently verifiable from this repo — not
on assumed capability, pricing, or plan tier, none of which is sourced
anywhere. Where the repo doesn't independently confirm a role, that's
stated plainly below rather than filled with a plausible-sounding guess.

## Per-tool role

### GitHub

Source control. This repo is a Git repository (`git status`, commit
history) and `.github/PULL_REQUEST_TEMPLATE.md` exists, confirming GitHub
(not just Git) as the hosting platform for the repo and its PR workflow.
The README states the standing practice: "every change ships on its own
branch, through a PR, reviewed against a Vercel Preview deployment before
merging to `main`" (`README.md:76-78`).

### Claude Code

Development tool. Not independently verifiable from repository artifacts
alone (no file in this repo asserts its own authorship tooling), but this
LaunchOS program and `docs/superpowers/` (spec → plan →
subagent-driven-implementation → review workflow, `README.md:74-75`) are
consistent with an AI coding agent being part of the development process.
Stated here per intake §5.2 as a tool in use; this file does not claim a
more specific role (e.g., which parts of the codebase it authored) than
that.

### ChatGPT

Not independently verifiable from repository artifacts at all — no file in
this repo references ChatGPT or its output. Stated here per intake §5.2 only
because Emad named it as part of the current stack. This file does not
guess what it's used for; that would be inventing a capability with no
source.

### Vercel

Hosting and deployment. Directly confirmed by the README: "Deployed on
Vercel, live at titanpilot.app" (`README.md:5-6`) and the Tech Stack table's
"Hosting: Vercel" (`README.md:91`). Also the target of the PR-review
workflow ("Vercel Preview deployment," `README.md:77`) and the analytics
integration (`@vercel/analytics`, `@vercel/speed-insights` in
`package.json`).

### Upstash

Redis key-value store, used for two confirmed purposes in this repo:
- Lead storage — `lib/server/leadStore.ts`'s `UpstashLeadStore` class
  persists contact-form submissions as `LeadRecord` entries and generates
  sequential lead IDs via `redis.incr`.
- Rate limiting — the README notes that without Upstash credentials
  configured, "rate limiting falls back to an in-memory implementation"
  (`README.md:58-59`), confirming Upstash is the production rate-limiting
  backend for the contact form.

This is the general infrastructure fact. What this specific tool means for
sales pipeline tracking is Module 06's fact, not restated here — see
"Ownership boundary with Module 06" below.

### Resend

Transactional email. Directly confirmed by `lib/server/notification.ts`'s
`ResendNotificationProvider`, which sends contact-form notification emails
from `noreply@titanpilot.app`, and by `docs/deployment/w4b-deployment-checklist.md`,
which walks through Resend domain verification for that sending address.

### Hostinger

Likely domain registrar or DNS provider for `titanpilot.app`. This is an
inference, not a confirmed fact: the deployment checklist references "your
DNS provider for `titanpilot.app` (wherever that domain's DNS is currently
managed — check the existing `www.titanpilot.app` CNAME/A record's
provider if unsure)" (`docs/deployment/w4b-deployment-checklist.md:38-41`)
without naming Hostinger specifically, and no file in this repo names
Hostinger at all. Given intake §5.2 lists Hostinger alongside Vercel (hosting) and GitHub
(source control) rather than as a database, email, or dev-tool vendor,
domain/DNS is the most plausible role — but this file states that as an
inference, not as something the repo independently confirms.

### GitHub Actions

Listed in intake §5.2, but this repo currently contains no
`.github/workflows/` directory or workflow file (confirmed by directory
listing — `.github/` contains only `PULL_REQUEST_TEMPLATE.md`). This file
does not describe what GitHub Actions currently automates here, because
nothing in this repo shows it running anything. It may be configured
elsewhere (a different repo, or configured and not yet used in this one) —
that's outside what this repo can confirm. Stated as part of the stack per
intake; role stated as unconfirmed rather than guessed.

### Self-managed VPS infrastructure

Listed in intake §5.2 with no further detail and no corresponding artifact
in this repo (this repo is the marketing site, deployed on Vercel per
above — a self-managed VPS is infrastructure for something outside this
repo's scope, category-consistent with Titan Pilot being an
AI-trading-infrastructure company, `README.md:2-3`). Beyond that category-
level observation, this file does not guess what specifically runs on it;
that's a product-infrastructure fact this module has no source for.

## What this file deliberately does not invent

- Pricing, plan tier, or contract terms for any of the nine tools — none is
  sourced anywhere, and Global Constraint 1 (no fabrication) applies.
- A specific CI/CD pipeline definition for GitHub Actions — the repo shows
  no workflow file, so none is described.
- What Claude Code or ChatGPT are specifically used for beyond "part of the
  current stack" — no source states a specific task boundary between them.
- A confirmed role for Hostinger beyond "likely domain/DNS" — stated as
  inference, not fact.

## Ownership boundary with Module 06

Module 06 (`06-sales-os/02-tooling-and-pipeline.md`) cites this file for
the general tool-stack fact rather than restating the list. This file
returns the favor: it states the infrastructure role of each tool (e.g.,
Upstash is a Redis key-value store used for lead storage and rate
limiting) but does not state what any subset of that stack means for sales
specifically (e.g., that leads land in Upstash instead of a CRM, or what
"manual pipeline management" means in practice) — that's Module 06's fact,
already documented there. If this boundary ever needs to change, the fix is
in Module 06's file, not by duplicating its content here.

## Maintenance

If a tool is added, removed, or replaced, or if this repo gains a
`.github/workflows/` file (resolving the GitHub Actions gap above), this
file updates in the same change. See `04-governance.md` for the full
maintenance-trigger list.
