"use client";

import { BUILD_STATUS } from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

export function BuildStatus() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={BUILD_STATUS.eyebrow}
          title={BUILD_STATUS.title}
          copy={BUILD_STATUS.body}
        />

        <Reveal className="mx-auto mt-10 max-w-2xl">
          <ul className="glass divide-y divide-white/[0.04] rounded-2xl px-6 py-2">
            {BUILD_STATUS.facts.map((fact) => (
              <li key={fact} className="py-3.5 text-sm leading-relaxed text-secondary">
                {fact}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {BUILD_STATUS.disclosure}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
