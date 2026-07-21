"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-4xl text-center">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-cyan">
        {eyebrow}
      </p>
      <h2 className="font-display text-balance text-2xl font-bold leading-[1.15] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {copy ? (
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-secondary sm:text-lg">
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}

/**
 * Glass panel with a 3D tilt that follows the cursor.
 * Touch devices never fire mousemove, so mobile gets the static card.
 */
export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [2.5, -2.5]), {
    stiffness: 250,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-3, 3]), {
    stiffness: 250,
    damping: 22,
  });
  const glowX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(py, [0, 1], ["0%", "100%"]);

  function onMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.25 } }}
        className={`glass group relative h-full overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-cyan/30 ${className}`}
      >
        {/* Cursor-tracking glow */}
        <motion.div
          className="pointer-events-none absolute size-64 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ left: glowX, top: glowY, x: "-50%", y: "-50%" }}
          aria-hidden
        >
          <div className="size-full rounded-full bg-cyan/15 blur-3xl" />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div style={{ transform: "translateZ(24px)" }}>{children}</div>
      </motion.div>
    </div>
  );
}

export function CountUp({
  target,
  suffix = "",
  className,
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const spring = useSpring(value, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (inView) value.set(target);
  }, [inView, target, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return unsub;
  }, [spring, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
