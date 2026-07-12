# Brand Bible — 06. Governance

## Ownership

Emad owns final approval on this module, consistent with the stated company
principle "Human Accountability" and the site's own statement that "architecture,
product direction, operational decisions... and final approvals remain
human-owned" (`lib/content.ts:485-486`). Any future hire producing brand-facing
work operates within this module's rules but does not have unilateral authority
to change them.

## Review criteria

A change to this module passes review only if:
1. Every new or edited factual statement carries a citation (file:line, claims
   register row, or a dated direct statement from Emad).
2. It does not introduce a rule that contradicts `04-principles.md` or the
   never-claims list.
3. It does not duplicate content already owned by another module — link to that
   module instead (see Cross-references below).
4. Voice and visual rules remain falsifiable (a reader can check draft copy
   against the rule and get a clear pass/fail).

## Adversarial review focus

When this module is checked adversarially (per the LaunchOS process in the
master plan), the reviewer should specifically try to:
- Find any claim in this module that would not survive being asked "what's the
  source?" in an investor diligence call.
- Find any place this module's own copy violates its own banned-language table.
- Find any visual-identity value that doesn't match the current
  `app/globals.css` — flag as stale.
- Find any principle restated with drifted meaning from its source quote.

## Maintenance triggers

This module must be updated (not just re-reviewed) whenever:
- `docs/content/PUBLIC_CLAIMS_REGISTER.md` gains, changes, or retires a row
- `app/globals.css`'s `@theme` block changes, or a new logo asset ships
- Company stage changes (e.g., first paying customer, first raised round,
  first hire, first *confirmed* design partner — see `01-identity.md`'s
  design-partner caveat) — `01-identity.md`'s "Company stage" section must
  reflect reality immediately, since Modules 07 (Investor Data Room) and 13
  (Hiring OS) will cite it
- A new product mode is promoted (e.g., Copilot Mode moves from "Designed —
  next" to "Certified — current") — `01-identity.md` and any status table here
  must update in the same change

**Honest note on enforcement:** Titan Pilot is a solo-founder company with no
CI check, lint rule, or automated test that verifies this module against the
live site — none of the triggers above are mechanically enforced. The one
real, concrete mechanism that exists is
`.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" section, added
alongside this module: every PR touching a trigger file surfaces the relevant
checkbox at PR-creation time. This is a reminder, not a gate — it can be
skipped, and for a solo founder, review and maintenance ultimately depend on
Emad (or whoever is reviewing a given PR) actually reading the checklist. If
this company adds a second reviewer or CI capacity later, upgrading this to an
actual automated check (e.g., a script that diffs the claims register against
citations in `docs/launchos/`) is the natural next step — but this file
should not claim more rigor than the PR-template checkbox actually provides
today.

Recommended baseline review cadence even absent a trigger: quarterly, to catch
drift that didn't hit an explicit trigger.

## Cross-references (this module is upstream of)

- **02 Story Architecture** — inherits voice pillars and the mission/problem
  statement from `01-identity.md`
- **03 Messaging Bible** — inherits banned language and sentence patterns from
  `02-voice-and-tone.md`
- **04 Positioning** — inherits the category *name* and elevator pitches from
  `01-identity.md`; owns the category-adjacency and competitive-positioning
  analysis itself (Global Constraint 4 — Single Source of Truth)
- **08 Demo Playbooks** — inherits product stage/status language and the
  disclaimer requirement
- **14 Competition Intelligence** — inherits the "concede before you compare"
  voice pillar
- **16 Asset Library** — catalogs the logo file and visual tokens documented in
  `03-visual-identity.md` rather than redefining them

Any of these downstream modules that appears to disagree with this module on a
fact, voice rule, or visual value is wrong by construction — fix the downstream
module, not this one, unless the disagreement reveals this module is the one
that's stale (see Maintenance triggers above).

## Closure

Module 01 (Brand Bible) is considered complete for LaunchOS v1 once: all seven
files in this directory pass independent review and adversarial review with no
open findings, and the PR is merged to `main`. A closure entry is then appended
to `docs/launchos/PROGRESS.md`.
