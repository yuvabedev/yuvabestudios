"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { defaultHeroEffectBackdropTuning } from "./hero-effect-tuning";
import {
  type HeroSignalBurst,
  type HeroSignalPalette,
  type HeroSignalSpeck,
  createAmbientSpecks,
  createHeroSignalBurst,
  drawAmbientSpecks,
  drawBurstGlow,
  drawBurstParticles,
  drawBurstRing,
  readHeroSignalPalette,
} from "./hero-effect-burst";
import { StudioHeroInfinityCloud } from "./hero-effect-infinity-cloud";

// See `components/studio/hero-effect/README.md` for the full architecture and tuning notes for this layered hero effect.

type LocalPointerPoint = {
  x: number;
  y: number;
};

type StudioHeroNoiseBackdropProps = HTMLAttributes<HTMLElement>;

const heroSignalEase = [0.22, 1, 0.36, 1] as const;

function isBurstActive(burst: HeroSignalBurst, time: number) {
  return time - burst.start < burst.duration;
}

function clampToBounds(value: number, max: number) {
  return Math.min(max, Math.max(0, value));
}

function getLocalPointerPoint(
  event: PointerEvent<HTMLElement>
): LocalPointerPoint {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = clampToBounds(event.clientX - bounds.left, bounds.width);
  const y = clampToBounds(event.clientY - bounds.top, bounds.height);

  return { x, y };
}

export function StudioHeroNoiseBackdrop({
  children,
  className,
  ...props
}: StudioHeroNoiseBackdropProps) {
  const shouldReduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);
  const burstsRef = useRef<HeroSignalBurst[]>([]);
  const specksRef = useRef<HeroSignalSpeck[]>([]);
  const paletteRef = useRef<HeroSignalPalette | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const burstSeedRef = useRef(0);
  const startCanvasLoopRef = useRef<(() => void) | null>(null);
  const [isInViewport, setIsInViewport] = useState(true);
  // The tuned hero values are baked into the module now that the temporary control panel is gone.
  const tuning = defaultHeroEffectBackdropTuning;

  const desktopCloudStyle = {
    "--hero-cloud-offset-x": `${tuning.offsetX}%`,
    "--hero-cloud-offset-y": `${tuning.offsetY}%`,
  } as CSSProperties;

  // Clicks only need a local seed and point; the rest of the burst visuals are delegated to the canvas helpers.
  function spawnBurst(pointX: number, pointY: number) {
    const { width, height } = sizeRef.current;

    if (!width || !height) {
      return;
    }

    burstSeedRef.current += 1;
    const seed = burstSeedRef.current * 0.173 + pointX * 0.0013 + pointY * 0.0017;
    const particleCount = shouldReduceMotion ? 8 : 32;
    const duration = shouldReduceMotion ? 480 : 920;

    burstsRef.current.push(
      createHeroSignalBurst(seed, width, height, pointX, pointY, particleCount, duration)
    );

    if (burstsRef.current.length > 5) {
      burstsRef.current.shift();
    }

    startCanvasLoopRef.current?.();
  }

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    // The hero prewarms a little before entering view so the animation is already alive when the section scrolls in.
    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        rootMargin: "220px 0px 220px 0px",
        threshold: 0.01,
      }
    );

    viewportObserver.observe(stage);

    return () => {
      viewportObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    startCanvasLoopRef.current = null;

    if (!stage || !canvas || !isInViewport) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    paletteRef.current = readHeroSignalPalette();
    let frameId = 0;
    let isLoopRunning = false;

    const drawFrame = (time: number, animateAmbient: boolean) => {
      const palette = paletteRef.current;
      const { width, height } = sizeRef.current;

      if (!palette || !width || !height) {
        return false;
      }

      context.clearRect(0, 0, width, height);
      drawAmbientSpecks(
        context,
        specksRef.current,
        palette,
        animateAmbient ? time : 0
      );

      let hasActiveBursts = false;

      burstsRef.current = burstsRef.current.filter((burst) => {
        const progress = Math.min(Math.max((time - burst.start) / burst.duration, 0), 1);

        if (progress >= 1) {
          return false;
        }

        hasActiveBursts = true;
        drawBurstGlow(context, burst, palette, progress);
        drawBurstRing(context, burst, palette, time, progress);
        drawBurstParticles(context, burst, palette, time, progress);

        return true;
      });

      return hasActiveBursts;
    };

    const drawStaticFrame = (time = performance.now()) => {
      drawFrame(time, false);
    };

    // The resize sync keeps the canvas sharp while matching the hero's responsive box.
    const syncCanvas = () => {
      const bounds = stage.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      sizeRef.current = { width, height };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      specksRef.current = createAmbientSpecks(
        width,
        height,
        shouldReduceMotion ? 34 : 88
      );

      if (!isLoopRunning) {
        drawStaticFrame();
      }
    };

    const resizeObserver = new ResizeObserver(syncCanvas);
    resizeObserver.observe(stage);
    syncCanvas();

    // The canvas only animates while a burst is alive; otherwise it falls back to one static frame.
    const render = (time: number) => {
      const hasActiveBursts = drawFrame(time, !shouldReduceMotion);

      if (!hasActiveBursts) {
        isLoopRunning = false;
        drawStaticFrame(time);
        return;
      }

      frameId = window.requestAnimationFrame(render);
    };

    const startCanvasLoop = () => {
      if (isLoopRunning) {
        return;
      }

      isLoopRunning = true;
      frameId = window.requestAnimationFrame(render);
    };

    startCanvasLoopRef.current = startCanvasLoop;

    if (burstsRef.current.some((burst) => isBurstActive(burst, performance.now()))) {
      startCanvasLoop();
    } else {
      drawStaticFrame();
    }

    return () => {
      startCanvasLoopRef.current = null;
      isLoopRunning = false;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [isInViewport, shouldReduceMotion]);

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    const point = getLocalPointerPoint(event);
    spawnBurst(point.x, point.y);
  }

  return (
    <section
      ref={stageRef}
      className={cn("relative overflow-hidden", className)}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {/* This motion wrapper eases in the background system without animating the editorial content above it. */}
      <motion.div
        aria-hidden="true"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.72, ease: heroSignalEase, delay: 0.08 }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* These shared utilities keep the hero atmosphere anchored to the design system instead of ad-hoc page styling. */}
        <div className="ds-surface-hero-signal absolute inset-0 opacity-90" />
        <div className="ds-pattern-hero-signal-grid absolute inset-0 opacity-34" />

        {/* The desktop anchor nudges the cloud into the open space from the reference while mobile stays centered. */}
        <div className="absolute inset-x-0 top-[12%] bottom-[10%] flex items-center justify-center">
          <div
            className="relative h-[16rem] w-[34rem] max-w-[132vw] sm:h-[18rem] sm:w-[42rem] md:h-[22rem] md:w-[58rem] md:translate-x-[var(--hero-cloud-offset-x)] md:translate-y-[var(--hero-cloud-offset-y)]"
            style={desktopCloudStyle}
          >
            {/* The anchor box sets placement, while this larger internal stage prevents the loop from clipping against its own local bounds. */}
            <div className="absolute left-1/2 top-1/2 h-[150%] w-[130%] -translate-x-1/2 -translate-y-1/2 sm:h-[154%] sm:w-[128%] md:h-[160%] md:w-[128%]">
              <div className="absolute left-1/2 top-1/2 h-[16rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full ds-hero-signal-core opacity-72 blur-[42px] md:h-[24rem] md:w-[40rem]" />
              <StudioHeroInfinityCloud
                isInViewport={isInViewport}
                tuning={tuning}
                className="opacity-98 [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,1)_0%,rgba(0,0,0,0.98)_62%,rgba(0,0,0,0.88)_82%,rgba(0,0,0,0)_100%)]"
              />
            </div>
          </div>
        </div>

        {/* The canvas sits above the base cloud so click bursts can travel across the whole hero. */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      </motion.div>

      {children}
    </section>
  );
}

