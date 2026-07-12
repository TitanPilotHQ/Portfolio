# Sales OS — 04. Governance

## Ownership

Emad — the sole person currently executing this process
(`01-sales-process.md`), and the sole approver of any change to it.

## Review criteria

1. The process described matches reality, not an aspirational future
   process — no invented stage, tool, or metric.
2. ICP content lives only in `00-icp.md`; every other file in this module
   references it rather than restating it (Global Constraint 4 — this
   module is the ICP's canonical owner, so this rule guards against this
   module contradicting *itself* across files, not just other modules
   duplicating it).
3. `03-sales-enablement.md`'s content map points to real, correct locations
   in other modules — not to content that doesn't exist yet.
4. No pricing content is stated directly in this module — every mention
   routes through Module 05's decision tree.

## Adversarial review focus

- Does `01-sales-process.md` quietly add a stage, a metric, or a tool not in
  intake §2?
- Does `03-sales-enablement.md`'s "what happens when a prospect asks
  something not covered" section actually prevent improvisation, or does it
  leave a gap a real conversation could fall through (the same class of gap
  found in Module 05's pricing decision tree)?
- Does anything in this module state or imply a commercial closing stage
  exists, given intake §2.4's explicit statement that prospects go to
  design-partner status, not a sale?

## Honest note on enforcement

Same caveat as Modules 01 and 05: no CI/lint check enforces any of this.
The `.github/PULL_REQUEST_TEMPLATE.md` drift checklist doesn't have a
sales-process-specific line yet (it does have pricing and claims-register
lines) — add one the next time this module's content actually needs to
change, rather than pre-adding a checklist item for a change that hasn't
happened. In the meantime, this is Emad's own process he executes daily, so
drift here is more likely to be caught by living it than by any checklist.

## Maintenance triggers

- The real sales process changes (a new stage, a new tool, a first
  commercial closing path) → update `01-sales-process.md` and
  `02-tooling-and-pipeline.md` in the same change
- A CRM or pipeline tool is adopted → update `02-tooling-and-pipeline.md`,
  check Module 10 for overlap
- Any module `03-sales-enablement.md` points to changes its file structure
  → re-verify the content map's paths still resolve

## Cross-references

- **Depends on:** Modules 01, 03, 04, 05
- **Feeds:** Module 08 (Demo Playbooks — Stage 4 hands off to it), Module 09
  (Customer Success OS — Stage 7 hands off to it), Module 07 (Investor Data
  Room — sales process and pipeline reality are real investor questions)

## Closure

Complete once all files in this directory (including the earlier `00-icp.md`
seed) pass independent and adversarial review with no open findings, and the
PR is merged.
