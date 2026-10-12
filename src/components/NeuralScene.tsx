"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A four-layer neural network floating behind the whole page.
 *
 * The network itself never changes. Scrolling moves it between four poses,
 * one per part of the page:
 *
 *   hero      -> full network, tilted, in the right-hand column
 *   work      -> swung round and pulled in on the hidden layers, dimmed
 *   research  -> seen from above, flattened into a diagram, dimmed further
 *   contact   -> settled behind the frosted contact card
 *
 * Signals travel forward along a quarter of the connections, and a few
 * hidden and all output neurons pulse as they "fire". The cursor tilts the
 * whole network a little. The canvas never takes pointer input.
 */

const ACCENT = new THREE.Color("#5ce1e6");
const INK = new THREE.Color("#edeff3");
const HOLLOW = new THREE.Color("#c4c9d2");

/** Layers along x; each layer's neurons sit on a ring in the y-z plane. */
const LAYERS = [
  { n: 6, r: 1.18, x: -2.35 },
  { n: 9, r: 1.68, x: -0.8 },
  { n: 9, r: 1.68, x: 0.8 },
  { n: 4, r: 0.84, x: 2.35 },
];
/** World-space size of the network, for fitting it to the viewport. */
const NET_W = 5.2;
const NET_H = 3.6;

const SPIN_PERIOD = 34; // seconds per full turn
const FOV = 40;
const CAMERA_Z = 11;

type Pose = { rx: number; ry: number; scale: number; sx: number; sy: number; opacity: number };

/** One pose per anchor section, for wide (two-column hero) layouts... */
const WIDE: Pose[] = [
  { rx: -0.24, ry: 0, scale: 1, sx: 0.24, sy: 0, opacity: 1 },
  { rx: -0.07, ry: -1.05, scale: 1.35, sx: 0.2, sy: 0, opacity: 0.4 },
  { rx: -1.36, ry: -1.05, scale: 0.95, sx: 0.05, sy: 0, opacity: 0.22 },
  { rx: -0.24, ry: -0.5, scale: 0.9, sx: 0.12, sy: 0, opacity: 0.7 },
];
/** ...and for narrow ones, where the hero keeps the network above the copy. */
const NARROW: Pose[] = [
  { rx: -0.24, ry: 0, scale: 1, sx: 0, sy: 0.24, opacity: 1 },
  { rx: -0.07, ry: -1.05, scale: 1.2, sx: 0, sy: 0, opacity: 0.25 },
  { rx: -1.36, ry: -1.05, scale: 1, sx: 0, sy: 0, opacity: 0.16 },
  { rx: -0.24, ry: -0.5, scale: 0.8, sx: 0, sy: 0.3, opacity: 0.5 },
];
const ANCHORS = ["top", "work", "research", "contact"];

const WIDE_MIN_WIDTH = 1024;

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function mixPose(a: Pose, b: Pose, t: number): Pose {
  return {
    rx: a.rx + (b.rx - a.rx) * t,
    ry: a.ry + (b.ry - a.ry) * t,
    scale: a.scale + (b.scale - a.scale) * t,
    sx: a.sx + (b.sx - a.sx) * t,
    sy: a.sy + (b.sy - a.sy) * t,
    opacity: a.opacity + (b.opacity - a.opacity) * t,
  };
}

const NODE_VERT = `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
attribute float aKind;
attribute float aFire;
attribute float aPhase;
varying float vKind;
varying float vGlow;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  float glow = aFire * (0.5 + 0.5 * sin(uTime * 2.2 + aPhase));
  float base = aKind > 1.5 ? 1.4 : 1.0;
  vKind = aKind;
  vGlow = glow;
  gl_PointSize = uSize * base * (1.0 + glow * 1.6) * uPixelRatio * (${CAMERA_Z.toFixed(1)} / -mv.z);
}
`;

const NODE_FRAG = `
uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uHollow;
uniform float uOpacity;
varying float vKind;
varying float vGlow;

void main() {
  float d = length(gl_PointCoord - 0.5);
  // The point grows to make room for the halo, so the core shrinks with it.
  float coreR = 0.5 / (1.0 + vGlow * 1.6);
  float core = 1.0 - smoothstep(coreR * 0.8, coreR, d);
  vec3 col = vKind > 1.5 ? uAccent : uInk;
  if (vKind < 0.5) {
    // Inputs are drawn as rings.
    core *= smoothstep(coreR * 0.5, coreR * 0.64, d);
    col = uHollow;
  }
  float halo = vGlow * (1.0 - smoothstep(0.0, 0.5, d)) * 0.55;
  float a = max(core, halo);
  if (a < 0.01) discard;
  gl_FragColor = vec4(mix(uAccent, col, core), a * uOpacity);
}
`;

const LINK_VERT = `
attribute float aT;
attribute float aPhase;
attribute float aPulse;
varying float vT;
varying float vPhase;
varying float vPulse;

void main() {
  vT = aT;
  vPhase = aPhase;
  vPulse = aPulse;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const LINK_FRAG = `
uniform float uTime;
uniform float uOpacity;
uniform vec3 uInk;
uniform vec3 uAccent;
varying float vT;
varying float vPhase;
varying float vPulse;

void main() {
  // A short bright segment travels from the earlier layer to the later one.
  float head = fract(uTime * 0.3 + vPhase);
  float p = vPulse * (1.0 - smoothstep(0.0, 0.12, abs(vT - head)));
  gl_FragColor = vec4(mix(uInk, uAccent, p), (0.13 + p * 0.85) * uOpacity);
}
`;

function buildNetwork() {
  const layers = LAYERS.map((L, li) =>
    Array.from({ length: L.n }, (_, i) => {
      const t = (i / L.n) * Math.PI * 2 + li * 0.4;
      return new THREE.Vector3(L.x, Math.sin(t) * L.r * 0.9, Math.cos(t) * L.r);
    })
  );

  const nodePos: number[] = [];
  const kind: number[] = [];
  const fire: number[] = [];
  const nodePhase: number[] = [];
  layers.forEach((layer, li) =>
    layer.forEach((p, i) => {
      nodePos.push(p.x, p.y, p.z);
      kind.push(li === 0 ? 0 : li === LAYERS.length - 1 ? 2 : 1);
      const fires = (li === 1 && i % 3 === 0) || (li === 2 && i % 4 === 1) || li === 3;
      fire.push(fires ? 1 : 0);
      nodePhase.push(li * 1.6 + i * 1.1);
    })
  );

  // Each neuron connects to the nearest two or three in the next layer.
  const linkPos: number[] = [];
  const along: number[] = [];
  const linkPhase: number[] = [];
  const pulse: number[] = [];
  let k = 0;
  for (let li = 0; li < layers.length - 1; li++) {
    const A = layers[li];
    const B = layers[li + 1];
    A.forEach((a, i) => {
      const j0 = Math.round((i * B.length) / A.length) % B.length;
      const targets =
        li === layers.length - 2
          ? [j0, (j0 + 1) % B.length]
          : [j0, (j0 + 1) % B.length, (j0 + B.length - 1) % B.length];
      targets.forEach((j) => {
        const b = B[j];
        const phase = (k * 0.37) % 1;
        const pulses = k % 4 === 0 ? 1 : 0;
        linkPos.push(a.x, a.y, a.z, b.x, b.y, b.z);
        along.push(0, 1);
        linkPhase.push(phase, phase);
        pulse.push(pulses, pulses);
        k++;
      });
    });
  }

  const nodes = new THREE.BufferGeometry();
  nodes.setAttribute("position", new THREE.Float32BufferAttribute(nodePos, 3));
  nodes.setAttribute("aKind", new THREE.Float32BufferAttribute(kind, 1));
  nodes.setAttribute("aFire", new THREE.Float32BufferAttribute(fire, 1));
  nodes.setAttribute("aPhase", new THREE.Float32BufferAttribute(nodePhase, 1));

  const links = new THREE.BufferGeometry();
  links.setAttribute("position", new THREE.Float32BufferAttribute(linkPos, 3));
  links.setAttribute("aT", new THREE.Float32BufferAttribute(along, 1));
  links.setAttribute("aPhase", new THREE.Float32BufferAttribute(linkPhase, 1));
  links.setAttribute("aPulse", new THREE.Float32BufferAttribute(pulse, 1));

  return { nodes, links };
}

function ringGeometry(radius: number, segments = 128) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

export default function NeuralScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      // No WebGL: the page reads fine without its backdrop.
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, CAMERA_Z);

    // root: placement and size · tilt: pose + cursor · spin: constant rotation
    const root = new THREE.Group();
    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    root.add(tilt);
    tilt.add(spin);
    scene.add(root);

    const { nodes, links } = buildNetwork();

    const linkMat = new THREE.ShaderMaterial({
      vertexShader: LINK_VERT,
      fragmentShader: LINK_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1 },
        uInk: { value: INK },
        uAccent: { value: ACCENT },
      },
      transparent: true,
      depthWrite: false,
    });
    spin.add(new THREE.LineSegments(links, linkMat));

    const nodeMat = new THREE.ShaderMaterial({
      vertexShader: NODE_VERT,
      fragmentShader: NODE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 11 },
        uPixelRatio: { value: pixelRatio },
        uOpacity: { value: 1 },
        uInk: { value: INK },
        uAccent: { value: ACCENT },
        uHollow: { value: HOLLOW },
      },
      transparent: true,
      depthWrite: false,
    });
    const points = new THREE.Points(nodes, nodeMat);
    points.renderOrder = 1;
    spin.add(points);

    // Two orbit rings under the network give it a floor to sit on.
    const outerGeo = ringGeometry(2.35);
    const outerMat = new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0.07, depthWrite: false });
    const outer = new THREE.LineLoop(outerGeo, outerMat);
    outer.position.y = -2.15;
    spin.add(outer);

    const innerGeo = ringGeometry(1.75);
    const innerMat = new THREE.LineDashedMaterial({
      color: ACCENT,
      transparent: true,
      opacity: 0.22,
      dashSize: 0.08,
      gapSize: 0.08,
      depthWrite: false,
    });
    const inner = new THREE.LineLoop(innerGeo, innerMat);
    inner.computeLineDistances();
    inner.position.y = -2.15;
    spin.add(inner);

    // ---- scroll -> pose ----------------------------------------------------
    let poses = window.innerWidth >= WIDE_MIN_WIDTH ? WIDE : NARROW;
    let target = poses[0];
    const current = { ...target };

    const readTarget = () => {
      const focus = window.innerHeight * 0.6;
      const tops = ANCHORS.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top : Infinity;
      });
      // Hold each pose until the next anchor section climbs into view, then
      // blend into its pose over the last stretch before it reaches `focus`.
      let i = 0;
      while (i < tops.length - 1 && tops[i + 1] <= focus) i++;
      if (i === tops.length - 1) {
        target = poses[i];
        return;
      }
      const t = smoothstep(window.innerHeight, focus, tops[i + 1]);
      target = mixPose(poses[i], poses[i + 1], t);
    };

    // ---- cursor ------------------------------------------------------------
    const cursor = new THREE.Vector2();
    const cursorTarget = new THREE.Vector2();
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cursorTarget.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };

    // ---- frame ---------------------------------------------------------------
    const place = () => {
      const halfH = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
      const halfW = halfH * camera.aspect;
      const wide = poses === WIDE;
      // Fit the network into its column (wide) or the band above the copy.
      const fit = wide
        ? Math.min(1.1, (2 * halfW * 0.42) / NET_W, (2 * halfH * 0.6) / NET_H)
        : Math.min(1, (2 * halfW * 0.82) / NET_W, (2 * halfH * 0.34) / NET_H);

      root.position.set(current.sx * 2 * halfW, current.sy * 2 * halfH, 0);
      root.scale.setScalar(fit * current.scale);
      tilt.rotation.set(current.rx + cursor.y * 0.18, current.ry + cursor.x * 0.3, 0);

      nodeMat.uniforms.uSize.value = 11 * fit * current.scale;
      nodeMat.uniforms.uOpacity.value = current.opacity;
      linkMat.uniforms.uOpacity.value = current.opacity;
      outerMat.opacity = 0.07 * current.opacity;
      innerMat.opacity = 0.22 * current.opacity;

      renderer.render(scene, camera);
    };

    const onScroll = () => {
      readTarget();
      if (reduceMotion) {
        Object.assign(current, target);
        place();
      }
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      poses = window.innerWidth >= WIDE_MIN_WIDTH ? WIDE : NARROW;
      onScroll();
      // setSize clears the canvas, so a still scene has to be redrawn.
      if (reduceMotion) place();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    readTarget();
    Object.assign(current, target);

    let frame = 0;
    if (reduceMotion) {
      place();
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      const clock = new THREE.Clock();
      let time = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        const dt = Math.min(clock.getDelta(), 0.1);
        time += dt;
        spin.rotation.y += (dt * Math.PI * 2) / SPIN_PERIOD;
        nodeMat.uniforms.uTime.value = time;
        linkMat.uniforms.uTime.value = time;

        const ease = 1 - Math.pow(0.001, dt); // frame-rate independent smoothing
        current.rx += (target.rx - current.rx) * ease;
        current.ry += (target.ry - current.ry) * ease;
        current.scale += (target.scale - current.scale) * ease;
        current.sx += (target.sx - current.sx) * ease;
        current.sy += (target.sy - current.sy) * ease;
        current.opacity += (target.opacity - current.opacity) * ease;
        cursor.lerp(cursorTarget, 1 - Math.pow(0.02, dt));

        place();
      };
      tick();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      nodes.dispose();
      links.dispose();
      outerGeo.dispose();
      innerGeo.dispose();
      nodeMat.dispose();
      linkMat.dispose();
      outerMat.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
