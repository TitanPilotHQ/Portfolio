# Positioning — 02. Competitive Positioning Map

All content in this file is sourced from `COMPETITOR_COMPARISON`
(`lib/content.ts:367-416`) — the real, live comparison table on `/product`.
This file adds only organization (clustering into groups); it does not add,
remove, or reword any competitor's `theyAre`, `difference`, or `concede`
field. Per Voice Pillar 2 (`01-brand-bible/02-voice-and-tone.md`), every row
below keeps its concession — never cite a differentiation without it.

## Cluster 1: Charting & Technical Analysis Tools

**TradingView** — "The world's charting + social ideas platform."
Difference: "Titan Pilot's unit is the decision, not the chart. Charts here
visualize the exact dossier the AI reasoned from — no social layer, and every
signal comes with machine-checked citations, not likes." Concede: "Charting
depth, asset coverage, community, price."

**TrendSpider** — "Automated technical analysis tooling." Difference:
"TrendSpider automates finding patterns; Titan Pilot automates arguing about
them — analyst, adversary, and deterministic score — then records the
argument immutably." Concede: "Breadth of TA automation, backtesting UX,
multi-asset scanning."

**LuxAlgo** — "Premium indicator overlays." Difference: "LuxAlgo decorates
charts with proprietary signals. Every claim in Titan Pilot decomposes to
dossier facts or code output — there's no proprietary mystique to defend,
only evidence to show." Concede: "Visual polish on charts, community, low
cost."

**Cluster positioning:** this group competes on visualization and pattern
discovery. Titan Pilot doesn't compete here at all — it concedes charting
depth, TA breadth, and visual polish across all three. The relevant
distinction is what happens *after* a pattern or chart suggests something:
these tools stop at visualization; Titan Pilot starts at the recorded,
challengeable decision.

## Cluster 2: Execution Infrastructure

**MetaTrader 5** — "The retail execution standard." Difference: "Titan Pilot
treats MT5 as a dumb execution limb. Everything MT5 lacks — provenance,
approvals, replay, budget control, audit — is the product." Concede: "Raw
execution features, broker ubiquity, indicator ecosystem."

**Cluster positioning:** not a competitor in the usual sense — MT5 is
infrastructure Titan Pilot's own architecture uses (`TECH_STACK`,
`lib/content.ts:198-210`, lists MetaTrader 5). The comparison exists because
MT5 alone is sometimes mistaken for a complete solution; Titan Pilot's
position is that MT5 is necessary but not sufficient — it's the execution
layer, not the accountability layer.

## Cluster 3: No-Code Strategy Automation

**Capitalise.ai** — "Natural-language strategy automation." Difference:
"Capitalise turns English into rules and hides the rest. Titan Pilot turns
market state into an evidenced argument and shows all of it: a cited thesis,
its rebuttal, and its score." Concede: "Onboarding simplicity, no-ops setup,
multi-broker reach."

**Composer** — "No-code quant strategy builder / backtester." Difference:
"Composer sells hypotheticals — backtest curves. Titan Pilot sells
reconstructables — hash-verified replay of what actually happened, including
every no-trade." Concede: "Strategy composition UX, portfolio breadth,
backtesting speed."

**Cluster positioning:** this group competes on ease of building automated
strategies. The shared distinction: both hide their internal reasoning
behind a simple interface ("turns English into rules," "backtest curves").
Titan Pilot's position is the inverse trade-off — harder to onboard, but
nothing is hidden: every reasoning step, challenge, and score is visible and
replayable.

## Cluster 4: AI Signal Marketplaces

**Tickeron** — "AI signal marketplace with confidence %." Difference:
"Tickeron's confidence score is opaque; Titan Pilot's is a hash-pinned
deterministic function of visible components with the counter-argument
attached." Concede: "Asset breadth, pattern variety, consumer price point."

**Cluster positioning:** this is the closest existing category to "AI trading
bot" / "trading signal service" — the categories Titan Pilot explicitly
positions against (`01-category-positioning.md`). The distinction is
opacity: a confidence percentage with no visible mechanism vs. a
deterministic, hash-pinned score with its counter-argument attached.

## Cluster 5: Institutional Data Terminals

**Bloomberg Terminal** — "The institutional data monopoly." Difference:
"Titan Pilot doesn't compete on data — it competes on decision
accountability. Bloomberg tells you everything about the market and nothing
about why your own system traded." Concede: "Data universe, news, chat
network effects, multi-asset analytics — essentially everything except this
one thing."

**Cluster positioning:** the largest concession in the entire comparison set
("essentially everything except this one thing") paired with the sharpest
differentiation. Bloomberg is not a substitute for Titan Pilot and Titan
Pilot is not a substitute for Bloomberg — they answer different questions
("what's happening in the market" vs. "why did my own system act").

## Reading the map

Across all 5 clusters, Titan Pilot never claims to be better at the
adjacent category's core competency (charting, execution breadth,
onboarding ease, asset coverage, data breadth) — every single comparison
concedes real ground. The one axis Titan Pilot claims across every cluster,
without exception, is **decision accountability**: a recorded,
cross-examinable, replayable argument behind the decision, which none of the
8 named alternatives provide. Any new competitor added to this map in the
future (see intake §9 for the categories Emad wants tracked going forward —
AI agent platforms, financial AI governance vendors, decision-intelligence
platforms) should be evaluated against this same single axis, not added to
prove breadth for its own sake.
