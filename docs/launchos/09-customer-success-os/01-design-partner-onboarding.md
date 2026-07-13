# Customer Success OS — 01. Design-Partner Onboarding

## The real flow

> Discovery session → infrastructure review → objectives → deployment
> planning → shadow-mode onboarding → feedback loop → production readiness
> review.

*(Source: `INTAKE-REQUEST.md` §4.2, Emad's direct answer, 2026-07-12,
verbatim.)* Seven stages, picking up exactly where Module 06's Stage 7
(`06-sales-os/01-sales-process.md`) hands off — this file doesn't restate
Stage 7, it's the detailed expansion of it.

### Stage 1: Discovery session

**Confirmed distinct from Module 06's sales process (owner decision,
`OWNER-DECISIONS-2026-07-13.md` §9, including its Stage 6/7 follow-up
clarification; carried in `CLOSURE-REPORT.md` §5a):** Module 06's Stage 3
is the first
live conversation only, for prospects already qualified at Module 06's
Stage 2 — a discovery call and demo, not a decision point
(`06-sales-os/01-sales-process.md`). The mutual-fit
decision to proceed happens at Module 06's Stage 6 ("Design-partner
evaluation"), and Module 06's own process ends at its Stage 7 ("Onboarding,
if mutually agreed") — exactly where this file's intro above says this
module picks up. This Stage 1 does **not** begin at Module 06's Stage 3; it
begins only after Module 06's sales process concludes and the engagement is
formally accepted, establishing implementation-level context now that the
relationship has moved past evaluation. Sales ends when the engagement is
formally accepted; Customer Success begins when onboarding starts.

### Stage 2: Infrastructure review

What the design partner's own trading infrastructure looks like today — the
technical context Titan Pilot needs before proposing a deployment plan
(Stage 4). No specific review checklist exists yet in any source; this file
doesn't invent one.

### Stage 3: Objectives

**Confirmed validation-oriented, not ROI-oriented (owner decision,
`OWNER-DECISIONS-2026-07-13.md` §9; carried in `CLOSURE-REPORT.md` §5a):**
during the design-partner phase,
the primary objectives are:

- Workflow fit
- Usability
- Governance value
- Trust
- Operational reliability
- Safety
- Adoption
- Measurable reduction in ungoverned AI decision-making

ROI or trading-performance targets are explicitly not the primary
validation metric during this phase. ROI-oriented objectives may be
introduced later for paying enterprise customers, once evidence exists —
this file does not set a date or condition for that shift beyond "paying
enterprise customer."

### Stage 4: Deployment planning

How the design partner's environment gets connected to Titan Pilot's shadow-
mode pipeline. Ties to the product's real staged-autonomy structure (Module
02's Trust Ladder scene) — deployment planning at this stage is for shadow
mode only, never execution. Unlike Stages 1 and 3 above, this isn't a
separate inference: it follows directly from the cited fact that Shadow is
the only "current" Autonomy Ladder stage (`AUTONOMY_LADDER_DETAIL`,
`lib/content.ts:349-365`: "Shadow — Certified — current").

### Stage 5: Shadow-mode onboarding

The design partner's data starts flowing through the certified shadow-mode
pipeline. This is the same shadow mode described throughout Modules 01-02 —
not restated here — applied to a specific design partner's context for the
first time.

### Stage 6: Feedback loop

Ongoing, not a single event — see `03-success-and-production-readiness.md`
for what this actually consists of.

### Stage 7: Production readiness review

Not a transition to live trading — per the Autonomy Ladder, only Copilot
Mode ("Designed — next") or Autonomous Demo ("Evidence-gated — future")
would involve any execution, and neither is built yet. "Production
readiness" here means readiness of the shadow-mode evidence, not readiness
for execution — see `03-success-and-production-readiness.md` for the
distinction, which this module treats as important enough not to leave
implicit.

## What this flow explicitly is not

A path to immediate commercial deployment or live trading. Every design
partner who completes all seven stages is still in shadow mode at the end —
per Module 06's Stage 6/7 framing and the product's actual current Autonomy
Ladder stage, not a limitation specific to onboarding.
