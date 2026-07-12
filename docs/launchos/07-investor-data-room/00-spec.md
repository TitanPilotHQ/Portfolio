# Module 07 — Investor Data Room — Spec

**Status:** Ready to build
**Depends on:** Module 01 (Brand Bible — principles, evidence/milestones
citations), Module 04 (Positioning), Module 05 (Pricing System), Module 06
(Sales OS, ICP)
**Purpose:** The canonical home for how Titan Pilot presents itself to
investors — company snapshot, what traction can and cannot be claimed, cap
table and funding-history reality, and an honest investor FAQ. Per Global
Constraint 4, this module does not restate content owned elsewhere
(principles, positioning, pricing, ICP) — it assembles and adds only what's
genuinely new: the funding/ownership facts and the investor-specific framing
of evidence that already exists.

## Sources

Grounded in `INTAKE-REQUEST.md` §3 (Emad's direct answers, 2026-07-12) for
funding, cap table, traction, and legal-entity facts; `lib/content.ts`'s
`EVIDENCE_ROWS` and `MILESTONES` (already the canonical Titan-engineering-
documentation proxy per Global Constraint 4's product-capability carve-out)
for what evidence exists; `docs/content/PUBLIC_CLAIMS_REGISTER.md` for what's
already cleared to say publicly.

## Global Constraint 3 application (two-phase)

This module is the primary reason GC3 exists — investor materials are the
surface most likely to blend founder-led reality with incorporated-company
aspiration if not disciplined:
- **Phase A — today:** no legal entity, no funding raised, sole founder
  ownership, no option pool, no committed fundraising timeline.
- **Phase B — future:** fundraising "expected after product maturity and
  successful design-partner validation" (intake §3.1) — conditional, no
  date, no round size, no valuation, no instrument type until Emad states
  one.

## Structure

| File | Contents |
|---|---|
| `01-company-snapshot.md` | Company stage, ownership, legal status for an investor audience |
| `02-traction-and-evidence.md` | What traction can be shown (engineering evidence) vs. cannot (customer/revenue) |
| `03-cap-table-and-funding.md` | Cap table reality, funding history (none), Phase A/B fundraising framing |
| `04-investor-faq.md` | Anticipated investor questions, honestly answered, citing canonical sources |
| `05-governance.md` | Review criteria, maintenance triggers, cross-references |
