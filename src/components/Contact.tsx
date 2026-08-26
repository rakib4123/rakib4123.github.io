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
