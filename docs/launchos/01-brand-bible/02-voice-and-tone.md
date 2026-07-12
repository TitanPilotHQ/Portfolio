# Brand Bible — 02. Voice and Tone

## Voice pillars

Derived from the consistent, repeated patterns across every published page —
each pillar below is falsifiable: draft copy either follows the pattern or it
doesn't.

### 1. Evidence over claims

The house idea, expressed in two distinct sentences in live copy: "Titan Pilot
is built on measurable engineering evidence rather than marketing claims"
(`lib/content.ts:520`) and "Every public statement traces to a sourced, dated
engineering record — not marketing language" (`lib/content.ts:489`).

**Rule:** Every capability statement names the mechanism or the proof, not just
the outcome. Compare:
- ❌ "Titan Pilot keeps your trading safe."
- ✅ "Unknown broker state → Halt. Ambiguous execution evidence → Halt. AI
  provider failure → No signal." (`SAFETY_RULES`, `lib/content.ts:140-148`)

### 2. Concede before you compare

Every competitive comparison on the site includes what the alternative does
*better* (`lib/content.ts:367-416`), and the product page states the reason
explicitly: "The honest column matters — each alternative is better than Titan
Pilot at something, and we don't pretend otherwise." (`app/product/page.tsx:121`)

**Rule:** Never write a comparison, competitive claim, or "why us" section without
naming a real limitation or trade-off in the same breath.

### 3. State the stage, not the ambition

The site never says "we help traders win" or "we're transforming trading" — it
states exactly what phase the product is in: "Certified — current" for shadow
mode, "Designed — next" for copilot mode, "Evidence-gated — future" for autonomous
mode (`lib/content.ts:349-365`). Ambition belongs in internal planning documents
(e.g., the roadmap), never in a claim about present capability.

**Rule:** Tense discipline. "Titan Pilot records" (present, true now) is different
from "Titan Pilot will enable" (future, roadmap) — never blur the two to make the
product sound more finished than the claims register supports.

### 4. Short declarative fragments as structural anchors

Section and principle titles are consistently short imperative or declarative
fragments, not full marketing sentences: "Reasoning is not authority.", "Unknown
state means stop.", "Evidence or it didn't happen.", "The default action is
nothing." (`lib/content.ts:291-334`)

**Rule:** A principle or doctrine title is one clause, states a rule (not a
benefit), and reads correctly on its own without the supporting paragraph.

### 5. Precision over hype adjectives

The copy almost never uses subjective intensifiers ("incredible," "revolutionary,"
"game-changing," "cutting-edge"). It uses domain-precise, checkable words:
"deterministic," "replayable," "fail-closed," "risk-first," "append-only,"
"hash-pinned," "auditable." Where a superlative-adjacent word does appear, it's
attached to something quantified: "in 13 seconds," "1,662 of 1,662," "12-case
fault matrix."

**Rule:** If an adjective can't be swapped for a number or a mechanism without
losing meaning, cut it.

## Banned language (hard rule — zero exceptions)

Pulled directly from `COMPANY_NEVER_CLAIMS` (`lib/content.ts:497-504`) and the
disclaimer page (`app/disclaimer/page.tsx:19-21,31-37`). No Titan Pilot copy, in
any LaunchOS module, may state or imply:

| Banned | Why | Correct alternative |
|---|---|---|
| Guaranteed or predicted trading returns (including implied via hedged language) | Explicit never-claim | Cite the mechanism (risk gates, fail-closed rules), never the outcome |
| Licensed financial or investment advice | Explicit never-claim; also regulatory exposure | "This is not financial advice" disclaimer, always present near product claims |
| A large team, institutional backing, or customers Titan Pilot doesn't have | Explicit never-claim | State actual stage: founder-led, design-partner phase |
| Regulatory approval, certification, or endorsement not received | Explicit never-claim | Only cite certifications actually in the claims register (e.g., "Phase C.5 certified" — an internal engineering milestone, not a regulatory one — always described as such) |
| Peer-reviewed research or academic partnerships that don't exist | Explicit never-claim | Research page states publications are "Planned," not published — say so |
| Endorsement by any employer of Emad's | Explicit never-claim; Titan Pilot is independent of his employment | Omit employer references entirely in Titan Pilot materials |
| Words implying live/executed trades or profitability ("results," "performance," "win rate," "profitable") applied to the current product | Disclaimer: "Titan Pilot makes no claims about trading performance, profitability, win rates, or returns"; shadow-mode signals are explicitly "engineering evidence, not evidence of future or past profitability" | "Recorded," "validated," "certified" — words about the evidence process, not the trading outcome |
| Describing interface visuals as real trading records | Disclaimer: "product simulations with non-live data, not records of real trading results" | Caption any screenshot or demo visual as a simulation if it isn't a literal recorded event |
| Treating autonomous execution as a committed roadmap item | Disclaimer: "Any autonomous operation remains outside the current public promise... and may never occur" | Autonomous Demo mode is always "evidence-gated," never a date-committed feature |

**Note on "certified" outside the GEO block:** the five GEO-canonical sentences
in `01-identity.md` (repeated verbatim per that file's rule) include, in the
same five-sentence set, "Titan Pilot does not promise trading performance or
financial returns" — so the block as a whole is never read in isolation from
its own non-performance framing. **Outside that fixed block** — in a status
table, a single-line mention, a slide, a tweet — "certified" must always carry
its qualifier ("Phase C.5 certified — an internal engineering milestone, not a
regulatory one") in the same sentence. Never quote "is certified and running"
as a standalone fragment; either use the full GEO sentence or the qualified
form, never a partial excerpt of either.

**Note on status words ("Live," "Certified," "Built," etc.):** these words are
safe for infrastructure/data-pipeline status ("PostgreSQL Event Spine — Live,"
`lib/content.ts:190`) and unsafe for anything describing trading or execution
status. Never pair a bare status word with "trading," "execution," or
"autonomous" — those always route through the Autonomy Ladder's three-stage
language ("Certified — current" / "Designed — next" / "Evidence-gated —
future") instead of a plain status word, per Voice Pillar 3 above.

## Sentence-pattern examples (before/after, drawn from real site voice)

**Describing a safeguard**
- ❌ "Our risk management keeps you protected."
- ✅ "Hard limits, budgets, and circuit breakers sit below every decision — and
  they cannot be argued with." (`lib/content.ts:296`)

**Describing an AI capability**
- ❌ "Our AI makes smart trading decisions."
- ✅ "AI can explain a market thesis, challenge assumptions, and summarize
  conflicting evidence. It should not be the final authority over capital."
  (`lib/content.ts:292`)

**Describing reliability**
- ❌ "Titan Pilot is highly reliable and battle-tested."
- ✅ "A 48-hour certification soak exercised every fail-closed path... each
  produced an explained, auditable outcome in production, not just in design."
  (claims register row #9)

**Describing what happens on failure**
- ❌ "Don't worry, we handle errors gracefully."
- ✅ "Every failure mode collapses toward no action." (`lib/content.ts:345`,
  the "Fail-Closed" doctrine)

## Tone by context

| Context | Tone adjustment | Still must hold |
|---|---|---|
| Product/marketing pages | Confident, precise, declarative | Evidence-over-claims, no banned language |
| Manifesto | Slightly more editorial/philosophical, short punchy lines allowed | Every principle still traces to a real mechanism |
| Investor materials | Same precision, denser with real metrics from the claims register | No claim without a claims-register-equivalent citation |
| Sales/demo conversation | Can be more conversational and use "you/your desk" | Never soften a disclaimer or imply results to close a conversation |
| Security/architecture pages | Most technical register in the whole site | Still names mechanisms, not just "secure" as an adjective |

## Maintenance

New voice patterns must be added here only after they appear at least twice in
shipped copy (to confirm they're a pattern, not a one-off). This file is reviewed
whenever the claims register changes materially — a new certification or a
retracted claim can add or remove an entire row from the banned-language table.
