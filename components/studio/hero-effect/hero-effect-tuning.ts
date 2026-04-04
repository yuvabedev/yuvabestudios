export type HeroInfinityCloudTuning = {
  scaleX: number;
  scaleY: number;
  zoom: number;
  particleCount: number;
  particleSpread: number;
};

export type HeroEffectBackdropTuning = HeroInfinityCloudTuning & {
  offsetX: number;
  offsetY: number;
};

export const defaultHeroInfinityCloudTuning: HeroInfinityCloudTuning = {
  scaleX: 1.85,
  scaleY: 2.4,
  zoom: 1.38,
  particleCount: 16250,
  particleSpread: 0.23,
};

export const defaultHeroEffectBackdropTuning: HeroEffectBackdropTuning = {
  ...defaultHeroInfinityCloudTuning,
  offsetX: 27,
  offsetY: -50,
};
