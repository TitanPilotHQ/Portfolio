# Pricing System — 03. Pricing Decision Tree

A checklist for anyone (Emad, a future hire, an agency) about to state
anything pricing-related externally — a website update, a sales deck, an
investor conversation, a press mention.

## Decision tree

```
Is this statement about pricing (a number, a model, a discount, "free,"
"paid," or a contract term)?
│
├─ NO → Not this module's concern. Route through the normal
│        Module 01 pre-publish checklist instead.
│
└─ YES
    │
    ├─ Is it "the current early-access/design-partner phase is free"?
    │   └─ YES → Already a public claim (JSON-LD, `components/JsonLd.tsx:
    │             36-41`). Safe to restate, using the exact framing already
    │             live — don't editorialize into "free forever" or "free
    │             trial" (implies a future paywall event that isn't
    │             announced).
    │
    ├─ Is it a specific price point, discount, or dollar figure?
    │   └─ Does a real, Emad-confirmed number exist in this module (updated
    │      beyond the current "undecided" state in
    │      `02-pricing-model-structure.md`)?
    │       ├─ NO  → STOP. Do not state, estimate, or imply a number. This
    │       │         is fabrication regardless of how "reasonable" the
    │       │         number sounds (Global Constraint 1).
    │       └─ YES → Confirm Phase B's trigger has actually occurred (first
    │                 design partners completed validation,
    │                 `01-pricing-philosophy.md`). If not, the number is
    │                 still internal-only even if it exists as a working
    │                 figure — do not publish ahead of the trigger.
    │
    ├─ Is it the pricing *model* (B2B SaaS, annual, per-desk, enterprise
    │   custom) without a number?
    │   └─ This is currently internal-only per `INTAKE-REQUEST.md` §1.2's
    │      explicit instruction ("should not be presented as
    │      commitments"). Do not publish the model direction externally
    │      until Emad explicitly clears it for public statement — a model
    │      without a number can still read as a commitment ("we're
    │      per-desk pricing" implies a live pricing page exists).
    │
    └─ Is it a contract-term claim ("annual contracts," "enterprise
        agreements")?
        └─ Same gate as the model direction above — internal-only until
           explicitly cleared, and subject to Global Constraint 3: while
           Titan Pilot isn't incorporated, no real contract can exist, so
           any contract-term claim must be framed as Phase B (future),
           never as a present capability.
```

## Review criteria for any pricing-adjacent copy

1. No dollar figure appears anywhere outside this module unless Phase B's
   trigger has occurred and Emad has explicitly cleared it for that surface.
2. "Free" claims match the JSON-LD framing exactly — no editorializing.
3. Model/contract-structure language stays internal until explicitly
   cleared, even without a number attached.
4. Every cross-module mention of pricing cites this module rather than
   restating a structural detail (Global Constraint 4).

## What triggers a re-check of this file

- Emad provides a real price point or clears the model for external
  statement → update `02-pricing-model-structure.md` and this file's
  decision tree in the same change, then re-run the LaunchOS drift check
  (`.github/PULL_REQUEST_TEMPLATE.md`) against every module that references
  pricing.
- The site's JSON-LD offer block changes (`components/JsonLd.tsx`) → re-verify
  the "already public" branch of the decision tree above.
