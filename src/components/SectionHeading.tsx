"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const word = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

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
          className="text-xs tracking-[0.25em] uppercase font-semibold text-slate-400 mb-4"
        >
          {tag}
        </motion.div>
      )}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900"
      >
        {title.split(" ").map((w, i) => (
          <motion.span key={i} variants={word} className="inline-block mr-[0.25em]">
            {w}
          </motion.span>
        ))}
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
