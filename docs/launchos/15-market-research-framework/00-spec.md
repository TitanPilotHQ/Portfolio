# Module 15 — Market Research Framework — Spec

**Status:** Ready to build
**Depends on:** none (first module to touch this subject — see Global
Constraint 4 application below)
**Purpose:** The canonical home for (1) Titan Pilot's real, already-public
research-publication doctrine, and (2) an honest statement of what this
module's name might suggest but does not currently contain: external
market-sizing research (TAM/SAM/SOM, industry reports, market-share data).

## Naming note — read before building

This module is named "Market Research Framework" per the master plan, but
the only sourced research-related content on the live site
(`lib/content.ts:517-563`, `RESEARCH_INTRO` through `RESEARCH_STATUS`) is
Titan Pilot's own technical/engineering research-publication program
(whitepapers, engineering reports, benchmark studies) — not external market
research about the trading-technology industry's size, growth, or
competitive share. This module must not paper over that distinction. It
documents the real, sourced research-publication doctrine as its primary
content, and separately, explicitly states that no external market-sizing
research exists or is claimed anywhere in LaunchOS — establishing this
module as the canonical place such research would go if it's ever produced,
without inventing any of it now.

## Sources

Grounded in `lib/content.ts:517-563` (`RESEARCH_INTRO`, `RESEARCH_PRINCIPLES`,
`RESEARCH_PIPELINE`, `RESEARCH_STANDARDS`, `RESEARCH_CLAIMS_NOTE`,
`RESEARCH_STATUS`) — all already public on titanpilot.app's `/research`
page.

## Global Constraint 1 application

The master plan's Quality bar explicitly prohibits "fabricated metrics,
customers, market numbers, or unsupported claims." No market-size figure
(TAM, SAM, SOM, industry revenue, growth rate, or competitor market share)
exists in any source available to this program. This module must not
produce one, including as a rough estimate or a range.

## Global Constraint 4 application

No other LaunchOS module currently cites `RESEARCH_*` content (verified by
search before this spec was written) — this module is a clean canonical
owner with no boundary conflict. Per the master plan's Global Constraint 4
list: "Research claims → the Research repository / Market Research
Framework (Module 15) only." Future modules needing to reference Titan
Pilot's research doctrine or status should cite this module rather than
independently describing `RESEARCH_*` content.

## Structure

| File | Contents |
|---|---|
| `01-research-doctrine.md` | The real, sourced research-publication program: principles, pipeline (10 items, all status "Planned"), standards, claims note, current status |
| `02-market-research-scope.md` | The naming clarification: no external market-sizing research exists; this file is the canonical (currently empty) home for it if produced later |
| `03-governance.md` | Review criteria, maintenance triggers, cross-references, honest enforcement note |
