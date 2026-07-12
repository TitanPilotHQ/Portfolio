# Investor Data Room — 05. Governance

## Ownership

Emad — investor conversations and any material shared with investors are
founder-level decisions, consistent with Company Principle 2, "Human
Accountability," and this module's own emphasis on key-person honesty
(`04-investor-faq.md`).

## Review criteria

1. No cap table, funding figure, valuation, or investor name appears unless
   real and confirmed (Global Constraint 1).
2. Every fact owned by another module (principles, positioning, pricing,
   ICP, evidence) is cited, not restated (Global Constraint 4).
3. Two-phase framing (Global Constraint 3) is applied to every legal-entity,
   funding, and cap-table statement.
4. No customer traction, market size, or demand signal is presented as
   validated when it isn't (per intake §3.3's explicit instruction).

## Adversarial review focus

- Does any file quietly upgrade "engaging design partners" into implied
  customer demand?
- Does the FAQ's pricing answer correctly reflect Module 05's actual gating
  rule, or does it invent an investor-specific exception Module 05 doesn't
  grant?
- Does anything in this module state a funding amount, timeline, or investor
  type that isn't in intake §3?
- Does the evidence file (`02-traction-and-evidence.md`) present engineering
  proof in a way that could be misread as commercial validation?

## Honest note on enforcement

Same caveat as Modules 01, 05, and 06: no CI/lint check enforces this
module's rules. This module carries unusually high stakes for the "reminder,
not a gate" reality (`01-brand-bible/06-governance.md`'s original framing) —
a fabricated number in an investor conversation is harder to walk back than
one on a website. The practical mitigation is that Emad is both the sole
person who would state these facts in a live conversation and the sole
approver of this module's content, so the review loop is tighter here than
for content multiple people might eventually touch (e.g., once Module 13's
hiring plan produces more people). This module should be re-read in full
before any real fundraising conversation, not just relied on from memory.

## Maintenance triggers

- Incorporation happens → update `01-company-snapshot.md` and
  `03-cap-table-and-funding.md`'s Phase A sections to Phase B/historical, in
  the same change
- Fundraising begins or closes → update `03-cap-table-and-funding.md` with
  real terms
- A design partner is confirmed and added to the claims register →
  `02-traction-and-evidence.md`'s "what's NOT evidence of" section needs
  re-verification (a confirmed partner may change what can be claimed)
- Any cited module (01, 04, 05, 06) changes a fact this module references →
  re-verify the citation still resolves correctly

## Cross-references

- **Depends on:** Modules 01, 02, 04, 05, 06
- **Feeds:** nothing downstream — this is a terminal/audience-facing module,
  not a source other modules build on

## Closure

Complete once all five files pass independent and adversarial review with no
open findings, and the PR is merged.
