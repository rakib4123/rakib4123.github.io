"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const robots = [
  { img: "/images/build-battlebot.jpg", cap: "Battle bot — wedge + blade" },
  { img: "/images/build-soccerbot-top.jpg", cap: "Soccer bot — electronics" },
  { img: "/images/build-soccerbot-angle.jpg", cap: "Soccer bot — steel body" },
  { img: "/images/build-racebot-top.jpg", cap: "Race bot — chassis" },
  { img: "/images/build-racebot-angle.jpg", cap: "Race bot — drivetrain" },
];

const podiums = [
  { img: "/images/comp-techfest.jpg", cap: "Winner · Techfest IIT Bombay 2024" },
  { img: "/images/comp-nrc-battlebot.jpg", cap: "1st runner-up · NRC 2025" },
  { img: "/images/comp-nrc-roborace.jpg", cap: "2nd runner-up · NRC 2025" },
  { img: "/images/comp-technoxian.jpg", cap: "Runner-up · Technoxian BD 2024" },
  { img: "/images/comp-aiub-trophies.jpg", cap: "Runner-up · AIUB Robotic Crew" },
  { img: "/images/comp-team-trophy.jpg", cap: "Team Khepa Chakka" },
];

const certs = [
  { img: "/images/cert-csfest.jpg", cap: "AIUB CS Fest 2024" },
  { img: "/images/cert-techfest.jpg", cap: "Techfest IIT Bombay 2024" },
  { img: "/images/cert-autofest-soccer.jpg", cap: "BUET Autofest 2024 — soccer" },
  { img: "/images/cert-autofest-race.jpg", cap: "BUET Autofest 2024 — race" },
];

type GalleryItem = { img: string; cap: string };

export default function Robotics() {
  const [lightbox, setLightbox] = useState<{ items: GalleryItem[]; index: number } | null>(null);
  const [showCerts, setShowCerts] = useState(false);

  const showPrev = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : lb));
  const showNext = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : lb));

  return (
    <section id="robotics" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading
        title="Robotics — Khepa Chakka"
        tag="04 — Robotics"
        subtitle="Founder and team lead since 2023. I take robots from concept to the competition floor across four classes — line-following, soccer, race and battle — coordinating members across mechanical design, electronics and software against competition deadlines. Active member of the Engineering Students' Association of Bangladesh (ESAB) at AIUB, collaborating with faculty on research and development."
      />

      <div className="rule-a shadow-hard bg-paper-lift mb-[clamp(2.5rem,6vw,4rem)]">
        <video
          controls
          preload="metadata"
          playsInline
          poster="/images/build-battlebot.jpg"
          className="w-full aspect-video object-cover block bg-paper"
        >
          <source src="/v1 robo.mp4" type="video/mp4" />
        </video>
      </div>

      <ImageGrid title="Robots I've built" items={robots} onClick={(items, index) => setLightbox({ items, index })} />
      <ImageGrid title="On the podium" items={podiums} onClick={(items, index) => setLightbox({ items, index })} />

      {showCerts ? (
        <ImageGrid
          title="Certificates"
          items={certs}
          onClick={(items, index) => setLightbox({ items, index })}
          contain
          cols={2}
        />
      ) : (
        <div className="mb-[clamp(2.5rem,6vw,4rem)]">
          <h3 className="font-display uppercase text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-6">Certificates</h3>
          <button
            onClick={() => setShowCerts(true)}
            className="rule-a bg-paper-lift px-5 py-2.5 font-mono text-[.8rem] uppercase tracking-[0.06em] text-petrol hover:bg-petrol hover:text-paper transition-colors cursor-pointer"
          >
            View certificates ({certs.length})
          </button>
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-paper/95 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full rule-a bg-paper-lift hover:bg-fluoro hover:text-paper flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setLightbox(null)}
            aria-label="Close image viewer"
          >
            <X size={20} />
          </button>

          {lightbox.items.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full rule-a bg-paper-lift hover:bg-fluoro hover:text-paper flex items-center justify-center transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full rule-a bg-paper-lift hover:bg-fluoro hover:text-paper flex items-center justify-center transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
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
              className="print-img object-contain"
            />
            <div className="absolute bottom-[-40px] inset-x-0 text-center font-mono text-[.78rem] uppercase tracking-[0.08em]">
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
    <div className="mb-[clamp(2.5rem,6vw,4rem)]">
      <h3 className="font-display uppercase text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-6">{title}</h3>
      <div className={`grid gap-5 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {items.map((item, i) => (
          <motion.figure
            key={item.img}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rule-a shadow-hard-hover bg-paper-lift m-0 cursor-zoom-in"
            onClick={() => onClick(items, i)}
          >
            <div className="aspect-[4/3] w-full relative">
              <Image
                src={item.img}
                alt={item.cap}
                fill
                className={`print-img ${contain ? "object-contain p-4" : "object-cover"}`}
              />
            </div>
            <figcaption className="rule-t px-3 py-2 font-mono text-[.7rem] uppercase tracking-[0.08em] flex justify-between gap-3">
              <span>{item.cap}</span>
              <span className="text-petrol shrink-0">[zoom]</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
