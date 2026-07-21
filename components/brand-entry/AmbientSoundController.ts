// components/brand-entry/AmbientSoundController.ts
const ROOM_TONE_GAIN = 0.12; // restrained: spec range 0.08-0.16
const REVEAL_DUCK_GAIN = 0.05;
const FADE_SECONDS = 0.6;

function buildNoiseBuffer(ctx: AudioContext, seconds: number): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const fadeSamples = Math.floor(ctx.sampleRate * 0.04); // 40ms fade each end
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
    if (i < fadeSamples) data[i] *= i / fadeSamples;
    if (i >= length - fadeSamples) data[i] *= (length - i) / fadeSamples;
  }
  return buffer;
}

export class AmbientSoundController {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private roomSource: AudioBufferSourceNode | null = null;
  private lfo: OscillatorNode | null = null;
  private started = false;
  private muted = false;

  get isMuted(): boolean {
    return this.muted;
  }

  async start(): Promise<void> {
    if (this.started) return;
    const AudioContextCtor =
      typeof window !== "undefined"
        ? (window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext })
              .webkitAudioContext)
        : undefined;
    if (!AudioContextCtor) return; // fail-open: no Web Audio support, stay silent

    try {
      this.ctx = new AudioContextCtor();
      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0;
      this.masterGain.connect(this.ctx.destination);

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;
      filter.connect(this.masterGain);

      this.roomSource = this.ctx.createBufferSource();
      this.roomSource.buffer = buildNoiseBuffer(this.ctx, 4);
      this.roomSource.loop = true;
      this.roomSource.connect(filter);
      this.roomSource.start();

      // slow LFO for "faint spatial movement" on the room tone gain
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.value = 0.05;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.02;
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.masterGain.gain);
      this.lfo.start();

      this.masterGain.gain.setTargetAtTime(
        ROOM_TONE_GAIN,
        this.ctx.currentTime,
        FADE_SECONDS
      );
      this.started = true;
    } catch {
      // fail-open: any Web Audio error means the intro continues silently
      this.started = false;
    }
  }

  tick(): void {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.02);
      gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // ignore — a missed tick is inaudible and non-critical
    }
  }

  lockChime(): void {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = 440;
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.9);
    } catch {
      // ignore
    }
  }

  duckForReveal(): void {
    if (!this.ctx || !this.masterGain || this.muted) return;
    try {
      this.masterGain.gain.setTargetAtTime(
        REVEAL_DUCK_GAIN,
        this.ctx.currentTime,
        FADE_SECONDS
      );
    } catch {
      // fail-open: any Web Audio error means the intro continues silently
    }
  }

  mute(): void {
    this.muted = true;
    if (this.ctx && this.masterGain) {
      try {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      } catch {
        // fail-open: any Web Audio error means the intro continues silently
      }
    }
  }

  unmute(): void {
    this.muted = false;
    if (this.ctx && this.masterGain) {
      try {
        this.masterGain.gain.setTargetAtTime(
          REVEAL_DUCK_GAIN,
          this.ctx.currentTime,
          0.3
        );
      } catch {
        // fail-open: any Web Audio error means the intro continues silently
      }
    }
  }

  dispose(): void {
    try {
      this.roomSource?.stop();
    } catch {
      // already stopped
    }
    try {
      this.lfo?.stop();
    } catch {
      // already stopped
    }
    this.roomSource?.disconnect();
    this.lfo?.disconnect();
    this.masterGain?.disconnect();
    if (this.ctx && this.ctx.state !== "closed") {
      this.ctx.close().catch(() => {
        // fail-open: a rejected close() must not surface as an unhandled rejection
      });
    }
    this.roomSource = null;
    this.lfo = null;
    this.masterGain = null;
    this.ctx = null;
    this.started = false;
  }
}
