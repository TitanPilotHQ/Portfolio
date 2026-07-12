# Story Architecture — 02. Audience Variants

The core narrative (`01-core-narrative.md`) doesn't change per audience — the
facts, principles, and arc stay fixed. What changes is **emphasis and
entry point**: which beat opens the conversation, which beats get compressed,
and which get expanded. This file defines three variants; each is anchored to
a real structural signal in the site (noted per variant), but the specific
emphasis/compression choices below are the controller's narrative-strategy
judgment, not verified facts about reader behavior — treat them as a starting
recommendation to test and revise, not a settled finding.

## Trading desk / prospective user

**Entry point:** Mental Model, then straight to the Decision Timeline
walkthrough — under the judgment that a desk lead wants to know what happens
mechanically before anything else.

**Expand:** Safety Grid, Evidence, Product Mode Ladder — this audience's
likely real question is "what happens when it's wrong, and how do I know
you're not overselling autonomy you don't have." Two real versions of the
trust-ladder answer exist and should never be compressed away for this
audience:
- **Homepage (short form):** `PRODUCT_MODES` (`lib/content.ts:212-231`) —
  "Shadow Mode — Certified," "Copilot Mode — Upcoming," "Autonomous Demo —
  Evidence-Gated."
- **`/product` (long form):** `AUTONOMY_LADDER_DETAIL` (`lib/content.ts:
  349-365`) — the same three stages with full mechanism detail ("Shadow —
  Certified — current," "Copilot — Designed — next," "Autonomous Demo —
  Evidence-gated — future").

If this audience is engaging on the homepage, cite `PRODUCT_MODES`; if the
conversation has moved to product depth (a demo, `/product`, a technical
follow-up), cite `AUTONOMY_LADDER_DETAIL`. Don't blend the two arrays' wording
in one place — pick the one that matches where the audience actually is.

**Compress:** Tech Stack and company/team narrative — judgment call that a
desk lead cares more about mechanism than about company biography; untested.

**Structural anchor for this variant:** the contact form's own qualification
fields — desk size, asset classes, AI usage, governance method
(`components/ContactForm.tsx`, backed by `lib/contactSchema.ts`; the three
section labels wrapping them are `CONTACT_FORM_SECTIONS`,
`lib/content.ts:585-589`) — confirm the reader is meant to be evaluating
Titan Pilot as operational infrastructure, which supports (but doesn't prove)
the "mechanism and safety first" framing above.

## Investor

**Entry point:** The mission/problem statements (`COMPANY_MISSION`,
`lib/content.ts:471-476`; `COMPANY_PROBLEM`, `lib/content.ts:477-479`) —
judgment that this audience needs the category-defining gap established
before anything else makes sense as a business.

**Expand:** Milestones and Evidence (numbered, not dated — see
`01-core-narrative.md` — but still the closest thing to traction metrics
while the company is pre-revenue), the Manifesto/Company Principles (an
investor is arguably buying into founder judgment and discipline as much as a
product), and the "What Titan Pilot will never claim" list
(`COMPANY_NEVER_CLAIMS`, `lib/content.ts:497-504`) — for this audience, the
discipline of what's *not* claimed can itself be a credibility signal worth
stating explicitly rather than left implicit.

**Compress:** the granular Decision Timeline walkthrough to a summary —
judgment that this audience evaluates the business first and the mechanism
second; useful as backup detail if asked.

**Must never soften:** company stage. Module 01's "Company stage" section
(`01-brand-bible/01-identity.md`) applies at full strength here, including its
explicit caveat that no design partner is yet confirmed in the claims
register — never compress "engaging design partners" into language that
reads as more traction than exists. This is the audience most likely to ask
follow-up diligence questions that expose an overstated stage claim.

## Technical / partner (engineer evaluating integration, or a technology
partner)

**Entry point:** Architecture (`ARCHITECTURE_FLOW`, `ARCHITECTURE_LAYERS`,
`lib/content.ts:68-107`) and the Architecture Deep-Dive facts
(`lib/content.ts:421-437`) — judgment that this audience wants the mechanism
before the narrative frame.

**Expand:** the four architecture deep-dive claims ("AI cannot bypass
execution," "One database, three data classes," "Replay is a proof, not a
re-implementation," "Dependencies point one way") and the Security
Capabilities section (`lib/content.ts:440-468`) — this audience evaluates
Titan Pilot the way they'd evaluate any infrastructure dependency: enforcement
mechanism first, marketing claim never.

**Compress:** the Mental Model's simplified six-step version — judgment that
this audience will find it too abstract and prefer the real pipeline
immediately; untested.

## What never changes across variants

- The GEO-canonical identity statements (`01-brand-bible/01-identity.md`)
- The never-claims list
- The disclaimer
- Tense discipline (current-certified vs. future-roadmap language)

## Confidence note

Only the desk-lead variant's structural anchor (the contact form's field
design) is a hard structural fact. The investor and technical/partner
variants' entry points are reasonable inferences from the site's own audience
statement ("We work with professional trading desks, technology partners, and
qualified design partners," `lib/content.ts:572`) rather than independently
verified. Treat all "Expand/Compress" guidance in this file as a hypothesis
to validate against real conversations (sales calls, investor meetings, demo
sessions) once Module 06 (Sales OS) exists — update this file with what
actually works rather than leaving these as permanent assumptions.

Any new audience variant proposed in the future must be justified the same
way these three were — pointing to an existing structural signal in the site
or product (a form field, a page's actual audience, a stated use case) rather
than an assumed persona.
