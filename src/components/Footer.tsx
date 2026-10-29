import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line py-12 text-sm text-muted">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <p className="font-medium text-ink">
            © {new Date().getFullYear()} Md. Rakib Hossain. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Engineered with Next.js 16, TypeScript, Tailwind CSS v4, Three.js &amp; Framer Motion.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/rakib4123"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="text-muted hover:text-ink transition-colors p-1"
          >
            <FaGithub size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="text-muted hover:text-ink transition-colors p-1"
          >
            <FaLinkedin size={17} />
          </a>
          <a
            href="#top"
            aria-label="Back to top of page"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-mono text-ink-soft hover:border-ink hover:text-ink transition-colors ml-2"
          >
            Back to top <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
