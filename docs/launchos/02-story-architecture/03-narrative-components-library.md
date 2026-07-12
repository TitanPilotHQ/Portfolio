# Story Architecture — 03. Narrative Components Library

Reusable "scenes" — self-contained narrative units that any module (a deck,
a demo script, a blog post) can assemble from, instead of re-deriving how to
explain a given concept. Each entry names its source, its narrative function,
and when to use it.

## Scene: The Mental Model (six steps)

**Function:** fastest possible correct explanation of the whole system.
**Use when:** opening any explanation to a new audience, especially non-
technical ones, or as the first 30 seconds of any live demo.
**Content:** "AI does not trade. AI writes a thesis. Software scores it. Risk
gates decide. Events record everything. Replay proves what happened."
(`lib/content.ts:36-43`)
**Do not:** expand this scene with technical detail inline — its value is
brevity. If more depth is needed, transition to the Decision Walkthrough
scene next, don't inflate this one.

## Scene: The Decision Walkthrough

**Function:** proof-in-action; converts an abstract pipeline into something
a reader/listener can follow step by step.
**Use when:** any audience has grasped the Mental Model and needs to see it's
real, not just tidy. This is the centerpiece scene — see
`01-core-narrative.md`.
**Content:** the nine `DECISION_STEPS` (`lib/content.ts:109-119`).
**Do not:** skip steps for brevity in a way that removes the Devil's
Advocate or Risk Gate steps specifically — those two are what separate
Titan Pilot's narrative from a generic "AI makes a prediction" story. (This
library has no shipped-content track record yet to say how often that
mistake actually happens — treat the warning as a design safeguard, not a
measured pattern.)

## Scene: The Failure-Mode Beat

**Function:** answers "what happens when something breaks" before the
audience has to ask — pre-empts the most common skeptical question.
**Use when:** any audience with risk sensitivity (desk leads, investors,
technical evaluators) — i.e., almost always, just not necessarily first.
**Content:** the `SAFETY_RULES` condition→response table (`lib/content.ts:
140-148`) and the Fail-Closed doctrine (`lib/content.ts:344-346`).
**Do not:** soften any response into something more comforting than the
literal table — "Halt" stays "Halt," not "we handle it gracefully."

## Scene: The Trust Ladder

**Function:** explains why the product isn't "done" yet without that reading
as a weakness — reframes staged rollout as the actual safety mechanism.
**Use when:** any audience asks (explicitly or implicitly) "when does this
actually trade for me" — this scene is the honest, complete answer.
**Content:** the same three-stage structure exists in two real forms — the
short homepage version, `PRODUCT_MODES` (`lib/content.ts:212-231`: Shadow
Mode — Certified, Copilot Mode — Upcoming, Autonomous Demo —
Evidence-Gated), and the long `/product` version, `AUTONOMY_LADDER_DETAIL`
(`lib/content.ts:349-365`: Shadow — Certified — current, Copilot — Designed —
next, Autonomous Demo — Evidence-gated — future, "may never occur" per the
disclaimer). Use whichever matches the surface you're writing for; see
`02-audience-variants.md` for the rule on picking between them.
**Do not:** present Copilot or Autonomous Demo as scheduled features with
implied dates — the scene's entire value is that promotion is evidence-gated,
not calendar-gated. **Do not** use the word "Certified" bare on any short
surface (a slide, a tweet, a single-line status mention) — per
`01-brand-bible/02-voice-and-tone.md`'s certification-qualifier rule, it must
carry "Phase C.5 certified — an internal engineering milestone, not a
regulatory one" in the same sentence outside the full GEO block.

## Scene: The Honest Comparison

**Function:** differentiates without denigrating, and builds trust through
visible self-criticism.
**Use when:** any audience is implicitly or explicitly comparing Titan Pilot
to an alternative (a trading bot, a signal service, a general-purpose AI
tool, a spreadsheet-and-gut-feel status quo).
**Content:** any row from `COMPETITOR_COMPARISON` (`lib/content.ts:367-416`),
always paired with its "concede" field, plus the compression line: "They show
you the market or a signal. Titan Pilot shows you a decision you can
cross-examine." (`lib/content.ts:418-419`)
**Do not:** use a comparison row without its concession — see Voice Pillar 2
in `01-brand-bible/02-voice-and-tone.md`.

## Scene: The Discipline List

**Function:** for audiences (especially investors) where restraint itself is
the credibility signal.
**Use when:** the audience needs to trust founder judgment, not just product
mechanism — pairs well with the Investor variant in `02-audience-variants.md`.
**Content:** `COMPANY_NEVER_CLAIMS` (`lib/content.ts:497-504`), framed
explicitly as "here's what we've committed to never say" rather than left
implicit.
**Do not:** rely only on defensive use (i.e., only in response to a skeptical
question) — the controller's judgment is that stating it proactively signals
the discipline exists independent of being challenged, but this is a
recommendation to test, not a measured result.

## Assembling scenes into a narrative

A full narrative for any given context is an ordered subset of these scenes,
following the arc in `01-core-narrative.md` and the emphasis rules in
`02-audience-variants.md`. No new scene should be added to this library until
it has been used successfully in at least one real piece of shipped content —
this library documents what works, it doesn't speculate about what might.
