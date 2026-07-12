# Demo Playbooks — 02. Demo Variants

How `01-demo-script.md`'s five sections expand/compress per audience, using
Module 02's audience variants (`02-story-architecture/02-audience-variants.md`)
as the source of emphasis rules — not restated here, applied here.

## Trading desk / prospective user

Per Module 02's desk-lead variant: expand section 3 (Decision Walkthrough)
and section 4 (Failure-Mode Beat); compress section 1 (opener) since this
audience is already past the initial pitch by the time a demo is scheduled
(Module 06's Stage 4 assumes Stage 2-3 already happened). Use the homepage
short-form Trust Ladder (`PRODUCT_MODES`) during section 3's Trust Ladder
pause, per Module 02's rule on picking between the two Trust Ladder forms
based on where the audience is in the conversation.

## Investor

Per Module 02's investor variant: open with the mission/problem framing
instead of the Mental Model (section 1 becomes the mission statement, not
the Medium elevator pitch) — Module 02's own guidance is that this audience
needs the category-defining gap established before mechanism. Compress
section 3 to a summary rather than the full nine-step walkthrough (Module
02: "useful as backup detail, not the opening beat" for this audience).
Add the Discipline List scene (`02-story-architecture/
03-narrative-components-library.md`) as an explicit section before the
close — for this audience, per that scene's use case, stating what's *not*
claimed is itself a credibility signal. Route any pricing or traction
question through Module 05's decision tree and Module 07's Investor Data
Room (`07-investor-data-room/04-investor-faq.md`) respectively, rather than
answering informally in the demo.

## Technical / partner

Per Module 02's technical variant: open with Architecture instead of the
Mental Model (this audience finds the simplified version "too abstract").
Expand section 3 with the Architecture Deep-Dive facts
(`lib/content.ts:421-438`) and Security Capabilities
(`lib/content.ts:440-469`) alongside the Decision Walkthrough. This is the
one variant where a features/mechanism-heavy discussion is appropriate,
since it's what the audience is there for — the "no features list" rule in
`01-demo-script.md` is about not leading with features for a general
audience, not a ban on mechanism depth for an audience that wants it.

## Choosing the right variant

Per Module 06's Stage 4 note ("tailored"), the presenter picks the variant
based on who's in the room — using Module 06's contact-form qualification
fields (desk size, asset classes, AI usage, governance method) as the signal
for which variant applies, the same way Module 02's own variants are
anchored to that structural signal.
