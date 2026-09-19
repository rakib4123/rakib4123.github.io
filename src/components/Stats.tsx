"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3, suffix: "", l: "Papers accepted\nIEEE COMPAS & ICCA 2026" },
  { value: 6, suffix: "", l: "National & international\nrobotics podiums" },
  { value: 4, suffix: "", l: "Robot classes\ndesigned & built" },
  { value: 2300, suffix: "", l: "Night images labelled\nfor DhakaNight" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-bg-main relative border-y border-line">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-display text-5xl md:text-6xl font-bold tracking-tight mb-2 bg-gradient-to-r from-brand-red via-brand-orange to-brand-red bg-clip-text text-transparent animate-gradient">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-mono uppercase tracking-wider text-muted text-[11px] whitespace-pre-line leading-relaxed">
                {stat.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
