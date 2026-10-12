"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, Trophy } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import Reveal from "./Reveal";
import { Lightbox, PhotoGrid, useGallery } from "./Gallery";

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
];

const floor = [
  { img: "/images/floor-csfest-match.jpg", cap: "Robot Soccer match · AIUB CS Fest 2024" },
  { img: "/images/floor-csfest-team.jpg", cap: "Robot Soccer teams · AIUB CS Fest 2024" },
];

const certs = [
  { img: "/images/cert-techfest-winner.jpg", cap: "Techfest IIT Bombay 2024 · Cozmo Clench winner" },
  { img: "/images/cert-csfest.jpg", cap: "AIUB CS Fest 2024" },
  { img: "/images/cert-technoxian.jpg", cap: "Technoxian Bangladesh 2024 · Robo Race" },
  { img: "/images/cert-techfest.jpg", cap: "Techfest IIT Bombay 2024 · participation" },
  { img: "/images/cert-autofest-soccer.jpg", cap: "BUET Autofest 2024 · soccer" },
  { img: "/images/cert-autofest-race.jpg", cap: "BUET Autofest 2024 · race" },
];

const headline = [
  {
    rank: "Winner",
    title: "Cozmo Clench",
    org: "Techfest, IIT Bombay (Bangladesh Zonal) · 2024",
    note: "One of Asia's largest science and technology festivals.",
  },
  {
    rank: "Champion",
    title: "Robot Soccer",
    org: "AIUB CS Fest · 2024",
    note: "",
  },
];

const awards = [
  { year: "2025", title: "1st Runner-up — Nano Battle Bot", org: "National Robotics Championship" },
  { year: "2025", title: "2nd Runner-up — Robo Race", org: "National Robotics Championship" },
  { year: "2025", title: "1st Runner-up — Robot Soccer", org: "AIUB Robotic Crew (ARC)" },
  { year: "2024", title: "1st Runner-up — Robo Race", org: "Technoxian Bangladesh National Round" },
  { year: "2024", title: "Competitor — Soccer Bot & Robo Race", org: "BUET Autofest, plus national and inter-university events" },
];

export default function Robotics() {
  const { lightbox, open, close, prev, next } = useGallery();
  const [playing, setPlaying] = useState(false);

  return (
    <section id="robotics" className="mx-auto flex max-w-[1200px] flex-col gap-14 px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <SectionHeading
        tag="03 — Robotics"
        title="Khepa Chakka, the robotics team I founded."
        subtitle="Since 2023 I've led the team from concept to the competition floor: line-following, soccer, race and battle bots, plus an Arduino-based quadcopter. Six podiums so far."
      />

      <Reveal>
        {playing ? (
          <video
            controls
            autoPlay
            playsInline
            poster="/images/comp-team-trophy.jpg"
            className="aspect-video w-full rounded-2xl border border-line bg-surface-2 object-cover"
          >
            <source src="/v1 robo.mp4" type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="zoom group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl border border-line"
          >
            <Image src="/images/comp-team-trophy.jpg" alt="" fill sizes="(min-width: 1200px) 1100px, 100vw" className="object-cover" />
            <span className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute bottom-6 left-6 flex items-center gap-4 sm:bottom-10 sm:left-10">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-ink transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                <Play size={26} fill="currentColor" aria-hidden="true" />
              </span>
              <span className="flex flex-col text-left">
                <span className="text-xl font-semibold sm:text-2xl">Watch the team reel</span>
                <span className="text-sm text-ink-soft">Khepa Chakka on the competition floor</span>
              </span>
            </span>
          </button>
        )}
      </Reveal>

      <div id="awards" className="flex scroll-mt-24 flex-col gap-10">
        <div className="grid gap-5 md:grid-cols-2">
          {headline.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.1} className="flex">
              <article className="tilt relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl border border-accent-line bg-surface p-8">
                <Trophy
                  size={120}
                  strokeWidth={1}
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-4 text-accent opacity-10"
                />
                <span className="w-fit rounded-full bg-accent px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.08em] text-accent-ink">
                  {h.rank}
                </span>
                <h3 className="text-[32px] font-semibold leading-tight tracking-[-0.03em]">{h.title}</h3>
                <p className="text-ink-soft">{h.org}</p>
                {h.note && <p className="text-sm text-muted">{h.note}</p>}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="sr-only">More awards</h3>
          <ul className="border-t border-line">
            {awards.map((aw) => (
              <li
                key={aw.title + aw.org}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line px-3 py-4.5 transition-colors hover:bg-surface"
              >
                <span className="w-16 shrink-0 font-mono text-[13px] text-muted">{aw.year}</span>
                <span className="min-w-60 flex-1 font-medium">{aw.title}</span>
                <span className="min-w-60 flex-1 text-[15px] text-muted">{aw.org}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <PhotoGrid title="On the podium" items={podiums} onOpen={open} />
      <PhotoGrid title="Robots I've built" items={robots} onOpen={open} />
      <PhotoGrid title="On the competition floor" items={floor} onOpen={open} />
      <PhotoGrid title="Certificates" items={certs} onOpen={open} contain />

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
