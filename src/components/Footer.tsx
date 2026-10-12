export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 px-5 py-7 text-[13px] text-muted sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} Md. Rakib Hossain</span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
          <span className="live h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          All systems operational · Built with Next.js, three.js &amp; Framer Motion
        </span>
      </div>
    </footer>
  );
}
