import Link from "next/link";

export const metadata = {
  title: "Resume | Md. Rakib Hossain",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-paper">
      <div className="max-w-4xl mx-auto px-[var(--pad)] py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 rule-b font-mono text-[.8rem] uppercase tracking-[0.06em]">
          <Link href="/" className="nav-underline text-petrol">
            ← Back to portfolio
          </Link>
          <a href="/Rakib_Hossain_CV.pdf" download className="nav-underline text-petrol">
            Download PDF ↓
          </a>
        </div>

        <div className="rule-a shadow-hard-petrol bg-paper-lift aspect-[8.5/11]">
          <iframe
            src="/Rakib_Hossain_CV.pdf"
            title="Md. Rakib Hossain — Resume"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </main>
  );
}
