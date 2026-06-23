"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 2200;
const REPULSION_RADIUS = 1.8;
const REPULSION_STRENGTH = 0.12;
const RETURN_SPEED = 0.035;

export function BlogHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasOrNull = canvasRef.current;
    if (!canvasOrNull) return;
    const canvas: HTMLCanvasElement = canvasOrNull;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 6;

    // ── Geometry ──────────────────────────────────────────────────────────────
    const positions = new Float32Array(COUNT * 3);
    const original = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const purple = new THREE.Color("#5829C7");
    const yellow = new THREE.Color("#F9A91F");
    const light = new THREE.Color("#a78bfa");

    for (let i = 0; i < COUNT; i++) {
      // Spread particles wider than the viewport so edges feel infinite
      const x = (Math.random() - 0.5) * 18;
      const y = (Math.random() - 0.5) * 9;
      const z = (Math.random() - 0.5) * 0.3;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      original[i * 3] = x;
      original[i * 3 + 1] = y;
      original[i * 3 + 2] = z;

      const rnd = Math.random();
      const color = rnd < 0.12 ? yellow : rnd < 0.35 ? light : purple;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.018 + 0.006;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.022,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement ?? canvas);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    // World-space mouse position (updated in animation loop)
    const mouseNDC = new THREE.Vector2(9999, 9999);
    const mouse3D = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const target = new THREE.Vector3();

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    // Listen on window so movement outside canvas still works
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Animation loop ────────────────────────────────────────────────────────
    let raf: number;
    const pos = geo.attributes.position as THREE.BufferAttribute;

    function animate() {
      raf = requestAnimationFrame(animate);

      // Unproject NDC mouse to world z=0 plane
      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(plane, target);
      mouse3D.copy(target);

      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        const ox = original[ix];
        const oy = original[ix + 1];

        let px = pos.array[ix] as number;
        let py = pos.array[ix + 1] as number;

        const dx = px - mouse3D.x;
        const dy = py - mouse3D.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < REPULSION_RADIUS * REPULSION_RADIUS && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
          px += (dx / dist) * force;
          py += (dy / dist) * force;
        }

        // Spring back to origin
        px += (ox - px) * RETURN_SPEED;
        py += (oy - py) * RETURN_SPEED;

        pos.array[ix] = px;
        pos.array[ix + 1] = py;
      }

      pos.needsUpdate = true;
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
