# Hiring OS — 03. Governance

## Ownership

Emad — sole owner of Titan Pilot's hiring decisions, compensation/equity
policy, and hiring timing. Hiring decisions are explicitly founder
judgment, not something set independently by a future hire or agency —
consistent with Company Principle 2, "Human Accountability"
(`01-brand-bible/04-principles.md`), and the same ownership pattern as
Finance OS (`11-finance-os/03-governance.md`) and Partnership OS
(`12-partnership-os/03-governance.md`).

## Review criteria

A change to this module passes review only if:

1. Zero compensation figures, currency amounts, equity percentages or
   bands, headcount numbers, or hiring dates (specific date, quarter, or
   year) appear anywhere in this module, for any purpose, including
   hypothetical or illustrative examples. Verify this with a literal scan
   for digit characters, currency symbols, and percent signs across all
   three files before every review passes — not a read-through, an actual
   scan.
2. The four anticipated role categories (engineering, customer success,
   product design, sales) stay flat and unranked in `02-anticipated-hiring.md`
   — no sequencing, priority order, or "first hire" implication beyond what
   intake §8.2 states.
3. "Successful design-partner validation" matches Emad's 2026-07-13 decision
   (`CLOSURE-REPORT.md` §5a) exactly — the six-item criteria list plus the
   "workload can no longer be handled safely" hiring-trigger condition — and
   still does not claim Module 09's Stage 7 IS, definitionally, the same
   event.
4. Module 01's founder-led team-composition fact and Module 10/07's
   no-incorporated-entity fact are cited from their canonical files, never
   independently restated with their own sourcing detail (Global
   Constraint 4).
5. The "Boundary with Module 07's fundraising trigger" paragraph never
   states or implies Titan Pilot has met, or is close to meeting, any of
   Module 07's five fundraising conditions, and never restates those five
   conditions here — it cites
   `07-investor-data-room/03-cap-table-and-funding.md` for them (Global
   Constraint 4).

## Adversarial review focus

- Does any role-category description sneak in an implied job description,
  seniority level (e.g., "senior," "lead," "head of"), or
  department-structure claim beyond the bare category name?
- Does the validation-trigger discussion in `02-anticipated-hiring.md` drift
  from Emad's exact six-item criteria list, or overreach by implying Module
  09's Stage 7 IS definitionally the hiring trigger, when the two are only
  conceptually adjacent?
- Does "revenue alone does not constitute validation" get contradicted
  anywhere else in this module (e.g., by implying a revenue figure would be
  sufficient on its own)?
- Does the employment/contracting dependency section imply Titan Pilot is
  currently planning to use contractors, or any other specific interim
  arrangement, when no such plan is sourced anywhere in this program?
- Does anything in this module read as more organizationally mature than a
  solo pre-revenue founder actually is — an implied interview process,
  offer process, hiring committee, or HR function that isn't sourced?
- Does the fundraising-boundary paragraph drift toward implying the
  design-partner-validation threshold and Module 07's fundraising trigger
  share one bar, when Emad's 2026-07-13 decision requires them to stay
  distinct with different criteria?

## Honest note on enforcement

Same pattern as Modules 01, 09, 10, 11, and 12: no CI/lint check enforces
anything in this module. The one real, concrete mechanism is
`.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" — a checklist
surfaced at PR-creation time, not a gate. It can be skipped, and for a
solo-founder company, review and maintenance ultimately depend on Emad (or
whoever is reviewing a given PR) actually reading it. A Hiring OS-specific
row was added to the template in this same change (mirroring Module 11's
and Module 12's precedent), given this module shares Finance OS's risk
profile: its entire subject is a set of deliberately unfinalized figures
(compensation, equity) sitting alongside an unranked, undated hiring plan.

## Maintenance triggers

- A first hire actually happens → major update trigger. Update
  `01-current-state.md` (the founder-led, single-founder fact changes) and
  `02-anticipated-hiring.md` (one of the four anticipated categories moves
  from anticipated to real) in the same change. Coordinate with Module 01
  (`01-brand-bible/01-identity.md`, "Company stage" — the underlying
  team-composition fact flips) and Module 07 (investor-material relevance
  of a first hire). This mirrors the PR template's existing "Company stage
  changed... first hire" row.
- A compensation or equity policy gets finalized → update
  `02-anticipated-hiring.md` with the real, sourced policy, replacing the
  current "no policy finalized" statement. Do not add a figure anywhere
  else in this module first, and do not add it preemptively based on an
  internal conversation alone.
- Incorporation happens → note in `02-anticipated-hiring.md` that the
  employment/contracting dependency resolves (an employer entity now
  exists). Coordinate with Module 10 (`03-legal-entity-and-structure.md`)
  and Module 07 (`01-company-snapshot.md`), which own the underlying
  incorporation fact and its Phase A/B flip.

## Cross-references

- **Depends on:** Module 01 (`01-identity.md`, "Company stage" — founder-led
  fact, cited not restated; `04-principles.md` — Human Accountability;
  `06-governance.md` — governance-file pattern), Module 07 and Module 10
  (`03-legal-entity-and-structure.md` — no-incorporated-entity fact, cited
  not restated), Module 09 (`03-success-and-production-readiness.md` —
  closest existing framing of "validation," cited as adjacent, not
  identical), Module 11 (`03-governance.md` — the zero-fabricated-figures
  discipline this module follows), Module 12 (`02-engagement-rules.md`,
  `03-governance.md` — the matching contracting-dependency pattern for
  signed agreements, the same 2026-07-13 owner-decision batch that
  resolved both this module's validation-threshold gap and Module 12's
  formal-engagement definition, and the governance-file pattern this file
  follows most directly)
- **Feeds:** none yet. No other built module currently cites Hiring OS's
  facts. Module 07 (Investor Data Room) and Module 01 (Brand Bible, company
  stage) are the most likely future citers once a first hire actually
  happens.

## Closure

Complete once all three files in this directory pass independent and
adversarial review with no open findings, and the PR is merged.
