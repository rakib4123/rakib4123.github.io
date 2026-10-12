"use client";

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
    venue: "ICCA 2026 · Dhaka",
    status: "Accepted",
  },
  {
    title: "PulseStone: A Tangible Single-Action Anxiety Companion",
    venue: "ICCA 2026 · Dhaka",
    status: "Accepted",
  },
];

const conference = [
  { img: "/images/compas-authors.jpg", cap: "With co-authors · 9–10 October 2026" },
  { img: "/images/compas-backdrop.jpg", cap: "IEEE COMPAS 2026 · University of Dhaka" },
  { img: "/images/compas-certificate.jpg", cap: "Certificate of presentation · RideGuard (Paper 59)" },
];

export default function Publications() {
  const { lightbox, open, close, prev, next } = useGallery();

  return (
    <section
      id="research"
      className="mx-auto flex max-w-[1200px] flex-col gap-14 px-5 pb-10 pt-28 sm:px-8 lg:px-12"
    >
      <div className="flex min-w-0 flex-col gap-8">
        <SectionHeading
          tag="02 — Research"
          title="Three first-author papers."
          subtitle="RideGuard was presented at IEEE COMPAS 2026 at the University of Dhaka; DhakaNight and PulseStone are accepted at ICCA 2026."
        />
        <Reveal>
          <ol className="border-t border-line">
            {publications.map((pub) => (
              <li
                key={pub.title}
                className="flex flex-col gap-2 border-b border-line px-3 py-6 transition-colors hover:bg-surface"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.06em]">
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
                <p className="text-[19px] font-medium leading-snug tracking-[-0.01em]">{pub.title}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      <PhotoGrid title="At IEEE COMPAS 2026" items={conference} onOpen={open} />

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
