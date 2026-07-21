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

// "complete" is the only truly terminal phase. "skipped" and "failed" are
// exit *reasons*, not dead ends — BrandEntryGate still renders a dissolve
// for them and depends on the follow-up REVEAL_COMPLETE (fired when that
// dissolve finishes) to reach "complete" and release the scroll lock /
// #site-content inert toggle. Blocking that dispatch would leave the site
// permanently locked after a skip or an assembly failure.
const TERMINAL_PHASES: readonly EntryPhase[] = ["complete"];

// Phases from which a dissolve/reveal visual is mounted and may legitimately
// signal completion: the full scene's final "revealing" step, the reduced-
// motion / return-visit dissolve (which never advances past "assembling"),
// and the "skipped" / "failed" exit dissolves.
const REVEAL_COMPLETABLE_PHASES: readonly EntryPhase[] = [
  "assembling",
  "locked",
  "revealing",
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
      if (!REVEAL_COMPLETABLE_PHASES.includes(state.phase)) return state;
      return { ...state, phase: "complete" };
    case "SKIP":
      return { ...state, phase: "skipped" };
    case "FAIL":
      return { ...state, phase: "failed" };
    default:
      return state;
  }
}
