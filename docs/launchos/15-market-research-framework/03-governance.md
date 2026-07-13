# Market Research Framework — 03. Governance

## Ownership

Emad — sole owner of Titan Pilot's research-publication doctrine and of the
decision to add any external market-sizing research to this module. Same
ownership pattern as Finance OS (`11-finance-os/03-governance.md`),
Partnership OS (`12-partnership-os/03-governance.md`), Hiring OS
(`13-hiring-os/03-governance.md`), and Competition Intelligence
(`14-competition-intelligence/03-governance.md`).

## Review criteria

A change to this module passes review only if:

1. **Zero market-size figures of any kind.** No TAM, SAM, SOM, industry
   revenue estimate, growth rate, or market-share percentage — as a
   specific number, a rough estimate, a range, or a "commonly cited"
   third-party figure — appears anywhere in `02-market-research-scope.md`
   or any other file in this module. This is the sharpest review criterion
   in this module, per the master plan's Quality bar and Global
   Constraint 1.
2. **The pipeline's "all Planned" status is never softened.** Every one of
   the ten items in `01-research-doctrine.md`'s pipeline table carries
   status "Planned" as of the current `lib/content.ts`. No wording anywhere
   in this module implies any item is further along (e.g., "in progress,"
   "underway," "coming soon" applied to a specific publication) unless
   `lib/content.ts:534-545` itself has actually changed to a later status
   for that item.
3. **`RESEARCH_CLAIMS_NOTE`'s forward-looking framing is never conflated
   with a claim that current site claims already have published research
   behind them.** `RESEARCH_CLAIMS_NOTE` says claims "will eventually map"
   to evidence — future tense. Given all ten pipeline items are "Planned,"
   no current site claim is backed by a publication from this pipeline
   today. The claims register (`docs/content/PUBLIC_CLAIMS_REGISTER.md`)
   is the current mechanism that grounds public claims; this module's
   doctrine does not substitute for it, supersede it, or imply it's
   unnecessary.
4. Every fact traces to `lib/content.ts:517-563` or another module's
   canonical file, cited rather than restated (Global Constraint 4).

## Adversarial review focus

- Does anything in `01-research-doctrine.md` imply any of the ten pipeline
  items is further along than "Planned" — through wording, ordering,
  emphasis, or an added detail not present in `lib/content.ts:534-545`?
- Does `02-market-research-scope.md`, while disclaiming a market-size
  figure, accidentally gesture toward one anyway — through a comparison to
  an adjacent market, an implied scale ("a large and growing market"), or
  a citation to an unnamed third-party estimate?
- Does this module overstate how mature Titan Pilot's research program is
  for what it actually is: a pre-revenue, founder-led company with zero
  published research artifacts and ten pipeline items all at "Planned"?
- Does `RESEARCH_STATUS`'s "prefer publishing later with evidence" framing
  get presented as this module's own editorial position rather than
  sourced language from `lib/content.ts:561-563`?

## Honest note on enforcement

Same pattern as Modules 01, 09, 10, 11, 12, 13, and 14: no CI/lint check
enforces anything in this module. The one real, concrete mechanism is
`.github/PULL_REQUEST_TEMPLATE.md`'s "LaunchOS drift check" — a checklist
surfaced at PR-creation time, not a gate. It can be skipped, and for a
solo-founder company, review and maintenance ultimately depend on Emad (or
whoever is reviewing a given PR) actually reading it. A Market Research
Framework-specific row was added to the template in this same change
(mirroring Modules 11, 12, 13, and 14's precedent), triggering on: any
`RESEARCH_*` constant in `lib/content.ts` changing — especially a pipeline
item's status advancing past "Planned" — requiring `01-research-doctrine.md`
to update in the same PR; and any real market-sizing data becoming
available from a real, checkable source, requiring
`02-market-research-scope.md` to be filled in with the sourced figure,
never before.

## Maintenance triggers

- A pipeline item's status changes in `lib/content.ts:534-545` (e.g.,
  "Whitepapers" moves from "Planned" to "In Preparation") → update
  `01-research-doctrine.md`'s pipeline table in the same change as the
  site change, not after.
- A real market-research figure (TAM, SAM, SOM, industry-growth data,
  competitor market share) becomes available from a real, checkable
  source → fill in `02-market-research-scope.md` for the first time then,
  with the sourced figure and its source cited — never before, and never
  as a placeholder in the meantime.
- `RESEARCH_CLAIMS_NOTE` changes, or the claims-register process
  (`docs/content/PUBLIC_CLAIMS_REGISTER.md`) changes materially → re-verify
  this module's framing of the relationship between the two (review
  criterion 3 above) — a change to either side could make the current
  framing stale even if this module's own files don't change.

## Cross-references

- **Depends on:** none. This is the first module to touch this subject
  (master plan Global Constraint 4: "Research claims → the Research
  repository / Market Research Framework (Module 15) only").
  `lib/content.ts:517-563` is the underlying source for
  `01-research-doctrine.md`, cited directly since no other module owns
  this content. `04-positioning/` and `07-investor-data-room/` are cited
  in `02-market-research-scope.md` for their existing market-size
  avoidance, not restated. `docs/content/PUBLIC_CLAIMS_REGISTER.md` is
  cited in `01-research-doctrine.md` as the current claims-grounding
  mechanism, not restated.
- **Feeds:** any future module needing to cite Titan Pilot's research
  doctrine or any future market-sizing fact should cite this module rather
  than independently describing `RESEARCH_*` content or re-deriving a
  market-size claim. Module 07 (`02-traction-and-evidence.md`,
  `04-investor-faq.md`) already anticipates citing this module once
  market-sizing methodology exists here.

## Closure

Complete once all three files in this directory pass independent and
adversarial review with no open findings, and the PR is merged.
