# Finance OS — 03. Governance

## Ownership

Emad — sole owner of Titan Pilot's financial decisions, cost structure, and
disclosure timing. Financial disclosure is explicitly founder judgment, not
something a future hire or agency sets independently — consistent with
Company Principle 2, "Human Accountability" (`01-brand-bible/04-principles.md`).

## Review criteria

A change to this module passes review only if:

1. Zero dollar figures, currency amounts, percentages, burn-rate numbers,
   or runway numbers appear anywhere in this module, for any purpose,
   including hypothetical or illustrative examples. Verify this with a
   literal scan for digit characters and currency symbols across all three
   files before every review passes — not a read-through, an actual scan.
2. "Internal operating costs exist but are intentionally not documented
   publicly" (`01-financial-reality.md`, sourcing intake §6.2) is never
   restated, paraphrased, or implied as "no costs exist" or "costs are
   low." These are different facts; conflating them is a factual error,
   not a style issue.
3. Module 05's "no customer is paying yet" fact and Module 07's "no
   external funding raised, founder-funded" fact are cited from their
   canonical files, never independently restated with their own sourcing
   detail (Global Constraint 4).
4. `02-accounting-and-reporting.md`'s Phase B section states only the
   sourced cash-basis planning default (Emad's 2026-07-13 decision,
   correctly labeled non-final) plus the categories of future
   infrastructure the spec authorizes (likely external support, potential
   audit requirements) — it does not name a specific tool, platform, firm,
   or date, and does not present the planning default as a final method.

## Adversarial review focus

- Does any phrase in this module imply a rough size for the undisclosed
  operating costs, even without a number? "Modest," "minimal," "lean,"
  "bootstrapped," "significant," "material," and similar words are all
  fabricated characterizations of a figure that isn't available — none of
  them belong in this module regardless of how natural they sound as
  hedges.
- Does `02-accounting-and-reporting.md`'s cash-basis planning default stay
  correctly sourced to Emad's 2026-07-13 decision and labeled as
  non-final — never drifting into being presented as a settled method, and
  never getting a named tool/platform attached to it that isn't sourced?
  Phase B sections are the highest-risk spot for unsourced defaults across
  the whole LaunchOS program (see Module 10's `04-governance.md` for the
  same concern applied to legal-entity type/jurisdiction).
- Does this module contradict Module 05's canonical "free, no customer
  paying" fact, or Module 07's canonical "founder-funded, no external
  funding raised" fact — either by restating them with drifted wording, or
  by implying something inconsistent with them (e.g., implying revenue
  exists, or implying external capital has been raised)?
- Does `01-financial-reality.md` or `02-accounting-and-reporting.md` treat
  the "until incorporation" disclosure trigger in intake §6.2 as if it
  specifies *what* will be disclosed, *how*, or *when* — none of that is
  sourced beyond the trigger itself.

## Honest note on enforcement

Same caveat as Modules 01, 09, and 10: no CI/lint check enforces anything
in this module. The one real, concrete mechanism is
`.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" — a checklist
surfaced at PR-creation time, not a gate. It can be skipped, and for a
solo-founder company, review and maintenance ultimately depend on Emad (or
whoever is reviewing a given PR) actually reading it. A Finance OS-specific
row was added to the template in this same change (mirroring how Module 05
added a pricing-specific checkbox, `05-pricing-system/04-governance.md`),
given this is the single highest-risk module in the program for
accidentally introducing a fabricated figure — it is the one module whose
entire subject is a deliberately undisclosed number.

## Maintenance triggers

- Revenue occurs for the first time → this is a fact that changes
  `01-financial-reality.md`'s Phase A materially (revenue moves from "none"
  to "exists"). Coordinate with Module 07's traction file
  (`07-investor-data-room/02-traction-and-evidence.md`) in the same change,
  since first revenue is also a traction-relevant event there.
- An accounting platform gets adopted → update
  `02-accounting-and-reporting.md`'s Phase A section (it flips from "no
  formal platform" to naming the real one), and check Module 10's
  tool-stack file (`10-operations-os/01-tool-stack.md`) for overlap, since
  a new adopted tool belongs in that general list too.
- Incorporation happens → `01-financial-reality.md` and
  `02-accounting-and-reporting.md`'s Phase A/B sections flip (Phase A
  becomes historical, Phase B becomes current, with real specifics filled
  in from Emad's statement). Coordinate this in the same change with Module
  07 (`01-company-snapshot.md`, `03-cap-table-and-funding.md`) and Module 10
  (`03-legal-entity-and-structure.md`), since all three modules key their
  own Phase A/B flip off the same underlying incorporation event.

## Cross-references

- **Depends on:** Module 01 (`06-governance.md` — governance-file pattern),
  Module 05 (`01-pricing-philosophy.md`, `04-governance.md` — "no customer
  paying yet" fact and the pricing-checkbox precedent, cited not restated),
  Module 07 (`01-company-snapshot.md`, `03-cap-table-and-funding.md` —
  "founder-funded, no external funding raised" fact, cited not restated),
  Module 10 (`03-legal-entity-and-structure.md`, `04-governance.md` — the
  Phase A/B pattern this module follows)
- **Feeds:** Module 07 (first revenue and incorporation are both
  traction/snapshot-relevant events coordinated through this module),
  Module 10 (an adopted accounting platform is coordinated through this
  module's Phase A/B flip and checked against Module 10's tool-stack list)

## Closure

Complete once all three files in this directory pass independent and
adversarial review with no open findings, and the PR is merged.
