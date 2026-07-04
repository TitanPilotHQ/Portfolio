"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ARCHITECTURE_FLOW, ARCHITECTURE_LAYERS } from "@/lib/content";
import { GlassCard, Reveal, SectionHeading } from "./ui";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="relative scroll-mt-20 py-24 lg:py-32">
      {/* Section ambience */}
      <div
        className="absolute left-0 top-1/3 h-[500px] w-[500px] rounded-full bg-violet/[0.07] blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core Architecture"
          title="A Trading Platform Built Like Infrastructure."
          copy="Every stage in the pipeline is deterministic, observable, and replayable. AI participates — it never controls."
        />

        {/* Animated pipeline */}
        <Reveal className="mt-14">
          <div className="glass-strong relative overflow-hidden rounded-2xl p-6 sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,120,255,0.06),transparent_60%)]"
              aria-hidden
            />
            <ol className="relative flex flex-wrap items-center justify-center gap-y-4">
              {ARCHITECTURE_FLOW.map((node, i) => (
                <li key={node} className="flex items-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09, duration: 0.45 }}
                    className="relative rounded-lg border border-cyan/15 bg-surface px-3.5 py-2 font-mono text-[11px] tracking-wide text-white sm:text-xs"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-lg border border-cyan/50"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: [0, 1, 0] }}
                      viewport={{ once: false, margin: "-100px" }}
                      transition={{
                        delay: i * 0.35,
                        duration: 1.2,
                        repeat: Infinity,
                        repeatDelay: ARCHITECTURE_FLOW.length * 0.35,
                      }}
                      aria-hidden
                    />
                    {node}
                  </motion.span>
                  {i < ARCHITECTURE_FLOW.length - 1 ? (
                    <ChevronRight className="mx-1 size-4 shrink-0 text-cyan/40" aria-hidden />
                  ) : null}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              Signal lifecycle — every hop recorded as an immutable event
            </p>
          </div>
        </Reveal>

        {/* Layer explanations */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARCHITECTURE_LAYERS.map((layer, i) => (
            <Reveal key={layer.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-cyan/70">
                  LAYER {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-base font-semibold">{layer.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{layer.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
