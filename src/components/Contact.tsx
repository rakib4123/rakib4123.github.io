"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Reveal from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const detail = "flex flex-col-reverse gap-1 border-t border-line py-4";
const detailLabel = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";

const outline =
  "inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong bg-surface px-6 text-[15px] font-medium text-ink transition-colors hover:border-ink hover:text-ink";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("r1.rakibhossain1@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText("+8801632941507");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <section id="contact" className="pb-24 lg:scroll-mt-24">
      <SectionHeading
        index="07"
        label="Contact"
        title={
          <>
            Have an open role or a model that needs to <em>ship</em>? Let&apos;s talk.
          </>
        }
      >
        I&apos;m open to roles in data science, machine learning, and AI automation, including full-stack
        engineering for ML products. Typical response time is under 24 hours.
      </SectionHeading>

      <Reveal className="flex flex-col gap-10">
        {/* Recruiter Callout Box */}
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                Recruiter &amp; Team Fast-Track
              </p>
              <h4 className="text-lg font-semibold text-ink mt-0.5">
                Ready for interviews &amp; technical evaluations
              </h4>
              <p className="text-sm text-ink-soft max-w-xl mt-1">
                Open to on-site, hybrid, and remote roles globally. Available to discuss project
                architecture, machine learning pipelines, or review code repositories.
              </p>
            </div>
            <Link
              href="/resume"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-transform hover:scale-105"
            >
              View Full Résumé <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Primary Contact Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:r1.rakibhossain1@gmail.com"
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-[filter] hover:brightness-110"
          >
            <Mail size={16} aria-hidden="true" /> Email me directly
          </a>

          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-[14px] font-mono text-ink transition-colors hover:border-ink"
            aria-label="Copy email address to clipboard"
          >
            {copiedEmail ? (
              <>
                <Check size={15} className="text-emerald-600" aria-hidden="true" />
                <span className="font-semibold text-emerald-700">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} aria-hidden="true" />
                <span>Copy Email</span>
              </>
            )}
          </button>

          <a href="https://github.com/rakib4123" {...external} className={outline}>
            <FaGithub size={16} aria-hidden="true" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
            {...external}
            className={outline}
          >
            <FaLinkedin size={16} aria-hidden="true" /> LinkedIn
          </a>
        </div>

        {/* Structured Details with 1-Click Copy */}
        <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-3">
          <div className={detail}>
            <dd className="flex items-center justify-between text-[15px] text-ink">
              <a href="mailto:r1.rakibhossain1@gmail.com" className="hover:text-accent truncate">
                r1.rakibhossain1@gmail.com
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="ml-2 text-muted hover:text-ink p-1"
                title="Copy email"
                aria-label="Copy email"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-600" /> : <Copy size={13} />}
              </button>
            </dd>
            <dt className={detailLabel}>Direct Email</dt>
          </div>

          <div className={detail}>
            <dd className="flex items-center justify-between text-[15px] text-ink">
              <a href="tel:+8801632941507" className="hover:text-accent">
                +880 1632 941507
              </a>
              <button
                type="button"
                onClick={copyPhone}
                className="ml-2 text-muted hover:text-ink p-1"
                title="Copy phone number"
                aria-label="Copy phone"
              >
                {copiedPhone ? <Check size={14} className="text-emerald-600" /> : <Copy size={13} />}
              </button>
            </dd>
            <dt className={detailLabel}>Phone / WhatsApp</dt>
          </div>

          <div className={detail}>
            <dd className="text-[15px] text-ink">Dhaka, Bangladesh (Remote Ready)</dd>
            <dt className={detailLabel}>Location &amp; Work Auth</dt>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}
