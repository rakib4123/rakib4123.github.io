"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  title,
  subtitle,
  tag,
}: {
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  return (
    <div className="mb-16">
      {tag && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-cyan mb-4 flex items-center gap-3"
        >
          <span className="w-6 h-px bg-brand-cyan"></span>
          {tag}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-3xl md:text-4xl font-serif font-bold text-slate-900"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 max-w-2xl text-lg mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
