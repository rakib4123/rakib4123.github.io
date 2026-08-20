"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FileText } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const publications = [
  {
    title:
      "DhakaNight: A Benchmark for Low-Light Object Detection in Dense Urban Night Traffic",
    venue: "ICCA 2026, Dhaka · ACM Digital Library",
  },
  {
    title: "PulseStone: A Tangible Single-Action Anxiety Companion",
    venue: "ICCA 2026, Dhaka",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Research accepted for publication."
          tag="03 — Publications"
          subtitle="Two papers, grown out of the DhakaNight and PulseStone projects, accepted at ICCA 2026."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="relative h-full bg-gradient-to-br from-emerald-50/60 to-white border-2 border-brand-emerald/30 rounded-xl p-7 overflow-hidden hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-emerald to-brand-cyan"></div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-cyan to-brand-emerald text-white flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.3)]">
                    <FileText size={18} />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wide text-brand-emerald bg-white border border-brand-emerald/30 px-2.5 py-1 rounded-full uppercase">
                    ✓ Accepted
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                  {pub.title}
                </h3>
                <p className="text-sm text-slate-500">{pub.venue}</p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
