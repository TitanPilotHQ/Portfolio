import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Reveal, SectionHeading } from "@/components/ui";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import {
  CONTACT_EMAIL,
  CONTACT_INTRO,
  CONTACT_QUALIFICATION_NOTICE,
  CONTACT_WHAT_HAPPENS_NEXT,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book an AI Desk Audit with Titan Pilot — for professional trading desks evaluating supervised AI decision governance.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <PageShell
      glow={
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-amber/10 blur-[140px]"
          aria-hidden
        />
      }
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            {CONTACT_INTRO.eyebrow}
          </p>
          <h1 className="font-display text-balance text-3xl font-bold leading-[1.15] sm:text-4xl">
            {CONTACT_INTRO.title}
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-secondary">
            {CONTACT_INTRO.copy}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <div className="glass rounded-2xl border border-amber/20 p-6 text-center sm:p-8">
            <p className="text-sm leading-relaxed text-secondary">
              {CONTACT_QUALIFICATION_NOTICE}
            </p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-xl">
          <ul className="space-y-2.5">
            {CONTACT_WHAT_HAPPENS_NEXT.map((item, i) => (
              <li key={item} className="flex items-start gap-3 text-sm text-secondary">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-white/15 font-mono text-[10px] text-white/60">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8">
          <EarlyAccessForm />
        </div>

        <Reveal className="mx-auto mt-4 max-w-xl text-center">
          <p className="text-sm text-secondary">
            For enterprise enquiries, email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1 text-cyan transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
              <ArrowRight className="size-3.5" aria-hidden />
            </a>{" "}
            directly.
          </p>
        </Reveal>
      </div>
    </PageShell>
  );
}
