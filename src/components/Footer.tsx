export default function Footer() {
  return (
    <footer className="bg-bg-main text-muted-2 py-8 border-t border-line text-sm">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-muted">
          © {new Date().getFullYear()} Md. Rakib Hossain
        </div>
        <div className="text-muted-2 text-xs">
          Built with Next.js, Tailwind CSS & Framer Motion
        </div>
      </div>
    </footer>
  );
}
