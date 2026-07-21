# Website Visual & Narrative Refinement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate titanpilot.app's visual restraint and narrative clarity — calmer motion/glow, a clearer AI-decision pipeline story, a new "current build status" section, and a distinguishing note for the future Evidence Explorer — without touching W2, LaunchOS, the Titan operator repo, or inventing any new performance/claims content.

**Architecture:** Pure `lib/content.ts`-driven content additions (matching the existing site pattern where every section pulls copy from a single exported array/object) plus targeted restraint edits to the shared motion primitives in `components/ui.tsx` and `app/globals.css` that automatically propagate calmer 3D-tilt/glow/shimmer to every section that already consumes them (`WhySection`, `ArchitectureSection`, `Milestones`). Two new homepage sections (`BuildStatus`, `EvidenceExplorerNote`) follow the existing section-component + content-array pattern exactly.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind v4 (`@theme` tokens in `app/globals.css`), Framer Motion, TypeScript, Vitest + `@testing-library/react` (jsdom via per-file `// @vitest-environment jsdom` docblock, matching `components/ContactForm.test.tsx`).

## Global Constraints

- **Dark theme only, this pass.** No theme toggle, no light-mode tokens, no dual-theme duplication of styles. (Owner decision, 2026-07-21: light mode is a separate follow-up project.)
- **No new performance, profitability, live-trading, or redundancy claims.** Every new/changed content string must trace to one of: an existing `lib/content.ts` export, a row in `docs/content/PUBLIC_CLAIMS_REGISTER.md`, or one of the two exact owner-approved wordings below (§"Owner-approved wording"). Nothing else is invented.
- **Do not name internal infrastructure.** No `tailnet`, `Tailscale`, VPN, VPS, IP addresses, ports, hostnames, database roles, or migration numbers anywhere in new copy.
- **Do not touch:** the Titan operator repo, the internal Approval Center, LaunchOS (`docs/launchos/`), W2 production enablement (no real/mock fixture wiring), live APIs, internal URLs or credentials.
- **W2 stays blocked.** `EvidenceSection.tsx` (the existing live capability table) is not a placeholder and must not be relabeled as one — only a new, visually secondary note is added near it.
- Preserve WCAG AA, zero layout shift, and the existing `prefers-reduced-motion` override in `app/globals.css` (lines 207–215) — do not add motion that bypasses it.
- No new runtime dependencies (no WebGL/3D libraries) — Framer Motion only, as already used throughout.
- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build` must all stay clean after every task.
- One focused branch/PR for the whole pass: `website/visual-narrative-refinement`.

### Owner-approved wording (session decision, 2026-07-21 — use verbatim)

**Current build status:**
> "The current build includes deterministic replay, an append-only approval event spine, and a read-only Approval Center. Live approval writes and execution activation remain subject to separate controls and owner authorization."
>
> "A read-only operator approval surface is deployed for controlled internal use. Approval write authority and execution remain separately gated."

**Evidence Explorer readiness note:**
> "Interactive Evidence Explorer in preparation. Public per-decision evidence will be released only after sanitization, schema validation, integrity verification, and publication approval."

Constraints on the note (owner-specified): must not imply the current `EvidenceSection` is incomplete or a placeholder; must not show mock evidence cards; must not imply public evidence already exists; keep it subtle and non-promotional.

---

## File Structure

**New files:**
- `components/BuildStatus.tsx` — new restrained homepage section, "Current Build Status."
- `components/BuildStatus.test.tsx` — locks the exact approved wording in place.
- `components/EvidenceExplorerNote.tsx` — small secondary note distinguishing today's capability table from the future Evidence Explorer.
- `components/EvidenceExplorerNote.test.tsx` — locks the exact approved wording in place.

**Modified files:**
- `app/globals.css` — slow the `.text-gradient` shimmer, soften `.grid-lines` opacity (shared restraint tokens).
- `components/ui.tsx` — reduce `GlassCard`'s cursor-tilt range (propagates to `WhySection`, `ArchitectureSection`, `Milestones`).
- `components/Hero.tsx` — soften background glow orbs, tighten CTA visual hierarchy.
- `components/DashboardMockup.tsx` — reduce tilt range and scanline intensity (keep it as the one deliberate "signature" 3D moment, just less aggressive).
- `components/ArchitectureSection.tsx` — add a compact pipeline-status mapping strip (reuses existing content only).
- `components/SafetyGrid.tsx` — add a governance-doctrine strip (reuses `PRODUCT_DOCTRINES` + one existing `AUTONOMY_LADDER_DETAIL` line, currently only published on `/product`).
- `lib/content.ts` — add `BUILD_STATUS` and `EVIDENCE_EXPLORER_NOTE` exports.
- `app/page.tsx` — wire in `<BuildStatus />` and `<EvidenceExplorerNote />`.

---

### Task 1: Design-system restraint pass

**Files:**
- Modify: `app/globals.css:155-168` (`.text-gradient`), `app/globals.css:196-205` (`.grid-lines`)
- Modify: `components/ui.tsx:76-86` (`GlassCard` tilt springs)
- Test: none new (existing `npm run build` + visual check are the verification for this task; no component under test changes its public API)

**Interfaces:**
- Consumes: nothing new.
- Produces: no signature changes — `GlassCard` and the CSS utility classes keep the same names/props, only their motion/opacity intensity changes, so every existing consumer (`WhySection`, `ArchitectureSection`, `Milestones`) is unaffected except visually.

- [ ] **Step 1: Soften the shared CSS restraint tokens**

In `app/globals.css`, change the `.text-gradient` shimmer to be slower and calmer, and reduce `.grid-lines` opacity:

```css
.text-gradient {
  background: linear-gradient(
    92deg,
    #00d7ff 0%,
    #0078ff 30%,
    #a855f7 60%,
    #00d7ff 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shimmer 16s ease-in-out infinite;
}
```

```css
.grid-lines {
  background-image: linear-gradient(
      rgba(0, 215, 255, 0.03) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(0, 215, 255, 0.03) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 100%);
}
```

(Only the `animation` duration on `.text-gradient` and the two `rgba` alpha values on `.grid-lines` change — `0.045` → `0.03`. Everything else in the file is unchanged.)

- [ ] **Step 2: Reduce `GlassCard`'s cursor-tilt intensity**

In `components/ui.tsx`, inside `GlassCard`, change the tilt spring ranges from a dramatic ±7°/±9° to a subtle ±2.5°/±3°:

```tsx
  const rotateX = useSpring(useTransform(py, [0, 1], [2.5, -2.5]), {
    stiffness: 250,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-3, 3]), {
    stiffness: 250,
    damping: 22,
  });
```

(Replaces the existing `[7, -7]` / `[-9, 9]` ranges at `components/ui.tsx:79-86`. Nothing else in `GlassCard` changes.)

- [ ] **Step 3: Verify clean build**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: all three clean, no errors.

- [ ] **Step 4: Visual spot-check**

Run `npm run dev`, then use the available browser tool (chrome-devtools MCP `navigate_page` + `take_screenshot`, or Playwright MCP `browser_navigate` + `browser_take_screenshot`) against `http://localhost:3000` to confirm: the hero/why/architecture/milestones cards still tilt on hover but noticeably less aggressively, the background grid is calmer, and the gradient headline text still reads as an accent (not static-looking, not distractingly animated). No layout shift versus before.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/ui.tsx
git commit -m "refine: soften shared card-tilt, shimmer, and grid-line intensity"
```

---

### Task 2: Hero and DashboardMockup restraint

**Files:**
- Modify: `components/Hero.tsx:26-35` (background orbs)
- Modify: `components/DashboardMockup.tsx:39-46` (tilt springs), `components/DashboardMockup.tsx:70` (ambient glow), `app/globals.css` (`--animate-scan` duration)
- Test: none new (visual verification, matching Task 1)

**Interfaces:**
- Consumes: Task 1's restraint tokens (already landed).
- Produces: no prop/signature changes to `Hero` or `DashboardMockup` — both remain zero-prop components.

- [ ] **Step 1: Soften Hero's background glow orbs**

In `components/Hero.tsx`, reduce the two ambient orb opacities from `/10` to `/6`:

```tsx
      <motion.div
        style={{ y: orbY }}
        className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-azure/6 blur-[140px]"
        aria-hidden
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-violet/6 blur-[120px]"
        aria-hidden
      />
```

(Replaces `bg-azure/10` and `bg-violet/10` at `components/Hero.tsx:28` and `components/Hero.tsx:33`. Everything else in `Hero.tsx` — headline, subhead, CTAs, trust badges, `DashboardMockup` — is unchanged.)

- [ ] **Step 2: Reduce DashboardMockup's tilt range and scanline speed**

In `components/DashboardMockup.tsx`, halve the tilt springs:

```tsx
  const rotateX = useSpring(useTransform(py, [0, 1], [3, -3]), {
    stiffness: 160,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-4, 4]), {
    stiffness: 160,
    damping: 20,
  });
```

(Replaces `[6, -6]` / `[-8, 8]` at `components/DashboardMockup.tsx:39-46`.)

Then reduce the ambient glow-behind-panel opacity at `components/DashboardMockup.tsx:70`:

```tsx
      <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-tr from-azure/12 via-cyan/8 to-violet/12 blur-3xl" />
```

(Replaces `from-azure/20 via-cyan/10 to-violet/20`.)

In `app/globals.css`, slow the scanline sweep (the only consumer of `--animate-scan` is `DashboardMockup`'s scanline div):

```css
  --animate-scan: scan 14s linear infinite;
```

(Replaces `scan 8s linear infinite` in the `@theme` block, `app/globals.css:22`.)

- [ ] **Step 3: Verify clean build**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: all three clean.

- [ ] **Step 4: Visual spot-check at desktop and mobile widths**

Use the browser tool to load `/` at a desktop width (≥1280px) and a mobile width (375px). Confirm: the hero still reads calm and premium, the cockpit mockup still tilts on cursor move but subtly, the scanline sweep is a slow ambient detail rather than a fast repeating flash, and the mandatory `PRODUCT SIMULATION · EXAMPLE SHADOW SIGNAL · NON-LIVE DATA · NOT A PERFORMANCE CLAIM` disclaimer footer is still present and legible (`components/DashboardMockup.tsx:268-271` — untouched by this task, just confirm it wasn't accidentally clipped by any other change).

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx components/DashboardMockup.tsx app/globals.css
git commit -m "refine: soften hero glow and dashboard mockup tilt/scanline intensity"
```

---

### Task 3: Product storytelling — pipeline status mapping strip

**Files:**
- Modify: `components/ArchitectureSection.tsx` (add a new block after the existing layer-cards grid, before the closing "See the full architecture" link)
- Test: none new (no new content export; reuses existing `lib/content.ts` exports already covered indirectly by the build)

**Interfaces:**
- Consumes: `AUTONOMY_LADDER_DETAIL` from `@/lib/content` (already exported at `lib/content.ts:349-365`, not previously imported by this file).
- Produces: no new exports; purely additive JSX within `ArchitectureSection`.

This satisfies the "make the sequence visually clear, including human approval and RiskGate" goal without inventing content: it reuses the existing pipeline (`ARCHITECTURE_FLOW`/`ARCHITECTURE_LAYERS`, already rendered above it in this same component) and adds an honest status pill per conceptual stage — including the Copilot/human-approval stage, correctly marked "Designed — next" rather than implying it is live.

- [ ] **Step 1: Add the import**

In `components/ArchitectureSection.tsx`, change the content import line:

```tsx
import { ARCHITECTURE_FLOW, ARCHITECTURE_LAYERS, AUTONOMY_LADDER_DETAIL } from "@/lib/content";
```

(Replaces the existing import at `components/ArchitectureSection.tsx:5`.)

- [ ] **Step 2: Add the status-mapping strip**

Insert this block immediately after the `ARCHITECTURE_LAYERS` grid's closing `</div>` (i.e., right after `components/ArchitectureSection.tsx:81`, before the `<Reveal className="mt-10 text-center">` link block):

```tsx
        {/* What's live today vs. what's designed-next in the same pipeline */}
        <Reveal className="mt-10">
          <div className="glass mx-auto max-w-4xl rounded-2xl px-6 py-5">
            <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
              Where Each Stage Stands Today
            </p>
            <ul className="space-y-3">
              {[
                { stage: "Market data & dossier", status: "Live", tone: "text-success" },
                { stage: "AI analysis & adversarial review", status: "Certified — shadow mode", tone: "text-cyan" },
                { stage: "Evidence binding & replay", status: "Active", tone: "text-success" },
                {
                  stage: "Human approval (Copilot mode)",
                  status: AUTONOMY_LADDER_DETAIL[1].status,
                  tone: "text-electric",
                },
                { stage: "Risk Gate", status: "Mandatory, always-on", tone: "text-amber" },
                { stage: "Execution & broker reconciliation", status: "Deterministic, MT5-bridged", tone: "text-success" },
              ].map((row) => (
                <li
                  key={row.stage}
                  className="flex items-center justify-between gap-4 border-b border-white/[0.04] pb-3 text-sm last:border-0 last:pb-0"
                >
                  <span className="text-secondary">{row.stage}</span>
                  <span className={`font-mono text-xs ${row.tone}`}>{row.status}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
              {AUTONOMY_LADDER_DETAIL[1].body}
            </p>
          </div>
        </Reveal>
```

`AUTONOMY_LADDER_DETAIL[1]` is the `"Copilot"` stage (`lib/content.ts:356-360`): `status: "Designed — next"`, `body: "A proposed signal reaches the desk lead with its reason codes attached. Approve or reject, with a hard expiry at the next candle close. An approved signal then walks the exact same risk gates as any other signal — there is no separate “trusted” execution path."` — this is existing, already-published copy (currently only on `/product`), reused verbatim here, not rewritten.

- [ ] **Step 3: Verify clean build**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: all three clean. Confirm no unused-import lint error (both `ARCHITECTURE_LAYERS` and `AUTONOMY_LADDER_DETAIL` are used).

- [ ] **Step 4: Visual spot-check**

Load `/#architecture` in the browser tool. Confirm the new status strip renders below the layer cards, reads clearly at both desktop and mobile widths, and does not imply human approval or live execution are active today — the Copilot row must show "Designed — next," not "Live" or "Active."

- [ ] **Step 5: Commit**

```bash
git add components/ArchitectureSection.tsx
git commit -m "feat(architecture): add pipeline stage-status mapping strip"
```

---

### Task 4: Trust & governance — SafetyGrid doctrine strip

**Files:**
- Modify: `components/SafetyGrid.tsx` (add a doctrine strip between the section heading and the shield/rules-table grid)

**Interfaces:**
- Consumes: `PRODUCT_DOCTRINES` (`lib/content.ts:338-347`, 2 items: Never-Guess, Fail-Closed) and `AUTONOMY_LADDER_DETAIL[1].body`'s closing sentence — already imported once Task 3 lands, but `SafetyGrid.tsx` is a separate file and needs its own import of `PRODUCT_DOCTRINES`.
- Produces: no new exports; purely additive JSX.

This satisfies "evidence before action, bounded AI authority, fail-closed controls, separation between approval and execution" using only existing, already-published copy (`PRODUCT_DOCTRINES` is currently only shown on `/product`).

- [ ] **Step 1: Add the import**

In `components/SafetyGrid.tsx`, change the content import line:

```tsx
import { PRODUCT_DOCTRINES, SAFETY_RULES } from "@/lib/content";
```

(Replaces the existing import at `components/SafetyGrid.tsx:5`.)

- [ ] **Step 2: Add the doctrine strip**

Insert this block immediately after the `<SectionHeading .../>` call and before the `<div className="mx-auto mt-14 grid ...">` shield/table grid (i.e., between `components/SafetyGrid.tsx:16` and `components/SafetyGrid.tsx:18`):

```tsx
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {PRODUCT_DOCTRINES.map((doctrine) => (
            <div key={doctrine.title} className="glass rounded-xl p-5">
              <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/70">
                {doctrine.title}
              </p>
              <p className="text-sm leading-relaxed text-secondary">{doctrine.body}</p>
            </div>
          ))}
        </div>
```

- [ ] **Step 3: Verify clean build**

Run: `npm run lint && npm run typecheck && npm run build`
Expected: all three clean.

- [ ] **Step 4: Visual spot-check**

Load `/#safety` in the browser tool. Confirm the two doctrine cards render above the existing shield/rules-table layout, at both desktop and mobile widths, without pushing the rules table awkwardly or causing layout shift.

- [ ] **Step 5: Commit**

```bash
git add components/SafetyGrid.tsx
git commit -m "feat(safety): surface Never-Guess and Fail-Closed doctrines on homepage"
```

---

### Task 5: Current Build Status section

**Files:**
- Create: `components/BuildStatus.tsx`
- Create: `components/BuildStatus.test.tsx`
- Modify: `lib/content.ts` (add `BUILD_STATUS` export)
- Modify: `app/page.tsx` (render `<BuildStatus />` after `<Milestones />`)

**Interfaces:**
- Consumes: `Reveal`, `SectionHeading` from `./ui` (existing).
- Produces: `BUILD_STATUS` export (`{ eyebrow, title, body, facts: string[], disclosure }`) for any future consumer; `BuildStatus` component (zero props).

- [ ] **Step 1: Add the content export**

In `lib/content.ts`, add this immediately after `MILESTONES` (after `lib/content.ts:196`, before `TECH_STACK`):

```ts
/** Owner-approved wording (session decision, 2026-07-21) — describes
 * current deployment state without naming internal infrastructure
 * (no tailnet/VPN/VPS/IP/port/hostname/db-role references). Not a
 * quantitative claim gated by PUBLIC_CLAIMS_REGISTER.md; do not add
 * numbers or infra names here without owner sign-off first. */
export const BUILD_STATUS = {
  eyebrow: "Current Build Status",
  title: "What's Deployed Today.",
  body: "The current build includes deterministic replay, an append-only approval event spine, and a read-only Approval Center. Live approval writes and execution activation remain subject to separate controls and owner authorization.",
  facts: [
    "Deterministic trading engine — built and certified.",
    "MT5 bridge — validated end-to-end.",
    "Replay verification and broker reconciliation — implemented.",
    "A read-only operator approval surface is deployed for controlled internal use. Approval write authority and execution remain separately gated.",
  ],
  disclosure: "This public website does not expose internal operator tools or controls.",
};
```

- [ ] **Step 2: Write the component**

Create `components/BuildStatus.tsx`:

```tsx
"use client";

import { BUILD_STATUS } from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

export function BuildStatus() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={BUILD_STATUS.eyebrow}
          title={BUILD_STATUS.title}
          copy={BUILD_STATUS.body}
        />

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <ul className="glass divide-y divide-white/[0.04] rounded-2xl px-6 py-2">
            {BUILD_STATUS.facts.map((fact) => (
              <li key={fact} className="py-3.5 text-sm leading-relaxed text-secondary">
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {BUILD_STATUS.disclosure}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Write the locking test**

Create `components/BuildStatus.test.tsx`:

```tsx
// @vitest-environment jsdom
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BuildStatus } from "./BuildStatus";
import { BUILD_STATUS } from "@/lib/content";

beforeAll(() => {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error test stub, not a full IntersectionObserver implementation
  global.IntersectionObserver = IntersectionObserverStub;
});

afterEach(() => {
  cleanup();
});

describe("BuildStatus", () => {
  it("renders the exact owner-approved wording, unmodified", () => {
    render(<BuildStatus />);
    expect(screen.getByText(BUILD_STATUS.title)).toBeInTheDocument();
    expect(screen.getByText(BUILD_STATUS.body)).toBeInTheDocument();
    for (const fact of BUILD_STATUS.facts) {
      expect(screen.getByText(fact)).toBeInTheDocument();
    }
    expect(screen.getByText(BUILD_STATUS.disclosure)).toBeInTheDocument();
  });

  it("does not mention internal infrastructure", () => {
    render(<BuildStatus />);
    const text = document.body.textContent ?? "";
    for (const forbidden of ["tailnet", "Tailscale", "VPN", "VPS"]) {
      expect(text).not.toContain(forbidden);
    }
  });
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/BuildStatus.test.tsx`
Expected: 2/2 passing.

- [ ] **Step 5: Wire into the homepage**

In `app/page.tsx`, add the import alongside the other section imports, and render `<BuildStatus />` immediately after `<Milestones />` (before `<TechStack />`):

```tsx
import { BuildStatus } from "@/components/BuildStatus";
```

```tsx
      <Milestones />
      <BuildStatus />
      <TechStack />
```

- [ ] **Step 6: Verify clean build**

Run: `npm run lint && npm run typecheck && npm test && npm run build`
Expected: all clean.

- [ ] **Step 7: Visual spot-check**

Load `/` in the browser tool, scroll to the new section between Milestones and Tech Stack. Confirm it reads as restrained (plain list, not a card grid), the disclosure line is legible but visually secondary, and there's no layout shift.

- [ ] **Step 8: Commit**

```bash
git add lib/content.ts components/BuildStatus.tsx components/BuildStatus.test.tsx app/page.tsx
git commit -m "feat(homepage): add restrained Current Build Status section"
```

---

### Task 6: Evidence Explorer readiness note

**Files:**
- Create: `components/EvidenceExplorerNote.tsx`
- Create: `components/EvidenceExplorerNote.test.tsx`
- Modify: `lib/content.ts` (add `EVIDENCE_EXPLORER_NOTE` export)
- Modify: `app/page.tsx` (render `<EvidenceExplorerNote />` immediately after `<EvidenceSection />`)

**Interfaces:**
- Consumes: nothing beyond plain JSX (no `Reveal`/`SectionHeading` — this must read as a small secondary note, not a full section, per the owner's explicit "keep it subtle and non-promotional" constraint).
- Produces: `EVIDENCE_EXPLORER_NOTE` (string export); `EvidenceExplorerNote` component (zero props).

- [ ] **Step 1: Add the content export**

In `lib/content.ts`, add this immediately after `EVIDENCE_ROWS` (after `lib/content.ts:182`, before the `MILESTONES` comment block):

```ts
/** Owner-approved wording (session decision, 2026-07-21). Describes the
 * future interactive, per-decision Evidence Explorer (W2) — blocked
 * pending Titan's certified sanitized fixture and versioned schema; see
 * docs/website/W2-HANDOFF-READINESS.md. Must never imply the capability
 * table above (EVIDENCE_ROWS) is incomplete, and must never show mock
 * evidence. */
export const EVIDENCE_EXPLORER_NOTE =
  "Interactive Evidence Explorer in preparation. Public per-decision evidence will be released only after sanitization, schema validation, integrity verification, and publication approval.";
```

- [ ] **Step 2: Write the component**

Create `components/EvidenceExplorerNote.tsx`:

```tsx
import { EVIDENCE_EXPLORER_NOTE } from "@/lib/content";

export function EvidenceExplorerNote() {
  return (
    <p className="mx-auto -mt-8 max-w-2xl px-4 pb-10 text-center text-xs leading-relaxed text-white/35 sm:px-6 lg:px-8">
      {EVIDENCE_EXPLORER_NOTE}
    </p>
  );
}
```

(No `"use client"` needed — this is a static server component, no motion, no interactivity, deliberately quieter than every other section on the page.)

- [ ] **Step 3: Write the locking test**

Create `components/EvidenceExplorerNote.test.tsx`:

```tsx
// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { EvidenceExplorerNote } from "./EvidenceExplorerNote";
import { EVIDENCE_EXPLORER_NOTE } from "@/lib/content";

describe("EvidenceExplorerNote", () => {
  it("renders the exact owner-approved wording, unmodified", () => {
    render(<EvidenceExplorerNote />);
    expect(screen.getByText(EVIDENCE_EXPLORER_NOTE)).toBeInTheDocument();
  });

  it("does not claim evidence is already publicly available", () => {
    render(<EvidenceExplorerNote />);
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/available now|live evidence|view evidence/i);
  });
});
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run components/EvidenceExplorerNote.test.tsx`
Expected: 2/2 passing.

- [ ] **Step 5: Wire into the homepage**

In `app/page.tsx`, add the import and render `<EvidenceExplorerNote />` immediately after `<EvidenceSection />` (before `<Milestones />`):

```tsx
import { EvidenceExplorerNote } from "@/components/EvidenceExplorerNote";
```

```tsx
      <EvidenceSection />
      <EvidenceExplorerNote />
      <Milestones />
```

- [ ] **Step 6: Verify clean build**

Run: `npm run lint && npm run typecheck && npm test && npm run build`
Expected: all clean.

- [ ] **Step 7: Visual spot-check**

Load `/#evidence` in the browser tool. Confirm the note reads as a quiet footnote directly under the existing capability table — not a new card, not a new heading, not competing visually with `EvidenceSection`'s own "Capability states only — never performance claims" footer line directly above it.

- [ ] **Step 8: Commit**

```bash
git add lib/content.ts components/EvidenceExplorerNote.tsx components/EvidenceExplorerNote.test.tsx app/page.tsx
git commit -m "feat(evidence): add subtle Evidence Explorer readiness note"
```

---

## Post-Implementation Phase (controller-run, not a subagent task)

After Tasks 1–6 are complete and each has passed its task review:

1. **Final whole-branch review** — dispatch one code-reviewer subagent against the full branch diff (`main..website/visual-narrative-refinement`), with the Global Constraints block above as its attention lens. It must explicitly check: no new unsourced claims, no internal-infrastructure names, dark-mode-only (no partial light tokens), no layout shift, `prefers-reduced-motion` still respected.

2. **Dedicated claims audit** — a second, narrowly-scoped review pass (can be the same or a separate subagent) that greps the full diff for every new/changed user-facing string and traces each one to: an existing `lib/content.ts` export it was copied from, a `docs/content/PUBLIC_CLAIMS_REGISTER.md` row, or the two owner-approved wordings in this plan's Global Constraints. Anything untraceable is a blocking finding.

3. **Screenshots** (dark theme only — light mode is out of scope this pass, per owner decision): using the browser tool, capture:
   - Homepage hero (desktop + mobile)
   - Product/architecture storytelling section (with the new stage-status strip)
   - Trust/governance section (`SafetyGrid` with the new doctrine strip)
   - Evidence section + the new readiness note directly beneath it
   - Full mobile homepage scroll
   Before/after pairs where feasible (before = `main` at the branch's merge-base, after = the branch tip).

4. **Accessibility report** — run a Lighthouse accessibility audit (chrome-devtools MCP `lighthouse_audit`, or manual keyboard/contrast pass if unavailable) against the updated homepage; confirm no regression from the W5 baseline and WCAG AA is maintained on all new/changed sections.

5. **Performance report** — run a Lighthouse performance audit against the updated homepage; confirm no LCP/CLS regression versus the W5 closure baseline (LCP 2.9s synthetic, CLS 0, per `W5-CLOSURE-REPORT.md` §7). The restraint changes (Tasks 1–2) should, if anything, help — less animation work per frame.

6. **Public-claims review write-up + exact copy-change list** — a short markdown summary (can live in the PR description, or as `docs/website/VISUAL-NARRATIVE-REFINEMENT-REVIEW.md` if the owner wants it persisted) listing every added/changed string and its source, per item 2 above.

7. **Open one focused PR** — `website/visual-narrative-refinement` → `main`, containing all six tasks' commits, with the screenshots, accessibility report, performance report, and claims-review list in the PR description. Merge only when checks are green and the owner has reviewed.

8. **Report back using the required exact status wording:**
   > "titanpilot.app visual and narrative refinement complete. W2 remains production-disabled pending a certified public evidence fixture."

---

## Self-Review Notes

- **Spec coverage:** Goal A (hero/spacing/CTA/restraint) → Tasks 1–2. Goal B (product storytelling sequence) → Task 3. Goal C (build status) → Task 5. Goal D (evidence readiness) → Task 6. Goal E (trust/governance) → Task 4. Goal F (visual standards: dark-only per owner decision, no WebGL, reduced motion preserved, WCAG AA) → Global Constraints + Task 1/2's verification steps. Goal G (claims audit) → Post-Implementation Phase item 2. Goal H (deliverables) → Post-Implementation Phase items 3–7.
- **No placeholders:** every task has complete code, exact file paths/line numbers, and real commands.
- **Type consistency:** `BUILD_STATUS.facts` and `EVIDENCE_EXPLORER_NOTE` types match their single consumers exactly (no cross-task signature drift, since neither is consumed by more than one component).
- **Scope boundary, explicitly carried forward from the brainstorming/scoping conversation:** light-mode support is deliberately excluded from this plan; do not add a toggle, partial tokens, or dual-theme styles anywhere in these six tasks.

