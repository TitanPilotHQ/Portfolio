"use client";

export function ReplayIntroButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem("titan_intro_last_seen");
        window.location.reload();
      }}
      className="text-xs text-white/40 transition hover:text-white/70"
    >
      Replay intro
    </button>
  );
}
