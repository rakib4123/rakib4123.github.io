"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { ExternalLink, Maximize2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import TiltCard from "./TiltCard";
import SpotlightCard from "./SpotlightCard";
import DemoModal from "./DemoModal";

const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const tagItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

const projects = [
  {
    number: "01",
    title: "RideGuard",
    type: "Calibrated & auditable ML risk framework",
    images: [
      "/images/rideguard-map.jpg",
      "/images/rideguard-now.jpg",
      "/images/rideguard-profile.jpg",
      "/images/rideguard-route.jpg",
    ],
    imageWidth: 460,
    imageHeight: 1022,
    tags: ["Python", "CatBoost", "scikit-learn", "SHAP"],
    desc: "A live web app scoring motorcycle route risk in Dhaka, with a colour-coded risk map and real-time warnings for phone handling, speeding, and accident hotspots. It predicts crash risk at 0.973 macro-F1, reporting calibrated confidence and explaining each prediction with SHAP attributions rather than acting as a black box. A self-audit layer traced the headline score to target leakage — a label the data gave away — which I published as the central finding rather than the accuracy number. Accepted at IEEE COMPAS 2026 (first author).",
    demo: "https://ride-guard-web-app-web.vercel.app/",
    embeddable: true,
    github: "https://github.com/rakib4123/Ride_Guard_WebApp",
    featured: true,
  },
  {
    number: "02",
    title: "PulseStone",
    type: "Embedded · Controlled user study",
    images: ["/images/project-pulsestone.jpg"],
    imageWidth: 1200,
    imageHeight: 1593,
    tags: ["ESP32-C3", "Arduino C++", "Python"],
    desc: "A pocket device that starts a calming breathing exercise with one squeeze, guiding the user with light, vibration, and screen cues. I designed and analysed a controlled 15-participant, 150-trial study: users started in 0.52 s versus 7.49 s on a phone app — 14.5× faster — and all 15 preferred it. Accepted at ICCA 2026 (first author).",
    github: "https://github.com/rakib4123/PulseStone",
    featured: true,
    flip: true,
  },
];

const smallProjects = [
  {
    title: "Drikon",
    type: "Full-stack · E-commerce with a recommendation engine",
    tags: ["Next.js 15", "React 19", "NestJS 11", "PostgreSQL", "Prisma"],
    desc: "Implemented the Apriori association-rule algorithm from scratch — level-wise itemset mining with candidate pruning, scored by support, confidence, and lift — to power \"frequently bought together\" and personalised recommendations from real order history. Built 17 backend modules (products, orders, reviews, coupons, flash sales, wishlists, banners, settings) with voice search, filtering, comparison, and secure accounts, localised in Bengali and English, with branding, theme, and homepage content editable from the admin panel without a redeploy.",
    demo: "https://drikon-web-vert1v.vercel.app/",
    github: "https://github.com/rakib4123/drikon",
    highlight: true,
  },
  {
    title: "DhakaNight",
    type: "Vision · Dataset & benchmark",
    tags: ["Python", "PyTorch", "YOLO", "OpenCV", "Roboflow"],
    desc: "Detects vehicles and pedestrians on Dhaka streets after dark, where standard detectors fail. I curated and labelled a 2,300-image night dataset, then benchmarked CLAHE, Gamma, Zero-DCE, and RetinexFormer against a YOLOv8 baseline under a controlled protocol — none improved detection, and scaling the detector beat every pipeline. Accepted at ICCA 2026 (first author).",
    github: "https://github.com/rakib4123/Dhaka_Night",
  },
  {
    title: "Carbon Market Simulation",
    type: "Forecasting · Agent-based modeling",
    tags: ["Python", "CatBoost", "Mesa", "scikit-learn"],
    desc: "CO2 forecasting and agent-based modeling. I benchmarked Ridge, XGBoost, LightGBM, and CatBoost on a 17-country CO2 panel; CatBoost won at 10.95% test MAPE. The forecasts feed a Mesa agent-based model of 48 firms, where linking markets cut costs in 55–62% of 100 runs. Third author.",
    wide: true,
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
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(
    null
  );

  return (
    <section id="projects" className="py-24 bg-surface relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Machine-learning systems and the applications built around them."
          tag="02 — Projects"
          subtitle="Deployed ML services, benchmarks and forecasting, plus a live e-commerce platform and embedded hardware."
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
              <div className={p.flip ? "md:order-2" : ""}>
                <ProjectGallery
                  images={p.images}
                  alt={p.title}
                  imageWidth={p.imageWidth}
                  imageHeight={p.imageHeight}
                  number={p.number}
                />
              </div>

              <div className={p.flip ? "md:order-1" : ""}>
                <div className="text-xs font-semibold tracking-[0.15em] text-brand-red uppercase mb-3">
                  {p.type}
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-4">
                  {p.title}
                </h3>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={tagContainer}
                  className="flex flex-wrap gap-2 mb-5"
                >
                  {p.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={tagItem}
                      className="font-mono text-[11px] font-medium text-ink-soft bg-surface-2 border border-line px-2.5 py-1 rounded-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>
                <p className="text-muted text-[15px] leading-relaxed mb-8">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {p.demo && p.embeddable && (
                    <button
                      onClick={() => setActiveDemo({ url: p.demo, title: p.title })}
                      className="inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-red hover:bg-red-700 px-5 py-2.5 chamfer transition-colors cursor-pointer"
                    >
                      <Maximize2 size={14} /> Live Demo
                    </button>
                  )}
                  {p.demo && !p.embeddable && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-white bg-brand-red hover:bg-red-700 px-5 py-2.5 chamfer transition-colors"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft bg-surface border border-line hover:border-line-strong hover:text-ink px-5 py-2.5 rounded transition-colors"
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
              className={p.highlight || p.wide ? "md:col-span-2" : ""}
            >
              <TiltCard className="h-full">
                <SpotlightCard
                  className={`relative h-full rounded-xl p-7 flex flex-col group transition-shadow duration-300 overflow-hidden backdrop-blur-md ${
                    p.highlight
                      ? "bg-surface/45 bg-gradient-to-br from-brand-red/10 to-transparent border-2 border-brand-red/40 hover:shadow-[0_10px_30px_rgba(215,38,61,0.15)]"
                      : "bg-surface/55 border border-line hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                  }`}
                >
                  <div
                    className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-red to-brand-orange origin-left transition-transform duration-500 ${
                      p.highlight ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></div>
                  {p.highlight && (
                    <span className="absolute top-5 right-5 inline-flex items-center gap-1 font-mono text-[10px] font-bold tracking-widest text-brand-red bg-surface border border-brand-red/30 px-2.5 py-1 rounded-full uppercase">
                      ★ Flagship
                    </span>
                  )}
                  <div className="text-xs font-semibold text-muted-2 uppercase tracking-wider mb-2">
                    {p.type}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink mb-2">
                    {p.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed mb-5 flex-grow">
                    {p.desc}
                  </p>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={tagContainer}
                    className="flex flex-wrap gap-2 mb-5"
                  >
                    {p.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        variants={tagItem}
                        className="font-mono text-[11px] text-muted bg-surface-2 px-2 py-0.5 rounded-sm border border-line"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                  <div className="flex flex-wrap gap-4 mt-auto">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-brand-red hover:text-brand-orange transition-colors"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors"
                      >
                        <FaGithub size={14} /> Source
                      </a>
                    )}
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {activeDemo && (
        <DemoModal
          url={activeDemo.url}
          title={activeDemo.title}
          onClose={() => setActiveDemo(null)}
        />
      )}
    </section>
  );
}

function ProjectGallery({
  images,
  alt,
  imageWidth,
  imageHeight,
  number,
}: {
  images: string[];
  alt: string;
  imageWidth: number;
  imageHeight: number;
  number: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] group relative">
        <span className="absolute top-4 left-4 z-10 bg-bg-main text-white text-xs font-extrabold tracking-widest px-2.5 py-1 rounded">
          {number}
        </span>
        <Image
          src={images[active]}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
                i === active ? "border-brand-red" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
