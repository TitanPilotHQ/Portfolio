# Positioning — 03. Positioning Statement

## Formal statement (classic template, filled only with sourced facts)

> For professional trading desks, prop firms, hedge funds, brokers, and
> institutional trading organizations already using AI to inform trading
> decisions, who need to prove what the AI said, what evidence it used, how
> it was challenged, and who approved the result, **Titan Pilot** is
> **Supervised AI Trading infrastructure** that turns every thesis,
> objection, score, approval, and refusal into machine-validated,
> replayable evidence — with deterministic risk gates, not AI, as the final
> authority over capital. Unlike AI trading bots, no-code strategy
> automators, or AI signal marketplaces, Titan Pilot never gives AI
> execution authority and never hides its reasoning: every decision
> decomposes to a cited thesis, its rebuttal, and a deterministic score.

**Sourcing:** the target-customer clause is from `INTAKE-REQUEST.md` §1.4/§2.2
(internal planning input, not yet a public claim — see Global Constraint 3).
Every other clause is a direct citation: the need clause from
`COMPANY_MISSION` (`lib/content.ts:473-474`); "turns every thesis, objection,
score, approval, and refusal into machine-validated evidence" is the hero
subhead verbatim (`components/Hero.tsx:68-70`) — condensed here to
"...evidence" only for length, dropping the subhead's further "your desk can
replay, govern, and defend"; "deterministic risk gates...final authority
over capital" is a present-tense factual claim, correctly stated as fact (not
softened to "should"), sourced to `ARCHITECTURE_LAYERS`'s "Risk Gate — Final
deterministic risk authority before any execution path" (`lib/content.ts:
96-98`) and `DECISION_STEPS`'s "Risk engine remains final authority"
(`lib/content.ts:117`) — both describe the system as built, today, unlike
Manifesto Principle 1's normative "should not be" framing
(`lib/content.ts:291-292`), which is related context but not the source of
this clause's tense; the "unlike" clause from the three most relevant
comparison clusters in `02-competitive-positioning-map.md` (AI trading bot ≈
Cluster 4's Tickeron pattern, no-code automators = Cluster 3, signal
marketplaces = Cluster 4).

## Public-safe variant (omits the not-yet-public target-customer clause)

For any surface where the intake's target-customer framing hasn't yet been
cleared for public statement, use the qualifier-tier framing that's already
live instead:

> Titan Pilot is supervised AI trading infrastructure, built for
> professional trading desks — not retail signals, performance promises, or
> one-click autonomy. It turns every thesis, objection, score, approval, and
> refusal into machine-validated evidence your desk can replay, govern, and
> defend, with deterministic risk gates — not AI — as the final authority
> over capital.

This variant uses only content already live on the site: opening sentence
from `app/layout.tsx:31-32` (verbatim, lowercase "supervised" matching that
source exactly per Module 03's capitalization rule for descriptive
mid-sentence use); qualifier clause and evidence clause from
`components/Hero.tsx:109-110,68-70` (verbatim, restored to the subhead's full
"replay, govern, and defend" rather than the formal statement's shorter
compression above); risk-gate clause from `ARCHITECTURE_LAYERS`/
`DECISION_STEPS` as cited above. Safe for any public surface today.

## When to use which

| Context | Use |
|---|---|
| Public website, public deck, anything externally published | Public-safe variant |
| Internal strategy docs, sales enablement (Module 06), investor conversations once the target-customer framing is cleared for that audience | Full formal statement |

## What this statement is not

Not a tagline (Module 01 already designates the hero headline as the fixed
short identifier) and not a new claim generator — every clause here traces
to an existing citation. If a future business decision changes the target
customer, pricing model, or category name, this file must be revised in the
same change (see governance).

## Segment note (from intake, not yet a formal segmentation)

Per intake §1 and §2, there's currently one ICP, not a segmented set:
organizations already experimenting with AI-assisted trading that need
governance, auditability, explainability, and operational control. This
module does not create sub-segments (e.g., "hedge fund" vs. "prop firm"
positioning variants) because no such segmentation exists yet in any real
source — inventing one here would violate the grounding rule. If Module 06
(Sales OS) or real sales conversations surface a genuine sub-segmentation
later, add it here with its source.
