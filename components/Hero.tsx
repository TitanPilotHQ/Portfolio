"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { TRUST_BADGES } from "@/lib/content";
import { DashboardMockup } from "./DashboardMockup";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-28"
    >
      {/* Background layers with scroll parallax */}
      <div className="grid-lines absolute inset-0" aria-hidden />
      <motion.div
        style={{ y: orbY }}
        className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-azure/10 blur-[140px]"
        aria-hidden
      />
      <motion.div
        style={{ y: orbY2 }}
        className="absolute -right-40 top-40 h-[400px] w-[400px] rounded-full bg-violet/10 blur-[120px]"
        aria-hidden
      />

      <motion.div
        style={{ y: contentY }}
        className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan"
          >
            <span className="animate-ticker size-1.5 rounded-full bg-cyan" />
            AI Reasons. Software Decides.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-balance text-[1.6rem] font-bold leading-[1.16] sm:text-4xl lg:text-[2.7rem] lg:leading-[1.14]"
          >
            AI Trading Infrastructure That{" "}
            <span className="text-gradient">Records Every Decision</span> Before
            It Risks Capital.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-secondary sm:text-lg"
          >
            Titan Pilot is a replayable AI trading system where LLMs generate
            structured reasoning, deterministic software scores decisions, and
            risk gates remain in control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan to-azure px-6 py-3 text-sm font-semibold text-bg shadow-[0_0_24px_-8px_rgba(0,215,255,0.5)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(0,215,255,0.7)]"
            >
              Join Early Access
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href="#architecture"
              className="rounded-lg border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/40 hover:bg-cyan/5"
            >
              Explore the Architecture
            </motion.a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-2.5"
            aria-label="Platform guarantees"
          >
            {TRUST_BADGES.map((badge, i) => (
              <motion.li
                key={badge}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                whileHover={{ scale: 1.08, borderColor: "rgba(0,215,255,0.4)" }}
                className="rounded-full border border-white/10 bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-secondary"
              >
                {badge}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <DashboardMockup />
      </motion.div>
    </section>
  );
}
