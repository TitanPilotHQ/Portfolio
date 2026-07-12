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
- [ ] None of the above apply to this PR

## Test plan

<!-- How you verified this change -->
