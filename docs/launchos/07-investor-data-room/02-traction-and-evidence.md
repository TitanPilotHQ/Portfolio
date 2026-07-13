# Investor Data Room — 02. Traction and Evidence

## What traction means here (set expectations first)

> No public customer traction should be claimed. Current measurable
> traction consists of engineering completion, production validation, and
> ongoing design-partner preparation.

*(Source: `INTAKE-REQUEST.md` §3.3, verbatim.)*

This is a pre-revenue, pre-customer company. The traction that exists is
engineering traction, not commercial traction — this file presents it as
such rather than dressing it up as customer validation it isn't.

## Engineering evidence (the real traction)

Per Global Constraint 4's product-capability carve-out, this file cites
`lib/content.ts` and the public claims register directly (the accessible
canonical proxy for Titan's engineering documentation) rather than having
any LaunchOS module independently redefine this evidence:

- `EVIDENCE_ROWS` (`lib/content.ts:151-182`) — six capability/state/proof
  rows: MT5 bridge (Built), Event spine (Running), Replay verification
  (Active), Shadow AI pipeline (Phase C.5 certified — an internal
  engineering milestone, not a regulatory one), Risk gates (Implemented),
  Broker reconciliation (Built).
- `MILESTONES` (`lib/content.ts:187-196`) — eight label/value tiles, none
  carrying a date field in the data itself (Module 02's framing, "numbered
  proof, no dates attached," `02-story-architecture/01-core-narrative.md`,
  applies here too — not restated further); two carry the specific values
  "Replay Verification, Zero Drift — 1,662/1,662" and "Restore / PITR
  Recovery Verified — 13s / 78s," whose dated provenance lives in the
  claims register below, not in the milestone tile itself.
- `docs/content/PUBLIC_CLAIMS_REGISTER.md` — every one of the 15 registered
  claims is independently sourced and dated. 13 of the 15 (the engineering
  certification, security, and architecture claims, dated 2026-07-08) cite a
  named document in the separate `Titan` engineering repo. The remaining 2
  (the founder-led and founder-background claims, dated 2026-07-11) are
  founder direct attestations to site content, not Titan-repo documents —
  a real, disclosed distinction, not a uniform sourcing standard.

**Investor framing (new content, not a restatement):** the significance of
this evidence for an investor isn't the individual numbers — it's that
Titan Pilot has a working discipline of dated, sourced, falsifiable claims
about its own engineering before it has a single dollar of revenue. That
discipline itself is diligence-relevant: it's the same standard investor
diligence typically has to impose on a startup from the outside, already
self-applied.

## What's explicitly NOT evidence of

- **Trading performance or profitability.** The disclaimer applies with full
  force to investor conversations, not just public site copy: shadow-mode
  signals are "engineering evidence, not evidence of future or past
  profitability" (`app/disclaimer/page.tsx:31-33`, already cited as
  Module 01's canonical disclaimer requirement).
- **Customer demand.** No confirmed design partner exists in the claims
  register (Module 01's caveat, `01-brand-bible/01-identity.md`) — do not
  present "engaging design partners" as demand validation.
- **Market size or category adoption.** Market-sizing methodology is Module
  15's (Market Research Framework) designated canonical home once
  produced; Module 15 currently holds zero sourced market-sizing data — a
  standing state, not a placeholder (see
  `15-market-research-framework/02-market-research-scope.md`) — no number
  should be offered here or invented for this purpose.

## How to present this to an investor (assembly, not new claims)

1. Open with the mission/problem framing (Module 02's core narrative,
   `02-story-architecture/01-core-narrative.md`, "Investor" audience
   variant in `02-story-architecture/02-audience-variants.md`).
2. Walk the evidence above.
3. State plainly what it isn't evidence of (the section above) — proactively,
   per Module 02's "Discipline List" scene
   (`02-story-architecture/03-narrative-components-library.md`), since
   stating the limits of your own evidence unprompted is itself a
   credibility signal to this audience.
