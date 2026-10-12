import { ArrowDown, Download, Presentation, Trophy, Users } from "lucide-react";
import HeroPortrait from "./HeroPortrait";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import ScrollHeadline from "./ScrollHeadline";
import TypewriterRole from "./TypewriterRole";

const credentials = [
  { icon: Presentation, text: "Presented at IEEE COMPAS 2026" },
  { icon: Trophy, text: "Winner · Techfest IIT Bombay 2024" },
  { icon: Trophy, text: "Champion · AIUB CS Fest 2024" },
  { icon: Users, text: "Founder · Khepa Chakka robotics" },
];

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
      <div className="grid items-center gap-8 pb-20 pt-4 lg:min-h-[calc(100svh-72px)] lg:grid-cols-2 lg:gap-12 lg:py-10">
        {/* The portrait, with the neural network glowing behind it. */}
        <div className="h-[36svh] lg:order-2 lg:h-full">
          <HeroPortrait />
        </div>

        <div className="flex flex-col gap-6 lg:order-1">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.08em] text-muted">
              <span className="live h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              Open to roles · Data science, ML &amp; full-stack
            </p>
          </Reveal>

          <h1 className="sr-only">Hi, I&apos;m Rakib. Machine-learning systems, built end to end.</h1>
          <Reveal delay={0.05}>
            <div aria-hidden="true">
              <ScrollHeadline
                lines={["Hi, I'm Rakib."]}
                className="select-none text-[clamp(2.9rem,6.4vw,5.75rem)] font-semibold leading-none tracking-[-0.045em]"
              />
              <p className="mt-3 text-[clamp(1.4rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-ink-soft">
                Machine-learning systems, built end to end.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            {/* Room for a role that wraps, so the copy below never jumps. */}
            <p className="min-h-[3.2em] font-mono text-[15px] text-muted sm:min-h-[1.6em]">
              <span className="text-accent">&gt;</span> I work as <TypewriterRole />
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="max-w-[540px] text-lg font-light leading-relaxed text-ink-soft">
              CSE student at AIUB. I take ML from dataset curation to calibrated, deployed models,
              and build the applications around them. Three first-author papers so far; the first
              was presented at IEEE COMPAS 2026.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#work"
                className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-[filter] hover:brightness-110"
              >
                See the work <ArrowDown size={16} aria-hidden="true" />
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

          <Reveal delay={0.3}>
            <ul aria-label="Highlights" className="flex flex-wrap gap-2.5 pt-1">
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
      </div>
    </section>
  );
}
