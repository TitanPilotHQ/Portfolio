# Website Visual & Narrative Refinement — Review

**Date:** 2026-07-21
**Branch:** `website/visual-narrative-refinement` (base `main` @ `0e1d03d`, the W5 closure commit)
**Scope:** Restraint/clarity pass per the plan at `docs/superpowers/plans/2026-07-21-website-visual-narrative-refinement.md`. W2 (the real interactive Evidence Explorer) remains blocked throughout — nothing here changes that status.

## 1. What changed

| Commit | Summary |
|---|---|
| `996462d` | Softened shared card-tilt (`GlassCard` ±7°/±9° → ±2.5°/±3°), `.text-gradient` shimmer (6s → 16s), `.grid-lines` opacity (0.045 → 0.03) |
| `826fc0d` | Softened Hero's background glow orbs (/10 → /6), `DashboardMockup`'s cursor-tilt (±6°/±8° → ±3°/±4°), ambient glow, and scanline speed (8s → 14s) |
| `f1f2787` | Added a "Where Each Stage Stands Today" status strip to `ArchitectureSection` — maps the AI-decision pipeline to what's live vs. designed-next, reusing existing content only |
| `2f7f29a` | Surfaced the existing `PRODUCT_DOCTRINES` (Never-Guess, Fail-Closed — previously only on `/product`) on the homepage `SafetyGrid` section |
| `6f35f3b` | Added a new "Current Build Status" homepage section (`BuildStatus.tsx`) with owner-approved deployment-status wording |
| `8283aad` | Added a subtle "Evidence Explorer in preparation" note directly beneath the existing (unmodified) `EvidenceSection` capability table |

## 2. Exact copy changes

**New, owner-approved verbatim (session decision, 2026-07-21):**
- `BUILD_STATUS.body`: "The current build includes deterministic replay, an append-only approval event spine, and a read-only Approval Center. Live approval writes and execution activation remain subject to separate controls and owner authorization."
- `BUILD_STATUS.facts[3]`: "A read-only operator approval surface is deployed for controlled internal use. Approval write authority and execution remain separately gated."
- `EVIDENCE_EXPLORER_NOTE`: "Interactive Evidence Explorer in preparation. Public per-decision evidence will be released only after sanitization, schema validation, integrity verification, and publication approval."

**New, structural/synthesized (backed by existing content, not literal copies):**
- `BUILD_STATUS.facts[0-2]`: "Deterministic trading engine — built and certified." / "MT5 bridge — validated end-to-end." / "Replay verification and broker reconciliation — implemented." — paraphrase `MILESTONES` and `EVIDENCE_ROWS`.
- `BUILD_STATUS.disclosure`: "This public website does not expose internal operator tools or controls." — a statement about the website itself, not an internal-system fact.
- `ArchitectureSection` status strip's six labels ("Live", "Certified — shadow mode", "Active", "Designed — next" [live reference to `AUTONOMY_LADDER_DETAIL[1].status`], "Mandatory, always-on", "Deterministic, MT5-bridged") — composite labels synthesized from `EVIDENCE_ROWS`, `MILESTONES`, `ARCHITECTURE_LAYERS`, and `AUTONOMY_LADDER_DETAIL`.

**Reused verbatim, no new authoring:**
- `PRODUCT_DOCTRINES` (Never-Guess, Fail-Closed) on `SafetyGrid` — previously only on `/product`.
- `AUTONOMY_LADDER_DETAIL[1].status`/`.body` (Copilot stage) on the new `ArchitectureSection` strip — previously only on `/product`.

## 3. Claims audit outcome

An independent, adversarially-minded audit (separate from the whole-branch code review) traced every new/changed user-facing string to one of: an existing `lib/content.ts` export, a `docs/content/PUBLIC_CLAIMS_REGISTER.md` row, or the owner-approved wordings above.

**Verdict: CLEAN — no untraceable claim found.** Both owner-approved wordings and the note confirmed byte-for-byte identical to the approved text, with zero paraphrase drift. No internal-infrastructure names (tailnet/VPN/VPS/IP/port/hostname/db-role) anywhere in new copy.

**One honest, non-blocking judgment call, surfaced rather than silently resolved:** several new strings — the six architecture-strip status labels and `BUILD_STATUS.facts[0]` ("Deterministic trading engine — built and certified.") — are *backed paraphrases/composites* of existing approved content, not *literal single-source copies*. The auditor found nothing that exceeds what's already approved, but flagged this distinction explicitly since the plan's own language ("nothing else is invented") could be read as requiring strict verbatim reuse. **This was the plan's intentional design** (a synthesized status map, not a duplicate of any one existing array) — flagging here for your visibility rather than treating it as settled unilaterally.

## 4. Accessibility

Lighthouse (chrome-devtools MCP), against a production build (`npm run build && npm run start`):

| Device | Accessibility | Best Practices | SEO | Agentic Browsing |
|---|---|---|---|---|
| Desktop | 100 | 96 | 100 | 100 |
| Mobile | 100 | 96 | 100 | 100 |

The one failed Best Practices audit item (`errors-in-console`) on both runs is `_vercel/insights/script.js` and `_vercel/speed-insights/script.js` 404s — these only resolve on a real Vercel deployment, not local `next start`. Pre-existing local-dev artifact, unrelated to this branch, matching the same pattern noted in this repo's W4b production verification history.

## 5. Performance

Chrome DevTools performance trace (local production build, unthrottled):
- **LCP:** 102ms (TTFB 7ms + render delay 95ms)
- **CLS:** 0.00

No LCP/CLS regression versus the W5 closure baseline (2.9s synthetic-throttled LCP, CLS 0) — the restraint changes (softer tilt/glow/shimmer) reduce animation-driven paint work, if anything.

## 6. Screenshots

Captured locally (not committed — binary QA artifacts): `.superpowers/sdd/qa-screenshots/`
- `01-hero-desktop.png` — homepage hero, desktop
- `02-architecture-storystrip-desktop.png` — new pipeline stage-status strip
- `03-safety-doctrines-desktop.png` — new governance doctrine strip
- `04-evidence-plus-note-desktop.png` — Evidence table + new readiness note
- `05-build-status-desktop.png` — new Current Build Status section
- `06-homepage-mobile-full.png` — full mobile homepage scroll
- `report-desktop.html` / `report-mobile.html` — full Lighthouse reports

Light-mode screenshots are not included — light mode is explicitly out of scope for this pass (owner decision, 2026-07-21; the site is dark-theme-only).

## 7. Status

titanpilot.app visual and narrative refinement complete. W2 remains production-disabled pending a certified public evidence fixture.
