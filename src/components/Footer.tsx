export default function Footer() {
  return (
    <footer className="bg-bg-main text-muted-2 py-8 border-t border-line text-sm">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-muted">
          © {new Date().getFullYear()} Md. Rakib Hossain
        </div>
        <div className="font-mono uppercase tracking-wider text-muted-2 text-[11px] flex items-center gap-2">
          <span className="led led-orange" style={{ width: 6, height: 6 }} />
          All systems operational · Built with Next.js, Tailwind CSS &amp; Framer Motion
        </div>
      </div>
    </footer>
  );
}
