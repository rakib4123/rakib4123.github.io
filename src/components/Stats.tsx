import Reveal from "./Reveal";

const stats = [
  { value: "3", label: "First-author papers" },
  { value: "0.973", label: "Macro-F1, RideGuard crash-risk model" },
  { value: "2,300", label: "Night images labelled for DhakaNight" },
  { value: "6", label: "National & international robotics podiums" },
];

export default function Stats() {
  return (
    <section aria-label="Highlights" className="border-y border-line bg-bg/70 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 0.08}
            className={`flex flex-col gap-1.5 py-9 pr-6 ${i % 2 === 1 ? "border-l border-line pl-6" : ""} ${
              i === 2 ? "lg:border-l lg:border-line lg:pl-6" : ""
            } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""}`}
          >
            <span className="text-[44px] font-semibold leading-none tracking-[-0.03em]">{stat.value}</span>
            <span className="text-sm text-muted">{stat.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
