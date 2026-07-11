import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HOMEPAGE_CONTACT_TEASER } from "@/lib/content";
import { Reveal } from "./ui";

export function ContactTeaser() {
  return (
    <section className="relative py-24 lg:py-32">
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure/[0.07] blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-balance text-2xl font-bold leading-[1.15] sm:text-3xl lg:text-4xl">
          {HOMEPAGE_CONTACT_TEASER.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-secondary sm:text-lg">
          {HOMEPAGE_CONTACT_TEASER.copy}
        </p>
        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
          >
            Book an AI Desk Audit
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
          >
            Contact Us
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
