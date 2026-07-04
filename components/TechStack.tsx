"use client";

import { motion } from "framer-motion";
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

        <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {TECH_STACK.map((tech, i) => (
            <motion.li
              key={tech}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="rounded-lg border border-white/10 bg-surface/70 px-4 py-2.5 font-mono text-xs tracking-wide text-secondary transition-colors hover:border-cyan/30 hover:text-white"
            >
              {tech}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
