# W1 — Messaging, Metadata, Homepage Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the hero, fix five stale "in validation" strings and
three `MILESTONES` tiles, fix site/manifesto metadata and one autonomy-led
heading, and fix footer contrast + a dead link — all per the W0 audit's
routing, with no new routes and no restructuring of the existing homepage.

**Architecture:** Five sequential tasks, each touching a distinct file or
tight file cluster: `lib/content.ts` data (Task 1), `Hero.tsx` (Task 2),
metadata + one heading across `layout.tsx`/`manifesto/page.tsx`/
`RoadmapTimeline.tsx` (Task 3), `Footer.tsx` (Task 4), then a build +
live-browser integration check across everything (Task 5).

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind v4. No test
suite exists in this repo (tracked separately as a W0/W5 finding) —
verification here is `npm run build`, targeted `grep`, and live browser
checks (chrome-devtools/Playwright MCP tools) reusing the same
scrollWidth/clientWidth mobile-overflow method used for the prior
mobile-hero-blowout fix.

## Global Constraints

- No new route ships in this plan (spec, Scope).
- `components/DashboardMockup.tsx` is not touched, including its "HIGH
  CONVICTION THESIS" string — full replacement is W2's job (spec, Context
  decision 3).
- `components/EarlyAccessForm.tsx` is not touched — W4 (spec, Out of
  scope).
- No homepage section is reordered, removed, or restructured beyond the
  `MILESTONES` data revision (spec, Out of scope).
- No dependency upgrades, security headers, or test-infra work — W5 (spec,
  Out of scope).
- Footer text contrast must be verified ≥4.5:1 WCAG AA before that task's
  commit — not assumed from an opacity-value guess alone (spec, Footer
  section; spec, Testing/validation).
- No new copy introduced by this plan may contain: "guaranteed",
  "profitable", "market-beating", unqualified "institutional-grade",
  "AI-powered profits", or "high-conviction" (spec, Testing/validation,
  citing the parent program's Copy and Claims Policy).
- `MILESTONES` tile revisions must be traceable to a
  `docs/content/PUBLIC_CLAIMS_REGISTER.md` row via a code comment (spec,
  MILESTONES section).

---

### Task 1: `lib/content.ts` — stale certification status + Milestones revision

**Files:**
- Modify: `lib/content.ts:27-33` (`ENTITY_STATEMENTS`), `lib/content.ts`
  `EVIDENCE_ROWS` shadow-pipeline row (~line 166-170), `lib/content.ts:183-192`
  (`MILESTONES`), `lib/content.ts` `PRODUCT_MODES[0]` (~line 209-214),
  `lib/content.ts` `ROADMAP` AI Shadow Mode item (~line 235),
  `lib/content.ts` `FAQ_ITEMS[3]` (~line 256-258)

**Interfaces:**
- Consumes: nothing (first task, independent of Tasks 2-4)
- Produces: the same exported names (`ENTITY_STATEMENTS`, `EVIDENCE_ROWS`,
  `MILESTONES`, `PRODUCT_MODES`, `ROADMAP`, `FAQ_ITEMS`) with updated
  string/value content only — no signature or shape changes, so no
  consuming component needs edits.

- [ ] **Step 1: Fix `ENTITY_STATEMENTS[3]`**

Find:
```ts
  "Titan Pilot is currently validating its AI shadow pipeline.",
```
Replace with:
```ts
  "Titan Pilot's AI shadow pipeline is certified and running, recording every decision before any promotion toward live execution.",
```

- [ ] **Step 2: Fix the `EVIDENCE_ROWS` shadow-pipeline row**

Find:
```ts
  {
    capability: "Shadow AI pipeline",
    state: "In validation",
    proof: "Signals recorded with dossier, score, and hash artifacts",
  },
```
Replace with:
```ts
  {
    capability: "Shadow AI pipeline",
    state: "Certified",
    proof: "Phase C.5 certified; signals recorded with dossier, score, and hash artifacts",
  },
```

- [ ] **Step 3: Fix `PRODUCT_MODES[0]` status**

Find:
```ts
  {
    stage: "01",
    title: "Shadow Mode",
    status: "In Validation",
    body: "AI runs, records decisions, and learns from market outcomes. No orders.",
  },
```
Replace with:
```ts
  {
    stage: "01",
    title: "Shadow Mode",
    status: "Certified",
    body: "AI runs, records decisions, and learns from market outcomes. No orders.",
  },
```

- [ ] **Step 4: Fix `ROADMAP`'s "AI Shadow Mode" status**

Find:
```ts
  { title: "AI Shadow Mode", status: "in-validation" },
```
Replace with:
```ts
  { title: "AI Shadow Mode", status: "completed" },
```

`"completed"` is already a valid key in `RoadmapTimeline.tsx`'s
`STATUS_META` object — no type or component changes are needed for this
edit.

- [ ] **Step 5: Fix `FAQ_ITEMS[3]`**

Find:
```ts
  {
    q: "Is Titan Pilot live?",
    a: "Titan Pilot is currently in shadow-mode validation. The full AI pipeline runs and records signals with dossier, score, and hash artifacts — without placing orders and without promising live-money autonomous trading.",
  },
```
Replace with:
```ts
  {
    q: "Is Titan Pilot live?",
    a: "Titan Pilot's shadow-mode AI pipeline is certified and running in production. It records every signal with a dossier, deterministic score, and hash artifacts — without placing live orders and without promising autonomous trading.",
  },
```

- [ ] **Step 6: Revise `MILESTONES`**

Find:
```ts
export const MILESTONES = [
  { label: "Infrastructure v1.0.0", value: "Certified" },
  { label: "Real MT5 Bridge", value: "Validated" },
  { label: "PostgreSQL Event Spine", value: "Live" },
  { label: "Replay Verification", value: "Active" },
  { label: "PITR + Offsite Backups", value: "Verified" },
  { label: "Continuous Health Checks", value: "24/7" },
  { label: "Telegram Critical Alerts", value: "Wired" },
  { label: "Shadow AI Pipeline", value: "Running" },
];
```
Replace with:
```ts
/** Replay/backup/shadow-pipeline tiles are sourced from
 * docs/content/PUBLIC_CLAIMS_REGISTER.md — do not change these values
 * without a corresponding register row. */
export const MILESTONES = [
  { label: "Infrastructure v1.0.0", value: "Certified" },
  { label: "Real MT5 Bridge", value: "Validated" },
  { label: "PostgreSQL Event Spine", value: "Live" },
  { label: "Replay Verification, Zero Drift", value: "1,662/1,662" },
  { label: "Restore / PITR Recovery Verified", value: "13s / 78s" },
  { label: "Continuous Health Checks", value: "24/7" },
  { label: "Telegram Critical Alerts", value: "Wired" },
  { label: "Shadow AI Pipeline", value: "Certified" },
];
```

- [ ] **Step 7: Verify old strings are gone**

Run: `grep -n "In Validation\|In validation\|in-validation\|currently validating\|currently in shadow-mode" lib/content.ts`
Expected: no output.

- [ ] **Step 8: Verify new strings are present**

Run: `grep -c "1,662/1,662\|13s / 78s\|Zero Drift\|certified and running" lib/content.ts`
Expected: `4` or more.

- [ ] **Step 9: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 8/8 static pages generated, no
TypeScript errors.

- [ ] **Step 10: Commit**

```bash
git add lib/content.ts
git commit -m "$(cat <<'EOF'
W1: fix stale in-validation copy, revise Milestones with real numbers

Phase C.5 certified the shadow pipeline PASS on 2026-07-08 — five
strings across ENTITY_STATEMENTS, EVIDENCE_ROWS, PRODUCT_MODES,
ROADMAP, and FAQ_ITEMS still said "in validation". Also revises 3 of
8 Milestones tiles to show real sourced numbers (1,662/1,662 replay
events, 13s/78s DR recovery) instead of vague status words.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: `components/Hero.tsx` — hero rewrite

**Files:**
- Modify: `components/Hero.tsx:42-123`

**Interfaces:**
- Consumes: `TRUST_BADGES` from `lib/content.ts` (already imported,
  unchanged by Task 1 — this task does not depend on Task 1 completing
  first, but both are part of the same plan and Task 1 runs first per
  plan order)
- Produces: no new exports; this is a leaf component rendered by
  `app/page.tsx`, which needs no changes since `Hero`'s own export
  signature (`export function Hero()`) is unchanged.

- [ ] **Step 1: Replace the eyebrow text**

Find:
```tsx
            <span className="animate-ticker size-1.5 rounded-full bg-cyan" />
            AI Reasons. Software Decides.
          </motion.p>
```
Replace with:
```tsx
            <span className="animate-ticker size-1.5 rounded-full bg-cyan" />
            SUPERVISED AI TRADING
          </motion.p>
```

- [ ] **Step 2: Replace the headline**

Find:
```tsx
            AI Trading Infrastructure That{" "}
            <span className="text-gradient">Records Every Decision</span> Before
            It Risks Capital.
```
Replace with:
```tsx
            The <span className="text-gradient">system of record</span> for AI
            trading decisions.
```

- [ ] **Step 3: Replace the supporting paragraph**

Find:
```tsx
            Titan Pilot is a replayable AI trading system where LLMs generate
            structured reasoning, deterministic software scores decisions, and
            risk gates remain in control.
```
Replace with:
```tsx
            Titan Pilot turns every thesis, objection, score, approval, and
            refusal into machine-validated evidence your desk can replay,
            govern, and defend.
```

- [ ] **Step 4: Rewrite the CTA row and add the qualification line**

Find:
```tsx
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
            >
              Join Early Access
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href="#architecture"
              className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
            >
              Explore the Architecture
            </motion.a>
          </motion.div>
```
Replace with:
```tsx
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href="#evidence"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
            >
              Explore a real decision
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href="#contact"
              className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
            >
              Book an AI Desk Audit
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="mt-4 text-xs text-white/60"
          >
            Built for professional trading desks — not retail signals,
            performance promises, or one-click autonomy.
          </motion.p>
```

- [ ] **Step 5: Fix the trust-badges `aria-label`**

Find:
```tsx
            aria-label="Platform guarantees"
```
Replace with:
```tsx
            aria-label="Platform status indicators"
```

- [ ] **Step 6: Verify old strings are gone**

Run: `grep -n "AI Reasons. Software Decides.\|Join Early Access\|Explore the Architecture\|AI Trading Infrastructure That\|Platform guarantees" components/Hero.tsx`
Expected: no output.

- [ ] **Step 7: Verify new strings are present**

Run: `grep -c "SUPERVISED AI TRADING\|Explore a real decision\|Book an AI Desk Audit\|system of record\|Platform status indicators\|one-click autonomy" components/Hero.tsx`
Expected: `6`.

- [ ] **Step 8: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 8/8 static pages generated.

- [ ] **Step 9: Commit**

```bash
git add components/Hero.tsx
git commit -m "$(cat <<'EOF'
W1: rewrite hero for Supervised AI Trading category positioning

Replaces the engineering-led eyebrow/headline with the category-first
framing from the commercial strategy, retargets both CTAs at existing
homepage anchors (#evidence, #contact) since the dedicated routes they
conceptually belong to don't exist until W2/W4, and adds a
qualification line that self-disqualifies retail signal-seekers.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Metadata and remaining copy fixes

**Files:**
- Modify: `app/layout.tsx` (metadata block, lines 27-75), `app/manifesto/page.tsx:9-10`, `components/RoadmapTimeline.tsx:51`

**Interfaces:**
- Consumes: nothing (independent of Tasks 1-2; different files)
- Produces: nothing consumed by later tasks — these are terminal
  metadata/text values.

- [ ] **Step 1: Fix `app/layout.tsx` title**

Find:
```ts
  title: {
    default: "Titan Pilot — Replayable AI Trading Infrastructure",
    template: "%s — Titan Pilot",
  },
```
Replace with:
```ts
  title: {
    default: "Titan Pilot — The System of Record for AI Trading Decisions",
    template: "%s — Titan Pilot",
  },
```

- [ ] **Step 2: Fix `app/layout.tsx` description**

Find:
```ts
  description:
    "Titan Pilot is a risk-first AI trading infrastructure platform with replayable decisions, deterministic scoring, MT5 execution, broker reconciliation, and shadow-mode validation.",
```
Replace with:
```ts
  description:
    "Titan Pilot is supervised AI trading infrastructure — every AI thesis, objection, score, and approval becomes replayable, evidence your desk can defend.",
```

- [ ] **Step 3: Fix two `app/layout.tsx` keyword entries**

Find:
```ts
  keywords: [
    "AI trading infrastructure",
    "autonomous trading platform",
    "algorithmic trading",
    "AI trading agents",
    "deterministic execution",
    "trading automation",
    "broker reconciliation",
    "MetaTrader 5 automation",
    "MT5 trading infrastructure",
    "replayable trading decisions",
    "financial AI",
    "risk-first trading automation",
    "event-sourced trading platform",
    "AI market analysis",
    "forex automation",
  ],
```
Replace with:
```ts
  keywords: [
    "AI trading infrastructure",
    "supervised AI trading",
    "algorithmic trading",
    "AI trading agents",
    "deterministic execution",
    "trading automation",
    "broker reconciliation",
    "MetaTrader 5 automation",
    "MT5 trading infrastructure",
    "replayable trading decisions",
    "financial AI",
    "risk-first trading automation",
    "event-sourced trading platform",
    "AI market analysis",
    "AI decision audit trail",
  ],
```

- [ ] **Step 4: Fix `app/layout.tsx` OpenGraph title and description**

Find:
```ts
    title: "Titan Pilot — Replayable AI Trading Infrastructure",
    description:
      "AI reasons. Software decides. Risk-first AI trading infrastructure with replayable decisions, deterministic scoring, and shadow-mode validation.",
```
Replace with:
```ts
    title: "Titan Pilot — The System of Record for AI Trading Decisions",
    description:
      "Supervised AI trading. Titan Pilot turns every AI thesis, objection, score, and approval into replayable, machine-validated evidence.",
```

- [ ] **Step 5: Fix `app/layout.tsx` Twitter title and description**

Find:
```ts
  twitter: {
    card: "summary_large_image",
    title: "Titan Pilot — AI Trading Infrastructure",
    description:
      "Autonomous trading intelligence built like mission-critical infrastructure. AI reasons. Software decides.",
    images: ["/banner.png"],
  },
```
Replace with:
```ts
  twitter: {
    card: "summary_large_image",
    title: "Titan Pilot — Supervised AI Trading",
    description:
      "Every AI trading decision, recorded and replayable. Titan Pilot is the system of record for supervised AI trading.",
    images: ["/banner.png"],
  },
```

- [ ] **Step 6: Fix `app/manifesto/page.tsx` metadata description**

Find:
```ts
  description:
    "AI should reason. Software should decide. The six principles behind Titan Pilot's risk-first, replayable AI trading infrastructure.",
```
Replace with:
```ts
  description:
    "AI should reason. Software should decide. The six principles behind Titan Pilot's risk-first, replayable approach to supervised AI trading.",
```

- [ ] **Step 7: Fix `components/RoadmapTimeline.tsx` heading**

Find:
```tsx
          title="A Measured Path to Autonomous Market Intelligence."
```
Replace with:
```tsx
          title="A Measured, Evidence-Gated Roadmap."
```

- [ ] **Step 8: Verify old strings are gone**

Run: `grep -n "Replayable AI Trading Infrastructure\"" app/layout.tsx`
Expected: no output.

Run: `grep -n "autonomous trading platform\|forex automation" app/layout.tsx`
Expected: no output.

Run: `grep -n "Autonomous trading intelligence built like mission-critical" app/layout.tsx`
Expected: no output.

Run: `grep -n "replayable AI trading infrastructure\." app/manifesto/page.tsx`
Expected: no output.

Run: `grep -n "Autonomous Market Intelligence" components/RoadmapTimeline.tsx`
Expected: no output.

- [ ] **Step 9: Verify new strings are present**

Run: `grep -c "The System of Record for AI Trading Decisions" app/layout.tsx`
Expected: `2` (title default + OpenGraph title).

Run: `grep -c "supervised AI trading\|Supervised AI Trading" app/layout.tsx`
Expected: `2` or more (keywords entry + Twitter title/description).

Run: `grep -n "supervised AI trading" app/manifesto/page.tsx`
Expected: 1 match.

Run: `grep -n "Evidence-Gated Roadmap" components/RoadmapTimeline.tsx`
Expected: 1 match.

- [ ] **Step 10: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 8/8 static pages generated.

- [ ] **Step 11: Commit**

```bash
git add app/layout.tsx app/manifesto/page.tsx components/RoadmapTimeline.tsx
git commit -m "$(cat <<'EOF'
W1: fix site/manifesto metadata and autonomy-led roadmap heading

Site title/description/OG/Twitter metadata now leads with the
Supervised AI Trading category instead of "AI trading infrastructure"
framing, drops the two keyword entries that contradicted the "no
autonomous trading, no forex automation" claims policy, and fixes the
Twitter description's near-duplicate-of-OG thin content. The roadmap
heading drops "Autonomous Market Intelligence" for "Evidence-Gated".

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: `components/Footer.tsx` — contrast fixes and dead-link removal

**Files:**
- Modify: `components/Footer.tsx:3` (import), `components/Footer.tsx:27`
  (disclaimer text), `components/Footer.tsx:83-91` (LinkedIn `<li>`,
  removed), `components/Footer.tsx:114-119` (copyright/tagline lines)

**Interfaces:**
- Consumes: nothing (independent of Tasks 1-3)
- Produces: nothing consumed by later tasks, except that Task 5's mobile
  visual check implicitly covers the footer along with the rest of the
  page.

- [ ] **Step 1: Remove the unused `Linkedin` import**

Find:
```tsx
import { Github, Linkedin, Mail } from "lucide-react";
```
Replace with:
```tsx
import { Github, Mail } from "lucide-react";
```

- [ ] **Step 2: Remove the dead LinkedIn link**

Find:
```tsx
                <li>
                  {/* TODO: add LinkedIn company page URL */}
                  <a
                    href="#"
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Linkedin className="size-4" aria-hidden /> LinkedIn
                  </a>
                </li>
```
Delete this block entirely (no replacement).

- [ ] **Step 3: Fix the disclaimer text contrast**

Find:
```tsx
            <p className="mt-5 text-xs leading-relaxed text-white/40">{DISCLAIMER}</p>
```
Replace with:
```tsx
            <p className="mt-5 text-xs leading-relaxed text-white/60">{DISCLAIMER}</p>
```

- [ ] **Step 4: Fix the copyright and tagline line contrast**

Find:
```tsx
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] tracking-widest text-white/30">
            © {new Date().getFullYear()} TITAN PILOT — TITANPILOT.APP
          </p>
          <p className="font-mono text-[10px] tracking-widest text-white/30">
            AI REASONS. SOFTWARE DECIDES.
          </p>
        </div>
```
Replace with:
```tsx
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] tracking-widest text-white/60">
            © {new Date().getFullYear()} TITAN PILOT — TITANPILOT.APP
          </p>
          <p className="font-mono text-[10px] tracking-widest text-white/60">
            AI REASONS. SOFTWARE DECIDES.
          </p>
        </div>
```

- [ ] **Step 5: Verify LinkedIn and old opacity values are gone**

Run: `grep -n "Linkedin\|href=\"#\"\|text-white/40\|text-white/30" components/Footer.tsx`
Expected: no output.

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 8/8 static pages generated.

- [ ] **Step 7: Verify contrast empirically**

Run: `npx next start -p 3457` in the background, then use a
chrome-devtools or Playwright MCP browser tool to navigate to
`http://localhost:3457`, run a Lighthouse accessibility audit (or the
tool's contrast-check capability) scoped to or including the footer, and
read the reported contrast ratios for the three edited `<p>` elements
(disclaimer, copyright, tagline).

Expected: all three report ≥4.5:1 against their rendered background, and
Lighthouse's accessibility category reports no color-contrast violation
for the footer.

**If any element still fails at `/60`:** increase that element's opacity
value one step (e.g. `text-white/60` → `text-white/70`), rerun `npm run
build`, and repeat this step until Lighthouse reports no contrast
violation for the footer. Do not proceed to Step 8 until this passes.

Stop the dev server (`kill` the background process) once verified.

- [ ] **Step 8: Commit**

```bash
git add components/Footer.tsx
git commit -m "$(cat <<'EOF'
W1: fix footer text contrast (WCAG AA) and remove dead LinkedIn link

The disclaimer line failed Lighthouse's 4.5:1 contrast requirement at
text-white/40 (3.76:1); the copyright and tagline lines were even
lower at text-white/30 (same root cause, found while fixing the
flagged line). The LinkedIn link had no real URL and pointed at "#" —
removed until a real URL exists, rather than shipping a dead link.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Integration verification

**Files:**
- Modify: `components/Hero.tsx` (only if Step 3's overflow check fails —
  see that step's conditional fix)

**Interfaces:**
- Consumes: the final committed state of Tasks 1-4 (all files in this
  plan)
- Produces: nothing — this task is a verification gate, not a feature.

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: `✓ Compiled successfully`, 8/8 static pages generated, zero
TypeScript errors, zero new warnings.

- [ ] **Step 2: Start a local server for live verification**

Run in the background: `npx next start -p 3457`
Wait for it to report ready, then proceed.

- [ ] **Step 3: Mobile overflow check on the rewritten hero**

Using a chrome-devtools or Playwright MCP browser tool, navigate to
`http://localhost:3457`, resize the viewport to 390×844, and evaluate:

```js
({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
})
```

Expected: `scrollWidth === clientWidth`. Repeat at 440×956 with the same
expectation. (This specifically targets the risk the spec calls out: the
hero is the component most recently broken by a content-length change —
the new qualification line and longer CTA labels are the change most
likely to regress it.)

**If `scrollWidth > clientWidth` at either size:** take a screenshot to
identify which element overflows. If it's the new qualification line
added in Task 2, reduce its footprint — e.g. in `components/Hero.tsx`,
change the qualification line's `className` from `"mt-4 text-xs
text-white/60"` to `"mt-4 max-w-xl text-pretty text-xs text-white/60"`
(matching the `max-w-xl text-pretty` treatment already used on the
supporting paragraph a few lines above it) — then rebuild (`npm run
build`), restart the server, and recheck both viewports. If the overflow
source is a different element, stop and report BLOCKED with a screenshot
and the specific element identified — do not guess further fixes.

- [ ] **Step 4: Footer contrast cross-check**

Run a Lighthouse accessibility audit against `http://localhost:3457` (or
reuse the browser tool's contrast-check capability). Expected: no
color-contrast violation reported anywhere on the page (this re-confirms
Task 4's fix in the context of the fully assembled page, not just the
footer in isolation).

- [ ] **Step 5: Cross-file banned-language sweep**

Run:
```bash
grep -rniE "guaranteed|profitable|market-beating|institutional-grade|AI-powered profits|high-conviction" app/layout.tsx app/manifesto/page.tsx components/Hero.tsx components/Footer.tsx components/RoadmapTimeline.tsx lib/content.ts
```
Expected: no output. (`components/DashboardMockup.tsx` is intentionally
excluded from this sweep — its "HIGH CONVICTION THESIS" string is
explicitly out of scope for W1, per the Global Constraints above.)

- [ ] **Step 6: Stop the local server**

Find and kill the background `next start` process from Step 2. Remove any
screenshot files written during this task from the working tree (they are
verification artifacts, not deliverables).

- [ ] **Step 7: Commit (only if Step 3's conditional fix was applied)**

If Step 3 required no fix, there is nothing to commit — report the task
complete with all checks passing and skip this step.

If Step 3's conditional fix was applied:
```bash
git add components/Hero.tsx
git commit -m "$(cat <<'EOF'
W1: fix mobile overflow from hero qualification line

Task 5's integration check found the new qualification line
overflowing at 390px/440px viewports. Applied the same
max-w-xl/text-pretty treatment already used on the hero's supporting
paragraph.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```
