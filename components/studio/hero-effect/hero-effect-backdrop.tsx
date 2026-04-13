"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { StudioHeroEffectDebugControls } from "./hero-effect-debug-controls";
import {
  createHeroEffectDebugTuning,
  defaultHeroEffectBackdropTuning,
  defaultHeroHelixTuning,
  type HeroEffectBackdropTuning,
  type HeroHelixTuning,
  showHeroEffectTuningPanels,
} from "./hero-effect-tuning";
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
const heroGridWaveColumns = [
  { left: 7, opacity: 0.32 },
  { left: 18, opacity: 0.36 },
  { left: 31, opacity: 0.4 },
  { left: 46, opacity: 0.46 },
  { left: 58, opacity: 0.50 },
  { left: 67, opacity: 0.54 },
  { left: 74, opacity: 0.61 },
  { left: 79, opacity: 0.6 },
  { left: 83, opacity: 0.62 },
  { left: 88, opacity: 0.58 },
  { left: 96, opacity: 0.46 },
] as const;

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

function getStageSize(stage: HTMLElement) {
  const bounds = stage.getBoundingClientRect();

  return {
    width: Math.max(1, Math.round(bounds.width)),
    height: Math.max(1, Math.round(bounds.height)),
  };
}

function syncCanvasResolution(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function StudioHeroNoiseBackdrop({
  children,
  className,
  ...props
}: StudioHeroNoiseBackdropProps) {
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = shouldReduceMotion ?? false;
  const ambientCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const burstCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);
  const burstsRef = useRef<HeroSignalBurst[]>([]);
  const specksRef = useRef<HeroSignalSpeck[]>([]);
  const paletteRef = useRef<HeroSignalPalette | null>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const burstSeedRef = useRef(0);
  const startCanvasLoopRef = useRef<(() => void) | null>(null);
  const [isInViewport, setIsInViewport] = useState(true);
  const [debugTuning, setDebugTuning] = useState(createHeroEffectDebugTuning);
  const [areDebugPanelsVisible, setAreDebugPanelsVisible] = useState(true);
  const tuning = showHeroEffectTuningPanels
    ? debugTuning.backdrop
    : defaultHeroEffectBackdropTuning;
  const helixTuning = showHeroEffectTuningPanels
    ? debugTuning.helix
    : defaultHeroHelixTuning;

  const desktopCloudStyle = {
    "--hero-cloud-offset-x": `${tuning.offsetX}%`,
    "--hero-cloud-offset-y": `${tuning.offsetY}%`,
  } as CSSProperties;

  const updateBackdropTuning = useCallback(
    (key: keyof HeroEffectBackdropTuning, value: number) => {
      setDebugTuning((currentTuning) => ({
        ...currentTuning,
        backdrop: {
          ...currentTuning.backdrop,
          [key]: value,
        },
      }));
    },
    []
  );

  const updateHelixTuning = useCallback(
    (key: keyof HeroHelixTuning, value: number) => {
      setDebugTuning((currentTuning) => ({
        ...currentTuning,
        helix: {
          ...currentTuning.helix,
          [key]: value,
        },
      }));
    },
    []
  );

  const resetBackdropTuning = useCallback(() => {
    setDebugTuning((currentTuning) => ({
      ...currentTuning,
      backdrop: { ...defaultHeroEffectBackdropTuning },
    }));
  }, []);

  const resetHelixTuning = useCallback(() => {
    setDebugTuning((currentTuning) => ({
      ...currentTuning,
      helix: { ...defaultHeroHelixTuning },
    }));
  }, []);

  // Clicks only need a local seed and point; the rest of the burst visuals are delegated to the canvas helpers.
  const spawnBurst = useCallback(
    (pointX: number, pointY: number) => {
      const { width, height } = sizeRef.current;

      if (!width || !height) {
        return;
      }

      burstSeedRef.current += 1;
      const seed =
        burstSeedRef.current * 0.173 + pointX * 0.0013 + pointY * 0.0017;
      // The ripple stays restrained, but a longer window lets the wave read across more of the hero before it settles.
      const particleCount = reduceMotion ? 6 : 18;
      const duration = 1280;

      burstsRef.current.push(
        createHeroSignalBurst(
          seed,
          width,
          height,
          pointX,
          pointY,
          particleCount,
          duration
        )
      );

      if (burstsRef.current.length > 5) {
        burstsRef.current.shift();
      }

      startCanvasLoopRef.current?.();
    },
    [reduceMotion]
  );

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
    const ambientCanvas = ambientCanvasRef.current;

    if (!stage || !ambientCanvas || !isInViewport) {
      return;
    }

    const context = ambientCanvas.getContext("2d");

    if (!context) {
      return;
    }

    paletteRef.current = readHeroSignalPalette();
    let frameId = 0;

    const drawAmbientFrame = (time: number) => {
      const palette = paletteRef.current;
      const { width, height } = sizeRef.current;

      if (!palette || !width || !height) {
        return;
      }

      context.clearRect(0, 0, width, height);
      drawAmbientSpecks(context, specksRef.current, palette, reduceMotion ? 0 : time);
    };

    const renderAmbient = (time: number) => {
      drawAmbientFrame(time);
      frameId = window.requestAnimationFrame(renderAmbient);
    };

    // The ambient layer owns the floating blobs, so it stays independent from the burst canvas above it.
    const syncAmbientCanvas = () => {
      const { width, height } = getStageSize(stage);
      sizeRef.current = { width, height };
      syncCanvasResolution(ambientCanvas, context, width, height);
      specksRef.current = createAmbientSpecks(
        width,
        height,
        reduceMotion ? 34 : 88
      );
      drawAmbientFrame(performance.now());
    };

    const resizeObserver = new ResizeObserver(syncAmbientCanvas);
    resizeObserver.observe(stage);
    syncAmbientCanvas();

    if (!reduceMotion) {
      frameId = window.requestAnimationFrame(renderAmbient);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [isInViewport, reduceMotion]);

  useEffect(() => {
    const stage = stageRef.current;
    const burstCanvas = burstCanvasRef.current;
    startCanvasLoopRef.current = null;

    if (!stage || !burstCanvas || !isInViewport) {
      return;
    }

    const context = burstCanvas.getContext("2d");

    if (!context) {
      return;
    }

    paletteRef.current = readHeroSignalPalette();
    let frameId = 0;
    let isLoopRunning = false;

    const clearBurstCanvas = () => {
      const { width, height } = sizeRef.current;

      if (!width || !height) {
        return;
      }

      context.clearRect(0, 0, width, height);
    };

    const drawBurstFrame = (time: number) => {
      const palette = paletteRef.current;
      const { width, height } = sizeRef.current;

      if (!palette || !width || !height) {
        return false;
      }

      context.clearRect(0, 0, width, height);
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

    // The ripple canvas sits above the ambient blob layer and only wakes up while pulses are actively rendering.
    const syncBurstCanvas = () => {
      const { width, height } = getStageSize(stage);
      sizeRef.current = { width, height };
      syncCanvasResolution(burstCanvas, context, width, height);

      if (!isLoopRunning) {
        clearBurstCanvas();
      }
    };

    const resizeObserver = new ResizeObserver(syncBurstCanvas);
    resizeObserver.observe(stage);
    syncBurstCanvas();

    const renderBurst = (time: number) => {
      const hasActiveBursts = drawBurstFrame(time);

      if (!hasActiveBursts) {
        isLoopRunning = false;
        clearBurstCanvas();
        return;
      }

      frameId = window.requestAnimationFrame(renderBurst);
    };

    const startCanvasLoop = () => {
      if (isLoopRunning) {
        return;
      }

      isLoopRunning = true;
      frameId = window.requestAnimationFrame(renderBurst);
    };

    startCanvasLoopRef.current = startCanvasLoop;

    if (burstsRef.current.some((burst) => isBurstActive(burst, performance.now()))) {
      startCanvasLoop();
    } else {
      clearBurstCanvas();
    }

    return () => {
      startCanvasLoopRef.current = null;
      isLoopRunning = false;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
    };
  }, [isInViewport]);

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    const point = getLocalPointerPoint(event);
    spawnBurst(point.x, point.y);
  }

  return (
    <section
      ref={stageRef}
      className={cn("relative overflow-x-hidden overflow-y-visible", className)}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {/* This motion wrapper eases in the background system without animating the editorial content above it. */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.72, ease: heroSignalEase, delay: 0.08 }}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* These shared utilities keep the hero atmosphere anchored to the design system instead of ad-hoc page styling. */}
        <div className="ds-surface-hero-signal absolute inset-0 opacity-90" />
        <div className="ds-pattern-hero-signal-grid absolute inset-0 opacity-50" />
        {/* These art-directed vertical guides keep the grid wider behind the text, tighter at the mid-right crest, then wider again. */}
        <div className="absolute inset-0">
          {heroGridWaveColumns.map((column) => (
            <div
              key={column.left}
              className="ds-line-hero-signal-grid absolute inset-y-0 w-px"
              style={{ left: `${column.left}%`, opacity: column.opacity }}
            />
          ))}
        </div>

        {/* Desktop uses a fixed top anchor plus responsive growth so ultra-wide monitors keep the same visual placement instead of dropping the loop lower. */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center md:top-[clamp(14rem,22vh,17rem)] md:-translate-y-0">
          <div
            className="relative h-[16rem] w-[34rem] max-w-[132vw] sm:h-[18rem] sm:w-[42rem] md:h-[clamp(22rem,24vw,30rem)] md:w-[clamp(58rem,64vw,84rem)] md:max-w-none md:translate-x-[var(--hero-cloud-offset-x)] md:translate-y-[var(--hero-cloud-offset-y)]"
            style={desktopCloudStyle}
          >
            {/* The anchor box sets placement, while this larger internal stage prevents the loop from clipping against its own local bounds. */}
            <div className="absolute left-1/2 top-1/2 h-[160%] w-[176%] -translate-x-1/2 -translate-y-1/2 sm:h-[164%] sm:w-[186%] md:h-[176%] md:w-[208%]">
              <StudioHeroInfinityCloud
                isInViewport={isInViewport}
                tuning={tuning}
                helixTuning={helixTuning}
                className="opacity-98 [mask-image:radial-gradient(ellipse_148%_88%_at_center,rgba(0,0,0,1)_0%,rgba(0,0,0,1)_82%,rgba(0,0,0,0.97)_92%,rgba(0,0,0,0.62)_98%,rgba(0,0,0,0)_100%)]"
              />
            </div>
          </div>
        </div>

        {/* The ambient canvas gives the background blobs their own bobbing depth, separate from the ripple system. */}
        <canvas
          ref={ambientCanvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* The ripple canvas sits above the ambient blobs, so pulses no longer visually drag the background dots around. */}
        <canvas
          ref={burstCanvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

      </motion.div>

      {children}

      {showHeroEffectTuningPanels && areDebugPanelsVisible ? (
        <div className="pointer-events-none absolute left-4 top-4 z-20">
          {/* The tuning overlay is code-switched on for design iteration and stays isolated from the hero click surface. */}
          <StudioHeroEffectDebugControls
            backdropTuning={debugTuning.backdrop}
            helixTuning={debugTuning.helix}
            onBackdropValueChange={updateBackdropTuning}
            onHelixValueChange={updateHelixTuning}
            onResetBackdrop={resetBackdropTuning}
            onResetHelix={resetHelixTuning}
          />
        </div>
      ) : null}

      {showHeroEffectTuningPanels ? (
        <div
          className="pointer-events-auto absolute bottom-4 right-4 z-20"
          onPointerDownCapture={(event) => event.stopPropagation()}
        >
          {/* This runtime toggle hides the debug overlay without disabling the underlying code-switched tuning system. */}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setAreDebugPanelsVisible((isVisible) => !isVisible)}
          >
            {areDebugPanelsVisible ? "Hide Controls" : "Show Controls"}
          </Button>
        </div>
      ) : null}
    </section>
  );
}

