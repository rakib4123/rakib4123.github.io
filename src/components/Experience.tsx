"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { listRow } from "@/lib/utils";
import { Lightbox, useGallery } from "./Gallery";
import Reveal from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type Role = {
  years: string;
  role: string;
  org: string;
  desc: string;
  cert?: { img: string; cap: string };
};

const leadership: Role[] = [
  {
    years: "Oct 2026 – present",
    role: "IT Intern",
    org: "Live Technologies Ltd",
    desc: "Three-month internship in the Department of Information Technologies, working on data analysis, machine learning, backend and API development, and database integration.",
  },
  {
    years: "Oct 2026 – present",
    role: "Full-Stack Developer (Freelance)",
    org: "Durbar Robotics",
    desc: "Building durbarrobotics.com: an e-commerce store for robotics parts, a course platform with video lessons, and an instant-quote tool for 3D printing.",
  },
  {
    years: "Sep – Oct 2026",
    role: "Volunteer",
    org: "Bangladesh ICT & Innovation Awards 2026",
    desc: "Volunteered at the awards on 17 and 19 September and 3 October 2026, and was recognised with a certificate of appreciation from the Bangladesh ICT and Innovation Network (BIIN).",
    cert: {
      img: "/images/cert-biin-volunteer.jpg",
      cap: "Certificate of appreciation · Bangladesh ICT & Innovation Awards 2026 volunteer",
    },
  },
  {
    years: "2023 – present",
    role: "Founder & Team Lead",
    org: "Khepa Chakka robotics team",
    desc: "Founded and lead a competitive team building four classes of robots: line-following, soccer, race and battle. I coordinate members across mechanical design, electronics and software against competition deadlines.",
  },
];

const education = [
  { year: "2026", title: "B.Sc. in Computer Science & Engineering", org: "American International University-Bangladesh (AIUB)" },
  { year: "2021", title: "Higher Secondary Certificate — Science", org: "Dhaka Imperial College" },
  { year: "2019", title: "Secondary School Certificate — Science", org: "Dhaka Collegiate School" },
];

export default function Experience() {
  const { lightbox, open, close, prev, next } = useGallery();

  return (
    <section id="experience" className="pb-28 lg:scroll-mt-24 lg:pb-36">
      <SectionHeading index="02" label="Experience" title={<>Work, leadership &amp; <em>education</em>.</>} />

      <Reveal>
        <ol className="group/list -mx-5 flex flex-col gap-1">
          {leadership.map(({ cert, ...l }) => (
            <li key={l.org} className={`grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-6 ${listRow}`}>
              <span className="pt-1 font-mono text-xs uppercase tracking-[0.08em] text-muted">{l.years}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {l.role} <span className="font-normal text-accent">· {l.org}</span>
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{l.desc}</p>
                {cert && (
                  <button
                    type="button"
                    onClick={() => open([cert], 0)}
                    aria-label={`View certificate: ${cert.cap}`}
                    className="zoom group relative mt-2 block w-full max-w-[280px] cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface"
                  >
                    <Image
                      src={cert.img}
                      alt={cert.cap}
                      width={1600}
                      height={1183}
                      sizes="280px"
                      className="block h-auto w-full"
                    />
                    <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-surface/90 text-ink-soft shadow-sm transition-colors group-hover:text-accent">
                      <Maximize2 size={13} aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-12">
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">Education</h3>
        <ol>
          {education.map((ed) => (
            <li
              key={ed.title}
              className="grid gap-1 border-b border-line py-4 sm:grid-cols-[150px_1fr] sm:gap-6"
            >
              <span className="font-mono text-[13px] text-muted">{ed.year}</span>
              <div className="flex flex-col">
                <span className="font-medium text-ink">{ed.title}</span>
                <span className="text-[15px] text-muted">{ed.org}</span>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
