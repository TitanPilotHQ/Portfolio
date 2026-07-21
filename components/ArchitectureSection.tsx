"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ARCHITECTURE_FLOW, ARCHITECTURE_LAYERS, AUTONOMY_LADDER_DETAIL } from "@/lib/content";
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

        {/* What's live today vs. what's designed-next in the same pipeline */}
        <Reveal className="mt-10">
          <div className="glass mx-auto max-w-4xl rounded-2xl px-6 py-5">
            <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
              Where Each Stage Stands Today
            </p>
            <ul className="space-y-3">
              {[
                { stage: "Market data & dossier", status: "Live", tone: "text-success" },
                { stage: "AI analysis & adversarial review", status: "Certified — shadow mode", tone: "text-cyan" },
                { stage: "Evidence binding & replay", status: "Active", tone: "text-success" },
                {
                  stage: "Human approval (Copilot mode)",
                  status: AUTONOMY_LADDER_DETAIL[1].status,
                  tone: "text-electric",
                },
                { stage: "Risk Gate", status: "Mandatory, always-on", tone: "text-amber" },
                { stage: "Execution & broker reconciliation", status: "Deterministic, MT5-bridged", tone: "text-success" },
              ].map((row) => (
                <li
                  key={row.stage}
                  className="flex items-center justify-between gap-4 border-b border-white/[0.04] pb-3 text-sm last:border-0 last:pb-0"
                >
                  <span className="text-secondary">{row.stage}</span>
                  <span className={`font-mono text-xs ${row.tone}`}>{row.status}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
              {AUTONOMY_LADDER_DETAIL[1].body}
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <a
            href="/architecture"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan hover:underline"
          >
            See the full architecture
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
