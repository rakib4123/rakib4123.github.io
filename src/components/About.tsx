import Image from "next/image";
import Reveal from "./Reveal";

const facts = [
  ["Education", "B.Sc. CSE — AIUB"],
  ["Focus", "Data Science · ML · Full-Stack"],
  ["Role", "Founder, Khepa Chakka"],
  ["Club", "ESAB, AIUB"],
  ["Languages", "Bangla · English"],
  ["Based in", "Dhaka, Bangladesh"],
];

const leadership = [
  {
    role: "Founder & Team Lead",
    org: "Khepa Chakka robotics team",
    years: "2023 – present",
    desc: "Founded and lead a competitive team building four classes of robots: line-following, soccer, race and battle. I coordinate members across mechanical design, electronics and software against competition deadlines.",
  },
  {
    role: "Active Member",
    org: "Engineering Students' Association of Bangladesh (ESAB) · AIUB club",
    years: "2023 – present",
    desc: "Collaborate with faculty on research and development, and take part in seminars and workshops on emerging technologies.",
  },
];

const education = [
  { year: "2026", title: "B.Sc. in Computer Science & Engineering", org: "American International University-Bangladesh (AIUB)" },
  { year: "2021", title: "Higher Secondary Certificate — Science", org: "Dhaka Imperial College" },
  { year: "2019", title: "Secondary School Certificate — Science", org: "Dhaka Collegiate School" },
];

const label = "font-mono text-xs uppercase tracking-[0.08em] text-muted";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1200px] items-start gap-14 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[340px_1fr] lg:px-12"
    >
      <Reveal className="mx-auto w-full max-w-[340px]">
        <div className="device-r overflow-hidden rounded-[20px] border border-line-strong shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <Image
            src="/images/profile.jpg"
            alt="Portrait of Md. Rakib Hossain"
            width={680}
            height={800}
            className="block h-[400px] w-full object-cover"
          />
        </div>
      </Reveal>

      <div className="flex min-w-0 flex-col gap-6">
        <Reveal className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent">04 — About</span>
          <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            I care about the result being true, not just the number looking good.
          </h2>
          <p className="text-[17px] font-light text-ink-soft">
            I work across the whole ML lifecycle: dataset curation and exploratory analysis, feature
            engineering, model calibration and deployment. Then I build the product that puts the
            model in front of people. RideGuard&apos;s self-audit, which caught its own target
            leakage, is the work I&apos;m proudest of. I use AI-assisted development with Claude Code
            daily.
          </p>
          <p className="text-[17px] font-light text-ink-soft">
            <strong className="font-medium text-ink">RideGuard</strong> is a deployed ML risk
            service whose self-audit caught its own target leakage;{" "}
            <strong className="font-medium text-ink">Drikon</strong> is a live e-commerce platform
            with a recommendation engine I mined from real order history;{" "}
            <strong className="font-medium text-ink">DhakaNight</strong> and{" "}
            <strong className="font-medium text-ink">PulseStone</strong> grew into papers too —
            three in total, the first presented at IEEE COMPAS 2026. As founder of{" "}
            <strong className="font-medium text-ink">&quot;Khepa Chakka&quot;</strong>, I&apos;ve
            taken robots from concept to the competition floor. I&apos;m looking for opportunities in{" "}
            <strong className="font-medium text-ink">
              data science, machine learning, or full-stack development
            </strong>
            .
          </p>
        </Reveal>

        <Reveal>
          <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col-reverse gap-1 py-5 pr-5">
                <dd>{v}</dd>
                <dt className={label}>{k}</dt>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <h3 className={`${label} mb-3`}>Leadership &amp; clubs</h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {leadership.map((l) => (
              <li key={l.org} className="tilt flex flex-col gap-2 rounded-2xl border border-line bg-surface p-6">
                <span className="font-mono text-xs text-muted">{l.years}</span>
                <span className="text-lg font-semibold tracking-[-0.01em]">{l.role}</span>
                <span className="text-[15px] text-accent">{l.org}</span>
                <span className="text-sm font-light text-ink-soft">{l.desc}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <h3 className={`${label} mb-3`}>Education</h3>
          <ul className="border-t border-line">
            {education.map((ed) => (
              <li key={ed.title} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line py-4">
                <span className="w-12 shrink-0 font-mono text-[13px] text-muted">{ed.year}</span>
                <span className="min-w-[220px] flex-1 font-medium">{ed.title}</span>
                <span className="min-w-[220px] flex-1 text-[15px] text-muted">{ed.org}</span>
              </li>
            ))}
          </ul>
        </Reveal>

      </div>
    </section>
  );
}
