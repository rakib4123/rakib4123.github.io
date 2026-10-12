"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";
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
  { title: "Backend", skills: ["NestJS", "Node.js", "REST APIs", "Prisma", "PostgreSQL"] },
  { title: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"] },
  {
    title: "Tools",
    skills: [
      "Git/GitHub",
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

const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const tagItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function Skills() {
  return (
    <section id="skills" className="mx-auto flex max-w-[1200px] flex-col gap-12 px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <SectionHeading
        tag="05 — Skills"
        title="Technologies I've built with."
        subtitle="Hover any technology to highlight it."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <Reveal key={category.title} delay={(i % 3) * 0.08} className="flex">
            <SpotlightCard className="tilt flex w-full flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-accent">{category.title}</h3>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={tagContainer}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill) => (
                  <motion.li
                    key={skill}
                    variants={tagItem}
                    className="cursor-default rounded-md border border-line bg-surface-2 px-3 py-1.5 font-mono text-[13px] text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-accent-ink hover:shadow-[0_4px_14px_rgba(39,71,216,0.25)]"
                  >
                    {skill}
                  </motion.li>
                ))}
              </motion.ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
