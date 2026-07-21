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
