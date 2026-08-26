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
