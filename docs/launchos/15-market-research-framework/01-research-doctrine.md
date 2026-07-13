# Market Research Framework — 01. Research Doctrine

**Source:** `lib/content.ts:517-563` (`RESEARCH_INTRO`, `RESEARCH_PRINCIPLES`,
`RESEARCH_PIPELINE`, `RESEARCH_STANDARDS`, `RESEARCH_CLAIMS_NOTE`,
`RESEARCH_STATUS`) — already public on titanpilot.app's `/research` page.
This file quotes and organizes that content; it does not add to it.

This is Titan Pilot's real, already-public research-*publication* doctrine —
its own technical/engineering research program. It is not external market
research about the trading-technology industry. See
`02-market-research-scope.md` for that distinction.

## Intro (`RESEARCH_INTRO`)

> **Built on evidence, not claims.**
> Titan Pilot is built on measurable engineering evidence rather than
> marketing claims. Our research program exists to make that evidence
> public, reproducible, and correctable — on our timeline, not a launch
> deadline.

The operative commitment: evidence is made public on Titan Pilot's own
timeline, gated by internal evidence standards, not by any external launch
or marketing deadline.

## Principles (`RESEARCH_PRINCIPLES`)

Six principles, listed exactly as sourced:

1. Evidence before claims
2. Reproducibility
3. Replayability
4. Public correction of mistakes
5. Transparent methodology
6. Versioned publications

## Publication pipeline (`RESEARCH_PIPELINE`)

Ten planned publication types. **All ten currently carry status
"Planned."** Zero are "In Preparation," "Under Internal Review," or
"Published." This is a plain, honest fact about where the research program
stands today — it is not a gap to be softened or a detail to bury.

| # | Publication type | Status |
|---|---|---|
| 1 | Whitepapers | Planned |
| 2 | Engineering Reports | Planned |
| 3 | Benchmark Studies | Planned |
| 4 | Provider Evaluations | Planned |
| 5 | AI Governance | Planned |
| 6 | Replay Architecture | Planned |
| 7 | Risk Engineering | Planned |
| 8 | Hallucination Containment | Planned |
| 9 | Decision Evidence | Planned |
| 10 | Trading AI Methodology | Planned |

No publication in this pipeline has a date, an author, a draft, or content
associated with it beyond the category name and "Planned" status shown
above. Nothing in this file should be read as implying otherwise.

## Standards every publication will document (`RESEARCH_STANDARDS`)

Seven standards, listed exactly as sourced:

1. Methodology
2. Datasets, where legally possible
3. Assumptions
4. Limitations
5. Version history
6. Errata
7. Reproducibility notes

These are standards the research program commits to applying once a
publication exists — they describe the *shape* a future publication will
take, not evidence that one currently exists.

## Claims note (`RESEARCH_CLAIMS_NOTE`)

> Every public technical claim on titanpilot.app will eventually map to
> supporting engineering evidence or published research.

This is a forward-looking commitment ("will eventually map to"), not a
present-tense claim that every current site claim already has a published
paper behind it. Given the pipeline table above — all ten publication
types still "Planned" — no current site claim is backed by a published
research artifact from this pipeline today. The mechanism that currently
grounds public claims is the claims register
(`docs/content/PUBLIC_CLAIMS_REGISTER.md`), which requires a source and a
review/expiry date for every measurable public claim before it ships. The
claims register is today's enforcement mechanism; the publication pipeline
above is a future, additional one — the two are not the same thing, and
the register is not superseded or replaced by this doctrine.

## Current status (`RESEARCH_STATUS`)

> **Delayed:** Our publications are intentionally delayed until they
> satisfy our internal evidence standards.

> **Current:** Research is currently being prepared. Titan Pilot will
> publish technical papers and engineering reports only after they meet
> our internal evidence standards. We prefer publishing later with
> evidence rather than earlier with speculation.

The "prefer publishing later with evidence rather than earlier with
speculation" framing is sourced language from `RESEARCH_STATUS.current`
itself — it is Titan Pilot's own stated policy, not this file's
editorializing or a claim invented for this module.

## What this file does not contain

No publication date, no specific paper title beyond the ten category names
listed above, and no claim that any pipeline item is further along than
"Planned." If any of those facts change, update `lib/content.ts:534-545`
first, then this file in the same change — see `03-governance.md`.
