# W1 — Messaging, Metadata, Homepage Rewrite

**Status:** approved for implementation
**Owner:** Emad
**Repo:** TitanPilotHQ/Portfolio (this repo)
**Related program:** TITANPILOT.APP investor-grade positioning revision (W0–W5)
**Depends on:** W0 (`docs/audits/2026-07-titanpilot-website-audit.md`,
`docs/content/PUBLIC_CLAIMS_REGISTER.md`)

## Context

W0's audit routed a specific set of "Positioning and copy" findings to W1:
stale in-validation copy (Phase C.5 is now certified), autonomy-led
framing that contradicts the new "Supervised AI Trading" category, generic
CTA copy, and two live-audit defects (footer contrast, dead LinkedIn link).
This slice fixes exactly those findings, rewrites the hero per the parent
program brief's exact recommended copy, and banks one evidence-forward win
using data that already exists and is already sourced in
`PUBLIC_CLAIMS_REGISTER.md` — without restructuring the homepage's existing
section order, which stays out of scope until routes it would naturally
link to (`/evidence`, `/architecture`, `/security`) exist in W2/W3.

Three scope decisions were made explicitly with Emad before writing this
spec:
1. The brief's "real caught-fabrication example" and "real Devil's
   Advocate veto example" narrative sections describe capabilities using
   already-sourced evidence, with no fabricated specific story — the
   specific real example is deferred to `/evidence` in W2, where the
   fixture selection actually happens.
2. Hero CTAs point at existing homepage anchors (`#evidence`, `#contact`)
   rather than routes that don't exist yet (`/evidence`, a qualified
   contact form) — copy changes now, destinations get retargeted when W2/W4
   ship those routes.
3. `components/DashboardMockup.tsx` (including its "HIGH CONVICTION
   THESIS" banned-language string) is left untouched — it's fully replaced
   in W2 by the real Evidence Explorer, and editing it now risks wasted
   work.

## Scope

In scope — all in this repo, no new routes:
1. `components/Hero.tsx` — eyebrow, headline, supporting copy, CTAs,
   qualification line, trust-badges `aria-label`.
2. `lib/content.ts` — five stale "in validation" strings
   (`ENTITY_STATEMENTS[3]`, `EVIDENCE_ROWS` shadow row, `PRODUCT_MODES[0]`,
   `ROADMAP` shadow-mode status, `FAQ_ITEMS[3]`), plus three `MILESTONES`
   tile revisions.
3. `components/RoadmapTimeline.tsx:51` — heading text.
4. `app/layout.tsx` — title, description, OG description, Twitter
   title/description, two flagged keyword phrases.
5. `app/manifesto/page.tsx:10` — metadata description.
6. `components/Footer.tsx` — disclaimer text contrast, copyright-line and
   tagline-line contrast (self-discovered, same root cause), LinkedIn link
   removal (including now-unused `Linkedin` icon import).

Explicitly out of scope for W1:
- Any new route (`/product`, `/evidence`, `/security`, `/architecture`,
  `/spec`, `/research`, `/company`, `/contact` rewrite) — W2–W4.
- Restructuring, reordering, or replacing any existing homepage section
  beyond the specific flagged strings and the `MILESTONES` tile data.
- `components/DashboardMockup.tsx` — W2.
- `components/EarlyAccessForm.tsx` — W4.
- `components/NAV_ITEMS` — W3, once dedicated routes exist to link to.
- Full keyword/AEO strategy rebuild — W5.
- Security headers, CSP, dependency upgrades, test infra — W5.

## Exact copy changes

### `components/Hero.tsx`

- Eyebrow pill text: `"AI Reasons. Software Decides."` → `"SUPERVISED AI TRADING"`. Same pill/dot styling, text only.
- Headline (`<h1>`, currently "AI Trading Infrastructure That Records Every Decision Before It Risks Capital."): → `"The system of record for AI trading decisions."` — drop the `<span className="text-gradient">` mid-sentence emphasis pattern used previously and apply the gradient span to "system of record" instead, keeping the existing visual treatment: `The <span className="text-gradient">system of record</span> for AI trading decisions.`
- Supporting paragraph (currently "Titan Pilot is a replayable AI trading system..."): → `"Titan Pilot turns every thesis, objection, score, approval, and refusal into machine-validated evidence your desk can replay, govern, and defend."`
- New qualification line, added as a new `<motion.p>` directly beneath the CTA button row (same fade-up pattern as sibling elements, `delay: 0.42`): `"Built for professional trading desks — not retail signals, performance promises, or one-click autonomy."` styled `mt-4 text-xs text-white/60` — using the same `/60` floor established by the footer contrast fix below, so the site has one consistent "safe minimum" opacity for small supplementary text instead of a second distinct value.
- Primary CTA: text `"Join Early Access"` → `"Explore a real decision"`; `href="#contact"` → `href="#evidence"`. Keep the same gradient button styling and `ArrowRight` icon.
- Secondary CTA: text `"Explore the Architecture"` → `"Book an AI Desk Audit"`; `href="#architecture"` → `href="#contact"`. Keep the same outline-button styling.
- Trust badges list `aria-label="Platform guarantees"` → `aria-label="Platform status indicators"`. `TRUST_BADGES` data itself is unchanged.

### `lib/content.ts` — stale certification status

- `ENTITY_STATEMENTS[3]`: `"Titan Pilot is currently validating its AI shadow pipeline."` → `"Titan Pilot's AI shadow pipeline is certified and running, recording every decision before any promotion toward live execution."`
- `EVIDENCE_ROWS` — the row with `capability: "Shadow AI pipeline"`: `state: "In validation"` → `state: "Certified"`; `proof: "Signals recorded with dossier, score, and hash artifacts"` → `proof: "Phase C.5 certified; signals recorded with dossier, score, and hash artifacts"`.
- `PRODUCT_MODES[0]` (Shadow Mode): `status: "In Validation"` → `status: "Certified"`. `body` text unchanged (not flagged).
- `ROADMAP` — the item with `title: "AI Shadow Mode"`: `status: "in-validation"` → `status: "completed"` (a valid existing key in `RoadmapTimeline.tsx`'s `STATUS_META`, no type changes needed).
- `FAQ_ITEMS[3]` (`q: "Is Titan Pilot live?"`): `a` → `"Titan Pilot's shadow-mode AI pipeline is certified and running in production. It records every signal with a dossier, deterministic score, and hash artifacts — without placing live orders and without promising autonomous trading."`

### `lib/content.ts` — `MILESTONES` (3 of 8 tiles revised, 5 unchanged)

Unchanged: `"Infrastructure v1.0.0"/"Certified"`, `"Real MT5 Bridge"/"Validated"`, `"PostgreSQL Event Spine"/"Live"`, `"Continuous Health Checks"/"24/7"`, `"Telegram Critical Alerts"/"Wired"`.

Revised (add a code comment above the array citing `docs/content/PUBLIC_CLAIMS_REGISTER.md` as the source for these three):
- `{ label: "Replay Verification, Zero Drift", value: "1,662/1,662" }` — was `{ label: "Replay Verification", value: "Active" }`. Sourced to the register's "Replay determinism verified" row.
- `{ label: "Restore / PITR Recovery Verified", value: "13s / 78s" }` — was `{ label: "PITR + Offsite Backups", value: "Verified" }`. Sourced to the register's "Disaster recovery — restore speed" and "— point-in-time recovery" rows.
- `{ label: "Shadow AI Pipeline", value: "Certified" }` — was `{ label: "Shadow AI Pipeline", value: "Running" }`. Sourced to the register's "Phase C.5 certification passed" row.

`components/Milestones.tsx` itself needs no code change — it already renders `{value}` large and `{label}` small from the data array. Section heading/copy (`"Infrastructure Milestones"`, `"Production Infrastructure Before Intelligence."`, and the descriptive paragraph) are unchanged — not flagged, still accurate.

### `components/RoadmapTimeline.tsx:51`

`title="A Measured Path to Autonomous Market Intelligence."` → `title="A Measured, Evidence-Gated Roadmap."`

### `app/layout.tsx`

- `metadata.title.default`: `"Titan Pilot — Replayable AI Trading Infrastructure"` → `"Titan Pilot — The System of Record for AI Trading Decisions"`
- `metadata.description`: → `"Titan Pilot is supervised AI trading infrastructure — every AI thesis, objection, score, and approval becomes replayable, evidence your desk can defend."`
- `metadata.keywords`: replace exactly two array entries — `"autonomous trading platform"` → `"supervised AI trading"`, `"forex automation"` → `"AI decision audit trail"`. All other entries unchanged (full keyword strategy is W5).
- `metadata.openGraph.title`: → `"Titan Pilot — The System of Record for AI Trading Decisions"`
- `metadata.openGraph.description`: → `"Supervised AI trading. Titan Pilot turns every AI thesis, objection, score, and approval into replayable, machine-validated evidence."`
- `metadata.twitter.title`: → `"Titan Pilot — Supervised AI Trading"`
- `metadata.twitter.description`: → `"Every AI trading decision, recorded and replayable. Titan Pilot is the system of record for supervised AI trading."` (deliberately distinct wording from the OG description — fixes the "thin content" duplicate-description finding)

### `app/manifesto/page.tsx:10`

`metadata.description`: `"AI should reason. Software should decide. The six principles behind Titan Pilot's risk-first, replayable AI trading infrastructure."` → `"AI should reason. Software should decide. The six principles behind Titan Pilot's risk-first, replayable approach to supervised AI trading."`

### `components/Footer.tsx`

- Line 27 (disclaimer text): `text-white/40` → `text-white/60`. Must be verified ≥4.5:1 against the rendered footer background before commit (compute or re-run a contrast check — same class of verification used in W0's live audit).
- Lines 114 and 117 (copyright line, tagline line): `text-white/30` → `text-white/60`, same contrast requirement (self-discovered during this slice — same root cause as the flagged disclaimer line, lower starting opacity, same fix).
- Remove the LinkedIn `<li>` block (the `href="#"` dead link) entirely, and remove the now-unused `Linkedin` import from `lucide-react` at the top of the file. `Github` and `Mail` imports stay (still used).

## Testing / validation

No test suite exists for this repo (tracked as its own W0 finding, not
this slice's job to fix). Validation is:
- `npm run build` succeeds, 8/8 static pages generate, no new console/type
  errors.
- Every string above is grep-verified present in the built source (no
  stale copy left behind — e.g. `grep -r "in validation" lib/content.ts`
  returns nothing after the fix, `grep -r "Autonomous Market Intelligence"
  components/` returns nothing, `grep -rn "autonomous trading platform\|forex
  automation" app/layout.tsx` returns nothing).
- Footer contrast values verified to meet WCAG AA 4.5:1 (same method as
  W0's live audit — Lighthouse accessibility category or a direct
  luminance/contrast-ratio calculation) before commit, not assumed from
  the `/60` guess alone.
- A live/local visual check (desktop + the same 390×844 / 440×956 mobile
  viewports used in prior mobile-overflow fixes) confirms the hero's new
  qualification line and revised CTAs don't introduce layout overflow or
  wrapping regressions, since the hero is the component most recently
  broken by a content-length change.
- No banned marketing language (per the parent brief's Copy and Claims
  Policy) introduced in any new string written by this slice: no
  "guaranteed", "profitable", "market-beating", unqualified
  "institutional-grade", "AI-powered profits", or "high-conviction" — this
  is a self-check on the exact copy above, already satisfied by design.

## Out of scope / explicit non-goals

- No new routes ship in W1.
- `DashboardMockup.tsx` is not touched, including its "HIGH CONVICTION
  THESIS" string — full replacement is W2's job.
- `EarlyAccessForm.tsx` is not touched — W4.
- No homepage section is reordered, removed, or restructured beyond the
  `MILESTONES` data revision described above.
- No dependency upgrades, security headers, or test-infra work — W5.
