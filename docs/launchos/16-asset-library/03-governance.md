# Asset Library — 03. Governance

## Ownership

Emad — sole owner of what counts as a real, cataloged LaunchOS output and
of the decision to add any new visual asset file to `public/`. Same
ownership pattern as Finance OS (`11-finance-os/03-governance.md`),
Partnership OS (`12-partnership-os/03-governance.md`), Hiring OS
(`13-hiring-os/03-governance.md`), Competition Intelligence
(`14-competition-intelligence/03-governance.md`), and Market Research
Framework (`15-market-research-framework/03-governance.md`).

## Review criteria

A change to this module passes review only if:

1. **`01-launchos-catalog.md` exactly matches the real files that exist in
   `docs/launchos/` at review time.** This is the sharpest review
   criterion in this module. Unlike every other LaunchOS module, this
   module's primary content is an index of a growing 16-module program —
   a file that was renamed, added, or removed anywhere under
   `docs/launchos/` and not reflected in the catalog is a real defect, not
   a cosmetic one, because the catalog's entire job is to be an accurate
   map. A reviewer must diff the catalog's file lists against an actual
   directory listing, not trust that it was accurate when last written.
2. **The two facts in `02-visual-assets.md` match the real files' actual
   properties.** `public/logo.png`'s and `public/banner.png`'s stated
   format, dimensions, and every cited `file:line` reference must be
   independently checked against the real files and the real code at
   review time — not carried forward from a prior review without
   re-verification.
3. **The catalog indexes, never restates.** `01-launchos-catalog.md` names
   what each module's files are about at a directory-listing level of
   detail; it must not quote, paraphrase, or reproduce any fact, figure,
   claim, or table from any module's actual content (Global Constraint 4
   — every fact has exactly one canonical home, and this module owns none
   of the other 15 modules' facts).
4. **No asset, variant, or usage location is claimed that isn't
   independently verified.** `02-visual-assets.md`'s "what this file
   deliberately does not invent" section must stay accurate — if a new
   asset file is ever added to `public/`, this criterion requires it to be
   documented, not silently left off the "does not invent" list while
   also absent from the documented-assets section above it (either state
   would be a defect; the two sections must never disagree with the real
   contents of `public/`).

## Adversarial review focus

- Does `01-launchos-catalog.md` restate any module's actual content
  (a claim, a figure, a named entity, a quoted line) instead of just
  naming what topic a file covers? A one-line description that happens to
  contain a real fact (e.g., a specific pricing figure, a specific
  competitor name) is a Global Constraint 4 violation even if it reads as
  an innocuous summary.
- Does `02-visual-assets.md` invent any asset, variant, or usage location
  not independently verified against the real file and the real code —
  a favicon variant that doesn't exist, a usage site not actually present
  at the cited line, a dimension that doesn't match the real file?
- Does this module, taken as a whole, imply Titan Pilot's "asset library"
  is more mature or complete than it actually is — two image files plus a
  documentation index? Watch for language that gestures toward a fuller
  brand-asset program (a "growing library," an implied roadmap of
  forthcoming variants) that isn't grounded in a real, sourced plan.
- Does the "what this file deliberately does not invent" list in
  `02-visual-assets.md` quietly go stale — a new asset gets added to
  `public/` and this module's PR doesn't update the list, so the module
  now falsely claims something still doesn't exist?
- Does `01-launchos-catalog.md` silently drop or duplicate a file from the
  exact 15-module file list this module was built against? Cross-check
  the catalog against a real `docs/launchos/` directory listing, not
  against this module's own prior draft.

## What this asset library does not contain

Stated plainly, as the honest current state of Titan Pilot's marketing
collateral — not a gap to apologize for or a roadmap item awaiting
completion:

- No pitch deck
- No sales one-pager
- No explainer or demo video
- No social-media template set
- No press kit
- No swag or merchandise designs
- No logo variants beyond the single `logo.png` file (no dark/light
  variants, no horizontal/stacked lockups, no icon-only mark)

Titan Pilot is a solo-founder, pre-incorporation company (see Module 10,
`10-operations-os/03-legal-entity-and-structure.md`, and Module 13,
`13-hiring-os/01-current-state.md`, for the underlying team-size fact,
cited not restated). Two image files and a site built directly in code is
what a company at this stage has produced, and this module records that
fact rather than dressing it up.

## Honest note on enforcement

Same pattern as Modules 01, 09, 10, 11, 12, 13, 14, and 15: no CI/lint
check enforces anything in this module. The one real, concrete mechanism
is `.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" — a
checklist surfaced at PR-creation time, not a gate. It can be skipped, and
for a solo-founder company, review and maintenance ultimately depend on
Emad (or whoever is reviewing a given PR) actually reading it.

This module carries the highest staleness risk of any module in the
program. Every other module's governance file worries about drift against
one or two external sources (a pricing figure, a competitor list, a
research pipeline). This module's entire job is staying in sync with the
file structure of the other 15 modules simultaneously — any of them
gaining, losing, or renaming a file makes `01-launchos-catalog.md` stale
the moment it happens, with no natural trigger pointing back to this
module unless one is added explicitly. An Asset Library-specific row was
added to the template in this same change (mirroring Modules 11, 12, 13,
14, and 15's precedent), triggering on any LaunchOS module's file
structure changing at all — not on a specific fact changing, since this
module has no single fact to watch, only a structure to mirror.

## Maintenance triggers

- A new visual asset file is added to `public/` → update
  `02-visual-assets.md` in the same PR: add its entry to the documented-
  assets section, and confirm the "what this file deliberately does not
  invent" section no longer falsely claims that category of asset is
  absent.
- Any LaunchOS module's file structure changes — a file added, renamed,
  or removed in any `docs/launchos/*/` directory — → update
  `01-launchos-catalog.md` in the same PR, not after. This includes
  changes to this module's own directory.
- A citation in `02-visual-assets.md` (a `file:line` reference into
  `app/layout.tsx`, `components/JsonLd.tsx`, `components/Footer.tsx`, or
  `components/Header.tsx`) is invalidated by an unrelated code change
  (line numbers shift, a usage is removed, a new usage is added, or a
  cited *value* itself changes — e.g. if `app/layout.tsx`'s hardcoded
  `width: 1982` is ever corrected to match the real 1983px file, the
  discrepancy note in `02-visual-assets.md` goes stale and must be updated
  or removed, not just the line number) → update the citation in the same
  PR as the code change.

## Cross-references

- **Depends on:** all 15 prior modules (01 through 15), indexed in
  `01-launchos-catalog.md` by file list only — never restated. Module 01
  (`01-brand-bible/03-visual-identity.md`) specifically, for the brand
  tokens `02-visual-assets.md` cites rather than redefines. Module 10
  (`10-operations-os/03-legal-entity-and-structure.md`) and Module 13
  (`13-hiring-os/01-current-state.md`), cited above for the team-size fact
  underlying this module's "what this library does not contain" framing.
- **Feeds:** none. This is the terminal module in LaunchOS v1 — no later
  module depends on Module 16, since none is numbered after it and the
  master plan's sequencing rule places this module last precisely because
  it catalogs everything before it rather than being cataloged itself.

## Known open item this module does not resolve

`PROGRESS.md`'s Module 10 closure entry (2026-07-13) explicitly flagged:
"no module's governance file states a baseline review cadence independent
of triggers — a program-wide gap to address at closure." Only Module 01
(`01-brand-bible/06-governance.md`) states a baseline cadence ("quarterly")
independent of a specific trigger; Modules 02 through 16 — including this
module's own governance file — document trigger-based maintenance only.
This module does not resolve that gap — doing so correctly would mean
deciding a real cadence for 15 other modules, which is not this module's
fact to own, and is not something this module invents on Emad's behalf.
It is carried forward explicitly, by
name, into the LaunchOS v1 closure report as an open owner decision — not
silently dropped now that all 16 modules have a first version published.

## Closure

Complete once all three files in this directory pass independent and
adversarial review with no open findings, and the PR is merged.

This is the final module of LaunchOS v1 — 16 of 16 modules now have a
first version published. That is a narrower claim than "LaunchOS is
finished": every module carries open maintenance triggers, this module's
own catalog requires ongoing upkeep to stay accurate, and the review-
cadence gap above remains open. "Structural build complete" describes
that every planned module now exists in reviewed form — not that the
program requires no further work.
