"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="About me" tag="01 — Introduction" />

        <div className="grid md:grid-cols-[240px_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.12)] hover:-translate-y-1 transition-all duration-500">
              <Image
                src="/images/profile.jpg"
                alt="Md. Rakib Hossain"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-slate-600 text-[17px] mb-4 leading-relaxed">
              I&apos;m a CSE student who ships full-stack applications and
              machine-learning systems: a live e-commerce platform with a
              recommendation engine, a deployed ML risk service, and a
              published hardware study. I use AI-assisted development with
              Claude Code daily.
            </p>
            <p className="text-slate-600 text-[17px] mb-8 leading-relaxed">
              <strong className="text-slate-900">Drikon</strong> is an
              e-commerce platform where I built a recommendation engine from
              scratch;{" "}
              <strong className="text-slate-900">RideGuard</strong> is a
              real-time ML risk service I deployed and self-audited;{" "}
              <strong className="text-slate-900">DhakaNight</strong> and{" "}
              <strong className="text-slate-900">PulseStone</strong> grew into
              two papers accepted at ICCA 2026. As founder of{" "}
              <strong className="text-slate-900">&quot;Khepa Chakka&quot;</strong>, I&apos;ve
              taken robots from concept to the competition floor. I&apos;m looking
              for opportunities in{" "}
              <strong className="text-slate-900">
                full-stack development, AI/ML, or software engineering
              </strong>
              .
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
              {[
                ["Education", "B.Sc. CSE — AIUB (CGPA 3.28/4.00)"],
                ["Focus", "Full-Stack · AI/ML · Computer Vision"],
                ["Role", "Founder, Khepa Chakka"],
                ["Affiliation", "ESAB, AIUB"],
                ["Languages", "Bangla · English"],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="block text-slate-900 text-sm font-bold mb-0.5">
                    {label}
                  </span>
                  <span className="text-slate-500 text-sm">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
