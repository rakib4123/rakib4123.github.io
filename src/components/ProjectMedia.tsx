"use client";

import Image from "next/image";
import { useState } from "react";
import { Maximize2 } from "lucide-react";
import DemoModal from "./DemoModal";
import { Lightbox, useGallery } from "./Gallery";

/** A phone showing one app screen, with thumbnails to switch between them. */
export function PhoneGallery({
  title,
  images,
  width,
  height,
}: {
  title: string;
  images: string[];
  width: number;
  height: number;
}) {
  const [active, setActive] = useState(0);
  const { lightbox, open, close, prev, next } = useGallery();
  const items = images.map((img, i) => ({ img, cap: `${title} — screen ${i + 1} of ${images.length}` }));

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="float">
        <button
          type="button"
          onClick={() => open(items, active)}
          aria-label={`View ${title} screens full screen`}
          className="device block w-[220px] cursor-zoom-in rounded-[36px] border border-line-strong bg-surface-2 p-2.5 shadow-[0_40px_80px_-20px_rgba(14,18,32,0.25)] sm:w-[250px]"
        >
          <Image
            src={images[active]}
            alt={items[active].cap}
            width={width}
            height={height}
            className="block h-auto w-full rounded-[28px]"
          />
        </button>
      </div>
      {images.length > 1 && (
        <div className="flex gap-2.5">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show screen ${i + 1}`}
              aria-pressed={i === active}
              className={`relative h-14 w-11 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
                i === active ? "border-accent" : "border-line-strong hover:border-ink-soft"
              }`}
            >
              <Image src={img} alt="" fill sizes="44px" className="object-cover object-top" />
            </button>
          ))}
        </div>
      )}
      <Lightbox lightbox={lightbox} close={close} prev={prev} next={next} />
    </div>
  );
}

/** Opens a project's live demo inside the page, with a new-tab escape hatch. */
export function DemoButton({ url, title }: { url: string; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-[filter] hover:brightness-110"
      >
        <Maximize2 size={14} aria-hidden="true" /> Live demo
      </button>
      {open && <DemoModal url={url} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}

/** A responsive browser window frame showcasing a live web app. */
export function BrowserMockup({
  title,
  url,
  tag = "Live Web App",
  subtitle = "Interactive preview",
}: {
  title: string;
  url: string;
  tag?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="float">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Open interactive live preview of ${title}`}
          className="device group relative block w-[280px] sm:w-[340px] cursor-pointer overflow-hidden rounded-2xl border border-line-strong bg-surface text-left shadow-[0_40px_80px_-20px_rgba(14,18,32,0.25)] transition-all hover:border-accent"
        >
          {/* Browser header bar */}
          <div className="flex items-center justify-between border-b border-line bg-surface-2 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-line-strong transition-colors group-hover:bg-red-400" />
              <span className="h-2 w-2 rounded-full bg-line-strong transition-colors group-hover:bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-line-strong transition-colors group-hover:bg-emerald-400" />
            </div>
            <span className="max-w-[170px] truncate font-mono text-[10px] text-muted transition-colors group-hover:text-ink">
              {url.replace(/^https?:\/\//, "")}
            </span>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-accent">
              LIVE
            </span>
          </div>

          {/* Browser body preview card */}
          <div className="flex min-h-[220px] flex-col items-center justify-center bg-gradient-to-b from-surface to-surface-2 p-6 text-center">
            <span className="mb-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-0.5 font-mono text-[11px] font-medium text-accent">
              {tag}
            </span>
            <h4 className="mb-1 font-display text-2xl font-bold tracking-tight text-ink">
              {title}
            </h4>
            <p className="mb-4 max-w-[240px] text-xs leading-relaxed text-ink-soft">
              {subtitle}
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-accent-ink shadow-sm transition-transform group-hover:scale-105">
              <Maximize2 size={12} aria-hidden="true" /> Launch live preview
            </span>
          </div>
        </button>
      </div>
      {open && <DemoModal url={url} title={title} onClose={() => setOpen(false)} />}
    </div>
  );
}
