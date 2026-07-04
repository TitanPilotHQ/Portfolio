"use client";

import { motion } from "framer-motion";
import { OctagonAlert, ShieldCheck } from "lucide-react";
import { SAFETY_RULES } from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

export function SafetyGrid() {
  return (
    <section id="safety" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Safety & Capital Protection"
          title="When Titan Pilot Cannot Prove State, It Stops."
          copy="This is the emotional opposite of reckless automation. Fail-closed behavior is not a feature flag — it is the foundation."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          {/* Shield visual */}
          <Reveal className="mx-auto">
            <div className="relative flex size-56 items-center justify-center sm:size-64">
              <span
                className="absolute inset-0 animate-pulse-slow rounded-full border border-success/20"
                aria-hidden
              />
              <span
                className="absolute inset-6 animate-pulse-slow rounded-full border border-success/30 [animation-delay:1s]"
                aria-hidden
              />
              <span
                className="absolute inset-12 rounded-full border border-success/40"
                aria-hidden
              />
              <div className="glass-strong relative flex size-28 items-center justify-center rounded-2xl border-success/30 shadow-[0_0_60px_-12px_rgba(34,197,94,0.4)]">
                <ShieldCheck className="size-12 text-success" aria-hidden />
              </div>
            </div>
            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-success/80">
              Fail-Closed Circuit Breaker
            </p>
          </Reveal>

          {/* Rules table */}
          <div className="glass overflow-hidden rounded-2xl">
            <div className="border-b border-white/5 px-5 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
                Condition → Deterministic Response
              </p>
            </div>
            <ul>
              {SAFETY_RULES.map((rule, i) => (
                <motion.li
                  key={rule.condition}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="flex items-center justify-between gap-4 border-b border-white/[0.04] px-5 py-3.5 last:border-0"
                >
                  <span className="flex items-center gap-3 text-sm text-secondary">
                    <OctagonAlert className="size-4 shrink-0 text-amber/70" aria-hidden />
                    {rule.condition}
                  </span>
                  <span className="shrink-0 rounded border border-amber/25 bg-amber/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-amber">
                    {rule.response}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
