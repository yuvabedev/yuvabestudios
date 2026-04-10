"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

import { cn } from "@/lib/utils";

import {
  defaultHeroHelixTuning,
  defaultHeroInfinityCloudTuning,
  type HeroHelixTuning,
  type HeroInfinityCloudTuning,
} from "./hero-effect-tuning";
import { TAU, readCssToken } from "./hero-effect-utils";

// See `components/studio/hero-effect/README.md` for the shape logic, scene ownership, and tuning notes for this Three.js layer.

type StudioHeroInfinityCloudProps = {
  className?: string;
  isInViewport?: boolean;
  tuning?: HeroInfinityCloudTuning;
  helixTuning?: HeroHelixTuning;
};

type HeroDensityTier = "mobile" | "tablet" | "desktop";

type InfinityPalette = {
  cyan: THREE.Color;
  purple: THREE.Color;
  yellow: THREE.Color;
};

type CloudPoint3 = {
  x: number;
  y: number;
  z: number;
};

const infinityIdleYOffset = 0.025;

function readInfinityPalette() {
  return {
    cyan: new THREE.Color(readCssToken("--cyan-500", "#2bb7c7")),
    purple: new THREE.Color(readCssToken("--purple-500", "#5829c7")),
    yellow: new THREE.Color(readCssToken("--yellow-500", "#ffca2d")),
  } satisfies InfinityPalette;
}

function readDensityTier(width: number): HeroDensityTier {
  if (width < 768) {
    return "mobile";
  }

  if (width < 1280) {
    return "tablet";
  }

  return "desktop";
}

function getResponsiveParticleCount(
  particleCount: number,
  densityTier: HeroDensityTier,
  shouldReduceMotion: boolean
) {
  if (shouldReduceMotion) {
    return Math.max(240, Math.round(particleCount * 0.08));
  }

  if (densityTier === "mobile") {
    return Math.max(1200, Math.round(particleCount * 0.34));
  }

  if (densityTier === "tablet") {
    return Math.max(1200, Math.round(particleCount * 0.58));
  }

  return Math.max(1200, Math.round(particleCount));
}

// The infinity curve remains one procedural target in the morph so the cloud can settle back into the original branded silhouette.
function getInfinityPosition(
  t: number,
  scaleX: number,
  scaleY: number,
  target: CloudPoint3
) {
  const angle = t * TAU;

  target.x = Math.sin(angle) * scaleX;
  target.y = Math.sin(angle * 2) * 0.5 * scaleY;
  target.z = 0;
}

// Offsetting particles along the local infinity normal turns one thin path into a ribbon-like cloud.
function getInfinityNormal(
  t: number,
  scaleX: number,
  scaleY: number,
  target: CloudPoint3
) {
  const angle = t * TAU;
  const dx = Math.cos(angle) * scaleX;
  const dy = Math.cos(angle * 2) * scaleY;
  const length = Math.hypot(dx, dy) || 1;

  target.x = -dy / length;
  target.y = dx / length;
  target.z = 0;
}

function getHelixAngle(t: number, turns: number, strand: number) {
  return t * TAU * turns + (strand === 0 ? 0 : Math.PI);
}

// The helix target uses the same phase domain as the infinity loop, so particles can split into two strands without respawning.
function getHelixPosition(
  t: number,
  helixWidthBase: number,
  helixTuning: HeroHelixTuning,
  strand: number,
  target: CloudPoint3
) {
  const angle = getHelixAngle(t, helixTuning.turns, strand);
  const helixZoom = helixTuning.zoom;

  target.x = (t - 0.5) * helixWidthBase * helixTuning.span * helixZoom;
  target.y = Math.sin(angle) * helixTuning.amplitudeY * helixZoom;
  target.z = Math.cos(angle) * helixTuning.amplitudeZ * helixZoom;
}

// The helix spread rides on an elliptical radial normal so the cloud keeps a readable strand thickness in 3D.
function getHelixNormal(
  t: number,
  helixTuning: HeroHelixTuning,
  strand: number,
  target: CloudPoint3
) {
  const angle = getHelixAngle(t, helixTuning.turns, strand);
  const helixZoom = helixTuning.zoom;
  const radialY = Math.sin(angle) * helixTuning.amplitudeY * helixZoom;
  const radialZ = Math.cos(angle) * helixTuning.amplitudeZ * helixZoom;
  const length = Math.hypot(radialY, radialZ) || 1;

  target.x = 0;
  target.y = radialY / length;
  target.z = radialZ / length;
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
  isInViewport = true,
  tuning = defaultHeroInfinityCloudTuning,
  helixTuning = defaultHeroHelixTuning,
}: StudioHeroInfinityCloudProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [densityTier, setDensityTier] = useState<HeroDensityTier>(() =>
    typeof window === "undefined" ? "desktop" : readDensityTier(window.innerWidth)
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Smaller screens get lower particle budgets so the loop stays fluid without changing the art direction.
    const syncDensityTier = () => {
      const nextDensityTier = readDensityTier(window.innerWidth);
      setDensityTier((currentDensityTier) =>
        currentDensityTier === nextDensityTier
          ? currentDensityTier
          : nextDensityTier
      );
    };

    syncDensityTier();
    window.addEventListener("resize", syncDensityTier, { passive: true });

    return () => {
      window.removeEventListener("resize", syncDensityTier);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !isInViewport) {
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
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-3, 3, 1.7, -1.7, 0.1, 10);
    camera.position.z = 6;

    // The group keeps the glow and core particles moving together as one branded signal form.
    const loopGroup = new THREE.Group();
    scene.add(loopGroup);

    const particleCount = getResponsiveParticleCount(
      tuning.particleCount,
      densityTier,
      reduceMotion
    );
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particlePhase = new Float32Array(particleCount);
    const particleSpreadSeed = new Float32Array(particleCount);
    const particleDrift = new Float32Array(particleCount);
    const particleStrand = new Uint8Array(particleCount);

    // Each particle stores stable phase, strand, spread seed, and drift values so the cloud can morph without popping.
    for (let index = 0; index < particleCount; index += 1) {
      const phase = Math.random();
      particlePhase[index] = phase;
      particleStrand[index] = index % 2;
      particleSpreadSeed[index] = Math.random() - 0.5;
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
      opacity: reduceMotion ? 0.2 : 0.28,
      size: 0.2,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: true,
    });
    const particleCoreMaterial = new THREE.PointsMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: reduceMotion ? 0.86 : 0.98,
      size: 0.064,
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

    const infinityPoint: CloudPoint3 = { x: 0, y: 0, z: 0 };
    const helixPoint: CloudPoint3 = { x: 0, y: 0, z: 0 };
    const infinityNormal: CloudPoint3 = { x: 0, y: 0, z: 0 };
    const helixNormal: CloudPoint3 = { x: 0, y: 0, z: 0 };
    let frameId = 0;

    // The frame loop reprojects particles onto two procedural targets and blends them into a continuous breathing morph.
    const renderFrame = (time: number) => {
      const timeSeconds = time * 0.001;
      const visibleWidth = camera.right - camera.left;
      // The helix keeps a near-full-width footprint, but the fill still responds to the span and zoom sliders instead of collapsing to one fixed width.
      const helixScreenFill = THREE.MathUtils.clamp(
        0.44 + helixTuning.span * helixTuning.zoom * 0.36,
        0.64,
        0.98
      );
      // The base width is scaled back from the desired on-screen fill so the final helix can stay inside the frustum without neutralizing the tuning controls.
      const helixWidthBase =
        (visibleWidth * helixScreenFill) /
        Math.max(helixTuning.span * helixTuning.zoom, Number.EPSILON);
      const rawMorph = reduceMotion
        ? 0
        : 0.5 - 0.5 * Math.cos((timeSeconds * TAU) / helixTuning.cycleSeconds);
      const morph = reduceMotion
        ? 0
        : THREE.MathUtils.smootherstep(
            rawMorph,
            helixTuning.morphStart,
            helixTuning.morphEnd
          );
      const positionAttribute = particleGeometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const infinityPointSpread = reduceMotion
        ? Math.min(tuning.pointSpread, 0.06)
        : tuning.pointSpread;
      const helixPointSpread = reduceMotion
        ? Math.min(helixTuning.pointSpread, 0.06)
        : helixTuning.pointSpread;

      for (let index = 0; index < particleCount; index += 1) {
        const phase = particlePhase[index];
        const drift = reduceMotion ? phase : phase + timeSeconds * 0.06;
        const wrapped = drift % 1;
        const strand = particleStrand[index];
        // Each shape now owns its own point spread, while the helix can still tighten its live motion separately.
        const pointSpread = THREE.MathUtils.lerp(
          infinityPointSpread,
          helixPointSpread,
          morph
        );
        const motionTighten = reduceMotion
          ? 1
          : THREE.MathUtils.lerp(1, helixTuning.spreadScale, morph);
        const baseSpread = particleSpreadSeed[index] * pointSpread;
        const motionOffset = reduceMotion
          ? baseSpread
          : baseSpread +
            Math.sin(timeSeconds * 1.6 + phase * TAU) *
              particleDrift[index] *
              motionTighten;

        getInfinityPosition(wrapped, tuning.scaleX, tuning.scaleY, infinityPoint);
        getHelixPosition(wrapped, helixWidthBase, helixTuning, strand, helixPoint);
        getInfinityNormal(wrapped, tuning.scaleX, tuning.scaleY, infinityNormal);
        getHelixNormal(wrapped, helixTuning, strand, helixNormal);

        let blendedNormalX = THREE.MathUtils.lerp(
          infinityNormal.x,
          helixNormal.x,
          morph
        );
        let blendedNormalY = THREE.MathUtils.lerp(
          infinityNormal.y,
          helixNormal.y,
          morph
        );
        let blendedNormalZ = THREE.MathUtils.lerp(
          infinityNormal.z,
          helixNormal.z,
          morph
        );
        const normalLength =
          Math.hypot(blendedNormalX, blendedNormalY, blendedNormalZ) || 1;

        blendedNormalX /= normalLength;
        blendedNormalY /= normalLength;
        blendedNormalZ /= normalLength;

        const blendedPointX = THREE.MathUtils.lerp(
          infinityPoint.x,
          helixPoint.x,
          morph
        );
        const blendedPointY = THREE.MathUtils.lerp(
          infinityPoint.y,
          helixPoint.y,
          morph
        );
        const blendedPointZ = THREE.MathUtils.lerp(
          infinityPoint.z,
          helixPoint.z,
          morph
        );
        const ambientZ =
          reduceMotion
            ? 0
            : Math.sin(timeSeconds * 0.75 + phase * TAU) *
              0.028 *
              (1 - morph * 0.8);
        const baseIndex = index * 3;

        particlePositions[baseIndex] =
          blendedPointX + blendedNormalX * motionOffset;
        particlePositions[baseIndex + 1] =
          blendedPointY + blendedNormalY * motionOffset;
        particlePositions[baseIndex + 2] =
          blendedPointZ + blendedNormalZ * motionOffset + ambientZ;
      }

      positionAttribute.needsUpdate = true;

      if (!reduceMotion) {
        // Shifting by a fraction of the active helix width keeps the bias proportional as the morph grows and shrinks.
        loopGroup.position.x =
          -(visibleWidth * helixScreenFill * 0.5) *
          helixTuning.horizontalShift *
          morph;
        loopGroup.rotation.y = helixTuning.rotationYMax * morph;
        loopGroup.rotation.x = helixTuning.rotationXMax * morph;
        loopGroup.rotation.z = 0;
        loopGroup.position.y =
          Math.sin(timeSeconds * 0.32) *
          infinityIdleYOffset *
          (1 - morph * 0.55);
      } else {
        loopGroup.position.x = 0;
      }

      renderer.render(scene, camera);

      if (!reduceMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    if (reduceMotion) {
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
    densityTier,
    isInViewport,
    reduceMotion,
    tuning.particleCount,
    tuning.pointSpread,
    tuning.scaleX,
    tuning.scaleY,
    tuning.zoom,
    helixTuning.amplitudeY,
    helixTuning.amplitudeZ,
    helixTuning.cycleSeconds,
    helixTuning.horizontalShift,
    helixTuning.morphEnd,
    helixTuning.morphStart,
    helixTuning.rotationXMax,
    helixTuning.rotationYMax,
    helixTuning.span,
    helixTuning.pointSpread,
    helixTuning.spreadScale,
    helixTuning.turns,
    helixTuning.zoom,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("absolute inset-0", className)}
    />
  );
}
