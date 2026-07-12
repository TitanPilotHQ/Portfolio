# Module 01 — Brand Bible — Spec

**Status:** Ready to build (no blocked facts)
**Audience:** Anyone writing or designing anything Titan Pilot will publish — Emad,
future hires, contractors, agencies.
**Purpose:** The single source of truth for who Titan Pilot is, how it sounds, how
it looks, and what it will never say. Every other LaunchOS module (Messaging Bible,
Positioning, Sales OS, Demo Playbooks, Investor Data Room, Asset Library) inherits
its voice and constraints from this module rather than restating them.

## Sources

All content in this module traces to one of:
1. Live site copy and structured data in `titan-site` (cited `file:line` against
   the working tree as of 2026-07-12)
2. `docs/content/PUBLIC_CLAIMS_REGISTER.md`
3. `app/globals.css` (real design tokens — colors, fonts, motion vocabulary)
4. `public/logo.png` and its live usage in `components/Header.tsx`,
   `components/Footer.tsx`

No claim, color, principle, or voice rule in this module is invented. Where the
Brand Bible states a *rule derived from* observed patterns (e.g., "never use
performance-implying verbs"), the rule is traced to the specific existing
statements that establish it.

## Structure

| File | Contents |
|---|---|
| `01-identity.md` | Name, category, mission, elevator pitches at 3 lengths, tagline usage |
| `02-voice-and-tone.md` | Voice pillars, banned language, sentence patterns, before/after examples |
| `03-visual-identity.md` | Color system, typography, logo usage, motion/UI vocabulary |
| `04-principles.md` | The full principle system (manifesto, product, company) + never-claims, unified |
| `05-usage-playbook.md` | Pre-publish checklist, copy templates, claim decision tree |
| `06-governance.md` | Review criteria, maintenance process, ownership, cross-references |

## Out of scope

- Specific campaign messaging or positioning statements for a particular audience
  segment — that's Module 03 (Messaging Bible) and Module 04 (Positioning), which
  build on this module's voice and principles.
- Pricing or commercial language — Module 05 (blocked, pending real pricing facts).
- New visual assets (icon sets, illustration style) beyond what's already live —
  cataloged in Module 16 (Asset Library); this module documents the *system*
  those assets follow, not new asset production.

## Review criteria (applied by the independent and adversarial reviewers)

1. Every factual claim traces to a citation from the sources list above.
2. No banned word or claim pattern from `COMPANY_NEVER_CLAIMS` appears anywhere
   in this module's own copy (the Brand Bible must obey its own rules).
3. No placeholder, no "TBD," no invented example customer/number.
4. Voice rules are falsifiable — a reader could take a piece of draft copy and
   determine pass/fail against this module, not just get a vibe.
5. Internally consistent with the master plan's grounding rule and quality bar.
