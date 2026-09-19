"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FileText } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const publications = [
  {
    title: "RideGuard: A Calibrated and Auditable ML Risk Framework",
    venue: "IEEE COMPAS 2026 · First author",
  },
  {
    title:
      "DhakaNight: A Benchmark for Low-Light Object Detection in Dense Urban Night Traffic",
    venue: "ICCA 2026, Dhaka · First author",
  },
  {
    title: "PulseStone: A Tangible Single-Action Anxiety Companion",
    venue: "ICCA 2026, Dhaka · First author",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="py-24 bg-surface relative border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Research accepted for publication."
          tag="03 — Publications"
          subtitle="Three first-author papers, grown out of the RideGuard, DhakaNight, and PulseStone projects, accepted at IEEE COMPAS 2026 and ICCA 2026."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="relative h-full bg-gradient-to-br from-brand-orange/10 to-transparent border-2 border-brand-orange/30 rounded-xl p-7 overflow-hidden hover:shadow-[0_10px_30px_rgba(244,124,32,0.15)] transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-orange to-brand-red"></div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-red to-brand-orange text-white flex items-center justify-center shadow-[0_4px_12px_rgba(244,124,32,0.3)]">
                    <FileText size={18} />
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest text-brand-orange bg-surface border border-brand-orange/30 px-2.5 py-1 rounded-full uppercase">
                    ✓ Accepted
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-ink mb-2 leading-snug">
                  {pub.title}
                </h3>
                <p className="text-sm text-muted">{pub.venue}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
