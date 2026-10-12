import Image from "next/image";
import Reveal from "./Reveal";

const facts = [
  ["Affiliation", "ESAB, AIUB"],
  ["Languages", "Bangla · English"],
  ["Based in", "Dhaka, Bangladesh"],
];

const education = [
  { year: "2026", title: "B.Sc. in Computer Science & Engineering", org: "American International University-Bangladesh (AIUB)" },
  { year: "2021", title: "Higher Secondary Certificate — Science", org: "Dhaka Imperial College" },
  { year: "2019", title: "Secondary School Certificate — Science", org: "Dhaka Collegiate School" },
];

const skills = [
  {
    title: "Data science & ML",
    items: "pandas, NumPy, scikit-learn, CatBoost, PyTorch, YOLO, OpenCV, SHAP",
  },
  {
    title: "Methods",
    items: "EDA, feature engineering, association-rule mining, model calibration, leakage auditing, benchmarking, experiment design",
  },
  {
    title: "Engineering",
    items: "Python, SQL, C++, TypeScript, JavaScript, React, Next.js, Tailwind CSS, Node.js, NestJS, Prisma, PostgreSQL",
  },
  {
    title: "Tools",
    items: "Git/GitHub, Jupyter, Roboflow, Claude Code, Antigravity, VS Code, Vercel, Render",
  },
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
        </Reveal>

        <Reveal>
          <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col-reverse gap-1 py-5 pr-5">
                <dd>{v}</dd>
                <dt className={label}>{k}</dt>
              </div>
            ))}
          </dl>
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

        <Reveal className="grid gap-x-10 gap-y-7 pt-3 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <h3 className={label}>{group.title}</h3>
              <p className="text-[15px] text-ink-soft">{group.items}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
