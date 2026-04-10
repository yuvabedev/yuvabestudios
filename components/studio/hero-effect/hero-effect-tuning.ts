export type HeroInfinityCloudTuning = {
  scaleX: number;
  scaleY: number;
  zoom: number;
  particleCount: number;
  pointSpread: number;
};

export type HeroHelixTuning = {
  cycleSeconds: number;
  turns: number;
  zoom: number;
  rotationYMax: number;
  rotationXMax: number;
  horizontalShift: number;
  span: number;
  amplitudeY: number;
  amplitudeZ: number;
  pointSpread: number;
  spreadScale: number;
  morphStart: number;
  morphEnd: number;
};

export type HeroEffectBackdropTuning = HeroInfinityCloudTuning & {
  offsetX: number;
  offsetY: number;
};

export type HeroEffectDebugTuning = {
  backdrop: HeroEffectBackdropTuning;
  helix: HeroHelixTuning;
};

// Flip this switch when you want the live hero tuning panels visible in the hero.
export const showHeroEffectTuningPanels = false;

export const defaultHeroInfinityCloudTuning: HeroInfinityCloudTuning = {
  scaleX: 1.85,
  scaleY: 1.41,
  zoom: 2,
  particleCount: 36000,
  pointSpread: 0.135,
};

export const defaultHeroEffectBackdropTuning: HeroEffectBackdropTuning = {
  ...defaultHeroInfinityCloudTuning,
  offsetX: -2,
  offsetY: -12,
};

export const defaultHeroHelixTuning: HeroHelixTuning = {
  cycleSeconds: 24,
  turns: 2.2,
  zoom: 1.04,
  rotationYMax: 0.38,
  rotationXMax: 0.04,
  horizontalShift: 0.1,
  span: 1.5,
  amplitudeY: 0.34,
  amplitudeZ: 0.26,
  pointSpread: 0.185,
  spreadScale: 0.54,
  morphStart: 0.08,
  morphEnd: 0.88,
};

// Fresh copies keep the debug panels editable without mutating the baked defaults.
export function createHeroEffectDebugTuning(): HeroEffectDebugTuning {
  return {
    backdrop: { ...defaultHeroEffectBackdropTuning },
    helix: { ...defaultHeroHelixTuning },
  };
}
