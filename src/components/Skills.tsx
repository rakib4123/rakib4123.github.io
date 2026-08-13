"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { useState } from "react";
import SpotlightCard from "./SpotlightCard";

const skillCategories = [
  {
    title: "AI, ML & Computer Vision",
    skills: ["scikit-learn", "PyTorch", "TensorFlow", "CatBoost", "XGBoost", "YOLO", "OpenCV", "SHAP"],
  },
  {
    title: "Data Science & Analytics",
    skills: ["Python", "SQL", "pandas", "NumPy", "Excel", "Power BI"],
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

const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const tagItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <SpotlightCard className="relative bg-white border border-slate-200 rounded-xl p-6 overflow-hidden">
                <h4 className="text-sm font-extrabold text-slate-900 mb-4 pb-2 border-b-2 border-brand-cyan/30 inline-block uppercase tracking-wider">
                  {category.title}
                </h4>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={tagContainer}
                  className="flex flex-wrap gap-2"
                >
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={tagItem}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`text-sm px-3 py-1.5 rounded-md border transition-all duration-300 cursor-default ${
                        hoveredSkill === skill
                          ? "bg-brand-cyan text-white border-brand-cyan shadow-[0_4px_12px_rgba(6,182,212,0.25)] -translate-y-0.5"
                          : "bg-white text-slate-600 border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
