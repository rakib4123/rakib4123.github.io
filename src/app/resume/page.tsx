import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";

export const metadata = {
  title: "Resume | Md. Rakib Hossain",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-bg-main">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-cyan transition-colors"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
          <a
            href="/Rakib_Hossain_CV.pdf"
            download
            className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium text-sm px-5 py-2.5 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(15,23,42,0.15)]"
          >
            <Download size={16} /> Download PDF
          </a>
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white aspect-[8.5/11]">
          <iframe
            src="/Rakib_Hossain_CV.pdf"
            title="Md. Rakib Hossain — Resume"
            className="w-full h-full"
          />
        </div>
      </div>
    </main>
  );
}
