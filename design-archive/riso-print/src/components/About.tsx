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
