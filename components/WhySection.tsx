"use client";

import { BrainCircuit, Cpu, History, ShieldCheck } from "lucide-react";
import { WHY_CARDS } from "@/lib/content";
import { GlassCard, Reveal, SectionHeading } from "./ui";

const ICONS = {
  cpu: Cpu,
  brain: BrainCircuit,
  shield: ShieldCheck,
  history: History,
} as const;

export function WhySection() {
  return (
    <section id="product" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Titan Pilot"
          title="Built for Traders Who Care About What Happens After the Signal."
          copy="Most trading systems focus on entries. Titan Pilot focuses on the entire lifecycle: analysis, validation, execution, reconciliation, recovery, replay, and auditability."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CARDS.map((card, i) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS];
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <div className="mb-4 inline-flex rounded-xl border border-cyan/20 bg-cyan/10 p-3">
                    <Icon className="size-5 text-cyan" aria-hidden />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary">{card.body}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
