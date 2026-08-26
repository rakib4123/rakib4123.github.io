"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import DemoModal from "./DemoModal";
import Plate from "./Plate";

type Project = {
  number: string;
  title: string;
  type: string;
  tags: string[];
  desc: string;
  images?: string[];
  imageWidth?: number;
  imageHeight?: number;
  plate?: "a" | "b";
  demo?: string;
  embeddable?: boolean;
  github?: string;
  research?: string;
  flip?: boolean;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Drikon",
    type: "Full-stack · E-commerce platform with recommendation engine",
    plate: "a",
    tags: ["Next.js 15", "React 19", "NestJS 11", "PostgreSQL", "Prisma"],
    desc: "I implemented the Apriori association-rule algorithm from scratch — level-wise itemset mining with candidate pruning, scored by support, confidence and lift — to power “frequently bought together” and personalised recommendations from real order history. Around it I built 17 backend modules: products, orders, reviews, coupons, flash sales, wishlists, banners, settings, with voice search, filtering, comparison and secure accounts on the storefront. Localised in Bengali and English, with branding, theme and homepage content editable from the admin panel without a redeploy.",
    demo: "https://drikon-web-vert1v.vercel.app/",
    github: "https://github.com/rakib4123/drikon",
  },
  {
    number: "02",
    title: "RideGuard",
    type: "Calibrated and auditable ML risk framework",
    images: [
      "/images/rideguard-map.jpg",
      "/images/rideguard-now.jpg",
      "/images/rideguard-profile.jpg",
      "/images/rideguard-route.jpg",
    ],
    imageWidth: 460,
    imageHeight: 1022,
    tags: ["Python", "CatBoost", "scikit-learn", "SHAP"],
    desc: "A live web app scoring motorcycle route risk in Dhaka, with a colour-coded risk map and real-time warnings for phone handling, speeding and accident hotspots. It predicts crash risk at 0.973 macro-F1, reporting calibrated confidence and explaining each prediction with SHAP attributions rather than acting as a black box. A self-audit layer traced the headline score to target leakage — a label the data gave away — which I published as the central finding rather than the accuracy number.",
    demo: "https://ride-guard-web-app-web.vercel.app/",
    embeddable: true,
    github: "https://github.com/rakib4123/Ride_Guard_WebApp",
    flip: true,
  },
  {
    number: "03",
    title: "DhakaNight",
    type: "Night-time object detection dataset and benchmark",
    plate: "b",
    tags: ["Python", "PyTorch", "YOLO", "OpenCV", "Roboflow"],
    desc: "Detects vehicles and pedestrians on Dhaka streets after dark, where standard detectors fail. I curated and labelled a 2,300-image night dataset, then benchmarked CLAHE, Gamma, Zero-DCE and RetinexFormer against a YOLOv8 baseline under a controlled protocol — none improved detection, and scaling the detector beat every pipeline.",
    github: "https://github.com/rakib4123/Dhaka_Night",
  },
  {
    number: "04",
    title: "PulseStone",
    type: "Handheld anxiety-relief device",
    images: ["/images/project-pulsestone.jpg"],
    imageWidth: 1200,
    imageHeight: 1593,
    tags: ["ESP32-C3", "Arduino C++", "Python"],
    desc: "A pocket device that starts a calming breathing exercise with one squeeze, guiding the user with light, vibration and screen cues. I designed and analysed a controlled 15-participant, 150-trial study: users started in 0.52 s versus 7.49 s on a phone app — 14.5× faster — and all 15 preferred it.",
    github: "https://github.com/rakib4123/PulseStone",
    flip: true,
  },
];

export default function Projects() {
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="projects" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading
        title="Full-stack products and machine-learning systems, shipped end to end."
        tag="02 — Projects"
        subtitle="Live web apps and deployed ML services, plus computer vision, data science and embedded hardware along the way."
      />

      <div className="flex flex-col gap-[clamp(3rem,7vw,5.5rem)]">
        {projects.map((p) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="grid gap-[clamp(1.5rem,4vw,3rem)] items-start md:grid-cols-2"
          >
            <div className={p.flip ? "md:order-2" : ""}>
              {p.images ? (
                <ProjectGallery
                  images={p.images}
                  alt={p.title}
                  imageWidth={p.imageWidth ?? 800}
                  imageHeight={p.imageHeight ?? 600}
                />
              ) : (
                <div className="shadow-hard-hover">
                  <Plate variant={p.plate ?? "a"} label={p.title} />
                </div>
              )}
            </div>

            <div className={p.flip ? "md:order-1" : ""}>
              <p className="font-mono text-[.74rem] tracking-[0.12em] uppercase text-petrol m-0 mb-2">
                {p.number} — {p.type}
              </p>
              <h3 className="font-display uppercase text-petrol text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-none m-0 mb-4">
                {p.title}
              </h3>

              <ul className="flex flex-wrap gap-2 m-0 mb-5 p-0 list-none">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rule-a bg-paper-lift px-2 py-[.15rem] font-mono text-[.72rem] tracking-[0.04em]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <p className="text-[.95rem] m-0 mb-6 max-w-[62ch]">{p.desc}</p>

              <p className="flex flex-wrap gap-x-6 gap-y-2 m-0 font-mono text-[.8rem] uppercase tracking-[0.06em]">
                {p.demo && p.embeddable && (
                  <button
                    onClick={() => setActiveDemo({ url: p.demo!, title: p.title })}
                    className="nav-underline text-petrol cursor-pointer bg-transparent border-0 p-0 font-mono text-[.8rem] uppercase tracking-[0.06em]"
                  >
                    Live demo ⤢
                  </button>
                )}
                {p.demo && !p.embeddable && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="nav-underline text-petrol">
                    Live ↗
                  </a>
                )}
                {p.research && (
                  <a href={p.research} target="_blank" rel="noopener noreferrer" className="nav-underline text-petrol">
                    Research ↗
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="nav-underline text-petrol">
                    Code ↗
                  </a>
                )}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {activeDemo && (
        <DemoModal url={activeDemo.url} title={activeDemo.title} onClose={() => setActiveDemo(null)} />
      )}
    </section>
  );
}

function ProjectGallery({
  images,
  alt,
  imageWidth,
  imageHeight,
}: {
  images: string[];
  alt: string;
  imageWidth: number;
  imageHeight: number;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="rule-a shadow-hard-hover bg-paper-lift">
        <Image
          src={images[active]}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className="print-img w-full h-auto object-cover block"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`Show ${alt} image ${i + 1}`}
              className={`relative w-14 h-14 overflow-hidden border-[1.5px] cursor-pointer ${
                i === active ? "border-fluoro" : "border-ink"
              }`}
            >
              <Image src={img} alt="" fill className="print-img object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
