"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "./Magnetic";
import ScrollHeadline from "./ScrollHeadline";
import TypewriterRole from "./TypewriterRole";

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 text-center">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#191512 1px, transparent 1px), linear-gradient(90deg, #191512 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        {/* Scrim: keeps the copy readable over the particle sphere */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 58% 42% at 50% 68%, rgba(247,243,238,0.94) 0%, rgba(247,243,238,0.6) 58%, transparent 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hud relative z-20 font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-ink-soft border border-line-strong bg-surface/60 px-4 sm:px-5 py-2 mb-32 sm:mb-28 text-center flex items-center gap-3"
        >
          <span className="led shrink-0" />
          <span>
            <span className="text-brand-orange">SYS ONLINE //</span>{" "}Data Science &amp; Machine Learning · Full-Stack
          </span>
        </motion.div>

        <div className="relative z-20 flex flex-col items-center w-full">
          <h1 className="sr-only">Md. Rakib Hossain</h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <ScrollHeadline
              lines={["Hi, I'm", "Rakib."]}
              className="select-none font-display uppercase font-bold tracking-tight text-[#e4dacd] leading-[0.85] text-[22vw] sm:text-[18vw] md:text-[10rem]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-end justify-center"
          >
            <div className="hud relative overflow-hidden px-3 pt-3">
              <span className="scan-beam" aria-hidden="true" />
              <span className="absolute top-1.5 left-4 font-mono text-[9px] tracking-widest text-brand-orange/80">
                UNIT R-4123
              </span>
              <span className="absolute bottom-1.5 right-4 z-10 font-mono text-[9px] tracking-widest text-brand-orange/80 flex items-center gap-1.5">
                <span className="led led-orange" style={{ width: 5, height: 5 }} /> ACTIVE
              </span>
              <Image
                src="/images/profile-transparent.png"
                alt="Md. Rakib Hossain"
                width={1024}
                height={935}
                priority
                className="h-[22vh] sm:h-[30vh] md:h-[40vh] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)]"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 text-base md:text-lg text-muted-2 font-mono"
        >
          <span className="text-brand-orange">&gt;</span> I work as <TypewriterRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mt-4 max-w-2xl text-lg md:text-xl text-ink-soft leading-relaxed"
        >
          I work on{" "}
          <span className="font-semibold bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold bg-clip-text text-transparent animate-gradient">
            data science and machine-learning systems
          </span>{" "}
          and build the applications around them — from live products to published research.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 flex flex-wrap justify-center gap-4 mt-10"
        >
          <Magnetic>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-brand-red text-white font-semibold text-sm px-7 py-3 chamfer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(196,22,47,0.3)]"
            >
              See the work ↓
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 border border-line-strong text-ink font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-brand-red hover:text-brand-red hover:-translate-y-0.5"
            >
              <FileText size={16} /> Resume
            </Link>
          </Magnetic>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-brand-red transition-colors z-20 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.a>
      </div>
    </section>
  );
}
