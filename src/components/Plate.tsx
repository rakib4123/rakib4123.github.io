export default function Plate({
  variant,
  label,
}: {
  variant: "a" | "b";
  label: string;
}) {
  return (
    <div
      className={`plate plate--${variant} relative flex items-end`}
      role="img"
      aria-label={`${label} — printed plate`}
    >
      <span className="m-3 bg-paper rule-a px-2 py-1 font-mono text-[.68rem] uppercase tracking-[0.12em]">
        {label}
      </span>
    </div>
  );
}
