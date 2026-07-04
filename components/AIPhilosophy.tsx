"use client";

import { AI_CARDS } from "@/lib/content";
import { GlassCard, Reveal, SectionHeading } from "./ui";

export function AIPhilosophy() {
  return (
    <section id="ai-model" className="relative scroll-mt-20 py-24 lg:py-32">
      <div
        className="absolute right-0 top-1/4 h-[450px] w-[450px] rounded-full bg-electric/[0.07] blur-[130px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI Philosophy"
          title="AI Reasons. Software Decides."
        />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          <blockquote className="glass-strong relative overflow-hidden rounded-2xl px-8 py-12 text-center sm:px-14">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/60 to-transparent"
              aria-hidden
            />
            <p className="text-balance text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              &ldquo;LLMs never compute what{" "}
              <span className="text-gradient">deterministic software</span> can
              prove.&rdquo;
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-secondary sm:text-base">
              The AI layer works from a versioned market dossier. It never
              calculates indicators, never sees raw candles, and never bypasses
              deterministic risk controls. If AI fails, trading activity reduces
              to zero. It never increases risk.
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AI_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <GlassCard className="h-full">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-electric/80">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-base font-semibold">{card.title}</h3>
                <p className="text-sm leading-relaxed text-secondary">{card.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
