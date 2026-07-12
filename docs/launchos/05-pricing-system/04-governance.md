# Pricing System — 04. Governance

## Ownership

Emad. Pricing decisions are explicitly commercial/founder judgment calls,
not something a future hire or agency sets independently — consistent with
Company Principle 2, "Human Accountability."

## Review criteria

1. No dollar figure or specific number appears anywhere in LaunchOS or on
   the live site unless it's real and Emad-confirmed (Global Constraint 1).
2. Every statement about pricing structure is labeled internal-only unless
   explicitly marked cleared for external use.
3. This module is the only place pricing structure is defined — any other
   module needing to reference it cites this module (Global Constraint 4).
4. Two-phase framing (Global Constraint 3) is applied wherever a contract or
   commercial-term claim appears.

## Adversarial review focus

- Does any file in this module state a number, even as a hypothetical
  example, that could be mistaken for a real figure?
- Does the "per desk/workspace" pricing-unit justification actually trace to
  Module 06's ICP file, or does it independently redefine the target
  customer to make the pricing argument work?
- Does the decision tree's "already public" branch (free early-access phase)
  match the live JSON-LD exactly, or does it drift from it?

**Honest note on enforcement** (same caveat as Module 01,
`01-brand-bible/06-governance.md`): there is no CI check, lint rule, or test
that verifies a PR doesn't introduce a fabricated price or leak internal-only
pricing structure onto a public surface. The real, concrete mechanism is
`.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" — which, as of
this module's own build, did not yet include a pricing-specific checkbox
(fixed in the same change as this note; see the template). Even with that
checkbox added, it remains a reminder, not a gate — it can be skipped, and
ultimately depends on whoever reviews a given PR actually reading it. For a
solo-founder company this is the realistic ceiling on enforcement; this file
should not claim more rigor than that.

## Maintenance triggers

- A real price point or model clearance from Emad → update
  `02-pricing-model-structure.md` and `03-pricing-decision-tree.md` in the
  same change
- `components/JsonLd.tsx`'s offer block changes → re-verify
  `03-pricing-decision-tree.md`'s "already public" branch
- Module 06's ICP definition changes → re-verify
  `02-pricing-model-structure.md`'s pricing-unit justification

## Cross-references

- **Depends on:** Module 06's ICP seed (`06-sales-os/00-icp.md`)
- **Feeds:** Module 06 (Sales OS — pricing informs sales conversations, once
  cleared), Module 07 (Investor Data Room — pricing model is a real investor
  question), Module 11 (Finance OS — pricing model underlies any future
  revenue model), Module 03 (Messaging Bible — any future pricing-page copy
  routes through this module's decision tree first)

## Closure

Complete once all four files pass independent and adversarial review with no
open findings, and the PR is merged.
