"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const publications = [
  {
    title: "DhakaNight: A Benchmark for Low-Light Object Detection in Dense Urban Night Traffic",
    venue: "ICCA 2026, Dhaka · ACM Digital Library",
  },
  {
    title: "PulseStone: A Tangible Single-Action Anxiety Companion",
    venue: "ICCA 2026, Dhaka",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading
        title="Research accepted for publication."
        tag="03 — Publications"
        subtitle="Two papers, grown out of the DhakaNight and PulseStone projects, both first author, accepted at ICCA 2026."
      />

      <div className="grid gap-[clamp(1.5rem,3.5vw,2.5rem)] md:grid-cols-2">
        {publications.map((pub, i) => (
          <motion.article
            key={pub.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rule-a shadow-hard bg-paper-lift p-6 flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="font-mono text-[.72rem] uppercase tracking-[0.12em] text-petrol">
                First author
              </span>
              <span className="stamp shrink-0">Accepted</span>
            </div>
            <h3 className="font-display uppercase text-petrol text-[1.05rem] leading-[1.3] m-0 mb-3">
              {pub.title}
            </h3>
            <p className="font-mono text-[.78rem] m-0 mt-auto">{pub.venue}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
