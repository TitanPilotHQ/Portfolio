"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface CompanyTimelineProps {
  items: { stage: string; body: string }[];
}

export function CompanyTimeline({ items }: CompanyTimelineProps) {
  return (
    <ol className="relative">
      {items.map((item, i) => (
        <motion.li
          key={item.stage}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.07, duration: 0.5 }}
          className="relative flex items-start gap-5 pb-8 pl-0 last:pb-0"
        >
          <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-electric/40 bg-electric/10 text-electric">
            <Check className="size-4" aria-hidden />
          </span>
          <div className="glass flex-1 rounded-xl px-5 py-3.5">
            <p className="text-sm font-semibold">{item.stage}</p>
            <p className="mt-1 text-sm leading-relaxed text-secondary">
              {item.body}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
