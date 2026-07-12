# Pricing System — 01. Pricing Philosophy

## Where pricing stands today (Phase A)

> No final pricing model has been approved yet.
> No final pricing has been approved. Internal working assumptions used for
> planning are not public pricing and should not be presented as
> commitments. Final pricing will be determined after the first design
> partners complete validation.
> The current design-partner and early-access phase remains free. No
> customer is paying yet. Early participants are selected based on fit
> rather than volume.

*(Source: `INTAKE-REQUEST.md` §1.1-§1.3, Emad's direct answers, 2026-07-12,
quoted verbatim.)*

This matches the site's own public framing: the JSON-LD offer describes the
current phase as "Early access program — shadow-mode validation phase" at
$0 (`components/JsonLd.tsx:36-41`) — Module 05 doesn't change that public
claim, it explains the reasoning behind it and the plan for what replaces
it.

## Why pricing isn't finalized yet (the principle, not just the fact)

Finalizing pricing before design-partner validation would mean pricing a
product against assumed value rather than demonstrated value — this
contradicts Company Principle 1, "Evidence over Claims" ("Every public
statement traces to a sourced, dated engineering record — not marketing
language," `01-brand-bible/04-principles.md`) applied to a commercial claim
instead of a technical one. A price is a claim about value; Titan Pilot's
standing discipline is not to make claims ahead of evidence. Design-partner
validation is that evidence-gathering process for pricing, the same way
shadow mode is the evidence-gathering process for autonomy (Module 02's
Trust Ladder scene, `02-story-architecture/03-narrative-components-library.md`).

## Phase A → Phase B trigger

Per intake §1.2, the explicit trigger for moving from "no final pricing" to
"final pricing" is: **the first design partners complete validation.** This
is not a date-based trigger — consistent with Global Constraint 3's
instruction to frame Phase B as conditional ("once X, Y will...") rather than
scheduled. No calendar commitment exists or should be implied in any
pricing-related copy.

## Principles governing Phase B pricing (from the working direction, not yet
committed)

1. **Priced for the organization, not the individual.** The unit being
   priced is the customer defined in Module 06 (Sales OS),
   `06-sales-os/00-icp.md` — a desk/workspace, not a per-user seat. See
   `02-pricing-model-structure.md` for the structural detail.
2. **Contract structure follows the customer type.** Annual contracts match
   the customer defined in `06-sales-os/00-icp.md`, not the monthly
   self-serve pattern typical of individual-user SaaS.
3. **Enterprise gets custom terms.** Per intake §1.1, the largest tier of
   customer gets "enterprise custom pricing" rather than a published rate
   card. This is Emad's stated direction, not a generalization about how
   evidence/governance/audit products are procured industry-wide — no such
   industry claim is sourced or made here.
4. **No price is public until it's real.** This module's own working
   assumptions (`02-pricing-model-structure.md`) must never be copied into
   Messaging Bible, the website, or any external deck until Phase B's
   trigger has occurred and a real number exists — see
   `03-pricing-decision-tree.md`.

## What this file deliberately avoids

Any specific dollar figure. Every internal working assumption on pricing
*structure* (per-desk, annual, enterprise-custom) is documented in
`02-pricing-model-structure.md` because Emad confirmed the model direction is
decided even though price *points* are not (`INTAKE-REQUEST.md` §1.1 vs.
§1.2) — this file does not blur that distinction by inventing what §1.2
explicitly declined to provide.
