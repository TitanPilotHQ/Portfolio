# Sales OS — 01. Sales Process

## The real process, stage by stage

> Website qualified contact form → manual qualification by Emad → discovery
> meeting → product demonstration → technical discussion → design partner
> evaluation → onboarding if mutually agreed.

*(Source: `INTAKE-REQUEST.md` §2.1, Emad's direct answer, 2026-07-12,
verbatim.)*

This is the entire current process — seven stages, fully manual, no
automation beyond the entry point. Do not add stages that don't exist (a
formal proposal stage, a contract-negotiation stage, a legal-review stage)
until Emad states they're real.

### Stage 1: Website qualified contact form

The real, live entry point: `POST /api/contact`, a Zod-validated form with
honeypot spam protection and rate limiting (per this repo's own
`app/api/contact/route.ts` and `CHANGELOG.md`'s W4b entry). The
qualification fields (desk size, asset classes, AI usage, governance method)
are defined in `components/ContactForm.tsx` / `lib/contactSchema.ts` — this
module doesn't restate their exact field list, only notes that they exist
and that they're the mechanism by which "qualified" gets determined at this
stage.

### Stage 2: Manual qualification by Emad

No automation, no CRM (`02-tooling-and-pipeline.md`). Every submitted lead is
reviewed by a human before any response — consistent with Company Principle
2, "Human Accountability" (`01-brand-bible/04-principles.md`), applied here
to the sales process rather than the product's decision pipeline.

### Stage 3: Discovery meeting

The first live conversation. Per intake §2.4, qualified prospects "receive a
discovery call and a tailored product demonstration" — stages 3 and 4 are
described together in that answer; this file keeps them as the two distinct
steps intake §2.1 lists, since a discovery call and a demonstration are
different activities even when scheduled close together.

### Stage 4: Product demonstration

Uses Module 08's Demo Playbook once built (the Decision Walkthrough scene,
`02-story-architecture/03-narrative-components-library.md`, is the
established narrative spine for this) — "tailored" per intake §2.4, meaning
it's adapted to the specific prospect's context, not a fixed script recited
identically every time.

### Stage 5: Technical discussion

For prospects with technical evaluators (Module 04's "Technical / partner"
audience variant, `04-positioning/02-competitive-positioning-map.md`
supplies the comparison material relevant here — e.g., architecture
deep-dive facts, security capabilities).

### Stage 6: Design-partner evaluation

Per intake §2.4: "If there is mutual fit, the discussion progresses toward a
design-partner relationship rather than an immediate commercial sale." This
is the single most important process fact in this module — there is
currently no path from this pipeline directly to a paid commercial
transaction. Every prospect who proceeds becomes a design partner first (see
Module 09, Customer Success OS, for what onboarding a design partner looks
like), not a customer.

### Stage 7: Onboarding, if mutually agreed

Hands off to Module 09's design-partner onboarding flow
(`09-customer-success-os/`, once built) — this module's process ends where
that one begins.

## What doesn't exist yet (do not imply otherwise)

- A commercial closing stage (contract signature, payment) — per intake
  §1.3/§2.4, there is currently no paying customer and no immediate-sale
  path.
- A quota, conversion-rate target, or pipeline-velocity metric — none was
  provided and none should be invented.
- A named sales role other than Emad — company stage (founder-led,
  intentionally small) is canonically defined in Module 01
  (`01-brand-bible/01-identity.md`, "Company stage"); not restated here.
  Future hiring plans, if any, are Module 13's canonical territory (Hiring
  OS), not this module's.
