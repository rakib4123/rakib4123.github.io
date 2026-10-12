import { ArrowDown, Download, Presentation, Trophy, Users } from "lucide-react";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const credentials = [
  { icon: Presentation, text: "Presented at IEEE COMPAS 2026" },
  { icon: Trophy, text: "Winner · Techfest IIT Bombay 2024" },
  { icon: Trophy, text: "Champion · AIUB CS Fest 2024" },
  { icon: Users, text: "Founder · Khepa Chakka robotics" },
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
      {/* Narrow screens: the network floats in this band, above the copy. */}
      <div aria-hidden="true" className="h-[38svh] lg:hidden" />

      <div className="grid items-center gap-12 pb-20 lg:min-h-[calc(100svh-72px)] lg:grid-cols-2 lg:py-16">
        <div className="flex flex-col gap-7">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
              <span className="live h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              Open to roles · Data science, ML &amp; full-stack
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-[clamp(2.5rem,5.4vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Machine-learning systems, built end to end.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-[540px] text-lg font-light leading-relaxed text-ink-soft sm:text-[19px]">
              I&apos;m Rakib, a CSE student at AIUB. I take ML from dataset curation to calibrated,
              deployed models, and I build the applications around them. Three first-author papers
              so far; the first was presented at IEEE COMPAS 2026.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#work"
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-[filter] hover:brightness-110"
              >
                View selected work <ArrowDown size={16} aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/Rakib_Hossain_CV.pdf"
                download
                className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong px-6 text-[15px] font-medium text-ink transition-colors hover:border-accent"
              >
                <Download size={16} aria-hidden="true" /> Download CV
              </a>
            </Magnetic>
          </Reveal>
          <Reveal delay={0.32}>
            <ul aria-label="Highlights" className="flex flex-wrap gap-2.5 pt-2">
              {credentials.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-3.5 text-[13px] text-ink-soft backdrop-blur-md"
                >
                  <Icon size={14} className="text-accent" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Wide screens: the network floats in this column. */}
        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </section>
  );
}
