# Customer Success OS — 03. Success and Production Readiness

Neither "feedback loop" nor "production readiness review" (Stages 6-7,
`01-design-partner-onboarding.md`) is defined further in the intake answer —
this file makes explicit what those two stages connect to in already-
existing product and evidence facts, rather than inventing new process
detail for them.

## Feedback loop (Stage 6)

The natural content of a design-partner feedback loop, given what shadow
mode actually produces: each signal is recorded "with its dossier, score,
and hash artifacts" (`AUTONOMY_LADDER_DETAIL`, Shadow stage's body field,
`lib/content.ts:353`). A design partner's feedback loop is the
mechanism by which that recorded evidence gets reviewed with them —
comparing what the pipeline produced against their own desk's judgment.

**Canonical glossary — "pilot period" vs. "validation period" (owner
decision, 2026-07-13, `CLOSURE-REPORT.md` §5a):** these two terms are
distinct and not interchangeable, and this is their one canonical
definition for the whole program — other files cite this section rather
than defining either term independently.

- **Pilot period:** the active product-use and workflow-testing window
  during which the design partner uses Titan Pilot in the agreed
  environment.
- **Validation period:** the broader design-partner evaluation window —
  beginning with onboarding and including the pilot period, evidence
  collection, feedback, issue resolution, and the formal closeout review.
  The validation period contains the pilot period; it is not a synonym for
  it.

**Cadence (owner decision, 2026-07-13):** *(Source: Emad's direct decision,
`CLOSURE-REPORT.md` §5a.)*

- Weekly feedback session during onboarding and the pilot period
- Monthly executive review throughout the validation period, where its
  duration warrants it
- Immediate escalation for security, risk, execution, or data-integrity
  issues
- A formal validation closeout review at the end of the validation period

"Successful design-partner validation" (the Hiring OS trigger, Module 13)
is assessed only after the pilot period is complete **and** the validation
closeout review has occurred — completing the pilot period alone is not
sufficient.

## Production readiness review (Stage 7)

**What it is not:** a transition to live execution. Per the Autonomy
Ladder, promotion all the way to Autonomous Demo requires "at least 100
recorded signals, at least 8 weeks of evidence, and objective thresholds on
expectancy, calibration, and veto quality" (`AUTONOMY_LADDER_DETAIL`,
Autonomous Demo stage, `lib/content.ts:360-364` — already the canonical
promotion criteria, not restated as a new fact, only cited) — and "promotion
is always a deliberate, recorded decision — never an automatic transition"
(same source). Note this is the criteria for the *final* rung (Autonomous
Demo), not for Copilot Mode (`lib/content.ts:355-359`, "Designed — next"),
which has no stated numeric threshold in any source. A single design
partner completing onboarding does not, on its own, constitute meeting
either bar.

**What it likely is:** a checkpoint where Titan Pilot and the design partner
jointly assess whether the shadow-mode evidence gathered during Stages 5-6
is sufficiently complete and clean to continue the relationship, expand the
engagement (e.g. more assets, more of the desk's workflow), or (eventually,
evidence permitting) support a future promotion decision under the Autonomy
Ladder's real criteria. This framing is this file's own
inference connecting Stage 7 to the existing promotion-criteria fact — not a
new criterion Emad has stated for Stage 7 specifically.

## Why this distinction matters enough to document explicitly

Without this file, "production readiness review" (this module's own Stage
7, distinct from Module 06's separately-numbered Stage 7, "Onboarding, if
mutually agreed") could easily be (mis)read — by a design partner, a future
hire, or in a stray piece of sales copy — as implying the onboarding flow
itself leads to live trading. It doesn't. Making that explicit here, once,
means any future module that comes to discuss production-readiness review
specifically can cite this file's framing rather than re-deriving it — as of
this module's own construction, no other module (including Module 06 or
Module 08) currently references "production readiness review" by name, so
there is nothing yet actually inheriting this framing; this section
documents the intended reference pattern for when that happens.

## What Titan Pilot commits to at this stage

Nothing beyond what's already established: continued shadow-mode operation,
continued evidence recording, and continued honesty about what stage the
relationship and the product are actually in (Module 01's Company Principle
1, "Evidence over Claims" — not restated, applied here).
