"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-main/90 backdrop-blur-lg border-b border-line-strong">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#top"
          className="font-display uppercase font-bold tracking-[0.12em] text-lg text-ink flex items-center gap-2.5"
        >
          <span className="led" />
          Md. Rakib Hossain
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative font-mono uppercase tracking-wider text-[11px] font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive ? "text-brand-red" : "text-ink-soft hover:text-brand-red"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-ink/[0.07] rounded-md -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
          <Magnetic>
            <Link
              href="/resume"
              className="ml-2 font-mono uppercase tracking-wider text-[11px] font-bold text-white bg-brand-red hover:bg-red-500 px-4 py-2 chamfer transition-all"
            >
              Resume
            </Link>
          </Magnetic>
        </nav>

        <button
          className="md:hidden text-ink hover:text-brand-red"
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
            className="md:hidden bg-bg-main border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col p-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm font-medium hover:bg-ink/5 px-4 py-3 rounded-md transition-all ${
                      isActive ? "text-brand-red" : "text-ink-soft hover:text-brand-red"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-brand-red hover:bg-ink/5 px-4 py-3 rounded-md transition-all"
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
