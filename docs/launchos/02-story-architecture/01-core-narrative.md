# Story Architecture — 01. Core Narrative

## The arc, as it actually ships

The homepage's real section order (`app/page.tsx:27-40`) is not arbitrary —
read in sequence, it is Titan Pilot's core narrative, already in production:

1. **Hero** — the claim: "The system of record for AI trading decisions."
   (`components/Hero.tsx:58-60`)
2. **Mental Model** — how it works, in six one-line steps, before any jargon:
   "AI does not trade → AI writes a thesis → Software scores it → Risk gates
   decide → Events record everything → Replay proves what happened."
   (`lib/content.ts:36-43`)
3. **Why** — the problem this solves (`WHY_CARDS`, `lib/content.ts:45-66`,
   amplifying the mission/problem statements at `lib/content.ts:471-478`)
4. **Architecture** — the mechanism: how the pipeline is actually built
   (`ARCHITECTURE_FLOW`, `lib/content.ts:68-80`)
5. **Decision Timeline** — proof-in-action: one real decision, walked step by
   step (`DECISION_STEPS`, `lib/content.ts:109-119`) — this is the narrative's
   centerpiece; see below.
6. **AI Philosophy** — the manifesto principles applied to the product
   (`MANIFESTO_PRINCIPLES`, `lib/content.ts:289-314`)
7. **Safety Grid** — what happens when something goes wrong (`SAFETY_RULES`,
   `lib/content.ts:140-148`)
8. **Evidence** — quantified proof of what's actually built
   (`EVIDENCE_ROWS`, `lib/content.ts:151-182`)
9. **Milestones** — numbered proof, no dates attached (`MILESTONES`,
   `lib/content.ts:187-196`)
10. **Tech Stack** — credibility via real, named technology
    (`lib/content.ts:198-210`)
11. **Product Mode Ladder** — how trust is earned toward autonomy, short form
    (`PRODUCT_MODES`, `lib/content.ts:212-231` — rendered by
    `components/ProductModeLadder.tsx`; **not** `AUTONOMY_LADDER_DETAIL`,
    which is a longer-form version used only on `/product`, see
    `02-audience-variants.md`)
12. **Roadmap** — the broader plan (`lib/content.ts:233-243`)
13. **FAQ** — objection handling (`FAQ_ITEMS`, `lib/content.ts:246-287`)
14. **Contact teaser** — the ask

## The shape, named

**Claim → Simplify → Problem → Mechanism → Proof-in-action → Philosophy →
Failure mode → Evidence → Trust ladder → Objections → Ask.**

This is deliberately *not* a classic "problem-agitate-solve" marketing arc.
It never agitates (no fear-based language anywhere in the copy — consistent
with Voice Pillar 5 in `01-brand-bible/02-voice-and-tone.md`, precision over
hype). It also doesn't lead with the mechanism — it leads with the claim, then
immediately simplifies before going deep, then earns the right to go technical
by showing one concrete decision before asking the reader to trust an
abstraction.

**Rule for any new long-form piece** (a deck, a one-pager, a long-form blog
post): follow this order unless there's a specific reason not to — claim
first, a simple mental model second, the problem third, mechanism fourth, one
concrete walked-through example fifth, then evidence and objection-handling.
Never open with the problem/pain point before the claim — that's a different
genre (agitation-led) than Titan Pilot's established voice.

## The centerpiece device: "one decision, walked through"

`DECISION_STEPS` (`lib/content.ts:109-119`) is the single most important
narrative asset in the company. It takes the abstract mental model and makes
it concrete by walking one hypothetical decision through all nine real
pipeline stages:

> "H1 candle closes" → "Pre-gate checks market conditions" → "Dossier is
> built and hashed" → "Technical Analyst produces thesis" → "Devil's Advocate
> challenges it" → "Deterministic scorer calculates result" → "Signal is
> recorded in shadow mode" → "Risk engine remains final authority" → "Replay
> can reconstruct the full story."

**Rule:** any time the product needs to be explained to a new audience — a
demo, an investor conversation, a partner pitch — reach for this device before
reaching for an abstract capability list. A reader remembers "here's what
happens when a candle closes" far better than "here's our architecture."
This is why Module 08 (Demo Playbooks) is built around walking exactly this
sequence live rather than narrating features.

## Where tension actually lives

Titan Pilot's story has real tension, but it isn't "trading is hard." The two
source statements, quoted directly rather than paraphrased:

> "AI is already influencing trading decisions. The question is no longer
> whether traders will use it, but whether firms can prove what it said, what
> evidence it used, how it was challenged, and who approved the final
> action." (`COMPANY_MISSION`, `lib/content.ts:473-474`)

> "Traders are increasingly using general-purpose AI tools to influence
> market decisions, but those decisions usually have no reliable evidence
> trail, no deterministic risk controls, no replay, and no accountability
> when the AI is wrong." (`COMPANY_PROBLEM`, `lib/content.ts:477-478`)

Together these locate the tension precisely: **the gap between AI's use in
trading decisions and the absence of any evidence trail or accountability for
that use.** The "Why" section and every comparison row exist to make that
specific gap concrete, not to manufacture generic urgency. Any new narrative
material should locate its tension here — the evidence gap — rather than
inventing a new problem framing.

## The competitor line as narrative compression

> "They show you the market or a signal. Titan Pilot shows you a decision you
> can cross-examine." (`lib/content.ts:418-419`)

This single sentence compresses the entire arc above (claim, mechanism,
proof) into one comparison. It's the shortest correct version of the story
and the right default when space is limited to one sentence (a tweet, a slide
title, a cold-email subject line).
