"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Sculpture from "./Sculpture";

const sections = [
  { id: "about", name: "About" },
  { id: "experience", name: "Experience" },
  { id: "work", name: "Work" },
  { id: "research", name: "Research" },
  { id: "robotics", name: "Robotics" },
  { id: "skills", name: "Skills" },
  { id: "contact", name: "Contact" },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const iconLink =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-surface text-ink-soft transition-colors hover:border-ink hover:text-ink";

/**
 * Who I am, the sculpture and the section index. On wide screens it stays
 * pinned on the left while the content scrolls past on the right; on narrow
 * ones it is simply the top of the page.
 */
export default function Sidebar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="flex flex-col pt-16 lg:sticky lg:top-0 lg:h-svh lg:w-[44%] lg:shrink-0 lg:py-14">
      <div className="flex flex-col gap-5">
        <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
          <span className="live h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Open to roles
        </p>
        <h1 className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-[0.92] tracking-[-0.015em] text-ink">
          Md. Rakib Hossain
        </h1>
        <p className="text-lg font-medium tracking-[-0.01em] text-ink lg:text-xl">
          Data Science · AI/ML · Computer Vision
        </p>
        <p className="max-w-[400px] leading-relaxed text-ink-soft [@media(min-width:1024px)_and_(max-height:760px)]:hidden">
          CSE student at AIUB. I take ML from dataset curation to calibrated, deployed models, and
          build the applications around them.
        </p>
      </div>

      <Sculpture className="relative my-4 h-[300px] sm:h-[380px] lg:my-2 lg:h-auto lg:min-h-[150px] lg:flex-1" />

      <nav aria-label="Sections" className="hidden lg:block">
        <ul className="flex flex-col">
          {sections.map((s, i) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center gap-4 py-[5px]"
                >
                  <span className="w-5 font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`h-px transition-all duration-300 ${
                      isActive ? "w-16 bg-ink" : "w-8 bg-line-strong group-hover:w-16 group-hover:bg-ink"
                    }`}
                  />
                  <span
                    className={`font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                      isActive ? "text-ink" : "text-muted group-hover:text-ink"
                    }`}
                  >
                    {s.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-8">
        <Link
          href="/resume"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-[filter] hover:brightness-110"
        >
          Résumé <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <a href="https://github.com/rakib4123" {...external} aria-label="GitHub" className={iconLink}>
          <FaGithub size={17} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
          {...external}
          aria-label="LinkedIn"
          className={iconLink}
        >
          <FaLinkedin size={17} aria-hidden="true" />
        </a>
        <a href="mailto:r1.rakibhossain1@gmail.com" aria-label="Email" className={iconLink}>
          <Mail size={17} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
