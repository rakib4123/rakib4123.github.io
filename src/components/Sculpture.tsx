"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

/**
 * An AI chip turning slowly on its board and leaning toward the cursor.
 *
 * A glossy package with gold pins on every side carries a brushed-metal lid
 * with a glowing "AI" core. Circuit traces fan out from the pins across the
 * board in straight and 45° runs, the same language as the page background,
 * and pulses of light travel out along them. A detection box frames the chip,
 * as a nod to computer vision. Hovering the chip makes the core glow brighter
 * and the pulses run faster.
 */

const TRACE_VERT = /* glsl */ `
attribute float aT;
attribute float aPhase;
varying float vT;
varying float vPhase;

void main() {
  vT = aT;
  vPhase = aPhase;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const TRACE_FRAG = /* glsl */ `
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uPulse;
varying float vT;
varying float vPhase;

void main() {
  // A short bright segment travels from the pin to the far pad.
  float head = fract(uTime * 0.3 + vPhase);
  float pulse = 1.0 - smoothstep(0.0, 0.07, abs(vT - head));
  float fade = 1.0 - 0.65 * smoothstep(0.55, 1.0, vT);
  gl_FragColor = vec4(mix(uBase, uPulse, pulse), (0.38 + pulse * 0.62) * fade);
  #include <colorspace_fragment>
}
`;

/** Half the width of the package, the pins per side, and the board height. */
const HALF = 1;
const PINS = 10;
const PIN_SPAN = 1.44;
const BOARD_Y = -0.03;

/** Traces leave about two pins in three and fan away from the middle. */
function fanOut(rand: () => number) {
  const positions: number[] = [];
  const along: number[] = [];
  const phase: number[] = [];
  const pads: THREE.Vector3[] = [];
  const sides = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  sides.forEach(([ox, oz]) => {
    const [ax, az] = [-oz, ox];
    for (let k = 0; k < PINS; k++) {
      if (rand() > 0.68) continue;
      const offset = -PIN_SPAN / 2 + (k * PIN_SPAN) / (PINS - 1);
      const spread = Math.sign(offset) || (rand() < 0.5 ? 1 : -1);
      const p = new THREE.Vector3(ox * (HALF + 0.16) + ax * offset, BOARD_Y, oz * (HALF + 0.16) + az * offset);
      const points = [p.clone()];
      const run = (dx: number, dz: number, length: number) => {
        p.addScaledVector(new THREE.Vector3(dx, 0, dz).normalize(), length);
        points.push(p.clone());
      };
      run(ox, oz, 0.12 + rand() * 0.3);
      run(ox + ax * spread, oz + az * spread, 0.15 + rand() * 0.45);
      run(ox, oz, 0.15 + rand() * 0.45);

      let total = 0;
      const reached = points.slice(1).map((q, i) => (total += q.distanceTo(points[i])));
      const ph = rand();
      points.slice(1).forEach((q, i) => {
        const from = points[i];
        positions.push(from.x, from.y, from.z, q.x, q.y, q.z);
        along.push((i === 0 ? 0 : reached[i - 1]) / total, reached[i] / total);
        phase.push(ph, ph);
      });
      pads.push(p.clone());
    }
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("aT", new THREE.Float32BufferAttribute(along, 1));
  geometry.setAttribute("aPhase", new THREE.Float32BufferAttribute(phase, 1));
  return { geometry, pads };
}

/** The lid marking: a glowing "AI" in a thin frame, over a small part name. */
function lidTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(39, 71, 216, 0.9)";
  ctx.shadowBlur = 26;
  ctx.strokeStyle = "#2747d8";
  ctx.lineWidth = 6;
  ctx.strokeRect(40, 40, size - 80, size - 80);
  ctx.fillStyle = "#2747d8";
  ctx.font = "700 230px ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
  ctx.fillText("AI", size / 2, 300);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(14, 18, 32, 0.6)";
  ctx.font = "600 30px ui-monospace, 'Cascadia Mono', Menlo, monospace";
  ctx.fillText("RH · NEURAL ENGINE", size / 2, 410);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** A small seeded generator, so the traces are the same on every visit. */
function seeded(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

/** How far the board leans toward the viewer, in radians. */
const TILT = 0.85;
const SPIN = 0.14; // radians per second
const GLOW_REST = 1;
const GLOW_STIRRED = 1.7;
/** The chip's on-screen radius, the traces' reach, and how much of the frame each may take. */
const RADIUS = 1.2;
const FILL = 0.95;
const REACH = 1.9;
const REACH_FILL = 0.98;

export default function Sculpture({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      // No WebGL: the sidebar reads fine without its sculpture.
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envMap = pmrem.fromScene(room, 0.04).texture;
    scene.environment = envMap;
    room.dispose();
    pmrem.dispose();

    const key = new THREE.DirectionalLight("#ffffff", 1.4);
    key.position.set(2, 5, 3);
    scene.add(key);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    const disposables: { dispose(): void }[] = [envMap];
    const keep = <T extends { dispose(): void }>(d: T) => {
      disposables.push(d);
      return d;
    };

    const pivot = new THREE.Group();
    const spin = new THREE.Group();
    pivot.add(spin);
    scene.add(pivot);

    // ---- the chip ------------------------------------------------------------
    const pkg = new THREE.Mesh(
      keep(new RoundedBoxGeometry(HALF * 2, 0.16, HALF * 2, 4, 0.05)),
      keep(
        new THREE.MeshPhysicalMaterial({
          color: "#0a0e1a",
          roughness: 0.45,
          metalness: 0.1,
          clearcoat: 0.6,
          clearcoatRoughness: 0.3,
        })
      )
    );
    const lid = new THREE.Mesh(
      keep(new RoundedBoxGeometry(1.3, 0.06, 1.3, 4, 0.02)),
      keep(new THREE.MeshPhysicalMaterial({ color: "#cfd5e1", metalness: 1, roughness: 0.3 }))
    );
    lid.position.y = 0.08 + 0.03;
    const labelMat = keep(new THREE.MeshBasicMaterial({ map: keep(lidTexture()), transparent: true, toneMapped: false }));
    const label = new THREE.Mesh(keep(new THREE.PlaneGeometry(1.2, 1.2)), labelMat);
    label.rotation.x = -Math.PI / 2;
    label.position.y = 0.08 + 0.06 + 0.002;
    const pinOne = new THREE.Mesh(
      keep(new THREE.CircleGeometry(0.05, 24)),
      keep(new THREE.MeshStandardMaterial({ color: "#2a3350", roughness: 0.6 }))
    );
    pinOne.rotation.x = -Math.PI / 2;
    pinOne.position.set(-0.8, 0.081, -0.8);

    // Gold pins along every side.
    const pins = new THREE.InstancedMesh(
      keep(new THREE.BoxGeometry(0.18, 0.035, 0.06)),
      keep(new THREE.MeshStandardMaterial({ color: "#d6a84e", metalness: 1, roughness: 0.3 })),
      PINS * 4
    );
    const m = new THREE.Matrix4();
    const shift = new THREE.Matrix4();
    for (let side = 0; side < 4; side++) {
      for (let k = 0; k < PINS; k++) {
        const offset = -PIN_SPAN / 2 + (k * PIN_SPAN) / (PINS - 1);
        m.makeRotationY((-side * Math.PI) / 2).multiply(shift.makeTranslation(HALF + 0.07, BOARD_Y, offset));
        pins.setMatrixAt(side * PINS + k, m);
      }
    }
    spin.add(pkg, lid, label, pinOne, pins);

    // ---- traces fanning out across the board ---------------------------------
    const { geometry: traceGeo, pads } = fanOut(seeded(4123));
    const traceMat = new THREE.ShaderMaterial({
      vertexShader: TRACE_VERT,
      fragmentShader: TRACE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uBase: { value: new THREE.Color("#2b3a6b") },
        uPulse: { value: new THREE.Color("#2747d8") },
      },
      transparent: true,
      depthWrite: false,
    });
    keep(traceGeo);
    keep(traceMat);
    spin.add(new THREE.LineSegments(traceGeo, traceMat));

    const padMesh = new THREE.InstancedMesh(
      keep(new THREE.CircleGeometry(0.035, 16)),
      keep(new THREE.MeshBasicMaterial({ color: "#2747d8", transparent: true, opacity: 0.5 })),
      pads.length
    );
    pads.forEach((p, i) => {
      m.makeRotationX(-Math.PI / 2).setPosition(p.x, p.y, p.z);
      padMesh.setMatrixAt(i, m);
    });
    spin.add(padMesh);

    const render = () => renderer.render(scene, camera);

    // ---- size: keep the chip filling the frame at any aspect ratio -----------
    const fit = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const halfH = Math.max(RADIUS / FILL, REACH / REACH_FILL / camera.aspect);
      camera.position.z = halfH / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.updateProjectionMatrix();
      // The detection box is sized in CSS from the chip's radius on screen.
      wrap.style.setProperty("--gem", `${(h * RADIUS) / (2 * halfH)}px`);
      if (reduceMotion) render();
    };
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(wrap);
    fit();

    const dispose = () => {
      resizeObserver.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };

    if (reduceMotion) {
      pivot.rotation.x = TILT;
      spin.rotation.y = 0.5;
      traceMat.uniforms.uTime.value = 0.4;
      render();
      return dispose;
    }

    // ---- cursor and hover ----------------------------------------------------
    const cursor = new THREE.Vector2();
    const cursorTarget = new THREE.Vector2();
    let glow = GLOW_REST;
    let glowTarget = GLOW_REST;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cursorTarget.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const stir = () => (glowTarget = GLOW_STIRRED);
    const settle = () => (glowTarget = GLOW_REST);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerenter", stir);
    wrap.addEventListener("pointerleave", settle);

    // ---- frame: only while the chip is on screen -----------------------------
    const clock = new THREE.Clock();
    let time = 0;
    let pulseTime = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.1);
      time += dt;
      glow += (glowTarget - glow) * (1 - Math.pow(0.05, dt));
      pulseTime += dt * glow * glow;
      traceMat.uniforms.uTime.value = pulseTime;
      // The core breathes, and burns brighter while hovered.
      labelMat.color.setScalar(glow * (0.92 + 0.08 * Math.sin(time * 2.2)));
      spin.rotation.y += SPIN * dt;
      cursor.lerp(cursorTarget, 1 - Math.pow(0.03, dt));
      pivot.rotation.set(TILT + cursor.y * 0.25, cursor.x * 0.4, 0);
      pivot.position.y = Math.sin(time * 0.8) * 0.04;
      render();
    };
    const start = () => {
      if (running) return;
      running = true;
      clock.getDelta();
      tick();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    visibility.observe(wrap);

    return () => {
      stop();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerenter", stir);
      wrap.removeEventListener("pointerleave", settle);
      dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {/* A blue glow behind the chip, and a soft contact shadow under it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(39,71,216,0.22),rgba(39,71,216,0.06)_60%,transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4%] left-1/2 h-[8%] w-[44%] -translate-x-1/2 rounded-[50%] bg-ink/15 blur-xl"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      {/* A detection box around the chip, like an object detector's output. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(var(--gem,0px)*2.1)] w-[calc(var(--gem,0px)*2.3)] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="absolute left-0 top-0 h-3.5 w-3.5 border-l-[1.5px] border-t-[1.5px] border-accent" />
        <span className="absolute right-0 top-0 h-3.5 w-3.5 border-r-[1.5px] border-t-[1.5px] border-accent" />
        <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b-[1.5px] border-l-[1.5px] border-accent" />
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b-[1.5px] border-r-[1.5px] border-accent" />
        <span className="absolute -top-[7px] left-5 bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none tracking-[0.06em] text-accent-ink">
          ai_chip 0.99
        </span>
      </div>
    </div>
  );
}
