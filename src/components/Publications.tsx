"use client";

import { listRow } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import Reveal from "./Reveal";
import { Lightbox, PhotoGrid, useGallery } from "./Gallery";

const publications = [
  {
    title:
      "RideGuard: A Behavioural-Spatial Risk Framework with Conformal Prediction for Motorcycle Safety",
    venue: "IEEE COMPAS 2026 · University of Dhaka",
    status: "Presented",
    badge: "Paper 59",
    finding:
      "Caught target leakage through internal self-auditing; integrated conformal prediction for calibrated risk intervals and local SHAP explanations for interpretable routing.",
  },
  {
    title:
      "DhakaNight: A Benchmark for Low-Light Object Detection in Dense Urban Night Traffic",
    venue: "ICCA 2026 · AIUB, Dhaka",
    status: "Presented",
    badge: "Paper 589",
    finding:
      "Curated 2,380 night images with 45,224 hand-annotated labels; demonstrated that detector scaling systematically beats low-light enhancement pipelines (Zero-DCE, RetinexFormer).",
  },
  {
    title: "PulseStone: A Tangible Single-Action Anxiety Companion",
    venue: "ICCA 2026 · AIUB, Dhaka",
    status: "Presented",
    badge: "Paper 612",
    finding:
      "Custom ESP32-C3 firmware; controlled 15-participant, 150-trial empirical study showing 14.5× faster initiation than mobile applications with 100% participant preference.",
  },
];

const icca = [
  { img: "/images/icca-presenting.jpg", cap: "Presenting DhakaNight · 15–16 October 2026" },
  { img: "/images/icca-certificate.jpg", cap: "Certificate of presentation · DhakaNight (Paper 589)" },
  { img: "/images/icca-backdrop.jpg", cap: "ICCA 2026 · American International University-Bangladesh" },
  { img: "/images/icca-photo-wall.jpg", cap: "At the ICCA 2026 photo wall" },
  { img: "/images/icca-badge.jpg", cap: "Author badge in the main hall" },
];

const conference = [
  { img: "/images/compas-authors.jpg", cap: "With co-authors · 9–10 October 2026" },
  { img: "/images/compas-backdrop.jpg", cap: "IEEE COMPAS 2026 · University of Dhaka" },
  { img: "/images/compas-certificate.jpg", cap: "Certificate of presentation · RideGuard (Paper 59)" },
];

export default function Publications() {
  const { lightbox, open, close, prev, next } = useGallery();

  return (
    <section id="research" className="pb-24 sm:pb-32 lg:scroll-mt-24">
      <SectionHeading
        index="04"
        label="Research"
        title={
          <>
            Three first-author <em>papers</em>.
          </>
        }
      >
        Peer-reviewed research presented at IEEE COMPAS 2026 (University of Dhaka) and ICCA 2026
        (AIUB), focusing on model reliability, empirical benchmarks, and tangible systems.
      </SectionHeading>

      <Reveal>
        <ol className="flex flex-col gap-4">
          {publications.map((pub) => (
            <li
              key={pub.title}
              className={`rounded-2xl border border-line bg-surface p-6 sm:p-7 transition-all duration-300 hover:border-line-strong hover:shadow-md ${listRow}`}
            >
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-wider mb-2">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-ink">
                  {pub.status}
                </span>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted">
                  {pub.badge}
                </span>
                <span className="text-muted font-medium">{pub.venue} · First author</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-ink mt-2">
                {pub.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-ink-soft mt-3 border-t border-line/60 pt-3">
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold block mb-1">
                  Key Research Contribution:
                </span>
                {pub.finding}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-14 flex flex-col gap-12">
        <PhotoGrid title="ICCA 2026 Conference &amp; Presentation Gallery" items={icca} onOpen={open} />
        <PhotoGrid title="IEEE COMPAS 2026 Presentation &amp; Co-Authors" items={conference} onOpen={open} />
      </div>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
