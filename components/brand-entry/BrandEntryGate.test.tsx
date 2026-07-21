// components/brand-entry/BrandEntryGate.test.tsx
// @vitest-environment jsdom
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { track } from "@vercel/analytics";
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

  it("skipping records intro_skipped exactly once and never records intro_completed", async () => {
    // Keep the assembly scene mounted (never resolving) so the real
    // "Skip intro" affordance — which only listens for Escape while the
    // scene is in progress — has something to skip out of, instead of
    // racing a synchronous fetch failure into the FAIL path.
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));
    // vi.restoreAllMocks() (afterEach) does not clear call history recorded
    // by other tests against this module-level mock — clear it explicitly
    // so this assertion only reflects this test's render.
    (track as ReturnType<typeof vi.fn>).mockClear();
    render(<BrandEntryGate />);
    await act(async () => {});
    fireEvent.click(screen.getByText("Enter Titan"));
    await act(async () => {});
    fireEvent.keyDown(window, { key: "Escape" });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1300));
    });
    // "skipped" transitions to "complete" once the skip dissolve finishes
    // (so the overlay tears down), but the outcome must only be recorded
    // once — as a skip, not also as a completion.
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith("intro_skipped");
    expect(track).not.toHaveBeenCalledWith("intro_completed");
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
