"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ENTITY_STATEMENTS, MENTAL_MODEL } from "@/lib/content";
import { Reveal } from "./ui";

/**
 * The one-visual mental model: AI does not trade → replay proves it.
 * Sits directly under the hero so the product is understood in seconds.
 */
export function MentalModel() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Crawlable one-line product definition (GEO entity statement) */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-pretty text-lg leading-relaxed text-secondary sm:text-xl">
            <span className="font-semibold text-white">
              Titan Pilot is an AI trading infrastructure platform.
            </span>{" "}
            It uses AI for structured market reasoning — not direct execution
            authority — and is currently validating its AI shadow pipeline.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MENTAL_MODEL.map((step, i) => (
            <motion.div
              key={step.statement}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="glass relative flex items-start gap-4 rounded-xl p-5"
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 font-mono text-[11px] text-cyan">
                {i + 1}
              </span>
              <div>
                <p className="font-display text-sm font-bold leading-snug">
                  {step.statement}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-secondary">
                  {step.detail}
                </p>
              </div>
              {i < MENTAL_MODEL.length - 1 ? (
                <ArrowDown
                  className="absolute -bottom-3 left-1/2 z-10 size-4 -translate-x-1/2 text-cyan/40 sm:hidden"
                  aria-hidden
                />
              ) : null}
            </motion.div>
          ))}
        </div>

        {/* Remaining entity statements — visually quiet, fully crawlable */}
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <ul className="space-y-1 text-center font-mono text-[11px] leading-relaxed tracking-wide text-white/35">
            {ENTITY_STATEMENTS.slice(1).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
