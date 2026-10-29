"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Mail, Terminal } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Reveal from "./Reveal";

const iconLink =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-surface text-ink-soft transition-colors hover:border-ink hover:text-ink";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("r1.rakibhossain1@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        {/* Left Column: Headline, Bio & CTAs */}
        <Reveal className="flex flex-col gap-6">
          {/* Availability Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong/80 bg-surface px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-soft shadow-xs">
              <span className="live h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Open to Roles · 2026
            </span>
            <span className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
              Full-Time &amp; Remote Ready
            </span>
          </div>

          {/* Name & Headline */}
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-[clamp(3.2rem,6vw,5.2rem)] font-bold leading-[0.94] tracking-[-0.02em] text-ink">
              Md. Rakib Hossain
            </h1>
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-ink-soft">
              Machine Learning Systems · Data Science · Full-Stack Developer
            </p>
          </div>

          {/* Core Elevator Pitch */}
          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-ink-soft">
            IT Intern at <strong className="font-medium text-ink">Live Technologies</strong> &amp;
            final-year CSE student at <strong className="font-medium text-ink">AIUB</strong>.
            Published 3 first-author papers at <strong className="font-medium text-ink">IEEE COMPAS</strong> and{" "}
            <strong className="font-medium text-ink">ICCA 2026</strong>. Founder of{" "}
            <strong className="font-medium text-ink">Khepa Chakka</strong> robotics (6 podiums).
            I take ML from dataset curation to calibrated, deployed models, and engineer production
            applications around them.
          </p>

          {/* Key Quick Proof Strip */}
          <div className="grid grid-cols-3 gap-3 border-y border-line py-4 max-w-xl">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-ink">3 Papers</div>
              <div className="text-xs text-muted mt-0.5">First author · IEEE &amp; ICCA</div>
            </div>
            <div className="border-l border-line pl-3">
              <div className="text-xl sm:text-2xl font-bold font-mono text-ink">6 Podiums</div>
              <div className="text-xs text-muted mt-0.5">Techfest IIT Bombay winner</div>
            </div>
            <div className="border-l border-line pl-3">
              <div className="text-xl sm:text-2xl font-bold font-mono text-ink">Production</div>
              <div className="text-xs text-muted mt-0.5">RideGuard &amp; Drikon live</div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink hover:brightness-110 transition-all shadow-md shadow-accent/20"
            >
              Explore Work <ArrowDown size={15} aria-hidden="true" />
            </a>

            <Link
              href="/resume"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface px-6 text-sm font-medium text-ink hover:border-ink transition-colors"
            >
              Résumé <ArrowUpRight size={15} aria-hidden="true" />
            </Link>

            {/* 1-Click Copy Email Button */}
            <button
              type="button"
              onClick={copyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-xs font-mono font-medium text-ink-soft hover:border-ink hover:text-ink transition-colors"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500" aria-hidden="true" />
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} aria-hidden="true" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/rakib4123"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className={iconLink}
              >
                <FaGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className={iconLink}
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="mailto:r1.rakibhossain1@gmail.com"
                aria-label="Send direct email"
                className={iconLink}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Engineering Snapshot Card */}
        <Reveal delay={0.15} className="relative flex justify-center">
          <div className="relative w-full max-w-[440px] rounded-3xl border border-line-strong/80 bg-surface/85 backdrop-blur-md p-6 shadow-xl shadow-black/5 dark:shadow-black/25">
            {/* Ambient Backlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-3xl bg-linear-to-tr from-accent/15 via-transparent to-accent/5 blur-xl opacity-60"
            />

            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-line pb-3.5">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-accent" />
                <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                  Engineering Snapshot
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Dhaka · Active
              </span>
            </div>

            {/* Snapshot Highlights */}
            <div className="my-4 flex flex-col gap-3.5 text-xs">
              <div className="flex items-start justify-between gap-3 border-b border-line/60 pb-3">
                <span className="font-mono text-muted shrink-0">Current Role</span>
                <span className="font-medium text-ink text-right">
                  IT Intern @ <span className="text-accent">Live Technologies</span>
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 border-b border-line/60 pb-3">
                <span className="font-mono text-muted shrink-0">Education</span>
                <span className="font-medium text-ink text-right">
                  B.Sc. in CSE, AIUB <span className="font-mono text-accent font-semibold">(CGPA 3.86)</span>
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 border-b border-line/60 pb-3">
                <span className="font-mono text-muted shrink-0">Peer-Reviewed</span>
                <span className="font-medium text-ink text-right">
                  3 First-Author Papers <span className="text-muted">(IEEE COMPAS &amp; ICCA)</span>
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 border-b border-line/60 pb-3">
                <span className="font-mono text-muted shrink-0">Robotics Podiums</span>
                <span className="font-medium text-ink text-right">
                  6 National &amp; International <span className="text-muted">(Techfest, BIIN)</span>
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <span className="font-mono text-muted">Primary Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Python",
                    "PyTorch",
                    "CatBoost",
                    "YOLOv8/11",
                    "Next.js 15",
                    "NestJS 11",
                    "PostgreSQL",
                    "Docker",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-ink-soft"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t border-line pt-3.5 flex items-center justify-between text-[11px] font-mono">
              <span className="text-muted">Targeting Full-Time ML &amp; SWE</span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Fast-Track Hire &rarr;
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
