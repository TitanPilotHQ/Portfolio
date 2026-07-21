"use client";

export function ReplayIntroButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.localStorage.removeItem("titan_intro_last_seen");
        window.location.reload();
      }}
      className="text-xs text-white/70 transition hover:text-white"
    >
      Replay intro
    </button>
  );
}
