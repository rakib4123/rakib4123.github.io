# Video Introduction + Separate Resume Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a video-introduction player to the Hero section and turn the Resume link into a real `/resume` page, per `docs/superpowers/specs/2026-08-01-video-intro-and-resume-page-design.md`.

**Architecture:** Hero.tsx becomes a two-column layout (text + video) on desktop, stacked on mobile. A new App Router route `src/app/resume/page.tsx` embeds the resume PDF with a download button. Navbar and Hero's "Resume" buttons switch from a direct PDF-download link to an internal link to `/resume`. `next.config.ts` gets `trailingSlash: true` so the new nested route exports as `resume/index.html` for reliable static hosting on GitHub Pages.

**Tech Stack:** Next.js 16 (App Router, `output: "export"`), React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react.

## Global Constraints

- Project has no test framework configured — verification is `npx eslint .`, `npx tsc --noEmit`, and `npm run build` (this matches how every prior change in this repo has been verified).
- Static export is active (`output: "export"` in `next.config.ts`) — every new route must be a plain page with no dynamic server-only APIs.
- `/intro-video.mp4` and `/Rakib_Hossain_CV.pdf` do not exist yet (user will add them later) — do not add any code to detect or special-case their absence.
- Match existing patterns: plain HTML5 `<video controls playsInline>` (as used in `Robotics.tsx`), lucide-react icons, Framer Motion `initial`/`animate`/`whileInView` fade-in style already used throughout the codebase.

---

### Task 1: Two-column Hero with video introduction

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Produces: no exports consumed elsewhere — this task is self-contained (Hero.tsx has no external consumers of its internals).

- [ ] **Step 1: Wrap the existing text block and add a video column**

Replace the content div in `src/components/Hero.tsx` (the `<div className="relative z-20 max-w-5xl mx-auto px-6 w-full pt-20 pb-10">` block) so the existing text `motion.div` becomes the left column of a two-column grid, and a new video `motion.div` becomes the right column. On screens below `md`, the grid collapses to one column and the video renders below the text (default DOM order).

Full replacement for the file:

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import Link from "next/link";
import AntigravityBackground from "./AntigravityBackground";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-main"
    >
      {/* Antigravity Animation */}
      <div className="absolute inset-0 z-0">
        <AntigravityBackground />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 w-full pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-xs tracking-[0.25em] uppercase font-semibold text-brand-cyan mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-cyan"></span>
              Final-year CSE · AIUB · Dhaka
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              I build software that{" "}
              <span className="text-brand-cyan">solves</span> real
              problems<span className="text-brand-cyan">.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-12">
              Data analytics, machine learning, full-stack apps, embedded devices,
              and award-winning robotics — shipped end to end.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium text-sm px-7 py-3 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
              >
                See the work ↓
              </a>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-slate-700 font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-brand-cyan hover:text-brand-cyan hover:-translate-y-0.5 hover:shadow-sm"
              >
                <FileText size={16} /> Resume
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 aspect-video"
          >
            <video
              controls
              playsInline
              poster="/images/profile.jpg"
              className="w-full h-full object-cover bg-slate-100"
            >
              <source src="/intro-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-brand-cyan transition-colors z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  );
}
```

Note: the Resume button here already links to `/resume` via `next/link` — this anticipates Task 2's route existing, but Task 1 can be verified independently since Next's `Link` doesn't error at build time for routes that don't exist yet in a dev server (it only 404s at runtime navigation, and static export doesn't fail the build over it). If you want Task 1 to build cleanly against `next build` in isolation before Task 2 exists, that's fine — `output: "export"` only requires that pages being *generated* are valid; a `<Link>` pointing to a not-yet-existing route does not fail the build.

- [ ] **Step 2: Lint and type-check**

Run: `npx eslint . && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds (the `/resume` link inside `Link` does not block the build even before Task 2 adds the route).

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "Add two-column hero layout with video introduction placeholder"
```

---

### Task 2: Resume page + static-export config

**Files:**
- Create: `src/app/resume/page.tsx`
- Modify: `next.config.ts`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: the `/resume` route, which Task 3's Navbar/Hero link changes point to. Route path is exactly `/resume` (no trailing content needed in the href beyond that, since `trailingSlash: true` is a build/export setting, not something callers need to add manually to `href`).

- [ ] **Step 1: Add `trailingSlash: true` to the Next config**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 2: Create the resume page**

Create `src/app/resume/page.tsx`:

```tsx
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export const metadata = {
  title: "Resume | Md. Rakib Hossain",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-bg-main">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
          <a
            href="/Rakib_Hossain_CV.pdf"
            download
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white aspect-[8.5/11]">
          <iframe
            src="/Rakib_Hossain_CV.pdf"
            title="Md. Rakib Hossain — Resume"
            className="w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
```

This is a Server Component (no `"use client"` directive), which is required for the `metadata` export to work.

- [ ] **Step 3: Lint and type-check**

Run: `npx eslint . && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Build and verify the route was exported**

Run: `npm run build && ls out/resume/`
Expected: build succeeds and `out/resume/index.html` exists (confirms `trailingSlash: true` produced the folder+index shape).

- [ ] **Step 5: Clean up the build artifact and commit**

```bash
rm -rf out
git add next.config.ts src/app/resume/page.tsx
git commit -m "Add separate resume page with static-export trailing-slash config"
```

---

### Task 3: Point Navbar and Hero resume buttons at `/resume`

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/Hero.tsx` (Resume button already updated in Task 1 — verify only, no further change needed here)

**Interfaces:**
- Consumes: the `/resume` route from Task 2.

- [ ] **Step 1: Update Navbar's desktop and mobile Resume links**

Replace `src/components/Navbar.tsx` with:

```tsx
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Robotics", href: "#robotics" },
  { name: "Awards", href: "#awards" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#top"
          className="font-serif font-bold text-lg tracking-wide text-slate-900"
        >
          Md. Rakib Hossain
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-slate-500 hover:text-brand-cyan px-3.5 py-2 rounded-md transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Link
            href="/resume"
            className="ml-2 text-[13px] font-medium text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan hover:text-white px-4 py-2 rounded-md transition-all"
          >
            Resume
          </Link>
        </nav>

        <button
          className="md:hidden text-slate-600 hover:text-slate-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg"
          >
            <nav className="flex flex-col p-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-600 hover:text-brand-cyan hover:bg-slate-50 px-4 py-3 rounded-md transition-all"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-brand-cyan hover:bg-cyan-50 px-4 py-3 rounded-md transition-all"
              >
                Resume
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 2: Confirm Hero's Resume button was already switched in Task 1**

Run: `grep -n "Rakib_Hossain_CV.pdf" src/components/Hero.tsx src/components/Navbar.tsx`
Expected: no output (both files' Resume buttons now point at `/resume`; the only remaining reference to `Rakib_Hossain_CV.pdf` in the codebase is inside `src/app/resume/page.tsx`).

- [ ] **Step 3: Lint and type-check**

Run: `npx eslint . && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Full build**

Run: `npm run build && ls out/resume/ && rm -rf out`
Expected: build succeeds, `out/resume/index.html` exists, then the build artifact is removed (it's gitignored and shouldn't be committed).

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "Point Navbar resume button at the new /resume page"
```

---

## Self-Review Notes

- **Spec coverage:** Hero video (Task 1), resume page (Task 2), config change (Task 2 Step 1), nav link swap (Task 3) — all three spec sections are covered.
- **Placeholders:** none — every step has literal file contents, not descriptions.
- **Type consistency:** `Link` import added consistently (`next/link`) in Hero.tsx and Navbar.tsx; `/resume` href string matches the route folder created in Task 2 (`src/app/resume/page.tsx` → route `/resume`).
- **Out of scope confirmed:** no task touches About, Projects, Robotics, Timeline, Skills, Contact, or Footer.
