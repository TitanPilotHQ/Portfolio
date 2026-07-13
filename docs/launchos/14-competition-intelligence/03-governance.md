# Competition Intelligence — 03. Governance

## Ownership

Emad — sole owner of Titan Pilot's competitive monitoring scope and the
decision to add a real competitor or category fact to this module. Same
ownership pattern as Finance OS (`11-finance-os/03-governance.md`),
Partnership OS (`12-partnership-os/03-governance.md`), and Hiring OS
(`13-hiring-os/03-governance.md`).

## Review criteria

A change to this module passes review only if:

1. Zero restatement of Module 04's named-competitor analysis. This module
   cites Module 04 (`04-positioning/02-competitive-positioning-map.md`)
   for the 8 real named competitors, their 5 cluster groupings, and any
   `theyAre`/`difference`/`concede` content — it never restates,
   re-derives, or paraphrases any part of it. This is the sharpest review
   criterion in this module given how directly adjacent the two modules'
   subjects are.
2. The three new monitoring categories (AI agent platforms, financial AI
   governance vendors, enterprise decision-intelligence platforms) stay
   at the general, industry-standard level in `01-monitoring-scope.md` —
   zero real company names and zero invented/fabricated company names
   anywhere in those category descriptions. Intake §9.1 names categories,
   not companies, and this module follows the same discipline until a
   real, sourced fact says otherwise.
3. `02-research-process.md`'s stated cadence (quarterly) matches Emad's
   2026-07-13 decision (`CLOSURE-REPORT.md` §5a) exactly, and no research
   methodology or tooling is invented beyond that cadence.
4. Module 04's competitive-positioning fact and `COMPETITOR_COMPARISON`
   (`lib/content.ts:367-416`) are cited from their canonical sources,
   never independently re-extracted or re-sourced inside this module
   (Global Constraint 4).

## Adversarial review focus

- Does this module accidentally restate any part of Module 04's
  competitor-specific analysis — a competitor name, a cluster label, a
  `theyAre`/`difference`/`concede` quote, or a paraphrase of one —
  instead of citing it? This is the single highest-risk Global
  Constraint 4 violation in this module given how directly adjacent the
  two modules' subjects are.
- Does any of the three new category descriptions in
  `01-monitoring-scope.md` sneak in a real company name, a thinly
  disguised real company name, or a plausible-sounding invented company
  name presented as an example?
- Does `02-research-process.md` invent a research tool or named
  methodology beyond the decided quarterly cadence?
- Does `01-monitoring-scope.md`'s treatment of "as they become relevant"
  drift from Emad's exact seven-area materiality list, or quietly add a
  new trigger or timeline beyond the 2026-07-13 decision?

## Honest note on enforcement

Same pattern as Modules 01, 09, 10, 11, 12, and 13: no CI/lint check
enforces anything in this module. The one real, concrete mechanism is
`.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" — a checklist
surfaced at PR-creation time, not a gate. It can be skipped, and for a
solo-founder company, review and maintenance ultimately depend on Emad
(or whoever is reviewing a given PR) actually reading it. A Competition
Intelligence-specific row was added to the template in this same change
(mirroring Module 11's, Module 12's, and Module 13's precedent), given
this module's adjacency risk to Module 04 — a change to the live
competitor data is the most likely trigger to accidentally pull this
module out of sync with its single-source-of-truth boundary.

## Maintenance triggers

- A new competitor emerges in one of the three expanded categories (AI
  agent platforms, financial AI governance vendors, enterprise
  decision-intelligence platforms) and becomes worth tracking → this is
  the trigger to add the first real, sourced fact to one of those
  categories in `01-monitoring-scope.md`, following the same
  category-level discipline intake §9.1 uses (name the category
  context, cite the source of the fact, do not retroactively invent
  when it became "relevant").
- `lib/content.ts`'s `COMPETITOR_COMPARISON` changes → the primary
  update goes to Module 04 (it owns the positioning map built from that
  data). This module is checked afterward only for downstream
  relevance — e.g., whether `01-monitoring-scope.md`'s framing of
  "existing governance and AI-assisted trading competitors" still holds.
- Each quarter → check `01-monitoring-scope.md`'s three expanded
  categories against real, sourced developments per the decided
  materiality list; add a category/vendor fact only if the bar is met.
- A research methodology or tooling actually gets adopted (beyond the
  decided quarterly cadence) → update `02-research-process.md` with the
  real, sourced detail. Do not add one preemptively based on an internal
  conversation alone.

## Cross-references

- **Depends on:** Module 04 (`02-competitive-positioning-map.md` — the 8
  named competitors, 5 clusters, and all differentiator content, cited
  not restated; canonical owner of competitive positioning per Global
  Constraint 4), `lib/content.ts:367-416` (`COMPETITOR_COMPARISON` — the
  underlying live data both this module and Module 04 trace to, accessed
  here only via Module 04's citation, not independently re-extracted),
  `INTAKE-REQUEST.md` §9 (the source for this module's own expanded
  scope and the no-prior-repository fact), Module 13
  (`03-governance.md` — the governance-file pattern this file follows
  most directly).
- **Feeds:** none yet. No other built module currently cites Competition
  Intelligence's facts. Module 04 is the most likely future citer if a
  competitor first tracked under one of this module's new categories
  later gets added to the positioning map — at that point the fact's
  canonical home moves to Module 04 per Global Constraint 4, and this
  module's entry is updated to cite it rather than duplicate it.

## Closure

Complete once all three files in this directory pass independent and
adversarial review with no open findings, and the PR is merged.
