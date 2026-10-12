import Reveal from "./Reveal";

export function SectionHeading({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="flex max-w-2xl flex-col gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent">{tag}</span>
      <h2 className="text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
        {title}
      </h2>
      {subtitle && <p className="text-[17px] font-light text-ink-soft">{subtitle}</p>}
    </Reveal>
  );
}
