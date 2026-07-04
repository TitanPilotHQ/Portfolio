"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/content";
import { SectionHeading } from "./ui";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Direct Answers" title="Direct Answers. No Hype." />

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className={`glass overflow-hidden rounded-xl transition-colors ${
                  open ? "border-cyan/25" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left"
                >
                  <h3 className="py-1 text-sm font-medium sm:text-base">
                    {item.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-cyan"
                  >
                    <Plus className="size-5" aria-hidden />
                  </motion.span>
                </button>
                {/* Answers stay in the DOM (crawlable by search/answer engines);
                    the grid-rows trick animates open/close in pure CSS. */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-secondary">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
