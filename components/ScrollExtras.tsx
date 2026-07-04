"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

const RING_RADIUS = 20;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export function ScrollExtras() {
  const { scrollYProgress, scrollY } = useScroll();
  const barScale = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const ringOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [RING_CIRCUMFERENCE, 0],
  );
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setShowTop(y > 500);
  });

  return (
    <>
      {/* Page scroll progress bar */}
      <motion.div
        style={{ scaleX: barScale }}
        className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-cyan via-azure to-electric"
        aria-hidden
      />

      {/* Go to top button with progress ring */}
      <AnimatePresence>
        {showTop ? (
          <motion.button
            key="back-to-top"
            type="button"
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Go to top"
            className="glass-strong fixed bottom-5 right-5 z-[60] flex size-12 items-center justify-center rounded-full text-cyan shadow-[0_0_30px_-8px_rgba(0,215,255,0.5)] sm:bottom-8 sm:right-8"
          >
            <svg
              viewBox="0 0 48 48"
              className="absolute inset-0 size-full -rotate-90"
              aria-hidden
            >
              <circle
                cx="24"
                cy="24"
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(0,215,255,0.15)"
                strokeWidth="2"
              />
              <motion.circle
                cx="24"
                cy="24"
                r={RING_RADIUS}
                fill="none"
                stroke="#00d7ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                style={{ strokeDashoffset: ringOffset }}
              />
            </svg>
            <ArrowUp className="size-5" aria-hidden />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
