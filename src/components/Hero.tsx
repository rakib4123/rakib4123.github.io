"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AntigravityBackground from "./AntigravityBackground";
import Magnetic from "./Magnetic";
import TypewriterRole from "./TypewriterRole";

export default function Hero() {
  return (
    <section id="top" className="relative bg-slate-950">
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 text-center">
        {/* Antigravity Animation */}
        <div className="absolute inset-0 z-0">
          <AntigravityBackground />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-20 text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase font-semibold text-slate-300 border border-slate-700 rounded-full px-4 sm:px-5 py-2 mb-32 sm:mb-24 text-center"
        >
          AI · ML · Computer Vision · Data Science
        </motion.div>

        <div className="relative z-20 flex flex-col items-center w-full">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="select-none font-extrabold tracking-tighter text-slate-800 leading-[0.85] text-[22vw] sm:text-[18vw] md:text-[10rem]"
          >
            Hi, I&apos;m
            <br />
            Rakib.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-end justify-center"
          >
            <Image
              src="/images/profile-transparent.png"
              alt="Md. Rakib Hossain"
              width={1024}
              height={935}
              priority
              className="h-[22vh] sm:h-[30vh] md:h-[40vh] w-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 text-base md:text-lg text-slate-400 font-mono"
        >
          I work as <TypewriterRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mt-4 max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed"
        >
          I explore{" "}
          <span className="font-semibold bg-gradient-to-r from-brand-cyan via-emerald-400 to-brand-cyan bg-clip-text text-transparent animate-gradient">
            AI, ML, computer vision &amp; data science
          </span>{" "}
          through software I build myself.
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
              className="inline-flex items-center gap-2 bg-brand-cyan text-slate-950 font-semibold text-sm px-7 py-3 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(6,182,212,0.3)]"
            >
              See the work ↓
            </a>
          </Magnetic>
          <Magnetic>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 border border-slate-600 text-slate-200 font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-brand-cyan hover:text-brand-cyan hover:-translate-y-0.5"
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-brand-cyan transition-colors z-20 flex flex-col items-center gap-2"
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
