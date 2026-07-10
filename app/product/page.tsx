import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { GlassCard, Reveal, SectionHeading } from "@/components/ui";
import {
  AUTONOMY_LADDER_DETAIL,
  COMPETITOR_COMPARISON,
  COMPETITOR_PITCH,
  PRODUCT_DOCTRINES,
  PRODUCT_PRINCIPLES,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Product",
  description:
    "How Titan Pilot turns AI market reasoning into evidence: the decision pipeline, the staged autonomy ladder, and what makes this different from a trading bot or a signal service.",
  alternates: { canonical: "/product" },
};

export default function ProductPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-azure/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            The Product
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            What Titan Pilot Actually Does.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            Titan Pilot is the system of record for AI trading decisions —
            built so that when your desk uses AI, every thesis, objection,
            score, and refusal becomes evidence you can replay and defend.
          </p>
        </Reveal>

        <div className="mt-16">
          <SectionHeading
            eyebrow="How It Behaves"
            title="Four Principles, Enforced — Not Aspirational."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
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
            eyebrow="When It Doesn't Know"
            title="Two Doctrines for the Moments That Matter Most."
          />
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
            {PRODUCT_DOCTRINES.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <h3 className="mb-2 text-base font-semibold">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-secondary">
                    {d.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Staged Autonomy"
            title="A Ladder Earned With Evidence."
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-3">
            {AUTONOMY_LADDER_DETAIL.map((stage, i) => (
              <Reveal key={stage.stage} delay={i * 0.1}>
                <GlassCard
                  className={`h-full ${i === 0 ? "border-cyan/25" : ""}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-lg font-semibold text-white">
                      {stage.stage}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${
                        i === 0
                          ? "border-cyan/30 bg-cyan/10 text-cyan"
                          : "border-white/10 bg-white/5 text-secondary"
                      }`}
                    >
                      {stage.status}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-secondary">
                    {stage.body}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Why Not Just Use..."
            title="Where Titan Pilot Wins, Product by Product."
            copy="The honest column matters — each alternative is better than Titan Pilot at something, and we don't pretend otherwise."
          />
          <Reveal className="mt-10 overflow-x-auto">
            <div className="glass-strong min-w-[720px] overflow-hidden rounded-2xl">
              <div className="hidden grid-cols-[0.9fr_1.1fr_1.6fr_1.1fr] gap-4 border-b border-white/5 px-6 py-3 sm:grid">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  vs
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  They Are
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  Titan Pilot&apos;s Difference
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                  What They Do Better
                </p>
              </div>
              <ul>
                {COMPETITOR_COMPARISON.map((row) => (
                  <li
                    key={row.name}
                    className="grid gap-2 border-b border-white/[0.04] px-6 py-4 last:border-0 sm:grid-cols-[0.9fr_1.1fr_1.6fr_1.1fr] sm:gap-4"
                  >
                    <p className="text-sm font-semibold">{row.name}</p>
                    <p className="font-mono text-xs leading-relaxed text-secondary">
                      {row.theyAre}
                    </p>
                    <p className="text-sm leading-relaxed text-secondary">
                      {row.difference}
                    </p>
                    <p className="font-mono text-xs leading-relaxed text-white/60">
                      {row.concede}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal className="mt-6 text-center">
            <p className="mx-auto max-w-2xl font-display text-lg font-bold text-gradient">
              {COMPETITOR_PITCH}
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/#evidence"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
          >
            Explore the evidence
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
          <a
            href="/#contact"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
          >
            Book an AI Desk Audit
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
