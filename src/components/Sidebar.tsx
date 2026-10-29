"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
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
 * Who I am, the 3D chip sculpture, and the section index. On wide screens it stays
 * pinned on the left while the content scrolls past on the right; on narrow
 * screens it is the header of the page.
 */
export default function Sidebar() {
  const [active, setActive] = useState("about");
  const [copied, setCopied] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("r1.rakibhossain1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="flex flex-col pt-16 lg:sticky lg:top-0 lg:h-svh lg:w-[44%] lg:shrink-0 lg:py-14">
      <div className="flex flex-col gap-4">
        {/* Recruiter Availability Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="inline-flex w-fit items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
            <span className="live h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" aria-hidden="true" />
            Open to Roles · 2026
          </p>
          <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-muted">
            Full-Time &amp; Remote
          </span>
        </div>

        <h1 className="font-display text-[clamp(2.75rem,4.5vw,4.25rem)] leading-[0.92] tracking-[-0.015em] text-ink">
          Md. Rakib Hossain
        </h1>
        <p className="text-lg font-medium tracking-[-0.01em] text-ink lg:text-xl">
          Data Science · AI/ML · Full-Stack Engineer
        </p>
        <p className="max-w-[420px] leading-relaxed text-ink-soft [@media(min-width:1024px)_and_(max-height:760px)]:hidden">
          IT Intern at Live Technologies and CSE student at AIUB. 3 first-author papers presented
          at IEEE COMPAS &amp; ICCA 2026. I take machine learning from dataset curation to calibrated,
          deployed models, and build the production applications around them.
        </p>

        {/* Quick Recruiter Snapshot Tags */}
        <div className="flex flex-wrap gap-2 text-xs font-mono text-muted [@media(min-width:1024px)_and_(max-height:760px)]:hidden">
          <span className="rounded-md border border-line/80 bg-surface px-2.5 py-1">
            📍 Dhaka (Open to Remote / Relo)
          </span>
          <span className="rounded-md border border-line/80 bg-surface px-2.5 py-1">
            🎓 B.Sc. CSE, AIUB
          </span>
        </div>
      </div>

      <Sculpture className="relative my-3 h-[280px] sm:h-[350px] lg:my-2 lg:h-auto lg:min-h-[140px] lg:flex-1" />

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
                  <span className="w-5 font-mono text-[11px] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`h-px transition-all duration-300 ${
                      isActive
                        ? "w-16 bg-ink"
                        : "w-8 bg-line-strong group-hover:w-16 group-hover:bg-ink"
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

      <div className="mt-5 flex flex-wrap items-center gap-2.5 lg:mt-6">
        <Link
          href="/resume"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-[filter] hover:brightness-110"
        >
          Résumé <ArrowUpRight size={15} aria-hidden="true" />
        </Link>

        {/* 1-Click Copy Email for Recruiters */}
        <button
          type="button"
          onClick={handleCopyEmail}
          aria-label={copied ? "Email copied" : "Copy email address"}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-xs font-mono font-medium text-ink-soft transition-colors hover:border-ink hover:text-ink"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-600" aria-hidden="true" />
              <span className="font-semibold text-emerald-700">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} aria-hidden="true" />
              <span>Copy Email</span>
            </>
          )}
        </button>

        <a
          href="https://github.com/rakib4123"
          {...external}
          aria-label="GitHub Profile"
          className={iconLink}
        >
          <FaGithub size={17} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
          {...external}
          aria-label="LinkedIn Profile"
          className={iconLink}
        >
          <FaLinkedin size={17} aria-hidden="true" />
        </a>
        <a
          href="mailto:r1.rakibhossain1@gmail.com"
          aria-label="Send Email"
          className={iconLink}
        >
          <Mail size={17} aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
