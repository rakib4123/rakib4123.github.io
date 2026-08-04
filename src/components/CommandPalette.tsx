"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type Command = { label: string; hint: string; action: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const goToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const commands: Command[] = [
    { label: "Home", hint: "Top of page", action: () => goToSection("top") },
    { label: "About", hint: "Photo, bio & focus", action: () => goToSection("about") },
    {
      label: "Projects",
      hint: "RideGuard, PulseStone & more",
      action: () => goToSection("projects"),
    },
    {
      label: "Robotics",
      hint: "Khepa Chakka builds & podiums",
      action: () => goToSection("robotics"),
    },
    {
      label: "Awards",
      hint: "Timeline of awards & education",
      action: () => goToSection("awards"),
    },
    {
      label: "Skills",
      hint: "Technologies I've built with",
      action: () => goToSection("skills"),
    },
    {
      label: "Contact",
      hint: "Email, GitHub & LinkedIn",
      action: () => goToSection("contact"),
    },
    { label: "Resume", hint: "Open resume page", action: () => router.push("/resume") },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) setQuery("");
          return !prev;
        });
      }
      if (e.key === "Escape") close();
    };
    const handleOpenEvent = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, [close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-6"
      onClick={close}
    >
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <Search size={16} className="text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section..."
            className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400"
          />
          <kbd className="text-[10px] text-slate-400 border border-gray-200 rounded px-1.5 py-0.5">
            Esc
          </kbd>
        </div>
        <div className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-sm text-slate-400 text-center">
              No matches
            </div>
          )}
          {filtered.map((c) => (
            <button
              key={c.label}
              onClick={() => {
                c.action();
                close();
              }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="text-sm font-medium text-slate-800">{c.label}</span>
              <span className="text-xs text-slate-400">{c.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
