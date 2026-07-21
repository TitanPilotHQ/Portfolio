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
