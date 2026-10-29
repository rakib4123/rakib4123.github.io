"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Mail, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Sculpture from "./Sculpture";
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

        {/* Right Column: 3D AI Chip Hardware Stage */}
        <Reveal delay={0.15} className="relative flex justify-center">
          <div className="relative w-full max-w-[420px] rounded-3xl border border-line-strong/80 bg-surface/80 backdrop-blur-md p-4 sm:p-6 shadow-2xl shadow-black/5 dark:shadow-black/30">
            {/* Ambient Backlight */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-3xl bg-linear-to-tr from-accent/20 via-transparent to-accent/10 blur-xl opacity-60"
            />

            {/* Chip Header Bar */}
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-accent" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Interactive 3D Hardware
                </span>
              </div>
              <span className="font-mono text-[10px] text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-full">
                Three.js · GLSL
              </span>
            </div>

            {/* The 3D Canvas */}
            <div className="relative my-2 h-[300px] sm:h-[340px] w-full">
              <Sculpture className="h-full w-full" />
            </div>

            {/* Chip Footer Metadata */}
            <div className="border-t border-line pt-3 flex items-center justify-between text-[11px] font-mono text-muted">
              <span>Hover chip to accelerate pulses</span>
              <span className="text-accent">ai_chip 0.99</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

