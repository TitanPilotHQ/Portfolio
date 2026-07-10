import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/ui";
import { DISCLAIMER, SECURITY_CAPABILITIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Security & Operational Posture",
  description:
    "Titan Pilot's verified security and disaster-recovery posture: independent audit results, backup and replay verification, and how the system contains its own failures.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-success/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            Security
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            Verified Daily, Not Just at Launch.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            This is operational proof, not a compliance checkbox. Every
            capability below is checked automatically, on a schedule, and
            has been observed passing in production.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 max-w-4xl space-y-5">
          {SECURITY_CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <section className="glass rounded-2xl p-6">
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  {item.body}
                </p>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm leading-relaxed text-secondary">
            {DISCLAIMER}
          </p>
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <a
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
          >
            Talk to us about your desk&apos;s security requirements
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
