"use client";

import { TECH_STACK } from "@/lib/content";
import { SectionHeading } from "./ui";

export function TechStack() {
  return (
    <section className="relative py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technology Stack"
          title="Built on Proven Engineering Primitives."
        />
      </div>

      {/* Infinite marquee — duplicated list scrolls 50% then loops seamlessly */}
      <div className="marquee-mask mt-12 overflow-hidden">
        <ul className="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <li
              key={`${tech}-${i >= TECH_STACK.length ? "b" : "a"}`}
              aria-hidden={i >= TECH_STACK.length}
              className="rounded-xl border border-white/10 bg-surface/70 px-6 py-3.5 font-mono text-sm tracking-wide text-secondary transition-colors hover:border-cyan/40 hover:text-white"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
