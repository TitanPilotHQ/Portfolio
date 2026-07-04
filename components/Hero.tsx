"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TRUST_BADGES } from "@/lib/content";
import { DashboardMockup } from "./DashboardMockup";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background layers */}
      <div className="grid-lines absolute inset-0" aria-hidden />
      <div
        className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-azure/10 blur-[140px]"
        aria-hidden
      />
      <div
        className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-violet/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan"
          >
            <span className="animate-ticker size-1.5 rounded-full bg-cyan" />
            AI Trading Infrastructure
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Autonomous Trading Intelligence, Built Like{" "}
            <span className="text-gradient">Mission-Critical Infrastructure.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-secondary"
          >
            Titan Pilot combines deterministic engineering, AI-assisted market
            reasoning, replayable decision trails, and risk-first automation into
            a platform designed for serious market systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="#architecture"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg transition-shadow hover:shadow-[0_0_36px_-6px_rgba(0,215,255,0.6)]"
            >
              Explore the Architecture
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
            >
              Join Early Access
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-2.5"
            aria-label="Platform guarantees"
          >
            {TRUST_BADGES.map((badge, i) => (
              <motion.li
                key={badge}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="rounded-full border border-white/10 bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-secondary"
              >
                {badge}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}
