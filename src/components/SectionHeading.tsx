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

// "01 — Introduction" -> "SYS.01 // INTRODUCTION"
function formatTag(tag: string) {
  const [num, label] = tag.split(" — ");
  return label ? `SYS.${num} // ${label}` : tag;
}

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
          className="font-mono text-xs tracking-[0.2em] uppercase text-brand-orange mb-4 flex items-center gap-3"
        >
          <span className="led" />
          {formatTag(tag)}
          <span className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-brand-orange/60 to-transparent" />
        </motion.div>
      )}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={container}
        className="font-display uppercase text-h2 font-bold tracking-wide text-ink leading-[1.05]"
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
          className="text-muted max-w-2xl text-lg mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
