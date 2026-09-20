"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Persistent full-screen WebGL scene behind the whole page: a cosmic timeline
 * driven by scroll.
 *
 *   hero        -> a spiral galaxy turning around a black hole with a glowing
 *                  accretion disk (brighter on the approaching side)
 *   projects    -> the camera falls into the core and the particles erupt
 *                  outward into a white-hole starfield tunnel
 *   about / end -> the particles settle into a wave matrix under a nebula
 *
 * All three formations live on the GPU as vertex attributes and are blended in
 * the vertex shader, so the per-frame CPU cost stays flat no matter the count.
 */

const COUNT_DESKTOP = 18000;
const COUNT_MOBILE = 6000;

/**
 * Where the galactic core sits in the hero so it never lands behind the copy:
 * out to the left on desktop, lifted above the photo on narrow screens.
 */
function heroOffset() {
  return window.innerWidth < 768 ? { x: 0, y: 3.75 } : { x: -3.8, y: 1.0 };
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

const WHITE_HOT = new THREE.Color("#fff3e0");
const GOLD = new THREE.Color("#f5b547");
const ORANGE = new THREE.Color("#f47c20");
const RED = new THREE.Color("#d7263d");

const PARTICLE_VERT = `
uniform float uTime;
uniform float uToTunnel;
uniform float uToGrid;
uniform float uSize;
uniform float uPixelRatio;
uniform vec2  uPointer;
uniform float uPointerOn;

attribute vec3  aTunnel;
attribute vec3  aGrid;
attribute vec3  aColor;
attribute float aSeed;
attribute float aKind;   // 0 = galaxy star, 1 = accretion disk

varying vec3  vColor;
varying float vAlpha;

vec3 rotY(vec3 p, float a) {
  float c = cos(a), s = sin(a);
  return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

void main() {
  // ---- formation 1: spiral galaxy, differential rotation (inner bands turn faster)
  float r = length(position.xz);
  float spin = uTime * (0.55 / (0.45 + r)) * mix(1.0, 4.2, aKind);
  vec3 gal = rotY(position, spin);
  gal.y += sin(uTime * 0.7 + aSeed * 24.0) * 0.05;

  // relativistic beaming: the side turning toward us reads much brighter
  float beam = 1.0;
  if (aKind > 0.5) {
    float ang = atan(gal.z, gal.x);
    beam = 0.30 + 1.45 * smoothstep(-1.0, 1.0, sin(ang));
  }

  // cursor gravity while the galaxy is on screen
  vec2 d = uPointer - gal.xy;
  float pull = uPointerOn * (1.0 - uToTunnel) * smoothstep(3.4, 0.0, length(d)) * 0.42;
  gal.xy += d * pull;

  // ---- formation 2: white-hole tunnel streaming past the camera
  vec3 tun = aTunnel;
  tun.z = mod(aTunnel.z + uTime * 11.0, 86.0) - 66.0;
  // mid-transition kick so the change reads as an eruption, not a slide
  float burst = sin(uToTunnel * 3.14159) * 2.2;
  tun.xy += normalize(aTunnel.xy + vec2(0.001)) * burst;

  // ---- formation 3: wave matrix
  vec3 grd = aGrid;
  grd.y += sin(aGrid.x * 0.38 + uTime * 1.25) * 0.8
         + cos(aGrid.z * 0.38 + uTime * 0.95) * 0.8;

  vec3 pos = mix(gal, tun, uToTunnel);
  pos = mix(pos, grd, uToGrid);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  float size = uSize * (0.55 + aSeed * 0.85) * mix(1.0, 1.5, aKind);
  gl_PointSize = size * uPixelRatio * (320.0 / max(0.6, -mv.z));

  vColor = aColor * beam;
  vAlpha = (0.70 + aSeed * 0.30) * (1.0 - uToGrid * 0.10);
}
`;

const PARTICLE_FRAG = `
varying vec3  vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

const HOLE_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/** Photon ring + asymmetric halo drawn additively over the black shadow disc. */
const HOLE_FRAG = `
uniform float uTime;
uniform float uOpacity;
varying vec2 vUv;

void main() {
  vec2 p = vUv - 0.5;
  float r = length(p) * 2.0;
  float ang = atan(p.y, p.x);

  float ring = exp(-pow((r - 0.355) / 0.018, 2.0));
  float inner = exp(-pow((r - 0.40) / 0.07, 2.0)) * 0.45;

  // Doppler-bright on one side, like a tilted accretion disk
  float beam = 0.35 + 0.65 * smoothstep(-1.0, 1.0, cos(ang - 0.35));
  float halo = exp(-pow((r - 0.52) / 0.30, 2.0)) * 0.30 * beam;
  float flicker = 0.92 + 0.08 * sin(uTime * 2.3 + ang * 3.0);

  vec3 col = vec3(1.0, 0.93, 0.80) * ring
           + vec3(1.0, 0.63, 0.22) * inner
           + vec3(0.92, 0.26, 0.12) * halo;

  float a = clamp(ring + inner + halo, 0.0, 1.0) * uOpacity * flicker;
  gl_FragColor = vec4(col, a);
}
`;

const NEBULA_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const NEBULA_FRAG = `
uniform float uTime;
uniform float uOpacity;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv * vec2(2.4, 1.4);
  float t = uTime * 0.035;
  float n = fbm(uv * 1.8 + vec2(t, -t * 0.6));
  float m = fbm(uv * 3.4 - vec2(t * 0.8, t));

  float cloud = smoothstep(0.42, 0.95, n * 0.75 + m * 0.35);
  vec3 col = mix(vec3(0.42, 0.06, 0.10), vec3(0.85, 0.34, 0.09), m);
  col = mix(col, vec3(0.96, 0.71, 0.28), pow(cloud, 3.0) * 0.8);

  // fade at the frame edges so it never looks like a pasted rectangle
  vec2 e = abs(vUv - 0.5) * 2.0;
  float vig = (1.0 - smoothstep(0.55, 1.0, e.x)) * (1.0 - smoothstep(0.45, 1.0, e.y));

  gl_FragColor = vec4(col, cloud * vig * uOpacity * 0.55);
}
`;

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );
    camera.position.set(0, 2.3, 9.6);
    scene.add(camera);

    // ---- particle formations ------------------------------------------------
    const galaxy = new Float32Array(count * 3);
    const tunnel = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const kinds = new Float32Array(count);

    const cols = Math.ceil(Math.sqrt(count));
    const ARMS = 3;
    const GALAXY_R = 7.4;
    const DISK_SHARE = 0.09; // fraction of particles that form the accretion disk
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      seeds[i] = Math.random();
      const isDisk = Math.random() < DISK_SHARE;
      kinds[i] = isDisk ? 1 : 0;

      if (isDisk) {
        // Thin, fast ring hugging the event horizon.
        const a = Math.random() * Math.PI * 2;
        const rr = 0.62 + Math.pow(Math.random(), 1.8) * 0.72;
        galaxy[i3] = Math.cos(a) * rr;
        galaxy[i3 + 1] = (Math.random() - 0.5) * 0.06;
        galaxy[i3 + 2] = Math.sin(a) * rr;
        c.copy(WHITE_HOT).lerp(ORANGE, Math.min(1, (rr - 0.62) / 0.72));
      } else {
        // Logarithmic spiral arms, denser toward the core.
        const rr = Math.pow(Math.random(), 0.62) * GALAXY_R;
        const branch = ((i % ARMS) / ARMS) * Math.PI * 2;
        const spin = rr * 0.66;
        const jitter = () =>
          Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * (0.22 + rr * 0.075);
        galaxy[i3] = Math.cos(branch + spin) * rr + jitter();
        galaxy[i3 + 1] = jitter() * 0.32;
        galaxy[i3 + 2] = Math.sin(branch + spin) * rr + jitter();

        const t = rr / GALAXY_R;
        if (t < 0.32) c.copy(WHITE_HOT).lerp(GOLD, t / 0.32);
        else if (t < 0.66) c.copy(GOLD).lerp(ORANGE, (t - 0.32) / 0.34);
        else c.copy(ORANGE).lerp(RED, (t - 0.66) / 0.34);
      }

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      // Tunnel: a cylindrical shell along the camera axis.
      const ta = Math.random() * Math.PI * 2;
      const tubeR = 2.4 + Math.pow(Math.random(), 0.7) * 9.0;
      tunnel[i3] = Math.cos(ta) * tubeR;
      tunnel[i3 + 1] = Math.sin(ta) * tubeR;
      tunnel[i3 + 2] = -66 + Math.random() * 86;

      // Grid: a flat matrix that later ripples.
      grid[i3] = ((i % cols) - cols / 2) * 0.34;
      grid[i3 + 1] = -2.2;
      grid[i3 + 2] = (Math.floor(i / cols) - cols / 2) * 0.34;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(galaxy, 3));
    geometry.setAttribute("aTunnel", new THREE.BufferAttribute(tunnel, 3));
    geometry.setAttribute("aGrid", new THREE.BufferAttribute(grid, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("aKind", new THREE.BufferAttribute(kinds, 1));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 120);

    const material = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uToTunnel: { value: 0 },
        uToGrid: { value: 0 },
        uSize: { value: isMobile ? 0.05 : 0.052 },
        uPixelRatio: { value: pixelRatio },
        uPointer: { value: new THREE.Vector2(-999, -999) },
        uPointerOn: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Everything cosmic rides in one group so the hero can hold the core off to
    // the side of the copy, then recentre it as the camera dives in.
    const world = new THREE.Group();
    scene.add(world);

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    world.add(points);

    // ---- black hole: opaque shadow disc + additive photon ring ---------------
    const shadowGeo = new THREE.CircleGeometry(0.55, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      depthWrite: true,
    });
    const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    shadowDisc.renderOrder = -1; // writes depth first so far-side stars are eaten
    world.add(shadowDisc);

    const ringGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const ringMat = new THREE.ShaderMaterial({
      vertexShader: HOLE_VERT,
      fragmentShader: HOLE_FRAG,
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 } },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const photonRing = new THREE.Mesh(ringGeo, ringMat);
    photonRing.renderOrder = 3;
    world.add(photonRing);

    // ---- nebula: full-frame cloud parented to the camera --------------------
    const nebulaGeo = new THREE.PlaneGeometry(1, 1);
    const nebulaMat = new THREE.ShaderMaterial({
      vertexShader: NEBULA_VERT,
      fragmentShader: NEBULA_FRAG.replace("OCTAVES", isMobile ? "2" : "4"),
      uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.z = -46;
    nebula.renderOrder = -2;
    nebula.visible = false;
    camera.add(nebula);

    const fitNebula = () => {
      const h = 2 * Math.tan((camera.fov * Math.PI) / 360) * 46;
      nebula.scale.set(h * camera.aspect * 1.1, h * 1.1, 1);
    };
    fitNebula();

    // ---- interaction --------------------------------------------------------
    let hero = heroOffset();
    const pointer = new THREE.Vector2(-999, -999);
    const parallax = new THREE.Vector2(0, 0);
    const parallaxTarget = new THREE.Vector2(0, 0);
    let dragging = false;
    let dragX = 0;
    let dragY = 0;
    let orbitX = 0;
    let orbitY = 0;
    let orbitTargetX = 0;
    let orbitTargetY = 0;
    let scrollProgress = 0;

    const onPointerMove = (e: PointerEvent) => {
      const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;
      const fovH = 2 * Math.tan((camera.fov * Math.PI) / 360) * Math.abs(camera.position.z);
      pointer.set((ndcX * fovH * camera.aspect) / 2, (ndcY * fovH) / 2);
      parallaxTarget.set(ndcX, ndcY);
      material.uniforms.uPointerOn.value = 1;

      if (dragging) {
        orbitTargetY += (e.clientX - dragX) * 0.005;
        orbitTargetX += (e.clientY - dragY) * 0.005;
        orbitTargetX = Math.max(-0.8, Math.min(0.8, orbitTargetX));
        dragX = e.clientX;
        dragY = e.clientY;
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragX = e.clientX;
      dragY = e.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    const onPointerLeave = () => {
      material.uniforms.uPointerOn.value = 0;
      parallaxTarget.set(0, 0);
      dragging = false;
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = max > 0 ? window.scrollY / max : 0;
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      hero = heroOffset();
      fitNebula();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    // ---- frame loop ---------------------------------------------------------
    let frame = 0;
    let time = 0;
    let smoothed = scrollProgress;
    const lookAt = new THREE.Vector3();

    const render = () => {
      const toTunnel = smoothstep(0.1, 0.44, smoothed);
      const toGrid = smoothstep(0.56, 0.86, smoothed);

      material.uniforms.uTime.value = time;
      material.uniforms.uToTunnel.value = toTunnel;
      material.uniforms.uToGrid.value = toGrid;
      material.uniforms.uPointer.value.set(
        pointer.x - world.position.x,
        pointer.y - world.position.y
      );
      material.uniforms.uSize.value =
        (isMobile ? 0.05 : 0.052) * (1 + toTunnel * 0.45 - toGrid * 0.1);

      ringMat.uniforms.uTime.value = time;
      nebulaMat.uniforms.uTime.value = time;

      // The black hole belongs to the hero; it is left behind on the way in.
      const holeFade = 1 - smoothstep(0.06, 0.3, smoothed);
      photonRing.visible = holeFade > 0.01;
      shadowDisc.visible = holeFade > 0.01;
      ringMat.uniforms.uOpacity.value = holeFade;
      shadowMat.opacity = holeFade;
      const holeScale = 1 + toTunnel * 2.5;
      shadowDisc.scale.setScalar(holeScale);
      photonRing.scale.setScalar(holeScale);

      nebulaMat.uniforms.uOpacity.value = toGrid;
      nebula.visible = toGrid > 0.01;

      // Camera: orbiting the galaxy -> down the tunnel -> above the matrix.
      const dive = smoothstep(0.1, 0.5, smoothed);
      const rise = smoothstep(0.56, 0.9, smoothed);
      world.position.set(hero.x * (1 - dive), hero.y * (1 - dive), 0);
      parallax.lerp(parallaxTarget, 0.05);
      camera.position.set(
        parallax.x * 0.7 * (1 - dive),
        2.3 - dive * 2.3 + rise * 5.4 + parallax.y * 0.5 * (1 - dive),
        9.6 - dive * 8.2 + rise * 8.6
      );
      lookAt.set(0, rise * -1.7, -dive * 4 - rise * 2);
      camera.lookAt(lookAt);

      orbitX += (orbitTargetX - orbitX) * 0.08;
      orbitY += (orbitTargetY - orbitY) * 0.08;
      points.rotation.set(orbitX * (1 - toGrid), orbitY, 0);

      // Keep the black hole facing the viewer and riding the same orbit.
      shadowDisc.quaternion.copy(camera.quaternion);
      photonRing.quaternion.copy(camera.quaternion);

      renderer.render(scene, camera);
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      time += 0.0085;
      smoothed += (scrollProgress - smoothed) * 0.06;
      render();
    };

    if (reduceMotion) {
      smoothed = scrollProgress;
      render();
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
