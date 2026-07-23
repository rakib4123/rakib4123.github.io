"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
          <a
            href="/Rakib_Hossain_CV.pdf"
            download
            className="ml-2 text-[13px] font-medium text-brand-cyan border border-brand-cyan/30 hover:bg-brand-cyan hover:text-white px-4 py-2 rounded-md transition-all"
          >
            Resume
          </a>
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
              <a
                href="/Rakib_Hossain_CV.pdf"
                download
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-brand-cyan hover:bg-cyan-50 px-4 py-3 rounded-md transition-all"
              >
                Resume ↓
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
