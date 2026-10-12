"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const stats = [
  { to: 3, decimals: 0, label: "First-author papers" },
  { to: 0.973, decimals: 3, label: "Macro-F1, RideGuard crash-risk model" },
  { to: 2300, decimals: 0, label: "Night images labelled for DhakaNight" },
  { to: 6, decimals: 0, label: "National & international robotics podiums" },
];

const format = (v: number, decimals: number) =>
  v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/** Counts up from zero the first time it scrolls into view. */
function CountUp({ to, decimals }: { to: number; decimals: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to]);

  const shown = reduceMotion ? to : value;
  return (
    <span ref={ref}>
      <span className="sr-only">{format(to, decimals)}</span>
      <span aria-hidden="true">{format(shown, decimals)}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section aria-label="Highlights" className="border-y border-line bg-bg/70 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className={`flex flex-col gap-1.5 py-9 pr-6 ${i % 2 === 1 ? "border-l border-line pl-6" : ""} ${
              i === 2 ? "lg:border-l lg:border-line lg:pl-6" : ""
            } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <span className="text-[44px] font-semibold leading-none tracking-[-0.03em] tabular-nums">
              <CountUp to={stat.to} decimals={stat.decimals} />
            </span>
            <span className="text-sm text-muted">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
