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
            <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(6,182,212,0.12)] hover:-translate-y-1 transition-all duration-500">
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
              I&apos;m a builder who takes work end to end — from cleaning and
              analysing raw data, to training and explaining machine-learning
              models, to shipping the finished application across web, desktop,
              and embedded systems.
            </p>
            <p className="text-slate-600 text-[17px] mb-8 leading-relaxed">
              <strong className="text-slate-900">RideGuard</strong> is a
              real-time ML web app I deployed;{" "}
              <strong className="text-slate-900">DhakaNight</strong> began with a
              2,300-image dataset I built and annotated myself;{" "}
              <strong className="text-slate-900">PulseStone</strong> is a
              handheld ESP32-C3 device I designed from scratch and validated with
              a user study. As founder of{" "}
              <strong className="text-slate-900">&quot;Khepa Chakka&quot;</strong>, I&apos;ve
              taken robots from concept to the competition floor. I&apos;m seeking a
              role in{" "}
              <strong className="text-slate-900">
                data analytics, data science, or software development
              </strong>
              .
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
              {[
                ["Education", "B.Sc. CSE — AIUB"],
                ["Focus", "Data · ML · Software"],
                ["Role", "Founder, Khepa Chakka"],
                ["Affiliation", "ESAB, AIUB"],
                ["Languages", "Bangla · English"],
              ].map(([label, value]) => (
                <div key={label}>
                  <span className="block text-slate-900 font-serif text-sm font-semibold mb-0.5">
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
