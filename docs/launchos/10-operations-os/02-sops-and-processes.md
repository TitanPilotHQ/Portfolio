# Operations OS — 02. SOPs and Processes

## The real state

> Most engineering SOPs already exist. Business operations are intentionally
> being formalized through LaunchOS.

*(Source: `INTAKE-REQUEST.md` §5.3, verbatim.)*

Two separate facts, covered separately below.

## Engineering SOPs: existence confirmed, contents not catalogued

Intake §5.3 confirms engineering SOPs already exist ("most engineering SOPs
already exist"). No source in this program — not intake, not this repo's
own documentation — enumerates what those SOPs specifically are. This file
does not produce that list. Inventing a catalogue of "the engineering
SOPs" (e.g., naming a code-review process, a testing standard, a release
process) with no source describing their actual content would be
fabrication under Global Constraint 1, even though it would likely read as
plausible — this repo does visibly follow a consistent working pattern (see
`README.md:72-78`: spec → plan → subagent-driven-implementation → review,
every change on its own branch through a PR, reviewed against a Vercel
Preview deployment before merging). That pattern is a real, observable
artifact of how this repo is worked on, but observing a pattern in one
repo's `README.md` is not the same as intake §5.3 having enumerated "the
engineering SOPs" as a formal, named set — so this file states only the
narrower, sourced fact: engineering SOPs exist; their specific content and
scope are not catalogued here.

If a future module or a direct statement from Emad enumerates engineering
SOPs formally, that catalogue belongs here, cited to its real source — not
inferred in advance of it existing.

## Business-operations SOPs: LaunchOS itself is the formalization

Intake §5.3's second half is not a statement about a future, unstarted
project. It states that business operations "are intentionally being
formalized through LaunchOS" — present tense, ongoing. LaunchOS (this
16-module documentation program, `docs/launchos/`) is that formalization
mechanism. This file states that directly rather than treating "business
SOPs" as a placeholder for something not yet begun: every module in this
program — Sales OS, Customer Success OS, Investor Data Room, Finance OS,
Partnership OS, Hiring OS, and this module itself — is a business-operations
SOP being written down for the first time, in real time, by this program's
existence.

## Note

This file is itself an example of what it describes: one of the
business-operations SOPs that LaunchOS is formalizing.

## What this file deliberately does not invent

- A named list of specific engineering SOPs (code review process, testing
  standard, incident response, etc.) — no source describes their content.
- A timeline or completion date for "business operations being formalized"
  — intake §5.3 states this as ongoing, not scoped to a deadline.
- A claim that engineering SOPs are written down anywhere in particular
  (a wiki, a runbook, a doc) — intake §5.3 confirms they exist, not where
  or in what form.

## Maintenance

If engineering SOPs are formally catalogued anywhere (a real runbook, a
real engineering handbook), note that here with a citation, and consider
whether that catalogue deserves its own file in this module. If a specific
business-operations SOP outside LaunchOS itself gets written down formally
(e.g., a standalone incident-response doc, a finance close checklist), note
it here as an instance of the formalization this file describes. See
`04-governance.md` for the full maintenance-trigger list.
