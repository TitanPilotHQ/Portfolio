# Module 02 — Story Architecture — Spec

**Status:** Ready to build (no blocked facts)
**Depends on:** Module 01 (Brand Bible) — inherits voice pillars, principles,
and the mission/problem statement rather than restating them.
**Purpose:** The narrative structure Titan Pilot uses to explain itself —
not new copy, but the *shape* existing and future copy should follow: what
comes first, what tension gets introduced, what resolves it, and how the
story changes for different audiences without changing what's true.

## Sources

Same grounding rule as Module 01: every structural claim about "how the story
is told" traces to the site's actual page order, section sequence, or content
arrays in `lib/content.ts` — this module documents an existing pattern, not an
invented one. Citations use the same `file:line` convention as Module 01.

## Structure

| File | Contents |
|---|---|
| `01-core-narrative.md` | The site's actual problem → tension → mechanism → proof arc, and the "one decision, walked through" narrative device |
| `02-audience-variants.md` | How the same true story re-emphasizes different beats for a trader/desk lead, an investor, and a technical/partner audience |
| `03-narrative-components-library.md` | Reusable "scenes" (the pipeline walkthrough, the failure-mode beat, the trust-ladder beat, the honest-comparison beat) other modules can assemble from |
| `04-governance.md` | Review criteria, maintenance triggers, cross-references |

## Out of scope

- New copy for any specific channel — that's Module 03 (Messaging Bible, word
  choice) and Module 08 (Demo Playbooks, spoken narrative for a live demo).
- Positioning statements against specific competitors — Module 04.
