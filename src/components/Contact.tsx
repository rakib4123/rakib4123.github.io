"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-white border-t border-gray-100"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionHeading
          title="Let's build software that solves real problems."
          tag="06 — Contact"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed"
        >
          I&apos;m open to roles in data analytics, data science, and software
          development. The fastest way to reach me is email.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="mailto:000.mdrakibhossain@gmail.com"
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium text-sm px-7 py-3 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
          >
            <Mail size={16} /> Email me
          </a>
          <a
            href="https://github.com/rakib4123"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-slate-700 font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-slate-300 hover:text-slate-900 hover:-translate-y-0.5"
          >
            <FaGithub size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 text-slate-700 font-medium text-sm px-7 py-3 rounded-md transition-all hover:border-slate-300 hover:text-slate-900 hover:-translate-y-0.5"
          >
            <FaLinkedin size={16} /> LinkedIn
          </a>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-6 text-sm text-slate-500">
          <span>
            <strong className="text-slate-700">Phone:</strong> +8801632941507
          </span>
          <span>
            <strong className="text-slate-700">Email:</strong>{" "}
            000.mdrakibhossain@gmail.com
          </span>
          <span>
            <strong className="text-slate-700">Based in:</strong> Dhaka,
            Bangladesh
          </span>
        </div>
      </div>
    </section>
  );
}
