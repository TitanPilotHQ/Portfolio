// components/brand-entry/LogoAssemblyScene.tsx
"use client";

import { useEffect, useRef } from "react";

const FRAGMENT_IDS = [
  "p-swoop",
  "t-shape",
  "arrow",
  "candle-1",
  "candle-2",
  "candle-3",
  "candle-4",
  "candle-5",
] as const;

const DORMANT_MS = 700;
const ALIGN_MS = 1300;
const LOCK_MS = 800;
const STAGGER_MS = 70;

interface LogoAssemblyProps {
  onFragmentsAligned: () => void;
  onLocked: () => void;
  onError: () => void;
  playTick: () => void;
  playLockChime: () => void;
}

// Deterministic scatter offset per fragment index — same arrangement every
// load, not a fresh Math.random() each time.
function scatterFor(index: number) {
  const angle = (index / FRAGMENT_IDS.length) * Math.PI * 2;
  return {
    x: Math.cos(angle) * 90,
    y: Math.sin(angle) * 60 - 40,
    z: -180 - index * 12,
    rotate: (index % 2 === 0 ? 1 : -1) * (18 + index * 6),
  };
}

export function LogoAssemblyScene({
  onFragmentsAligned,
  onLocked,
  onError,
  playTick,
  playLockChime,
}: LogoAssemblyProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;

    async function run() {
      try {
        const response = await fetch("/brand/titan-mark.svg");
        const svgText = await response.text();
        const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
        const svgEl = doc.querySelector("svg");
        if (!svgEl || !containerRef.current) throw new Error("invalid svg");
        if (cancelledRef.current) return;

        containerRef.current.innerHTML = "";
        const imported = document.importNode(svgEl, true);
        imported.setAttribute("style", "width: 100%; height: 100%;");
        containerRef.current.appendChild(imported);

        const fragments = FRAGMENT_IDS.map((id) =>
          imported.querySelector<SVGGElement>(`#${id}`)
        );
        if (fragments.some((el) => !el)) throw new Error("missing fragment");

        // Phase 1: dormant — scatter each fragment, invisible at first.
        fragments.forEach((el, index) => {
          const scatter = scatterFor(index);
          el!.style.transformBox = "fill-box";
          el!.style.transformOrigin = "center";
          el!.style.transform = `translate3d(${scatter.x}px, ${scatter.y}px, ${scatter.z}px) rotate(${scatter.rotate}deg)`;
          el!.style.opacity = "0";
        });

        await new Promise((resolve) => setTimeout(resolve, DORMANT_MS));
        if (cancelledRef.current) return;

        // Phase 2: alignment — staggered arrival at home position.
        const arrivals = fragments.map((el, index) => {
          const scatter = scatterFor(index);
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              if (cancelledRef.current || !el) return resolve();
              playTick();
              const animation = el.animate(
                [
                  {
                    transform: `translate3d(${scatter.x}px, ${scatter.y}px, ${scatter.z}px) rotate(${scatter.rotate}deg)`,
                    opacity: 0,
                  },
                  { transform: "translate3d(0, 0, 0) rotate(0deg)", opacity: 1 },
                ],
                { duration: ALIGN_MS - index * STAGGER_MS, easing: "cubic-bezier(0.21,0.47,0.32,0.98)", fill: "forwards" }
              );
              el.style.opacity = "1";
              animation.finished.then(() => resolve()).catch(() => resolve());
            }, index * STAGGER_MS);
          });
        });
        await Promise.all(arrivals);
        if (cancelledRef.current) return;
        onFragmentsAligned();

        // Phase 3: mantling / lock — brief confirmation pulse.
        playLockChime();
        const container = containerRef.current;
        if (container) {
          const pulse = container.animate(
            [{ transform: "scale(1)" }, { transform: "scale(1.03)" }, { transform: "scale(1)" }],
            { duration: LOCK_MS, easing: "ease-out" }
          );
          await pulse.finished.catch(() => undefined);
        } else {
          await new Promise((resolve) => setTimeout(resolve, LOCK_MS));
        }
        if (cancelledRef.current) return;
        onLocked();
      } catch {
        if (!cancelledRef.current) onError();
      }
    }

    void run();

    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      style={{
        width: "min(70vw, 420px)",
        height: "min(70vw, 420px)",
        perspective: "800px",
      }}
    />
  );
}
