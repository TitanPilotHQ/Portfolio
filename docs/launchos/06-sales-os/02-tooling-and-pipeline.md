# Sales OS — 02. Tooling and Pipeline Tracking

## What's actually in use today

> No CRM is currently in use. Pipeline management is manual during the
> design-partner phase.

*(Source: `INTAKE-REQUEST.md` §2.3, verbatim.)*

That's the complete tooling picture for sales specifically. For the
company's broader tool stack (GitHub, Vercel, Upstash, Resend, etc.), see
Module 10 (Operations OS) — this file doesn't restate that list, since sales
tooling and general operational tooling are different facts even though they
currently overlap (the contact-form backend, built on Resend/Upstash, is
technically part of both; Module 10 owns the infrastructure fact, this file
owns what it means for sales specifically: leads land in email and an
Upstash Redis key-value store (`lib/server/leadStore.ts`), not a
pipeline-tracking product).

## What "manual" means in practice

Every lead that reaches Stage 2 (`01-sales-process.md`) is tracked by Emad
directly rather than through a CRM's pipeline view, stage-conversion
reporting, or automated follow-up sequencing. There is no automated
lead-scoring beyond the honeypot/rate-limit/validation logic already built
into the contact form itself (a spam-filtering mechanism, not a
sales-qualification one).

## What this means for LaunchOS

Any future module or process that assumes CRM-derived data (e.g., "average
time in each pipeline stage," "conversion rate from discovery to
design-partner") cannot be built yet — that data doesn't exist because
nothing captures it systematically. This is a known, disclosed limitation,
not a gap to quietly fill with a plausible-sounding estimate.

## No stated plan to change this

Intake §2.3 describes today's state ("during the design-partner phase") but
does not state a plan, timeline, or trigger for adopting a CRM. Per Global
Constraint 1, this file does not infer or invent one — it would be a
reasonable guess that a CRM gets adopted once deal volume exceeds what's
manually trackable, but that's speculation, not a sourced fact, so it stays
out of this module until Emad states it.

## Maintenance

If Emad adopts a CRM or any pipeline-tracking tool, this file updates in the
same change as the tool's adoption, and Module 10 (Operations OS) is checked
for whether the tool also belongs in its general tool-stack list.
