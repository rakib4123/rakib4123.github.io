import { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Standardized section heading with index badge, title, and optional lede.
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
    <Reveal className="mb-12 sm:mb-16 flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <span className="inline-flex items-center rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span className="text-accent font-semibold mr-1.5">{index}</span> {label}
        </span>
      </div>
      <h2 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold leading-[1.04] tracking-[-0.015em] text-ink">
        {title}
      </h2>
      {children && (
        <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-ink-soft">
          {children}
        </p>
      )}
    </Reveal>
  );
}
