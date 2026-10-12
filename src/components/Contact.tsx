import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-5 pb-28 pt-32 sm:px-8 lg:px-12">
      <Reveal>
        <div className="flex flex-col items-start gap-7 rounded-3xl border border-line bg-surface/92 p-8 backdrop-blur-md sm:p-14 lg:p-20">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent">06 — Contact</span>
          <h2 className="max-w-[820px] text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
            Have a model that needs to ship? Let&apos;s talk.
          </h2>
          <p className="max-w-[560px] text-lg font-light text-ink-soft">
            I&apos;m open to roles in data science, machine learning and full-stack development. Email
            is the fastest way to reach me.
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="mailto:r1.rakibhossain1@gmail.com"
                className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-[filter] hover:brightness-110"
              >
                <Mail size={16} aria-hidden="true" /> r1.rakibhossain1@gmail.com
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://github.com/rakib4123"
                {...external}
                className="inline-flex h-[52px] items-center gap-2.5 rounded-full border border-line-strong px-6 text-[15px] text-ink transition-colors hover:border-accent"
              >
                <FaGithub size={16} aria-hidden="true" /> GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="https://www.linkedin.com/in/md-rakib-hossain-519818263"
                {...external}
                className="inline-flex h-[52px] items-center gap-2.5 rounded-full border border-line-strong px-6 text-[15px] text-ink transition-colors hover:border-accent"
              >
                <FaLinkedin size={16} aria-hidden="true" /> LinkedIn
              </a>
            </Magnetic>
          </div>

          <div className="mt-4 flex w-full flex-col gap-3 border-t border-line pt-7 text-sm text-muted sm:flex-row sm:flex-wrap sm:gap-x-10">
            <span>
              <strong className="font-medium text-ink-soft">Phone:</strong>{" "}
              <a href="tel:+8801632941507" className="hover:text-accent">+880 1632 941507</a>
            </span>
            <span>
              <strong className="font-medium text-ink-soft">Email:</strong>{" "}
              <a href="mailto:r1.rakibhossain1@gmail.com" className="hover:text-accent">r1.rakibhossain1@gmail.com</a>
            </span>
            <span>
              <strong className="font-medium text-ink-soft">Based in:</strong> Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
