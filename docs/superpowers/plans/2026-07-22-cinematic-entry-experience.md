# Cinematic Entry Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, ~4.2s cinematic entry sequence for titanpilot.app where the real (vectorized) Titan Pilot mark assembles from dismantled fragments, locks, then unlocks into the website — with a restrained synthesized "AI room" ambience gated behind a user gesture, full reduced-motion/skip/fail-open safety, and zero regression to the site's existing content, performance, or accessibility posture.

**Architecture:** A single client-side orchestrator (`BrandEntryGate`) mounted once in the root layout drives an explicit state machine (`entryState.ts`). It renders either `LogoAssemblyScene` (full 3D-look fragment assembly, built from the committed `public/brand/titan-mark.svg`, animated via the native Web Animations API on real DOM nodes) or `ReducedMotionReveal` (a short dissolve, used for `prefers-reduced-motion`, return visits, and post-skip settling). Sound is synthesized entirely in-browser via `AmbientSoundController` (Web Audio API oscillators/filtered noise — no audio files, no licensing risk, no network cost), created only inside the "Enter Titan" click handler per browser autoplay policy.

**Tech Stack:** Next.js 15 App Router, React 19, Framer Motion 12 (for the 2D UI chrome — buttons, dissolve fades), native Web Animations API (`Element.animate()`) for the 3D-look fragment choreography, Web Audio API for sound, Vitest + Testing Library (jsdom) matching this repo's existing conventions.

## Global Constraints

- Dark-only site (`class="dark"` hardcoded, no light mode) — the entry experience must render correctly against `--color-bg: #05070a` and use only existing tokens (`--color-cyan #00d7ff`, `--color-azure #0078ff`, `--color-violet #7c3aed`, `--color-electric #a855f7`).
- No new npm dependencies. No Three.js/WebGL/canvas 3D runtime — the "3D-look" choreography is CSS 3D transforms (`perspective`, `rotateX/Y`, `translateZ`) driven by the native Web Animations API, matching the existing tilt techniques in `components/DashboardMockup.tsx` and `components/ui.tsx`'s `GlassCard`.
- No audio files. All sound is synthesized in-browser via Web Audio API. `AudioContext` is created/resumed only inside a user-gesture event handler (the "Enter Titan" click) — never on page load, never speculatively.
- Total motion sequence: **3.8–5.5s** on full motion. Reduced-motion / return-visit path: **700–1200ms**.
- Respect `prefers-reduced-motion: reduce` at the JS level (this codebase currently only neutralizes CSS `animation`/`transition` globally in `app/globals.css:207-215` — it does **not** gate JS-driven animation, so this is net-new and must be explicit).
- Fail-open: any JS error, WebGL/Canvas absence (n/a here — no WebGL used), or audio-init failure must reveal the website immediately, never trap the user.
- No new accessibility regressions: visible focus, Escape-to-skip, `aria-hidden` on decorative fragments, one concise accessible description, no focus trap, WCAG AA contrast preserved.
- No CLS: the overlay is `position: fixed`, never part of document flow.
- No new CSP changes — same-origin fetch of `/brand/titan-mark.svg` and in-browser audio synthesis need no new `connect-src`/`media-src` entries (verified: `middleware.ts` has no `media-src` directive, which per spec falls back to `default-src 'self'`, already satisfied).
- Testing convention: every `.test.tsx`/`.test.ts` file starts with `// @vitest-environment jsdom`, uses `import { afterEach, describe, expect, it, vi } from "vitest"` and `@testing-library/react`, calls `afterEach(() => cleanup())`. No `.toBeInTheDocument()` (jest-dom is not installed) — use `.toBeTruthy()` on `screen.getByText(...)`/`screen.queryByText(...)` results, matching `components/ContactForm.test.tsx` and `components/BuildStatus.test.tsx`.
- Do not touch: the Titan operator repo, the internal Approval Center, LaunchOS, W2 production enablement, live APIs, internal URLs/credentials. Do not modify existing homepage section content/copy.
- One focused branch (`website/cinematic-entry-experience`, already created), one PR. Do not merge automatically — hold for owner visual approval per the brief.

## Baseline (captured 2026-07-22, for before/after comparison)

- Homepage First Load JS: **177 kB**
- LCP: **171 ms**, CLS: **0.00** (local production build, unthrottled)
- Screenshots: `.superpowers/sdd/baseline-2026-07-22/homepage-{desktop,mobile}-before.png`
- Canonical logo asset: `public/brand/titan-mark.svg` (already committed — see `docs/website/BRAND-MARK-VECTORIZATION.md` for sourcing/fidelity proof). 7 fragment groups by id: `p-swoop`, `t-shape`, `arrow`, `candle-1`..`candle-5`. ViewBox `0 0 624 570`.

---

## File Structure

```
components/brand-entry/
  entryState.ts              # Task 1 — pure state machine (types + reducer)
  entryState.test.ts
  entryStorage.ts             # Task 2 — localStorage helpers (visit/version/sound prefs)
  entryStorage.test.ts
  useEntryExperience.ts        # Task 3 — React hook wiring reducer + storage + matchMedia
  useEntryExperience.test.ts
  AmbientSoundController.ts    # Task 4 — Web Audio synthesis engine (no React)
  AmbientSoundController.test.ts
  EntryControls.tsx           # Task 5 — Enter/sound-toggle/skip UI
  EntryControls.test.tsx
  ReducedMotionReveal.tsx      # Task 6 — short dissolve (reduced-motion + return-visit + post-skip)
  ReducedMotionReveal.test.tsx
  LogoAssemblyScene.tsx        # Task 7 — full fragment assembly (fetch+WAAPI)
  LogoAssemblyScene.test.tsx
  BrandEntryGate.tsx           # Task 8 — orchestrator, mounted in layout
  BrandEntryGate.test.tsx
app/layout.tsx                # Task 9 — mount BrandEntryGate, wrap children in #site-content
app/page.tsx                  # Task 9 — add id="main-content" to <main>
components/Footer.tsx          # Task 9 — add "Replay intro" link
```

Each file has one responsibility: state machine (pure), storage (pure), hook (React glue), sound (imperative audio), two visual renderers (full vs. reduced), controls (UI), and one orchestrator. This mirrors the codebase's existing pattern of small, single-purpose components (`ScrollExtras.tsx`, `DashboardMockup.tsx`, etc.) rather than one large file.

---

### Task 1: Entry state machine

**Files:**
- Create: `components/brand-entry/entryState.ts`
- Test: `components/brand-entry/entryState.test.ts`

**Interfaces:**
- Produces: `EntryPhase` type, `SoundPreference` type, `EntryState` interface, `EntryEvent` union, `initialEntryState: EntryState`, `entryReducer(state: EntryState, event: EntryEvent): EntryState`. All later tasks import from this file.

- [ ] **Step 1: Write the failing test**

```typescript
// components/brand-entry/entryState.test.ts
import { describe, expect, it } from "vitest";
import {
  entryReducer,
  initialEntryState,
  type EntryState,
} from "./entryState";

describe("entryReducer", () => {
  it("moves from checking to awaiting_entry on READY, storing reducedMotion", () => {
    const next = entryReducer(initialEntryState, {
      type: "READY",
      reducedMotion: true,
    });
    expect(next.phase).toBe("awaiting_entry");
    expect(next.reducedMotion).toBe(true);
  });

  it("moves from awaiting_entry to assembling on ENTER, storing sound preference", () => {
    const awaiting: EntryState = {
      ...initialEntryState,
      phase: "awaiting_entry",
    };
    const next = entryReducer(awaiting, { type: "ENTER", sound: "muted" });
    expect(next.phase).toBe("assembling");
    expect(next.soundPreference).toBe("muted");
  });

  it("progresses assembling -> locked -> revealing -> complete in order", () => {
    let state: EntryState = { ...initialEntryState, phase: "assembling" };
    state = entryReducer(state, { type: "FRAGMENTS_ALIGNED" });
    expect(state.phase).toBe("locked");
    state = entryReducer(state, { type: "LOCKED" });
    expect(state.phase).toBe("revealing");
    state = entryReducer(state, { type: "REVEAL_COMPLETE" });
    expect(state.phase).toBe("complete");
  });

  it("SKIP jumps straight to skipped from any non-terminal phase", () => {
    const state: EntryState = { ...initialEntryState, phase: "assembling" };
    const next = entryReducer(state, { type: "SKIP" });
    expect(next.phase).toBe("skipped");
  });

  it("FAIL jumps straight to failed from any non-terminal phase", () => {
    const state: EntryState = { ...initialEntryState, phase: "locked" };
    const next = entryReducer(state, { type: "FAIL" });
    expect(next.phase).toBe("failed");
  });

  it("is a no-op once in a terminal phase", () => {
    const done: EntryState = { ...initialEntryState, phase: "complete" };
    const next = entryReducer(done, { type: "SKIP" });
    expect(next.phase).toBe("complete");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/brand-entry/entryState.test.ts`
Expected: FAIL with "Cannot find module './entryState'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// components/brand-entry/entryState.ts
export type EntryPhase =
  | "checking"
  | "awaiting_entry"
  | "assembling"
  | "locked"
  | "revealing"
  | "complete"
  | "skipped"
  | "failed";

export type SoundPreference = "on" | "muted";

export interface EntryState {
  phase: EntryPhase;
  soundPreference: SoundPreference;
  reducedMotion: boolean;
}

export type EntryEvent =
  | { type: "READY"; reducedMotion: boolean }
  | { type: "ENTER"; sound: SoundPreference }
  | { type: "FRAGMENTS_ALIGNED" }
  | { type: "LOCKED" }
  | { type: "REVEAL_COMPLETE" }
  | { type: "SKIP" }
  | { type: "FAIL" };

export const initialEntryState: EntryState = {
  phase: "checking",
  soundPreference: "on",
  reducedMotion: false,
};

const TERMINAL_PHASES: readonly EntryPhase[] = [
  "complete",
  "skipped",
  "failed",
];

export function entryReducer(
  state: EntryState,
  event: EntryEvent
): EntryState {
  if (TERMINAL_PHASES.includes(state.phase)) {
    return state;
  }

  switch (event.type) {
    case "READY":
      if (state.phase !== "checking") return state;
      return { ...state, phase: "awaiting_entry", reducedMotion: event.reducedMotion };
    case "ENTER":
      if (state.phase !== "awaiting_entry") return state;
      return { ...state, phase: "assembling", soundPreference: event.sound };
    case "FRAGMENTS_ALIGNED":
      if (state.phase !== "assembling") return state;
      return { ...state, phase: "locked" };
    case "LOCKED":
      if (state.phase !== "locked") return state;
      return { ...state, phase: "revealing" };
    case "REVEAL_COMPLETE":
      if (state.phase !== "revealing") return state;
      return { ...state, phase: "complete" };
    case "SKIP":
      return { ...state, phase: "skipped" };
    case "FAIL":
      return { ...state, phase: "failed" };
    default:
      return state;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/brand-entry/entryState.test.ts`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add components/brand-entry/entryState.ts components/brand-entry/entryState.test.ts
git commit -m "feat(brand-entry): add entry sequence state machine"
```

---

### Task 2: Visit/version/sound-preference storage helpers

**Files:**
- Create: `components/brand-entry/entryStorage.ts`
- Test: `components/brand-entry/entryStorage.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `INTRO_VERSION: string`, `shouldShowFullIntro(now: Date): boolean`, `recordIntroSeen(now: Date): void`, `getSoundPreference(): SoundPreference`, `setSoundPreference(pref: SoundPreference): void` (imports `SoundPreference` from `./entryState`). Task 3's hook consumes all five.

- [ ] **Step 1: Write the failing test**

```typescript
// components/brand-entry/entryStorage.test.ts
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  INTRO_VERSION,
  getSoundPreference,
  recordIntroSeen,
  setSoundPreference,
  shouldShowFullIntro,
} from "./entryStorage";

afterEach(() => {
  window.localStorage.clear();
});

describe("entryStorage", () => {
  it("shows the full intro when nothing has been stored yet", () => {
    expect(shouldShowFullIntro(new Date("2026-07-22T10:00:00Z"))).toBe(true);
  });

  it("does not show the full intro again the same calendar day after recording", () => {
    const now = new Date("2026-07-22T10:00:00Z");
    recordIntroSeen(now);
    const laterSameDay = new Date("2026-07-22T23:00:00Z");
    expect(shouldShowFullIntro(laterSameDay)).toBe(false);
  });

  it("shows the full intro again on a new calendar day", () => {
    recordIntroSeen(new Date("2026-07-22T10:00:00Z"));
    expect(shouldShowFullIntro(new Date("2026-07-23T00:01:00Z"))).toBe(true);
  });

  it("shows the full intro again if the stored version doesn't match the current one", () => {
    window.localStorage.setItem("titan_intro_version", "0");
    window.localStorage.setItem("titan_intro_last_seen", "2026-07-22");
    expect(shouldShowFullIntro(new Date("2026-07-22T10:00:00Z"))).toBe(true);
  });

  it("recordIntroSeen writes the current version and date", () => {
    recordIntroSeen(new Date("2026-07-22T10:00:00Z"));
    expect(window.localStorage.getItem("titan_intro_version")).toBe(
      INTRO_VERSION
    );
    expect(window.localStorage.getItem("titan_intro_last_seen")).toBe(
      "2026-07-22"
    );
  });

  it("defaults sound preference to on, and persists changes", () => {
    expect(getSoundPreference()).toBe("on");
    setSoundPreference("muted");
    expect(getSoundPreference()).toBe("muted");
  });

  it("does not throw if localStorage access fails (private browsing)", () => {
    const original = window.localStorage.getItem;
    window.localStorage.getItem = () => {
      throw new Error("blocked");
    };
    expect(() => shouldShowFullIntro(new Date())).not.toThrow();
    expect(shouldShowFullIntro(new Date())).toBe(true);
    window.localStorage.getItem = original;
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/brand-entry/entryStorage.test.ts`
Expected: FAIL with "Cannot find module './entryStorage'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// components/brand-entry/entryStorage.ts
import type { SoundPreference } from "./entryState";

export const INTRO_VERSION = "1";

const VERSION_KEY = "titan_intro_version";
const LAST_SEEN_KEY = "titan_intro_last_seen";
const SOUND_KEY = "titan_sound_preference";

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function safeGetItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private browsing / storage disabled: fail silently, intro just
    // won't persist across visits.
  }
}

export function shouldShowFullIntro(now: Date): boolean {
  const storedVersion = safeGetItem(VERSION_KEY);
  const storedLastSeen = safeGetItem(LAST_SEEN_KEY);
  if (storedVersion !== INTRO_VERSION) return true;
  if (storedLastSeen !== dateKey(now)) return true;
  return false;
}

export function recordIntroSeen(now: Date): void {
  safeSetItem(VERSION_KEY, INTRO_VERSION);
  safeSetItem(LAST_SEEN_KEY, dateKey(now));
}

export function getSoundPreference(): SoundPreference {
  const stored = safeGetItem(SOUND_KEY);
  return stored === "muted" ? "muted" : "on";
}

export function setSoundPreference(pref: SoundPreference): void {
  safeSetItem(SOUND_KEY, pref);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/brand-entry/entryStorage.test.ts`
Expected: PASS (7 tests)

- [ ] **Step 5: Commit**

```bash
git add components/brand-entry/entryStorage.ts components/brand-entry/entryStorage.test.ts
git commit -m "feat(brand-entry): add intro visit/version/sound-preference storage"
```

---

### Task 3: `useEntryExperience` hook

**Files:**
- Create: `components/brand-entry/useEntryExperience.ts`
- Test: `components/brand-entry/useEntryExperience.test.ts`

**Interfaces:**
- Consumes: `entryReducer`, `initialEntryState`, `EntryState`, `EntryEvent` from `./entryState`; `shouldShowFullIntro`, `recordIntroSeen`, `getSoundPreference`, `setSoundPreference` from `./entryStorage`.
- Produces: `useEntryExperience(): { state: EntryState; mounted: boolean; showFullSequence: boolean; dispatch: (event: EntryEvent) => void }`. `mounted` is false until the first client-side effect runs (hydration safety — nothing storage-dependent renders before this flips true). `showFullSequence` is computed once on mount from `shouldShowFullIntro(new Date())` and is what `BrandEntryGate` (Task 8) uses to choose `LogoAssemblyScene` vs. the short `ReducedMotionReveal` path.

- [ ] **Step 1: Write the failing test**

```typescript
// components/brand-entry/useEntryExperience.test.ts
// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useEntryExperience } from "./useEntryExperience";

afterEach(() => {
  window.localStorage.clear();
  vi.restoreAllMocks();
});

function stubMatchMedia(reducedMotion: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("reduce") ? reducedMotion : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

describe("useEntryExperience", () => {
  it("is not mounted synchronously, then becomes mounted and ready", async () => {
    stubMatchMedia(false);
    const { result } = renderHook(() => useEntryExperience());
    expect(result.current.mounted).toBe(false);
    await act(async () => {});
    expect(result.current.mounted).toBe(true);
    expect(result.current.state.phase).toBe("awaiting_entry");
    expect(result.current.showFullSequence).toBe(true);
  });

  it("reads prefers-reduced-motion into state", async () => {
    stubMatchMedia(true);
    const { result } = renderHook(() => useEntryExperience());
    await act(async () => {});
    expect(result.current.state.reducedMotion).toBe(true);
  });

  it("does not show the full sequence on a same-day return visit", async () => {
    stubMatchMedia(false);
    window.localStorage.setItem("titan_intro_version", "1");
    window.localStorage.setItem(
      "titan_intro_last_seen",
      new Date().toISOString().slice(0, 10)
    );
    const { result } = renderHook(() => useEntryExperience());
    await act(async () => {});
    expect(result.current.showFullSequence).toBe(false);
  });

  it("dispatch advances the underlying state machine", async () => {
    stubMatchMedia(false);
    const { result } = renderHook(() => useEntryExperience());
    await act(async () => {});
    act(() => {
      result.current.dispatch({ type: "ENTER", sound: "on" });
    });
    expect(result.current.state.phase).toBe("assembling");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/brand-entry/useEntryExperience.test.ts`
Expected: FAIL with "Cannot find module './useEntryExperience'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// components/brand-entry/useEntryExperience.ts
"use client";

import { useEffect, useReducer, useState } from "react";
import {
  entryReducer,
  initialEntryState,
  type EntryEvent,
  type EntryState,
} from "./entryState";
import { recordIntroSeen, shouldShowFullIntro } from "./entryStorage";

export function useEntryExperience() {
  const [state, dispatch] = useReducer(entryReducer, initialEntryState);
  const [mounted, setMounted] = useState(false);
  const [showFullSequence, setShowFullSequence] = useState(true);

  useEffect(() => {
    const now = new Date();
    const showFull = shouldShowFullIntro(now);
    setShowFullSequence(showFull);
    recordIntroSeen(now);

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    dispatch({ type: "READY", reducedMotion: reducedMotionQuery.matches });
    setMounted(true);
  }, []);

  return {
    state,
    mounted,
    showFullSequence,
    dispatch: (event: EntryEvent) => dispatch(event),
  };
}

export type { EntryState };
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/brand-entry/useEntryExperience.test.ts`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/brand-entry/useEntryExperience.ts components/brand-entry/useEntryExperience.test.ts
git commit -m "feat(brand-entry): add useEntryExperience hook"
```

---

### Task 4: `AmbientSoundController`

**Files:**
- Create: `components/brand-entry/AmbientSoundController.ts`
- Test: `components/brand-entry/AmbientSoundController.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks (standalone).
- Produces: `class AmbientSoundController` with methods `start(): Promise<void>`, `tick(): void`, `lockChime(): void`, `duckForReveal(): void`, `mute(): void`, `unmute(): void`, `dispose(): void`, and a getter `isMuted: boolean`. Task 8 (`BrandEntryGate`) instantiates and calls these at phase transitions.

**Design note:** all sound is synthesized — a short buffer of filtered noise for the room-tone loop (built once from `Math.random()`, looped, with a baked-in 40ms fade at each end so the loop seam is inaudible), a slow LFO modulating its gain for "faint spatial movement," brief filtered-noise ticks for fragment arrivals, and a short sine+triangle chime for the lock moment. No files, no fetch, no licensing surface.

- [ ] **Step 1: Write the failing test**

```typescript
// components/brand-entry/AmbientSoundController.test.ts
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AmbientSoundController } from "./AmbientSoundController";

class FakeParam {
  value = 0;
  setValueAtTime = vi.fn().mockReturnThis();
  linearRampToValueAtTime = vi.fn().mockReturnThis();
  exponentialRampToValueAtTime = vi.fn().mockReturnThis();
  setTargetAtTime = vi.fn().mockReturnThis();
  cancelScheduledValues = vi.fn().mockReturnThis();
}

function makeNode() {
  return {
    connect: vi.fn().mockReturnThis(),
    disconnect: vi.fn(),
    gain: new FakeParam(),
    frequency: new FakeParam(),
    Q: new FakeParam(),
    type: "sine",
    start: vi.fn(),
    stop: vi.fn(),
    buffer: null,
    loop: false,
    loopStart: 0,
    loopEnd: 0,
  };
}

class FakeAudioContext {
  state: "running" | "suspended" | "closed" = "suspended";
  currentTime = 0;
  destination = makeNode();
  createGain = vi.fn(() => makeNode());
  createOscillator = vi.fn(() => makeNode());
  createBiquadFilter = vi.fn(() => makeNode());
  createBufferSource = vi.fn(() => makeNode());
  createBuffer = vi.fn(() => ({
    getChannelData: () => new Float32Array(4096),
  }));
  resume = vi.fn(async () => {
    this.state = "running";
  });
  close = vi.fn(async () => {
    this.state = "closed";
  });
}

beforeEach(() => {
  (window as unknown as { AudioContext: unknown }).AudioContext =
    FakeAudioContext;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AmbientSoundController", () => {
  it("starts muted=false and resumes the audio context on start()", async () => {
    const controller = new AmbientSoundController();
    expect(controller.isMuted).toBe(false);
    await controller.start();
    // no throw = context created and resumed
  });

  it("mute() flips isMuted to true, unmute() flips it back", async () => {
    const controller = new AmbientSoundController();
    await controller.start();
    controller.mute();
    expect(controller.isMuted).toBe(true);
    controller.unmute();
    expect(controller.isMuted).toBe(false);
  });

  it("tick() and lockChime() do not throw before or after start()", () => {
    const controller = new AmbientSoundController();
    expect(() => controller.tick()).not.toThrow();
    expect(() => controller.lockChime()).not.toThrow();
  });

  it("dispose() is safe to call multiple times", async () => {
    const controller = new AmbientSoundController();
    await controller.start();
    expect(() => controller.dispose()).not.toThrow();
    expect(() => controller.dispose()).not.toThrow();
  });

  it("start() does not throw when AudioContext is unavailable", async () => {
    // @ts-expect-error simulating an environment without Web Audio
    delete window.AudioContext;
    const controller = new AmbientSoundController();
    await expect(controller.start()).resolves.toBeUndefined();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/brand-entry/AmbientSoundController.test.ts`
Expected: FAIL with "Cannot find module './AmbientSoundController'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// components/brand-entry/AmbientSoundController.ts
const ROOM_TONE_GAIN = 0.12; // restrained: spec range 0.08-0.16
const REVEAL_DUCK_GAIN = 0.05;
const FADE_SECONDS = 0.6;

function buildNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const fadeSamples = Math.floor(ctx.sampleRate * 0.04); // 40ms fade each end
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
    if (i < fadeSamples) data[i] *= i / fadeSamples;
    if (i > length - fadeSamples) data[i] *= (length - i) / fadeSamples;
  }
  return buffer;
}

export class AmbientSoundController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private roomSource: AudioBufferSourceNode | null = null;
  private lfo: OscillatorNode | null = null;
  private started = false;
  private muted = false;

  get isMuted(): boolean {
    return this.muted;
  }

  async start(): Promise<void> {
    if (this.started) return;
    const AudioContextCtor =
      typeof window !== "undefined"
        ? (window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext)
        : undefined;
    if (!AudioContextCtor) return; // fail-open: no Web Audio support, stay silent

    try {
      this.ctx = new AudioContextCtor();
      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;
      filter.connect(this.masterGain);

      this.roomSource = this.ctx.createBufferSource();
      this.roomSource.buffer = buildNoiseBuffer(this.ctx, 4);
      this.roomSource.loop = true;
      this.roomSource.connect(filter);
      this.roomSource.start();

      // slow LFO for "faint spatial movement" on the room tone gain
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.value = 0.05;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.02;
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.masterGain.gain);
      this.lfo.start();

      this.masterGain.gain.setTargetAtTime(
        ROOM_TONE_GAIN,
        this.ctx.currentTime,
        FADE_SECONDS
      );
      this.started = true;
    } catch {
      // fail-open: any Web Audio error means the intro continues silently
      this.started = false;
    }
  }

  tick(): void {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.02);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // ignore — a missed tick is inaudible and non-critical
    }
  }

  lockChime(): void {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 440;
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.9);
    } catch {
      // ignore
    }
  }

  duckForReveal(): void {
    if (!this.ctx || !this.masterGain || this.muted) return;
    this.masterGain.gain.setTargetAtTime(
      REVEAL_DUCK_GAIN,
      this.ctx.currentTime,
      FADE_SECONDS
    );
  }

  mute(): void {
    this.muted = true;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
    }
  }

  unmute(): void {
    this.muted = false;
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(
        REVEAL_DUCK_GAIN,
        this.ctx.currentTime,
        0.3
      );
    }
  }

  dispose(): void {
    try {
      this.roomSource?.stop();
    } catch {
      // already stopped
    }
    try {
      this.lfo?.stop();
    } catch {
      // already stopped
    }
    this.roomSource?.disconnect();
    this.lfo?.disconnect();
    this.masterGain?.disconnect();
    if (this.ctx && this.ctx.state !== "closed") {
      void this.ctx.close();
    }
    this.roomSource = null;
    this.lfo = null;
    this.masterGain = null;
    this.ctx = null;
    this.started = false;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/brand-entry/AmbientSoundController.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 5: Commit**

```bash
git add components/brand-entry/AmbientSoundController.ts components/brand-entry/AmbientSoundController.test.ts
git commit -m "feat(brand-entry): add synthesized ambient sound controller"
```

---

### Task 5: `EntryControls`

**Files:**
- Create: `components/brand-entry/EntryControls.tsx`
- Test: `components/brand-entry/EntryControls.test.tsx`

**Interfaces:**
- Consumes: `SoundPreference` type from `./entryState`.
- Produces: `<EntryControls variant="awaiting_entry" | "in_progress" onEnter={(sound: SoundPreference) => void} onSkip={() => void} />`. When `variant="awaiting_entry"`: renders the sound toggle + "Enter Titan" button, no skip button (per brief §6, skip becomes available once assembly starts). When `variant="in_progress"`: renders only the "Skip intro" button. `BrandEntryGate` (Task 8) switches `variant` by phase and passes both callbacks.

- [ ] **Step 1: Write the failing test**

```typescript
// components/brand-entry/EntryControls.test.tsx
// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { EntryControls } from "./EntryControls";

afterEach(() => cleanup());

describe("EntryControls", () => {
  it("awaiting_entry variant shows Enter Titan and a sound toggle, no skip button", () => {
    const onEnter = vi.fn();
    const onSkip = vi.fn();
    render(
      <EntryControls variant="awaiting_entry" onEnter={onEnter} onSkip={onSkip} />
    );
    expect(screen.getByText("Enter Titan")).toBeTruthy();
    expect(screen.queryByText("Skip intro")).toBeFalsy();
  });

  it("defaults to sound on, and Enter Titan passes 'on'", () => {
    const onEnter = vi.fn();
    render(
      <EntryControls variant="awaiting_entry" onEnter={onEnter} onSkip={vi.fn()} />
    );
    fireEvent.click(screen.getByText("Enter Titan"));
    expect(onEnter).toHaveBeenCalledWith("on");
  });

  it("toggling the sound control switches the label and the value Enter Titan passes", () => {
    const onEnter = vi.fn();
    render(
      <EntryControls variant="awaiting_entry" onEnter={onEnter} onSkip={vi.fn()} />
    );
    fireEvent.click(screen.getByLabelText("Turn sound off"));
    expect(screen.getByLabelText("Turn sound on")).toBeTruthy();
    fireEvent.click(screen.getByText("Enter Titan"));
    expect(onEnter).toHaveBeenCalledWith("muted");
  });

  it("ignores a second rapid Enter Titan click (double-click guard)", () => {
    const onEnter = vi.fn();
    render(
      <EntryControls variant="awaiting_entry" onEnter={onEnter} onSkip={vi.fn()} />
    );
    const button = screen.getByText("Enter Titan");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it("in_progress variant shows only Skip intro, and Escape triggers it", () => {
    const onSkip = vi.fn();
    render(
      <EntryControls variant="in_progress" onEnter={vi.fn()} onSkip={onSkip} />
    );
    expect(screen.queryByText("Enter Titan")).toBeFalsy();
    fireEvent.click(screen.getByText("Skip intro"));
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it("in_progress variant triggers skip on Escape keydown", () => {
    const onSkip = vi.fn();
    render(
      <EntryControls variant="in_progress" onEnter={vi.fn()} onSkip={onSkip} />
    );
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onSkip).toHaveBeenCalledTimes(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/brand-entry/EntryControls.test.tsx`
Expected: FAIL with "Cannot find module './EntryControls'"

- [ ] **Step 3: Write minimal implementation**

```tsx
// components/brand-entry/EntryControls.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import type { SoundPreference } from "./entryState";

interface EntryControlsProps {
  variant: "awaiting_entry" | "in_progress";
  onEnter: (sound: SoundPreference) => void;
  onSkip: () => void;
}

export function EntryControls({ variant, onEnter, onSkip }: EntryControlsProps) {
  const [sound, setSound] = useState<SoundPreference>("on");
  const enteredRef = useRef(false);

  useEffect(() => {
    if (variant !== "in_progress") return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onSkip();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [variant, onSkip]);

  if (variant === "in_progress") {
    return (
      <button
        type="button"
        onClick={onSkip}
        className="fixed bottom-6 right-6 z-[70] rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
      >
        Skip intro
      </button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (enteredRef.current) return;
            enteredRef.current = true;
            onEnter(sound);
          }}
          className="rounded-full bg-gradient-to-r from-cyan to-violet px-8 py-3 text-sm font-semibold text-black transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          Enter Titan
        </button>
        <button
          type="button"
          aria-label={sound === "on" ? "Turn sound off" : "Turn sound on"}
          onClick={() => setSound((s) => (s === "on" ? "muted" : "on"))}
          className="rounded-full border border-white/15 p-3 text-white/70 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
        >
          {sound === "on" ? "🔊" : "🔇"}
        </button>
      </div>
      <p className="text-xs text-white/50">
        {sound === "on" ? "Experience with spatial sound" : "Continue muted"}
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/brand-entry/EntryControls.test.tsx`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add components/brand-entry/EntryControls.tsx components/brand-entry/EntryControls.test.tsx
git commit -m "feat(brand-entry): add entry controls (Enter Titan, sound toggle, skip)"
```

---

### Task 6: `ReducedMotionReveal`

**Files:**
- Create: `components/brand-entry/ReducedMotionReveal.tsx`
- Test: `components/brand-entry/ReducedMotionReveal.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks (only the committed `/brand/titan-mark.svg` asset via `<img>`).
- Produces: `<ReducedMotionReveal onComplete={() => void} />`. Renders the full assembled mark, dissolves in (~300ms) → holds (~300ms) → calls `onComplete` (~700-900ms total). Used by `BrandEntryGate` for: `prefers-reduced-motion`, same-day return visits, and immediately after Skip (so skip still leaves the mark feeling "locked" rather than jump-cutting).

- [ ] **Step 1: Write the failing test**

```typescript
// components/brand-entry/ReducedMotionReveal.test.tsx
// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ReducedMotionReveal } from "./ReducedMotionReveal";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("ReducedMotionReveal", () => {
  it("renders the Titan mark image", () => {
    render(<ReducedMotionReveal onComplete={vi.fn()} />);
    expect(screen.getByAltText("Titan Pilot")).toBeTruthy();
  });

  it("calls onComplete once after the dissolve sequence finishes", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<ReducedMotionReveal onComplete={onComplete} />);
    vi.advanceTimersByTime(1300);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("does not call onComplete before the sequence finishes", () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<ReducedMotionReveal onComplete={onComplete} />);
    vi.advanceTimersByTime(200);
    expect(onComplete).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/brand-entry/ReducedMotionReveal.test.tsx`
Expected: FAIL with "Cannot find module './ReducedMotionReveal'"

- [ ] **Step 3: Write minimal implementation**

```tsx
// components/brand-entry/ReducedMotionReveal.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FADE_IN_MS = 300;
const HOLD_MS = 300;
const FADE_OUT_MS = 300;

interface ReducedMotionRevealProps {
  onComplete: () => void;
}

export function ReducedMotionReveal({ onComplete }: ReducedMotionRevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);
    const completeTimer = setTimeout(
      onComplete,
      FADE_IN_MS + HOLD_MS + FADE_OUT_MS
    );
    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-bg transition-opacity ease-out"
      style={{
        opacity: visible ? 0 : 1,
        transitionDuration: `${visible ? FADE_OUT_MS : FADE_IN_MS}ms`,
        transitionDelay: visible ? `${HOLD_MS}ms` : "0ms",
      }}
    >
      <Image
        src="/brand/titan-mark.svg"
        alt="Titan Pilot"
        width={156}
        height={143}
        priority
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_IN_MS}ms ease-out`,
        }}
      />
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/brand-entry/ReducedMotionReveal.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/brand-entry/ReducedMotionReveal.tsx components/brand-entry/ReducedMotionReveal.test.tsx
git commit -m "feat(brand-entry): add reduced-motion / short dissolve reveal"
```

---

### Task 7: `LogoAssemblyScene`

**Files:**
- Create: `components/brand-entry/LogoAssemblyScene.tsx`
- Test: `components/brand-entry/LogoAssemblyScene.test.tsx`

**Interfaces:**
- Consumes: the committed `public/brand/titan-mark.svg` (fetched at runtime, same-origin, no CSP change needed — see Global Constraints).
- Produces: `<LogoAssemblyScene onFragmentsAligned={() => void} onLocked={() => void} onError={() => void} playTick={() => void} playLockChime={() => void} />`. `BrandEntryGate` (Task 8) renders this only when `showFullSequence && !reducedMotion`, and passes `playTick`/`playLockChime` bound to the `AmbientSoundController` instance (or no-ops if sound is muted).

**Design note:** fetches the SVG as text, parses it with `DOMParser`, re-parents its 7 named fragment groups (`p-swoop`, `t-shape`, `arrow`, `candle-1..5`) into a live `<svg>` mounted via a ref, then drives each fragment through phases using the native `Element.animate()` (Web Animations API — a browser standard, not a library dependency) so each fragment is a real, independently-animatable DOM node. This avoids duplicating ~300 lines of path data into a second file. Fragment starting offsets are a **deterministic** function of fragment index (not `Math.random()`), matching the brief's "seeded arrangement, not different random chaos every load."

- [ ] **Step 1: Write the failing test**

```typescript
// components/brand-entry/LogoAssemblyScene.test.tsx
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render } from "@testing-library/react";
import { LogoAssemblyScene } from "./LogoAssemblyScene";

const FRAGMENT_IDS = [
  "p-swoop",
  "t-shape",
  "arrow",
  "candle-1",
  "candle-2",
  "candle-3",
  "candle-4",
  "candle-5",
];

const FAKE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 624 570">${FRAGMENT_IDS.map(
  (id) => `<g id="${id}"><path d="M0 0 L1 1 Z"/></g>`
).join("")}</svg>`;

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      text: () => Promise.resolve(FAKE_SVG),
    })
  );
  Element.prototype.animate = vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    cancel: vi.fn(),
  }) as unknown as typeof Element.prototype.animate;
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LogoAssemblyScene", () => {
  it("fetches and mounts all 7 fragments, then reports aligned and locked", async () => {
    const onFragmentsAligned = vi.fn();
    const onLocked = vi.fn();
    const { container } = render(
      <LogoAssemblyScene
        onFragmentsAligned={onFragmentsAligned}
        onLocked={onLocked}
        onError={vi.fn()}
        playTick={vi.fn()}
        playLockChime={vi.fn()}
      />
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    for (const id of FRAGMENT_IDS) {
      expect(container.querySelector(`#${id}`)).toBeTruthy();
    }
    expect(onFragmentsAligned).toHaveBeenCalled();
    expect(onLocked).toHaveBeenCalled();
  });

  it("calls onError and does not throw if fetch fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("network down"))
    );
    const onError = vi.fn();
    render(
      <LogoAssemblyScene
        onFragmentsAligned={vi.fn()}
        onLocked={vi.fn()}
        onError={onError}
        playTick={vi.fn()}
        playLockChime={vi.fn()}
      />
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(onError).toHaveBeenCalled();
  });

  it("marks the scene container aria-hidden (decorative)", async () => {
    const { container } = render(
      <LogoAssemblyScene
        onFragmentsAligned={vi.fn()}
        onLocked={vi.fn()}
        onError={vi.fn()}
        playTick={vi.fn()}
        playLockChime={vi.fn()}
      />
    );
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/brand-entry/LogoAssemblyScene.test.tsx`
Expected: FAIL with "Cannot find module './LogoAssemblyScene'"

- [ ] **Step 3: Write minimal implementation**

```tsx
// components/brand-entry/LogoAssemblyScene.tsx
"use client";

import { useEffect, useRef } from "react";

const FRAGMENT_IDS = [
  "p-swoop",
  "t-shape",
  "arrow",
  "candle-1",
  "candle-2",
  "candle-3",
  "candle-4",
  "candle-5",
] as const;

const DORMANT_MS = 700;
const ALIGN_MS = 1300;
const LOCK_MS = 800;
const STAGGER_MS = 70;

interface LogoAssemblyProps {
  onFragmentsAligned: () => void;
  onLocked: () => void;
  onError: () => void;
  playTick: () => void;
  playLockChime: () => void;
}

// Deterministic scatter offset per fragment index — same arrangement every
// load, not a fresh Math.random() each time.
function scatterFor(index: number) {
  const angle = (index / FRAGMENT_IDS.length) * Math.PI * 2;
  return {
    x: Math.cos(angle) * 90,
    y: Math.sin(angle) * 60 - 40,
    z: -180 - index * 12,
    rotate: (index % 2 === 0 ? 1 : -1) * (18 + index * 6),
  };
}

export function LogoAssemblyScene({
  onFragmentsAligned,
  onLocked,
  onError,
  playTick,
  playLockChime,
}: LogoAssemblyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    async function run() {
      try {
        const response = await fetch("/brand/titan-mark.svg");
        const svgText = await response.text();
        const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
        const svgEl = doc.querySelector("svg");
        if (!svgEl || !containerRef.current) throw new Error("invalid svg");
        if (cancelledRef.current) return;

        containerRef.current.innerHTML = "";
        const imported = document.importNode(svgEl, true);
        imported.setAttribute("style", "width: 100%; height: 100%;");
        containerRef.current.appendChild(imported);

        const fragments = FRAGMENT_IDS.map((id) =>
          imported.querySelector<SVGGElement>(`#${id}`)
        );
        if (fragments.some((el) => !el)) throw new Error("missing fragment");

        // Phase 1: dormant — scatter each fragment, invisible at first.
        fragments.forEach((el, index) => {
          const scatter = scatterFor(index);
          el!.style.transformBox = "fill-box";
          el!.style.transformOrigin = "center";
          el!.style.transform = `translate3d(${scatter.x}px, ${scatter.y}px, ${scatter.z}px) rotate(${scatter.rotate}deg)`;
          el!.style.opacity = "0";
        });

        await new Promise((resolve) => setTimeout(resolve, DORMANT_MS));
        if (cancelledRef.current) return;

        // Phase 2: alignment — staggered arrival at home position.
        const arrivals = fragments.map((el, index) => {
          const scatter = scatterFor(index);
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              if (cancelledRef.current || !el) return resolve();
              playTick();
              const animation = el.animate(
                [
                  {
                    transform: `translate3d(${scatter.x}px, ${scatter.y}px, ${scatter.z}px) rotate(${scatter.rotate}deg)`,
                    opacity: 0,
                  },
                  { transform: "translate3d(0, 0, 0) rotate(0deg)", opacity: 1 },
                ],
                { duration: ALIGN_MS - index * STAGGER_MS, easing: "cubic-bezier(0.21,0.47,0.32,0.98)", fill: "forwards" }
              );
              el.style.opacity = "1";
              animation.finished.then(() => resolve()).catch(() => resolve());
            }, index * STAGGER_MS);
          });
        });
        await Promise.all(arrivals);
        if (cancelledRef.current) return;
        onFragmentsAligned();

        // Phase 3: mantling / lock — brief confirmation pulse.
        playLockChime();
        const container = containerRef.current;
        if (container) {
          const pulse = container.animate(
            [{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }],
            { duration: LOCK_MS, easing: "ease-out" }
          );
          await pulse.finished.catch(() => undefined);
        } else {
          await new Promise((resolve) => setTimeout(resolve, LOCK_MS));
        }
        if (cancelledRef.current) return;
        onLocked();
      } catch {
        if (!cancelledRef.current) onError();
      }
    }

    void run();

    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      style={{
        width: "min(70vw, 420px)",
        height: "min(70vw, 420px)",
        perspective: "800px",
      }}
    />
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/brand-entry/LogoAssemblyScene.test.tsx`
Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
git add components/brand-entry/LogoAssemblyScene.tsx components/brand-entry/LogoAssemblyScene.test.tsx
git commit -m "feat(brand-entry): add logo fragment assembly scene"
```

---

### Task 8: `BrandEntryGate` orchestrator

**Files:**
- Create: `components/brand-entry/BrandEntryGate.tsx`
- Test: `components/brand-entry/BrandEntryGate.test.tsx`

**Interfaces:**
- Consumes: `useEntryExperience` (Task 3), `AmbientSoundController` (Task 4), `EntryControls` (Task 5), `ReducedMotionReveal` (Task 6), `LogoAssemblyScene` (Task 7).
- Produces: `<BrandEntryGate />` — no props, mounted once in `app/layout.tsx` (Task 9). Manages: which visual to render per phase, body scroll lock, `#site-content` `inert` toggling, focus restoration on complete, `AmbientSoundController` lifecycle, and an `intro_completed` / `intro_skipped` / `intro_failed` analytics event via the existing `track()` pattern from `@vercel/analytics`.

- [ ] **Step 1: Write the failing test**

```typescript
// components/brand-entry/BrandEntryGate.test.tsx
// @vitest-environment jsdom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrandEntryGate } from "./BrandEntryGate";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

beforeAll(() => {
  class MockIntersectionObserver {
    observe = () => {};
    unobserve = () => {};
    disconnect = () => {};
    takeRecords = () => [];
  }
  // @ts-expect-error jsdom has no IntersectionObserver
  window.IntersectionObserver = MockIntersectionObserver;
});

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
  document.body.innerHTML = '<div id="site-content"></div>';
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("BrandEntryGate", () => {
  it("shows the Enter Titan control once mounted, and locks body scroll", async () => {
    render(<BrandEntryGate />);
    await act(async () => {});
    expect(screen.getByText("Enter Titan")).toBeTruthy();
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("does not mount the assembly scene while awaiting the entry gesture", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("should not be called")));
    render(<BrandEntryGate />);
    await act(async () => {});
    expect(screen.getByText("Enter Titan")).toBeTruthy();
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it("skipping removes body scroll lock and clears #site-content inert", async () => {
    render(<BrandEntryGate />);
    await act(async () => {});
    fireEvent.click(screen.getByText("Enter Titan"));
    await act(async () => {});
    fireEvent.keyDown(window, { key: "Escape" });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1300));
    });
    expect(document.body.style.overflow).toBe("");
    expect(
      document.getElementById("site-content")?.hasAttribute("inert")
    ).toBe(false);
  });

  it("a same-day return visit auto-continues without showing Enter Titan", async () => {
    window.localStorage.setItem("titan_intro_version", "1");
    window.localStorage.setItem(
      "titan_intro_last_seen",
      new Date().toISOString().slice(0, 10)
    );
    render(<BrandEntryGate />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1300));
    });
    expect(screen.queryByText("Enter Titan")).toBeFalsy();
    expect(document.body.style.overflow).toBe("");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run components/brand-entry/BrandEntryGate.test.tsx`
Expected: FAIL with "Cannot find module './BrandEntryGate'"

**Visual resolution logic:** the phase enum alone is not enough to decide what
to render — a return visit (`showFullSequence === false`) must skip the
gesture screen entirely and auto-continue (no click, no audio, since there
was no gesture to unlock audio with), while `reducedMotion === true` on a
*first* visit still shows the gesture screen but swaps the scene for the
dissolve. `resolveVisual` makes this an explicit, testable function rather
than inline JSX conditions (which is where the bug below was caught):

```typescript
type Visual = "none" | "awaiting_entry" | "scene" | "dissolve";

function resolveVisual(
  phase: EntryState["phase"],
  showFullSequence: boolean,
  reducedMotion: boolean
): Visual {
  if (phase === "checking" || phase === "complete") return "none";
  if (phase === "awaiting_entry") {
    // Return visits never show the gesture screen — they auto-continue.
    return showFullSequence ? "awaiting_entry" : "dissolve";
  }
  if (phase === "skipped" || phase === "failed") return "dissolve";
  // assembling / locked / revealing
  return showFullSequence && !reducedMotion ? "scene" : "dissolve";
}
```

- [ ] **Step 3: Write minimal implementation**

```tsx
// components/brand-entry/BrandEntryGate.tsx
"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { useEntryExperience } from "./useEntryExperience";
import { EntryControls } from "./EntryControls";
import { ReducedMotionReveal } from "./ReducedMotionReveal";
import { LogoAssemblyScene } from "./LogoAssemblyScene";
import { AmbientSoundController } from "./AmbientSoundController";
import { setSoundPreference } from "./entryStorage";
import type { EntryState } from "./entryState";

type Visual = "none" | "awaiting_entry" | "scene" | "dissolve";

function resolveVisual(
  phase: EntryState["phase"],
  showFullSequence: boolean,
  reducedMotion: boolean
): Visual {
  if (phase === "checking" || phase === "complete") return "none";
  if (phase === "awaiting_entry") {
    return showFullSequence ? "awaiting_entry" : "dissolve";
  }
  if (phase === "skipped" || phase === "failed") return "dissolve";
  return showFullSequence && !reducedMotion ? "scene" : "dissolve";
}

export function BrandEntryGate() {
  const { state, mounted, showFullSequence, dispatch } = useEntryExperience();
  const soundRef = useRef<AmbientSoundController | null>(null);
  const autoContinuedRef = useRef(false);

  const visual = mounted
    ? resolveVisual(state.phase, showFullSequence, state.reducedMotion)
    : "none";
  const isOverlayActive = mounted && state.phase !== "complete";

  useEffect(() => {
    const siteContent = document.getElementById("site-content");
    if (isOverlayActive) {
      document.body.style.overflow = "hidden";
      siteContent?.setAttribute("inert", "");
    } else {
      document.body.style.overflow = "";
      siteContent?.removeAttribute("inert");
    }
  }, [isOverlayActive]);

  // Return visits (visual === "dissolve" while phase is still
  // "awaiting_entry") never got a real gesture — auto-continue with sound
  // muted rather than waiting for a click that will never come.
  useEffect(() => {
    if (
      visual === "dissolve" &&
      state.phase === "awaiting_entry" &&
      !autoContinuedRef.current
    ) {
      autoContinuedRef.current = true;
      dispatch({ type: "ENTER", sound: "muted" });
    }
  }, [visual, state.phase, dispatch]);

  useEffect(() => {
    if (state.phase !== "complete" && state.phase !== "skipped" && state.phase !== "failed") {
      return;
    }
    try {
      track(
        state.phase === "complete"
          ? "intro_completed"
          : state.phase === "skipped"
            ? "intro_skipped"
            : "intro_failed"
      );
    } catch {
      // analytics must never block the reveal
    }
    soundRef.current?.dispose();
    soundRef.current = null;
  }, [state.phase]);

  useEffect(() => {
    if (state.phase === "complete") {
      document.getElementById("main-content")?.focus();
    }
  }, [state.phase]);

  useEffect(() => {
    return () => {
      soundRef.current?.dispose();
    };
  }, []);

  function handleEnter(sound: "on" | "muted") {
    setSoundPreference(sound);
    dispatch({ type: "ENTER", sound });
    if (sound === "on") {
      const controller = new AmbientSoundController();
      soundRef.current = controller;
      void controller.start();
    }
  }

  function handleSkip() {
    dispatch({ type: "SKIP" });
  }

  function handleSettleComplete() {
    dispatch({ type: "REVEAL_COMPLETE" });
  }

  if (visual === "none") return null;

  return (
    <div
      role="dialog"
      aria-label="Titan Pilot entry sequence"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bg"
    >
      {visual === "awaiting_entry" && (
        <EntryControls variant="awaiting_entry" onEnter={handleEnter} onSkip={handleSkip} />
      )}

      {visual === "scene" && (
        <>
          <LogoAssemblyScene
            onFragmentsAligned={() => dispatch({ type: "FRAGMENTS_ALIGNED" })}
            onLocked={() => {
              soundRef.current?.duckForReveal();
              dispatch({ type: "LOCKED" });
              setTimeout(() => dispatch({ type: "REVEAL_COMPLETE" }), 400);
            }}
            onError={() => dispatch({ type: "FAIL" })}
            playTick={() => soundRef.current?.tick()}
            playLockChime={() => soundRef.current?.lockChime()}
          />
          <EntryControls variant="in_progress" onEnter={handleEnter} onSkip={handleSkip} />
        </>
      )}

      {visual === "dissolve" && <ReducedMotionReveal onComplete={handleSettleComplete} />}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run components/brand-entry/BrandEntryGate.test.tsx`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add components/brand-entry/BrandEntryGate.tsx components/brand-entry/BrandEntryGate.test.tsx
git commit -m "feat(brand-entry): add BrandEntryGate orchestrator"
```

---

### Task 9: Integrate into the site

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: `BrandEntryGate` from `components/brand-entry/BrandEntryGate`.
- Produces: nothing new — this is the final wiring task.

- [ ] **Step 1: Wrap `{children}` in `#site-content` and mount the gate**

In `app/layout.tsx`, add the import and change the `<body>` contents:

```typescript
import { BrandEntryGate } from "@/components/brand-entry/BrandEntryGate";
```

Replace:

```tsx
      <body className="antialiased bg-bg text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
```

with:

```tsx
      <body className="antialiased bg-bg text-white">
        <BrandEntryGate />
        <div id="site-content">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
```

- [ ] **Step 2: Add a focus target on the homepage's `<main>`**

In `app/page.tsx`, change:

```tsx
      <main>
```

to:

```tsx
      <main id="main-content" tabIndex={-1} className="outline-none">
```

(`tabIndex={-1}` makes it programmatically focusable without adding it to the natural tab order; `outline-none` avoids an unwanted visible ring on this specific programmatic focus while the browser's default focus-visible behavior for real keyboard tabbing elsewhere is untouched.)

- [ ] **Step 3: Add a discreet "Replay intro" link**

Read `components/Footer.tsx` first to find its existing link list, then add one link matching the existing list-item pattern (do not restructure the file — fold the new item into whatever list already renders the other footer links). The link must not sit in the primary navigation:

```tsx
<button
  type="button"
  onClick={() => {
    window.localStorage.removeItem("titan_intro_last_seen");
    window.location.reload();
  }}
  className="text-xs text-white/40 transition hover:text-white/70"
>
  Replay intro
</button>
```

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: PASS — all existing tests plus the 9 new brand-entry test files.

- [ ] **Step 5: Run typecheck, lint, and build**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: all three succeed with no errors.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/page.tsx components/Footer.tsx
git commit -m "feat(brand-entry): mount BrandEntryGate in root layout"
```

---

## Post-Implementation Phase

After Task 9, before opening the PR:

1. **Manual QA via chrome-devtools MCP** against a local production build (`npm run build && npm run start` — recall `npm run dev` throws under this repo's CSP since `middleware.ts`'s `script-src` lacks `unsafe-eval`, breaking Fast Refresh):
   - Screenshot: dismantled/dormant state, mid-alignment, locked mark, website revealed, sound-on entry, muted entry, reduced-motion path (emulate via DevTools), mobile viewport, full homepage after reveal.
   - Lighthouse accessibility/SEO/best-practices audit (desktop + mobile).
   - Performance trace: confirm LCP/CLS have not regressed past the baseline (LCP 171ms, CLS 0.00, First Load JS 177kB) — check the new bundle's added JS size via `npm run build` output.
   - Verify: Escape skips instantly; body scroll restores; `#site-content` inert is removed on complete; no duplicate `AudioContext` created on rapid double-click; same-day reload doesn't replay the full sequence; a version bump (manually edit `INTRO_VERSION` temporarily) does replay it.
2. **Accessibility spot-check:** keyboard-only run-through (Tab to Enter Titan, Enter/Space activates, Escape skips, focus lands on `#main-content` afterward without stealing focus from a user who used the mouse), 200% zoom, `prefers-reduced-motion` emulation in DevTools.
3. **Claims/content check:** confirm no homepage copy changed outside `app/layout.tsx`'s body wrapper, `app/page.tsx`'s `<main>` tag, and the new Footer link — this feature adds no new public claims.
4. **Write the PR body** with: implementation summary, rendering-strategy rationale (SVG/CSS/WAAPI over WebGL — see Global Constraints), animation timeline, audio-source statement (synthesized, no files, no licensing surface), autoplay-policy handling, accessibility behavior, reduced-motion behavior, performance before/after, bundle impact, screenshots, browser-testing note (this repo has no Playwright; QA was performed via chrome-devtools MCP against Chromium — Firefox/WebKit were not automated-tested; flag this as a scope note, not a silent gap), residual risks.
5. **Open the PR. Do not merge.** Per the brief: hold for owner visual approval on screenshots before any merge/deploy.

## Self-Review Notes (mapping brief sections to tasks)

- §1 (inspect, identify logo, produce short plan): done in the prior conversation turn — inventory + vectorization + short plan already delivered and committed before this plan was written.
- §2 (core experience, phases 0–4): Task 7 (`LogoAssemblyScene`) implements phases 1–3; Task 8 (`BrandEntryGate`) sequences phase 0 (immediate dark shell — the gate itself renders instantly, no loading state) and phase 4 (reveal via `REVEAL_COMPLETE` → `null` render).
- §3 (user gesture / entry flow): Task 5 (`EntryControls`) + Task 8 (`AudioContext` created only inside `handleEnter`).
- §4 (AI room sound design): Task 4 (`AmbientSoundController`), synthesized per Global Constraints.
- §5 (first visit / return visits / replay): Task 2 (`entryStorage`) + Task 9 Step 3 (Replay intro link).
- §6 (skip/escape/failure): Task 5 (Escape + Skip button) + Task 7's `onError` + Task 8's `FAIL` handling.
- §7 (reduced motion / accessibility): Task 3 (`reducedMotion` detection) + Task 6 (`ReducedMotionReveal`) + Task 8 (`inert`/scroll-lock/focus).
- §8 (visual design spec): Task 7's fragment choreography (dark palette, brand-token gradient already baked into the committed SVG, restrained camera/lighting via CSS transforms only).
- §9 (website reveal integration): Task 9 (layout wiring, `#main-content` focus target, no route/deep-link redirection — the gate mounts site-wide in the root layout so it behaves identically regardless of entry route).
- §10 (performance budget): Global Constraints + Post-Implementation Phase step 1.
- §11 (security/privacy): no external hosts, no new deps, no CSP changes, no mic/fingerprinting — verified in Global Constraints.
- §12 (responsive): `LogoAssemblyScene`'s container is `min(70vw, 420px)` — scales down naturally on mobile; no device-specific fork needed since the fragment count/complexity is fixed and lightweight (CSS transforms, not per-device-tier canvas work).
- §13 (architecture): File Structure section above; state machine in Task 1 with explicit, idempotent transitions (terminal-phase guard in `entryReducer`).
- §14 (sound control after reveal): out of scope for this pass per the brief's own emphasis on the *entry* sequence — deferred; noted as a residual risk/follow-up in the PR body rather than silently added, since a persistent post-reveal mute control is a small separate UI surface (e.g. header utility icon) that touches already-approved header content and deserves its own owner sign-off.
- §15 (testing): Tasks 1–9 each include Vitest+RTL tests; Post-Implementation Phase covers manual accessibility/visual/performance QA; Playwright is explicitly not introduced (flagged as a scope note, not silently skipped).
- §16 (acceptance criteria): covered by Post-Implementation Phase QA checklist.
- §17 (delivery workflow): baseline captured, branch created, this plan, then subagent-driven-development execution, then PR held for approval — matches exactly.
- §18 (design review questions): addressed via the deterministic (non-random) scatter, the committed fidelity-proven mark, the 3.8s-ish full sequence, the synthesized restrained audio, the fail-open/skip guarantees.
