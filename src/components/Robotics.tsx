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
    <section id="robotics" className="pb-28 lg:scroll-mt-24 lg:pb-36">
      <SectionHeading
        index="05"
        label="Robotics & awards"
        title={
          <>
            Khepa Chakka, the robotics team I <em>founded</em>.
          </>
        }
      >
        Since 2023 I&apos;ve led the team from concept to the competition floor: line-following,
        soccer, race and battle bots, plus an Arduino-based quadcopter. Six podiums so far.
      </SectionHeading>

      <Reveal>
        {playing ? (
          <video
            controls
            autoPlay
            playsInline
            poster="/images/comp-team-trophy.jpg"
            className="aspect-video w-full rounded-3xl border border-line bg-surface-2 object-cover"
          >
            <source src="/v1 robo.mp4" type="video/mp4" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="zoom group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-3xl border border-line"
          >
            <Image src="/images/comp-team-trophy.jpg" alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
            <span className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
            <span className="absolute bottom-5 left-5 flex items-center gap-4 sm:bottom-8 sm:left-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                <Play size={22} fill="currentColor" aria-hidden="true" />
              </span>
              <span className="flex flex-col text-left">
                <span className="text-lg font-semibold text-white sm:text-xl">Watch the team reel</span>
                <span className="text-sm text-white/80">Khepa Chakka on the competition floor</span>
              </span>
            </span>
          </button>
        )}
      </Reveal>

      <div id="awards" className="mt-12 flex scroll-mt-20 flex-col gap-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {headline.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.1} className="flex">
              <article className="flex w-full flex-col gap-3 rounded-2xl border border-line bg-surface p-6 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(14,18,32,0.3)]">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                  <Trophy size={14} aria-hidden="true" /> {h.rank}
                </span>
                <h3 className="font-display text-[34px] leading-none text-ink">{h.title}</h3>
                <p className="text-[15px] text-ink-soft">{h.org}</p>
                {h.note && <p className="text-sm text-muted">{h.note}</p>}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">More awards</h3>
          <ul>
            {awards.map((aw) => (
              <li
                key={aw.title + aw.org}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[80px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[13px] text-muted">{aw.year}</span>
                <div className="flex flex-col">
                  <span className="font-medium text-ink">{aw.title}</span>
                  <span className="text-[15px] text-muted">{aw.org}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col gap-12">
        <PhotoGrid title="On the podium" items={podiums} onOpen={open} />
        <PhotoGrid title="Robots I've built" items={robots} onOpen={open} />
        <PhotoGrid title="On the competition floor" items={floor} onOpen={open} />
        <PhotoGrid title="Certificates" items={certs} onOpen={open} contain />
      </div>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
