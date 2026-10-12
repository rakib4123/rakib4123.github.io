export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-3 border-t border-line py-8 text-[13px] text-muted">
      <span>© {new Date().getFullYear()} Md. Rakib Hossain</span>
      <span>Designed and built with Next.js, three.js &amp; Framer Motion</span>
    </footer>
  );
}
