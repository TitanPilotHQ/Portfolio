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
      <p className="text-xs text-white/70">
        {sound === "on" ? "Experience with spatial sound" : "Continue muted"}
      </p>
    </div>
  );
}
