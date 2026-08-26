const stats: [string, string][] = [
  ["2", "Papers accepted\nICCA 2026"],
  ["4", "Classes of robot\ndesigned & built"],
  ["2,300+", "Images labelled\nfor DhakaNight"],
  ["14.5×", "Faster to first breath\nPulseStone vs. phone app"],
];

export default function Stats() {
  return (
    <section className="rule-b px-[var(--pad)] py-[clamp(2rem,5vw,3.5rem)]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map(([value, label], i) => (
          <div
            key={label}
            className={`px-4 py-3 ${i > 0 ? "md:border-l md:border-ink" : ""}`}
          >
            <div className="font-display text-petrol text-[clamp(1.75rem,1.2rem+2vw,3rem)] leading-none">
              {value}
            </div>
            <div className="font-mono text-[.72rem] uppercase tracking-[0.1em] whitespace-pre-line mt-2 leading-[1.5]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
