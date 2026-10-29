"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#robotics", label: "Robotics" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    navItems.forEach(({ href }) => {
      const el = document.getElementById(href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center p-3 sm:p-5 pointer-events-none">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full border transition-all duration-300 px-4 py-2 sm:px-6 sm:py-2.5 max-w-5xl w-full ${
          scrolled
            ? "border-line-strong/80 bg-surface/85 shadow-lg shadow-black/5 dark:shadow-black/25 backdrop-blur-md"
            : "border-line/70 bg-surface/70 backdrop-blur-sm shadow-sm"
        }`}
      >
        {/* Identity & Status */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold text-ink tracking-tight hover:text-accent transition-colors shrink-0"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[12px] font-mono font-bold text-accent-ink">
            RH
          </span>
          <span className="hidden sm:inline font-sans">Rakib Hossain</span>
          <span className="relative flex h-2 w-2">
            <span className="live absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1 font-mono text-[12px] uppercase tracking-wider text-muted">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full transition-colors ${
                    isActive
                      ? "text-ink font-semibold bg-line/60 dark:bg-line"
                      : "hover:text-ink hover:bg-line/30"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Social Links */}
          <a
            href="https://github.com/rakib4123"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
          >
            <FaGithub size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hidden lg:flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-2 text-ink-soft hover:text-ink hover:border-ink transition-colors"
          >
            <FaLinkedin size={15} />
          </a>

          {/* Resume CTA */}
          <Link
            href="/resume"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-xs font-semibold text-accent-ink hover:brightness-110 transition-all shadow-sm"
          >
            Résumé <ArrowUpRight size={13} aria-hidden="true" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full border border-line bg-surface-2 text-ink-soft hover:text-ink"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {mobileOpen && (
        <div className="pointer-events-auto absolute top-16 inset-x-4 md:hidden rounded-2xl border border-line-strong bg-surface/95 backdrop-blur-xl p-5 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <ul className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl hover:bg-surface-2 text-ink-soft hover:text-ink transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
