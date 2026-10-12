"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Portal from "./Portal";

/**
 * Shared photo grid and lightbox, used by the robotics and publications
 * sections so both present their photos the same way.
 */

export type GalleryItem = { img: string; cap: string };

type LightboxState = { items: GalleryItem[]; index: number } | null;

export function useGallery() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const open = useCallback(
    (items: GalleryItem[], index: number) => setLightbox({ items, index }),
    [],
  );
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () =>
      setLightbox((lb) =>
        lb
          ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length }
          : lb,
      ),
    [],
  );
  const next = useCallback(
    () =>
      setLightbox((lb) =>
        lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : lb,
      ),
    [],
  );

  return { lightbox, open, close, prev, next };
}

/** Every photo on show, captioned; each opens the group in the lightbox. */
export function PhotoGrid({
  title,
  items,
  onOpen,
  contain = false,
}: {
  title: string;
  items: GalleryItem[];
  onOpen: (items: GalleryItem[], index: number) => void;
  contain?: boolean;
}) {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="flex items-baseline gap-3 text-xl font-semibold tracking-[-0.02em]">
        {title}
        <span className="font-mono text-xs font-normal text-muted">{items.length}</span>
      </h3>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {items.map((item, i) => (
          <motion.li
            key={item.img}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => onOpen(items, i)}
              aria-label={`View photo: ${item.cap}`}
              className="zoom relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface"
            >
              <span className="relative block aspect-[4/3] overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.cap}
                  fill
                  sizes="(min-width: 1024px) 380px, 50vw"
                  className={contain ? "object-contain p-3" : "object-cover"}
                />
              </span>
              {/* Documents keep their caption clear of the page they show. */}
              <span
                className={
                  contain
                    ? "block border-t border-line px-3 py-2.5 text-left text-xs leading-snug text-ink-soft sm:text-[13px]"
                    : "absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent px-3 pb-2.5 pt-10 text-left text-xs leading-snug text-white sm:text-[13px]"
                }
              >
                {item.cap}
              </span>
            </button>
          </motion.li>
        ))}
      </ul>
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
  const open = lightbox !== null;
  const many = (lightbox?.items.length ?? 0) > 1;

  // Keyboard control and a scroll lock: with the image filling the screen,
  // scrolling the page behind it is disorienting and Escape is the reflex.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (many && e.key === "ArrowLeft") prev();
      else if (many && e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, many, close, prev, next]);

  if (!lightbox) return null;

  const item = lightbox.items[lightbox.index];

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm cursor-zoom-out"
        onClick={close}
        role="dialog"
        aria-modal="true"
        aria-label={item.cap}
      >
        <button
          className="absolute top-4 right-4 z-20 w-11 h-11 bg-surface-2/90 hover:bg-accent hover:text-accent-ink rounded-full flex items-center justify-center text-ink-soft transition-colors cursor-pointer"
          onClick={close}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {many && (
          <>
            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-surface-2/90 hover:bg-accent hover:text-accent-ink rounded-full flex items-center justify-center text-ink-soft transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-surface-2/90 hover:bg-accent hover:text-accent-ink rounded-full flex items-center justify-center text-ink-soft transition-colors cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* The image takes the whole viewport apart from room for the chrome,
          and object-contain means it is never cropped at any aspect ratio. */}
        <div className="absolute inset-x-2 md:inset-x-20 top-16 bottom-16 md:top-16 md:bottom-20">
          <Image
            key={item.img}
            src={item.img}
            alt={item.cap}
            fill
            sizes="100vw"
            quality={92}
            priority
            className="object-contain"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 pb-5 px-6 text-center pointer-events-none">
          <p className="text-ink-soft font-medium text-sm">{item.cap}</p>
          {many && (
            <p className="mt-1 font-mono text-[11px] tracking-widest text-muted">
              {lightbox.index + 1} / {lightbox.items.length}
            </p>
          )}
        </div>
      </div>
    </Portal>
  );
}
