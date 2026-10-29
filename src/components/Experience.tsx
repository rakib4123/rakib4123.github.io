"use client";

import Image from "next/image";
import { Briefcase, GraduationCap, Maximize2 } from "lucide-react";
import { listRow } from "@/lib/utils";
import { Lightbox, useGallery } from "./Gallery";
import Reveal from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Role = {
  years: string;
  role: string;
  org: string;
  badge?: string;
  desc: string;
  cert?: { img: string; cap: string };
};

const leadership: Role[] = [
  {
    years: "Oct 2026 – present",
    role: "IT Intern",
    org: "Live Technologies Ltd",
    badge: "Current Role",
    desc: "Department of Information Technologies: engineering machine-learning systems, backend REST APIs, data pipelines, and database integration for high-traffic mobile services.",
  },
  {
    years: "Oct 2026 – present",
    role: "Full-Stack Developer (Freelance)",
    org: "Durbar Robotics",
    badge: "Web Engineering",
    desc: "Architecting durbarrobotics.com: e-commerce platform for robotics hardware components, LMS video course player, and an algorithmic instant-quote calculation engine for custom 3D printing orders.",
  },
  {
    years: "Sep – Oct 2026",
    role: "Technical Volunteer",
    org: "Bangladesh ICT & Innovation Awards 2026",
    badge: "Service Distinction",
    desc: "Facilitated award operations on 17 and 19 September and 3 October 2026. Awarded a Certificate of Appreciation by the Bangladesh ICT and Innovation Network (BIIN).",
    cert: {
      img: "/images/cert-biin-volunteer.jpg",
      cap: "Certificate of Appreciation · Bangladesh ICT & Innovation Awards 2026",
    },
  },
  {
    years: "2023 – present",
    role: "Founder & Team Lead",
    org: "Khepa Chakka Robotics",
    badge: "Leadership · 6 Podiums",
    desc: "Founded and lead a competitive robotics crew building four classes of robots: line-following, soccer, race, and battle bots. Coordinate members across CAD mechanical fabrication, embedded firmware (Arduino/ESP32), and competition strategy.",
  },
];

const education = [
  {
    year: "2026",
    title: "B.Sc. in Computer Science & Engineering",
    org: "American International University-Bangladesh (AIUB)",
    details: "Focus: Data Science, Machine Learning, Computer Vision & Distributed Systems.",
  },
  {
    year: "2021",
    title: "Higher Secondary Certificate — Science",
    org: "Dhaka Imperial College",
    details: "Concentration in Higher Mathematics, Physics, and Chemistry.",
  },
  {
    year: "2019",
    title: "Secondary School Certificate — Science",
    org: "Dhaka Collegiate School",
    details: "Foundational STEM coursework and competitive programming.",
  },
];

export default function Experience() {
  const { lightbox, open, close, prev, next } = useGallery();

  return (
    <section id="experience" className="pb-24 sm:pb-32 lg:scroll-mt-24">
      <SectionHeading
        index="02"
        label="Experience"
        title={
          <>
            Engineering roles, leadership &amp; <em>education</em>.
          </>
        }
      >
        Industry internship experience, freelance product delivery, team leadership, and academic
        training.
      </SectionHeading>

      <Reveal>
        <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-wider text-muted">
          <Briefcase size={15} className="text-accent" />
          <span>Professional Experience &amp; Leadership</span>
        </div>
        <ol className="flex flex-col gap-3">
          {leadership.map(({ cert, ...l }) => (
            <li
              key={l.org}
              className={`rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-line-strong hover:shadow-md ${listRow}`}
            >
              <div className="grid gap-4 sm:grid-cols-[160px_1fr] sm:gap-6">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-muted uppercase tracking-wider">
                    {l.years}
                  </span>
                  {l.badge && (
                    <span className="w-fit rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-accent">
                      {l.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {l.role} <span className="font-normal text-accent">· {l.org}</span>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft">{l.desc}</p>
                  {cert && (
                    <button
                      type="button"
                      onClick={() => open([cert], 0)}
                      aria-label={`View certificate: ${cert.cap}`}
                      className="zoom group relative mt-2 block w-full max-w-[260px] cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface-2"
                    >
                      <Image
                        src={cert.img}
                        alt={cert.cap}
                        width={1600}
                        height={1183}
                        sizes="260px"
                        className="block h-auto w-full"
                      />
                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 text-ink-soft shadow-sm transition-colors group-hover:text-accent">
                        <Maximize2 size={13} aria-hidden="true" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-14">
        <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-wider text-muted">
          <GraduationCap size={16} className="text-accent" />
          <span>Education</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {education.map((ed) => (
            <div
              key={ed.title}
              className="rounded-2xl border border-line bg-surface p-5 flex flex-col justify-between gap-3 shadow-xs"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-accent">{ed.year}</span>
                <h4 className="font-semibold text-ink text-[15px] mt-1 leading-snug">{ed.title}</h4>
                <p className="text-xs text-muted mt-1">{ed.org}</p>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed border-t border-line/60 pt-3">
                {ed.details}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
