# Hero Effect Module

## Overview

The homepage hero uses a layered interactive backdrop with the editorial copy and CTA sitting above it.

The effect is made of four parts:

1. A shared light brand surface and grid texture from the design system.
2. A centered Three.js infinity-shaped particle cloud.
3. A click-triggered 2D dispersion burst that expands outward from the click point.
4. The hero text and CTA rendered above the full backdrop.

The current visual direction is:

- the animated form sits in the center of the hero
- the infinity shape is implied by particle density, not by a visible line stroke
- the cursor-following glow has been removed
- the temporary tuning panel has been removed
- offscreen animation work is paused automatically
- the click burst still works across the full hero section

The current baked values are:

- `Path Width`: `1.85`
- `Path Height`: `2.40`
- `View Zoom`: `1.38`
- `Density`: `24375` base desktop target
- `Point Spread`: `0.23`
- `Desktop X`: `27%`
- `Desktop Y`: `-50%`

## Module Ownership

### [`../studio-hero.tsx`](../studio-hero.tsx)

Owns the visible hero content:

- headline
- supporting copy
- CTA
- layering order for content above the animated backdrop

### [`./index.ts`](./index.ts)

Owns the public module entrypoint:

- re-exports the hero effect pieces
- gives the hero section one stable import path

### [`./hero-effect-backdrop.tsx`](./hero-effect-backdrop.tsx)

Owns the full-section backdrop shell:

- wraps the entire hero section
- pauses both animation systems when the hero leaves the viewport
- handles click events across the hero
- renders the 2D canvas burst overlay
- keeps the canvas static until a burst is active
- places the shared surface, grid, bloom, and Three.js layer behind the content

### [`./hero-effect-burst.ts`](./hero-effect-burst.ts)

Owns the 2D burst system:

- shared burst data types
- ambient speck generation
- burst creation
- canvas drawing helpers for glow, noisy rings, and dispersing particles

### [`./hero-effect-infinity-cloud.tsx`](./hero-effect-infinity-cloud.tsx)

Owns the Three.js infinity cloud:

- creates the WebGL renderer
- builds the orthographic scene
- computes positions along a horizontal infinity curve
- attaches a dense point cloud to that curve
- scales particle budgets down on mobile and tablet
- animates the particle field with slight drift so the form stays alive

### [`./hero-effect-utils.ts`](./hero-effect-utils.ts)

Owns small shared helpers:

- math constants and easing helpers
- seeded randomness
- CSS token reading
- RGBA conversion for canvas colors

### [`../../../app/globals.css`](../../../app/globals.css)

Owns the shared hero-surface utilities:

- `--gradient-hero-signal-stage`
- `--gradient-hero-signal-core`
- `--pattern-hero-signal-grid`
- `.ds-surface-hero-signal`
- `.ds-hero-signal-core`
- `.ds-pattern-hero-signal-grid`

### [`../../../package.json`](../../../package.json)

Tracks the added runtime and typing dependencies for the Three.js layer:

- `three`
- `@types/three`

## How The Effect Is Built

## 1. Base Surface

The hero backdrop starts with a shared light gradient and subtle grid texture so the animation sits inside the brand system rather than on a blank canvas.

This keeps the hero visually connected to the rest of the site and avoids one-off page styling.

## 2. Three.js Infinity Cloud

The infinity cloud is not a static asset. It is generated procedurally in Three.js.

The shape comes from a parametric horizontal infinity path:

- `x = sin(t) * scaleX`
- `y = sin(2t) * 0.5 * scaleY`

Each particle gets:

- a phase along the curve
- a small normal offset away from the curve
- a slight animated drift value
- a brand color sampled from the violet, cyan, and yellow palette

The important choice is density:

- the particle count is high enough that the eye reads a soft ribbon of points
- the curve line itself is not drawn anymore
- the shape is visible through concentration, not outline

The cloud uses additive blending, small point sizes, and subtle group motion so it feels like a living signal instead of a rigid diagram.

## 3. Click Dispersion Burst

The click effect is a separate 2D canvas layer on top of the surface and beneath the text.

When the user clicks anywhere in the hero:

- the click position is converted into local hero coordinates
- a burst is seeded at that location
- the burst draws a noisy expanding ring
- a soft bloom appears underneath the ring
- particles detach from the ring and disperse outward

This is why the hero currently feels like a blend of:

- a stable center-field identity shape
- an interaction response that can happen anywhere in the section

When no burst is active, the canvas falls back to a static ambient frame instead of running continuously.

## 4. Content Layering

The copy and CTA are intentionally untouched by the animation system.

The layering order is:

1. CSS surface and grid
2. centered Three.js infinity cloud
3. canvas click burst overlay
4. hero content container
5. trust strip

That keeps readability high and makes the effect feel atmospheric rather than intrusive.

## Why It Works

The effect reads well because each layer has a different job:

- the CSS surface gives brand atmosphere
- the Three.js cloud gives one strong focal form
- the burst gives interaction feedback
- the text stays editorial and calm

It also now behaves more responsibly at runtime:

- the hero pauses when it scrolls away
- the canvas only spins up during actual burst activity
- smaller screens automatically use lower particle budgets

This is also why removing the cursor-following gradient improved it: the cloud already provides a strong center, so a second hover-led glow added too much competition.

## Tuning Knobs

If this effect needs refinement later, these are the main controls to change.

There is no live tuning UI in the hero anymore. The shared defaults now live in [`./hero-effect-tuning.ts`](./hero-effect-tuning.ts).

## Infinity cloud density and softness

In [`./hero-effect-infinity-cloud.tsx`](./hero-effect-infinity-cloud.tsx):

- `particleCount`
- `particleSpread`
- `particleDrift`
- responsive density scaling inside `getResponsiveParticleCount`
- `particleGlowMaterial.size`
- `particleCoreMaterial.size`
- `particleGlowMaterial.opacity`
- `particleCoreMaterial.opacity`

Increase density and lower spread to make the shape feel fuller and less skeletal.

## Infinity cloud scale and placement

In [`./hero-effect-infinity-cloud.tsx`](./hero-effect-infinity-cloud.tsx):

- `tuning.scaleX`
- `tuning.scaleY`
- camera frustum sizing inside `syncRendererSize`

In [`./hero-effect-tuning.ts`](./hero-effect-tuning.ts):

- `scaleX`
- `scaleY`
- `zoom`
- `offsetX`
- `offsetY`

In [`./hero-effect-backdrop.tsx`](./hero-effect-backdrop.tsx):

- the centered wrapper dimensions around `StudioHeroInfinityCloud`

## Click burst behavior

In [`./hero-effect-burst.ts`](./hero-effect-burst.ts):

- burst particle count
- burst duration
- ring amplitude
- ring line width
- bloom opacity

This controls how dramatic or restrained the click response feels.

## Shared art direction

In [`../../../app/globals.css`](../../../app/globals.css):

- hero surface gradient
- center bloom gradient
- grid texture opacity and scale

These should stay in the design-system layer instead of being hardcoded into JSX.

## Current State Summary

As of now, the hero effect is:

- full-section
- centered
- Three.js-based for the infinity cloud
- dense enough that the loop path is hidden
- interactive via click dispersion
- configured through baked module defaults instead of an on-page tuning panel
- brand-aligned through shared surface tokens

If we extend it later, the cleanest next step would be to let the click burst temporarily disturb the Three.js particles too, so the burst and the cloud feel like one system instead of two stacked systems.

