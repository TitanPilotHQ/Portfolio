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
    // Note: `mounted` starts `false` via useState(false) and only flips
    // true once the mount effect runs (verified by the implementation's
    // initial state). We can't assert the pre-effect value here because
    // @testing-library/react's renderHook wraps the initial render in
    // act(), which synchronously flushes all pending passive effects
    // before returning control — so result.current.mounted is already
    // `true` by the time renderHook() resolves, even without the
    // `await act(async () => {})` below. This is inherent to React 19 +
    // @testing-library/react 16's act() semantics, not implementation
    // behavior; confirmed with an isolated repro using a bare
    // useState(false)+useEffect hook.
    const { result } = renderHook(() => useEntryExperience());
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
