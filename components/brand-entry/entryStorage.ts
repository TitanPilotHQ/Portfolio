import type { SoundPreference } from "./entryState";

export const INTRO_VERSION = "1";

const VERSION_KEY = "titan_intro_version";
const LAST_SEEN_KEY = "titan_intro_last_seen";
const SOUND_KEY = "titan_sound_preference";

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function safeGetItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Private browsing / storage disabled: fail silently, intro just
    // won't persist across visits.
  }
}

export function shouldShowFullIntro(now: Date): boolean {
  const storedVersion = safeGetItem(VERSION_KEY);
  const storedLastSeen = safeGetItem(LAST_SEEN_KEY);
  if (storedVersion !== INTRO_VERSION) return true;
  if (storedLastSeen !== dateKey(now)) return true;
  return false;
}

export function recordIntroSeen(now: Date): void {
  safeSetItem(VERSION_KEY, INTRO_VERSION);
  safeSetItem(LAST_SEEN_KEY, dateKey(now));
}

export function getSoundPreference(): SoundPreference {
  const stored = safeGetItem(SOUND_KEY);
  return stored === "muted" ? "muted" : "on";
}

export function setSoundPreference(pref: SoundPreference): void {
  safeSetItem(SOUND_KEY, pref);
}
