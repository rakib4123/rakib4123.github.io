"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/**
 * A pearl-glass sculpture that slowly reshapes itself and turns toward the
 * cursor.
 *
 * The shape is an icosphere pushed in and out along its radius by simplex
 * noise in the vertex shader. Normals are rebuilt there from two nearby
 * displaced points, so the lighting follows the surface as it moves. The gloss
 * is iridescent chrome reflecting a studio environment map, with a blue key
 * light for the accent. Hovering the sculpture stirs it up.
 */

const NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

uniform float uTime;
uniform float uAmp;

vec3 sculpt(vec3 p) {
  float n = snoise(p * 0.8 + vec3(0.0, uTime * 0.14, uTime * 0.09));
  return p * (1.0 + uAmp * n);
}
`;

/** Rebuilds the normal from two displaced neighbours on the sphere. */
const NORMAL = /* glsl */ `
float sculptR = length(position);
vec3 sculptN = position / sculptR;
vec3 sculptUp = abs(sculptN.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
vec3 sculptT = normalize(cross(sculptN, sculptUp));
vec3 sculptB = cross(sculptN, sculptT);
vec3 sculpted = sculpt(position);
vec3 sculptA = sculpt(normalize(position + sculptT * 0.01) * sculptR);
vec3 sculptC = sculpt(normalize(position + sculptB * 0.01) * sculptR);
vec3 objectNormal = normalize(cross(sculptA - sculpted, sculptC - sculpted));
`;

const AMP_REST = 0.26;
const AMP_STIRRED = 0.4;
/** Radius of the sculpture at its widest, and how much of the frame it fills. */
const RADIUS = 1.3;
const FILL = 0.9;

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
    const small = window.matchMedia("(max-width: 640px)").matches;
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

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);

    const key = new THREE.DirectionalLight("#ffffff", 1.6);
    key.position.set(3, 4, 5);
    const accent = new THREE.DirectionalLight("#2747d8", 4);
    accent.position.set(-4, -1.5, -2);
    scene.add(key, accent);

    const uniforms = { uTime: { value: 1.7 }, uAmp: { value: AMP_REST } };
    const geometry = new THREE.IcosahedronGeometry(1, small ? 28 : 48);
    const material = new THREE.MeshPhysicalMaterial({
      color: "#d9e0ff",
      roughness: 0.1,
      metalness: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      iridescence: 1,
      iridescenceIOR: 1.8,
      iridescenceThicknessRange: [260, 820],
      envMapIntensity: 1.2,
    });
    material.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", `#include <common>\n${NOISE}`)
        .replace("#include <beginnormal_vertex>", NORMAL)
        .replace("#include <begin_vertex>", "vec3 transformed = sculpted;");
    };

    const pivot = new THREE.Group();
    pivot.add(new THREE.Mesh(geometry, material));
    scene.add(pivot);

    const render = () => renderer.render(scene, camera);

    // ---- size: keep the sculpture filling the frame at any aspect ratio ----
    const fit = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const halfH = RADIUS / FILL / Math.min(1, camera.aspect);
      camera.position.z = halfH / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.updateProjectionMatrix();
      if (reduceMotion) render();
    };
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(wrap);
    fit();

    if (reduceMotion) {
      render();
      return () => {
        resizeObserver.disconnect();
        geometry.dispose();
        material.dispose();
        envMap.dispose();
        renderer.dispose();
      };
    }

    // ---- cursor and hover ----------------------------------------------------
    const cursor = new THREE.Vector2();
    const cursorTarget = new THREE.Vector2();
    let ampTarget = AMP_REST;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cursorTarget.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const stir = () => (ampTarget = AMP_STIRRED);
    const settle = () => (ampTarget = AMP_REST);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerenter", stir);
    wrap.addEventListener("pointerleave", settle);

    // ---- frame: only while the sculpture is on screen -----------------------
    const clock = new THREE.Clock();
    let time = uniforms.uTime.value;
    let frame = 0;
    let running = false;

    const tick = () => {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.1);
      time += dt;
      uniforms.uTime.value = time;
      uniforms.uAmp.value += (ampTarget - uniforms.uAmp.value) * (1 - Math.pow(0.05, dt));
      cursor.lerp(cursorTarget, 1 - Math.pow(0.03, dt));
      pivot.rotation.set(cursor.y * 0.35, time * 0.12 + cursor.x * 0.6, 0);
      pivot.position.y = Math.sin(time * 0.8) * 0.05;
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
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerenter", stir);
      wrap.removeEventListener("pointerleave", settle);
      geometry.dispose();
      material.dispose();
      envMap.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {/* A blue glow behind the sculpture, and a soft contact shadow under it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(39,71,216,0.22),rgba(39,71,216,0.06)_60%,transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4%] left-1/2 h-[8%] w-[44%] -translate-x-1/2 rounded-[50%] bg-ink/15 blur-xl"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
    </div>
  );
}
