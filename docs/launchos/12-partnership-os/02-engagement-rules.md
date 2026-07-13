# Partnership OS — 02. Engagement Rules

## The rule

> No partnership discussions should be represented publicly until formal
> engagement exists.

*(Source: `INTAKE-REQUEST.md` §7.2, Emad's direct answer, 2026-07-12, quoted
verbatim.)*

This is the entire rule as stated. Intake §7.2 does not define "formal
engagement," does not describe a process for reaching it, and does not
state whether any partnership discussion — formal or informal — is
currently underway. This file does not add any of those missing pieces.

**Scope note:** "partnership," in this module, means a vendor or
infrastructure-side relationship (a broker, market-data provider, cloud
infrastructure provider, AI model provider, compliance technology provider,
or systems integrator — the six categories in `01-partnership-categories.md`).
It is a distinct concept from two other real, unrelated terms that also
contain the word "partner":

- **"Design partner"** — the term itself is already public site copy
  (`lib/content.ts:510`, `lib/content.ts:572`), but the detailed process
  Module 06 (`06-sales-os/01-sales-process.md`, Stage 6) and Module 09
  (`09-customer-success-os/01-design-partner-onboarding.md`) document
  around it is internal planning input, not itself publicly disclosed
  (Global Constraint 1/3). It is also, per Module 06's own emphatic
  framing (`01-sales-process.md`, "the single most important process
  fact in this module"), explicitly **not a customer** — this file does
  not call it "customer-side" for that reason.
- **"Technology partner"** — also already public site copy
  (`lib/content.ts:572`, rendered at `app/contact/page.tsx:46`, and cited
  in `02-story-architecture/02-audience-variants.md`). It is generic
  audience-qualification language with no named party attached, so it
  doesn't itself trigger intake §7.2's naming rule — but it is a
  different concept from this module's six vendor/infrastructure
  categories and is not governed by this file's silence rule either.

This module's silence rule governs vendor/infrastructure partnerships
only; it does not restrict or apply to either "design partner" or
"technology partner" language.

## What "formal engagement" plausibly means

No source in this program defines "formal engagement" precisely. Rather
than invent a specific legal threshold Emad hasn't stated, this file states
only the plain-language boundary the phrase implies: "formal" contrasts
with informal, exploratory, or preliminary contact. Examples of what would
plausibly cross that line, at a structural level rather than a
Titan-Pilot-specific one — a signed agreement, a confirmed pilot, or a
public joint announcement — are the general shapes "formal" takes in
industry practice. This file does not claim any of these three specific
forms is the one Titan Pilot requires, does not rank them, and does not
claim the list is exhaustive. It hedges deliberately: the rule's practical
boundary is knowable (informal talk doesn't count; a public/binding
commitment does), but the precise threshold between them is not sourced,
and this file does not manufacture one.

## Practical implications

- No partner name may appear in any public-facing copy — the site, a pitch
  deck, investor material, or a sales conversation — unless formal
  engagement, as bounded above, exists for that specific partner.
- The rule applies regardless of audience. "Investor material" and "sales
  conversation" are not lower-bar exceptions to "publicly" — intake §7.2
  draws no line between external public copy and internal-but-persuasive
  copy shown to investors or prospects, so this file treats both as
  covered.

This file takes no position, in either direction, on whether any
partnership conversation is presently underway — intake §7.2 states the
representation rule, not the underlying status, and stating a status in
either direction would itself violate the rule this file exists to
describe.

## The contracting dependency

A formal, signed partnership agreement requires a contracting party capable
of signing one. Module 10 (`10-operations-os/03-legal-entity-and-structure.md`)
and Module 07 establish that no legal entity is incorporated yet — that
fact is cited here, not restated. As a pure structural consequence of that
fact alone (not from any additional source): the signed-agreement form of
formal engagement cannot exist until an entity capable of signing one does.
The other examples of formal engagement above (a confirmed pilot, a public
joint announcement) are not stated to carry the same dependency, since
neither necessarily requires a signed contract — but this file does not
otherwise characterize when or whether any form of formal engagement will
be reached.

## What this file deliberately does not invent

- A precise legal or procedural definition of "formal engagement" — not
  sourced anywhere in this program.
- Any statement, in either direction, about whether a partnership
  conversation is currently in progress — intake §7.2 states the
  representation rule, not the underlying status, and this file preserves
  that silence.
- A specific approval process, sign-off chain, or checklist for reaching
  formal engagement — not sourced.
- A restatement of the legal-entity fact's sourcing detail — that lives in
  Module 07/10; this file cites it.

## Maintenance

See `03-governance.md` for review criteria and maintenance triggers.
