"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const stats = [
  { to: 3, decimals: 0, label: "First-author papers · all presented, at IEEE COMPAS & ICCA 2026" },
  { to: 2380, decimals: 0, label: "Night images labelled for DhakaNight" },
  { to: 45224, decimals: 0, label: "Bounding boxes hand-annotated for DhakaNight" },
  { to: 6, decimals: 0, label: "National & international robotics podiums" },
  { to: 4, decimals: 0, label: "Robot classes designed & built" },
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
    <Reveal>
      {/* The 1px gaps over a line-coloured grid draw the dividers. */}
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col-reverse gap-2 bg-surface p-5 sm:p-6 ${i === stats.length - 1 ? "col-span-2" : ""}`}
          >
            <dt className="text-[13px] leading-snug text-muted">{stat.label}</dt>
            <dd className="text-[34px] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
              <CountUp to={stat.to} decimals={stat.decimals} />
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
