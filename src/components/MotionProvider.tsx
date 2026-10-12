"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

/** Honours the visitor's reduced-motion setting for every framer animation. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
