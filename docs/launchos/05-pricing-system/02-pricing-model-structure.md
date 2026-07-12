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

This choice is consistent with, though not derived from, Module 06's
canonical target-customer definition (`06-sales-os/00-icp.md`): the customer
is an organization, not an individual, so pricing the organization as the
unit (rather than seat-counting individual traders within it) matches how
the product is bought and used. Module 03's terminology glossary already
encodes the individual-vs-organization distinction at the word-choice level
(`03-messaging-bible/02-terminology-glossary.md`, "Trader" row) — this
module's pricing-unit choice is the commercial expression of the same
underlying fact, cited from the same canonical source rather than
independently re-justified.

## What "enterprise custom pricing" means here

Per the model direction, the largest customer tier (institutional trading
organizations, per Module 06's ICP) negotiates rather than pays a published
rate. This is a structural decision (custom pricing exists as a tier), not
a process decision (how a custom deal gets negotiated) — the negotiation
process itself belongs to Module 06 (Sales OS) once its sales-process content
is built, not here.

## Maintenance

This file changes only when Emad provides a new direction or a real price
point. It is never edited to "fill in" a plausible-sounding number — an
empty or directional-only price row is correct and expected until Phase B's
trigger (`01-pricing-philosophy.md`) occurs.
