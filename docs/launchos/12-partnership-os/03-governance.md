# Partnership OS — 03. Governance

## Ownership

Emad — sole owner of Titan Pilot's partnership strategy and of any decision
about when a partnership discussion has crossed into "formal engagement"
and may be represented publicly. Consistent with Company Principle 2,
"Human Accountability" (`01-brand-bible/04-principles.md`), and with the
same ownership pattern as Finance OS (`11-finance-os/03-governance.md`).

## Review criteria

A change to this module passes review only if:

1. Zero named partner organizations appear anywhere in this module, in any
   file, under any framing — including as a hypothetical or illustrative
   example (e.g., "a provider like X"). This is the sharpest criterion in
   this module: naming even one real company, vendor, or brand, in any
   context, would represent a partnership relationship or evaluation that
   is not sourced.
2. Category descriptions in `01-partnership-categories.md` stay general and
   industry-standard — what a broker, market-data provider, cloud
   infrastructure provider, AI model provider, compliance technology
   provider, or systems integrator is and does in the industry — and never
   drift into a Titan-Pilot-specific claim of an existing integration,
   evaluation, or technical plan with any category.
3. `02-engagement-rules.md`'s statement of the engagement rule never implies,
   in either direction, whether an exploratory partnership conversation is
   currently happening. The rule requires silence on that status; a
   sentence that leans toward "nothing is happening" is as much a violation
   as one that leans toward "something is happening."
4. Intake §7.1 and §7.2 facts are quoted verbatim with a `*(Source: ...)*`
   citation, not paraphrased into a stronger or weaker claim than stated.
5. Category and legal-entity facts owned by other modules (Module 04's
   competitive map, Module 06's ICP, Module 07/10's legal-entity status) are
   cited from their canonical files, never independently restated with
   their own sourcing detail (Global Constraint 4).

## Adversarial review focus

- Does any category description in `01-partnership-categories.md` sneak in
  an implied claim of an existing integration or technical capability —
  for example, describing the AI model provider category in a way that
  reads as "the models Titan Pilot uses" rather than "the models a product
  like this could draw on in general"?
- Does `02-engagement-rules.md`'s six-item "formal engagement" list still
  match Emad's 2026-07-13 decision exactly (`CLOSURE-REPORT.md` §5a) — no
  added form, no dropped form, no reworded threshold presented as
  equivalent when it isn't?
- Does `02-engagement-rules.md`'s design-partner/partnership boundary stay
  clean — no sentence that reads as if a Module 06/09 design-partner
  agreement, on its own, satisfies this module's formal-engagement
  threshold?
- Does anything in this module — a sentence structure, a hedge, an
  omission — imply whether or not exploratory partnership conversations are
  currently happening? The rule requires this module to stay silent on that
  status either way; both a confirming and a denying implication are
  findings.
- Does `01-partnership-categories.md`'s note on Module 04's competitive map
  cross the line from "these are different claims, don't conflate them"
  into naming which named competitor sits near which category? The note
  should stay at the level of "category adjacency exists conceptually"
  without naming the competitor that creates the adjacency.

## Honest note on enforcement

Same pattern as Modules 01, 09, 10, and 11: no CI/lint check enforces
anything in this module. The one real, concrete mechanism is
`.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" — a checklist
surfaced at PR-creation time, not a gate. It can be skipped, and for a
solo-founder company, review and maintenance ultimately depend on Emad (or
whoever is reviewing a given PR) actually reading it. A Partnership OS-
specific row was added to the template in this same change. The highest
risk in this module specifically is not a fabricated number (Finance OS's
risk) but someone naming a real partner prematurely in future sales or
investor copy — a single sentence in a pitch deck or a sales call that
names a partner before formal engagement exists would violate intake §7.2
directly, and no automated check in this repo would catch it, since sales
and investor copy do not necessarily live in this repo at all — the
checklist is a prompt for the person shipping that copy, not an enforcement
mechanism over it.

## Maintenance triggers

- Formal engagement is reached with any partner → this is the trigger to
  add a real, named fact to this module for the first time. When it
  happens, the new fact must be sourced to the actual agreement,
  announcement, or other event that constitutes formal engagement — not
  added preemptively, and not added on the strength of an internal
  conversation alone.
- A new partnership category becomes relevant → update
  `01-partnership-categories.md` with the new category, described at the
  same general, industry-standard level as the existing six, sourced to
  whatever statement from Emad establishes it as a target category.
- The legal entity gets incorporated → note the change in
  `02-engagement-rules.md`'s contracting-dependency section, since that
  section's premise (no contracting party exists yet) resolves at that
  point. Coordinate with Module 10 (`03-legal-entity-and-structure.md`) and
  Module 07 (`01-company-snapshot.md`), which own the underlying
  incorporation fact and its Phase A/B flip.

## Cross-references

- **Depends on:** Module 01 (`06-governance.md` — governance-file pattern),
  Module 04 (`02-competitive-positioning-map.md` — the 8 named competitors
  this module deliberately does not cross-reference as partner candidates),
  Module 06 (`00-icp.md` — cited, not restated, where a category's rationale
  touches the target customer), Module 07 (`01-company-snapshot.md`) and
  Module 10 (`03-legal-entity-and-structure.md`, `04-governance.md` — the
  no-legal-entity fact and the Phase A/B pattern this module's contracting
  note follows), Module 11 (`03-governance.md` — the governance-file pattern
  this file follows most directly)
- **Feeds:** none yet. No other built module currently cites Partnership
  OS's facts. Module 07 (Investor Data Room) or Module 08 (Demo Playbooks)
  would be the most likely future citers if a formal engagement is ever
  reached and becomes investor- or demo-relevant material — neither cites
  this module today.

## Closure

Complete once all three files in this directory pass independent and
adversarial review with no open findings, and the PR is merged.
