"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: "Languages",
    skills: ["Python", "SQL", "C++", "TypeScript / JavaScript"],
  },
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
  {
    title: "Backend",
    skills: ["NestJS", "Node.js", "REST APIs", "Prisma", "PostgreSQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML / CSS"],
  },
  {
    title: "Tools",
    skills: [
      "Git / GitHub",
      "VS Code",
      "Jupyter",
      "Roboflow",
      "Claude Code",
      "Antigravity",
      "Canva",
      "Microsoft 365",
      "Vercel",
      "Render",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="rule-b px-[var(--pad)] py-[var(--gap)]">
      <SectionHeading title="Technologies I've built with." tag="06 — Skills" />

      <div className="grid gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-[clamp(1.5rem,4vw,2.75rem)] md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <h3 className="font-display uppercase text-petrol text-[clamp(1.05rem,1rem+.5vw,1.3rem)] m-0 mb-3 pb-2 rule-b">
              {group.title}
            </h3>
            <ul className="leaders">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <span className="font-medium">{skill}</span>
                  <span className="leaders__fill" />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
