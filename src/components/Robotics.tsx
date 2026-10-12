"use client";

import Image from "next/image";
import { useState } from "react";
import { Images, Play } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import Reveal from "./Reveal";
import { Lightbox, useGallery } from "./Gallery";

const robots = [
  { img: "/images/build-battlebot.jpg", cap: "Battle bot · wedge and blade" },
  { img: "/images/build-quadcopter.jpg", cap: "Quadcopter · Arduino UNO flight controller" },
  { img: "/images/build-soccerbot-top.jpg", cap: "Soccer bot · electronics" },
  { img: "/images/build-soccerbot-angle.jpg", cap: "Soccer bot · steel body" },
];

const podiums = [
  { img: "/images/comp-techfest.jpg", cap: "Winner · Techfest IIT Bombay 2024" },
  { img: "/images/comp-nrc-battlebot.jpg", cap: "1st Runner-up · NRC 2025" },
  { img: "/images/comp-nrc-roborace.jpg", cap: "2nd Runner-up · NRC 2025" },
  { img: "/images/comp-technoxian.jpg", cap: "1st Runner-up · Technoxian BD 2024" },
  { img: "/images/comp-aiub-trophies.jpg", cap: "1st Runner-up · AIUB Robotic Crew 2025" },
  { img: "/images/comp-team-trophy.jpg", cap: "Team Khepa Chakka" },
  { img: "/images/floor-csfest-match.jpg", cap: "Robot Soccer match · AIUB CS Fest 2024" },
  { img: "/images/floor-csfest-team.jpg", cap: "Robot Soccer teams · AIUB CS Fest 2024" },
];

const certs = [
  { img: "/images/cert-csfest.jpg", cap: "Certificate · AIUB CS Fest 2024" },
  { img: "/images/cert-techfest-winner.jpg", cap: "Certificate · Techfest IIT Bombay 2024, Cozmo Clench winner" },
  { img: "/images/cert-techfest.jpg", cap: "Certificate · Techfest IIT Bombay 2024, participation" },
  { img: "/images/cert-technoxian.jpg", cap: "Certificate · Technoxian Bangladesh 2024, Robo Race" },
  { img: "/images/cert-autofest-soccer.jpg", cap: "Certificate · BUET Autofest 2024, soccer" },
  { img: "/images/cert-autofest-race.jpg", cap: "Certificate · BUET Autofest 2024, race" },
];

const allPhotos = [...robots, ...podiums, ...certs];

/** Images shown on the page, by their index in `allPhotos`. */
const MAIN = 0;
const SIDE = [1, robots.length]; // quadcopter, Techfest win

const awards = [
  { year: "2024", title: "Champion — Robot Soccer", org: "AIUB CS Fest" },
  { year: "2024", title: "Winner — Cozmo Clench", org: "Techfest, IIT Bombay (Bangladesh Zonal)" },
  { year: "2025", title: "1st Runner-up — Nano Battle Bot", org: "National Robotics Championship" },
  { year: "2025", title: "2nd Runner-up — Robo Race", org: "National Robotics Championship" },
  { year: "2024", title: "1st Runner-up — Robo Race", org: "Technoxian Bangladesh National Round" },
  { year: "2025", title: "1st Runner-up — Robot Soccer", org: "AIUB Robotic Crew (ARC)" },
  { year: "2024", title: "Competitor — Soccer Bot & Robo Race", org: "BUET Autofest" },
];

const pill = "absolute bottom-4 left-4 rounded-full bg-bg/85 px-3.5 py-1.5 text-[13px] text-ink";

export default function Robotics() {
  const { lightbox, open, close, prev, next } = useGallery();
  const [playing, setPlaying] = useState(false);

  return (
    <section id="robotics" className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          tag="03 — Robotics"
          title="Khepa Chakka, the robotics team I founded."
          subtitle="From concept to the competition floor: soccer, race and battle bots, plus an Arduino-based quadcopter."
        />
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            disabled={playing}
            className="inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-accent disabled:cursor-default disabled:opacity-50"
          >
            <Play size={14} fill="currentColor" aria-hidden="true" /> Watch the team reel
          </button>
          <button
            type="button"
            onClick={() => open(allPhotos, 0)}
            className="inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-accent"
          >
            <Images size={15} aria-hidden="true" /> All photos ({allPhotos.length})
          </button>
        </div>
      </div>

      <Reveal className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        {playing ? (
          <video
            controls
            autoPlay
            playsInline
            poster={robots[MAIN].img}
            className="h-[300px] w-full rounded-2xl border border-line bg-surface-2 object-cover sm:h-[440px]"
          >
            <source src="/v1 robo.mp4" type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => open(allPhotos, MAIN)}
            aria-label={`View photo: ${robots[MAIN].cap}`}
            className="zoom relative h-[300px] cursor-zoom-in overflow-hidden rounded-2xl border border-line sm:h-[440px]"
          >
            <Image src={robots[MAIN].img} alt={robots[MAIN].cap} fill className="object-cover" />
            <span className={pill}>{robots[MAIN].cap}</span>
          </button>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {SIDE.map((i) => (
            <button
              key={allPhotos[i].img}
              type="button"
              onClick={() => open(allPhotos, i)}
              aria-label={`View photo: ${allPhotos[i].cap}`}
              className="zoom relative h-[212px] cursor-zoom-in overflow-hidden rounded-2xl border border-line"
            >
              <Image src={allPhotos[i].img} alt={allPhotos[i].cap} fill className="object-cover" />
              <span className={pill}>{allPhotos[i].cap}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <h3 className="sr-only">Awards</h3>
        <ul className="border-t border-line">
          {awards.map((aw) => (
            <li
              key={aw.title + aw.org}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line px-3 py-[18px] transition-colors hover:bg-surface"
            >
              <span className="w-16 shrink-0 font-mono text-[13px] text-muted">{aw.year}</span>
              <span className="min-w-[240px] flex-1 font-medium">{aw.title}</span>
              <span className="min-w-[240px] flex-1 text-[15px] text-muted">{aw.org}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
