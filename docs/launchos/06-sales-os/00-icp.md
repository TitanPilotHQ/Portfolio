# Sales OS — 00. Ideal Customer Profile (canonical)

**Status:** Seed file. This is the canonical, single-source-of-truth home for
Titan Pilot's ICP and target-customer definition, per Global Constraint 4
(`00-launchos-master-plan.md`). Created ahead of the rest of Module 06 (sales
process, tooling, pipeline stages) specifically because Modules 03 and 04
needed this fact before Module 06's own build turn arrived — rather than let
either of those modules become the fact's default owner, the fact moves here
and they reference it. The rest of Module 06 (sales process, CRM, discovery
→ demo → design-partner flow) is built separately, in its own turn.

## Target paid customer

> The primary paid customer is a professional trading desk, prop firm, hedge
> fund, broker, or institutional trading organization rather than an
> individual retail trader.

*(Source: `INTAKE-REQUEST.md` §1.4, Emad's direct answer, 2026-07-12.)*

## Ideal Customer Profile (ICP)

> The primary ICP is organizations already experimenting with AI-assisted
> trading that require governance, auditability, explainability, and
> operational control. Retail traders are not the primary target.

*(Source: `INTAKE-REQUEST.md` §2.2, Emad's direct answer, 2026-07-12,
quoted verbatim.)*

## Status of this fact

Internal planning input, not yet a public site claim (Global Constraint 3 /
1's grounding rule) — no claims-register row exists for it. Any module citing
this file for public-facing copy must still route through the claims-register
process before publishing it externally; see Module 04's positioning
statement for the public-safe/internal-only split this produces in practice.

## Who cites this file

**Restates or embeds the fact (propagation targets — must update if this
file changes):**
- Module 03 (Messaging Bible), `02-terminology-glossary.md`, "Trader" row
- Module 04 (Positioning), `04-positioning/01-category-positioning.md`
  ("Target segment," and its derivative "organizations that have already
  decided to use AI..." paraphrase) and
  `04-positioning/03-positioning-statement.md` (the formal statement's
  target-customer clause — adapted: pluralized, merged with the ICP's
  "already experimenting" behavioral fact, retail-exclusion clause
  omitted, not a literal verbatim copy — and "Segment note")
- Module 05 (Pricing System), `01-pricing-philosophy.md` (Phase B
  principles 1-2) and `02-pricing-model-structure.md` ("Why 'per
  desk/workspace'")

**References this file's role without restating the fact (no propagation
needed):**
- Module 03 (Messaging Bible), `04-governance.md`
- Module 04 (Positioning), `00-spec.md`, `04-governance.md`
- Module 05 (Pricing System), `00-spec.md`, `04-governance.md`

Any future module needing the ICP or target-customer fact cites this file
rather than `INTAKE-REQUEST.md` directly — this file is the canonical
restatement; the intake file is the raw, dated source-of-record behind it.

## Maintenance

If the target customer or ICP changes (a new intake answer, a real sales
conversation that surfaces a genuine sub-segmentation), update this file
first, then propagate the update to every module listed above in the same
change — that propagation requirement is exactly what Global Constraint 4
exists to make small and mechanical instead of an open-ended rewrite.
