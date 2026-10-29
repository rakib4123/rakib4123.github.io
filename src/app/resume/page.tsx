import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Mail, Award, BookOpen, Briefcase, GraduationCap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Résumé & Credentials | Md. Rakib Hossain",
  description: "Curriculum Vitae of Md. Rakib Hossain — Data Science, Machine Learning & Full-Stack Engineer.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-bg pb-20">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        {/* Navigation & Actions Toolbar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <a
              href="mailto:r1.rakibhossain1@gmail.com"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <Mail size={15} aria-hidden="true" /> Contact
            </a>
            <a
              href="/Rakib_Hossain_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-accent"
            >
              <ExternalLink size={15} aria-hidden="true" /> Open PDF
            </a>
            <a
              href="/Rakib_Hossain_CV.pdf"
              download
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-[filter] hover:brightness-110"
            >
              <Download size={15} aria-hidden="true" /> Download CV (PDF)
            </a>
          </div>
        </div>

        {/* Mobile Recruiter Notice */}
        <div className="mb-8 rounded-2xl border border-line bg-surface p-5 sm:hidden">
          <h2 className="font-semibold text-ink text-base">Viewing on Mobile?</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Mobile browsers can have difficulty scrolling embedded PDFs. Tap below to open or download the complete PDF, or read the key credentials summary below.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <a
              href="/Rakib_Hossain_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-accent px-4 text-xs font-semibold text-accent-ink"
            >
              <ExternalLink size={13} /> Open Full PDF
            </a>
            <a
              href="/Rakib_Hossain_CV.pdf"
              download
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line-strong px-4 text-xs font-semibold text-ink"
            >
              <Download size={13} /> Download
            </a>
          </div>
        </div>

        {/* Desktop Embedded PDF Viewer */}
        <div className="hidden aspect-[8.5/11] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_40px_-16px_rgba(14,18,32,0.18)] sm:block">
          <iframe
            src="/Rakib_Hossain_CV.pdf#view=FitH"
            title="Md. Rakib Hossain — Curriculum Vitae"
            className="h-full w-full"
          />
        </div>

        {/* Web Summary / Recruiter Brief */}
        <div className="mt-12 rounded-3xl border border-line bg-surface p-6 sm:p-10 shadow-sm">
          <div className="border-b border-line pb-6">
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium">
              Recruiter Quick Brief
            </span>
            <h1 className="font-display text-3xl font-bold text-ink mt-1">Md. Rakib Hossain</h1>
            <p className="text-ink-soft mt-1 text-base">
              Data Science · Machine Learning · Full-Stack Engineer · AIUB (2026)
            </p>
            <p className="text-sm font-mono text-muted mt-2">
              Dhaka, Bangladesh · r1.rakibhossain1@gmail.com · +880 1632 941507
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-8">
            {/* Education */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap size={18} className="text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Education</h3>
              </div>
              <div className="rounded-2xl border border-line bg-surface-2/60 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h4 className="font-semibold text-ink text-base">
                    B.Sc. in Computer Science &amp; Engineering
                  </h4>
                  <span className="font-mono text-xs text-muted">Graduating 2026</span>
                </div>
                <p className="text-sm text-ink-soft mt-0.5">
                  American International University-Bangladesh (AIUB)
                </p>
              </div>
            </section>

            {/* Research */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={18} className="text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                  Peer-Reviewed Research Publications (First Author)
                </h3>
              </div>
              <ul className="flex flex-col gap-3">
                <li className="rounded-2xl border border-line bg-surface-2/60 p-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                    IEEE COMPAS 2026 · Dhaka University · Presented
                  </span>
                  <h4 className="font-medium text-ink text-[15px] mt-1">
                    RideGuard: A Behavioural-Spatial Risk Framework with Conformal Prediction for Motorcycle Safety
                  </h4>
                  <p className="text-xs text-ink-soft mt-1">
                    Self-audited target leakage detection, conformal calibrated prediction bounds, local SHAP explanations.
                  </p>
                </li>
                <li className="rounded-2xl border border-line bg-surface-2/60 p-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                    ICCA 2026 · AIUB · Presented
                  </span>
                  <h4 className="font-medium text-ink text-[15px] mt-1">
                    DhakaNight: A Benchmark for Low-Light Object Detection in Dense Urban Night Traffic
                  </h4>
                  <p className="text-xs text-ink-soft mt-1">
                    2,300 curated night images; empirical benchmark proving detector scaling outperforms low-light preprocessing pipelines.
                  </p>
                </li>
                <li className="rounded-2xl border border-line bg-surface-2/60 p-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                    ICCA 2026 · AIUB · Presented
                  </span>
                  <h4 className="font-medium text-ink text-[15px] mt-1">
                    PulseStone: A Tangible Single-Action Anxiety Companion
                  </h4>
                  <p className="text-xs text-ink-soft mt-1">
                    ESP32-C3 embedded device; controlled 15-participant user study demonstrating 14.5× faster initiation than mobile apps.
                  </p>
                </li>
              </ul>
            </section>

            {/* Flagship Production Engineering */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Briefcase size={18} className="text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                  Production Engineering Experience
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border border-line bg-surface-2/60 p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-ink text-[15px]">
                      Drikon — Full-Stack E-Commerce &amp; Recommender System
                    </h4>
                    <span className="font-mono text-xs text-accent">Live Production</span>
                  </div>
                  <p className="text-xs text-ink-soft mt-1">
                    Built 17 backend modules (products, cart, orders, coupons, reviews) with Next.js 15, React 19, NestJS 11, and PostgreSQL. Implemented the Apriori association-rule mining algorithm from scratch.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-surface-2/60 p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-ink text-[15px]">
                      Khepa Chakka Robotics Team — Founder &amp; Team Lead
                    </h4>
                    <span className="font-mono text-xs text-muted">2023 – Present</span>
                  </div>
                  <p className="text-xs text-ink-soft mt-1">
                    Founded and lead competitive team across mechanical design, embedded firmware (Arduino/ESP32), and software. Achieved 6 national/international podiums.
                  </p>
                </div>
              </div>
            </section>

            {/* Key Honors */}
            <section>
              <div className="flex items-center gap-2 mb-3">
                <Award size={18} className="text-accent" />
                <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                  Podiums &amp; Distinctions
                </h3>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-line p-3">
                  <span className="font-semibold text-ink">Winner</span> — Cozmo Clench, Techfest IIT Bombay 2024
                </div>
                <div className="rounded-xl border border-line p-3">
                  <span className="font-semibold text-ink">1st Runner-up</span> — Nano Battle Bot, NRC 2025
                </div>
                <div className="rounded-xl border border-line p-3">
                  <span className="font-semibold text-ink">Champion</span> — Robot Soccer, AIUB CS Fest 2024
                </div>
                <div className="rounded-xl border border-line p-3">
                  <span className="font-semibold text-ink">Certificate of Appreciation</span> — Bangladesh ICT Awards (BIIN) 2026
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
