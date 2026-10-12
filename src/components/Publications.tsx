"use client";

import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import Reveal from "./Reveal";
import { Lightbox, useGallery } from "./Gallery";

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
  { img: "/images/compas-authors.jpg", cap: "With co-authors at IEEE COMPAS 2026 · 9–10 October 2026" },
  { img: "/images/compas-backdrop.jpg", cap: "IEEE COMPAS 2026 · University of Dhaka" },
  { img: "/images/compas-certificate.jpg", cap: "Certificate of presentation · RideGuard (Paper 59)" },
];

export default function Publications() {
  const { lightbox, open, close, prev, next } = useGallery();

  return (
    <section
      id="research"
      className="mx-auto grid max-w-[1200px] items-end gap-14 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:px-12"
    >
      <div className="flex min-w-0 flex-col gap-8">
        <SectionHeading tag="02 — Research" title="Three first-author papers." />
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

      <Reveal delay={0.1} className="min-w-0">
        <figure className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => open(conference, 0)}
            aria-label="View IEEE COMPAS 2026 photos"
            className="zoom relative block h-[320px] cursor-zoom-in overflow-hidden rounded-2xl border border-line sm:h-[420px]"
          >
            <Image
              src={conference[0].img}
              alt="Rakib with co-authors at IEEE COMPAS 2026"
              fill
              className="object-cover"
            />
            <span className="absolute bottom-4 right-4 rounded-full bg-bg/85 px-3.5 py-1.5 text-[13px] text-ink">
              {conference.length} photos
            </span>
          </button>
          <figcaption className="text-[13px] text-muted">{conference[0].cap}</figcaption>
        </figure>
      </Reveal>

      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </section>
  );
}
