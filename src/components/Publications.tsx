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

const conference = [
  { img: "/images/compas-authors.jpg", cap: "With co-authors · 9–10 October 2026" },
  { img: "/images/compas-backdrop.jpg", cap: "IEEE COMPAS 2026 · University of Dhaka" },
  { img: "/images/compas-certificate.jpg", cap: "Certificate of presentation · RideGuard (Paper 59)" },
];

const icca = [
  { img: "/images/icca-presenting.jpg", cap: "Presenting DhakaNight · 15–16 October 2026" },
  { img: "/images/icca-certificate.jpg", cap: "Certificate of presentation · DhakaNight (Paper 589)" },
  { img: "/images/icca-backdrop.jpg", cap: "ICCA 2026 · American International University-Bangladesh" },
  { img: "/images/icca-photo-wall.jpg", cap: "At the ICCA 2026 photo wall" },
  { img: "/images/icca-badge.jpg", cap: "Author badge in the main hall" },
];

export default function Publications() {
  const { lightbox, open, close, prev, next } = useGallery();

  return (
    <section id="research" className="pb-28 lg:scroll-mt-24 lg:pb-36">
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
        <ol className="group/list -mx-5 flex flex-col gap-1">
          {publications.map((pub) => (
            <li key={pub.title} className={`flex flex-col gap-3 ${listRow}`}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.1em]">
                <span
                  className={
                    pub.status === "Presented"
                      ? "rounded-full bg-accent px-2.5 py-0.5 text-accent-ink"
                      : "rounded-full border border-accent-line px-2.5 py-px text-accent"
                  }
                >
                  {pub.status}
                </span>
                <span className="text-muted">{pub.venue} · First author</span>
              </div>
              <p className="text-[19px] font-medium leading-snug tracking-[-0.01em] text-ink">{pub.title}</p>
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
