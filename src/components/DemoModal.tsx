"use client";

import { X } from "lucide-react";

export default function DemoModal({
  url,
  title,
  onClose,
}: {
  url: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-6xl bg-surface rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-surface shrink-0">
          <span className="text-sm font-semibold text-ink-soft">
            {title} — Live Demo
          </span>
          <div className="flex items-center gap-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-brand-red hover:text-brand-orange transition-colors"
            >
              Open in new tab ↗
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-2 hover:bg-line-strong text-ink-soft transition-colors cursor-pointer"
              aria-label="Close live demo"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <iframe src={url} title={`${title} live demo`} className="flex-1 w-full border-0" />
      </div>
    </div>
  );
}
