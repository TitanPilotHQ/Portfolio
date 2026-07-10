import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { GlassCard, Reveal, SectionHeading } from "@/components/ui";
import { ARCHITECTURE_DEEP_DIVE, TECH_STACK } from "@/lib/content";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How Titan Pilot is actually built: why AI cannot reach execution, how the event log proves what happened, and the engineering discipline behind the claims.",
  alternates: { canonical: "/architecture" },
};

export default function ArchitecturePage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet/[0.07] blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            Architecture
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            Built Like Infrastructure, Not a Trading Bot.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            Architecture is a credibility signal here, not decoration.
            Every claim on this page traces to a mechanism you could go
            verify — not a diagram someone drew to look serious.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {ARCHITECTURE_DEEP_DIVE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-cyan/70">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mb-2 text-lg font-semibold">{item.title}</h2>
                <p className="text-sm leading-relaxed text-secondary">
                  {item.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="Built With" title="The Stack Underneath." />
          <Reveal className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-secondary"
              >
                {tech}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-16 flex justify-center">
          <a
            href="/security"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
          >
            See the security and verification posture
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
