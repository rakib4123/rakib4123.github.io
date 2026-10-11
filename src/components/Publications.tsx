"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { FileText } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { ImageGrid, Lightbox, useGallery } from "./Gallery";

const publications = [
  {
    title:
      "RideGuard: A Behavioural-Spatial Risk Framework with Conformal Prediction for Motorcycle Safety",
    venue: "IEEE COMPAS 2026, University of Dhaka · First author",
    status: "Presented",
  },
  {
    title:
      "DhakaNight: A Benchmark for Low-Light Object Detection in Dense Urban Night Traffic",
    venue: "ICCA 2026, Dhaka · First author",
    status: "Accepted",
  },
  {
    title: "PulseStone: A Tangible Single-Action Anxiety Companion",
    venue: "ICCA 2026, Dhaka · First author",
    status: "Accepted",
  },
];

const conference = [
  { img: "/images/compas-backdrop.jpg", cap: "IEEE COMPAS 2026 · University of Dhaka" },
  { img: "/images/compas-authors.jpg", cap: "With co-authors at IEEE COMPAS 2026 · 9–10 October 2026" },
  { img: "/images/compas-certificate.jpg", cap: "Certificate of presentation · RideGuard (Paper 59)" },
];

export default function Publications() {
  const { lightbox, open, close, prev, next } = useGallery();

  return (
    <section id="publications" className="py-24 bg-surface relative border-t border-line">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Research, presented and accepted."
          tag="03 — Publications"
          subtitle="Three first-author papers, grown out of the RideGuard, DhakaNight, and PulseStone projects. RideGuard was presented at IEEE COMPAS 2026 at the University of Dhaka in October 2026; the other two are accepted at ICCA 2026."
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
              <SpotlightCard className="relative h-full bg-surface/45 backdrop-blur-md bg-gradient-to-br from-brand-orange/10 to-transparent border-2 border-brand-orange/30 rounded-xl p-7 overflow-hidden hover:shadow-[0_10px_30px_rgba(244,124,32,0.15)] transition-shadow duration-300">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-orange to-brand-red"></div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-red to-brand-orange text-white flex items-center justify-center shadow-[0_4px_12px_rgba(244,124,32,0.3)]">
                    <FileText size={18} />
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest text-brand-orange bg-surface border border-brand-orange/30 px-2.5 py-1 rounded-full uppercase">
                    ✓ {pub.status}
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

        <div className="mt-16">
          <ImageGrid
            title="IEEE COMPAS 2026"
            items={conference}
            onClick={open}
          />
        </div>
      </div>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
