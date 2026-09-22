"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

/**
 * A single, continuous Milky Way behind the whole page.
 *
 * There is only one formation. Scroll does not rearrange the stars — it moves
 * the camera along a fixed orbital path around them:
 *
 *   hero     -> a wide, almost edge-on view from well outside the disc
 *   work     -> an arc inward and over the plane, close to one spiral arm
 *   about    -> a pull back to a symmetrical top-down view of the core, where
 *               the rotation slows to a near-standstill
 *
 * The cursor only parallaxes the camera. Nothing scatters, nothing is pulled:
 * the scene is a backdrop and has to stay out of the way of the text.
 */

const COUNT_DESKTOP = 40000;
const COUNT_MOBILE = 12000;
const DUST_DESKTOP = 1400;
const DUST_MOBILE = 420;

const ARMS = 4;
const GALAXY_R = 14;
const SPIRAL_TIGHTNESS = 0.42;

/** Monochrome star classes: warm ivory, platinum, muted stellar blue. */
const IVORY = new THREE.Color("#fffdf5");
const PLATINUM = new THREE.Color("#e5e5e5");
const STELLAR_BLUE = new THREE.Color("#d0e0ff");

/** Camera keyframes in spherical coordinates around the galactic centre. */
type Key = { at: number; radius: number; azimuth: number; elevation: number };
const PATH: Key[] = [
  { at: 0.0, radius: 26, azimuth: 0.0, elevation: 0.42 },
  { at: 0.46, radius: 12.5, azimuth: 1.3, elevation: 0.34 },
  { at: 1.0, radius: 23, azimuth: 2.5, elevation: 1.5 },
];

/**
 * The camera has a fixed vertical field of view, so a narrow or portrait
 * viewport crops the disc horizontally while an ultrawide one only reveals more
 * empty space. Pulling the camera back on narrow aspects keeps the galaxy
 * framed the same way everywhere; the pullback is capped so portrait phones
 * crop a little rather than shrink the galaxy to a speck.
 */
const REFERENCE_ASPECT = 1.6;
const MAX_PULLBACK = 1.85;

function aspectPullback(aspect: number) {
  return Math.min(MAX_PULLBACK, Math.max(1, REFERENCE_ASPECT / aspect));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

const STAR_VERT = `
uniform float uTime;
uniform float uSpin;
uniform float uSize;
uniform float uPixelRatio;
uniform float uWarp;
uniform float uFog;

attribute vec3  aColor;
attribute float aSeed;
attribute float aRadius;

varying vec3  vColor;
varying float vAlpha;

vec3 rotY(vec3 p, float a) {
  float c = cos(a), s = sin(a);
  return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

void main() {
  // Differential rotation: the inner disc turns faster than the arms, which is
  // what keeps the spiral from reading as a rigid pinwheel.
  vec3 p = rotY(position, uSpin * (1.0 / (1.4 + aRadius * 0.28)));
  p.y += sin(uTime * 0.35 + aSeed * 30.0) * 0.035;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = -mv.z;
  gl_Position = projectionMatrix * mv;

  // uWarp rises while the camera is arcing, so the field gains a little bloom
  // in the direction of travel rather than sitting perfectly still.
  float size = uSize * (0.45 + aSeed * 0.95) * (1.0 + uWarp * 1.4);
  gl_PointSize = size * uPixelRatio * (300.0 / max(0.8, dist));

  vColor = aColor;
  // Distance haze gives the arms depth without adding any geometry.
  vAlpha = (0.42 + aSeed * 0.58) * exp(-dist * uFog) * (1.0 + uWarp * 0.35);
}
`;

const STAR_FRAG = `
varying vec3  vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.06, d);
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`;

/** Broad, very faint motes that give the arms body. */
const DUST_VERT = `
uniform float uTime;
uniform float uSpin;
uniform float uPixelRatio;
uniform float uFog;

attribute float aSeed;
attribute float aRadius;

varying float vAlpha;

vec3 rotY(vec3 p, float a) {
  float c = cos(a), s = sin(a);
  return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

void main() {
  vec3 p = rotY(position, uSpin * (1.0 / (1.4 + aRadius * 0.28)));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = -mv.z;
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (0.85 + aSeed * 1.5) * uPixelRatio * (300.0 / max(0.8, dist));
  vAlpha = (0.018 + aSeed * 0.022) * exp(-dist * uFog);
}
`;

const DUST_FRAG = `
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  a *= a;
  gl_FragColor = vec4(0.87, 0.89, 0.96, a * vAlpha);
}
`;

type Tier = "mobile" | "desktop";

function subscribeToViewport(onChange: () => void) {
  window.addEventListener("resize", onChange);
  window.addEventListener("orientationchange", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
    window.removeEventListener("orientationchange", onChange);
  };
}

const readTier = (): Tier => (window.innerWidth < 768 ? "mobile" : "desktop");
const readTierOnServer = (): Tier => "desktop";

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // The scene belongs to the landing page only. On /resume the fixed canvas
  // would paint over the embedded PDF, since it outranks in-flow content.
  const enabled = usePathname() === "/";
  // Star budget and pixel ratio depend on the device class, and that class can
  // change mid-session: rotating a phone, or dragging a window across the
  // breakpoint. Subscribing to it re-renders only when the tier actually flips,
  // so the scene is rebuilt at the right budget instead of being stuck with
  // whatever was true at mount.
  const tier = useSyncExternalStore(subscribeToViewport, readTier, readTierOnServer);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = tier === "mobile";
    const count = isMobile ? COUNT_MOBILE : COUNT_DESKTOP;
    // Narrow screens have no room to shift sideways, so they only drop it down.
    const HERO_SHIFT_X = 0;
    const dustCount = isMobile ? DUST_MOBILE : DUST_DESKTOP;

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
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      400
    );

    // ---- the galaxy ---------------------------------------------------------
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const radii = new Float32Array(count);
    const c = new THREE.Color();

    /** Logarithmic spiral: angle grows with the log of the radius. */
    const armAngle = (r: number) => Math.log(1 + r * SPIRAL_TIGHTNESS) * 3.1;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const seed = Math.random();
      seeds[i] = seed;

      // One star in eight belongs to a tight central bulge, so the core reads
      // as the brightest part of the field rather than just the densest.
      const inBulge = Math.random() < 0.13;
      const r = inBulge
        ? Math.pow(Math.random(), 2.4) * 3.2
        : Math.pow(Math.random(), 0.75) * GALAXY_R;
      radii[i] = r;

      const branch = ((i % ARMS) / ARMS) * Math.PI * 2;
      // Bulge stars ignore the arms entirely and sit in a rounded swarm.
      const theta = inBulge ? Math.random() * Math.PI * 2 : branch + armAngle(r);

      // Scatter falls off toward the rim so the arms stay legible, and the disc
      // is thickest at the core.
      const spread = inBulge ? 0 : Math.pow(Math.random(), 2.6) * (0.5 + r * 0.16);
      const sx = spread * (Math.random() < 0.5 ? 1 : -1);
      const sz = spread * (Math.random() < 0.5 ? 1 : -1);
      const thickness = inBulge
        ? (Math.random() - 0.5) * 1.6
        : (0.55 - Math.min(0.42, r * 0.03)) * (Math.random() - 0.5) * 2;

      positions[i3] = Math.cos(theta) * r + sx;
      positions[i3 + 1] = thickness * Math.pow(Math.random(), 1.6);
      positions[i3 + 2] = Math.sin(theta) * r + sz;

      // Warm ivory in the core, cooling to stellar blue in the outer arms.
      const t = r / GALAXY_R;
      const pick = Math.random();
      if (pick < 0.45 - t * 0.3) c.copy(IVORY);
      else if (pick < 0.8) c.copy(PLATINUM);
      else c.copy(STELLAR_BLUE);
      c.lerp(STELLAR_BLUE, t * 0.35);

      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    starGeo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    starGeo.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));
    starGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), GALAXY_R * 1.6);

    const starMat = new THREE.ShaderMaterial({
      vertexShader: STAR_VERT,
      fragmentShader: STAR_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uSpin: { value: 0 },
        uSize: { value: isMobile ? 0.15 : 0.125 },
        uPixelRatio: { value: pixelRatio },
        uWarp: { value: 0 },
        uFog: { value: 0.014 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    // Stars and dust share a group so the hero can hold the whole galaxy off
    // to one side of the centred copy, then bring it back to centre on scroll.
    const galaxy = new THREE.Group();
    scene.add(galaxy);

    const stars = new THREE.Points(starGeo, starMat);
    stars.frustumCulled = false;
    galaxy.add(stars);

    // ---- dust ---------------------------------------------------------------
    const dustPos = new Float32Array(dustCount * 3);
    const dustSeed = new Float32Array(dustCount);
    const dustRadius = new Float32Array(dustCount);
    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      const r = 1.5 + Math.pow(Math.random(), 0.8) * (GALAXY_R - 1.5);
      const theta = ((i % ARMS) / ARMS) * Math.PI * 2 + armAngle(r);
      const spread = Math.pow(Math.random(), 1.6) * (0.9 + r * 0.22);
      dustPos[i3] = Math.cos(theta) * r + spread * (Math.random() < 0.5 ? 1 : -1);
      dustPos[i3 + 1] = (Math.random() - 0.5) * 0.5;
      dustPos[i3 + 2] = Math.sin(theta) * r + spread * (Math.random() < 0.5 ? 1 : -1);
      dustSeed[i] = Math.random();
      dustRadius[i] = r;
    }

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(dustSeed, 1));
    dustGeo.setAttribute("aRadius", new THREE.BufferAttribute(dustRadius, 1));
    dustGeo.boundingSphere = starGeo.boundingSphere;

    const dustMat = new THREE.ShaderMaterial({
      vertexShader: DUST_VERT,
      fragmentShader: DUST_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uSpin: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uFog: { value: 0.012 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const dust = new THREE.Points(dustGeo, dustMat);
    dust.frustumCulled = false;
    dust.renderOrder = -1;
    galaxy.add(dust);

    // ---- interaction --------------------------------------------------------
    const parallax = new THREE.Vector2(0, 0);
    const parallaxTarget = new THREE.Vector2(0, 0);
    let dragging = false;
    let dragX = 0;
    let dragY = 0;
    let orbitAz = 0;
    let orbitEl = 0;
    let orbitAzTarget = 0;
    let orbitElTarget = 0;
    let scrollProgress = 0;

    const onPointerMove = (e: PointerEvent) => {
      parallaxTarget.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      if (dragging) {
        orbitAzTarget += (e.clientX - dragX) * 0.004;
        orbitElTarget += (e.clientY - dragY) * 0.003;
        orbitElTarget = Math.max(-0.5, Math.min(0.5, orbitElTarget));
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
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    // ---- camera path --------------------------------------------------------
    /** Eased interpolation between the spherical keyframes. */
    const sample = (p: number) => {
      let a = PATH[0];
      let b = PATH[PATH.length - 1];
      for (let i = 0; i < PATH.length - 1; i++) {
        if (p >= PATH[i].at && p <= PATH[i + 1].at) {
          a = PATH[i];
          b = PATH[i + 1];
          break;
        }
      }
      if (p <= PATH[0].at) return { ...PATH[0] };
      if (p >= PATH[PATH.length - 1].at) return { ...PATH[PATH.length - 1] };
      const t = smoothstep(a.at, b.at, p);
      return {
        radius: a.radius + (b.radius - a.radius) * t,
        azimuth: a.azimuth + (b.azimuth - a.azimuth) * t,
        elevation: a.elevation + (b.elevation - a.elevation) * t,
      };
    };

    // ---- frame loop ---------------------------------------------------------
    let frame = 0;
    let time = 0;
    let spin = 0;
    let smoothed = scrollProgress;
    let lastAzimuth = PATH[0].azimuth;
    let warp = 0;
    const target = new THREE.Vector3();

    const render = () => {
      const k = sample(smoothed);
      const pull = aspectPullback(camera.aspect);
      // Haze is a function of distance, so it has to loosen as the camera
      // retreats or narrow screens would wash the galaxy out.
      starMat.uniforms.uFog.value = 0.014 / pull;
      dustMat.uniforms.uFog.value = 0.012 / pull;

      starMat.uniforms.uTime.value = time;
      starMat.uniforms.uSpin.value = spin;
      dustMat.uniforms.uSpin.value = spin;

      const az = k.azimuth + orbitAz;
      const el = k.elevation + orbitEl;

      // Warp tracks how fast the camera is swinging round the disc.
      const swing = Math.abs(az - lastAzimuth);
      lastAzimuth = az;
      warp += (Math.min(1, swing * 55) - warp) * 0.08;
      starMat.uniforms.uWarp.value = warp;

      parallax.lerp(parallaxTarget, 0.035);
      const cosEl = Math.cos(el);
      const radius = k.radius * pull;
      camera.position.set(
        radius * cosEl * Math.cos(az) + parallax.x * 0.9 * pull,
        radius * Math.sin(el) + parallax.y * 0.7 * pull,
        radius * cosEl * Math.sin(az)
      );

      // The hero holds the core low and out to one side, clear of the centred
      // copy; by the top-down view the galaxy is centred and symmetrical.
      const framed = 1 - smoothstep(0.06, 0.45, smoothed);
      galaxy.position.set(HERO_SHIFT_X * framed, 0, 0);
      target.set(0, 3.2 * framed, 0);
      camera.lookAt(target);

      orbitAz += (orbitAzTarget - orbitAz) * 0.07;
      orbitEl += (orbitElTarget - orbitEl) * 0.07;

      renderer.render(scene, camera);
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      time += 0.0085;
      smoothed += (scrollProgress - smoothed) * 0.055;
      // In the final top-down framing the galaxy settles to a bare drift.
      const settle = 1 - smoothstep(0.72, 1, smoothed) * 0.88;
      spin += 0.0016 * settle;
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
      starGeo.dispose();
      starMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, [enabled, tier]);

  if (!enabled) return null;

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
