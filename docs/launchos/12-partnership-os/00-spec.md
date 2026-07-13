# Module 12 — Partnership OS — Spec

**Status:** Ready to build
**Depends on:** Module 04 (positioning/category — this module cites, does
not restate, competitive/category framing where a partnership category
adjoins it), Module 06 (ICP — this module cites Module 06's ICP where a
partnership category's rationale touches the target customer)
**Purpose:** The canonical home for Titan Pilot's real target partnership
categories and the explicit rule against representing any partnership
publicly before formal engagement exists.

## Sources

Grounded in `INTAKE-REQUEST.md` §7 (Emad's direct answers, 2026-07-12).

## Global Constraint 1 application

Intake §7.2 is explicit and unusually strict: "No partnership discussions
should be represented publicly until formal engagement exists." This module
must not name, imply, or hint at any real or hypothetical partner
organization (no invented company names, no "in discussions with a leading
broker"-style vague-but-suggestive phrasing). It documents categories
(broker, market-data provider, etc.) as abstract types, never instances.

**Scope note:** "Partnership" here means vendor/infrastructure-side
relationships only (the six categories above). It is distinct from
"design partner," the customer-side relationship Module 06/09 already
document and disclose publicly under their own framing — this module's
silence rule does not govern design-partner language.

## Global Constraint 3 application

No legal-entity or contracting dimension requiring Phase A/B split is
present in intake §7 itself — partnership *categories* are not inherently
tied to incorporation status. However, formal partnership agreements
(contracts) are a contracting matter, so this module notes plainly that no
partner contract can exist before a legal entity exists to sign one, citing
Module 10's Phase A/B legal-entity structure rather than restating it.

## Global Constraint 4 application

- Partnership categories (brokers, market-data providers, cloud
  infrastructure providers, AI model providers, compliance technology
  providers, enterprise systems integrators) are new to this module — no
  other module has stated them, so this module is the canonical owner.
- Where a category's rationale touches positioning/category facts (Module
  04) or the ICP (Module 06), cite rather than restate.
- Legal-entity status (needed to explain why no partnership contract exists
  yet) is cited from Module 10/07, not restated.

## Structure

| File | Contents |
|---|---|
| `01-partnership-categories.md` | The 6 real target categories, what each is and why it's relevant, with zero named partners |
| `02-engagement-rules.md` | The public-representation rule from intake §7.2, what "formal engagement" means, and the contracting/legal-entity dependency |
| `03-governance.md` | Review criteria, maintenance triggers, cross-references, honest enforcement note |
