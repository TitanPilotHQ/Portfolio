# LaunchOS v1 — Master Plan

**Status:** Program kickoff
**Owner:** Emad (sole founder)
**Mission:** Build LaunchOS — the operating system of Titan Pilot — to enterprise-grade,
immediately-usable quality. Not documentation. Not brainstorming. Every artifact must be
usable inside the real company today.

## Freeze notice

Website work (the `titan-site` repo's product surface) is frozen as of W4 closure
(2026-07-12), except:
- W2 — real Evidence Explorer (blocked on a sanitized decision-record fixture)
- Critical production bug fixes
- Security patches

W5 (site accessibility/performance/SEO/AEO/GEO/security polish) is explicitly not
starting. LaunchOS is the new primary mission and lives in this repo under
`docs/launchos/`.

## Grounding rule

**No fabrication.** Every factual statement in every module must trace to one of:
1. Content already live on titanpilot.app / in this repo (cited `file:line`)
2. The public claims register (`docs/content/PUBLIC_CLAIMS_REGISTER.md`)
3. A direct statement from Emad, captured in this program's intake process and cited
   by date

Where a module requires a fact that doesn't yet exist in any of these three places
(a real price, a real financial figure, a real hire, a real investor term), that
module is marked **Blocked** below rather than filled with placeholder or invented
content. A blocked module does not get a skeleton with `[TBD]` markers — it gets
built for real once the fact exists, or not at all.

A full extraction of every existing real fact about Titan Pilot (identity, voice,
product, principles, known gaps, registered claims) was compiled on 2026-07-12 and
is the primary source for every "Ready" module below. See individual module specs
for citations.

## Module readiness matrix

| # | Module | Status | Blocking need |
|---|---|---|---|
| 01 | Brand Bible | Ready | — |
| 02 | Story Architecture | Ready | — |
| 03 | Messaging Bible | Ready | — |
| 04 | Positioning | Ready | — |
| 05 | Pricing System | Blocked | Real pricing philosophy, model, and figures (see intake §1) |
| 06 | Sales OS | Blocked | Real sales process, ICP qualification bar, tooling (see intake §2) |
| 07 | Investor Data Room | Blocked | Real cap table, financials, traction, fundraising history (see intake §3) |
| 08 | Demo Playbooks | Ready (scoped to product-truth demo script; sales-motion sections wait on §2) | — |
| 09 | Customer Success OS | Blocked | Real onboarding/support process, current design-partner practice (see intake §4) |
| 10 | Operations OS | Blocked | Real legal entity, vendor/tool stack, day-to-day SOPs (see intake §5) |
| 11 | Finance OS | Blocked | Real financials — burn, runway, revenue, accounting method (see intake §6) |
| 12 | Partnership OS | Blocked | Real partnership targets and criteria (see intake §7) |
| 13 | Hiring OS | Blocked | Real hiring plan, comp philosophy, equity pool (see intake §8) |
| 14 | Competition Intelligence | Ready (framework + the site's existing real competitor comparison); expansion waits on §9 | — |
| 15 | Market Research Framework | Ready (methodology, built on the site's existing research doctrine); market-sizing data waits on real research | — |
| 16 | Asset Library | Ready (catalog of real existing assets + maintenance process) | — |

9 modules ready to build now from existing real facts. 7 modules blocked on
factual input only Emad can provide — intake questions below, asked once, in a
single batch, per the mission's stop condition.

## Process (per module)

Matches the engineering standard already used in this repo:

1. **Specification** — a short module spec: scope, audience, sources, structure.
   Written by the controller (this session), grounded in the extraction report or
   Emad's intake answers.
2. **Implementation** — a fresh drafting subagent writes the module from the spec,
   on its own branch (`launchos-NN-<module-slug>`).
3. **Independent review** — a fresh reviewer subagent checks: every claim sourced,
   no placeholders, no banned language, internal consistency, cross-references
   other modules correctly, matches the quality bar.
4. **Adversarial review** — a second fresh reviewer, instructed to try to break the
   module: find fabricated-sounding claims, missing edge cases, internal
   contradictions, anything that would not survive investor/executive diligence.
5. **Revision** — controller dispatches a fix pass for any confirmed finding from
   either review, then re-reviews.
6. **Publication** — PR opened against `main`, module merged once clean.
7. **Closure report** — one-paragraph closure note appended to
   `docs/launchos/PROGRESS.md` (durable ledger, mirrors `.superpowers/sdd/progress.md`
   convention) plus a milestone summary at the end of each phase.

## Directory convention

```
docs/launchos/
  00-launchos-master-plan.md     — this file
  PROGRESS.md                    — durable, append-only closure ledger
  01-brand-bible/
  02-story-architecture/
  03-messaging-bible/
  04-positioning/
  ...
  16-asset-library/
```

Each module directory contains its own spec, the published content, and (where
applicable) templates/checklists as separate files rather than one monolithic
document — consistent with this repo's existing preference for focused files.

## Quality bar

Every module must survive the read of Sequoia, a16z, YC, Benchmark, General
Catalyst, a Stripe executive, or an Apple design lead. Concretely:
- No fabricated metrics, customers, market numbers, or unsupported claims
- No marketing filler; every sentence does work
- No duplicated content across modules — cross-reference instead of repeating
- Every module contains, where applicable to its subject: principles, standards,
  playbooks, templates, checklists, operating procedures, decision trees,
  examples, review criteria, and a maintenance process
- Every module states its own review/maintenance cadence

## Sequencing rationale

01–04 (Brand Bible, Story Architecture, Messaging Bible, Positioning) come first
because every later module references them for voice, category language, and
claims discipline. 14 and 15 (Competition Intelligence, Market Research Framework)
are pulled forward because their methodology doesn't require blocked facts. 16
(Asset Library) is built last among the "Ready" set since it catalogs the outputs
of 01–15. The 7 blocked modules resume in numeric order as soon as intake answers
land.
