export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-between gap-x-8 gap-y-3 px-[var(--pad)] pt-6 pb-9 font-mono text-[.78rem]">
      <p className="m-0">© {new Date().getFullYear()} Md. Rakib Hossain · Dhaka, Bangladesh</p>
      <p className="m-0">
        <a href="#top" className="text-petrol nav-underline">Back to top ↑</a>
      </p>
    </footer>
  );
}
