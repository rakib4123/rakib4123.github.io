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
  },
  {
    title:
      "DhakaNight: A Benchmark for Low-Light Object Detection in Dense Urban Night Traffic",
    venue: "ICCA 2026 · AIUB, Dhaka",
    status: "Presented",
  },
  {
    title: "PulseStone: A Tangible Single-Action Anxiety Companion",
    venue: "ICCA 2026 · AIUB, Dhaka",
    status: "Presented",
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
        RideGuard was presented at IEEE COMPAS 2026 at the University of Dhaka; DhakaNight and
        PulseStone at ICCA 2026 at AIUB.
      </SectionHeading>

      <Reveal>
        <ol className="flex flex-col gap-3">
          {publications.map((pub) => (
            <li
              key={pub.title}
              className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 transition-all hover:border-line-strong shadow-xs ${listRow}`}
            >
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs uppercase tracking-wider mb-2">
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-ink">
                  {pub.status}
                </span>
                <span className="text-muted">{pub.venue} · First author</span>
              </div>
              <h3 className="text-lg sm:text-xl font-medium leading-snug tracking-tight text-ink">
                {pub.title}
              </h3>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="mt-14 flex flex-col gap-12">
        <PhotoGrid title="At ICCA 2026" items={icca} onOpen={open} />
        <PhotoGrid title="At IEEE COMPAS 2026" items={conference} onOpen={open} />
      </div>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
