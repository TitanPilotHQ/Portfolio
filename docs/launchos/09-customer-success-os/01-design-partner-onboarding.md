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

Distinct from Module 06's Stage 3 discovery meeting (pre-sale, evaluating
fit) — the working assumption here (an inference from the flow's position
after Module 06's Stage 7 handoff, not a sourced fact) is that this is a
design-partner-specific discovery session establishing implementation-level
context now that the relationship has moved past evaluation. This module
doesn't blur the two; if Emad intends them to be the same conversation,
that's a fact to confirm, not to assume.

### Stage 2: Infrastructure review

What the design partner's own trading infrastructure looks like today — the
technical context Titan Pilot needs before proposing a deployment plan
(Stage 4). No specific review checklist exists yet in any source; this file
doesn't invent one.

### Stage 3: Objectives

What the design partner wants to learn or validate from the engagement.
Given intake §4.1's framing (this evolves toward customer success, not
straight to commercial), objectives here are likely validation-oriented
(does the product work for their desk) rather than ROI-oriented (a
commercial customer's objectives) — an inference from context, not a
sourced fact, so treated as a working assumption only.

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
