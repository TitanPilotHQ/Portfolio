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
- [ ] None of the above apply to this PR

## Test plan

<!-- How you verified this change -->
