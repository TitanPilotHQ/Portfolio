"use client";

import { MILESTONES } from "@/lib/content";
import { GlassCard, Reveal, SectionHeading } from "./ui";

export function Milestones() {
  return (
    <section className="relative py-24 lg:py-32">
      <div
        className="absolute left-1/4 top-0 h-[400px] w-[600px] rounded-full bg-azure/[0.06] blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Infrastructure Milestones"
          title="Production Infrastructure Before Intelligence."
          copy="Titan Pilot's foundation was built before the AI layer: deployment, broker bridge, event sourcing, reconciliation, crash recovery, replay, backup verification, and operational health."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <GlassCard className="h-full text-center">
                <p className="font-mono text-xl font-semibold text-gradient sm:text-2xl">
                  {m.value}
                </p>
                <p className="mt-2 text-xs leading-snug text-secondary sm:text-sm">
                  {m.label}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
