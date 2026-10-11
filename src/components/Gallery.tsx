"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useState } from "react";

/**
 * Shared image grid and lightbox. Extracted from the robotics section so the
 * publications section can present conference photos the same way instead of
 * carrying a second copy of the overlay.
 */

export type GalleryItem = { img: string; cap: string };

type LightboxState = { items: GalleryItem[]; index: number } | null;

export function useGallery() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const open = useCallback(
    (items: GalleryItem[], index: number) => setLightbox({ items, index }),
    []
  );
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () =>
      setLightbox((lb) =>
        lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : lb
      ),
    []
  );
  const next = useCallback(
    () =>
      setLightbox((lb) =>
        lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : lb
      ),
    []
  );

  return { lightbox, open, close, prev, next };
}

export function ImageGrid({
  title,
  items,
  onClick,
  contain = false,
  cols = 3,
}: {
  title: string;
  items: GalleryItem[];
  onClick: (items: GalleryItem[], index: number) => void;
  contain?: boolean;
  cols?: 2 | 3;
}) {
  return (
    <div className="mb-16">
      <h3 className="font-display text-2xl font-semibold tracking-tight text-ink mb-6">
        {title}
      </h3>
      <div className={`grid gap-5 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {items.map((item, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative rounded-xl overflow-hidden cursor-zoom-in bg-surface border border-line group shadow-sm hover:shadow-lg transition-shadow duration-300"
            onClick={() => onClick(items, i)}
          >
            <div className="aspect-[4/3] w-full relative">
              <Image
                src={item.img}
                alt={item.cap}
                fill
                className={`${
                  contain ? "object-contain p-4" : "object-cover"
                } group-hover:scale-105 transition-transform duration-500`}
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-black/85 to-transparent text-ink-soft text-sm font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex justify-between items-end">
              <span>{item.cap}</span>
              <ZoomIn size={14} className="text-brand-red" />
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}

export function Lightbox({
  lightbox,
  close,
  prev,
  next,
}: {
  lightbox: LightboxState;
  close: () => void;
  prev: () => void;
  next: () => void;
}) {
  if (!lightbox) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
      onClick={close}
    >
      <button
        className="absolute top-6 right-6 w-10 h-10 bg-surface-2 hover:bg-line-strong rounded-full flex items-center justify-center text-ink-soft transition-colors"
        onClick={close}
      >
        <X size={20} />
      </button>

      {lightbox.items.length > 1 && (
        <>
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-2 hover:bg-line-strong rounded-full flex items-center justify-center text-ink-soft transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface-2 hover:bg-line-strong rounded-full flex items-center justify-center text-ink-soft transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div className="relative max-w-5xl max-h-[80vh] w-full h-full">
        <Image
          src={lightbox.items[lightbox.index].img}
          alt={lightbox.items[lightbox.index].cap}
          fill
          className="object-contain rounded-lg shadow-2xl"
        />
        <div className="absolute bottom-[-40px] inset-x-0 text-center text-ink-soft font-medium text-sm">
          {lightbox.items[lightbox.index].cap}
        </div>
      </div>
    </div>
  );
}
