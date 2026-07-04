"use client";

import { motion } from "framer-motion";
import { DECISION_STEPS } from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

export function DecisionTimeline() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Inside Every Decision"
          title="Every Signal Leaves Evidence."
          copy="Titan Pilot does not treat AI output as magic. Every prompt, model, response, score, and decision is recorded as structured evidence."
        />

        <div className="mt-16 overflow-x-auto pb-4">
          <ol className="relative mx-auto flex min-w-[900px] max-w-6xl items-start justify-between gap-2">
            {/* Connecting line */}
            <div
              className="absolute left-0 right-0 top-[11px] h-px bg-gradient-to-r from-cyan/10 via-cyan/40 to-violet/30"
              aria-hidden
            />
            {DECISION_STEPS.map((step, i) => (
              <motion.li
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex w-28 flex-col items-center text-center"
              >
                <span className="relative z-10 mb-4 flex size-[23px] items-center justify-center rounded-full border border-cyan/40 bg-surface font-mono text-[10px] text-cyan">
                  {i + 1}
                  <span
                    className="absolute inset-0 animate-ping rounded-full border border-cyan/30"
                    style={{ animationDuration: "3s", animationDelay: `${i * 0.4}s` }}
                    aria-hidden
                  />
                </span>
                <p className="text-xs leading-snug text-secondary">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30">
            Scroll horizontally on mobile — the evidence chain never breaks
          </p>
        </Reveal>
      </div>
    </section>
  );
}
