"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const awards: { year: string; title: string; org: string; rank: string }[] = [
  {
    year: "2024",
    title: "Cozmo Clench",
    org: "Techfest, IIT Bombay — Bangladesh Zonal",
    rank: "Winner",
  },
  { year: "2024", title: "Robot Soccer", org: "AIUB CS Fest", rank: "Champion" },
  { year: "2025", title: "Nano Battle Bot", org: "National Robotics Championship", rank: "1st runner-up" },
  { year: "2025", title: "Robo Race", org: "National Robotics Championship", rank: "2nd runner-up" },
  { year: "2024", title: "Robo Race", org: "Technoxian Bangladesh National Round", rank: "1st runner-up" },
  { year: "—", title: "Robot Soccer", org: "AIUB Robotic Crew (ARC)", rank: "1st runner-up" },
  {
    year: "2024",
    title: "Soccer Bot & Robo Race",
    org: "BUET Autofest, plus further national and inter-university events",
    rank: "Competed",
  },
];

const education: { year: string; title: string; org: string }[] = [
  {
    year: "Expected 2026",
    title: "B.Sc. in Computer Science and Engineering",
    org: "American International University-Bangladesh (AIUB)",
  },
  { year: "2021", title: "Higher Secondary Certificate — Science", org: "Dhaka Imperial College" },
  { year: "2019", title: "Secondary School Certificate — Science", org: "Dhaka Collegiate School" },
];

export default function Timeline() {
  return (
    <section id="awards" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading
        title="Awards & Education"
        tag="05 — Awards & Education"
        subtitle="Podium finishes across national and inter-university robotics competitions, including one of Asia's largest science and technology festivals."
      />

      <div className="grid gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <h3 className="font-display uppercase text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-5">
            Awards and honors
          </h3>
          <ul className="leaders">
            {awards.map((aw) => (
              <li key={`${aw.title}-${aw.org}`} className="border-b border-ink last:border-b-0">
                <span className="min-w-0">
                  <span className="block font-medium">{aw.title}</span>
                  <span className="block font-mono text-[.72rem] text-ink/70 uppercase tracking-[0.06em]">
                    {aw.year} · {aw.org}
                  </span>
                </span>
                <span className="leaders__fill" />
                <span className="leaders__v">{aw.rank}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <h3 className="font-display uppercase text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-5">
            Education
          </h3>
          <ul className="leaders">
            {education.map((ed) => (
              <li key={ed.title} className="border-b border-ink last:border-b-0">
                <span className="min-w-0">
                  <span className="block font-medium">{ed.title}</span>
                  <span className="block font-mono text-[.72rem] text-ink/70 uppercase tracking-[0.06em]">
                    {ed.org}
                  </span>
                </span>
                <span className="leaders__fill" />
                <span className="leaders__v">{ed.year}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
