"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { GraduationCap, Trophy } from "lucide-react";
import SpotlightCard from "./SpotlightCard";

const education = [
  {
    year: "Expected 2026",
    title: "B.Sc. in Computer Science & Engineering",
    org: "American International University-Bangladesh (AIUB)",
  },
  {
    year: "2021",
    title: "Higher Secondary Certificate — Science",
    org: "Dhaka Imperial College",
  },
  {
    year: "2019",
    title: "Secondary School Certificate — Science",
    org: "Dhaka Collegiate School",
  },
];

const awards = [
  {
    year: "2024",
    title: "Champion — Robot Soccer",
    org: "AIUB CS Fest",
    rank: "Champion",
    rankColor: "bg-brand-gold/10 text-brand-gold border-brand-gold/30",
  },
  {
    year: "2024",
    title: "Winner — Cozmo Clench",
    org: "Techfest, IIT Bombay (Bangladesh Zonal)",
    rank: "Winner",
    rankColor: "bg-brand-gold/10 text-brand-gold border-brand-gold/30",
  },
  {
    year: "2025",
    title: "1st Runner-up — Nano Battle Bot",
    org: "National Robotics Championship",
    rank: "1st Runner-up",
    rankColor: "bg-surface-2 text-ink-soft border-line-strong",
  },
  {
    year: "2025",
    title: "2nd Runner-up — Robo Race",
    org: "National Robotics Championship",
    rank: "2nd Runner-up",
    rankColor: "bg-brand-orange/10 text-orange-300 border-brand-orange/30",
  },
  {
    year: "2024",
    title: "1st Runner-up — Robo Race",
    org: "Technoxian Bangladesh National Round",
    rank: "1st Runner-up",
    rankColor: "bg-surface-2 text-ink-soft border-line-strong",
  },
  {
    year: "—",
    title: "1st Runner-up — Robot Soccer",
    org: "AIUB Robotic Crew (ARC)",
    rank: "1st Runner-up",
    rankColor: "bg-surface-2 text-ink-soft border-line-strong",
  },
  {
    year: "2024",
    title: "Competitor — Soccer Bot & Robo Race",
    org: "BUET Autofest, plus further national & inter-university events",
    rank: "Competed",
    rankColor: "bg-brand-red/10 text-red-300 border-brand-red/30",
  },
];

export default function Timeline() {
  return (
    <section id="awards" className="py-24 bg-surface relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          title="Awards & Education"
          tag="05 — Timeline"
          subtitle="Podium finishes across national and inter-university robotics competitions, including one of Asia's largest science & technology festivals."
        />

        <div className="relative border-l-2 border-line ml-4 md:ml-8 mt-12 space-y-12 pb-8">
          {/* Awards */}
          <div className="relative">
            <div className="absolute -left-[21px] md:-left-[25px] bg-brand-red p-2 rounded-full text-white shadow-[0_4px_12px_rgba(215,38,61,0.3)]">
              <Trophy size={16} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-ink ml-8 md:ml-10 mb-6">
              Awards & Honors
            </h3>

            <div className="space-y-4 ml-8 md:ml-10">
              {awards.map((aw, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <SpotlightCard className="relative bg-surface border border-line rounded-lg p-5 hover:shadow-md hover:border-line-strong transition-all group overflow-hidden">
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-brand-red scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-xs font-semibold text-brand-red mb-1">
                          {aw.year}
                        </div>
                        <h4 className="text-base font-semibold text-ink mb-0.5">
                          {aw.title}
                        </h4>
                        <p className="text-sm text-muted">{aw.org}</p>
                      </div>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-sm font-mono uppercase text-[10px] tracking-wider font-semibold border whitespace-nowrap self-start ${aw.rankColor}`}
                      >
                        {aw.rank}
                      </span>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="relative pt-4">
            <div className="absolute -left-[21px] md:-left-[25px] bg-brand-orange p-2 rounded-full text-white shadow-[0_4px_12px_rgba(244,124,32,0.3)]">
              <GraduationCap size={16} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-ink ml-8 md:ml-10 mb-6">
              Education
            </h3>

            <div className="space-y-4 ml-8 md:ml-10">
              {education.map((ed, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <SpotlightCard className="relative bg-surface border border-line rounded-lg p-5 hover:shadow-md hover:border-line-strong transition-all group overflow-hidden">
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-brand-orange scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <div className="font-mono text-xs font-semibold text-brand-orange mb-1">
                      {ed.year}
                    </div>
                    <h4 className="text-base font-semibold text-ink mb-0.5">
                      {ed.title}
                    </h4>
                    <p className="text-sm text-muted">{ed.org}</p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
