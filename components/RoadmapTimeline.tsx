"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, CircleDot, Lock, Sparkles } from "lucide-react";
import { ROADMAP } from "@/lib/content";
import { SectionHeading } from "./ui";

const STATUS_META = {
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    dot: "text-success border-success/40 bg-success/10",
    badge: "border-success/25 bg-success/10 text-success",
  },
  "in-validation": {
    label: "In Validation",
    icon: CircleDot,
    dot: "text-cyan border-cyan/40 bg-cyan/10",
    badge: "border-cyan/25 bg-cyan/10 text-cyan",
  },
  upcoming: {
    label: "Upcoming",
    icon: CircleDashed,
    dot: "text-electric border-electric/40 bg-electric/10",
    badge: "border-electric/25 bg-electric/10 text-electric",
  },
  "evidence-gated": {
    label: "Evidence-Gated",
    icon: Lock,
    dot: "text-amber border-amber/40 bg-amber/10",
    badge: "border-amber/25 bg-amber/10 text-amber",
  },
  future: {
    label: "Future",
    icon: Sparkles,
    dot: "text-secondary border-white/20 bg-white/5",
    badge: "border-white/15 bg-white/5 text-secondary",
  },
} as const;

export function RoadmapTimeline() {
  return (
    <section id="roadmap" className="relative scroll-mt-20 py-24 lg:py-32">
      <div
        className="absolute right-1/4 top-1/3 h-[400px] w-[500px] rounded-full bg-violet/[0.06] blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Roadmap"
          title="A Measured Path to Autonomous Market Intelligence."
        />

        <ol className="relative mx-auto mt-16 max-w-2xl">
          {/* Vertical spine */}
          <div
            className="absolute bottom-4 left-[15px] top-1 w-px bg-gradient-to-b from-success/50 via-cyan/40 to-white/10"
            aria-hidden
          />
          {ROADMAP.map((item, i) => {
            const meta = STATUS_META[item.status];
            const Icon = meta.icon;
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="relative flex items-center gap-5 pb-8 pl-0 last:pb-0"
              >
                <span
                  className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border ${meta.dot}`}
                >
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="glass flex flex-1 flex-wrap items-center justify-between gap-3 rounded-xl px-5 py-3.5">
                  <span className="text-sm font-medium">
                    <span className="mr-3 font-mono text-[10px] text-white/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest ${meta.badge}`}
                  >
                    {meta.label}
                  </span>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
