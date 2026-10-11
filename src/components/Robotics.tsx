"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";
import { ImageGrid, Lightbox, useGallery } from "./Gallery";

const robots = [
  { img: "/images/build-battlebot.jpg", cap: "Battle bot (Wedge + blade)" },
  { img: "/images/build-soccerbot-top.jpg", cap: "Soccer bot (Electronics)" },
  { img: "/images/build-soccerbot-angle.jpg", cap: "Soccer bot (Steel body)" },
  { img: "/images/build-quadcopter.jpg", cap: "Quadcopter (Arduino UNO flight controller)" },
];

const podiums = [
  { img: "/images/comp-techfest.jpg", cap: "Winner · Techfest IIT Bombay 2024" },
  { img: "/images/comp-nrc-battlebot.jpg", cap: "1st Runner-up · NRC 2025" },
  { img: "/images/comp-nrc-roborace.jpg", cap: "2nd Runner-up · NRC 2025" },
  { img: "/images/comp-technoxian.jpg", cap: "Runner-up · Technoxian BD 2024" },
  { img: "/images/comp-aiub-trophies.jpg", cap: "Runner-up · AIUB Robotic Crew" },
  { img: "/images/comp-team-trophy.jpg", cap: "Team Khepa Chakka" },
];

const floor = [
  { img: "/images/floor-csfest-match.jpg", cap: "Robot Soccer match · AIUB CS Fest 2024" },
  { img: "/images/floor-csfest-team.jpg", cap: "Robot Soccer teams · AIUB CS Fest 2024" },
];

const certs = [
  { img: "/images/cert-csfest.jpg", cap: "AIUB CS Fest 2024" },
  { img: "/images/cert-techfest-winner.jpg", cap: "Techfest IIT Bombay 2024 — Cozmo Clench Winner" },
  { img: "/images/cert-techfest.jpg", cap: "Techfest IIT Bombay 2024 — Participation" },
  { img: "/images/cert-technoxian.jpg", cap: "Technoxian Bangladesh 2024 (Robo Race Runner-up)" },
  { img: "/images/cert-autofest-soccer.jpg", cap: "BUET Autofest 2024 (Soccer)" },
  { img: "/images/cert-autofest-race.jpg", cap: "BUET Autofest 2024 (Race)" },
];

export default function Robotics() {
  const { lightbox, open, close, prev, next } = useGallery();
  const [showCerts, setShowCerts] = useState(false);

  return (
    <section id="robotics" className="py-24 bg-bg-main relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Robotics — Khepa Chakka"
          tag="04 — Robotics"
          subtitle="Founder & team lead. I take robots from concept to the competition floor — line-following, soccer, race, and battle bots, plus an Arduino-based quadcopter."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-line aspect-video mb-16 relative group"
        >
          <video
            controls
            preload="metadata"
            playsInline
            poster="/images/build-battlebot.jpg"
            className="w-full h-full object-cover bg-surface-2"
          >
            <source src="/v1 robo.mp4" type="video/mp4" />
          </video>
        </motion.div>

        <ImageGrid
          title="Robots I've built"
          items={robots}
          onClick={open}
        />
        <ImageGrid
          title="On the podium"
          items={podiums}
          onClick={open}
        />
        <ImageGrid
          title="On the competition floor"
          items={floor}
          onClick={open}
        />
        {showCerts ? (
          <ImageGrid
            title="Certificates"
            items={certs}
            onClick={open}
            contain
            cols={2}
          />
        ) : (
          <div className="mb-16">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-ink mb-6">
              Certificates
            </h3>
            <button
              onClick={() => setShowCerts(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft bg-surface border border-line hover:border-brand-red hover:text-brand-red px-5 py-2.5 rounded-md transition-all cursor-pointer"
            >
              View certificates ({certs.length})
            </button>
          </div>
        )}
      </div>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />

    </section>
  );
}
