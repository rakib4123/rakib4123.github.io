"use client";

import { useEffect } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Portal from "./Portal";

export default function DemoModal({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  // Escape closes it, and the page behind stays put while it is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <Portal>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} live demo`}
      >
        <div
          className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-line px-4 py-3">
            <span className="text-sm font-semibold text-ink-soft">{title} — Live demo</span>
            <div className="flex items-center gap-4">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:brightness-110"
              >
                Open in new tab <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-surface-2 text-ink-soft transition-colors hover:bg-accent hover:text-accent-ink"
                aria-label="Close live demo"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <iframe src={url} title={`${title} live demo`} className="w-full flex-1 border-0" />
        </div>
      </div>
    </Portal>
  );
}
