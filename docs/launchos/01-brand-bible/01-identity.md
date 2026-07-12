# Brand Bible — 01. Identity

## Name

**Titan Pilot.** Two words, both capitalized, no abbreviation in customer-facing
copy. Internally, the engineering system that Titan Pilot's product is built on
is referred to as "Titan" (separate repository, `TitanPilotHQ/Titan`) — external
copy always says "Titan Pilot," never bare "Titan," to avoid confusing the company
name with the underlying system name.
*(Source: `lib/content.ts:14`; `docs/content/PUBLIC_CLAIMS_REGISTER.md` source
column, every row.)*

## Category

**Supervised AI Trading.** This is a category Titan Pilot is defining, not
borrowing — it deliberately sits between "AI trading bot" (implies autonomous
execution and performance promises Titan Pilot explicitly refuses to make) and
"trading signal service" (implies retail, low-accountability advice). The word
"supervised" carries the entire differentiation: a human or deterministic rule
is always the final authority.
*(Source: hero eyebrow badge, `components/Hero.tsx:49`; Twitter card title,
`app/layout.tsx:71`.)*

## One-line company description (GEO-canonical, do not paraphrase)

> "Titan Pilot is an AI trading infrastructure platform."

This exact sentence is repeated verbatim across the homepage, manifesto, FAQ, and
GitHub README by design — it is written as an unambiguous, quotable definition for
AI answer engines and search snippets. Never rewrite it "for variety." Pair it, when
more context is useful, with the four sentences that follow it in the canonical set:

> "Titan Pilot is built around replayable decision trails, deterministic scoring,
> broker reconciliation, and risk-first automation."
> "Titan Pilot uses AI for structured market reasoning, not direct execution
> authority."
> "Titan Pilot's AI shadow pipeline is certified and running, recording every
> decision before any promotion toward live execution."
> "Titan Pilot does not promise trading performance or financial returns."

*(Source: `lib/content.ts:24-33`, explicitly labeled in-code as "GEO entity
statements — exact, quotable definitions for AI answer engines.")*

## Mission

> "AI is already influencing trading decisions. The question is no longer
> whether traders will use it, but whether firms can prove what it said, what
> evidence it used, how it was challenged, and who approved the final action.
> Titan Pilot exists to make that process supervised, replayable and
> accountable."

"That process" refers specifically to proving what the AI said, what evidence
it used, how it was challenged, and who approved the action — not to AI's
influence on trading in general. Do not compress this into "Titan Pilot exists
to make AI trading supervised" — that changes what the mission is about.
*(Source: `lib/content.ts:473-474`.)*

## Problem statement

> "Traders are increasingly using general-purpose AI tools to influence market
> decisions, but those decisions usually have no reliable evidence trail, no
> deterministic risk controls, no replay, and no accountability when the AI is
> wrong. Titan Pilot was not built to promise better returns or to create another
> black-box trading bot — it was built to close that gap."
*(Source: `lib/content.ts:477-478`.)*

## Elevator pitches

**Short (one sentence, for a name badge or bio line):**
> Titan Pilot is the system of record for AI trading decisions.
*(Source: hero H1, `components/Hero.tsx:58-60`; site title tag, `app/layout.tsx:28`.)*

**Medium (2–3 sentences, for an intro email or a demo opener):**
> Titan Pilot turns every thesis, objection, score, approval, and refusal into
> machine-validated evidence your desk can replay, govern, and defend. AI can
> explain a market thesis, challenge assumptions, and summarize conflicting
> evidence — it is not the final authority over capital; that belongs to
> deterministic software and explicit risk gates. It's built for professional
> trading desks — not retail signals, performance promises, or one-click
> autonomy.
*(Source: hero subhead and sub-caption, `components/Hero.tsx:68-70,109-110`,
quoted verbatim; middle sentence is Manifesto Principle 1,
`lib/content.ts:291-292`.)*

**Long (for an investor conversation or a partnership intro — use verbatim, do not
compress further than this):**
> AI is already influencing how traders make decisions, but most of that
> influence leaves no evidence trail: no record of what the AI said, what data it
> used, how it was challenged, or who signed off. Titan Pilot closes that gap. It
> is AI trading infrastructure — not a trading bot — built around four
> commitments: reasoning is not authority (AI never holds execution power),
> capital protection outranks opportunity (hard risk limits sit below every
> decision and cannot be argued with), every decision must be replayable (all of
> it is recorded as immutable events), and automation earns trust through
> evidence, not optimism (promotion from shadow mode toward autonomy is gated on
> recorded outcomes and explicit approval). The system currently runs in a
> certified production shadow phase: the full AI pipeline runs on real market
> data with real model calls, every signal is recorded with its full evidence
> trail, and nothing is executed.
*(Source: synthesized from `lib/content.ts:289-314` (Manifesto Principles),
`lib/content.ts:473-478` (mission/problem), `lib/content.ts:514-515` (company
stage), and `lib/content.ts:349-353` (Shadow-stage description, source of the
closing sentence). No sentence introduces a fact not present in these
citations.)*

## Tagline usage

Titan Pilot does not use a single fixed marketing tagline (e.g., no "Trade
smarter" line exists or should be invented). Instead, the **hero headline** —
"The system of record for AI trading decisions." — functions as the closest thing
to a tagline and should be the default short identifier in decks, README headers,
and social bios. It is definitional, not evocative, by design: it states what the
product *is*, matching the site's "evidence over claims" voice pillar (see
`02-voice-and-tone.md`).

## Company stage (state as-is, do not compress into "we are live" language)

> "Titan Pilot is currently in a certified production shadow phase... The system
> currently operates in supervised shadow mode while we engage with qualified
> design partners and continue validating the product with real operational
> evidence."
*(Source: `lib/content.ts:514-515`.)*

> "Titan Pilot is currently founder-led and intentionally small. Emad is the sole
> founder and primary product and engineering owner. The platform has been
> developed with extensive AI-assisted engineering, but architecture, product
> direction, operational decisions, security posture, testing standards, and
> final approvals remain human-owned."
*(Source: `lib/content.ts:485-486`; also claims register row #14.)*

Any external material (deck, one-pager, LinkedIn bio) that describes company
stage must match this framing verbatim in substance: founder-led, shadow-mode
validation with design partners, not "launched" or "live trading" in any sense
that implies executed trades or paying customers. ("Pre-revenue" is a
reasonable inference from this framing, not a phrase that appears in any cited
source — state the cited facts directly rather than the inferred label where
precision matters, e.g. in Module 07 Investor Data Room or Module 11 Finance
OS once those are unblocked.)
