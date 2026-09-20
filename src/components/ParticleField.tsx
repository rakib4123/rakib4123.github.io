"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-screen 3D particle field that lives behind the whole page.
 *
 * It morphs through three formations as the page scrolls:
 *   hero      -> a slowly rotating sphere
 *   projects  -> particles expand outward into a starfield tunnel the camera flies through
 *   about/end -> particles settle into a flat wave matrix
 *
 * The pointer pulls nearby particles toward it, and dragging orbits the scene.
 */

const COUNT_DESKTOP = 6000;
const COUNT_MOBILE = 2600;

const RED = new THREE.Color("#d7263d");
const ORANGE = new THREE.Color("#f47c20");

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = window.innerWidth < 768 ? COUNT_MOBILE : COUNT_DESKTOP;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 9);

    // Three target formations, precomputed once per particle.
    const sphere = new Float32Array(count * 3);
    const tunnel = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    const cols = Math.ceil(Math.sqrt(count));
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      seeds[i] = Math.random();

      // Sphere: fibonacci distribution so the shell looks even.
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const radius = 3 + (Math.random() - 0.5) * 0.25;
      sphere[i3] = Math.cos(theta) * r * radius;
      sphere[i3 + 1] = y * radius;
      sphere[i3 + 2] = Math.sin(theta) * r * radius;

      // Tunnel: a cylindrical shell stretched along the camera axis.
      const tubeR = 5.5 + Math.random() * 5;
      tunnel[i3] = Math.cos(theta) * tubeR;
      tunnel[i3 + 1] = Math.sin(theta) * tubeR;
      tunnel[i3 + 2] = -60 + Math.random() * 75;

      // Grid: a flat matrix that later ripples.
      const gx = (i % cols) - cols / 2;
      const gz = Math.floor(i / cols) - cols / 2;
      grid[i3] = gx * 0.42;
      grid[i3 + 1] = -2.4;
      grid[i3 + 2] = gz * 0.42;

      positions[i3] = sphere[i3];
      positions[i3 + 1] = sphere[i3 + 1];
      positions[i3 + 2] = sphere[i3 + 2];

      const c = RED.clone().lerp(ORANGE, Math.random());
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ---- interaction state -------------------------------------------------
    const pointer = new THREE.Vector2(-9999, -9999); // world-ish coords at z=0
    let dragging = false;
    let dragX = 0;
    let dragY = 0;
    let orbitX = 0;
    let orbitY = 0;
    let orbitTargetX = 0;
    let orbitTargetY = 0;
    let scrollProgress = 0;

    const toWorld = (clientX: number, clientY: number) => {
      const ndcX = (clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(clientY / window.innerHeight) * 2 + 1;
      const fovH = 2 * Math.tan((camera.fov * Math.PI) / 360) * Math.abs(camera.position.z);
      pointer.set((ndcX * fovH * camera.aspect) / 2, (ndcY * fovH) / 2);
    };

    const onPointerMove = (e: PointerEvent) => {
      toWorld(e.clientX, e.clientY);
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
      pointer.set(-9999, -9999);
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

    // ---- animation ---------------------------------------------------------
    const pos = geometry.attributes.position.array as Float32Array;
    let frame = 0;
    let time = 0;
    let smoothed = scrollProgress;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      time += 0.005;
      smoothed += (scrollProgress - smoothed) * 0.06;

      // Formation blends: sphere -> tunnel -> grid
      const toTunnel = smoothstep(0.1, 0.42, smoothed);
      const toGrid = smoothstep(0.55, 0.85, smoothed);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const s = seeds[i];

        // sphere position with a slow breathing wobble
        const breathe = 1 + Math.sin(time * 1.4 + s * 12) * 0.05;
        let x = sphere[i3] * breathe;
        let y = sphere[i3 + 1] * breathe;
        let z = sphere[i3 + 2] * breathe;

        if (toTunnel > 0) {
          x += (tunnel[i3] - x) * toTunnel;
          y += (tunnel[i3 + 1] - y) * toTunnel;
          // drift the tunnel toward the camera so it reads as motion
          const tz = tunnel[i3 + 2] + ((time * 6 + s * 75) % 75);
          z += (tz - z) * toTunnel;
        }

        if (toGrid > 0) {
          const wave =
            grid[i3 + 1] + Math.sin(grid[i3] * 0.5 + time * 2.2) * 0.45 +
            Math.cos(grid[i3 + 2] * 0.5 + time * 1.7) * 0.45;
          x += (grid[i3] - x) * toGrid;
          y += (wave - y) * toGrid;
          z += (grid[i3 + 2] - z) * toGrid;
        }

        // Pointer gravity — only meaningful while the sphere is on screen.
        if (toTunnel < 0.9 && pointer.x > -9000) {
          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9) {
            const pull = (1 - d2 / 9) * 0.35 * (1 - toTunnel);
            x += dx * pull;
            y += dy * pull;
          }
        }

        pos[i3] = x;
        pos[i3 + 1] = y;
        pos[i3 + 2] = z;
      }
      geometry.attributes.position.needsUpdate = true;

      // Camera flies into the sphere, then pulls back above the matrix.
      const dive = smoothstep(0.1, 0.5, smoothed);
      const rise = smoothstep(0.55, 0.9, smoothed);
      camera.position.z = 9 - dive * 9 + rise * 9;
      camera.position.y = rise * 4.5;
      camera.lookAt(0, rise * -1.6, rise * -4);

      orbitX += (orbitTargetX - orbitX) * 0.08;
      orbitY += (orbitTargetY - orbitY) * 0.08;
      points.rotation.x = orbitX;
      points.rotation.y = orbitY + (reduceMotion ? 0 : time * 0.12);

      material.size = 0.045 + dive * 0.02;
      material.opacity = 0.95 - rise * 0.25;

      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      // Render one static frame rather than animating.
      renderer.render(scene, camera);
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
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}
