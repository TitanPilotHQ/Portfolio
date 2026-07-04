"use client";

import { PRODUCT_MODES } from "@/lib/content";
import { GlassCard, Reveal, SectionHeading } from "./ui";

export function ProductModeLadder() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product Modes"
          title="A Ladder from Observation to Autonomy."
          copy="Promotion between modes is earned with evidence — never assumed."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-3">
          {PRODUCT_MODES.map((mode, i) => (
            <Reveal key={mode.title} delay={i * 0.12}>
              <GlassCard
                className={`flex h-full flex-col ${i === 0 ? "border-cyan/25" : ""}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-3xl font-semibold text-white/15">
                    {mode.stage}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${
                      i === 0
                        ? "border-cyan/30 bg-cyan/10 text-cyan"
                        : "border-white/10 bg-white/5 text-secondary"
                    }`}
                  >
                    {mode.status}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{mode.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{mode.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="mx-auto max-w-2xl font-mono text-[11px] leading-relaxed tracking-wide text-white/35">
            Live-money autonomy is outside the current public promise and must
            remain evidence-gated.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
