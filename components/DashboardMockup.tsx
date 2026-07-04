"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Activity, Lock, ShieldCheck } from "lucide-react";
import { useRef, type MouseEvent as ReactMouseEvent } from "react";

const CANDLES = [
  { h: 34, y: 46, up: true },
  { h: 22, y: 58, up: false },
  { h: 40, y: 38, up: true },
  { h: 28, y: 44, up: true },
  { h: 18, y: 56, up: false },
  { h: 44, y: 30, up: true },
  { h: 30, y: 36, up: true },
  { h: 24, y: 48, up: false },
  { h: 48, y: 22, up: true },
  { h: 36, y: 28, up: true },
  { h: 26, y: 40, up: false },
  { h: 52, y: 14, up: true },
  { h: 38, y: 22, up: true },
  { h: 44, y: 12, up: true },
];

const AGENTS = [
  { name: "Analyst", verdict: "Bullish", tone: "text-cyan" },
  { name: "Devil's Advocate", verdict: "Cautiously Bullish", tone: "text-amber" },
  { name: "Risk Manager", verdict: "Approved", tone: "text-success" },
];

export function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [6, -6]), {
    stiffness: 160,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), {
    stiffness: 160,
    damping: 20,
  });

  function onMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="relative"
      aria-hidden
    >
      {/* Ambient glow behind panel */}
      <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-tr from-azure/20 via-cyan/10 to-violet/20 blur-3xl" />

      <div className="glass-strong animate-float relative overflow-hidden rounded-2xl shadow-2xl">
        {/* Scanline sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-scan absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan/[0.04] to-transparent" />
        </div>

        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-secondary">
            TITAN <span className="text-white/30">·</span> COCKPIT
          </div>
          <div className="flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1">
            <span className="animate-ticker size-1.5 rounded-full bg-cyan" />
            <span className="font-mono text-[10px] tracking-widest text-cyan">
              LIVE SHADOW MODE
            </span>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-5">
          {/* Chart */}
          <div className="rounded-xl border border-white/5 bg-bg/60 p-4 sm:col-span-3">
            <div className="mb-3 flex items-baseline justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                  Market Overview
                </p>
                <p className="mt-1 text-lg font-semibold">EURUSD</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xl text-white">1.08245</p>
                <p className="font-mono text-[11px] text-success">+0.00136 (+0.13%)</p>
              </div>
            </div>
            <svg viewBox="0 0 300 90" className="h-24 w-full" role="img">
              {CANDLES.map((c, i) => (
                <g key={i} transform={`translate(${8 + i * 21}, 0)`}>
                  <line
                    x1="6"
                    x2="6"
                    y1={c.y - 8}
                    y2={c.y + c.h + 8}
                    stroke={c.up ? "#00d7ff55" : "#a855f755"}
                    strokeWidth="1.5"
                  />
                  <motion.rect
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.8 + i * 0.06, duration: 0.5 }}
                    style={{ originY: 1, transformBox: "fill-box" }}
                    x="1"
                    y={c.y}
                    width="10"
                    height={c.h}
                    rx="2"
                    fill={c.up ? "#00d7ff" : "#a855f7"}
                    opacity={c.up ? 0.85 : 0.65}
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* AI score */}
          <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-bg/60 p-4 sm:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              AI Analysis Score
            </p>
            <div className="relative mx-auto my-2 size-24">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#111827" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - 0.78) }}
                  transition={{ delay: 1.1, duration: 1.4, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#00d7ff" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-2xl font-semibold text-white">78</span>
                <span className="font-mono text-[9px] text-secondary">/100</span>
              </div>
            </div>
            <p className="text-center font-mono text-[10px] tracking-widest text-cyan">
              HIGH CONVICTION THESIS
            </p>
          </div>

          {/* Status tiles */}
          <div className="grid grid-cols-2 gap-3 sm:col-span-3">
            <div className="rounded-xl border border-success/20 bg-success/5 p-3.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-success" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                  Risk Status
                </p>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-success">LOW</p>
              <p className="font-mono text-[10px] text-secondary">All systems normal</p>
            </div>
            <div className="rounded-xl border border-cyan/20 bg-cyan/5 p-3.5">
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-cyan" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                  Capital Protection
                </p>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-cyan">ACTIVE</p>
              <p className="font-mono text-[10px] text-secondary">All limits enforced</p>
            </div>
          </div>

          {/* Recent signal */}
          <div className="rounded-xl border border-white/5 bg-bg/60 p-3.5 sm:col-span-2">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-electric" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                Recent Signal
              </p>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <p className="font-mono text-sm text-white">EURUSD · H1</p>
              <span className="rounded border border-electric/30 bg-electric/10 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-electric">
                SHADOW MODE
              </span>
            </div>
          </div>

          {/* Agent consensus + replay */}
          <div className="rounded-xl border border-white/5 bg-bg/60 p-4 sm:col-span-3">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-secondary">
              AI Agents Consensus
            </p>
            <ul className="space-y-2">
              {AGENTS.map((a, i) => (
                <motion.li
                  key={a.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.15 }}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-secondary">{a.name}</span>
                  <span className={`font-mono ${a.tone}`}>{a.verdict}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-bg/60 p-4 sm:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              Replay / Audit
            </p>
            <div className="mt-2 space-y-1.5 font-mono text-[10px] text-secondary">
              <p className="truncate">
                <span className="text-cyan">✓</span> dossier sha256:9f2ac…
              </p>
              <p className="truncate">
                <span className="text-cyan">✓</span> events 14,203 verified
              </p>
              <p className="truncate">
                <span className="text-success">✓</span> replay drift: none
              </p>
            </div>
          </div>
        </div>

        <p className="border-t border-white/5 px-5 py-2.5 text-center font-mono text-[9px] tracking-widest text-white/30">
          PRODUCT VISUALIZATION — NOT A PERFORMANCE CLAIM
        </p>
      </div>
    </motion.div>
  );
}
