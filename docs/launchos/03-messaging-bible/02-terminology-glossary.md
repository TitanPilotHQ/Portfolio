# Messaging Bible — 02. Terminology Glossary

Word-level rules beyond Module 01's banned-language table
(`01-brand-bible/02-voice-and-tone.md`). This file governs which words are
approved for which meaning, and which words require a mandatory companion
phrase to avoid being misread.

## Core vocabulary (approved, with definitions to use consistently)

| Term | Definition to use | Source |
|---|---|---|
| Thesis | The AI-generated market reasoning for a candidate decision | `DECISION_STEPS`, `lib/content.ts:113` |
| Dossier | The versioned, hashed bundle of market data a thesis is reasoned from | `lib/content.ts:112`, Manifesto Principle 6 |
| Devil's Advocate | The step that challenges the thesis before scoring | `lib/content.ts:114` |
| Score / Deterministic scorer | The non-AI, rule-based evaluation of a thesis | `lib/content.ts:115` |
| Risk gate | The deterministic, non-negotiable check that sits below every decision | `lib/content.ts:75,96`, Manifesto Principle 1-2 |
| Signal | A recorded decision output — in shadow mode, always non-executing | `lib/content.ts:116` |
| Shadow mode | The current operating mode (Phase C.5 certified — an internal engineering milestone, not a regulatory one): full pipeline runs, nothing executes | `AUTONOMY_LADDER_DETAIL`, `lib/content.ts:352-353` |
| Replay | Rebuilding system state from the immutable event log and comparing it to live state | `lib/content.ts:268-270` |
| Event / event log | The append-only, immutable record every decision is stored as | Manifesto Principle 3 |
| Fail-closed | The doctrine that every failure mode collapses toward no action | `PRODUCT_DOCTRINES`, `lib/content.ts:344-346` |
| Evidence | Recorded, replayable proof of what happened — never a synonym for "result" or "performance" | Banned-language table (results/performance/win-rate row), `01-brand-bible/02-voice-and-tone.md` |

**Rule:** use these words for these meanings only. Do not use "signal" to mean
a trading tip (retail-signal-service connotation Titan Pilot explicitly
distances itself from — see the FAQ and category definition). Do not use
"evidence" loosely to mean "reason to believe" in a persuasive sense — it
always means the recorded, replayable artifact.

## Terms requiring a mandatory companion phrase

These words are approved but must never appear alone outside their governing
context — using them bare is the most common way copy accidentally
overclaims.

| Term | Mandatory companion | Why |
|---|---|---|
| "Certified" (outside the fixed GEO block) | Do not write "[X] is certified" plus a separate qualifier — instead write the whole replacement unit: "[X] is Phase C.5 certified — an internal engineering milestone, not a regulatory one." Using bare "certified" and then appending the qualifier produces an awkward "certified... certified" repetition; folding "Phase C.5" into the verb phrase avoids it. | Module 01's certification-qualifier rule, `02-voice-and-tone.md` |
| "AI" (when describing what it does) | A same-sentence statement of what it does NOT do (decide, execute, hold authority) | Manifesto Principle 1 |
| "Autonomous" / "Autonomy" | The current stage word ("Evidence-gated — future") — never used to describe present capability | Autonomy Ladder, `AUTONOMY_LADDER_DETAIL` |
| "Design partners" | "engaging" (process verb), never "have" or "working with" | Module 01, `01-identity.md`, Company stage section |
| "Live" / "Running" / "Built" (status words) | Must attach only to infrastructure/data-pipeline capability, never to trading/execution | Module 01, `02-voice-and-tone.md` |
| "Replayable" | A reference to the specific mechanism (event log + replay verification), not used as a vague credibility adjective | Manifesto Principle 3 |

## Banned or discouraged beyond Module 01's list

| Term | Status | Use instead |
|---|---|---|
| "Signal" (retail-tip sense) | Banned in that sense | Restrict "signal" to Titan Pilot's technical sense (defined above); if a retail-tip meaning is genuinely needed (e.g. describing what Titan Pilot is *not*), name it explicitly as "trading signals" or "retail signals," never bare "signal" |
| "AI agent" | Discouraged | "AI analyst" / "the AI layer" — "agent" implies autonomous action Titan Pilot's AI doesn't have |
| "Trading bot" (applied to Titan Pilot itself) | Banned when describing Titan Pilot | "AI trading infrastructure" — the site explicitly defines itself against this term (`COMPANY_PROBLEM`, `lib/content.ts:477-478`: "not... another black-box trading bot") |
| "Platform" (used loosely) | Discouraged as a filler word | Name the actual thing: "pipeline," "infrastructure," "system of record" |
| "Solution" | Discouraged as vague SaaS filler | Name the actual mechanism |
| "Powered by AI" | Discouraged — undersells the actual architecture | "AI produces reasoning; deterministic software and risk gates decide" (the real, more precise claim) |
| "Trader" (as the default customer noun) | Use carefully | Per the canonical target-customer definition (Module 06, `06-sales-os/00-icp.md`), the target paid customer is an organization, not an individual trader — default to "desk" or "trading organization" unless specifically addressing an individual user |

## Category and naming discipline

- "Titan Pilot" — always both words, always capitalized this way (Module 01,
  `01-identity.md`, "Name")
- "Supervised AI Trading" — the category name, capitalized as a proper noun
  when used as the category label (matching the hero eyebrow badge); lowercase
  ("supervised AI trading") when used descriptively mid-sentence
- Never abbreviate "Titan Pilot" to "TP" or "Titan" in any external-facing
  copy (internal engineering references to the separate `Titan` repository are
  the only exception, and should stay out of customer-facing material)

## Maintenance

Add a term to this glossary only once it's appeared in two or more pieces of
shipped copy with consistent meaning — this file documents established usage,
it doesn't pre-define vocabulary for concepts that don't exist yet (e.g., no
entry for "Copilot Mode" terminology beyond what's already in
`AUTONOMY_LADDER_DETAIL`, since that mode isn't built).
