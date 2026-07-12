# Messaging Bible — 03. Channel Messages

Message variants for specific channels. Every entry is either a direct quote
from live copy (marked "verbatim, live") or an assembly of already-approved
fragments from Module 01's elevator pitches or Module 02's scenes (marked
"assembled from"), with no new claim introduced at assembly time.

## Website hero (verbatim, live)

Category: "SUPERVISED AI TRADING" · Claim: "The system of record for AI
trading decisions." · Elaboration: "Titan Pilot turns every thesis,
objection, score, approval, and refusal into machine-validated evidence your
desk can replay, govern, and defend." · Qualifier: "Built for professional
trading desks — not retail signals, performance promises, or one-click
autonomy." (`components/Hero.tsx:49,58-59,68-70,109-110`)

## Search snippet / meta description (verbatim, live)

"Titan Pilot is supervised AI trading infrastructure — every AI thesis,
objection, score, and approval becomes replayable, evidence your desk can
defend." (`app/layout.tsx:31-32`)

## Social share card (verbatim, live)

Title: "Titan Pilot — Supervised AI Trading" · Description: "Every AI trading
decision, recorded and replayable. Titan Pilot is the system of record for
supervised AI trading." (`app/layout.tsx:71-73`)

## One-line bio (adapted from Module 02's compression line)

"Titan Pilot — AI trading infrastructure. Most tools show you the market or a
signal; Titan Pilot shows you a decision you can cross-examine."

(Adapted, not verbatim: `COMPETITOR_PITCH`'s "They" (`lib/content.ts:418-419`)
refers to the named alternatives in `COMPETITOR_COMPARISON` and has no
antecedent standalone — replaced with "Most tools" so the line is
self-contained. First sentence is `ENTITY_STATEMENTS[0]`,
`lib/content.ts:29`, verbatim.)

Use for: Twitter/X bio, LinkedIn headline, conference badge line.

## Cold email subject line (assembled from the claim + qualifier tiers)

"The system of record for your desk's AI trading decisions"

(Assembled from the claim tier — "The system of record for AI trading
decisions," `components/Hero.tsx:58-59` — with "your desk's" drawn from the
qualifier tier's audience framing, `components/Hero.tsx:109-110`, not
invented. Keeps "The," not "a," to avoid weakening the site's primary
positioning statement from a definite claim to an indefinite one.)

Use for: cold outbound to a qualified ICP contact (Module 06 defines the
ICP). Do not use for inbound reply subject lines — those should reference the
prospect's own submitted context instead of restating the pitch.

## Deck title slide (assembled from claim + qualifier tiers)

**Titan Pilot**
The system of record for AI trading decisions.
*Built for professional trading desks — not retail signals, performance
promises, or one-click autonomy.*

Use for: any external deck (demo, investor, partner). The qualifier tier is
mandatory on a title slide specifically because decks travel without the
surrounding page context that would otherwise supply it.

## Investor-conversation opener (Module 01's Long elevator pitch, verbatim)

Use `01-brand-bible/01-identity.md`'s Long elevator pitch verbatim — it is
already built for this exact context and should not be re-assembled or
paraphrased here; re-deriving it in two places risks drift.

## Demo opener (Module 01's Medium elevator pitch, verbatim)

Use `01-brand-bible/01-identity.md`'s Medium elevator pitch verbatim, then
transition immediately into Module 02's Decision Walkthrough scene
(`02-story-architecture/03-narrative-components-library.md`).

## What this file deliberately does not contain

New taglines, new headline variants not derived from existing copy, or
persuasive rewrites of the claim tier "for variety." Per Module 01's Tagline
usage rule, the hero headline is the fixed short identifier — this file
assembles from it and the scenes library, it does not compete with it by
inventing alternatives.
