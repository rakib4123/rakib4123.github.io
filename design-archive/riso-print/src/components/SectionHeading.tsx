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
    <div className="mb-[clamp(1.5rem,4vw,2.5rem)]">
      {tag && (
        <p className="font-mono text-[.78rem] tracking-[0.18em] uppercase text-petrol mb-[clamp(1.5rem,4vw,2.5rem)]">
          {tag}
        </p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="font-display uppercase text-ink text-[clamp(1.35rem,1.1rem+1.4vw,2.15rem)] leading-[1.15] max-w-[24ch] m-0"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="max-w-[62ch] mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
