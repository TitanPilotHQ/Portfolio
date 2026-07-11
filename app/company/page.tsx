import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, Reveal, SectionHeading } from "@/components/ui";
import {
  COMPANY_FOUNDER,
  COMPANY_MISSION,
  COMPANY_NEVER_CLAIMS,
  COMPANY_PRINCIPLES,
  COMPANY_PROBLEM,
  COMPANY_STAGE,
  COMPANY_TEAM,
  COMPANY_TIMELINE,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Titan Pilot is founder-led infrastructure for supervised, replayable AI trading decisions — built on evidence, not marketing claims.",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-electric/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            {COMPANY_MISSION.eyebrow}
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            {COMPANY_MISSION.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            {COMPANY_MISSION.copy}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-pretty text-base leading-relaxed text-secondary">
            {COMPANY_PROBLEM}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 max-w-3xl">
          <Reveal>
            <GlassCard>
              <h3 className="mb-2 text-base font-semibold">
                {COMPANY_FOUNDER.name}
              </h3>
              <p className="text-sm leading-relaxed text-secondary">
                {COMPANY_FOUNDER.bio}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-secondary">
                {COMPANY_TEAM}
              </p>
            </GlassCard>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="How We Operate" title="Our Principles." />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANY_PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <GlassCard className="h-full">
                  <h3 className="mb-2 text-base font-semibold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary">
                    {p.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Boundaries"
            title="What Titan Pilot Will Never Claim."
          />
          <Reveal className="mx-auto mt-10 max-w-2xl">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <ul className="space-y-2.5">
                {COMPANY_NEVER_CLAIMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-secondary"
                  >
                    <X className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Timeline" title="Our Journey." />
          <ol className="relative mx-auto mt-16 max-w-2xl">
            <div
              className="absolute bottom-4 left-[15px] top-1 w-px bg-gradient-to-b from-electric/50 via-cyan/40 to-white/10"
              aria-hidden
            />
            {COMPANY_TIMELINE.map((item, i) => (
              <Reveal key={item.stage} delay={i * 0.07}>
                <li className="relative flex items-start gap-5 pb-8 pl-0 last:pb-0">
                  <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-electric/40 bg-electric/10 text-electric">
                    <Check className="size-4" aria-hidden />
                  </span>
                  <div className="glass flex-1 rounded-xl px-5 py-3.5">
                    <p className="text-sm font-semibold">{item.stage}</p>
                    <p className="mt-1 text-sm leading-relaxed text-secondary">
                      {item.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl">
          <div className="glass-strong rounded-2xl p-6 text-center sm:p-8">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
              Current Stage
            </p>
            <p className="text-pretty text-sm leading-relaxed text-secondary">
              {COMPANY_STAGE}
            </p>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
