import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { listRow } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import Reveal from "./Reveal";
import { DemoButton, PhoneGallery } from "./ProjectMedia";

const featured = [
  {
    title: "RideGuard",
    label: "Featured · ML risk service · IEEE COMPAS 2026",
    desc: "A live web app that scores motorcycle route risk in Dhaka, with a colour-coded risk map and real-time warnings for phone handling, speeding and accident hotspots. Each prediction carries calibrated confidence and SHAP explanations. Its self-audit traced the headline score to target leakage, and I published that as the central finding.",
    metrics: [
      { value: "0.973", label: "Macro-F1" },
      { value: "Conformal", label: "Calibrated confidence" },
      { value: "SHAP", label: "Per-prediction reasons" },
    ],
    stack: "Python / CatBoost / scikit-learn / SHAP",
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
    title: "PulseStone",
    label: "Embedded · Controlled user study · ICCA 2026",
    desc: "A pocket device that starts a calming breathing exercise with one squeeze, guiding the user with light, vibration and screen cues. I designed and analysed a controlled 15-participant, 150-trial study.",
    metrics: [
      { value: "14.5×", label: "Faster than a phone app" },
      { value: "0.52 s", label: "Time to start" },
      { value: "15 / 15", label: "Preferred it" },
    ],
    stack: "ESP32-C3 / Arduino C++ / Python",
    github: "https://github.com/rakib4123/PulseStone",
    image: { src: "/images/project-pulsestone.jpg", alt: "PulseStone handheld device", width: 1200, height: 1593 },
    phone: false,
  },
];

const more = [
  {
    title: "Drikon",
    label: "Full-stack · E-commerce with a recommendation engine",
    flagship: true,
    desc: "Implemented the Apriori association-rule algorithm from scratch — level-wise itemset mining with candidate pruning, scored by support, confidence and lift — to power “frequently bought together” and personalised recommendations from real order history. Built 17 backend modules (products, orders, reviews, coupons, flash sales, wishlists, banners, settings) with voice search, filtering, comparison and secure accounts, localised in Bengali and English, with branding, theme and homepage content editable from the admin panel without a redeploy.",
    stack: "Next.js 15 / React 19 / NestJS 11 / PostgreSQL / Prisma",
    demo: "https://drikon-web-vert1v.vercel.app/",
    github: "https://github.com/rakib4123/drikon",
  },
  {
    title: "DhakaNight",
    label: "Vision · Dataset & benchmark · ICCA 2026",
    desc: "Detects vehicles and pedestrians on Dhaka streets after dark, where standard detectors fail. I curated and labelled a 2,300-image night dataset, then benchmarked CLAHE, Gamma, Zero-DCE and RetinexFormer against a YOLOv8 baseline under a controlled protocol — none improved detection, and scaling the detector beat every pipeline. Accepted at ICCA 2026 (first author).",
    stack: "Python / PyTorch / YOLO / OpenCV / Roboflow",
    github: "https://github.com/rakib4123/Dhaka_Night",
  },
  {
    title: "Carbon Market Simulation",
    label: "Forecasting · Agent-based modelling",
    desc: "Benchmarked Ridge, XGBoost, LightGBM and CatBoost on a 17-country CO₂ panel; CatBoost won at 10.95% test MAPE. The forecasts drive a Mesa model of 48 firms, where linking markets cut costs in 55–62% of 100 runs. Third author.",
    stack: "Python / CatBoost / Mesa / scikit-learn",
  },
  {
    title: "AIUB STEAM",
    label: "Desktop · University portal",
    desc: "A Windows desktop university portal with role-based dashboards, course pre-registration, assignment uploads and grade viewing.",
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
        Deployed ML services, benchmarks and forecasting, plus a live e-commerce platform and
        embedded hardware.
      </SectionHeading>

      <div className="flex flex-col gap-8">
        {featured.map((p) => (
          <Reveal key={p.title}>
            <article className="feature overflow-hidden rounded-3xl border border-line bg-surface transition-shadow duration-500 hover:shadow-[0_40px_80px_-40px_rgba(14,18,32,0.3)]">
              {/* The product sits on a stage above its story. */}
              <div className="flex justify-center border-b border-line bg-surface-2 bg-[radial-gradient(ellipse_at_top,var(--color-accent-line),transparent_70%)] px-6 py-10">
                {p.screens ? (
                  <PhoneGallery
                    title={p.title}
                    images={p.screens}
                    width={p.image.width}
                    height={p.image.height}
                  />
                ) : (
                  <div className="device overflow-hidden rounded-2xl border border-line-strong shadow-[0_40px_80px_-20px_rgba(14,18,32,0.3)]">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      className="block h-[320px] w-[240px] object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-5 p-6 sm:p-9">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{p.label}</span>
                <h3 className="font-display text-[44px] leading-none text-ink">{p.title}</h3>
                <p className="text-[16px] leading-relaxed text-ink-soft">{p.desc}</p>
                <dl className="grid grid-cols-3 border-y border-line">
                  {p.metrics.map((m, i) => (
                    <div
                      key={m.label}
                      className={`flex flex-col-reverse gap-0.5 py-4 ${i > 0 ? "border-l border-line pl-4" : "pr-4"}`}
                    >
                      <dt className="text-[13px] text-muted">{m.label}</dt>
                      <dd className="text-lg font-semibold tracking-[-0.02em] text-ink sm:text-[22px]">{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <Stack stack={p.stack} />
                <div className="flex flex-wrap gap-3 pt-1">
                  {p.demo && <DemoButton url={p.demo} title={p.title} />}
                  <a
                    href={p.github}
                    {...external}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-ink"
                  >
                    <FaGithub size={15} aria-hidden="true" /> Source
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">More projects</h3>
        <ul className="group/list -mx-5 flex flex-col gap-1">
          {more.map((p) => (
            <li key={p.title} className={`flex flex-col gap-3 ${listRow}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{p.label}</span>
                {p.flagship && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-accent-ink">
                    ★ Flagship · Live
                  </span>
                )}
              </div>
              <h4 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{p.title}</h4>
              <p className="text-[15px] leading-relaxed text-ink-soft">{p.desc}</p>
              <Stack stack={p.stack} />
              {(p.demo || p.github) && (
                <div className="flex gap-5 text-sm">
                  {p.demo && (
                    <a
                      href={p.demo}
                      {...external}
                      className="inline-flex min-h-11 items-center gap-1.5 font-medium text-ink hover:text-accent"
                    >
                      Live demo <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      {...external}
                      className="inline-flex min-h-11 items-center gap-1.5 text-ink-soft hover:text-accent"
                    >
                      <FaGithub size={14} aria-hidden="true" /> Source
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
