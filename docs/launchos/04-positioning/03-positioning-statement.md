# Positioning — 03. Positioning Statement

## Formal statement (classic template, filled only with sourced facts)

> For professional trading desks, prop firms, hedge funds, brokers, and
> institutional trading organizations already using AI to inform trading
> decisions, who need to prove what the AI said, what evidence it used, how
> it was challenged, and who approved the final action, **Titan Pilot** is
> **Supervised AI Trading infrastructure** that turns every thesis,
> objection, score, approval, and refusal into machine-validated evidence —
> with deterministic risk gates, not AI, as the final authority. Unlike AI
> trading bots, it never gives AI execution authority. Unlike no-code
> strategy automation tools, it never hides the reasoning behind a decision
> or reduces it to a backtested hypothetical — every decision decomposes to
> a cited thesis, its rebuttal, and a deterministic score, all visible.
> Unlike AI signal marketplaces, that score is a hash-pinned deterministic
> function of visible components, not an opaque confidence percentage.

**Sourcing:** the target-customer clause is from `INTAKE-REQUEST.md` §1.4/§2.2
(internal planning input, not yet a public claim — see Global Constraint 3).
Every other clause is a direct citation: the need clause is `COMPANY_MISSION`
verbatim (`lib/content.ts:473-474`, "who approved the final action," not
paraphrased); "turns every thesis, objection, score, approval, and refusal
into machine-validated evidence" is the hero subhead, trimmed only at the end
— condensed from "...evidence your desk can replay, govern, and defend" for
length, with the "replay" concept intentionally not folded back in as an
adjective elsewhere in this sentence, unlike an earlier draft of this file
(`components/Hero.tsx:68-70`); "deterministic risk gates...final authority"
is a present-tense factual claim, correctly stated as fact (not softened to
"should"), sourced to `ARCHITECTURE_LAYERS`'s "Risk Gate — Final
deterministic risk authority before any execution path" (`lib/content.ts:
96-98`) and `DECISION_STEPS`'s "Risk engine remains final authority"
(`lib/content.ts:117`) — both describe the system as built, today, unlike
Manifesto Principle 1's normative "should not be" framing
(`lib/content.ts:291-292`), which is related context but not the source of
this clause's tense (this clause deliberately omits "over capital," since
that specific phrase traces only to the normative Manifesto text, not to
either factual source). The three "unlike" clauses are each scoped to a
distinct, correctly-mapped source: AI trading bots → Manifesto Principle 1 +
`COMPANY_PROBLEM` (no bot appears in `COMPETITOR_COMPARISON`, since none of
the 8 named competitors is one); no-code strategy automation tools → Cluster
3 (Capitalise.ai's "hides the rest," Composer's "sells hypotheticals" vs.
Titan Pilot's "reconstructables"); AI signal marketplaces → Cluster 4
(Tickeron's opaque confidence % vs. Titan Pilot's hash-pinned score). Unlike
an earlier draft, this version does not claim all three categories fail on
the same two axes — see `02-competitive-positioning-map.md` for why that
would have overstated Composer's and Tickeron's actual gaps.

## Public-safe variant (omits the not-yet-public target-customer clause)

For any surface where the intake's target-customer framing hasn't yet been
cleared for public statement, use the qualifier-tier framing that's already
live instead:

> Titan Pilot is supervised AI trading infrastructure, built for
> professional trading desks — not retail signals, performance promises, or
> one-click autonomy. It turns every thesis, objection, score, approval, and
> refusal into machine-validated evidence your desk can replay, govern, and
> defend, with deterministic risk gates — not AI — as the final authority.

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

Not a tagline (Module 01 already designates the hero headline as the default
short identifier — Titan Pilot deliberately has no single fixed marketing
tagline) and not a new claim generator — every clause here traces
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
