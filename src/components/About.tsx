import Image from "next/image";
import Reveal from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import Stats from "./Stats";

const facts = [
  ["Education", "B.Sc. CSE — AIUB"],
  ["Role", "IT Intern, Live Technologies"],
  ["Focus", "ML systems, data to deployment"],
  ["Robotics", "Founder, Khepa Chakka"],
  ["Languages", "Bangla · English"],
  ["Based in", "Dhaka, Bangladesh"],
];

export default function About() {
  return (
    <section id="about" className="pb-28 lg:scroll-mt-24 lg:pb-36">
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
              feature engineering, model calibration and deployment. Then I build the product that
              puts the model in front of people. RideGuard&apos;s self-audit, which caught its own
              target leakage, is the work I&apos;m proudest of.
            </p>
            <p>
              <strong className="font-medium text-ink">RideGuard</strong> is a deployed ML risk
              service with calibrated, explainable predictions;{" "}
              <strong className="font-medium text-ink">Drikon</strong> is a live e-commerce
              platform with a recommendation engine I mined from real order history;{" "}
              <strong className="font-medium text-ink">DhakaNight</strong> and{" "}
              <strong className="font-medium text-ink">PulseStone</strong> grew into papers too —
              three in total, all presented at IEEE COMPAS and ICCA 2026. As founder of{" "}
              <strong className="font-medium text-ink">&quot;Khepa Chakka&quot;</strong>, I&apos;ve
              taken robots from concept to the competition floor. Today I&apos;m an IT Intern at Live
              Technologies and build durbarrobotics.com as a freelance developer. I&apos;m looking
              for opportunities in{" "}
              <strong className="font-medium text-ink">machine learning and AI automation</strong>.
            </p>
          </div>
        </Reveal>

        <Stats />

        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col-reverse gap-1 border-t border-line py-4">
                <dd className="text-[15px] text-ink">{v}</dd>
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{k}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
