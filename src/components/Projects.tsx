import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SectionHeading } from "./SectionHeading";
import Reveal from "./Reveal";

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
    label: "Full-stack · Recommendation engine",
    live: true,
    desc: "An e-commerce platform with Apriori association-rule mining written from scratch, powering “frequently bought together” from real order history. 17 backend modules, voice search, and Bengali and English localisation.",
    stack: "Next.js 15 / NestJS 11 / PostgreSQL / Prisma",
    demo: "https://drikon-web-vert1v.vercel.app/",
    github: "https://github.com/rakib4123/drikon",
  },
  {
    title: "DhakaNight",
    label: "Vision · Dataset & benchmark · ICCA 2026",
    desc: "A 2,300-image night-traffic dataset for Dhaka. I benchmarked CLAHE, Gamma, Zero-DCE and RetinexFormer against a YOLOv8 baseline: none improved detection, and scaling the detector beat every enhancement pipeline.",
    stack: "PyTorch / YOLO / OpenCV / Roboflow",
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
    desc: "A Windows desktop portal with role-based dashboards, course pre-registration, assignment uploads and grade viewing.",
    stack: "C# / .NET / WinForms / SQL Server",
    github: "https://github.com/rakib4123/AiubSteam",
  },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function Projects() {
  return (
    <section id="work" className="mx-auto flex max-w-[1200px] flex-col gap-14 px-5 pb-10 pt-28 sm:px-8 lg:px-12">
      <SectionHeading
        tag="01 — Selected work"
        title="Deployed models, honest benchmarks, and the products around them."
      />

      {featured.map((p, idx) => (
        <Reveal key={p.title}>
          <article className="feature grid items-center gap-12 overflow-hidden rounded-[20px] border border-line bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
            <div className={`flex min-w-0 flex-col gap-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{p.label}</span>
              <h3 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.03em]">{p.title}</h3>
              <p className="text-[17px] font-light text-ink-soft">{p.desc}</p>
              <dl className="grid grid-cols-3 border-y border-line">
                {p.metrics.map((m, i) => (
                  <div
                    key={m.label}
                    className={`flex flex-col-reverse gap-0.5 py-4 ${i > 0 ? "border-l border-line pl-4" : "pr-4"}`}
                  >
                    <dt className="text-[13px] text-muted">{m.label}</dt>
                    <dd className="text-lg font-semibold sm:text-[22px]">{m.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="font-mono text-[13px] text-muted">{p.stack}</p>
              <div className="flex flex-wrap gap-3">
                {p.demo && (
                  <a
                    href={p.demo}
                    {...external}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink transition-[filter] hover:brightness-110"
                  >
                    Live demo <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
                <a
                  href={p.github}
                  {...external}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-accent"
                >
                  <FaGithub size={15} aria-hidden="true" /> Source
                </a>
              </div>
            </div>

            <div className={`flex min-w-0 justify-center py-4 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              {p.phone ? (
                <div className="float">
                  <div className="device w-[220px] rounded-[36px] border border-line-strong bg-surface-2 p-2.5 shadow-[0_40px_80px_rgba(0,0,0,0.55)] sm:w-[260px]">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      className="block h-auto w-full rounded-[28px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="device-r w-[260px] overflow-hidden rounded-2xl border border-line-strong shadow-[0_40px_80px_rgba(0,0,0,0.55)] sm:w-[300px]">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    width={p.image.width}
                    height={p.image.height}
                    className="block h-[340px] w-full object-cover sm:h-[400px]"
                  />
                </div>
              )}
            </div>
          </article>
        </Reveal>
      ))}

      <div className="grid gap-5 md:grid-cols-2">
        {more.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.08} className="flex">
            <article className="tilt flex w-full flex-col gap-3.5 rounded-2xl border border-line bg-surface p-8">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{p.label}</span>
                {p.live && (
                  <span className="rounded-full border border-accent-line px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
                    Live
                  </span>
                )}
              </div>
              <h3 className="text-[26px] font-semibold tracking-[-0.02em]">{p.title}</h3>
              <p className="text-[15px] font-light text-ink-soft">{p.desc}</p>
              <p className="font-mono text-xs text-muted">{p.stack}</p>
              {(p.demo || p.github) && (
                <div className="mt-auto flex gap-5 pt-2 text-sm">
                  {p.demo && (
                    <a href={p.demo} {...external} className="inline-flex min-h-11 items-center gap-1.5 hover:text-accent">
                      Live demo <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} {...external} className="inline-flex min-h-11 items-center text-ink-soft hover:text-accent">
                      Source
                    </a>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
