"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const FADE_IN_MS = 300;
const HOLD_MS = 300;
const FADE_OUT_MS = 300;

interface ReducedMotionRevealProps {
  onComplete: () => void;
}

export function ReducedMotionReveal({ onComplete }: ReducedMotionRevealProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 10);
    const completeTimer = setTimeout(
      onComplete,
      FADE_IN_MS + HOLD_MS + FADE_OUT_MS
    );
    return () => {
      clearTimeout(showTimer);
      clearTimeout(completeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-bg transition-opacity ease-out"
      style={{
        opacity: visible ? 0 : 1,
        transitionDuration: `${visible ? FADE_OUT_MS : FADE_IN_MS}ms`,
        transitionDelay: visible ? `${HOLD_MS}ms` : "0ms",
      }}
    >
      <Image
        src="/brand/titan-mark.svg"
        alt="Titan Pilot"
        width={156}
        height={143}
        priority
        unoptimized
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_IN_MS}ms ease-out`,
        }}
      />
    </div>
  );
}
