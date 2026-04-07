# Hero Effect Module

## Overview

The homepage hero uses a layered interactive backdrop with the editorial copy and CTA sitting above it.

The effect is made of five parts:

1. A shared light brand surface and grid texture from the design system.
2. A centered Three.js particle cloud that breathes between an infinity loop and a subtle double helix.
3. A floating ambient blob layer with depth-based bobbing.
4. A click-triggered 2D ripple pulse with restrained trailing particles.
5. The hero text and CTA rendered above the full backdrop.

The current visual direction is:

- the animated form sits in the center of the hero
- the infinity shape is implied by particle density, not by a visible line stroke
- the cloud now slowly breathes into a subtle horizontal double helix and back
- the cursor-following glow has been removed
- the live tuning panels are controlled by a code switch in `hero-effect-tuning.ts`
- offscreen animation work is paused automatically
- the click ripple still works across the full hero section
- ripple pulses are now click-only, so they no longer sync up with the helix morph timing

The current baked values are:

- `Path Width`: `1.85`
- `Path Height`: `1.41`
- `View Zoom`: `1.90`
- `Density`: `36000` base desktop target
- `Infinity Spread`: `0.155`
- `Desktop X`: `-2%`
- `Desktop Y`: `-22%`

The current baked helix values are:

- `Cycle Seconds`: `24`
- `Turns`: `2.20`
- `Helix Zoom`: `1.04`
- `Horizontal Shift`: `0.10`
- `Screen Span`: `1.50`
- `Helix Height`: `0.34`
- `Helix Depth`: `0.26`
- `Helix Spread`: `0.185`
- `Rotate Y`: `0.38`
- `Rotate X`: `0.04`
- `Motion Tighten`: `0.54`
- `Morph Start`: `0.08`
- `Morph End`: `0.88`

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
- renders a dedicated ambient blob canvas
- renders a separate burst canvas above the blob layer
- conditionally mounts the live debug panels when the code switch is enabled
- places the shared surface, grid, and Three.js layer behind the content

### [`./hero-effect-debug-controls.tsx`](./hero-effect-debug-controls.tsx)

Owns the optional live tuning UI:

- renders one panel for the shared cloud and stage values
- renders one panel for the helix-only morph values
- keeps the controls visually aligned with the rest of the hero module
- stops slider and button interactions from triggering hero ripple clicks

### [`./hero-effect-burst.ts`](./hero-effect-burst.ts)

Owns the 2D burst system:

- shared burst data types
- ambient speck generation
- burst creation
- canvas drawing helpers for the ambient depth-bobbing blobs
- canvas drawing helpers for the ripple halo, circular rings, and ring-trailing particles

### [`./hero-effect-infinity-cloud.tsx`](./hero-effect-infinity-cloud.tsx)

Owns the Three.js infinity cloud:

- creates the WebGL renderer
- builds the orthographic scene
- computes positions for both a horizontal infinity curve and a subtle 3D double helix
- blends the same point cloud between those two targets on a slow breathing loop
- accepts live helix tuning values when the debug panels are on
- scales particle budgets down on mobile and tablet
- animates the particle field with slight drift so the form stays alive

### [`./hero-effect-tuning.ts`](./hero-effect-tuning.ts)

Owns the baked defaults and the debug switch:

- stores the shared infinity cloud defaults
- stores the helix morph defaults
- exposes `showHeroEffectTuningPanels`
- creates fresh copies for the optional live debug state

### [`./hero-effect-utils.ts`](./hero-effect-utils.ts)

Owns small shared helpers:

- math constants and easing helpers
- seeded randomness
- CSS token reading
- RGBA conversion for canvas colors

### [`../../../app/globals.css`](../../../app/globals.css)

Owns the shared hero-surface utilities:

- `--gradient-hero-signal-stage`
- `--gradient-hero-copy-wash`
- `--pattern-hero-signal-grid`
- `.ds-surface-hero-signal`
- `.ds-overlay-hero-copy-wash`
- `.ds-pattern-hero-signal-grid`

### [`../../../package.json`](../../../package.json)

Tracks the added runtime and typing dependencies for the Three.js layer:

- `three`
- `@types/three`

## How The Effect Is Built

## 1. Base Surface

The hero backdrop starts with a shared light gradient and one softer large-format grid texture so the animation sits inside the brand system rather than on a blank canvas.

This keeps the hero visually connected to the rest of the site and avoids one-off page styling.

A dedicated left-to-right copy wash is anchored behind the hero copy block, with negative bleed and softened edges, so the headline stays readable without looking boxed into the container.

## 2. Three.js Morphing Cloud

The hero cloud is not a static asset. It is generated procedurally in Three.js.

The base shape comes from a parametric horizontal infinity path:

- `x = sin(t) * scaleX`
- `y = sin(2t) * 0.5 * scaleY`

The same particle field also has a second target: a horizontal double helix with two stable strands.

The cloud slowly breathes between those two structures:

- infinity
- mid-morph hybrid
- subtle 3D helix
- back to infinity

Each particle gets:

- a phase along the curve
- a small normal offset away from the curve
- a slight animated drift value
- a brand color sampled from the violet, cyan, and yellow palette

The important choice is density:

- the particle count is high enough that the eye reads a soft ribbon of points
- the curve line itself is not drawn anymore
- the shape is visible through concentration, not outline

The cloud uses additive blending, small point sizes, and restrained group rotation so it feels like a living signal instead of a rigid diagram.

## 3. Ambient Blob Layer

The small colored blobs are now rendered on their own canvas layer, separate from the ripple canvas.

Each blob uses size as a depth cue:

- larger blobs bob farther and drift a bit more
- smaller blobs move less and stay fainter
- all blobs keep a soft shimmer so the field feels atmospheric instead of static

Because this layer is isolated from the ripple canvas, the background blobs no longer look like they are being pushed or brightened by each pulse.

## 4. Click Ripple Pulse

The click effect is a separate 2D canvas layer on top of the surface and beneath the text.

When the user clicks anywhere in the hero:

- the click position is converted into local hero coordinates
- a burst is seeded at that location
- the pulse draws one restrained expanding circular ring
- a faint trailing echo ring follows behind it
- a transparent-center halo softly hugs the wave band
- each pulse picks from a shared set of brand colors
- particles stay close to the ring and lightly trail the wavefront

This is why the hero currently feels like a blend of:

- a stable center-field identity shape
- an interaction response that can happen anywhere in the section

When no burst is active, the ripple canvas goes idle while the ambient blob canvas continues its gentle depth motion.

## 5. Content Layering

The copy and CTA are intentionally untouched by the animation system.

The layering order is:

1. CSS surface and grid
2. centered Three.js infinity cloud
3. ambient blob canvas
4. ripple burst canvas
5. hero content container
6. trust strip

That keeps readability high and makes the effect feel atmospheric rather than intrusive.

## Why It Works

The effect reads well because each layer has a different job:

- the CSS surface gives brand atmosphere
- the Three.js cloud gives one strong focal form
- the burst gives interaction feedback
- the ripple stays controlled instead of explosive
- the text stays editorial and calm

It also now behaves more responsibly at runtime:

- the hero pauses when it scrolls away
- the ripple canvas only spins up during actual burst activity
- the ambient blob canvas keeps its bobbing motion only while the hero is in view
- smaller screens automatically use lower particle budgets

This is also why removing the cursor-following gradient improved it: the cloud already provides a strong center, so a second hover-led glow added too much competition.

## Tuning Knobs

If this effect needs refinement later, these are the main controls to change.

The baked defaults live in [`./hero-effect-tuning.ts`](./hero-effect-tuning.ts).

If you want the live tuning panels on screen, set:

- `showHeroEffectTuningPanels = true`

If you want a clean production hero again, set:

- `showHeroEffectTuningPanels = false`

The switch is intentionally code-only so the hero API stays clean and the panels never appear by accident in production screenshots.

It is currently set to `false`, so the live panels are hidden unless you explicitly turn them back on in code.

## Live debug panels

When `showHeroEffectTuningPanels` is enabled, the hero renders two floating panels:

1. `Infinity + Stage`
2. `Double Helix`

It also renders a bottom-right runtime toggle so you can hide or reopen the overlay without changing the code switch.

Infinity and helix zoom are now independent:

- the first panel's `zoom` changes the shared camera view
- the second panel's `zoom` changes only the helix target size

The first panel controls:

- `scaleX`
- `scaleY`
- `zoom`
- `particleCount`
- `pointSpread`
- `offsetX`
- `offsetY`

The second panel controls:

- `particleCount`
- `pointSpread`
- `cycleSeconds`
- `turns`
- `zoom`
- `horizontalShift`
- `span`
- `amplitudeY`
- `amplitudeZ`
- `rotationYMax`
- `rotationXMax`
- `pointSpread`
- `spreadScale`
- `morphStart`
- `morphEnd`

Each panel has its own reset button, and both panels read from fresh local copies of the baked defaults so experimentation does not mutate the source values in the module.

## Infinity cloud density and softness

In [`./hero-effect-infinity-cloud.tsx`](./hero-effect-infinity-cloud.tsx):

- `particleCount`
- `pointSpread`
- `particleDrift`
- `helixTuning.spreadScale`
- responsive density scaling inside `getResponsiveParticleCount`
- `particleGlowMaterial.size`
- `particleCoreMaterial.size`
- `particleGlowMaterial.opacity`
- `particleCoreMaterial.opacity`

Increase density and lower either shape's spread to make that structure feel fuller and less skeletal.

## Infinity cloud scale and placement

In [`./hero-effect-infinity-cloud.tsx`](./hero-effect-infinity-cloud.tsx):

- `tuning.scaleX`
- `tuning.scaleY`
- camera frustum sizing inside `syncRendererSize`
- `helixTuning.zoom`
- `helixTuning.span`
- `helixTuning.horizontalShift`

In [`./hero-effect-tuning.ts`](./hero-effect-tuning.ts):

- `scaleX`
- `scaleY`
- `zoom`
- `offsetX`
- `offsetY`

In [`./hero-effect-backdrop.tsx`](./hero-effect-backdrop.tsx):

- the centered wrapper dimensions around `StudioHeroInfinityCloud`

## Helix morph timing and shape

In [`./hero-effect-tuning.ts`](./hero-effect-tuning.ts):

- `cycleSeconds`
- `turns`
- `zoom`
- `amplitudeY`
- `amplitudeZ`
- `rotationYMax`
- `rotationXMax`
- `spreadScale`
- `morphStart`
- `morphEnd`

## Click burst behavior

In [`./hero-effect-burst.ts`](./hero-effect-burst.ts):

- burst particle count
- burst duration
- ripple distortion amplitude
- ring line width
- halo opacity

This controls how dramatic or restrained the click response feels.

## Shared art direction

In [`../../../app/globals.css`](../../../app/globals.css):

- hero surface gradient
- grid texture opacity and scale

These should stay in the design-system layer instead of being hardcoded into JSX.

## Current State Summary

As of now, the hero effect is:

- full-section
- centered
- Three.js-based for the infinity cloud
- dense enough that the loop path is hidden
- breathing between infinity and a subtle horizontal double helix
- interactive via subtle circular ripple pulses
- configured through baked module defaults with an optional code-switched debug overlay
- brand-aligned through shared surface tokens

If we extend it later, the cleanest next step would be to let the click ripple temporarily disturb the Three.js particles too, so the ripple and the cloud feel like one system instead of two stacked systems.

