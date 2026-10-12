import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Resume | Md. Rakib Hossain",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-soft transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
          </Link>
          <div className="flex flex-wrap gap-3">
            {/* Many phone browsers can't show a PDF inside a page. */}
            <a
              href="/Rakib_Hossain_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-accent"
            >
              <ExternalLink size={15} aria-hidden="true" /> Open PDF
            </a>
            <a
              href="/Rakib_Hossain_CV.pdf"
              download
              className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-[filter] hover:brightness-110"
            >
              <Download size={15} aria-hidden="true" /> Download PDF
            </a>
          </div>
        </div>

        <div className="aspect-[8.5/11] overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_20px_40px_-16px_rgba(14,18,32,0.18)]">
          <iframe
            src="/Rakib_Hossain_CV.pdf"
            title="Md. Rakib Hossain — Resume"
            className="h-full w-full"
          />
        </div>
      </div>
    </main>
  );
}
