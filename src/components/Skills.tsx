"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";

const skillCategories = [
  {
    title: "Data & Analytics",
    skills: ["Python", "SQL", "pandas", "NumPy", "Excel", "Power BI"],
  },
  {
    title: "Machine Learning",
    skills: ["scikit-learn", "PyTorch", "TensorFlow", "CatBoost", "XGBoost", "YOLO", "OpenCV", "SHAP"],
  },
  {
    title: "Software",
    skills: ["C++", "JavaScript", "Next.js", "NestJS", ".NET", "REST APIs", "PostgreSQL", "SQL Server"],
  },
  {
    title: "Embedded",
    skills: ["Arduino C++", "ESP32", "Sensor interfacing"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "Jupyter", "Roboflow", "Claude Code", "Antigravity"],
  },
  {
    title: "Ways of working",
    skills: ["Data cleaning", "EDA", "Feature engineering", "Model explainability", "User studies"],
  },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 bg-bg-main relative border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Technologies I've built with."
          tag="05 — Skills"
          subtitle="Select any technology to highlight it."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h4 className="font-serif text-sm font-bold text-slate-900 mb-4 pb-2 border-b-2 border-brand-cyan/30 inline-block uppercase tracking-wider">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`text-sm px-3 py-1.5 rounded-md border transition-all duration-300 cursor-default ${
                      hoveredSkill === skill
                        ? "bg-brand-cyan text-white border-brand-cyan shadow-[0_4px_12px_rgba(6,182,212,0.25)] -translate-y-0.5"
                        : "bg-white text-slate-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
