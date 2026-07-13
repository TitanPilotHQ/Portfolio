# Operations OS — 04. Governance

## Ownership

Emad — sole operator of every tool, process, and (pending) legal structure
this module documents.

## Review criteria

A change to this module passes review only if:
1. The tool-stack list in `01-tool-stack.md` matches intake §5.2 exactly —
   no tool added, removed, or renamed without a new source.
2. No per-tool description in `01-tool-stack.md` states a capability,
   pricing tier, or contract term that isn't independently verifiable from
   this repo or directly sourced from Emad — inferred roles (e.g.,
   Hostinger as likely domain/DNS) are labeled as inference, not stated as
   confirmed fact.
3. `02-sops-and-processes.md`'s engineering-SOP claim stays at "existence
   confirmed" — it does not drift into cataloguing what those SOPs
   specifically are, since no source describes their content.
4. `03-legal-entity-and-structure.md`'s Phase A correctly cites Module 07
   (`01-company-snapshot.md`) for the "no incorporated entity" fact rather
   than restating its sourcing independently.
5. `03-legal-entity-and-structure.md`'s Phase B contains no invented
   jurisdiction, entity type, or entity name — conditional framing only.

## Adversarial review focus

- Does any tool description in `01-tool-stack.md` overclaim — stating what
  a tool is *capable of* in general rather than what this repo actually
  shows it being used for?
- Does `01-tool-stack.md` or `02-sops-and-processes.md` accidentally
  restate a fact Module 06 or Module 07 already owns, instead of citing it
  (Global Constraint 4 — Single Source of Truth)? Specifically: does this
  module describe what Upstash means for sales pipeline tracking (Module
  06's fact) instead of just its infrastructure role, and does it restate
  the sourcing detail behind "no incorporated entity" (Module 07's fact)
  instead of citing it?
- Does `02-sops-and-processes.md`'s recursive-relationship section (LaunchOS
  as both a Module 10 subject and Module 10's own formalization mechanism)
  read as confused or as a mistake, rather than as the intentional, sourced
  observation it's written to be? If a reviewer's first reaction is "this
  looks like a bug," the framing needs to be clearer, not the underlying
  claim removed.
- Does `03-legal-entity-and-structure.md`'s Phase B smuggle in a plausible
  default (e.g., "likely Delaware," "likely a C-Corp") anywhere, even
  hedged? Plausible-sounding defaults are exactly the failure mode Global
  Constraint 1 targets, and Phase B sections are the highest-risk spot for
  it across the whole LaunchOS program.
- Does `01-tool-stack.md` claim GitHub Actions runs a specific pipeline in
  this repo? It should not — no workflow file exists here, and the file
  states that gap plainly rather than describing an assumed CI process.

## Honest note on enforcement

Same caveat as Modules 01 and 09: no CI/lint check enforces anything in
this module. The one real, concrete mechanism that exists is
`.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" section — a
checklist surfaced at PR-creation time, not a gate. It can be skipped, and
for a solo founder, review and maintenance ultimately depend on Emad (or
whoever is reviewing a given PR) actually reading the checklist and, where
relevant, extending it to cover this module's own triggers below (the
current checklist template does not yet have Module 10-specific rows —
that's a gap worth closing but is not a claim this file makes on the
template's behalf). If this company adds a second reviewer or CI capacity
later, upgrading this to an actual automated check is the natural next
step — this file does not claim more rigor than the PR-template checkbox
actually provides today.

## Maintenance triggers

- A tool is added, removed, or replaced in the actual stack → update
  `01-tool-stack.md` in the same change.
- A tool's role changes (e.g., a new inferred role gets confirmed, or an
  unconfirmed role like GitHub Actions gains a real workflow file in this
  repo) → update `01-tool-stack.md`'s relevant section from inference to
  confirmed fact, with citation.
- An engineering or business-operations SOP gets written down formally
  somewhere real (a runbook, a handbook, a standalone process doc) → note
  it in `02-sops-and-processes.md` in the same change.
- Incorporation actually happens → `03-legal-entity-and-structure.md`'s
  Phase A and Phase B flip (Phase A becomes historical, Phase B becomes
  current with real specifics), coordinated with Module 07
  (`01-company-snapshot.md`) in the same change, since both files cite the
  same underlying fact.
- A support tool, sales tool, or pipeline-tracking tool is adopted
  (flagged from Module 06 or Module 09's own maintenance sections) →
  check whether it also belongs in this module's `01-tool-stack.md` general
  list.

## Cross-references

- **Depends on:** Module 01 (`06-governance.md` — governance-file pattern),
  Module 06 (`02-tooling-and-pipeline.md` — sales-specific tooling fact,
  cited not restated), Module 07 (`01-company-snapshot.md` — legal-entity
  Phase A/B fact, cited not restated)
- **Feeds:** Module 06 (`02-tooling-and-pipeline.md` cites this module for
  the general tool-stack fact), Module 07 (incorporation, when it happens,
  is coordinated through this module's Phase A/B flip), Module 09
  (`02-support-model.md` and `04-governance.md` both check this module for
  tool-stack overlap when a support or sales tool is adopted)

## Closure

Complete once all four files in this directory pass independent and
adversarial review with no open findings, and the PR is merged.
