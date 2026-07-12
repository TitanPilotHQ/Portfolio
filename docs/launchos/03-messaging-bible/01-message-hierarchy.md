# Messaging Bible — 01. Message Hierarchy

## The real hierarchy, as it ships

The homepage hero is the canonical instance of Titan Pilot's message
hierarchy — three tiers, each with a distinct job (`components/Hero.tsx:
49,58-60,68-70,109-110`):

1. **Category tier (eyebrow badge):** "SUPERVISED AI TRADING" — names the
   category before anything else, since it's a category Titan Pilot is
   defining (Module 01, `01-identity.md`, "Category").
2. **Claim tier (H1):** "The system of record for AI trading decisions." —
   one sentence, definitional, the primary message.
3. **Elaboration tier (subhead):** "Titan Pilot turns every thesis,
   objection, score, approval, and refusal into machine-validated evidence
   your desk can replay, govern, and defend." — expands the claim into
   mechanism, without yet qualifying the audience.
4. **Qualifier tier (sub-caption):** "Built for professional trading desks —
   not retail signals, performance promises, or one-click autonomy." —
   states who this is for by stating who it's explicitly *not* for. This
   tier does real work: it pre-filters the audience and pre-empts three
   specific misreadings in one sentence.

**Rule:** any new primary message surface (a deck title slide, a landing
page for a specific channel) should include all four tiers where space
allows, in this order. Cutting the qualifier tier for space is the most
common mistake — Module 08 (Demo Playbooks) and Module 04 (Positioning) both
depend on the qualifier tier doing its filtering job consistently, not just
on the homepage.

## The SEO/share instance (a second real hierarchy)

`app/layout.tsx:25-84` runs a parallel, slightly different hierarchy tuned
for search/social rather than a human reading top-to-bottom:

- **Title:** "Titan Pilot — The System of Record for AI Trading Decisions"
  (`metadata.title.default`, line 28)
- **Meta description:** "Titan Pilot is supervised AI trading
  infrastructure — every AI thesis, objection, score, and approval becomes
  replayable, evidence your desk can defend." (line 31-32)
- **OpenGraph description (slightly different again):** "Supervised AI
  trading. Titan Pilot turns every AI thesis, objection, score, and approval
  into replayable, machine-validated evidence." (line 58-59)
- **Twitter card title:** "Titan Pilot — Supervised AI Trading" (line 71)

**Observation, not yet a rule:** these four are all genuine variations on the
same claim tier, not duplicates — each is tuned to its surface's character
limit and context (a search snippet reads differently than a social card).
This confirms the message hierarchy is meant to compress gracefully: the
claim tier survives being rewritten at different lengths as long as
"system of record," "AI trading decisions," and "replayable/evidence" survive
together. Any new short-form variant should preserve that same trio rather
than picking a different subset.

## Proof-point tier (supporting the claim, not competing with it)

Below the hero, the site's proof points are the Mental Model, Decision
Timeline, Evidence, and Milestones sections (Module 02,
`01-core-narrative.md`). In message-hierarchy terms, these are **tier 5:
proof** — they exist to substantiate tiers 2-4, never to introduce a new
primary claim. A common failure mode this rule exists to prevent: a proof
point (e.g., "1,662 of 1,662 replay events with zero drift") getting
promoted to a headline on its own, disconnected from the claim it's proving.
Proof points support; they don't lead, except in the specific short-form
compression case below.

## Objection tier

The FAQ (`FAQ_ITEMS`, `lib/content.ts:246-287`) is the hierarchy's objection
tier — each entry is a supporting message triggered by a specific doubt
rather than shown by default. Treat FAQ entries as pre-written responses to
specific objections, reusable verbatim in a sales conversation (Module 06) or
a demo (Module 08) when that specific objection actually comes up — not as
general-purpose supporting copy.

## Compression rule (when only one sentence fits)

When space allows only one sentence, use the competitor-pitch compression
line from Module 02 (`03-narrative-components-library.md`, "Honest
Comparison" scene): "They show you the market or a signal. Titan Pilot shows
you a decision you can cross-examine." (`lib/content.ts:418-419`) This is the
only sentence in the current corpus that carries claim + mechanism + implicit
differentiation in one line without a qualifier tier — use it exactly when
the qualifier tier's job (audience filtering) is not the priority (e.g., a
one-line bio where the reader has already self-selected by finding the
profile).
