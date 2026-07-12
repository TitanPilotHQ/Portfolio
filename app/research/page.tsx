import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, Reveal, SectionHeading } from "@/components/ui";
import {
  RESEARCH_CLAIMS_NOTE,
  RESEARCH_INTRO,
  RESEARCH_PIPELINE,
  RESEARCH_PRINCIPLES,
  RESEARCH_STANDARDS,
  RESEARCH_STATUS,
  type ResearchStatus,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "How Titan Pilot approaches research: evidence before claims, reproducible methodology, and publications delayed until they meet our internal standards.",
  alternates: { canonical: "/research" },
};

const RESEARCH_STATUS_STYLES: Record<ResearchStatus, string> = {
  Planned: "border-white/15 bg-white/5 text-secondary",
  "In Preparation": "border-azure/25 bg-azure/10 text-azure",
  "Under Internal Review": "border-amber/25 bg-amber/10 text-amber",
  Published: "border-success/25 bg-success/10 text-success",
};

export default function ResearchPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            {RESEARCH_INTRO.eyebrow}
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            {RESEARCH_INTRO.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            {RESEARCH_INTRO.copy}
          </p>
        </Reveal>

        <div className="mt-16">
          <SectionHeading eyebrow="Standards" title="Research Principles." />
          <Reveal className="mx-auto mt-10 max-w-2xl">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {RESEARCH_PRINCIPLES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-secondary"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Publication Tracks"
            title="Research Pipeline."
            copy="Planned tracks, not completed work — statuses update as real work begins on each one."
          />
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <div className="glass-strong grid gap-3 rounded-2xl p-6 sm:grid-cols-2 sm:p-8">
              {RESEARCH_PIPELINE.map((track) => (
                <div
                  key={track.title}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/5 px-4 py-3"
                >
                  <span className="text-sm font-medium">{track.title}</span>
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${RESEARCH_STATUS_STYLES[track.status]}`}
                  >
                    {track.status}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-white/60">
              {RESEARCH_STATUS.delayed}
            </p>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Publication Standards"
            title="What Every Publication Will Include."
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
            {RESEARCH_STANDARDS.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <GlassCard className="h-full">
                  <p className="text-sm leading-relaxed text-secondary">
                    {item}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-secondary">
            {RESEARCH_CLAIMS_NOTE}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-3xl">
          <div className="glass-strong rounded-2xl p-6 text-center sm:p-8">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
              Current Status
            </p>
            <p className="text-pretty text-sm leading-relaxed text-secondary">
              {RESEARCH_STATUS.current}
            </p>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
