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
          className="device block w-[220px] cursor-zoom-in rounded-[36px] border border-line-strong bg-surface-2 p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.55)] sm:w-[250px]"
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
