"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import AntigravityBackground from "./AntigravityBackground";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-main"
    >
      {/* Antigravity Animation */}
      <div className="absolute inset-0 z-0">
        <AntigravityBackground />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 w-full pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-cyan mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-brand-cyan"></span>
            Final-year CSE · AIUB · Dhaka
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 max-w-3xl leading-[1.1] mb-6">
            I build software that{" "}
            <span className="text-brand-cyan">solves</span> real
            problems<span className="text-brand-cyan">.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed mb-12">
            Data analytics, machine learning, full-stack apps, embedded devices,
            and award-winning robotics — shipped end to end.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium text-sm px-7 py-3 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
            >
              See the work ↓
            </a>
            <a
              href="/Rakib_Hossain_CV.pdf"
              download
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-slate-700 font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-brand-cyan hover:text-brand-cyan hover:-translate-y-0.5 hover:shadow-sm"
            >
              <FileText size={16} /> Resume
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-brand-cyan transition-colors z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
