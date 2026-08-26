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
      className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-6xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shrink-0">
          <span className="text-sm font-semibold text-slate-700">
            {title} — Live Demo
          </span>
          <div className="flex items-center gap-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-brand-cyan hover:text-cyan-600 transition-colors"
            >
              Open in new tab ↗
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
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
