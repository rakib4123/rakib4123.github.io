"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Robotics", href: "#robotics" },
  { name: "Awards", href: "#awards" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="max-w-6xl mx-auto bg-slate-950/95 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] px-6 py-3.5 flex items-center justify-between">
        <a
          href="#top"
          className="font-extrabold tracking-tight text-base text-white"
        >
          Md. Rakib Hossain
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-slate-300 hover:text-brand-cyan px-3.5 py-2 rounded-md transition-colors"
            >
              {link.name}
            </a>
          ))}
          <Magnetic>
            <Link
              href="/resume"
              className="ml-2 text-[13px] font-semibold text-slate-950 bg-brand-cyan hover:bg-cyan-400 px-4 py-2 rounded-md transition-all"
            >
              Resume
            </Link>
          </Magnetic>
        </nav>

        <button
          className="md:hidden text-slate-200 hover:text-white"
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
            className="md:hidden max-w-6xl mx-auto mt-2 bg-slate-950 rounded-2xl shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col p-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-300 hover:text-brand-cyan hover:bg-white/5 px-4 py-3 rounded-md transition-all"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-brand-cyan hover:bg-white/5 px-4 py-3 rounded-md transition-all"
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
