"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Portal from "./Portal";

/**
 * Shared lightbox, used by the robotics and publications sections so both
 * present their photos the same way instead of carrying two overlays.
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
