"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "RideGuard",
    type: "Data analysis · Real-time ML",
    image: "/images/rideguard-map.jpg",
    imageWidth: 460,
    imageHeight: 1022,
    tags: ["Python", "SQL", "CatBoost", "XGBoost", "TensorFlow", "SHAP"],
    desc: "I cleaned and geocoded two raw datasets into an analysis-ready pipeline, ran exploratory analysis to find the factors driving risk, then trained and calibrated gradient-boosting models against deep-learning baselines. SHAP makes every prediction explainable. I built and deployed the full app — live risk map, route-level scoring, and voice & vibration alerts.",
    demo: "https://ride-guard-web-app-web.vercel.app/",
    github: "https://github.com/rakib4123/Ride_Guard_WebApp",
    featured: true,
  },
  {
    title: "PulseStone",
    type: "Embedded · Statistical user study",
    image: "/images/project-pulsestone.jpg",
    imageWidth: 1200,
    imageHeight: 1593,
    tags: ["ESP32-C3", "Arduino C++", "Sensors", "Statistics"],
    desc: "A palm-sized, squeeze-activated device that guides a 4-7-8 breathing exercise the instant it's squeezed — no phone, no app. I wrote the firmware in Arduino C++, driving synchronized LED, haptic, and on-screen feedback. I designed and ran a within-subjects study (15 participants, 150 trials) and analysed it with a paired t-test: 14.5× faster to start than a phone app (p < 0.001).",
    github: "https://github.com/rakib4123/PulseStone",
    featured: true,
    flip: true,
  },
];

const smallProjects = [
  {
    title: "DhakaNight",
    type: "Vision · Data",
    tags: ["PyTorch", "YOLO", "OpenCV"],
    desc: "Built and annotated a ~2,300-image low-light street dataset in Roboflow, trained a YOLO detector, and benchmarked four enhancement methods.",
    github: "https://github.com/rakib4123/Dhaka_Night",
  },
  {
    title: "Drikon",
    type: "Full-stack",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    desc: "A production-quality e-commerce monorepo with two-factor login, rotating tokens, role-based access, and an admin panel.",
    github: "https://github.com/rakib4123/drikon",
  },
  {
    title: "AIUB STEAM",
    type: "Desktop",
    tags: ["C#", ".NET", "WinForms", "SQL Server"],
    desc: "A Windows desktop university portal with role-based dashboards, course pre-registration, assignment uploads, grade viewing.",
    github: "https://github.com/rakib4123/AiubSteam",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Real software built to solve real problems."
          tag="02 — Projects"
          subtitle="Data analysis, machine learning, full-stack software, and embedded hardware — each built and shipped end to end."
        />

        <div className="space-y-28 mb-20">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-10 items-center"
            >
              <div
                className={`rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] group relative ${
                  p.flip ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  width={p.imageWidth}
                  height={p.imageHeight}
                  className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>

              <div className={p.flip ? "md:order-1" : ""}>
                <div className="text-xs font-semibold tracking-[0.15em] text-brand-cyan uppercase mb-3">
                  {p.type}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {p.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-slate-500 text-[15px] leading-relaxed mb-8">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded transition-colors"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-gray-200 hover:border-slate-300 hover:text-slate-900 px-5 py-2.5 rounded transition-colors"
                    >
                      <FaGithub size={14} /> Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {smallProjects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-xl p-7 flex flex-col group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-cyan to-brand-emerald scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {p.type}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {p.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5 flex-grow">
                {p.desc}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:text-cyan-600 transition-colors mt-auto"
              >
                <FaGithub size={14} /> View Repository
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
