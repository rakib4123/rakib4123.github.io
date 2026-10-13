"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A faceted glass gem that turns slowly and follows the cursor.
 *
 * three.js's own transmission has nothing to refract on a transparent canvas,
 * so the gem carries its own surroundings: a small studio (a pale room like
 * the page, a ring of alternating white strips and dark flags, and two blue
 * panels) rendered once into a cube map. Each pixel's ray refracts into the
 * gem and is traced against its real facet planes, bouncing wherever total
 * internal reflection traps it, until it escapes and samples the studio. It
 * leaves with a slightly different index for red, green and blue, which is
 * what splits light into fire. Two thin orbit rings with travelling dots
 * circle it, and a detection box frames it, as a nod to computer vision.
 * Hovering the gem spins it faster.
 */

const VERT = /* glsl */ `
varying vec3 vNormal;
varying vec3 vWorld;

void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const FRAG = /* glsl */ `
uniform samplerCube uEnv;
uniform vec4 uPlanes[PLANES]; // world-space facet planes: outward normal, offset
uniform float uIor;
uniform float uSpread;
varying vec3 vNormal;
varying vec3 vWorld;

// Follows a ray inside the gem to the facet it reaches next, reflecting it
// back in while the facet traps it, and leaves p on the facet it escapes by.
void trace(inout vec3 p, inout vec3 d, out vec3 n) {
  for (int bounce = 0; bounce < 5; bounce++) {
    float nearest = 1e4;
    n = vec3(0.0, 1.0, 0.0);
    for (int i = 0; i < PLANES; i++) {
      float along = dot(uPlanes[i].xyz, d);
      if (along > 1e-4) {
        float t = (uPlanes[i].w - dot(uPlanes[i].xyz, p)) / along;
        if (t < nearest) {
          nearest = t;
          n = uPlanes[i].xyz;
        }
      }
    }
    p += d * nearest;
    vec3 out_ = refract(d, -n, uIor);
    if (bounce == 4 || dot(out_, out_) > 0.0) return;
    d = reflect(d, n);
  }
}

vec3 escape(vec3 d, vec3 n, float ior) {
  vec3 out_ = refract(d, -n, ior);
  return dot(out_, out_) > 0.0 ? out_ : reflect(d, n);
}

void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vWorld - cameraPosition);
  float f0 = pow((uIor - 1.0) / (uIor + 1.0), 2.0);
  float fresnel = f0 + (1.0 - f0) * pow(1.0 - clamp(dot(-v, n), 0.0, 1.0), 5.0);

  vec3 p = vWorld;
  vec3 d = refract(v, n, 1.0 / uIor);
  vec3 exitN;
  trace(p, d, exitN);

  vec3 fire = vec3(
    textureCube(uEnv, escape(d, exitN, uIor - uSpread)).r,
    textureCube(uEnv, escape(d, exitN, uIor)).g,
    textureCube(uEnv, escape(d, exitN, uIor + uSpread)).b
  );
  vec3 reflected = textureCube(uEnv, reflect(v, n)).rgb;

  gl_FragColor = vec4(mix(fire, reflected, fresnel), 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/**
 * A round brilliant: octagonal table, sixteen-sided girdle, pointed pavilion.
 * Returns the mesh geometry and each facet's plane, for the ray tracer.
 */
function brilliantCut() {
  const TABLE_R = 0.56;
  const TABLE_Y = 0.36;
  const PAVILION_Y = -0.98;
  const ring = (n: number, r: number, y: number, offset = 0) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((i + offset) / n) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    });

  const table = ring(8, TABLE_R, TABLE_Y);
  const girdle = ring(16, 1, 0);
  const top = new THREE.Vector3(0, TABLE_Y, 0);
  const apex = new THREE.Vector3(0, PAVILION_Y, 0);

  const tris: THREE.Vector3[][] = [];
  for (let i = 0; i < 8; i++) {
    const t0 = table[i];
    const t1 = table[(i + 1) % 8];
    const g0 = girdle[2 * i];
    const g1 = girdle[2 * i + 1];
    const g2 = girdle[(2 * i + 2) % 16];
    tris.push([top, t0, t1], [t0, g0, g1], [t0, g1, t1], [t1, g1, g2]);
  }
  for (let i = 0; i < 16; i++) tris.push([girdle[i], apex, girdle[(i + 1) % 16]]);

  // The cut is convex, so a face whose normal points back toward the middle
  // is wound the wrong way round.
  const centre = new THREE.Vector3(0, (TABLE_Y + PAVILION_Y) / 2, 0);
  const positions: number[] = [];
  const planes: THREE.Plane[] = [];
  for (const tri of tris) {
    const [a, b, c] = tri.map((v) => v.clone().sub(centre));
    const normal = new THREE.Vector3().subVectors(b, a).cross(new THREE.Vector3().subVectors(c, a));
    const mid = new THREE.Vector3().add(a).add(b).add(c);
    const [p, q, r] = normal.dot(mid) < 0 ? [a, c, b] : [a, b, c];
    positions.push(p.x, p.y, p.z, q.x, q.y, q.z, r.x, r.y, r.z);
    planes.push(new THREE.Plane().setFromCoplanarPoints(p, q, r));
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals(); // unshared vertices, so every facet is flat
  return { geometry, planes };
}

/** The studio the gem reflects and refracts, rendered once into a cube map. */
function studio(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene();
  const disposables: { dispose(): void }[] = [];

  const dome = new THREE.SphereGeometry(10, 48, 24);
  const low = new THREE.Color("#c3cbdd");
  const high = new THREE.Color("#ffffff");
  const colors: number[] = [];
  const pos = dome.getAttribute("position");
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.smoothstep(pos.getY(i) / 10, -0.25, 0.5);
    const c = low.clone().lerp(high, t);
    colors.push(c.r, c.g, c.b);
  }
  dome.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  const domeMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide });
  scene.add(new THREE.Mesh(dome, domeMat));
  disposables.push(dome, domeMat);

  const panel = (w: number, h: number, at: [number, number, number], color: string, power: number) => {
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(power), side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...at);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
    disposables.push(geo, mat);
  };
  // A pale room like the page, so the gem reads as clear glass. Dark flags
  // between bright strips draw the crisp lines that define each facet.
  panel(6, 6, [0, 8.5, 0], "#ffffff", 3);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const dark = i % 2 === 1;
    panel(dark ? 1.4 : 0.9, 6, [Math.cos(a) * 8, (i % 3) * 1.4 - 0.5, Math.sin(a) * 8], dark ? "#0e1220" : "#ffffff", dark ? 1 : 4);
  }
  panel(4, 3, [-4, -3, 6], "#2747d8", 3);
  panel(5, 2.5, [3, -3.5, -6], "#2747d8", 3);

  const target = new THREE.WebGLCubeRenderTarget(512, { type: THREE.HalfFloatType });
  new THREE.CubeCamera(0.1, 50, target).update(renderer, scene);
  disposables.forEach((d) => d.dispose());
  return target;
}

/** How far the table leans toward the viewer, in radians. */
const TILT = 0.55;
const SPIN_REST = 0.22; // radians per second
const SPIN_STIRRED = 0.9;
/** Radius of the gem at its widest, and how much of the frame it fills. */
const RADIUS = 1.05;
const FILL = 0.95;
/** The orbit rings, and how much of the frame's width they may take. */
const RINGS = [1.4, 1.58];
const RING_FILL = 0.97;

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
    renderer.toneMappingExposure = 1.1;

    const envTarget = studio(renderer);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);

    const { geometry, planes } = brilliantCut();
    const worldPlanes = planes.map(() => new THREE.Vector4());
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      defines: { PLANES: planes.length },
      uniforms: {
        uEnv: { value: envTarget.texture },
        uPlanes: { value: worldPlanes },
        uIor: { value: 2.0 },
        uSpread: { value: 0.06 },
      },
    });
    // Faint ink lines along the facet edges keep the cut crisp.
    const edges = new THREE.EdgesGeometry(geometry, 1);
    const edgeMat = new THREE.LineBasicMaterial({ color: "#0e1220", transparent: true, opacity: 0.16 });

    const pivot = new THREE.Group();
    const spin = new THREE.Group();
    const gem = new THREE.Mesh(geometry, material);
    spin.add(gem, new THREE.LineSegments(edges, edgeMat));
    pivot.add(spin);
    scene.add(pivot);

    // Thin orbit rings: a solid blue one level with the girdle and a dashed
    // ink one on a tilt, each with a dot running round it.
    const orbits = RINGS.map((radius, i) => {
      const points = Array.from({ length: 129 }, (_, k) => {
        const a = (k / 128) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius);
      });
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat =
        i === 0
          ? new THREE.LineBasicMaterial({ color: "#2747d8", transparent: true, opacity: 0.45 })
          : new THREE.LineDashedMaterial({ color: "#0e1220", transparent: true, opacity: 0.28, dashSize: 0.06, gapSize: 0.05 });
      const line = new THREE.Line(geo, mat);
      line.computeLineDistances();
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 8), new THREE.MeshBasicMaterial({ color: "#2747d8" }));
      const ring = new THREE.Group();
      ring.add(line, dot);
      ring.rotation.set(i === 0 ? 0 : 0.42, 0, i === 0 ? 0 : -0.3);
      pivot.add(ring);
      return { ring, dot, radius, line };
    });
    const placeDots = (t: number) =>
      orbits.forEach(({ dot, radius }, i) => {
        const a = t * (i === 0 ? 0.5 : -0.35) + i * 2.1;
        dot.position.set(Math.cos(a) * radius, 0, Math.sin(a) * radius);
      });
    placeDots(0);

    // The tracer works in world space, so the facet planes follow the gem.
    const plane = new THREE.Plane();
    const render = () => {
      scene.updateMatrixWorld();
      planes.forEach((local, i) => {
        plane.copy(local).applyMatrix4(gem.matrixWorld);
        worldPlanes[i].set(plane.normal.x, plane.normal.y, plane.normal.z, -plane.constant);
      });
      renderer.render(scene, camera);
    };

    // ---- size: keep the gem filling the frame at any aspect ratio ------------
    const fit = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const halfH = Math.max(RADIUS / FILL, RINGS[1] / RING_FILL / camera.aspect);
      camera.position.z = halfH / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.updateProjectionMatrix();
      // The detection box is sized in CSS from the gem's radius on screen.
      wrap.style.setProperty("--gem", `${(h * RADIUS) / (2 * halfH)}px`);
      if (reduceMotion) render();
    };
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(wrap);
    fit();

    const dispose = () => {
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      edges.dispose();
      edgeMat.dispose();
      orbits.forEach(({ line, dot }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
        dot.geometry.dispose();
        (dot.material as THREE.Material).dispose();
      });
      envTarget.dispose();
      renderer.dispose();
    };

    if (reduceMotion) {
      pivot.rotation.x = TILT;
      spin.rotation.y = 0.3;
      render();
      return dispose;
    }

    // ---- cursor and hover ----------------------------------------------------
    const cursor = new THREE.Vector2();
    const cursorTarget = new THREE.Vector2();
    let spinSpeed = SPIN_REST;
    let spinTarget = SPIN_REST;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cursorTarget.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    const stir = () => (spinTarget = SPIN_STIRRED);
    const settle = () => (spinTarget = SPIN_REST);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    wrap.addEventListener("pointerenter", stir);
    wrap.addEventListener("pointerleave", settle);

    // ---- frame: only while the gem is on screen ------------------------------
    const clock = new THREE.Clock();
    let time = 0;
    let frame = 0;
    let running = false;

    const tick = () => {
      if (!running) return;
      frame = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.1);
      time += dt;
      spinSpeed += (spinTarget - spinSpeed) * (1 - Math.pow(0.1, dt));
      spin.rotation.y += spinSpeed * dt;
      placeDots(time);
      cursor.lerp(cursorTarget, 1 - Math.pow(0.03, dt));
      pivot.rotation.set(TILT + cursor.y * 0.3, cursor.x * 0.5, Math.sin(time * 0.5) * 0.06);
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
      {/* A blue glow behind the gem, and a soft contact shadow under it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(39,71,216,0.22),rgba(39,71,216,0.06)_60%,transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4%] left-1/2 h-[8%] w-[44%] -translate-x-1/2 rounded-[50%] bg-ink/15 blur-xl"
      />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      {/* A detection box around the gem, like an object detector's output. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[calc(var(--gem,0px)*1.9)] w-[calc(var(--gem,0px)*2.2)] -translate-x-1/2 -translate-y-1/2"
      >
        <span className="absolute left-0 top-0 h-3.5 w-3.5 border-l-[1.5px] border-t-[1.5px] border-accent" />
        <span className="absolute right-0 top-0 h-3.5 w-3.5 border-r-[1.5px] border-t-[1.5px] border-accent" />
        <span className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b-[1.5px] border-l-[1.5px] border-accent" />
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b-[1.5px] border-r-[1.5px] border-accent" />
        <span className="absolute -top-[22px] left-0 bg-accent px-1.5 py-0.5 font-mono text-[10px] leading-none tracking-[0.06em] text-accent-ink">
          diamond 0.98
        </span>
      </div>
    </div>
  );
}
