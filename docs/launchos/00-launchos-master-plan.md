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

## Global Constraints

Binding on every module, copied here verbatim so no module has to restate
them:

1. **No fabrication.** Every factual statement traces to live site content,
   the claims register, or a direct, dated statement from Emad (see
   Grounding rule above). A module with a missing fact stays unbuilt or
   states the fact is undetermined — it never gets a placeholder or an
   invented number.
2. **Diligence-grade quality bar.** Every module must survive the read of a
   skeptical investor or executive — no marketing filler, no duplicated
   content across modules (cross-reference instead), and every module states
   its own review/maintenance cadence (see Quality bar below).
3. **Two-phase writing for pre-incorporation facts** (added 2026-07-12, from
   Emad, in response to `INTAKE-REQUEST.md` answers). Titan Pilot is not
   currently incorporated. Any module touching legal entity, finance,
   contracting, or hiring must be structured in two clearly separated
   phases rather than only describing today's state:
   - **Phase A — Founder-led, pre-incorporation** (today): describe the
     actual current state (sole founder, no legal entity, no CRM, no
     accounting platform, etc.) as fact.
   - **Phase B — Incorporated operating company** (future): describe the
     structure/process that will exist once incorporation happens, framed
     explicitly as a plan to execute at that trigger point — never as a
     present-tense claim. Use conditional/future framing ("once
     incorporated, X will..."), never blend it into Phase A's present-tense
     facts.
   This applies most directly to Modules 07 (Investor Data Room), 10
   (Operations OS), 11 (Finance OS), and 13 (Hiring OS), and to any other
   module that touches contracts, payroll, or legal structure in passing.
   The intent (Emad's own words): so these modules don't need a rewrite the
   day incorporation happens — only Phase A needs to flip to "historical"
   and Phase B needs to flip to "current."
4. **Single Source of Truth** (added 2026-07-12, from Emad). Every factual
   statement must exist in exactly one canonical location. Other modules may
   reference that fact, but must never duplicate or independently redefine
   it. Canonical ownership, as assigned by Emad:
   - Brand principles → Brand Bible (Module 01) only.
   - Positioning (category adjacency, competitive map, positioning
     statement) → Positioning (Module 04) only.
   - Pricing → Pricing System (Module 05) only.
   - ICP → Sales OS (Module 06) only.
   - Product capabilities → Titan engineering documentation (accessed in
     this repo via `lib/content.ts` and the public claims register, which
     function as the accessible published copy of that documentation — a
     module citing `lib/content.ts` for a product-capability fact is
     referencing the canonical source, not creating a second one; the
     violation this guards against is a module writing its own independent
     *description* of what the product does instead of quoting/citing the
     existing one).
   - Website messaging → Messaging Bible (Module 03) only; new site copy
     should be authored via Module 03 first, then implemented on the site —
     not written ad hoc on the site and back-filled into LaunchOS later.
   - Research claims → the Research repository / Market Research Framework
     (Module 15) only.
   - Investor material → canonical sources (the modules above), never
     restated independently inside Module 07.
   Cross-reference instead of copy. If a fact changes, fixing it should
   require editing exactly one canonical document. When a fact's rightful
   canonical module doesn't exist yet (e.g., ICP was needed before Module 06
   was built), create a minimal, explicitly-scoped seed of that module
   containing only the canonical fact — never let an earlier module become
   the fact's de facto owner by default.

## Module readiness matrix

**Updated 2026-07-12: Emad answered the full batched intake
(`INTAKE-REQUEST.md`). All 16 modules are now Ready.** Table kept for
reference; "Grounded by" replaces "Blocking need."

| # | Module | Status | Grounded by |
|---|---|---|---|
| 01 | Brand Bible | Built | Live site content |
| 02 | Story Architecture | Built | Live site content + Module 01 |
| 03 | Messaging Bible | Built | Live site content + Modules 01-02, Module 06's ICP seed |
| 04 | Positioning | Built | Live site content + Modules 01-03, Module 06's ICP seed |
| 05 | Pricing System | Ready | Intake §1 (working assumptions, not public commitments) |
| 06 | Sales OS | Seeded (ICP canonical, `00-icp.md`) — rest Ready | Intake §2 (real current process) |
| 07 | Investor Data Room | Ready | Intake §3 + Global Constraint 3 (pre/post-incorporation phases) |
| 08 | Demo Playbooks | Ready | Live site content + Module 02's Decision Walkthrough scene |
| 09 | Customer Success OS | Ready | Intake §4 (real design-partner onboarding flow) |
| 10 | Operations OS | Built | Intake §5 + Global Constraint 3 |
| 11 | Finance OS | Built | Intake §6 + Global Constraint 3 (no figures to disclose yet — module documents process, not numbers that don't exist) |
| 12 | Partnership OS | Built | Intake §7 (real target categories, no fabricated names) |
| 13 | Hiring OS | Built | Intake §8 + Global Constraint 3 |
| 14 | Competition Intelligence | Built | Live site's real competitor comparison + intake §9 |
| 15 | Market Research Framework | Built | Live site's existing research doctrine |
| 16 | Asset Library | Ready | Live site's real assets |

**Module 06 note:** its ICP sub-file was built early (`06-sales-os/00-icp.md`)
because Modules 03 and 04 needed the canonical ICP fact before Module 06's
own numbered turn — per Global Constraint 4, the fact moved to its rightful
owner immediately rather than staying duplicated in earlier modules. The rest
of Module 06 (sales process, tooling, pipeline stages) is still queued in
numeric order.

Modules 05, 07, 09, 10, 11, 13 are built from Emad's direct answers, which are
internal planning inputs (working assumptions, not yet public commitments).
These modules must clearly distinguish internal planning content from
anything cleared to say publicly — see the grounding rule and Global
Constraint 3 above.

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

01–04 (Brand Bible, Story Architecture, Messaging Bible, Positioning) come
first because every later module references them for voice, category
language, and claims discipline. With the intake answered (2026-07-12), the
remaining build proceeds in roughly numeric order — 05, 06, 07, 08, 09, 10,
11, 12, 13, 14, 15, 16 — since no module is blocked anymore. 16 (Asset
Library) still lands last regardless of order since it catalogs the outputs
of every other module. Exception: Module 06's ICP sub-file was built out of
order (see Module 06's note above) because Global Constraint 4 required the
fact to have a canonical home before Modules 03 and 04 could correctly cite
it — future out-of-order sub-file builds should follow the same pattern
(seed only the specific fact needed, leave the rest of the module for its
numeric turn) rather than becoming a precedent for building whole modules
early.
