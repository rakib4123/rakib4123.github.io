import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Reveal from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const detail = "flex flex-col-reverse gap-1 border-t border-line py-4";
const detailLabel = "font-mono text-[11px] uppercase tracking-[0.12em] text-muted";

const outline =
  "inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong bg-surface px-6 text-[15px] text-ink transition-colors hover:border-ink";

export default function Contact() {
  return (
    <section id="contact" className="pb-24 lg:scroll-mt-24">
      <SectionHeading
        index="07"
        label="Contact"
        title={
          <>
            Have a model that needs to <em>ship</em>? Let&apos;s talk.
          </>
        }
      >
        I&apos;m open to roles in data science, machine learning and full-stack development. Email is
        the fastest way to reach me.
      </SectionHeading>

      <Reveal className="flex flex-col gap-10">
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:r1.rakibhossain1@gmail.com"
            className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-ink transition-[filter] hover:brightness-110"
          >
            <Mail size={16} aria-hidden="true" /> Email me
          </a>
          <a href="https://github.com/rakib4123" {...external} className={outline}>
            <FaGithub size={16} aria-hidden="true" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/md-rakib-hossain-519818263" {...external} className={outline}>
            <FaLinkedin size={16} aria-hidden="true" /> LinkedIn
          </a>
        </div>

        <dl className="grid gap-x-6 sm:grid-cols-3">
          <div className={detail}>
            <dd className="text-[15px] text-ink">
              <a href="mailto:r1.rakibhossain1@gmail.com" className="hover:text-accent">
                r1.rakibhossain1@gmail.com
              </a>
            </dd>
            <dt className={detailLabel}>Email</dt>
          </div>
          <div className={detail}>
            <dd className="text-[15px] text-ink">
              <a href="tel:+8801632941507" className="hover:text-accent">
                +880 1632 941507
              </a>
            </dd>
            <dt className={detailLabel}>Phone</dt>
          </div>
          <div className={detail}>
            <dd className="text-[15px] text-ink">Dhaka, Bangladesh</dd>
            <dt className={detailLabel}>Based in</dt>
          </div>
        </dl>

        <Link
          href="/resume"
          className="inline-flex w-fit items-center gap-1.5 text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          View the full résumé <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
