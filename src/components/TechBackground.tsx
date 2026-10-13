"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Circuit traces laid over the page grid: each one runs along the 24px grid
 * in straight and 45° segments between two solder pads, a few carry a pulse
 * of light, and a few are tagged with their coordinates. A faint scan line
 * sweeps down the screen. The layout is seeded, so it is the same on every
 * visit, and it is redrawn to fit when the window changes size.
 */

const CELL = 24;
const DIRS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
] as const;

// The window size, rounded up to whole 96px grid tiles so small resizes
// don't redraw everything.
const subscribe = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};
const getSize = () => `${Math.ceil(window.innerWidth / 96) * 96}x${Math.ceil(window.innerHeight / 96) * 96}`;
const getServerSize = () => null;

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Trace = {
  d: string;
  start: [number, number];
  end: [number, number];
  pulse: { duration: number; delay: number } | null;
  label: string | null;
};

function layout(width: number, height: number): Trace[] {
  const rand = mulberry32(4123);
  const cols = width / CELL;
  const rows = height / CELL;
  const clamp = (v: number, max: number) => Math.min(max - 1, Math.max(1, v));
  const count = Math.round((width * height) / 52000);

  return Array.from({ length: count }, (_, i) => {
    let x = Math.floor(rand() * cols);
    let y = Math.floor(rand() * rows);
    let dir = Math.floor(rand() * 4) * 2; // start straight, then bend by 45°
    const points: [number, number][] = [[x, y]];
    const segments = 2 + Math.floor(rand() * 3);
    for (let s = 0; s < segments; s++) {
      const length = 2 + Math.floor(rand() * 5);
      x = clamp(x + DIRS[dir][0] * length, cols);
      y = clamp(y + DIRS[dir][1] * length, rows);
      points.push([x, y]);
      dir = (dir + (rand() < 0.5 ? 1 : 7)) % 8;
    }
    const px = points.map(([gx, gy]) => [gx * CELL, gy * CELL] as [number, number]);
    const end = px[px.length - 1];
    return {
      d: "M" + px.map(([a, b]) => `${a} ${b}`).join(" L "),
      start: px[0],
      end,
      pulse: rand() < 0.45 ? { duration: 5 + rand() * 5, delay: -rand() * 10 } : null,
      label: i % 5 === 0 ? `x ${String(end[0]).padStart(4, "0")} · y ${String(end[1]).padStart(4, "0")}` : null,
    };
  });
}

export default function TechBackground() {
  const size = useSyncExternalStore(subscribe, getSize, getServerSize);
  const traces = useMemo(() => {
    if (!size) return [];
    const [w, h] = size.split("x").map(Number);
    return layout(w, h);
  }, [size]);

  return (
    <div aria-hidden="true" className="tech-layer">
      {size && (
        <svg width={size.split("x")[0]} height={size.split("x")[1]} className="absolute left-0 top-0">
          {/* Half a pixel over, so 1px strokes land on the grid's 1px lines. */}
          <g transform="translate(0.5 0.5)">
          <g fill="none" stroke="rgba(39, 71, 216, 0.15)" strokeWidth="1">
            {traces.map((t) => (
              <path key={t.d} d={t.d} />
            ))}
          </g>
          {traces.map(
            (t) =>
              t.pulse && (
                <path
                  key={`pulse-${t.d}`}
                  d={t.d}
                  pathLength={100}
                  className="trace-pulse"
                  style={{ animationDuration: `${t.pulse.duration}s`, animationDelay: `${t.pulse.delay}s` }}
                />
              )
          )}
          {traces.map((t) => (
            <g key={`pads-${t.d}`}>
              <circle cx={t.start[0]} cy={t.start[1]} r="2" fill="rgba(39, 71, 216, 0.25)" />
              <circle cx={t.end[0]} cy={t.end[1]} r="3.5" fill="var(--color-bg)" stroke="rgba(39, 71, 216, 0.32)" />
              {t.label && (
                <text x={t.end[0] + 8} y={t.end[1] - 7} className="trace-label">
                  {t.label}
                </text>
              )}
            </g>
          ))}
          </g>
        </svg>
      )}
      <div className="scanline" />
    </div>
  );
}
