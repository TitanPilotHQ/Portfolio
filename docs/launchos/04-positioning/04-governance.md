# Positioning — 04. Governance

## Ownership

Emad, same rationale as prior modules.

## Review criteria

1. Every competitor row in the positioning map matches `COMPETITOR_COMPARISON`
   exactly — no reworded differentiation, no dropped concession.
2. The formal positioning statement's public/internal split is respected —
   no module or deck should use the full formal statement's target-customer
   clause on a public surface without explicit sign-off that it's cleared.
3. No new competitor added without a source (a real, named, checkable
   alternative — not a category placeholder).
4. Consistent with Modules 01-03's voice, principles, and terminology.

## Adversarial review focus

- Does any cluster's "positioning" paragraph subtly claim ground the
  concede fields already gave away (e.g., implying charting parity with
  TradingView while also conceding "charting depth")?
- Does the formal positioning statement's "unlike" clause accurately
  represent all three named category patterns, or does it flatten
  distinctions between them that matter (AI trading bot vs. signal
  marketplace vs. no-code automator are not identical)?
- Is the public-safe variant actually safe — does it avoid every never-claim
  and every unqualified status word?

## Honest note on enforcement

No CI/lint check enforces anything in this module. The one real, concrete
mechanism is `.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" —
a checklist surfaced at PR-creation time, not a gate. It can be skipped,
and review and maintenance ultimately depend on Emad (or whoever is
reviewing a given PR) actually reading it and applying the maintenance
triggers below by hand.

## Maintenance triggers

- `COMPETITOR_COMPARISON` gains, loses, or edits a row → re-verify the
  corresponding cluster in `02-competitive-positioning-map.md`
- Target customer, ICP, or pricing direction changes (Module 05/06 updates)
  → re-verify `01-category-positioning.md`'s "Target segment" section and
  `03-positioning-statement.md`'s formal variant
- The target-customer framing is cleared for public use → update
  `03-positioning-statement.md`'s "When to use which" table

## Cross-references

- **Depends on:** Modules 01-03, and Module 06's ICP seed
  (`06-sales-os/00-icp.md`, Global Constraint 4)
- **Feeds:** Module 06 (Sales OS — the formal positioning statement and
  competitive map are direct sales-enablement inputs), Module 08 (Demo
  Playbooks — objection handling for "why not [competitor]" questions),
  Module 14 (Competition Intelligence — this map is Module 14's starting
  dataset; Module 14 owns *tracking* competitors over time, this module owns
  the *positioning* interpretation of the current set)

## Closure

Complete once all four files pass independent and adversarial review with no
open findings, and the PR is merged.
