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
