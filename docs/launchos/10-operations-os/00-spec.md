# Module 10 — Operations OS — Spec

**Status:** Ready to build
**Depends on:** Module 01 (principles, governance pattern), Module 06 (sales
tooling — this module owns the general infrastructure fact, Module 06 owns
what a subset of it means for sales specifically), Module 07 (legal-entity
Phase A/B framing — this module cites, does not re-derive, the incorporation
fact)
**Purpose:** The canonical home for what Titan Pilot actually runs on today
— tool stack, infrastructure, and the SOP-formalization reality — plus the
Phase A/B structure for legal entity and business operations per Global
Constraint 3.

## Sources

Grounded in `INTAKE-REQUEST.md` §5 (Emad's direct answers, 2026-07-12).

## Global Constraint 3 application

Intake §5.1 states no legal entity has been incorporated yet. This module's
`03-legal-entity-and-structure.md` file must separate:
- **Phase A (today):** founder-led, no incorporated entity, operations run
  informally under Emad directly.
- **Phase B (future):** the operating structure once incorporated — framed
  conditionally, no date, no invented entity name/jurisdiction/structure
  (none is sourced — Module 07's cap-table file already establishes this
  same absence; this file does not re-derive it, only cites it).

## Global Constraint 4 application

- The tool stack (GitHub, Claude Code, ChatGPT, Vercel, Upstash, Resend,
  Hostinger, GitHub Actions, self-managed VPS) is canonically owned here.
  Module 06 already cites this module rather than restating the list —
  verify that citation still holds, don't re-litigate it.
- Legal-entity/incorporation status is canonically owned by Module 07
  (`01-company-snapshot.md`) since it was established there first. This
  module cites that fact rather than redefining it.
- SOP/process facts (engineering SOPs already exist, business ops being
  formalized through LaunchOS) are new to this module — no other module
  has stated this yet, so this module is the canonical owner.

## Structure

| File | Contents |
|---|---|
| `01-tool-stack.md` | The real current tool/vendor stack, what each is used for, ownership boundary with Module 06 |
| `02-sops-and-processes.md` | What SOPs exist today (engineering) vs. what's being formalized (business, via LaunchOS itself) |
| `03-legal-entity-and-structure.md` | Phase A/B structure, citing Module 07 for the underlying incorporation fact rather than restating it |
| `04-governance.md` | Review criteria, maintenance triggers, cross-references, honest enforcement note |
