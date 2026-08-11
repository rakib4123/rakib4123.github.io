"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import AntigravityBackground from "./AntigravityBackground";
import Magnetic from "./Magnetic";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="top" className="relative bg-bg-main">
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <div className="grid md:grid-cols-[260px_1fr] gap-8 md:gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="justify-self-center md:justify-self-start"
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                <Image
                  src="/images/profile.jpg"
                  alt="Md. Rakib Hossain"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-cyan mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-brand-cyan"></span>
                Final-year CSE · AIUB · Dhaka
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                I explore{" "}
                <span className="text-brand-cyan">
                  AI, ML, computer vision & data science
                </span>{" "}
                through software I build myself.
              </h1>

              <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-12">
                Mainly AI, machine learning, computer vision, and data
                science — plus full-stack apps and robotics along the way.
              </p>

              <div className="flex flex-wrap gap-4">
                <Magnetic>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium text-sm px-7 py-3 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
                  >
                    See the work ↓
                  </a>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/resume"
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 text-slate-700 font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-brand-cyan hover:text-brand-cyan hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <FileText size={16} /> Resume
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </div>
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
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 aspect-video"
          onMouseEnter={() => videoRef.current?.play()}
          onMouseLeave={() => videoRef.current?.pause()}
        >
          <video
            ref={videoRef}
            controls
            preload="metadata"
            playsInline
            muted
            poster="/images/profile.jpg"
            className="w-full h-full object-cover bg-slate-100"
          >
            <source src="/intro-video.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
