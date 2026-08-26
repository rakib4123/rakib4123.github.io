export default function Footer() {
  return (
    <footer className="bg-bg-main text-slate-400 py-8 border-t border-gray-100 text-sm">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-500">
          © {new Date().getFullYear()} Md. Rakib Hossain
        </div>
        <div className="text-slate-400 text-xs">
          Built with Next.js, Tailwind CSS & Framer Motion
        </div>
      </div>
    </footer>
  );
}
