# Two-Ink Risograph Print Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio's entire visual language as a two-ink risograph print in petrol + fluoro orange, and correct every content mismatch against the 2026 CV.

**Architecture:** A token layer plus five plain-CSS print primitives (halftone screen, hairline rule, hard offset shadow, dot leaders, generated plates) live in `globals.css`; every component is then rewritten to compose Tailwind utilities over those tokens. The current interaction layer — particle canvas, custom cursor, tilt, spotlight, magnetic buttons — is deleted outright, because depth and glow contradict a flat printed surface. Legacy `brand-*` tokens stay defined until the final cleanup task so that every intermediate commit still renders coherently.

**Tech Stack:** Next.js 16.2.10 (App Router), React 19.2.4, TypeScript, Tailwind CSS v4 (`@theme`), framer-motion 12, next/font/google (Archivo Black, Space Grotesk, Space Mono), lucide-react, react-icons.

**Spec:** `docs/superpowers/specs/2026-08-26-riso-print-redesign-design.md` — read it alongside this plan. Section references below (§1, §4.3, …) point into it.

## Global Constraints

- **No new dependency.** `package.json` must be byte-identical when this plan completes (spec §2).
- **Palette, verbatim:** `--paper #e3e7e4`, `--paper-lift #edf0ee`, `--ink #14161b`, `--petrol #0c5661`, `--fluoro #ff5c1a`. No other colours enter the codebase.
- **`--rule` is `1.5px solid var(--ink)`.** Every section carries `border-bottom: var(--rule)`.
- **No rounded corners.** Every `rounded-*` utility is removed. Two documented exceptions only: the navbar `.mark__dot` and the circular close/prev/next buttons inside the two modals.
- **No blurred shadows.** Every shadow is a hard offset: `8px 8px 0 var(--fluoro)` static, `12px 12px 0 var(--petrol)` on hover paired with `translate(-6px,-6px)`.
- **Photographs print as one ink:** every `<Image>` of a photo carries `grayscale(1) contrast(1.1)`.
- **Content is CV-governed.** Where this plan's copy differs from the live site, the CV wins. Do not reinstate dropped skills (TensorFlow, XGBoost, Power BI, Excel, .NET, SQL Server), the AIUB STEAM project, or CGPA.
- **Commit after every task**, using the message given in that task's final step.

## Verification model — read this before Task 1

**This repo has no test framework.** `package.json` exposes only `dev`, `build`, `start`, `lint`. Adding one is out of scope (see Global Constraints). So the usual red-green TDD cycle is replaced, in every task below, by this four-part gate:

1. `npm run build` — the real gate. It type-checks every component and fails loudly on any surviving import of a deleted component.
2. `npm run lint` — must be clean.
3. A **grep assertion** with an exact expected result, given per task.
4. A **visual check** in `npm run dev` with the specific things to look at, given per task.

A task is not done until all four pass. Do not report a task complete on the strength of the build alone.

## File Structure

| File | Responsibility after this plan |
|---|---|
| `src/app/globals.css` | Token layer + the five print primitives. The only file with raw CSS. |
| `src/app/layout.tsx` | Three font variables, metadata, `ScrollProgress` mount. No cursor. |
| `src/app/page.tsx` | Unchanged — same eleven mounts, same order. |
| `src/app/resume/page.tsx` | Re-inked PDF frame. |
| `src/components/SectionHeading.tsx` | The `NN — LABEL` + display-heading pair. Used by 7 sections. |
| `src/components/Plate.tsx` | **New.** CSS-generated print plate for projects with no screenshot. |
| `src/components/Navbar.tsx` | Sticky paper topbar, mark + underline nav. |
| `src/components/Hero.tsx` | Eyebrow, misregistered name, CV line, meta columns. |
| `src/components/About.tsx` | Lede + body + specs panel + portrait plate. |
| `src/components/Stats.tsx` | Ruled band of four static CV-backed figures. |
| `src/components/Projects.tsx` | Four alternating rows, CV order, Drikon leading. |
| `src/components/Publications.tsx` | Two ruled entries with rotated ACCEPTED stamp. |
| `src/components/Robotics.tsx` | Video + three galleries + certs toggle + lightbox. |
| `src/components/Timeline.tsx` | Two dot-leader ledgers. |
| `src/components/Skills.tsx` | Six CV groups as dot-leader lists. |
| `src/components/Contact.tsx` | bigmail + elsewhere row. |
| `src/components/Footer.tsx` | Mono foot row. |
| `src/components/DemoModal.tsx` | Flat modal chrome. |
| `src/components/ScrollProgress.tsx` | Solid fluoro bar. |
| **Deleted** | `AntigravityBackground.tsx`, `CustomCursor.tsx`, `TiltCard.tsx`, `SpotlightCard.tsx`, `Magnetic.tsx`, `TypewriterRole.tsx` |

**Deletion ordering matters.** `Magnetic` is imported by Hero and Navbar; `SpotlightCard` by Projects, Publications, Skills and Timeline; `TiltCard` by Projects. Each is deleted only in Task 11, after its last consumer has been rewritten — deleting earlier breaks the build mid-plan. `CustomCursor` (Task 1), `AntigravityBackground` and `TypewriterRole` (Task 3) have single consumers and are deleted in the task that rewrites that consumer.

---

### Task 1: Ink system, fonts, and the print primitives

Everything downstream composes against this. Nothing here is visible on its own — the page will look half-converted until Task 2, which is expected.

**Files:**
- Modify: `src/app/globals.css` (full rewrite)
- Modify: `src/app/layout.tsx` (full rewrite)
- Modify: `src/components/ScrollProgress.tsx:14-17`
- Delete: `src/components/CustomCursor.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind utilities `bg-paper`, `bg-paper-lift`, `text-ink`, `text-petrol`, `text-fluoro`, `border-ink`, `font-display`, `font-sans`, `font-mono`; CSS classes `.rule-b`, `.shadow-hard`, `.shadow-hard-hover`, `.leaders`, `.leaders__fill`, `.hero-name`, `.plate`, `.plate--a`, `.plate--b`, `.stamp`, `.bigmail`, `.print-img`; CSS vars `--paper --paper-lift --ink --petrol --fluoro --rule --pad --gap`.

- [ ] **Step 1: Rewrite `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-paper: #e3e7e4;
  --color-paper-lift: #edf0ee;
  --color-ink: #14161b;
  --color-petrol: #0c5661;
  --color-fluoro: #ff5c1a;

  /* Legacy tokens — still referenced by not-yet-rewritten components.
     Task 11 deletes these once the grep sweep comes back clean. */
  --color-brand-cyan: #06b6d4;
  --color-brand-teal: #14b8a6;
  --color-brand-emerald: #10b981;
  --color-brand-dark: #0f172a;
  --color-bg-main: #e3e7e4;
  --color-bg-card: #edf0ee;

  --font-display: var(--font-archivo), Impact, sans-serif;
  --font-sans: var(--font-grotesk), system-ui, sans-serif;
  --font-mono: var(--font-space-mono), ui-monospace, monospace;
}

:root {
  --paper: #e3e7e4;
  --paper-lift: #edf0ee;
  --ink: #14161b;
  --petrol: #0c5661;
  --fluoro: #ff5c1a;

  --rule: 1.5px solid var(--ink);
  --pad: clamp(1.25rem, 5vw, 5.5rem);
  --gap: clamp(2.5rem, 7vw, 6rem);
}

*, *::before, *::after { box-sizing: border-box; }

html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

body {
  background: var(--paper);
  color: var(--ink);
  font-size: clamp(1rem, .95rem + .25vw, 1.075rem);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ---- primitive 1: the halftone screen ----
   Prints over everything, including modals. pointer-events:none is
   load-bearing — without it the whole page stops accepting clicks. */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 999;
  pointer-events: none;
  opacity: .16;
  background-image: radial-gradient(var(--ink) 0.9px, transparent 1px);
  background-size: 4px 4px;
  mix-blend-mode: multiply;
}

/* ---- primitive 2: the hairline rule ---- */
.rule-b { border-bottom: var(--rule); }
.rule-t { border-top: var(--rule); }
.rule-a { border: var(--rule); }

/* ---- primitive 3: hard offset shadows ---- */
.shadow-hard { box-shadow: 8px 8px 0 var(--fluoro); }
.shadow-hard-petrol { box-shadow: 8px 8px 0 var(--petrol); }
.shadow-hard-hover {
  transition: transform .3s cubic-bezier(.2,.7,.3,1), box-shadow .3s cubic-bezier(.2,.7,.3,1);
}
.shadow-hard-hover:hover,
.shadow-hard-hover:focus-within {
  transform: translate(-6px, -6px);
  box-shadow: 12px 12px 0 var(--petrol);
}

/* ---- primitive 4: dot leaders ---- */
.leaders { margin: 0; padding: 0; list-style: none; }
.leaders li { display: flex; align-items: baseline; gap: .6rem; padding: .55rem 0; }
.leaders__fill {
  flex: 1;
  height: 0;
  border-bottom: 2px dotted var(--petrol);
  opacity: .55;
  transform: translateY(-.3rem);
}
.leaders__v {
  font-family: var(--font-mono);
  font-size: .8rem;
  letter-spacing: .06em;
  text-transform: uppercase;
  color: var(--petrol);
  transition: color .25s ease, transform .25s ease;
  white-space: nowrap;
}
.leaders li:hover .leaders__v { color: var(--fluoro); transform: translateX(-4px); }

/* ---- primitive 5: generated print plates ---- */
.plate { aspect-ratio: 4 / 3; border: var(--rule); }
.plate--a {
  background:
    radial-gradient(circle at 30% 35%, var(--fluoro) 0 22%, transparent 22.5%),
    radial-gradient(circle at 68% 66%, var(--petrol) 0 30%, transparent 30.5%),
    repeating-linear-gradient(45deg, rgba(12,86,97,.18) 0 6px, transparent 6px 12px),
    var(--paper);
}
.plate--b {
  background:
    repeating-linear-gradient(0deg, var(--petrol) 0 7px, transparent 7px 21px),
    radial-gradient(circle at 50% 50%, var(--fluoro) 0 34%, transparent 34.5%),
    var(--paper);
}

/* ---- the hero's two ink passes ---- */
.hero-name {
  position: relative;
  z-index: 0;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.4rem, 15vw, 12rem);
  line-height: .84;
  letter-spacing: -.02em;
  text-transform: uppercase;
  color: var(--petrol);
}
.hero-name::before {
  content: attr(data-name);
  position: absolute;
  inset: 0;
  z-index: -1;
  white-space: pre-line;
  color: var(--fluoro);
  transform: translate(10px, 10px);
  animation: register 1.1s cubic-bezier(.2,.75,.25,1) both;
}
@keyframes register {
  from { transform: translate(46px, 26px); opacity: 0; }
  to   { transform: translate(10px, 10px); opacity: 1; }
}

/* ---- the ACCEPTED stamp ---- */
.stamp {
  display: inline-block;
  transform: rotate(-4deg);
  border: 1.5px solid var(--fluoro);
  color: var(--fluoro);
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: .7rem;
  letter-spacing: .16em;
  text-transform: uppercase;
  padding: .3rem .6rem;
}

/* ---- the contact big email ---- */
.bigmail {
  display: inline-block;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, .9rem + 2.4vw, 3rem);
  color: var(--petrol);
  text-decoration: none;
  word-break: break-word;
  background-image: linear-gradient(var(--fluoro), var(--fluoro));
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 100% 4px;
  transition: background-size .35s cubic-bezier(.2,.7,.3,1), color .35s ease;
}
.bigmail:hover { color: var(--ink); background-size: 100% 100%; }

/* ---- photographs print as a single ink ---- */
.print-img { filter: grayscale(1) contrast(1.1); }

/* ---- nav underline ---- */
.nav-underline { position: relative; text-decoration: none; padding-bottom: 2px; }
.nav-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--fluoro);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .28s cubic-bezier(.2,.7,.3,1);
}
.nav-underline:hover::after,
.nav-underline[data-active="true"]::after { transform: scaleX(1); }

::selection { background: var(--fluoro); color: var(--paper-lift); }

:focus-visible { outline: 3px solid var(--fluoro); outline-offset: 3px; }

::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--paper); border-left: var(--rule); }
::-webkit-scrollbar-thumb { background: var(--petrol); }
::-webkit-scrollbar-thumb:hover { background: var(--fluoro); }

@media (max-width: 34rem) {
  .hero-name::before { transform: translate(6px, 6px); }
  @keyframes register {
    from { transform: translate(26px, 16px); opacity: 0; }
    to   { transform: translate(6px, 6px); opacity: 1; }
  }
  .shadow-hard-hover:hover,
  .shadow-hard-hover:focus-within { transform: none; box-shadow: 8px 8px 0 var(--petrol); }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .001ms !important;
  }
}
```

- [ ] **Step 2: Rewrite `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";

const archivo = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "Md. Rakib Hossain | Data Science and Machine Learning · Full-Stack Developer",
  description:
    "Md. Rakib Hossain — CSE student in Dhaka who takes machine-learning systems end to end and ships the applications around them. Two papers accepted at ICCA 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${archivo.variable} ${grotesk.variable} ${spaceMono.variable} font-sans antialiased bg-paper text-ink`}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Re-ink `src/components/ScrollProgress.tsx`**

Replace the `className` on the `motion.div` (currently the cyan→emerald gradient) with the solid fluoro bar:

```tsx
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-fluoro"
```

Leave the `useScroll`/`useSpring` logic untouched.

- [ ] **Step 4: Delete the custom cursor**

```bash
git rm src/components/CustomCursor.tsx
```

Its only consumer was `layout.tsx`, whose rewrite in Step 2 already dropped the import and the `<CustomCursor />` mount.

- [ ] **Step 5: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean. A failure naming `CustomCursor` means Step 2 was applied incompletely.

- [ ] **Step 6: Grep assertion**

Run: `grep -rn "CustomCursor\|custom-cursor-active\|cursor-crosshair\|gradientAnim\|animate-gradient" src/`
Expected: **only** hits inside `src/components/Hero.tsx` and `src/components/Stats.tsx` (`animate-gradient` on text that Tasks 3 and 4 rewrite). Zero hits for `CustomCursor`, `custom-cursor-active`, `cursor-crosshair`, `gradientAnim`.

- [ ] **Step 7: Visual check**

Run `npm run dev`. Confirm: the page background is pale sage, not white; a fine dot screen is visible over the whole page (zoom to 200% to see it clearly); the scroll bar at the top is solid orange; **clicking any nav link still works** — if nothing on the page is clickable, `pointer-events: none` is missing from `body::after`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Add two-ink print token layer, print fonts, and halftone screen"
```

---

### Task 2: Section shell — heading, navbar, footer

The frame every other section sits inside.

**Files:**
- Modify: `src/components/SectionHeading.tsx` (full rewrite)
- Modify: `src/components/Navbar.tsx` (full rewrite)
- Modify: `src/components/Footer.tsx` (full rewrite)

**Interfaces:**
- Consumes: Task 1's tokens and `.nav-underline`.
- Produces: `SectionHeading({ title, subtitle?, tag? })` — unchanged prop signature, so the seven consuming sections keep compiling untouched. `tag` is now expected in the form `"01 — About"`.

- [ ] **Step 1: Rewrite `src/components/SectionHeading.tsx`**

The per-word stagger goes; a printed heading arrives whole.

```tsx
"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  title,
  subtitle,
  tag,
}: {
  title: string;
  subtitle?: string;
  tag?: string;
}) {
  return (
    <div className="mb-[clamp(1.5rem,4vw,2.5rem)]">
      {tag && (
        <p className="font-mono text-[.78rem] tracking-[0.18em] uppercase text-petrol mb-[clamp(1.5rem,4vw,2.5rem)]">
          {tag}
        </p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
        className="font-display uppercase text-ink text-[clamp(1.35rem,1.1rem+1.4vw,2.15rem)] leading-[1.15] max-w-[24ch] m-0"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="max-w-[62ch] mt-4"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Navbar.tsx`**

Sticky paper bar, mark + dot, underline nav, no `Magnetic`, no blur. The `IntersectionObserver` logic is preserved verbatim; only the markup and classes change.

```tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Robotics", href: "#robotics" },
  { name: "Awards", href: "#awards" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-paper rule-b">
      <div className="flex items-center justify-between gap-4 px-[var(--pad)] py-3">
        <a href="#top" className="group inline-flex items-center gap-2 font-mono font-bold tracking-[0.08em] no-underline">
          <span className="w-[.7rem] h-[.7rem] rounded-full bg-fluoro transition-all duration-[250ms] group-hover:bg-petrol group-hover:scale-[1.4]" />
          <span>M.R.H.</span>
        </a>

        <nav className="hidden md:flex flex-wrap items-center gap-[clamp(.75rem,2.5vw,1.75rem)] font-mono text-[.82rem] tracking-[0.06em] uppercase">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              data-active={activeSection === link.href.slice(1)}
              className="nav-underline hover:text-petrol"
            >
              {link.name}
            </a>
          ))}
          <Link href="/resume" className="rule-a px-3 py-1.5 text-petrol hover:bg-petrol hover:text-paper transition-colors">
            Resume
          </Link>
        </nav>

        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden p-1"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-paper-lift rule-t"
          >
            <ul className="flex flex-col px-[var(--pad)] py-2 font-mono text-sm uppercase tracking-[0.06em]">
              {navLinks.map((link) => (
                <li key={link.name} className="py-2 border-b border-dotted border-ink/40">
                  <a href={link.href} onClick={() => setMobileMenuOpen(false)}>
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="py-3">
                <Link href="/resume" onClick={() => setMobileMenuOpen(false)} className="text-petrol">
                  Resume →
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-x-8 gap-y-3 px-[var(--pad)] pt-6 pb-9 font-mono text-[.78rem]">
      <p className="m-0">© {new Date().getFullYear()} Md. Rakib Hossain · Dhaka, Bangladesh</p>
      <p className="m-0">
        <a href="#top" className="text-petrol nav-underline">Back to top ↑</a>
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 5: Grep assertion**

Run: `grep -rn "Magnetic" src/components/Navbar.tsx`
Expected: no output. (Hero still imports it until Task 3; that is expected.)

- [ ] **Step 6: Visual check**

Run `npm run dev`. Confirm: the topbar is opaque pale sage with a hairline bottom rule and no blur; the dot beside `M.R.H.` grows and turns petrol on hover; hovering a nav link wipes an orange underline in from the left; **scrolling makes the current section's link keep its underline**; at 320px the mobile burger opens a ruled paper panel.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Re-ink section headings, navbar, and footer as print furniture"
```

---

### Task 3: Hero — the misregistered name

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite)
- Delete: `src/components/AntigravityBackground.tsx`, `src/components/TypewriterRole.tsx`

**Interfaces:**
- Consumes: `.hero-name` and the `register` keyframes from Task 1.
- Produces: the `#top` anchor the navbar mark and footer link target.

- [ ] **Step 1: Rewrite `src/components/Hero.tsx`**

Note the `data-name` attribute: it must carry **exactly** the same text as the visible `<h1>`, with `&#10;` (a literal newline) where the `<br>` is, or the two ink passes will not line up. `white-space: pre-line` in the CSS turns that newline into the break.

```tsx
export default function Hero() {
  return (
    <section id="top" className="rule-b px-[var(--pad)] pt-[clamp(3rem,9vw,7rem)] pb-[clamp(3rem,8vw,6rem)]">
      <p className="font-mono text-[.8rem] tracking-[0.16em] uppercase text-petrol m-0 mb-[clamp(1.25rem,4vw,2.25rem)]">
        Data Science &amp; Machine Learning · Full-Stack Developer — Dhaka, Bangladesh
      </p>

      <h1 className="hero-name" data-name={"MD. RAKIB\nHOSSAIN"}>
        MD. RAKIB
        <br />
        HOSSAIN
      </h1>

      <p className="max-w-[46ch] mt-[clamp(1.75rem,5vw,3rem)] mb-0 text-[clamp(1.05rem,1rem+.6vw,1.35rem)] leading-[1.5]">
        I take machine-learning systems end to end — dataset curation, exploratory
        analysis, feature engineering, model calibration, deployment — and ship the
        applications around them.
      </p>

      <ul className="flex flex-wrap gap-x-[clamp(1.5rem,5vw,4rem)] gap-y-0 m-0 mt-[clamp(1.75rem,5vw,2.75rem)] p-0 list-none font-mono text-[.85rem]">
        {[
          ["Available", "Full-stack · AI-ML · software engineering roles"],
          ["Stack", "Python · TypeScript · Next.js · NestJS · PyTorch"],
          ["Currently", "Two papers accepted at ICCA 2026"],
        ].map(([k, v]) => (
          <li key={k} className="py-[.35rem]">
            <span className="block text-[.7rem] tracking-[0.14em] uppercase text-petrol">{k}</span>
            {v}
          </li>
        ))}
      </ul>

      <p className="mt-[clamp(2rem,5vw,3rem)] mb-0">
        <a href="#about" className="font-mono text-[.8rem] uppercase tracking-[0.06em] text-petrol nav-underline">
          Read on ↓
        </a>
      </p>
    </section>
  );
}
```

This is now a server component — the `"use client"` directive, the framer-motion imports, the `Image`, `Link`, `AntigravityBackground`, `Magnetic` and `TypewriterRole` imports are all gone. The portrait is not lost; Task 4 places it in About.

- [ ] **Step 2: Delete the two hero-only components**

```bash
git rm src/components/AntigravityBackground.tsx src/components/TypewriterRole.tsx
```

- [ ] **Step 3: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean. A failure naming `AntigravityBackground` or `TypewriterRole` means Step 1 was applied incompletely.

- [ ] **Step 4: Grep assertion**

Run: `grep -rn "AntigravityBackground\|TypewriterRole\|profile-transparent" src/`
Expected: no output at all. (`public/images/profile-transparent.png` stays on disk, now unreferenced — leave it; deleting user assets is not in scope.)

- [ ] **Step 5: Visual check**

Run `npm run dev` and hard-reload. Confirm: `MD. RAKIB / HOSSAIN` fills the width in heavy uppercase petrol; an orange copy of the same text flies in from lower-right and **settles 10px off-register**, not on top; the two passes break lines at the same place. At 320px the name still fits with no horizontal scroll and the offset drops to 6px. With `prefers-reduced-motion` on, the orange pass is simply there at rest, no flight.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Print the hero as a misregistered two-pass name block"
```

---

### Task 4: About, the portrait plate, and the stats band

**Files:**
- Modify: `src/components/About.tsx` (full rewrite)
- Modify: `src/components/Stats.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeading` (Task 2), `.shadow-hard`, `.print-img`, `.rule-a`, `.rule-t`.
- Produces: the `#about` anchor.

- [ ] **Step 1: Rewrite `src/components/About.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

const specs: [string, string][] = [
  ["Based in", "Dhaka, Bangladesh"],
  ["Education", "B.Sc. CSE, AIUB — expected 2026"],
  ["Focus", "Full-stack · AI-ML · Computer vision"],
  ["Role", "Founder, Khepa Chakka"],
  ["Affiliation", "ESAB, AIUB"],
  ["Languages", "Bangla (native), English (intermediate)"],
];

export default function About() {
  return (
    <section id="about" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading title="About" tag="01 — About" />

      <div className="grid gap-[clamp(2rem,5vw,4.5rem)] items-start lg:grid-cols-[minmax(0,1.6fr)_minmax(0,.85fr)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-display text-petrol text-[clamp(1.35rem,1.1rem+1.4vw,2.15rem)] leading-[1.2] text-balance m-0 mb-[1.15rem]">
            I build the model and the product around it — then audit my own results
            before anyone else has to.
          </p>
          <p className="max-w-[62ch] m-0 mb-[1.15rem]">
            I&apos;m a Computer Science and Engineering student who takes machine-learning
            systems end to end: dataset curation, exploratory analysis, feature
            engineering, model calibration, and deployment. <strong>Drikon</strong> is a
            live e-commerce platform whose recommendation engine I mined from real order
            history. <strong>RideGuard</strong> is a deployed ML risk service that reports
            calibrated confidence and explains every prediction rather than acting as a
            black box.
          </p>
          <p className="max-w-[62ch] m-0 mb-[1.15rem]">
            <strong>DhakaNight</strong> and <strong>PulseStone</strong> grew into two papers
            accepted at ICCA 2026, both as first author. As founder of{" "}
            <strong>&quot;Khepa Chakka&quot;</strong> I take robots from concept to the
            competition floor. I use AI-assisted development with Claude Code daily.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-col gap-8"
        >
          <div className="rule-a shadow-hard w-full max-w-[18rem]">
            <Image
              src="/images/profile.jpg"
              alt="Md. Rakib Hossain"
              width={480}
              height={480}
              className="print-img w-full h-auto block"
            />
          </div>

          <aside className="rule-a shadow-hard bg-paper-lift px-6 py-[1.35rem]" aria-label="Quick facts">
            <dl className="m-0">
              {specs.map(([k, v], i) => (
                <div
                  key={k}
                  className={`flex justify-between gap-4 py-[.55rem] font-mono text-[.85rem] ${
                    i === specs.length - 1 ? "" : "border-b border-dotted border-ink/45"
                  }`}
                >
                  <dt className="text-petrol tracking-[0.04em]">{k}</dt>
                  <dd className="m-0 font-bold text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Stats.tsx`**

The `Counter` component, `animate`, `useInView`, `useEffect` and `useState` all go — printed figures do not count up. Figures are the CV-backed four from spec §3.4.

```tsx
const stats: [string, string][] = [
  ["2", "Papers accepted\nICCA 2026"],
  ["4", "Classes of robot\ndesigned & built"],
  ["2,300+", "Images labelled\nfor DhakaNight"],
  ["14.5×", "Faster to first breath\nPulseStone vs. phone app"],
];

export default function Stats() {
  return (
    <section className="rule-b px-[var(--pad)] py-[clamp(2rem,5vw,3.5rem)]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map(([value, label], i) => (
          <div
            key={label}
            className={`px-4 py-3 ${i > 0 ? "md:border-l md:border-ink" : ""}`}
          >
            <div className="font-display text-petrol text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-none">
              {value}
            </div>
            <div className="font-mono text-[.72rem] uppercase tracking-[0.1em] whitespace-pre-line mt-2 leading-[1.5]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

This is a server component now — no `"use client"`.

- [ ] **Step 3: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 4: Grep assertion**

Run: `grep -rn "animate-gradient\|useInView\|Counter" src/components/Stats.tsx src/components/About.tsx`
Expected: no output.

- [ ] **Step 5: Visual check**

Confirm: the portrait is greyscale, square-cornered, with a hard orange shadow down-right — no blur, no circle; the specs panel sits below it with the same shadow and dotted row separators; the four figures read `2 / 4 / 2,300+ / 14.5×` with **no count-up animation** on scroll; at 320px the grid drops to two columns and nothing overflows.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Reprint About as lede + specs panel, stats as static figures"
```

---

### Task 5: Projects — CV order, Drikon leading, generated plates

The largest task. It carries three of the spec's content corrections (§3.2) as well as the reskin.

**Files:**
- Create: `src/components/Plate.tsx`
- Modify: `src/components/Projects.tsx` (full rewrite)
- Modify: `src/components/DemoModal.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeading`, `.plate`, `.plate--a`, `.plate--b`, `.shadow-hard-hover`, `.print-img`.
- Produces: `Plate({ variant, label })` where `variant: "a" | "b"` and `label: string`; the `#projects` anchor.

- [ ] **Step 1: Create `src/components/Plate.tsx`**

A CSS-generated stand-in for projects with no screenshot. Drikon uses variant `a`, DhakaNight variant `b`.

```tsx
export default function Plate({
  variant,
  label,
}: {
  variant: "a" | "b";
  label: string;
}) {
  return (
    <div
      className={`plate plate--${variant} relative flex items-end`}
      role="img"
      aria-label={`${label} — printed plate`}
    >
      <span className="m-3 bg-paper rule-a px-2 py-1 font-mono text-[.68rem] uppercase tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/Projects.tsx`**

Four full-width alternating rows in CV order. `TiltCard` and `SpotlightCard` imports are gone, the small-card grid is gone, and **AIUB STEAM is dropped** (spec §3.2).

`researchUrl` is deliberately absent from RideGuard: the CV lists a Research link but the URL is nowhere in the repo, and the spec forbids guessing it. When the user supplies it, add `research: "<url>"` to the RideGuard entry and it renders automatically.

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import DemoModal from "./DemoModal";
import Plate from "./Plate";

type Project = {
  number: string;
  title: string;
  type: string;
  tags: string[];
  desc: string;
  images?: string[];
  imageWidth?: number;
  imageHeight?: number;
  plate?: "a" | "b";
  demo?: string;
  embeddable?: boolean;
  github?: string;
  research?: string;
  flip?: boolean;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Drikon",
    type: "Full-stack · E-commerce platform with recommendation engine",
    plate: "a",
    tags: ["Next.js 15", "React 19", "NestJS 11", "PostgreSQL", "Prisma"],
    desc: "I implemented the Apriori association-rule algorithm from scratch — level-wise itemset mining with candidate pruning, scored by support, confidence and lift — to power “frequently bought together” and personalised recommendations from real order history. Around it I built 17 backend modules: products, orders, reviews, coupons, flash sales, wishlists, banners, settings, with voice search, filtering, comparison and secure accounts on the storefront. Localised in Bengali and English, with branding, theme and homepage content editable from the admin panel without a redeploy.",
    demo: "https://drikon-web-vert1v.vercel.app/",
    github: "https://github.com/rakib4123/drikon",
  },
  {
    number: "02",
    title: "RideGuard",
    type: "Calibrated and auditable ML risk framework",
    images: [
      "/images/rideguard-map.jpg",
      "/images/rideguard-now.jpg",
      "/images/rideguard-profile.jpg",
      "/images/rideguard-route.jpg",
    ],
    imageWidth: 460,
    imageHeight: 1022,
    tags: ["Python", "CatBoost", "scikit-learn", "SHAP"],
    desc: "A live web app scoring motorcycle route risk in Dhaka, with a colour-coded risk map and real-time warnings for phone handling, speeding and accident hotspots. It predicts crash risk at 0.973 macro-F1, reporting calibrated confidence and explaining each prediction with SHAP attributions rather than acting as a black box. A self-audit layer traced the headline score to target leakage — a label the data gave away — which I published as the central finding rather than the accuracy number.",
    demo: "https://ride-guard-web-app-web.vercel.app/",
    embeddable: true,
    github: "https://github.com/rakib4123/Ride_Guard_WebApp",
    flip: true,
  },
  {
    number: "03",
    title: "DhakaNight",
    type: "Night-time object detection dataset and benchmark",
    plate: "b",
    tags: ["Python", "PyTorch", "YOLO", "OpenCV", "Roboflow"],
    desc: "Detects vehicles and pedestrians on Dhaka streets after dark, where standard detectors fail. I curated and labelled a 2,300-image night dataset, then benchmarked CLAHE, Gamma, Zero-DCE and RetinexFormer against a YOLOv8 baseline under a controlled protocol — none improved detection, and scaling the detector beat every pipeline.",
    github: "https://github.com/rakib4123/Dhaka_Night",
  },
  {
    number: "04",
    title: "PulseStone",
    type: "Handheld anxiety-relief device",
    images: ["/images/project-pulsestone.jpg"],
    imageWidth: 1200,
    imageHeight: 1593,
    tags: ["ESP32-C3", "Arduino C++", "Python"],
    desc: "A pocket device that starts a calming breathing exercise with one squeeze, guiding the user with light, vibration and screen cues. I designed and analysed a controlled 15-participant, 150-trial study: users started in 0.52 s versus 7.49 s on a phone app — 14.5× faster — and all 15 preferred it.",
    github: "https://github.com/rakib4123/PulseStone",
    flip: true,
  },
];

export default function Projects() {
  const [activeDemo, setActiveDemo] = useState<{ url: string; title: string } | null>(null);

  return (
    <section id="projects" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading
        title="Full-stack products and machine-learning systems, shipped end to end."
        tag="02 — Projects"
        subtitle="Live web apps and deployed ML services, plus computer vision, data science and embedded hardware along the way."
      />

      <div className="flex flex-col gap-[clamp(3rem,7vw,5.5rem)]">
        {projects.map((p) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className="grid gap-[clamp(1.5rem,4vw,3rem)] items-start md:grid-cols-2"
          >
            <div className={p.flip ? "md:order-2" : ""}>
              {p.images ? (
                <ProjectGallery
                  images={p.images}
                  alt={p.title}
                  imageWidth={p.imageWidth ?? 800}
                  imageHeight={p.imageHeight ?? 600}
                />
              ) : (
                <div className="shadow-hard-hover">
                  <Plate variant={p.plate ?? "a"} label={p.title} />
                </div>
              )}
            </div>

            <div className={p.flip ? "md:order-1" : ""}>
              <p className="font-mono text-[.74rem] tracking-[0.12em] uppercase text-petrol m-0 mb-2">
                {p.number} — {p.type}
              </p>
              <h3 className="font-display uppercase text-petrol text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-none m-0 mb-4">
                {p.title}
              </h3>

              <ul className="flex flex-wrap gap-2 m-0 mb-5 p-0 list-none">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rule-a bg-paper-lift px-2 py-[.15rem] font-mono text-[.72rem] tracking-[0.04em]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <p className="text-[.95rem] m-0 mb-6 max-w-[62ch]">{p.desc}</p>

              <p className="flex flex-wrap gap-x-6 gap-y-2 m-0 font-mono text-[.8rem] uppercase tracking-[0.06em]">
                {p.demo && p.embeddable && (
                  <button
                    onClick={() => setActiveDemo({ url: p.demo!, title: p.title })}
                    className="nav-underline text-petrol cursor-pointer bg-transparent border-0 p-0 font-mono text-[.8rem] uppercase tracking-[0.06em]"
                  >
                    Live demo ⤢
                  </button>
                )}
                {p.demo && !p.embeddable && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="nav-underline text-petrol">
                    Live ↗
                  </a>
                )}
                {p.research && (
                  <a href={p.research} target="_blank" rel="noopener noreferrer" className="nav-underline text-petrol">
                    Research ↗
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="nav-underline text-petrol">
                    Code ↗
                  </a>
                )}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {activeDemo && (
        <DemoModal url={activeDemo.url} title={activeDemo.title} onClose={() => setActiveDemo(null)} />
      )}
    </section>
  );
}

function ProjectGallery({
  images,
  alt,
  imageWidth,
  imageHeight,
}: {
  images: string[];
  alt: string;
  imageWidth: number;
  imageHeight: number;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="rule-a shadow-hard-hover bg-paper-lift">
        <Image
          src={images[active]}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className="print-img w-full h-auto object-cover block"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`Show ${alt} image ${i + 1}`}
              className={`relative w-14 h-14 overflow-hidden border-[1.5px] cursor-pointer ${
                i === active ? "border-fluoro" : "border-ink"
              }`}
            >
              <Image src={img} alt="" fill className="print-img object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/DemoModal.tsx`**

Square chrome, paper ground, mono labels. Behaviour is unchanged — click-out closes, and as today there is **no Escape handler or focus trap**; adding one is out of scope for this plan (see Task 11, Step 7).

```tsx
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
```

The iframe keeps `bg-white` deliberately: it renders someone else's live site, which should not be tinted by our paper stock.

- [ ] **Step 4: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 5: Grep assertions**

Run: `grep -rn "TiltCard\|SpotlightCard\|AIUB STEAM\|XGBoost\|TensorFlow" src/components/Projects.tsx`
Expected: no output.

Run: `grep -c 'number: "' src/components/Projects.tsx`
Expected: `4` — one per project entry. Note the quote in the pattern is load-bearing: a bare `number:` also matches the `Project` type's own `number: string;` field and returns 5.

- [ ] **Step 6: Visual check**

Confirm: **Drikon is the first project**, with a petrol/orange generated plate, not a photo; RideGuard is second with its four-shot gallery in greyscale and an orange border on the active thumbnail; DhakaNight third with the second plate variant; PulseStone fourth; **AIUB STEAM is gone**; rows alternate side to side; hovering a plate lifts it up-left with a hard petrol shadow; RideGuard's "Live demo ⤢" opens the flat modal and clicking the backdrop closes it.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Reorder projects to CV order with Drikon leading, reprint as plates"
```

---

### Task 6: Publications — first authorship and the ACCEPTED stamp

**Files:**
- Modify: `src/components/Publications.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeading`, `.stamp`, `.shadow-hard`.
- Produces: the `#publications` anchor.

- [ ] **Step 1: Rewrite `src/components/Publications.tsx`**

The `SpotlightCard` wrapper, the emerald gradients and the `FileText` icon tile all go. **"First author" is added** — spec §3.3.

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const publications = [
  {
    title: "DhakaNight: A Benchmark for Low-Light Object Detection in Dense Urban Night Traffic",
    venue: "ICCA 2026, Dhaka · ACM Digital Library",
  },
  {
    title: "PulseStone: A Tangible Single-Action Anxiety Companion",
    venue: "ICCA 2026, Dhaka",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading
        title="Research accepted for publication."
        tag="03 — Publications"
        subtitle="Two papers, grown out of the DhakaNight and PulseStone projects, both first author, accepted at ICCA 2026."
      />

      <div className="grid gap-[clamp(1.5rem,3.5vw,2.5rem)] md:grid-cols-2">
        {publications.map((pub, i) => (
          <motion.article
            key={pub.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="rule-a shadow-hard bg-paper-lift p-6 flex flex-col"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="font-mono text-[.72rem] uppercase tracking-[0.12em] text-petrol">
                First author
              </span>
              <span className="stamp shrink-0">Accepted</span>
            </div>
            <h3 className="font-display uppercase text-petrol text-[1.05rem] leading-[1.3] m-0 mb-3">
              {pub.title}
            </h3>
            <p className="font-mono text-[.78rem] m-0 mt-auto">{pub.venue}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 3: Grep assertion**

Run: `grep -rn "SpotlightCard\|FileText\|emerald" src/components/Publications.tsx`
Expected: no output.

Run: `grep -c "First author" src/components/Publications.tsx`
Expected: `1` (one JSX literal, rendered for both entries by the map).

- [ ] **Step 4: Visual check**

Confirm: both entries say **First author**; the `ACCEPTED` stamp is a rotated orange ruled box, not a rounded pill; cards are square with a hard orange shadow; no green anywhere.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Reprint publications with first authorship and a rotated ACCEPTED stamp"
```

---

### Task 7: Robotics — plates, printed captions, ESAB

**Files:**
- Modify: `src/components/Robotics.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeading`, `.rule-a`, `.shadow-hard-hover`, `.print-img`.
- Produces: the `#robotics` anchor.

Two content additions here (spec §3.5): the CV's **four classes of robot**, and the **ESAB membership since 2023**. Also note `public/images/build-racebot-top.jpg` and `build-racebot-angle.jpg` exist on disk but the current component never renders them — with the CV now claiming four robot classes, the race bot belongs in the gallery. Both are added.

- [ ] **Step 1: Rewrite `src/components/Robotics.tsx`**

Structure, lightbox behaviour and the certificates toggle are all preserved; only the ink changes. Captions move out from under a hover-reveal gradient into a permanent ruled bar — a printed caption does not hide until hovered.

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const robots = [
  { img: "/images/build-battlebot.jpg", cap: "Battle bot — wedge + blade" },
  { img: "/images/build-soccerbot-top.jpg", cap: "Soccer bot — electronics" },
  { img: "/images/build-soccerbot-angle.jpg", cap: "Soccer bot — steel body" },
  { img: "/images/build-racebot-top.jpg", cap: "Race bot — chassis" },
  { img: "/images/build-racebot-angle.jpg", cap: "Race bot — drivetrain" },
];

const podiums = [
  { img: "/images/comp-techfest.jpg", cap: "Winner · Techfest IIT Bombay 2024" },
  { img: "/images/comp-nrc-battlebot.jpg", cap: "1st runner-up · NRC 2025" },
  { img: "/images/comp-nrc-roborace.jpg", cap: "2nd runner-up · NRC 2025" },
  { img: "/images/comp-technoxian.jpg", cap: "Runner-up · Technoxian BD 2024" },
  { img: "/images/comp-aiub-trophies.jpg", cap: "Runner-up · AIUB Robotic Crew" },
  { img: "/images/comp-team-trophy.jpg", cap: "Team Khepa Chakka" },
];

const certs = [
  { img: "/images/cert-csfest.jpg", cap: "AIUB CS Fest 2024" },
  { img: "/images/cert-techfest.jpg", cap: "Techfest IIT Bombay 2024" },
  { img: "/images/cert-autofest-soccer.jpg", cap: "BUET Autofest 2024 — soccer" },
  { img: "/images/cert-autofest-race.jpg", cap: "BUET Autofest 2024 — race" },
];

type GalleryItem = { img: string; cap: string };

export default function Robotics() {
  const [lightbox, setLightbox] = useState<{ items: GalleryItem[]; index: number } | null>(null);
  const [showCerts, setShowCerts] = useState(false);

  const showPrev = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length } : lb));
  const showNext = () =>
    setLightbox((lb) => (lb ? { ...lb, index: (lb.index + 1) % lb.items.length } : lb));

  return (
    <section id="robotics" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading
        title="Robotics — Khepa Chakka"
        tag="04 — Robotics"
        subtitle="Founder and team lead since 2023. I take robots from concept to the competition floor across four classes — line-following, soccer, race and battle — coordinating members across mechanical design, electronics and software against competition deadlines. Active member of the Engineering Students' Association of Bangladesh (ESAB) at AIUB, collaborating with faculty on research and development."
      />

      <div className="rule-a shadow-hard bg-paper-lift mb-[clamp(2.5rem,6vw,4rem)]">
        <video
          controls
          preload="metadata"
          playsInline
          poster="/images/build-battlebot.jpg"
          className="w-full aspect-video object-cover block bg-paper"
        >
          <source src="/v1 robo.mp4" type="video/mp4" />
        </video>
      </div>

      <ImageGrid title="Robots I've built" items={robots} onClick={(items, index) => setLightbox({ items, index })} />
      <ImageGrid title="On the podium" items={podiums} onClick={(items, index) => setLightbox({ items, index })} />

      {showCerts ? (
        <ImageGrid
          title="Certificates"
          items={certs}
          onClick={(items, index) => setLightbox({ items, index })}
          contain
          cols={2}
        />
      ) : (
        <div className="mb-[clamp(2.5rem,6vw,4rem)]">
          <h3 className="font-display uppercase text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-6">Certificates</h3>
          <button
            onClick={() => setShowCerts(true)}
            className="rule-a bg-paper-lift px-5 py-2.5 font-mono text-[.8rem] uppercase tracking-[0.06em] text-petrol hover:bg-petrol hover:text-paper transition-colors cursor-pointer"
          >
            View certificates ({certs.length})
          </button>
        </div>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-paper/95 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full rule-a bg-paper-lift hover:bg-fluoro hover:text-paper flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setLightbox(null)}
            aria-label="Close image viewer"
          >
            <X size={20} />
          </button>

          {lightbox.items.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full rule-a bg-paper-lift hover:bg-fluoro hover:text-paper flex items-center justify-center transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full rule-a bg-paper-lift hover:bg-fluoro hover:text-paper flex items-center justify-center transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
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
              className="object-contain"
            />
            <div className="absolute bottom-[-40px] inset-x-0 text-center font-mono text-[.78rem] uppercase tracking-[0.08em]">
              {lightbox.items[lightbox.index].cap}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ImageGrid({
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
    <div className="mb-[clamp(2.5rem,6vw,4rem)]">
      <h3 className="font-display uppercase text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-6">{title}</h3>
      <div className={`grid gap-5 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {items.map((item, i) => (
          <motion.figure
            key={item.img}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rule-a shadow-hard-hover bg-paper-lift m-0 cursor-zoom-in"
            onClick={() => onClick(items, i)}
          >
            <div className="aspect-[4/3] w-full relative">
              <Image
                src={item.img}
                alt={item.cap}
                fill
                className={`print-img ${contain ? "object-contain p-4" : "object-cover"}`}
              />
            </div>
            <figcaption className="rule-t px-3 py-2 font-mono text-[.7rem] uppercase tracking-[0.08em] flex justify-between gap-3">
              <span>{item.cap}</span>
              <span className="text-petrol shrink-0">[zoom]</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 3: Grep assertions**

Run: `grep -rn "racebot" src/components/Robotics.tsx`
Expected: two hits — the race bot images are now rendered.

Run: `grep -c "ESAB" src/components/Robotics.tsx`
Expected: `1`.

- [ ] **Step 4: Visual check**

Confirm: the intro copy names all four robot classes and ESAB; five robots now appear in "Robots I've built" including the race bot; every caption is **always visible** in a ruled bar beneath its image, not revealed on hover; images are greyscale; the lightbox opens on click, arrows cycle, backdrop closes it; the certificates toggle still reveals four certificates.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Reprint robotics galleries with permanent captions, add race bot and ESAB"
```

---

### Task 8: Awards & Education — two ruled ledgers

**Files:**
- Modify: `src/components/Timeline.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeading`, `.leaders`, `.leaders__fill`, `.leaders__v`.
- Produces: the `#awards` anchor.

- [ ] **Step 1: Rewrite `src/components/Timeline.tsx`**

The line-and-dot timeline, the `SpotlightCard` wrappers, the `Trophy`/`GraduationCap` icons and the coloured rank pills are all replaced by dot-leader rows. Placement is carried by the mono value on the right.

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const awards: { year: string; title: string; org: string; rank: string }[] = [
  {
    year: "2024",
    title: "Cozmo Clench",
    org: "Techfest, IIT Bombay — Bangladesh Zonal",
    rank: "Winner",
  },
  { year: "2024", title: "Robot Soccer", org: "AIUB CS Fest", rank: "Champion" },
  { year: "2025", title: "Nano Battle Bot", org: "National Robotics Championship", rank: "1st runner-up" },
  { year: "2025", title: "Robo Race", org: "National Robotics Championship", rank: "2nd runner-up" },
  { year: "2024", title: "Robo Race", org: "Technoxian Bangladesh National Round", rank: "1st runner-up" },
  { year: "—", title: "Robot Soccer", org: "AIUB Robotic Crew (ARC)", rank: "1st runner-up" },
  {
    year: "2024",
    title: "Soccer Bot & Robo Race",
    org: "BUET Autofest, plus further national and inter-university events",
    rank: "Competed",
  },
];

const education: { year: string; title: string; org: string }[] = [
  {
    year: "Expected 2026",
    title: "B.Sc. in Computer Science and Engineering",
    org: "American International University-Bangladesh (AIUB)",
  },
  { year: "2021", title: "Higher Secondary Certificate — Science", org: "Dhaka Imperial College" },
  { year: "2019", title: "Secondary School Certificate — Science", org: "Dhaka Collegiate School" },
];

export default function Timeline() {
  return (
    <section id="awards" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading
        title="Awards & Education"
        tag="05 — Awards & Education"
        subtitle="Podium finishes across national and inter-university robotics competitions, including one of Asia's largest science and technology festivals."
      />

      <div className="grid gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <h3 className="font-display uppercase text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-5">
            Awards and honors
          </h3>
          <ul className="leaders">
            {awards.map((aw) => (
              <li key={`${aw.title}-${aw.org}`} className="border-b border-ink last:border-b-0">
                <span className="min-w-0">
                  <span className="block font-medium">{aw.title}</span>
                  <span className="block font-mono text-[.72rem] text-ink/70 uppercase tracking-[0.06em]">
                    {aw.year} · {aw.org}
                  </span>
                </span>
                <span className="leaders__fill" />
                <span className="leaders__v">{aw.rank}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <h3 className="font-display uppercase text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-5">
            Education
          </h3>
          <ul className="leaders">
            {education.map((ed) => (
              <li key={ed.title} className="border-b border-ink last:border-b-0">
                <span className="min-w-0">
                  <span className="block font-medium">{ed.title}</span>
                  <span className="block font-mono text-[.72rem] text-ink/70 uppercase tracking-[0.06em]">
                    {ed.org}
                  </span>
                </span>
                <span className="leaders__fill" />
                <span className="leaders__v">{ed.year}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
```

CGPA is deliberately absent (spec §3.6) — do not add it.

- [ ] **Step 2: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 3: Grep assertions**

Run: `grep -rn "SpotlightCard\|Trophy\|GraduationCap\|rankColor\|CGPA\|3.28" src/components/Timeline.tsx`
Expected: no output.

Run: `grep -c "year:" src/components/Timeline.tsx`
Expected: `10` — seven awards and three education rows, all preserved.

- [ ] **Step 4: Visual check**

Confirm: two ledger columns; each row shows title, then a dotted petrol leader stretching across, then the placement in mono on the right; hovering a row turns its placement orange and shifts it 4px left; no coloured pills, no timeline spine, no icons.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Reprint awards and education as dot-leader ledgers"
```

---

### Task 9: Skills — the CV's six groups

This task carries spec §3.1, the largest single content correction.

**Files:**
- Modify: `src/components/Skills.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeading`, `.leaders`, `.leaders__fill`.
- Produces: the `#skills` anchor.

Note the leader rows here render **without** a `.leaders__v` value — the dotted fill simply runs to the right edge, like an index with no page numbers. No CSS change is needed for this; `.leaders li` is a flex row and the fill flexes into whatever space is left.

- [ ] **Step 1: Rewrite `src/components/Skills.tsx`**

Groups and members are copied verbatim from the CV. The `useState` hover-highlight, the `SpotlightCard` wrapper and the tag-pill stagger are all removed.

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: "Languages",
    skills: ["Python", "SQL", "C++", "TypeScript / JavaScript"],
  },
  {
    title: "Data Science & ML",
    skills: ["pandas", "NumPy", "scikit-learn", "CatBoost", "PyTorch", "YOLO", "OpenCV", "SHAP"],
  },
  {
    title: "Methods",
    skills: [
      "Exploratory data analysis",
      "Feature engineering",
      "Association-rule mining",
      "Model calibration",
      "Leakage auditing",
      "Benchmarking",
      "Experiment design",
    ],
  },
  {
    title: "Backend",
    skills: ["NestJS", "Node.js", "REST APIs", "Prisma", "PostgreSQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML / CSS"],
  },
  {
    title: "Tools",
    skills: [
      "Git / GitHub",
      "VS Code",
      "Jupyter",
      "Roboflow",
      "Claude Code",
      "Antigravity",
      "Canva",
      "Microsoft 365",
      "Vercel",
      "Render",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading title="Technologies I've built with." tag="06 — Skills" />

      <div className="grid gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-[clamp(1.5rem,4vw,2.75rem)] md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <h3 className="font-display uppercase text-petrol text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-3 pb-2 rule-b">
              {group.title}
            </h3>
            <ul className="leaders">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <span className="font-medium">{skill}</span>
                  <span className="leaders__fill" />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 3: Grep assertion — the dropped skills**

Run: `grep -rn "TensorFlow\|XGBoost\|Power BI\|Excel\|\.NET\|SQL Server" src/`
Expected: **no output anywhere in `src/`**. This is the check that spec §3.1 actually landed. If anything matches, the offending component still carries a claim the CV does not support.

- [ ] **Step 4: Grep assertion — the added group**

Run: `grep -c "Association-rule mining\|Leakage auditing\|Model calibration" src/components/Skills.tsx`
Expected: `3`.

- [ ] **Step 5: Visual check**

Confirm: six groups titled Languages / Data Science & ML / Methods / Backend / Frontend / Tools; each skill is a row with a dotted leader running to the right edge; **the Methods group is present**; no pills, no hover-highlight, no cyan.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Regroup skills to the CV's six groups, add Methods, drop unsupported claims"
```

---

### Task 10: Contact and the resume page

**Files:**
- Modify: `src/components/Contact.tsx` (full rewrite)
- Modify: `src/app/resume/page.tsx` (full rewrite)

**Interfaces:**
- Consumes: `SectionHeading`, `.bigmail`, `.nav-underline`, `.shadow-hard-petrol`.
- Produces: the `#contact` anchor.

- [ ] **Step 1: Rewrite `src/components/Contact.tsx`**

The three filled buttons and the `Mail`/`FaGithub`/`FaLinkedin` icons go; the email becomes the `bigmail`.

```tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const elsewhere: { label: string; href: string; external?: boolean }[] = [
  { label: "GitHub", href: "https://github.com/rakib4123", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-rakib-hossain-519818263", external: true },
  { label: "rakib4123.github.io", href: "https://rakib4123.github.io", external: true },
  { label: "+880 1632 941507", href: "tel:+8801632941507" },
];

export default function Contact() {
  return (
    <section id="contact" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading title="Contact" tag="07 — Contact" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45 }}
      >
        <h3 className="font-display max-w-[18ch] text-[clamp(1.9rem,1.2rem+3.6vw,4.25rem)] leading-[1.02] tracking-[-.01em] m-0 mb-3">
          Got something that needs building?
        </h3>
        <p className="max-w-[48ch] m-0 mb-[clamp(1.75rem,5vw,2.75rem)]">
          I&apos;m open to roles in full-stack development, AI/ML and software
          engineering. Email is the fastest way to reach me.
        </p>

        <a className="bigmail" href="mailto:r1.rakibhossain1@gmail.com">
          r1.rakibhossain1@gmail.com
        </a>

        <ul className="flex flex-wrap gap-6 m-0 mt-[clamp(2rem,5vw,3rem)] p-0 list-none font-mono text-[.85rem] tracking-[0.06em] uppercase">
          {elsewhere.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="nav-underline hover:text-petrol"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="font-mono text-[.78rem] uppercase tracking-[0.08em] mt-8 mb-0 text-ink/70">
          Based in Dhaka, Bangladesh
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Rewrite `src/app/resume/page.tsx`**

```tsx
import Link from "next/link";

export const metadata = {
  title: "Resume | Md. Rakib Hossain",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="max-w-4xl mx-auto px-[var(--pad)] py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 rule-b font-mono text-[.8rem] uppercase tracking-[0.06em]">
          <Link href="/" className="nav-underline text-petrol">
            ← Back to portfolio
          </Link>
          <a href="/Rakib_Hossain_CV.pdf" download className="nav-underline text-petrol">
            Download PDF ↓
          </a>
        </div>

        <div className="rule-a shadow-hard-petrol bg-paper-lift aspect-[8.5/11]">
          <iframe
            src="/Rakib_Hossain_CV.pdf"
            title="Md. Rakib Hossain — Resume"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean.

- [ ] **Step 4: Grep assertion**

Run: `grep -rn "FaGithub\|FaLinkedin\|lucide-react" src/components/Contact.tsx src/app/resume/page.tsx`
Expected: no output.

- [ ] **Step 5: Visual check**

Confirm: the email is large Archivo Black petrol, and hovering **fills it with orange from the bottom up** as the text goes ink-black; the four `elsewhere` links wipe an orange underline on hover; `/resume` still renders the PDF, still downloads it, and the frame is square with a hard petrol shadow.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Reprint contact with bigmail treatment and re-ink the resume page"
```

---

### Task 11: Cleanup, legacy-token removal, and the full verification pass

Every consumer of `Magnetic`, `SpotlightCard` and `TiltCard` has now been rewritten, so the three can finally be deleted and the legacy palette dropped. This task is where spec §6 is executed in full — nothing before it is allowed to claim the redesign is done.

**Files:**
- Delete: `src/components/Magnetic.tsx`, `src/components/SpotlightCard.tsx`, `src/components/TiltCard.tsx`
- Modify: `src/app/globals.css` (remove the legacy `@theme` block)

**Interfaces:**
- Consumes: everything from Tasks 1–10.
- Produces: nothing new — this task only removes.

- [ ] **Step 1: Confirm the three components are genuinely orphaned**

Run: `grep -rn "Magnetic\|SpotlightCard\|TiltCard" src/`
Expected: **no output.** If anything matches, a component from Tasks 2–9 was left half-rewritten — go fix that task's file before deleting anything here.

- [ ] **Step 2: Delete the three orphaned components**

```bash
git rm src/components/Magnetic.tsx src/components/SpotlightCard.tsx src/components/TiltCard.tsx
```

- [ ] **Step 3: Remove the legacy tokens from `src/app/globals.css`**

Delete this block from the `@theme` section — the comment and all six declarations:

```css
  /* Legacy tokens — still referenced by not-yet-rewritten components.
     Task 11 deletes these once the grep sweep comes back clean. */
  --color-brand-cyan: #06b6d4;
  --color-brand-teal: #14b8a6;
  --color-brand-emerald: #10b981;
  --color-brand-dark: #0f172a;
  --color-bg-main: #e3e7e4;
  --color-bg-card: #edf0ee;
```

Leave the five print colours, the three font variables and everything below `:root` exactly as they are.

- [ ] **Step 4: Build and lint**

Run: `npm run build && npm run lint`
Expected: both clean. A failure naming any of the three deleted components means Step 1's grep was run against a stale tree.

- [ ] **Step 5: The full grep sweep (spec §6.3)**

Run each and check against its expected result:

```bash
grep -rn "brand-cyan\|brand-emerald\|brand-teal\|brand-dark\|bg-bg-main\|bg-bg-card" src/
```
Expected: no output.

```bash
grep -rn "rounded-" src/
```
Expected: **exactly five hits, all `rounded-full`**, one per circular control — `Navbar.tsx` (the mark dot), `DemoModal.tsx` (close), and `Robotics.tsx` (lightbox close, prev, next). Any sixth hit, and any `rounded-md`, `rounded-lg` or `rounded-xl`, is a miss; fix it.

```bash
grep -rn "shadow-\[0_\|shadow-md\|shadow-lg\|shadow-sm\|shadow-2xl\|backdrop-blur" src/
```
Expected: no output — every shadow is now one of the hard-offset classes.

```bash
grep -rn "AntigravityBackground\|CustomCursor\|TypewriterRole\|Magnetic\|SpotlightCard\|TiltCard" src/
```
Expected: no output.

```bash
grep -rn "TensorFlow\|XGBoost\|Power BI\|SQL Server\|AIUB STEAM\|CGPA" src/
```
Expected: no output — the CV corrections all held.

- [ ] **Step 6: Responsive pass (spec §6.4)**

Run `npm run dev` and check at **320px, 768px and 1440px**:
- No horizontal scrollbar at any width. The usual culprit is the hero name; it is clamped to `15vw` and should never be the cause, but a long unbroken string elsewhere can be.
- Under `34rem` the topbar's nav collapses to the burger and the hero's misregistration offset drops from 10px to 6px.
- The About grid, Projects rows, Skills groups and Awards ledgers each collapse to one column.
- Tables and the resume iframe never force the body sideways.

- [ ] **Step 7: Keyboard and motion pass (spec §6.5, §6.7)**

- Tab through the whole page. Every focus stop must show the **3px orange outline** against the paper — check the nav links, the resume button, the gallery thumbnails, the certificates toggle, the "Live demo" button and every link in Contact.
- Open the live-demo modal and the robotics lightbox. Both close on a backdrop click, as they do today. **Neither traps focus nor closes on Escape — that is pre-existing behaviour this redesign does not change.** If you want that fixed, it is a separate task, not a silent addition here.
- Set `prefers-reduced-motion: reduce` in the browser's dev tools and hard-reload: the hero's orange pass must already be at rest with no flight, and every scroll reveal must resolve instantly.

- [ ] **Step 8: Halftone pass (spec §6.6)**

With the dot screen active, confirm nothing is swallowed by it: click a nav link, open and close both modals, toggle the certificates, switch a gallery thumbnail, and follow the resume download. If any of these are dead, `pointer-events: none` has been lost from `body::after`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Delete the orphaned interaction layer and the legacy palette"
```

- [ ] **Step 10: Report, do not push**

Summarise for the user: the four verification gates and their actual output, anything that failed, and the two known open items carried by this plan —

1. **RideGuard's Research link is still missing** (spec §3.2). The CV lists it; the URL is not in the repo. Adding it is a one-line change to the RideGuard entry in `Projects.tsx`.
2. **Drikon still renders a generated plate**, not a screenshot (spec §4.5). Supplying one and swapping `plate: "a"` for an `images: [...]` entry is the only change needed.

Do not push. The user pushes when they have looked at it.

---

## Notes for the executor

- **The build is the gate, but it is not sufficient.** Tailwind does not error on an unknown utility class in JSX — it silently emits nothing. So a stale `text-brand-cyan` will build clean and render as unstyled text. That is exactly why every task carries a grep assertion; do not skip them because the build passed.
- **`react-icons` becomes unused** once Tasks 5 and 10 land, since `FaGithub`/`FaLinkedin` were its only consumers. Leave it in `package.json` anyway — the Global Constraints forbid touching dependencies, and an unused dependency is not a defect worth breaking that rule over. `lucide-react` is still used by `Navbar`, `DemoModal` and `Robotics`.
- **`src/app/page.tsx` is never modified.** All eleven mounts and their order stay as they are. If a task tempts you to reorder sections, that is a spec change — stop and raise it.
- **Do not add a test framework.** The verification model above is the agreed substitute (spec §6, Global Constraints).
- **Watch two Tailwind traps.** First, a utility that does not exist emits nothing rather than erroring — `scale-140` and `duration-250` are not real Tailwind classes (the scale ladder stops at 125/150, the duration ladder at 200/300), so use the arbitrary forms `scale-[1.4]` and `duration-[250ms]`. Second, the plain classes in `globals.css` (`.rule-b`, `.leaders`, `.plate`) are declared *after* Tailwind's utility layer, so at equal specificity they win: `class="rule-b last:border-b-0"` will keep the border. Where a Tailwind variant has to override a rule, use Tailwind on both sides (`border-b border-ink last:border-b-0`).
- **`public/images/profile-transparent.png` becomes unreferenced** after Task 3. Leave the file on disk; deleting a user's asset is not in scope.
