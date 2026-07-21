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
    // Real setTimeout-based phases (DORMANT_MS + per-fragment stagger) need
    // actual wall-clock time to elapse before onFragmentsAligned/onLocked
    // fire, even though Element.prototype.animate is mocked to resolve
    // instantly. 2000ms comfortably covers the ~1.2s worst case with margin.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
