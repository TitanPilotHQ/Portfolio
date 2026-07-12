# Story Architecture — 04. Governance

## Ownership

Emad, same as Module 01 — see `01-brand-bible/06-governance.md` for the
standing rationale (Company Principle: Human Accountability).

## Review criteria

1. Every structural claim about page/section order or content sequence
   traces to the actual file (`app/page.tsx` or `lib/content.ts`) as it
   exists at review time — not as remembered from a prior version.
2. No new "scene" or "audience variant" is added without a citation to an
   existing structural signal (a form field, page order, a stated use case).
3. Consistent with Module 01's voice pillars and never-claims list.
4. No narrative device implies more finished product than the Autonomy
   Ladder's current stage supports.

## Adversarial review focus

- Does any audience-variant emphasis instruction, if followed literally,
  produce copy that violates a Module 01 rule (e.g., does "expand Milestones
  for investors" risk overstating traction beyond the claims register)?
- Does the "core narrative arc" claim accurately describe `app/page.tsx`'s
  real section order, or has the page changed since this was written?
- Is the "Decision Walkthrough" scene's "do not skip Devil's Advocate/Risk
  Gate" rule actually followed in existing demo materials, or is this
  aspirational?

## Maintenance triggers

- `app/page.tsx`'s section order changes → re-verify `01-core-narrative.md`'s
  numbered list against the new order
- Any `lib/content.ts` array cited here (`WHY_CARDS`, `DECISION_STEPS`,
  `SAFETY_RULES`, `AUTONOMY_LADDER_DETAIL`, `COMPETITOR_COMPARISON`,
  `COMPANY_NEVER_CLAIMS`) changes materially → re-verify the corresponding
  scene in `03-narrative-components-library.md`
- A new product mode is promoted → the Trust Ladder scene and the desk-lead
  audience variant both need review

Same honest-enforcement note as Module 01: this is caught by the
`.github/PULL_REQUEST_TEMPLATE.md` LaunchOS drift checklist, not by
automation. Add a line to that checklist for `app/page.tsx` section-order
changes the next time this module's content actually drifts, so the trigger
becomes visible at PR time rather than only documented here.

## Cross-references

- **Depends on:** Module 01 (Brand Bible) — voice, principles, never-claims
- **Feeds:** Module 03 (Messaging Bible — word-level realization of these
  scenes), Module 04 (Positioning — the Honest Comparison scene is the
  direct input to competitive positioning), Module 08 (Demo Playbooks — the
  Decision Walkthrough scene is the literal demo script spine)

## Closure

Complete once all four files in this directory pass independent and
adversarial review with no open findings, and the PR is merged.
