# Pricing System — 02. Pricing Model Structure

**Everything in this file is an internal working assumption for planning
purposes — not a public commitment, not a final price, and not cleared for
any external surface.** Per `INTAKE-REQUEST.md` §1.2: "Internal working
assumptions used for planning are not public pricing and should not be
presented as commitments." This file exists so the structure is written down
consistently in one place (Global Constraint 4) rather than reinvented each
time it's needed for internal planning (e.g., a future financial model in
Module 11, or deal-structuring guidance in Module 06).

## Model direction

> The current direction is B2B SaaS with annual contracts. Pricing will most
> likely be per desk/workspace rather than per individual trader, with
> enterprise custom pricing available.

*(Source: `INTAKE-REQUEST.md` §1.1, verbatim.)*

## Structural elements, unpacked

| Element | Direction | What's NOT decided |
|---|---|---|
| Commercial model | B2B SaaS | Whether it's subscription-only or has a services/implementation component |
| Contract term | Annual | Multi-year options, renewal terms, cancellation terms |
| Pricing unit | Per desk/workspace (not per individual trader) | The exact definition of "desk/workspace" (e.g., seat count within a desk, usage-based components) |
| Largest-tier customers | Enterprise custom pricing | The custom-pricing process itself, minimum deal size, negotiation floor |
| Price points | Undecided | Everything — no number exists yet (see `01-pricing-philosophy.md`) |

## Why "per desk/workspace," not "per trader"

Two related but distinct facts, kept separate rather than treated as one
deriving the other:

1. **Who the buyer is:** defined canonically in Module 06's
   `06-sales-os/00-icp.md` — not restated here.
2. **How the price is unitized:** intake §1.1 states the direction directly
   as "per desk/workspace rather than per individual trader" — this is
   itself a distinct, directly-sourced answer, not something inferred from
   fact 1. An organization-level buyer doesn't mechanically imply
   organization-level billing (many B2B products sell to organizations but
   bill per individual seat within them) — the per-desk unit is a specific
   choice Emad stated, not a logical consequence of who the customer is.

Both facts point the same direction and are worth reading together, but this
file does not claim fact 2 follows from fact 1 — only that they're
consistent with each other.

## What "enterprise custom pricing" means here

Per the model direction, enterprise customers (see `06-sales-os/00-icp.md`
for who that is) negotiate rather than pay a published rate. Intake §1.1
states this as a second pricing mode alongside standard per-desk/workspace
pricing, not as the top of a ranked tier hierarchy — this file doesn't
characterize it as "the largest tier" beyond what "enterprise" itself
implies. This is a structural decision (custom pricing exists as a mode), not
a
process decision (how a custom deal gets negotiated) — the negotiation
process itself belongs to Module 06 (Sales OS) once its sales-process content
is built, not here.

## Maintenance

This file changes only when Emad provides a new direction or a real price
point. It is never edited to "fill in" a plausible-sounding number — an
empty or directional-only price row is correct and expected until Phase B's
trigger (`01-pricing-philosophy.md`) occurs.
