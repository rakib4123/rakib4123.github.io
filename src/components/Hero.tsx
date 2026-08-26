export default function Hero() {
  return (
    <section id="top" className="rule-b px-[var(--pad)] pt-[clamp(3rem,9vw,7rem)] pb-[clamp(3rem,8vw,6rem)]">
      <p className="font-mono text-[.8rem] tracking-[0.16em] uppercase text-petrol m-0 mb-[clamp(1.25rem,4vw,2.25rem)]">
        Data Science &amp; Machine Learning · Full-Stack Developer — Dhaka, Bangladesh
      </p>

      <h1 className="hero-name" data-name={"MD. RAKIB\nHOSSAIN"}>
        MD. RAKIB
        <br />
        HOSSAIN
      </h1>

      <p className="max-w-[46ch] mt-[clamp(1.75rem,5vw,3rem)] mb-0 text-[clamp(1.05rem,1rem+.6vw,1.35rem)] leading-[1.5]">
        I take machine-learning systems end to end — dataset curation, exploratory
        analysis, feature engineering, model calibration, deployment — and ship the
        applications around them.
      </p>

      <ul className="flex flex-wrap gap-x-[clamp(1.5rem,5vw,4rem)] gap-y-0 m-0 mt-[clamp(1.75rem,5vw,2.75rem)] p-0 list-none font-mono text-[.85rem]">
        {[
          ["Available", "Full-stack · AI-ML · software engineering roles"],
          ["Stack", "Python · TypeScript · Next.js · NestJS · PyTorch"],
          ["Currently", "Two papers accepted at ICCA 2026"],
        ].map(([k, v]) => (
          <li key={k} className="py-[.35rem]">
            <span className="block text-[.7rem] tracking-[0.14em] uppercase text-petrol">{k}</span>
            {v}
          </li>
        ))}
      </ul>

      <p className="mt-[clamp(2rem,5vw,3rem)] mb-0">
        <a href="#about" className="font-mono text-[.8rem] uppercase tracking-[0.06em] text-petrol nav-underline">
          Read on ↓
        </a>
      </p>
    </section>
  );
}
