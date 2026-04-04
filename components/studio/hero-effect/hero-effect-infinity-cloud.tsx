"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

import { cn } from "@/lib/utils";

import {
  defaultHeroInfinityCloudTuning,
  type HeroInfinityCloudTuning,
} from "./hero-effect-tuning";
import { TAU, readCssToken } from "./hero-effect-utils";

// See `components/studio/hero-effect/README.md` for the shape logic, scene ownership, and tuning notes for this Three.js layer.

type StudioHeroInfinityCloudProps = {
  className?: string;
  tuning?: HeroInfinityCloudTuning;
};

type InfinityPalette = {
  cyan: THREE.Color;
  purple: THREE.Color;
  yellow: THREE.Color;
};

function readInfinityPalette() {
  return {
    cyan: new THREE.Color(readCssToken("--cyan-500", "#2bb7c7")),
    purple: new THREE.Color(readCssToken("--purple-500", "#5829c7")),
    yellow: new THREE.Color(readCssToken("--yellow-500", "#ffca2d")),
  } satisfies InfinityPalette;
}

// The infinity curve is procedural so we can tune the silhouette later without replacing a static asset.
function getInfinityPosition(t: number, scaleX: number, scaleY: number) {
  const angle = t * TAU;

  return {
    x: Math.sin(angle) * scaleX,
    y: Math.sin(angle * 2) * 0.5 * scaleY,
  };
}

// Offsetting particles along the local normal turns one thin path into a ribbon-like cloud.
function getInfinityNormal(t: number, scaleX: number, scaleY: number) {
  const angle = t * TAU;
  const dx = Math.cos(angle) * scaleX;
  const dy = Math.cos(angle * 2) * scaleY;
  const length = Math.hypot(dx, dy) || 1;

  return {
    x: -dy / length,
    y: dx / length,
  };
}

// The color ramp cycles through the brand palette so the cloud stays lively without introducing new hues.
function setParticleColor(
  colorBuffer: Float32Array,
  particleIndex: number,
  palette: InfinityPalette,
  t: number
) {
  const target = new THREE.Color();

  if (t < 0.33) {
    target.copy(palette.purple).lerp(palette.cyan, t / 0.33);
  } else if (t < 0.66) {
    target.copy(palette.cyan).lerp(palette.yellow, (t - 0.33) / 0.33);
  } else {
    target.copy(palette.yellow).lerp(palette.purple, (t - 0.66) / 0.34);
  }

  const baseIndex = particleIndex * 3;
  colorBuffer[baseIndex] = target.r;
  colorBuffer[baseIndex + 1] = target.g;
  colorBuffer[baseIndex + 2] = target.b;
}

export function StudioHeroInfinityCloud({
  className,
  tuning = defaultHeroInfinityCloudTuning,
}: StudioHeroInfinityCloudProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const palette = readInfinityPalette();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-3, 3, 1.7, -1.7, 0.1, 10);
    camera.position.z = 6;

    // The group keeps the glow and core particles moving together as one branded signal form.
    const loopGroup = new THREE.Group();
    scene.add(loopGroup);

    const particleCount = shouldReduceMotion
      ? Math.max(240, Math.round(tuning.particleCount * 0.2))
      : Math.max(1200, Math.round(tuning.particleCount));
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particlePhase = new Float32Array(particleCount);
    const particleSpread = new Float32Array(particleCount);
    const particleDrift = new Float32Array(particleCount);

    // Each particle stores its own phase, lateral spread, and drift so the loop reads like a cloud instead of a traced line.
    for (let index = 0; index < particleCount; index += 1) {
      const phase = Math.random();
      particlePhase[index] = phase;
      particleSpread[index] = (Math.random() - 0.5) * (
        shouldReduceMotion
          ? Math.min(tuning.particleSpread, 0.06)
          : tuning.particleSpread
      );
      particleDrift[index] = 0.01 + Math.random() * 0.03;
      setParticleColor(particleColors, index, palette, phase);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    // Two layered point materials give the cloud a soft halo plus a brighter core without drawing the path itself.
    const particleGlowMaterial = new THREE.PointsMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: shouldReduceMotion ? 0.12 : 0.16,
      size: 0.13,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: true,
    });
    const particleCoreMaterial = new THREE.PointsMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: shouldReduceMotion ? 0.7 : 0.84,
      size: 0.042,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: true,
    });
    const particleGlow = new THREE.Points(particleGeometry, particleGlowMaterial);
    const particleCore = new THREE.Points(particleGeometry, particleCoreMaterial);
    loopGroup.add(particleGlow, particleCore);

    // The resize sync keeps the orthographic scene proportionate while the hero changes height across breakpoints.
    const syncRendererSize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const aspect = width / height;
      const frustumHeight = 4.4 / tuning.zoom;

      camera.left = (-frustumHeight * aspect) / 2;
      camera.right = (frustumHeight * aspect) / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(syncRendererSize);
    resizeObserver.observe(container);
    syncRendererSize();

    let frameId = 0;

    // The frame loop continuously reprojects particles onto the procedural curve so the cloud stays dense but alive.
    const renderFrame = (time: number) => {
      const timeSeconds = time * 0.001;
      const positionAttribute = particleGeometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;

      for (let index = 0; index < particleCount; index += 1) {
        const drift = shouldReduceMotion
          ? particlePhase[index]
          : particlePhase[index] + timeSeconds * 0.06;
        const wrapped = drift % 1;
        const point = getInfinityPosition(wrapped, tuning.scaleX, tuning.scaleY);
        const normal = getInfinityNormal(wrapped, tuning.scaleX, tuning.scaleY);
        const motionOffset = shouldReduceMotion
          ? particleSpread[index]
          : particleSpread[index] +
            Math.sin(timeSeconds * 1.6 + particlePhase[index] * TAU) *
              particleDrift[index];
        const baseIndex = index * 3;
        const particleX = point.x + normal.x * motionOffset;
        const particleY = point.y + normal.y * motionOffset;
        const particleZ = shouldReduceMotion
          ? 0
          : Math.sin(timeSeconds * 0.75 + particlePhase[index] * TAU) * 0.028;

        particlePositions[baseIndex] = particleX;
        particlePositions[baseIndex + 1] = particleY;
        particlePositions[baseIndex + 2] = particleZ;
      }

      positionAttribute.needsUpdate = true;

      if (!shouldReduceMotion) {
        loopGroup.rotation.z = Math.sin(timeSeconds * 0.16) * 0.03;
        loopGroup.position.y = Math.sin(timeSeconds * 0.32) * 0.025;
      }

      renderer.render(scene, camera);

      if (!shouldReduceMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    if (shouldReduceMotion) {
      renderFrame(0);
    } else {
      frameId = window.requestAnimationFrame(renderFrame);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      particleGeometry.dispose();
      particleGlowMaterial.dispose();
      particleCoreMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [
    shouldReduceMotion,
    tuning.particleCount,
    tuning.particleSpread,
    tuning.scaleX,
    tuning.scaleY,
    tuning.zoom,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("absolute inset-0", className)}
    />
  );
}
