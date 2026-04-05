import {
  TAU,
  clamp,
  createSeededRandom,
  easeOutCubic,
  easeOutQuart,
  readCssToken,
  withAlpha,
} from "./hero-effect-utils";

export type HeroSignalParticle = {
  angle: number;
  bandOffset: number;
  trail: number;
  size: number;
  wobble: number;
  life: number;
  phase: number;
  colorMix: number;
};

export type HeroSignalBurst = {
  x: number;
  y: number;
  start: number;
  duration: number;
  baseRadius: number;
  maxRadius: number;
  bandIndex: number;
  seed: number;
  particles: HeroSignalParticle[];
};

export type HeroSignalPalette = {
  purple: string;
  cyan: string;
  yellow: string;
  orange: string;
};

export type HeroSignalSpeck = {
  x: number;
  y: number;
  radius: number;
  phase: number;
  depth: number;
  drift: number;
  bobAmplitude: number;
  bobSpeed: number;
  colorMix: number;
};

// The burst and ambient specks share the same palette so every interaction stays inside the brand system.
export function readHeroSignalPalette(): HeroSignalPalette {
  return {
    purple: readCssToken("--purple-500", "#5829c7"),
    cyan: readCssToken("--cyan-500", "#2bb7c7"),
    yellow: readCssToken("--yellow-500", "#ffca2d"),
    orange: readCssToken("--orange-500", "#f9a91f"),
  };
}

// The idle specks give the canvas a low-level signal shimmer even when no burst is active.
export function createAmbientSpecks(
  width: number,
  height: number,
  count: number
): HeroSignalSpeck[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = createSeededRandom(index + width + height);
    const radius = 0.8 + seed() * 2.2;
    const depth = clamp((radius - 0.8) / 2.2, 0, 1);

    return {
      x: seed() * width,
      y: seed() * height,
      radius,
      phase: seed() * TAU,
      depth,
      drift: 2.5 + depth * 8.5 + seed() * 2.5,
      bobAmplitude: 1.8 + depth * 8.2,
      bobSpeed: 0.00045 + depth * 0.0004,
      colorMix: seed(),
    };
  });
}

// Each click burst is seeded so the shape feels organic without becoming fully random or off-brand.
export function createHeroSignalBurst(
  seed: number,
  width: number,
  height: number,
  x: number,
  y: number,
  particleCount: number,
  duration: number
): HeroSignalBurst {
  const random = createSeededRandom(seed);
  const minDimension = Math.min(width, height);
  const maxRadius = minDimension * 0.34;

  return {
    x,
    y,
    start: performance.now(),
    duration,
    baseRadius: Math.max(16, minDimension * 0.04),
    maxRadius,
    bandIndex: Math.floor(random() * 4),
    seed,
    particles: Array.from({ length: particleCount }, () => ({
      angle: random() * TAU,
      bandOffset: (random() - 0.5) * 12,
      trail: 8 + random() * 10,
      size: 0.9 + random() * 1.7,
      wobble: 0.8 + random() * 2,
      life: 0.56 + random() * 0.22,
      phase: random() * TAU,
      colorMix: random(),
    })),
  };
}

// A simple palette splitter keeps the procedural color picks legible and anchored to a fixed art direction.
function getPaletteColor(palette: HeroSignalPalette, colorMix: number) {
  if (colorMix < 0.28) {
    return palette.yellow;
  }

  if (colorMix < 0.62) {
    return palette.purple;
  }

  if (colorMix < 0.82) {
    return palette.cyan;
  }

  return palette.orange;
}

function getBurstBandColor(
  palette: HeroSignalPalette,
  bandIndex: number,
  offset = 0
) {
  const brandColors = [
    palette.purple,
    palette.cyan,
    palette.yellow,
    palette.orange,
  ];
  const normalizedIndex =
    ((bandIndex + offset) % brandColors.length + brandColors.length) %
    brandColors.length;

  return brandColors[normalizedIndex];
}

// These drifting specks use size-based motion and opacity so the larger blobs feel optically closer than the tiny distant ones.
export function drawAmbientSpecks(
  context: CanvasRenderingContext2D,
  specks: HeroSignalSpeck[],
  palette: HeroSignalPalette,
  time: number
) {
  context.save();
  context.globalCompositeOperation = "lighter";

  for (const speck of specks) {
    const twinkle = (Math.sin(time * 0.0009 + speck.phase) + 1) / 2;
    const x =
      speck.x +
      Math.cos(time * (0.00016 + speck.depth * 0.0002) + speck.phase) *
        speck.drift *
        (0.18 + speck.depth * 0.22);
    const y =
      speck.y +
      Math.sin(time * speck.bobSpeed + speck.phase) * speck.bobAmplitude;
    const alpha = 0.05 + speck.depth * 0.12 + twinkle * (0.05 + speck.depth * 0.06);
    const renderRadius =
      speck.radius * (0.92 + speck.depth * 0.18) +
      twinkle * (0.24 + speck.depth * 0.52);

    context.beginPath();
    context.fillStyle = withAlpha(getPaletteColor(palette, speck.colorMix), alpha);
    context.arc(x, y, renderRadius, 0, TAU);
    context.fill();
  }

  context.restore();
}

function getRippleRadius(burst: HeroSignalBurst, progress: number) {
  const eased = easeOutCubic(progress);

  return burst.baseRadius + burst.maxRadius * eased;
}

function getRippleDistortion(
  angle: number,
  burst: HeroSignalBurst,
  time: number,
  amplitude: number,
  phaseOffset = 0
) {
  const wave =
    Math.sin(angle * 2 + burst.seed * 6 + time * 0.0016 + phaseOffset) * 0.62 +
    Math.cos(angle * 3 - burst.seed * 4 - time * 0.0011 - phaseOffset) * 0.38;

  return wave * amplitude;
}

function traceRipplePath(
  context: CanvasRenderingContext2D,
  burst: HeroSignalBurst,
  time: number,
  radius: number,
  amplitude: number,
  phaseOffset = 0
) {
  const pathPoints = 88;

  context.beginPath();

  for (let index = 0; index <= pathPoints; index += 1) {
    const angle = (index / pathPoints) * TAU;
    const ringRadius =
      radius + getRippleDistortion(angle, burst, time, amplitude, phaseOffset);
    const pointX = burst.x + Math.cos(angle) * ringRadius;
    const pointY = burst.y + Math.sin(angle) * ringRadius;

    if (index === 0) {
      context.moveTo(pointX, pointY);
    } else {
      context.lineTo(pointX, pointY);
    }
  }
}

// The ripple ring keeps the click response controlled and circular, with only a faint echo behind the main wavefront.
export function drawBurstRing(
  context: CanvasRenderingContext2D,
  burst: HeroSignalBurst,
  palette: HeroSignalPalette,
  time: number,
  progress: number
) {
  const radius = getRippleRadius(burst, progress);
  const primaryAmplitude = 0.8 + (1 - progress) * 1.6;
  const echoRadius = Math.max(burst.baseRadius * 0.68, radius - (10 + (1 - progress) * 8));
  const echoAmplitude = primaryAmplitude * 0.72;
  const alpha = Math.pow(1 - progress, 1.45);
  const primaryColor = getBurstBandColor(palette, burst.bandIndex);
  const echoColor = getBurstBandColor(palette, burst.bandIndex, 1);

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.shadowBlur = 14;
  context.shadowColor = withAlpha(primaryColor, 0.12 * alpha);
  context.lineWidth = 1.5 + (1 - progress) * 4.5;
  context.strokeStyle = withAlpha(primaryColor, 0.26 * alpha);
  traceRipplePath(context, burst, time, radius, primaryAmplitude);
  context.stroke();

  context.shadowBlur = 0;
  context.lineWidth = 0.8 + (1 - progress) * 2.2;
  context.strokeStyle = withAlpha(echoColor, 0.14 * alpha);
  traceRipplePath(context, burst, time, echoRadius, echoAmplitude, 0.9);
  context.stroke();

  context.restore();
}

// The ripple halo keeps the center clear and concentrates the glow around the wave band instead of filling the whole circle.
export function drawBurstGlow(
  context: CanvasRenderingContext2D,
  burst: HeroSignalBurst,
  palette: HeroSignalPalette,
  progress: number
) {
  const radius = getRippleRadius(burst, progress);
  const alpha = Math.pow(1 - progress, 1.35);
  const haloOuterRadius = radius + 42;
  const ringStop = clamp(radius / haloOuterRadius, 0.18, 0.92);
  const innerHaloColor = getBurstBandColor(palette, burst.bandIndex, 1);
  const ringColor = getBurstBandColor(palette, burst.bandIndex);
  const outerHaloColor = getBurstBandColor(palette, burst.bandIndex, 2);
  const gradient = context.createRadialGradient(
    burst.x,
    burst.y,
    0,
    burst.x,
    burst.y,
    haloOuterRadius
  );

  gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(Math.max(0, ringStop - 0.18), "rgba(255, 255, 255, 0)");
  gradient.addColorStop(
    Math.max(0, ringStop - 0.06),
    withAlpha(innerHaloColor, 0.035 * alpha)
  );
  gradient.addColorStop(ringStop, withAlpha(ringColor, 0.12 * alpha));
  gradient.addColorStop(
    Math.min(1, ringStop + 0.08),
    withAlpha(outerHaloColor, 0.06 * alpha)
  );
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.save();
  context.globalCompositeOperation = "lighter";
  context.fillStyle = gradient;
  context.fillRect(
    burst.x - haloOuterRadius,
    burst.y - haloOuterRadius,
    haloOuterRadius * 2,
    haloOuterRadius * 2
  );
  context.restore();
}

// These particles lightly trail the ring so the click reads as a ripple with particulate texture, not an outward blast.
export function drawBurstParticles(
  context: CanvasRenderingContext2D,
  burst: HeroSignalBurst,
  palette: HeroSignalPalette,
  time: number,
  progress: number
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  const wavefrontRadius = getRippleRadius(burst, progress);

  for (const particle of burst.particles) {
    const localProgress = clamp(progress / particle.life, 0, 1);

    if (localProgress >= 1) {
      continue;
    }

    const eased = easeOutQuart(localProgress);
    const trailOffset = particle.trail * (0.82 + (1 - eased) * 0.18);
    const particleRadius = Math.max(
      burst.baseRadius * 0.35,
      Math.min(
        wavefrontRadius - 1.5,
        wavefrontRadius - trailOffset + particle.bandOffset * (1 - localProgress * 0.3)
      )
    );
    const tangentialOffset =
      Math.sin(time * 0.0024 + particle.phase) *
      particle.wobble *
      (1 - localProgress);
    const radialX = Math.cos(particle.angle);
    const radialY = Math.sin(particle.angle);
    const tangentX = -radialY;
    const tangentY = radialX;
    const pointX = burst.x + radialX * particleRadius + tangentX * tangentialOffset;
    const pointY = burst.y + radialY * particleRadius + tangentY * tangentialOffset;
    const alpha = Math.pow(1 - localProgress, 1.9) * 0.4;
    const width = particle.size * (1.22 - localProgress * 0.16);
    const height = particle.size * (0.92 - localProgress * 0.12);

    context.beginPath();
    context.fillStyle = withAlpha(
      getPaletteColor(palette, particle.colorMix),
      alpha
    );
    context.ellipse(pointX, pointY, width, height, particle.angle, 0, TAU);
    context.fill();
  }

  context.restore();
}



