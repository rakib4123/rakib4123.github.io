import { listRow } from "@/lib/utils";
import Reveal from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const leadership = [
  {
    years: "2023 – present",
    role: "Founder & Team Lead",
    org: "Khepa Chakka robotics team",
    desc: "Founded and lead a competitive team building four classes of robots: line-following, soccer, race and battle. I coordinate members across mechanical design, electronics and software against competition deadlines.",
  },
  {
    years: "2023 – present",
    role: "Active Member",
    org: "Engineering Students' Association of Bangladesh (ESAB) · AIUB club",
    desc: "Collaborate with faculty on research and development, and take part in seminars and workshops on emerging technologies.",
  },
];

const education = [
  { year: "2026", title: "B.Sc. in Computer Science & Engineering", org: "American International University-Bangladesh (AIUB)" },
  { year: "2021", title: "Higher Secondary Certificate — Science", org: "Dhaka Imperial College" },
  { year: "2019", title: "Secondary School Certificate — Science", org: "Dhaka Collegiate School" },
];

export default function Experience() {
  return (
    <section id="experience" className="pb-28 lg:scroll-mt-24 lg:pb-36">
      <SectionHeading index="02" label="Experience" title={<>Leadership &amp; <em>education</em>.</>} />

      <Reveal>
        <ol className="group/list -mx-5 flex flex-col gap-1">
          {leadership.map((l) => (
            <li key={l.org} className={`grid gap-2 sm:grid-cols-[150px_1fr] sm:gap-6 ${listRow}`}>
              <span className="pt-1 font-mono text-xs uppercase tracking-[0.08em] text-muted">{l.years}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold leading-snug tracking-[-0.01em] text-ink">
                  {l.role} <span className="font-normal text-accent">· {l.org}</span>
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{l.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-12">
        <h3 className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">Education</h3>
        <ol>
          {education.map((ed) => (
            <li
              key={ed.title}
              className="grid gap-1 border-b border-line py-4 sm:grid-cols-[150px_1fr] sm:gap-6"
            >
              <span className="font-mono text-[13px] text-muted">{ed.year}</span>
              <div className="flex flex-col">
                <span className="font-medium text-ink">{ed.title}</span>
                <span className="text-[15px] text-muted">{ed.org}</span>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
