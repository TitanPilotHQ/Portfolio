# Module 05 — Pricing System — Spec

**Status:** Ready to build
**Depends on:** Module 06's ICP seed (`06-sales-os/00-icp.md`) for target
customer — referenced, not restated, per Global Constraint 4.
**Purpose:** The canonical home for everything about how Titan Pilot will
charge for the product — pricing philosophy, model structure, and the
process for finalizing real figures. Per Global Constraint 4, this module is
the sole owner of pricing facts; every other module (Sales OS, Investor Data
Room, Finance OS, Messaging Bible) references this module rather than
stating its own pricing detail.

## Sources

Grounded entirely in `INTAKE-REQUEST.md` §1 (Emad's direct answers,
2026-07-12) — an internal planning input, not yet a public claim (Global
Constraint 1's grounding rule + Global Constraint 3). No price point in this
module is final or public; the module states this explicitly and repeatedly
rather than letting a working assumption drift into being read as a
commitment.

## Global Constraint 3 application (two-phase)

Pricing touches contracting, so it gets the two-phase treatment:
- **Phase A — today:** early access is free, no customer is paying, no
  contract exists, pricing is undecided.
- **Phase B — future:** once design partners complete validation and
  pricing is finalized, paid annual contracts begin. This module documents
  the *direction* Phase B is heading (per intake), not a committed date or
  final number.

## Structure

| File | Contents |
|---|---|
| `01-pricing-philosophy.md` | Why pricing isn't finalized yet, and the principles governing how it will be (Phase A/B) |
| `02-pricing-model-structure.md` | The working model direction (B2B SaaS, per-desk/workspace, enterprise custom) — labeled as internal planning input throughout |
| `03-pricing-decision-tree.md` | The process/checklist for when a real price point is allowed to become a public claim |
| `04-governance.md` | Review criteria, maintenance triggers, cross-references |
