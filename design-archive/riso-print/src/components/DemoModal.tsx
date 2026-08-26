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
      className="fixed inset-0 z-[100] bg-ink/80 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-6xl bg-paper rule-a flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3 rule-b bg-paper-lift shrink-0">
          <span className="font-mono text-[.78rem] uppercase tracking-[0.1em]">
            {title} — Live demo
          </span>
          <div className="flex items-center gap-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[.72rem] uppercase tracking-[0.06em] text-petrol nav-underline"
            >
              Open in new tab ↗
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full rule-a bg-paper hover:bg-fluoro hover:text-paper transition-colors cursor-pointer"
              aria-label="Close live demo"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <iframe src={url} title={`${title} live demo`} className="flex-1 w-full border-0 bg-white" />
      </div>
    </div>
  );
}
