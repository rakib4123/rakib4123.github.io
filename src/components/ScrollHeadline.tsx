"use client";

import { MotionValue, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Headline whose individual characters fade and drop away as the page scrolls,
 * so the hero copy dissolves into the 3D scene instead of sliding off it.
 */

function Char({
  char,
  progress,
  offset,
}: {
  char: string;
  progress: MotionValue<number>;
  offset: number;
}) {
  const opacity = useTransform(progress, [offset, offset + 0.45], [1, 0]);
  const y = useTransform(progress, [offset, offset + 0.45], ["0%", "70%"]);
  const blur = useTransform(progress, [offset, offset + 0.45], ["blur(0px)", "blur(6px)"]);

  return (
    <motion.span style={{ opacity, y, filter: blur }} className="inline-block">
      {char === " " ? " " : char}
    </motion.span>
  );
}

export default function ScrollHeadline({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const total = lines.reduce((n, l) => n + l.length, 0);
  let index = 0;

  return (
    <div ref={ref} className={className}>
      {lines.map((line) => (
        <span key={line} className="block">
          {Array.from(line).map((char, i) => (
            <Char
              key={`${line}-${i}`}
              char={char}
              progress={scrollYProgress}
              offset={(index++ / total) * 0.4}
            />
          ))}
        </span>
      ))}
    </div>
  );
}
