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
  distance: number;
  size: number;
  sway: number;
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
  drift: number;
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

    return {
      x: seed() * width,
      y: seed() * height,
      radius: 0.8 + seed() * 2.2,
      phase: seed() * TAU,
      drift: 4 + seed() * 11,
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
  const maxRadius = Math.max(width, height) * 0.43;

  return {
    x,
    y,
    start: performance.now(),
    duration,
    baseRadius: Math.max(18, Math.min(width, height) * 0.07),
    maxRadius,
    seed,
    particles: Array.from({ length: particleCount }, () => ({
      angle: random() * TAU,
      distance: maxRadius * (0.42 + random() * 0.52),
      size: 1.1 + random() * 2.8,
      sway: 0.12 + random() * 0.4,
      life: 0.48 + random() * 0.46,
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

// These drifting specks provide the low-level procedural grain that makes the canvas feel signal-driven rather than flat.
export function drawAmbientSpecks(
  context: CanvasRenderingContext2D,
  specks: HeroSignalSpeck[],
  palette: HeroSignalPalette,
  time: number
) {
  context.save();
  context.globalCompositeOperation = "lighter";

  for (const speck of specks) {
    const wobble = Math.sin(time * 0.001 + speck.phase);
    const shimmer = 0.12 + ((wobble + 1) / 2) * 0.16;
    const x = speck.x + Math.cos(time * 0.0005 + speck.phase) * speck.drift;
    const y = speck.y + Math.sin(time * 0.0007 + speck.phase) * speck.drift * 0.8;

    context.beginPath();
    context.fillStyle = withAlpha(getPaletteColor(palette, speck.colorMix), shimmer);
    context.arc(x, y, speck.radius + shimmer * 0.8, 0, TAU);
    context.fill();
  }

  context.restore();
}

// This noisy ring is the main Codrops-inspired burst: an expanding radial seam with jitter instead of a clean circle.
export function drawBurstRing(
  context: CanvasRenderingContext2D,
  burst: HeroSignalBurst,
  palette: HeroSignalPalette,
  time: number,
  progress: number
) {
  const eased = easeOutCubic(progress);
  const radius = burst.baseRadius + burst.maxRadius * eased;
  const amplitude = 18 * (1 - progress) + 4;
  const alpha = Math.pow(1 - progress, 1.35);
  const pathPoints = 68;

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 18 * (1 - progress) + 2.5;
  context.strokeStyle = withAlpha(palette.purple, 0.34 * alpha);
  context.shadowBlur = 24;
  context.shadowColor = withAlpha(palette.purple, 0.26 * alpha);

  context.beginPath();

  for (let index = 0; index <= pathPoints; index += 1) {
    const angle = (index / pathPoints) * TAU;
    const distortion =
      Math.sin(angle * 5 + burst.seed * 9 + time * 0.005) * 0.58 +
      Math.cos(angle * 9 - burst.seed * 11 - time * 0.0038) * 0.34;
    const ringRadius = radius + distortion * amplitude;
    const pointX = burst.x + Math.cos(angle) * ringRadius;
    const pointY = burst.y + Math.sin(angle) * ringRadius;

    if (index === 0) {
      context.moveTo(pointX, pointY);
    } else {
      context.lineTo(pointX, pointY);
    }
  }

  context.stroke();
  context.shadowBlur = 0;
  context.lineWidth = 6 * (1 - progress) + 1.4;
  context.strokeStyle = withAlpha(palette.cyan, 0.22 * alpha);
  context.stroke();

  for (let index = 0; index < pathPoints; index += 1) {
    const angle = (index / pathPoints) * TAU;
    const distortion =
      Math.sin(angle * 7 + burst.seed * 13 + time * 0.0048) * 0.52 +
      Math.cos(angle * 11 - burst.seed * 7 - time * 0.0034) * 0.32;
    const ringRadius = radius + distortion * (amplitude + 8);
    const pointX = burst.x + Math.cos(angle) * ringRadius;
    const pointY = burst.y + Math.sin(angle) * ringRadius;
    const size = 1.2 + Math.abs(distortion) * 2.6 + (1 - progress) * 1.5;

    context.beginPath();
    context.fillStyle = withAlpha(
      getPaletteColor(palette, (burst.seed + index * 0.07) % 1),
      0.58 * alpha
    );
    context.arc(pointX, pointY, size, 0, TAU);
    context.fill();
  }

  context.restore();
}

// The soft bloom under each burst helps the noisy edge read as a dispersion wave instead of a simple particle explosion.
export function drawBurstGlow(
  context: CanvasRenderingContext2D,
  burst: HeroSignalBurst,
  palette: HeroSignalPalette,
  progress: number
) {
  const eased = easeOutCubic(progress);
  const radius = burst.baseRadius + burst.maxRadius * eased;
  const alpha = Math.pow(1 - progress, 1.2);
  const gradient = context.createRadialGradient(
    burst.x,
    burst.y,
    0,
    burst.x,
    burst.y,
    radius * 1.25
  );

  gradient.addColorStop(0, withAlpha(palette.yellow, 0.24 * alpha));
  gradient.addColorStop(0.34, withAlpha(palette.purple, 0.18 * alpha));
  gradient.addColorStop(0.6, withAlpha(palette.cyan, 0.1 * alpha));
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  context.save();
  context.globalCompositeOperation = "lighter";
  context.fillStyle = gradient;
  context.fillRect(
    burst.x - radius * 1.25,
    burst.y - radius * 1.25,
    radius * 2.5,
    radius * 2.5
  );
  context.restore();
}

// These particles break away from the ring so the effect finishes as a dispersion cloud instead of a single expanding outline.
export function drawBurstParticles(
  context: CanvasRenderingContext2D,
  burst: HeroSignalBurst,
  palette: HeroSignalPalette,
  time: number,
  progress: number
) {
  context.save();
  context.globalCompositeOperation = "lighter";

  for (const particle of burst.particles) {
    const localProgress = clamp(progress / particle.life, 0, 1);

    if (localProgress >= 1) {
      continue;
    }

    const eased = easeOutQuart(localProgress);
    const distance = burst.baseRadius + particle.distance * eased;
    const swirl =
      Math.sin(time * 0.0035 + particle.phase) * particle.sway * (1 - localProgress);
    const pointX = burst.x + Math.cos(particle.angle + swirl) * distance;
    const pointY = burst.y + Math.sin(particle.angle + swirl) * distance;
    const alpha = Math.pow(1 - localProgress, 1.6) * 0.72;
    const width = particle.size * (1.8 - localProgress * 0.55);
    const height = particle.size * (1.15 - localProgress * 0.28);

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

