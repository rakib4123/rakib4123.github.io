"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * The cut-out portrait in its targeting frame: it floats, a beam scans down
 * it, and it turns in 3D toward the cursor. The neural network sits behind it.
 */
export default function HeroPortrait() {
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 110, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-1, 1], [9, -9]), { stiffness: 110, damping: 18 });

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, mx, my]);

  return (
    <div className="flex h-full items-end justify-center [perspective:1200px] lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="float">
          <div className="hud-frame relative overflow-hidden px-4 pt-7">
            <span className="scan-beam" aria-hidden="true" />
            <span className="absolute left-4 top-2 font-mono text-[10px] tracking-[0.2em] text-accent/80">
              UNIT R-4123
            </span>
            <span className="absolute bottom-2 right-4 z-10 flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-accent/80">
              <span className="live h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" /> ACTIVE
            </span>
            <Image
              src="/images/profile-transparent.png"
              alt="Md. Rakib Hossain"
              width={1024}
              height={935}
              priority
              className="h-[30svh] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] lg:h-[min(56svh,540px)]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
