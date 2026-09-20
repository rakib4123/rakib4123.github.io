"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-surface border-t border-line"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeading
          title="Let's build software that solves real problems."
          tag="07 — Contact"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-lg text-muted max-w-xl mb-10 leading-relaxed"
        >
          I&apos;m open to roles and opportunities in data science, machine
          learning, and full-stack development. The fastest way to reach me
          is email.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="mailto:r1.rakibhossain1@gmail.com"
            className="inline-flex items-center gap-2 bg-brand-red text-white font-medium text-sm px-7 py-3 chamfer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(196,22,47,0.3)]"
          >
            <Mail size={16} /> Email me
          </a>
          <a
            href="https://github.com/rakib4123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-surface border border-line text-ink-soft font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-line-strong hover:text-ink hover:-translate-y-0.5"
          >
            <FaGithub size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-surface border border-line text-ink-soft font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-line-strong hover:text-ink hover:-translate-y-0.5"
          >
            <FaLinkedin size={16} /> LinkedIn
          </a>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row gap-6 text-sm text-muted">
          <span>
            <strong className="text-ink-soft">Phone:</strong> +8801632941507
          </span>
          <span>
            <strong className="text-ink-soft">Email:</strong>{" "}
            r1.rakibhossain1@gmail.com
          </span>
          <span>
            <strong className="text-ink-soft">Based in:</strong> Dhaka,
            Bangladesh
          </span>
        </div>
      </div>
    </section>
  );
}
