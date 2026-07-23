"use client";

import { motion } from "framer-motion";

const stats = [
  { n: "14+", l: "National & international\nrobotics podiums" },
  { n: "6+", l: "Robot classes\ndesigned & built" },
  { n: "2,300+", l: "Images labelled\nfor DhakaNight" },
  { n: "1", l: "Deployed\nML web app" },
];

export default function Stats() {
  return (
    <section className="py-16 bg-bg-main relative border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-serif text-4xl md:text-5xl font-bold mb-2 text-brand-cyan">
                {stat.n}
              </div>
              <div className="text-slate-500 text-sm whitespace-pre-line leading-relaxed">
                {stat.l}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
