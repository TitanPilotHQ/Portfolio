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
  const outcomeRecordedRef = useRef(false);

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
    // "skipped" and "failed" both eventually transition to "complete" once
    // their dissolve fires REVEAL_COMPLETE (see entryState.ts). That's
    // required so the overlay tears down, but it means this effect runs
    // twice for a skip/fail: once on "skipped"/"failed", again later on
    // "complete". Outcomes are mutually exclusive, so only the first one
    // reached is ever recorded.
    if (!outcomeRecordedRef.current) {
      outcomeRecordedRef.current = true;
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
