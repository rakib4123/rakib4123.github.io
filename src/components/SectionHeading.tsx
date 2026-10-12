import { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * A section's numbered label, serif title and optional lede. On narrow
 * screens there is no sidebar index, so the label pins to the top of the
 * viewport while its section scrolls past.
 */
export function SectionHeading({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-20 -mx-6 mb-6 bg-bg/85 px-6 py-4 backdrop-blur-md sm:-mx-10 sm:px-10 lg:static lg:mx-0 lg:mb-5 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span className="text-accent">{index}</span> — {label}
        </span>
      </div>
      <Reveal className="mb-12 flex flex-col gap-5">
        <h2 className="font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.01em] text-ink">
          {title}
        </h2>
        {children && <p className="max-w-[560px] text-[17px] leading-relaxed text-ink-soft">{children}</p>}
      </Reveal>
    </>
  );
}
