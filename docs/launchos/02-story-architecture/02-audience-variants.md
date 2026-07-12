# Story Architecture — 02. Audience Variants

The core narrative (`01-core-narrative.md`) doesn't change per audience — the
facts, principles, and arc stay fixed. What changes is **emphasis and
entry point**: which beat opens the conversation, which beats get compressed,
and which get expanded. This file defines three variants actually implied by
existing site copy and structure; it does not invent new audiences.

## Trading desk / prospective user

**Entry point:** Mental Model, then straight to the Decision Timeline
walkthrough. A desk lead wants to know what happens mechanically before
anything else.

**Expand:** Safety Grid, Evidence, Product Mode Ladder — this audience's real
question is "what happens when it's wrong, and how do I know you're not
overselling autonomy you don't have." The Autonomy Ladder's explicit staging
("Shadow — Certified — current," "Copilot — Designed — next," "Autonomous
Demo — Evidence-gated — future," `lib/content.ts:349-365`) directly answers
this and should never be compressed away for this audience.

**Compress:** Tech Stack and company/team narrative — a desk lead cares more
about mechanism than about company biography.

**Source for this framing:** the contact form's own qualification fields
(desk size, asset classes, AI usage, governance method — `CONTACT_FORM_SECTIONS`,
`lib/content.ts:585-590`) already assume the reader is evaluating Titan Pilot
as operational infrastructure, not a product concept — confirming this
audience reads for mechanism and safety first.

## Investor

**Entry point:** The mission/problem statement (`lib/content.ts:473-478`),
because this audience needs the category-defining gap ("AI's influence
without accountability") established before anything else makes sense as a
business.

**Expand:** Milestones and Evidence (dated, numbered proof of execution
capability — this is what substitutes for traction metrics while the company
is pre-revenue), the Manifesto/Company Principles (an investor is buying
into founder judgment and discipline as much as a product), and the
"What Titan Pilot will never claim" list (`lib/content.ts:497-504`) — for
this audience, the discipline of what's *not* claimed is itself a credibility
signal worth stating explicitly, not just implicitly following.

**Compress:** the granular Decision Timeline walkthrough — useful as backup
detail, not the opening beat, since this audience is evaluating the business
first and the mechanism second.

**Must never soften:** company stage. Module 01's "Company stage" section
(`01-brand-bible/01-identity.md`) applies at full strength here — no
compressing "founder-led, engaging design partners" into anything that reads
as more traction than exists. This is the audience most likely to ask
follow-up diligence questions that expose an overstated stage claim.

## Technical / partner (engineer evaluating integration, or a technology
partner)

**Entry point:** Architecture (`ARCHITECTURE_FLOW`, `ARCHITECTURE_LAYERS`,
`lib/content.ts:68-108`) and the Architecture Deep-Dive facts
(`lib/content.ts:421-437`) — this audience wants the mechanism before the
narrative frame.

**Expand:** the four architecture deep-dive claims ("AI cannot bypass
execution," "One database, three data classes," "Replay is a proof, not a
re-implementation," "Dependencies point one way") and the Security
Capabilities section (`lib/content.ts:440-468`) — this audience evaluates
Titan Pilot the way they'd evaluate any infrastructure dependency: enforcement
mechanism first, marketing claim never.

**Compress:** the Mental Model's simplified six-step version — this audience
will find it too abstract and will ask for the real pipeline immediately;
don't spend their attention on the simplified version first.

## What never changes across variants

- The GEO-canonical identity statements (`01-brand-bible/01-identity.md`)
- The never-claims list
- The disclaimer
- Tense discipline (current-certified vs. future-roadmap language)

Any new audience variant proposed in the future must be justified the same
way these three were — pointing to an existing structural signal in the site
or product (a form field, a page's actual audience, a stated use case) rather
than an assumed persona.
