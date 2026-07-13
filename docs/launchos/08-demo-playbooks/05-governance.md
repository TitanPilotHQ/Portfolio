# Demo Playbooks — 05. Governance

## Ownership

Emad — currently the sole person delivering demos (Module 06's founder-led
sales process).

## Review criteria

1. Every claim in the demo script traces to a citation in an earlier module
   — this module adds sequencing/timing/emphasis, never new facts (Global
   Constraint 4).
2. The Decision Walkthrough's Devil's Advocate and Risk Gate steps are never
   cut from the core script (Module 02's own rule, inherited here).
3. No pricing statement beyond what Module 05's decision tree currently
   allows.
4. The objection-handling table's sources are real and current — re-verify
   against the cited modules, not from memory.

## Adversarial review focus

- Does any "New content this file adds" claim in `01-demo-script.md` (e.g.
  the Trust Ladder pause placement) actually introduce a new factual claim
  disguised as sequencing?
- Does `02-demo-variants.md`'s investor-variant guidance correctly route
  pricing/traction questions to Module 05/07, or does it answer them
  directly (a Global Constraint 4 violation)?
- Is the objection-handling table's "Do you have other customers" answer
  still accurate given Module 01's current company-stage caveat, or has it
  drifted?

## Honest note on enforcement

No CI/lint check enforces anything in this module. The one real, concrete
mechanism is `.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" —
a checklist surfaced at PR-creation time, not a gate. It can be skipped,
and review and maintenance ultimately depend on Emad (or whoever is
reviewing a given PR) actually reading it and applying the maintenance
triggers below by hand — this module in particular depends on whoever is
delivering a demo actually re-reading the script rather than working from
memory of an earlier version.

## Maintenance triggers

- Any cited module's content changes (especially Module 02's scenes, Module
  05's pricing gate, Module 06's sales process/ICP) → re-verify the
  corresponding section here
- A real objection with no existing answer recurs across multiple demos →
  add it to `03-objection-handling.md`'s table, sourced properly, not
  improvised
- Module 06's sales process changes (a new stage, a commercial closing path
  opens) → re-verify `01-demo-script.md`'s close section and
  `04-demo-checklist.md`'s "before/after" items

## Cross-references

- **Depends on:** Modules 01, 02, 03, 04, 05, 06, 07
- **Feeds:** nothing downstream directly — this is an execution playbook,
  though a recurring objection surfaced here could eventually feed a new
  Module 03 FAQ entry or Module 14 competitor-tracking item

## Closure

Complete once all five files pass independent and adversarial review with no
open findings, and the PR is merged.
