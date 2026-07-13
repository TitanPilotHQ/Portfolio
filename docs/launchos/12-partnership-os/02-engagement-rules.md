# Partnership OS — 02. Engagement Rules

## The rule

> No partnership discussions should be represented publicly until formal
> engagement exists.

*(Source: `INTAKE-REQUEST.md` §7.2, Emad's direct answer, 2026-07-12, quoted
verbatim.)*

This is the entire rule as stated in intake §7.2 alone. Intake §7.2 does
not define "formal engagement," does not describe a process for reaching
it, and does not state whether any partnership discussion — formal or
informal — is currently underway. This file does not add the process or
in-progress-status pieces intake §7.2 leaves out. "Formal engagement"
itself is no longer undefined, however — see the next section for Emad's
2026-07-13 decision.

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

## What "formal engagement" means

*(Source: `OWNER-DECISIONS-2026-07-13.md` §2, Emad's direct decision,
quoted verbatim there, including the follow-up clarification that produced
the design-partner boundary paragraph below; carried in `CLOSURE-REPORT.md`
§5a as an owner decision.)*

A formal partnership engagement exists when there is a signed agreement, a
signed pilot, a letter of intent, a paid engagement, a jointly approved
public announcement, or a formally scheduled technical integration with
named owners and dates.

Informal calls, introductions, and exploratory conversations do not count,
regardless of how promising or advanced they feel — the list above is the
line, not a matter of degree.

**A customer-side design-partner agreement or pilot, governed by Module 06
and Module 09, does not by itself constitute a Partnership OS
engagement — including this module's own "signed pilot" item above, which
means a pilot with a broker, market-data provider, cloud infrastructure
provider, AI model provider, compliance technology provider, or systems
integrator (`01-partnership-categories.md`'s six categories), never a
design partner's product-evaluation pilot.** A design-partner arrangement
falls within this module only if the same counterparty also enters a
distinct, signed arrangement in one of those six categories — a separately
identifiable agreement or scope, not the design-partner relationship
itself. One counterparty may hold both roles at once, but only through two
identifiably distinct agreements; this module's silence rule and this
threshold apply to the partnership-side agreement only.

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

A signed agreement or a signed pilot requires a contracting party capable
of signing one. Module 10
(`10-operations-os/03-legal-entity-and-structure.md`) and Module 07
establish that no legal entity is incorporated yet — that fact is cited
here, not restated. As a pure structural consequence of that fact alone
(not from any additional source): the two signed forms of formal engagement
above cannot exist until an entity capable of signing one does. The other
four forms (a written letter of intent, a paid engagement, a jointly
approved public announcement, a formally scheduled technical integration)
are not stated to carry the same dependency, since none necessarily
requires a signing entity — but this file does not otherwise characterize
when or whether any form of formal engagement will be reached.

## What this file deliberately does not invent

- Any statement, in either direction, about whether a partnership
  conversation is currently in progress — intake §7.2 states the
  representation rule, not the underlying status, and this file preserves
  that silence.
- A specific approval process, sign-off chain, or checklist for reaching
  formal engagement, beyond the six forms Emad's decision above names —
  not sourced.
- A restatement of the legal-entity fact's sourcing detail — that lives in
  Module 07/10; this file cites it.

## Maintenance

See `03-governance.md` for review criteria and maintenance triggers.
