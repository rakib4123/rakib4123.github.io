import Image from "next/image";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { listRow } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import Reveal from "./Reveal";
import { BrowserMockup, DemoButton, PhoneGallery } from "./ProjectMedia";

type FeaturedProject = {
  title: string;
  label: string;
  badge?: string;
  desc: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  stack: string;
  demo?: string;
  github: string;
  phone?: boolean;
  browser?: boolean;
  image?: { src: string; alt: string; width: number; height: number };
  screens?: string[];
};

const featured: FeaturedProject[] = [
  {
    title: "RideGuard",
    label: "Machine Learning Risk Service · IEEE COMPAS 2026",
    badge: "Paper 59 · Presented",
    desc: "A live web application that assesses real-time motorcycle route risk across Dhaka with geospatial heatmaps, speed anomaly warnings, and conformal confidence bounds. Its self-audit uncovered target leakage in the original model, which was refactored and documented as the central research finding.",
    highlights: [
      "Target-leakage self-audit published as primary research contribution",
      "Conformal prediction for rigorous, calibrated uncertainty bounds",
      "Local SHAP explanations provide transparent reasoning for each route recommendation",
    ],
    metrics: [
      { value: "0.043 → 0.008", label: "Calibration error (ECE)" },
      { value: "Conformal", label: "Calibrated bounds" },
      { value: "SHAP", label: "Per-route reasons" },
    ],
    stack: "Python / CatBoost / scikit-learn / SHAP / Next.js",
    demo: "https://ride-guard-web-app-web.vercel.app/",
    github: "https://github.com/rakib4123/Ride_Guard_WebApp",
    image: { src: "/images/rideguard-map.jpg", alt: "RideGuard risk map on a phone", width: 460, height: 1022 },
    screens: [
      "/images/rideguard-map.jpg",
      "/images/rideguard-now.jpg",
      "/images/rideguard-profile.jpg",
      "/images/rideguard-route.jpg",
    ],
    phone: true,
  },
  {
    title: "Drikon",
    label: "Production Full-Stack · E-Commerce with In-House Recommender",
    badge: "Flagship · Live Store",
    desc: "A multi-tenant e-commerce system built from scratch with Next.js 15, React 19, NestJS 11, and PostgreSQL. It features an in-house Apriori association-rule engine mined from actual purchase patterns to power “frequently bought together” and personalized cart suggestions.",
    highlights: [
      "Custom Apriori algorithm from scratch: candidate generation, pruning, and lift scoring",
      "17 backend modules: orders, reviews, coupons, flash sales, wishlists, and localized content",
      "Voice search, product comparisons, and zero-downtime CMS theme management",
    ],
    metrics: [
      { value: "17", label: "Backend Modules" },
      { value: "Apriori", label: "Custom Algorithmic Engine" },
      { value: "PostgreSQL", label: "Relational Prisma Schema" },
    ],
    stack: "Next.js 15 / React 19 / NestJS 11 / PostgreSQL / Prisma / Tailwind",
    demo: "https://drikon-web-vert1v.vercel.app/",
    github: "https://github.com/rakib4123/drikon",
    browser: true,
  },
  {
    title: "PulseStone",
    label: "Embedded Hardware & HCI · Controlled User Study · ICCA 2026",
    badge: "First Author · Presented",
    desc: "A tangible, single-action handheld device engineered for acute stress regulation. Initiates a multi-sensory calming sequence (haptic pulses, OLED visuals, breathing cadence) with a single pressure squeeze, bypassing the friction of unlocking a mobile screen.",
    highlights: [
      "ESP32-C3 microcontroller firmware with synchronized vibration, OLED, and RGB cues",
      "Controlled 15-participant, 150-trial empirical human-computer interaction study",
      "Statistically validated 14.5× faster initiation than conventional smartphone apps",
    ],
    metrics: [
      { value: "14.5×", label: "Faster than phone" },
      { value: "0.52 s", label: "Initiation latency" },
      { value: "15 / 15", label: "Preferred in study" },
    ],
    stack: "ESP32-C3 / Arduino C++ / Python / Statistical Evaluation",
    github: "https://github.com/rakib4123/PulseStone",
    image: { src: "/images/project-pulsestone.jpg", alt: "PulseStone handheld device", width: 1200, height: 1593 },
    phone: false,
  },
];

const more = [
  {
    title: "DhakaNight",
    label: "Computer Vision · Dataset & Benchmark · ICCA 2026",
    badge: "ICCA 2026 · First Author",
    desc: "Curated and labeled a 2,380-image nighttime street dataset in Dhaka. Benchmarked low-light enhancement pipelines (CLAHE, Gamma, Zero-DCE, RetinexFormer) against baseline YOLOv8 under controlled protocols, discovering that detector scaling outperforms preprocessing pipelines.",
    stack: "Python / PyTorch / YOLO / OpenCV / Roboflow",
    github: "https://github.com/rakib4123/Dhaka_Night",
  },
  {
    title: "Carbon Market Simulation",
    label: "Predictive Forecasting & Agent-Based Modeling",
    badge: "Co-Author",
    desc: "Benchmarked Ridge, XGBoost, LightGBM, and CatBoost on a 17-country panel (CatBoost won with 10.95% test MAPE). The forecasts drive a Mesa agent-based simulation of 48 firms, proving market linking reduced compliance costs in 55–62% of runs.",
    stack: "Python / CatBoost / Mesa / scikit-learn",
  },
  {
    title: "AIUB STEAM",
    label: "Desktop Enterprise · University Portal",
    badge: "Academic Software",
    desc: "Windows desktop enterprise portal with role-based access control (students, faculty, admins), pre-registration engines, grade calculation, and coursework submissions.",
    stack: "C# / .NET / WinForms / SQL Server",
    github: "https://github.com/rakib4123/AiubSteam",
  },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

function Stack({ stack }: { stack: string }) {
  return (
    <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
      {stack.split(" / ").map((tech) => (
        <li key={tech} className="rounded-full bg-accent/8 px-3 py-1 text-xs font-medium text-accent">
          {tech}
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  return (
    <section id="work" className="pb-28 lg:scroll-mt-24 lg:pb-36">
      <SectionHeading
        index="03"
        label="Work"
        title={
          <>
            Deployed models, honest benchmarks, and the <em>products</em> around them.
          </>
        }
      >
        Production ML services, rigorous empirical benchmarks, a live full-stack e-commerce
        platform, and physical embedded hardware.
      </SectionHeading>

      <div className="flex flex-col gap-10">
        {featured.map((p) => (
          <Reveal key={p.title}>
            <article className="feature overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-500 hover:border-line-strong hover:shadow-[0_40px_80px_-40px_rgba(14,18,32,0.3)]">
              {/* Product preview stage */}
              <div className="flex justify-center border-b border-line bg-surface-2 bg-[radial-gradient(ellipse_at_top,var(--color-accent-line),transparent_70%)] px-6 py-10">
                {p.browser && p.demo ? (
                  <BrowserMockup
                    title={p.title}
                    url={p.demo}
                    tag="E-Commerce & Algorithmic Recs"
                    subtitle="Next.js 15 · NestJS 11 · PostgreSQL · Custom Apriori Engine"
                  />
                ) : p.screens && p.image ? (
                  <PhoneGallery
                    title={p.title}
                    images={p.screens}
                    width={p.image.width}
                    height={p.image.height}
                  />
                ) : p.image ? (
                  <div className="device overflow-hidden rounded-2xl border border-line-strong shadow-[0_40px_80px_-20px_rgba(14,18,32,0.3)]">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      className="block h-[320px] w-[240px] object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-5 p-6 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {p.label}
                  </span>
                  {p.badge && (
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
                      {p.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-[44px] leading-none text-ink">{p.title}</h3>
                <p className="text-[16px] leading-relaxed text-ink-soft">{p.desc}</p>

                {/* Recruiter-focused key technical highlights */}
                <div className="rounded-2xl border border-line/80 bg-surface-2/60 p-4">
                  <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    Key Technical Highlights
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <CheckCircle2
                          size={15}
                          className="mt-0.5 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Measurable outcomes / metrics */}
                <dl className="grid grid-cols-3 border-y border-line">
                  {p.metrics.map((m, i) => (
                    <div
                      key={m.label}
                      className={`flex flex-col-reverse gap-0.5 py-4 ${i > 0 ? "border-l border-line pl-4" : "pr-4"}`}
                    >
                      <dt className="text-[12px] leading-tight text-muted sm:text-[13px]">{m.label}</dt>
                      <dd className="text-lg font-semibold tracking-[-0.02em] text-ink sm:text-[22px]">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Stack stack={p.stack} />

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {p.demo && <DemoButton url={p.demo} title={p.title} />}
                  <a
                    href={p.github}
                    {...external}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-ink transition-colors hover:border-ink hover:text-ink"
                  >
                    <FaGithub size={15} aria-hidden="true" /> View Source
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      {...external}
                      className="inline-flex min-h-11 items-center gap-1.5 px-3 text-sm text-muted transition-colors hover:text-accent"
                    >
                      Open in new tab <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Additional Research &amp; Engineering Projects
        </h3>
        <ul className="group/list -mx-5 flex flex-col gap-2">
          {more.map((p) => (
            <li key={p.title} className={`flex flex-col gap-3 ${listRow}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                  {p.label}
                </span>
                {p.badge && (
                  <span className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
                    {p.badge}
                  </span>
                )}
              </div>
              <h4 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{p.title}</h4>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p.desc}</p>
              <Stack stack={p.stack} />
              {p.github && (
                <div className="flex gap-5 text-sm">
                  <a
                    href={p.github}
                    {...external}
                    className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-accent"
                  >
                    <FaGithub size={14} aria-hidden="true" /> Source Code{" "}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
