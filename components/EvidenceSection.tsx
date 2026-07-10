"use client";

import { motion } from "framer-motion";
import { FileCheck2 } from "lucide-react";
import { EVIDENCE_ROWS } from "@/lib/content";
import { Reveal, SectionHeading } from "./ui";

const STATE_STYLES: Record<string, string> = {
  Built: "border-success/25 bg-success/10 text-success",
  Running: "border-success/25 bg-success/10 text-success",
  Active: "border-success/25 bg-success/10 text-success",
  Implemented: "border-success/25 bg-success/10 text-success",
  Certified: "border-success/25 bg-success/10 text-success",
};

export function EvidenceSection() {
  return (
    <section id="evidence" className="relative scroll-mt-20 py-24 lg:py-32">
      <div
        className="absolute right-0 top-1/4 h-[400px] w-[450px] rounded-full bg-azure/[0.06] blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Proof, Not Promises"
          title="Evidence Before Autonomy."
          copy="Engineering proof is safe to show. Performance claims are not — so you will not find any here."
        />

        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div className="glass-strong overflow-hidden rounded-2xl">
            <div className="hidden grid-cols-[1.1fr_0.7fr_1.6fr] gap-4 border-b border-white/5 px-6 py-3 sm:grid">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                Capability
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                Current State
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary">
                Proof Artifact
              </p>
            </div>
            <ul>
              {EVIDENCE_ROWS.map((row, i) => (
                <motion.li
                  key={row.capability}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="grid gap-2 border-b border-white/[0.04] px-6 py-4 last:border-0 sm:grid-cols-[1.1fr_0.7fr_1.6fr] sm:items-center sm:gap-4"
                >
                  <p className="flex items-center gap-2.5 text-sm font-medium">
                    <FileCheck2 className="size-4 shrink-0 text-cyan/60" aria-hidden />
                    {row.capability}
                  </p>
                  <p>
                    <span
                      className={`inline-block rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${STATE_STYLES[row.state] ?? "border-white/15 bg-white/5 text-secondary"}`}
                    >
                      {row.state}
                    </span>
                  </p>
                  <p className="font-mono text-xs leading-relaxed text-secondary">
                    {row.proof}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
          <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
            Capability states only — never performance claims
          </p>
        </Reveal>
      </div>
    </section>
  );
}
