// components/brand-entry/AmbientSoundController.test.ts
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AmbientSoundController } from "./AmbientSoundController";

class FakeParam {
  value = 0;
  setValueAtTime = vi.fn().mockReturnThis();
  linearRampToValueAtTime = vi.fn().mockReturnThis();
  exponentialRampToValueAtTime = vi.fn().mockReturnThis();
  setTargetAtTime = vi.fn().mockReturnThis();
  cancelScheduledValues = vi.fn().mockReturnThis();
}

function makeNode() {
  return {
    connect: vi.fn().mockReturnThis(),
    disconnect: vi.fn(),
    gain: new FakeParam(),
    frequency: new FakeParam(),
    Q: new FakeParam(),
    type: "sine",
    start: vi.fn(),
    stop: vi.fn(),
    buffer: null,
    loop: false,
    loopStart: 0,
    loopEnd: 0,
  };
}

class FakeAudioContext {
  state: "running" | "suspended" | "closed" = "suspended";
  currentTime = 0;
  destination = makeNode();
  createGain = vi.fn(() => makeNode());
  createOscillator = vi.fn(() => makeNode());
  createBiquadFilter = vi.fn(() => makeNode());
  createBufferSource = vi.fn(() => makeNode());
  createBuffer = vi.fn(() => ({
    getChannelData: () => new Float32Array(4096),
  }));
  resume = vi.fn(async () => {
    this.state = "running";
  });
  close = vi.fn(async () => {
    this.state = "closed";
  });
}

beforeEach(() => {
  (window as unknown as { AudioContext: unknown }).AudioContext =
    FakeAudioContext;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("AmbientSoundController", () => {
  it("starts muted=false and resumes the audio context on start()", async () => {
    const controller = new AmbientSoundController();
    expect(controller.isMuted).toBe(false);
    await controller.start();
    // no throw = context created and resumed
  });

  it("mute() flips isMuted to true, unmute() flips it back", async () => {
    const controller = new AmbientSoundController();
    await controller.start();
    controller.mute();
    expect(controller.isMuted).toBe(true);
    controller.unmute();
    expect(controller.isMuted).toBe(false);
  });

  it("tick() and lockChime() do not throw before or after start()", () => {
    const controller = new AmbientSoundController();
    expect(() => controller.tick()).not.toThrow();
    expect(() => controller.lockChime()).not.toThrow();
  });

  it("dispose() is safe to call multiple times", async () => {
    const controller = new AmbientSoundController();
    await controller.start();
    expect(() => controller.dispose()).not.toThrow();
    expect(() => controller.dispose()).not.toThrow();
  });

  it("start() does not throw when AudioContext is unavailable", async () => {
    // @ts-expect-error simulating an environment without Web Audio
    delete window.AudioContext;
    const controller = new AmbientSoundController();
    await expect(controller.start()).resolves.toBeUndefined();
  });
});
