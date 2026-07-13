## Summary

<!-- What changed and why -->

## LaunchOS drift check

If this PR touches any of the following, update the linked LaunchOS module in
the **same PR** — do not defer it:

- [ ] `docs/content/PUBLIC_CLAIMS_REGISTER.md` changed → check
      `docs/launchos/01-brand-bible/` (banned-language table, "certified"
      qualifier, any status word) for now-stale claims
- [ ] `app/globals.css`'s `@theme` block or `public/logo.png` changed → update
      `docs/launchos/01-brand-bible/03-visual-identity.md`
- [ ] Company stage changed (first paying customer, first raised round, first
      hire, first confirmed design partner) → update
      `docs/launchos/01-brand-bible/01-identity.md` and flag Modules 07/13 for
      unblocking
- [ ] A product mode's status changed (e.g. Copilot Mode promoted) → update
      any status table in `docs/launchos/`
- [ ] A real price point, pricing-model clearance, or contract-term
      clearance from Emad → update
      `docs/launchos/05-pricing-system/02-pricing-model-structure.md` and
      `03-pricing-decision-tree.md` in the same PR, and confirm no other
      module (Messaging Bible, Sales OS, Investor Data Room, Finance OS)
      independently restates the new figure instead of citing Module 05
- [ ] A real financial figure, cost disclosure, revenue event, or
      accounting-platform decision from Emad → update
      `docs/launchos/11-finance-os/01-financial-reality.md` and
      `02-accounting-and-reporting.md` in the same PR — this module has the
      highest fabrication risk in LaunchOS (no dollar figures, percentages,
      or burn/runway estimates permitted without a direct source)
- [ ] Any real partner name, partnership discussion, or engagement status is
      about to appear in site copy, sales material, or investor material →
      confirm formal engagement actually exists (per
      `docs/launchos/12-partnership-os/02-engagement-rules.md`) before it
      ships anywhere, and update
      `docs/launchos/12-partnership-os/01-partnership-categories.md` in the
      same PR with the sourced fact
- [ ] Any real hire, compensation figure, equity grant, or hiring-process
      decision from Emad → update
      `docs/launchos/13-hiring-os/01-current-state.md` and
      `02-anticipated-hiring.md` in the same PR
- [ ] `COMPETITOR_COMPARISON` (`lib/content.ts`) changed → check
      `docs/launchos/04-positioning/02-competitive-positioning-map.md`
      first (it's the primary owner of the named-competitor analysis),
      then check whether
      `docs/launchos/14-competition-intelligence/01-monitoring-scope.md`
      needs updating; a new competitor becomes tracked in a new
      monitoring category → update
      `docs/launchos/14-competition-intelligence/01-monitoring-scope.md`
      in the same PR
- [ ] Any `RESEARCH_*` constant in `lib/content.ts` changed — especially a
      pipeline item's status advancing past "Planned" — update
      `docs/launchos/15-market-research-framework/01-research-doctrine.md`
      in the same PR; and if real market-sizing data (TAM, SAM, SOM,
      industry-growth, competitor market share) becomes available from a
      real, checkable source, update
      `docs/launchos/15-market-research-framework/02-market-research-scope.md`
      with the sourced figure — never before
- [ ] Any LaunchOS module's file structure changed — a file added,
      renamed, or removed in any `docs/launchos/*/` directory → update
      `docs/launchos/16-asset-library/01-launchos-catalog.md` in the same
      PR
- [ ] None of the above apply to this PR

## Test plan

<!-- How you verified this change -->
