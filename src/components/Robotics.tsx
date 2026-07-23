"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const robots = [
  { img: "/images/build-battlebot.jpg", cap: "Battle bot (Wedge + blade)" },
  { img: "/images/build-soccerbot-top.jpg", cap: "Soccer bot (Electronics)" },
  { img: "/images/build-soccerbot-angle.jpg", cap: "Soccer bot (Steel body)" },
];

const podiums = [
  { img: "/images/comp-techfest.jpg", cap: "Winner · Techfest IIT Bombay 2024" },
  { img: "/images/comp-nrc-battlebot.jpg", cap: "1st Runner-up · NRC 2025" },
  { img: "/images/comp-nrc-roborace.jpg", cap: "2nd Runner-up · NRC 2025" },
  { img: "/images/comp-technoxian.jpg", cap: "Runner-up · Technoxian BD 2024" },
  { img: "/images/comp-aiub-trophies.jpg", cap: "Runner-up · AIUB Robotic Crew" },
  { img: "/images/comp-team-trophy.jpg", cap: "Team Khepa Chakka" },
];

const certs = [
  { img: "/images/cert-csfest.jpg", cap: "AIUB CS Fest 2024" },
  { img: "/images/cert-techfest.jpg", cap: "Techfest IIT Bombay 2024" },
  { img: "/images/cert-autofest-soccer.jpg", cap: "BUET Autofest 2024 (Soccer)" },
  { img: "/images/cert-autofest-race.jpg", cap: "BUET Autofest 2024 (Race)" },
];

type GalleryItem = { img: string; cap: string };

export default function Robotics() {
  const [lightbox, setLightbox] = useState<{
    items: GalleryItem[];
    index: number;
  } | null>(null);
  const [showCerts, setShowCerts] = useState(false);

  const showPrev = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : lb
    );
  const showNext = () =>
    setLightbox((lb) =>
      lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : lb
    );

  return (
    <section id="robotics" className="py-24 bg-bg-main relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Robotics — Khepa Chakka"
          tag="03 — Robotics"
          subtitle="Founder & team lead. I take robots from concept to the competition floor — line-following, soccer, race, and battle bots."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 aspect-video mb-16 relative group"
        >
          <video
            controls
            preload="metadata"
            playsInline
            poster="/images/build-battlebot.jpg"
            className="w-full h-full object-cover bg-slate-100"
          >
            <source src="/v1 robo.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <ImageGrid
          title="Robots I've built"
          items={robots}
          onClick={(items, index) => setLightbox({ items, index })}
        />
        <ImageGrid
          title="On the podium"
          items={podiums}
          onClick={(items, index) => setLightbox({ items, index })}
        />
        {showCerts ? (
          <ImageGrid
            title="Certificates"
            items={certs}
            onClick={(items, index) => setLightbox({ items, index })}
            contain
            cols={2}
          />
        ) : (
          <div className="mb-16">
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">
              Certificates
            </h3>
            <button
              onClick={() => setShowCerts(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-white border border-gray-200 hover:border-brand-cyan hover:text-brand-cyan px-5 py-2.5 rounded-md transition-all cursor-pointer"
            >
              View certificates ({certs.length})
            </button>
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={20} />
          </button>

          {lightbox.items.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
            <Image
              src={lightbox.items[lightbox.index].img}
              alt={lightbox.items[lightbox.index].cap}
              fill
              className="object-contain rounded-lg shadow-2xl"
            />
            <div className="absolute bottom-[-40px] inset-x-0 text-center text-slate-600 font-medium text-sm">
              {lightbox.items[lightbox.index].cap}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ImageGrid({
  title,
  items,
  onClick,
  contain = false,
  cols = 3,
}: {
  title: string;
  items: GalleryItem[];
  onClick: (items: GalleryItem[], index: number) => void;
  contain?: boolean;
  cols?: 2 | 3;
}) {
  return (
    <div className="mb-16">
      <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">
        {title}
      </h3>
      <div className={`grid gap-5 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {items.map((item, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative rounded-xl overflow-hidden cursor-zoom-in bg-white border border-gray-100 group shadow-sm hover:shadow-lg transition-shadow duration-300"
            onClick={() => onClick(items, i)}
          >
            <div className="aspect-[4/3] w-full relative">
              <Image
                src={item.img}
                alt={item.cap}
                fill
                className={`${
                  contain ? "object-contain p-4" : "object-cover"
                } group-hover:scale-105 transition-transform duration-500`}
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-white/95 to-transparent text-slate-700 text-sm font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
              <span>{item.cap}</span>
              <ZoomIn size={14} className="text-brand-cyan" />
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
