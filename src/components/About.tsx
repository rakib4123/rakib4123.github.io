import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import Stats from "./Stats";

const facts = [
  ["Education", "B.Sc. CSE — AIUB (2026)"],
  ["Current Role", "IT Intern, Live Technologies"],
  ["Focus", "ML Systems & Full-Stack"],
  ["Robotics", "Founder, Khepa Chakka"],
  ["Languages", "Bangla (Native) · English (Fluent)"],
  ["Based in", "Dhaka, Bangladesh (Remote Ready)"],
];

const recruiterPillars = [
  {
    title: "Scientific Rigor & Auditing",
    desc: "Catching target leakage, validating conformal bounds, and running controlled ablations before shipping.",
  },
  {
    title: "Full-Stack System Delivery",
    desc: "Bridging ML pipelines with production Next.js 15, NestJS 11, PostgreSQL, and REST API architectures.",
  },
  {
    title: "High-Velocity Engineering",
    desc: "Daily AI-native workflows (Claude Code, agent-driven tooling) to rapidly iterate from prototype to benchmarked deployment.",
  },
  {
    title: "Leadership & Cross-Functional Execution",
    desc: "Founded Khepa Chakka robotics team; coordinated mechanical, firmware, and software teams across 6 podium finishes.",
  },
];

export default function About() {
  return (
    <section id="about" className="pb-24 sm:pb-32 lg:scroll-mt-24">
      <SectionHeading
        index="01"
        label="About"
        title={
          <>
            I care about the result being <em>true</em>, not just the number looking good.
          </>
        }
      />

      <div className="flex flex-col gap-12">
        <Reveal className="grid items-start gap-8 sm:grid-cols-[180px_1fr]">
          <Image
            src="/images/profile.jpg"
            alt="Portrait of Md. Rakib Hossain"
            width={680}
            height={800}
            className="h-[180px] w-[180px] rounded-full border border-line object-cover shadow-[0_24px_48px_-24px_rgba(14,18,32,0.35)]"
          />
          <div className="flex flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
            <p>
              I work across the whole ML lifecycle: dataset curation and exploratory analysis,
              feature engineering, model calibration, and deployment. Then I build the product that
              puts the model in front of people. RideGuard&apos;s self-audit, which caught its own
              target leakage, is the work I&apos;m proudest of. I use AI-assisted development with
              Claude Code daily to maintain exceptional delivery speed.
            </p>
            <p>
              <strong className="font-medium text-ink">RideGuard</strong> is a deployed ML risk
              service whose self-audit caught its own target leakage;{" "}
              <strong className="font-medium text-ink">Drikon</strong> is a live production
              e-commerce platform with an in-house recommendation engine;{" "}
              <strong className="font-medium text-ink">DhakaNight</strong> and{" "}
              <strong className="font-medium text-ink">PulseStone</strong> grew into peer-reviewed
              research papers — three in total, all presented as first author at IEEE COMPAS and ICCA
              2026. As founder of{" "}
              <strong className="font-medium text-ink">&quot;Khepa Chakka&quot;</strong>, I&apos;ve
              led competitive robots to 6 national and international podiums. Today I&apos;m also an
              IT Intern at Live Technologies and build durbarrobotics.com as a freelance developer.
              I&apos;m looking for opportunities in{" "}
              <strong className="font-medium text-ink">
                data science, machine learning, or full-stack development
              </strong>
              .
            </p>
          </div>
        </Reveal>

        {/* What I Bring to Your Team (Recruiter Callout) */}
        <Reveal>
          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-accent font-medium">
              What I Bring to Your Team
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {recruiterPillars.map((pillar) => (
                <div key={pillar.title} className="flex gap-3">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <h4 className="text-[16px] font-semibold text-ink">{pillar.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Stats />

        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col-reverse gap-1 border-t border-line py-4">
                <dd className="text-[15px] font-medium text-ink">{v}</dd>
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{k}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
