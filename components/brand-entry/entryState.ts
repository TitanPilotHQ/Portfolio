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
