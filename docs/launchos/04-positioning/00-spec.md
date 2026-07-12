# Module 04 — Positioning — Spec

**Status:** Ready to build (no blocked facts)
**Depends on:** Module 01 (Brand Bible), Module 02 (Story Architecture),
Module 03 (Messaging Bible — word choice this module inherits rather than
re-derives)
**Purpose:** Where Messaging Bible answers "what do we say," this module
answers "where do we sit, and against what." It documents the category
Titan Pilot occupies, maps every real named competitor already on the site
into that space, and produces a formal, reusable positioning statement.

## Sources

Same grounding rule as prior modules, plus one new real source central to
this module: `COMPETITOR_COMPARISON` (`lib/content.ts:367-416`) — 8 named,
real competitors already compared on `/product`, each with what they are,
how Titan Pilot differs, and what Titan Pilot concedes. This module does not
invent a competitive landscape; it organizes the one that's already public.
Business-context facts (target customer type, pricing direction, ICP) are
grounded in `INTAKE-REQUEST.md` per Global Constraint 3's internal-planning-
input framing — not yet public claims.

## Structure

| File | Contents |
|---|---|
| `01-category-positioning.md` | The "Supervised AI Trading" category, positioned against its adjacent categories |
| `02-competitive-positioning-map.md` | All 8 real competitors organized into clusters, with the concede-based differentiation preserved |
| `03-positioning-statement.md` | A formal, reusable positioning statement built from real facts, plus segment notes from the intake |
| `04-governance.md` | Review criteria, maintenance triggers, cross-references |
