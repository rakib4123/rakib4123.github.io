import { SectionHeading } from "./SectionHeading";
import Reveal from "./Reveal";

const skillCategories = [
  { title: "Languages", skills: ["Python", "SQL", "C++", "TypeScript", "JavaScript"] },
  {
    title: "Data Science & ML",
    skills: ["pandas", "NumPy", "scikit-learn", "CatBoost", "PyTorch", "YOLO", "OpenCV", "SHAP"],
  },
  {
    title: "Methods",
    skills: [
      "Exploratory data analysis",
      "Feature engineering",
      "Association-rule mining",
      "Model calibration",
      "Leakage auditing",
      "Benchmarking",
      "Experiment design",
    ],
  },
  { title: "Backend", skills: ["FastAPI", "NestJS", "Node.js", "REST APIs", "PostgreSQL"] },
  { title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"] },
  {
    title: "Tools",
    skills: [
      "Git/GitHub",
      "Jupyter",
      "Roboflow",
      "Vercel",
      "Render",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="pb-28 lg:scroll-mt-24 lg:pb-36">
      <SectionHeading
        index="06"
        label="Skills"
        title={
          <>
            Technologies I&apos;ve <em>built</em> with.
          </>
        }
      />

      <Reveal>
        <dl className="border-t border-line">
          {skillCategories.map((category) => (
            <div key={category.title} className="grid gap-3 border-b border-line py-5 sm:grid-cols-[170px_1fr] sm:gap-6">
              <dt className="pt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{category.title}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] text-ink-soft transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
