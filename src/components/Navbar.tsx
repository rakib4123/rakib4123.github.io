"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Research", href: "#research" },
  { name: "Robotics", href: "#robotics" },
  { name: "About", href: "#about" },
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
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-lg">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" className="flex items-center gap-3 font-semibold tracking-[-0.01em]">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line-strong font-mono text-xs text-accent">
            RH
          </span>
          Md. Rakib Hossain
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`py-3 transition-colors ${
                  isActive ? "text-ink" : "text-ink-soft hover:text-accent"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <Link
            href="/resume"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-ink transition-colors hover:border-accent"
          >
            Résumé <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </nav>

        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong text-ink md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col border-t border-line bg-bg p-3 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/resume"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 font-medium text-accent transition-colors hover:bg-surface-2"
            >
              Résumé
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
