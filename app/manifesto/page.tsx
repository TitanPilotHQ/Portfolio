import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui";
import { ENTITY_STATEMENTS, MANIFESTO_PRINCIPLES } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Titan Pilot Manifesto",
  description:
    "AI should reason. Software should decide. The six principles behind Titan Pilot's risk-first, replayable AI trading infrastructure.",
  alternates: { canonical: "/manifesto" },
};

export default function ManifestoPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden pt-32 pb-24 lg:pt-40">
        <div className="grid-lines absolute inset-0" aria-hidden />
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
              The Titan Pilot Manifesto
            </p>
            <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
              AI Should Reason.{" "}
              <span className="text-gradient">Software Should Decide.</span>
            </h1>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
              Markets are uncertain. Software should not pretend otherwise.
              Titan Pilot is built on the belief that AI can assist market
              reasoning, but capital should only move through deterministic
              controls, explicit risk gates, broker reconciliation, and
              replayable evidence.
            </p>
          </Reveal>

          <ol className="mt-14 space-y-6">
            {MANIFESTO_PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.06}>
                <li className="glass rounded-2xl p-7">
                  <p className="mb-3 font-mono text-[11px] tracking-[0.3em] text-cyan/70">
                    PRINCIPLE {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-lg font-bold leading-snug">
                    {principle.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">
                    {principle.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-14">
            <div className="glass-strong rounded-2xl p-7">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-secondary">
                What Titan Pilot is
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-secondary">
                {ENTITY_STATEMENTS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-12 text-center">
            <p className="font-display text-xl font-bold text-gradient">
              You will know exactly why the system did — or did not — act.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
