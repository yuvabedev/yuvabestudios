---
name: Visual Design (VD)
description: Visual design skill for Yuvabe's marketing site and digital surfaces. Use after brand context is established when refining layout, hierarchy, spacing, surfaces, component polish, consistency, and motion, especially when design decisions must align with `design-system-spec.md`.
---

# Visual Design (VD): Premium Visual Direction

## Objective
Create interfaces that feel premium, calm, high-trust, and technically sophisticated for startup founders.

## Required Context
- Load `../brand-foundation/SKILL.md` first for the shared brand system.
- Load `../marketing-website/SKILL.md` when the work is for homepage or landing-page composition.
- Load `../../../design-system-spec.md` when the task needs exact digital token, typography, or component-foundation guidance.
- Load `../frontend-design-system/SKILL.md` when the work moves from visual direction into frontend implementation.

## Non-Negotiables
1. Start with system first: define or reuse tokens before styling sections.
2. Enforce consistency: no ad-hoc one-off button, card, or text styles.
3. Prioritize clarity: every visual choice must improve scanability, trust, or conversion.
4. Respect hierarchy: one dominant message per viewport.

## Premium Surfaces
- Use premium surfaces when a layer should feel elevated, focused, or modal: navigation overlays, hero badges, key cards, floating proof modules, and CTA-adjacent callouts.
- Premium surfaces should rely on restrained translucency, soft borders, layered shadows, and subtle backdrop blur instead of heavy dark fills or noisy gradients.
- Reserve the strongest glass or elevated treatments for top-priority interaction layers so the page keeps one dominant depth cue at a time.
- On mobile, favor larger tap targets, calmer typography, and slightly stronger contrast inside premium surfaces so polish never reduces usability.

## Visual Principles

### 1) Whitespace and Rhythm
- Use generous spacing; avoid cramped layouts.
- Keep a clear vertical rhythm with repeatable section spacing.
- Prefer fewer elements with stronger spacing over dense UI blocks.
- Keep hero above the fold on desktop when possible.

### 2) Typography
- Use a clear two-tier type system:
  - Display font for hero/headlines.
  - Neutral sans font for body/UI text.
- Keep the full 10-style type system from `design-system-spec.md` as the website-wide typography library.
- On any single page, compose with 3 font sizes by default; allow a 4th size only when a real hierarchy break is necessary.
- Treat those page-level roles as: one dominant display size, one secondary/title size, one body/utility size, and an optional fourth size only for a necessary extra hierarchy layer.
- Use Clash Display for display and major heading moments only.
- Use Gilroy for body text, labels, buttons, forms, navigation, cards, and captions.
- Page-level hierarchy should come primarily from font family, weight, casing, tracking, color, contrast, and spacing instead of adding more font sizes.
- Do not introduce extra font sizes just to differentiate labels, metadata, nav text, or card text when those differences can be expressed through styling.
- All production type choices must map back to the design system. Do not use bespoke one-off font sizes, arbitrary tracking, or ad-hoc colorized type treatments when the same hierarchy can be expressed with shared typography roles and neutral/brand tokens.

- If a neutral needs a primary-brand tint, define that tinted neutral as a shared design-system token first; do not create page-specific tinted grays on the fly.
- Keep headline copy short and impactful.
- Limit line length for body text.
- Maintain strict text contrast and hierarchy across headings, subheads, and body.
- Let premium feel come from hierarchy, spacing, and restraint rather than visual noise.

### 3) Color and Surface
- Use deep, controlled base tones with subtle gradients.
- Use restrained accent colors; avoid rainbow palettes or equal-weight multi-accent layouts.
- Surfaces should be minimal, with low-opacity borders and soft depth.
- Prefer contrast and restraint over decorative effects.
- Look for opportunities to introduce very small amounts of brand color in disciplined ways, such as short dividers, micro-accents, badges, focus cues, or tiny highlight moments that help the composition feel alive without turning the surface noisy.
- Respect the official brand palette from brand-foundation before inventing new accents.
- Keep violet as the primary brand anchor and yellow as the main warm counterweight.
- Treat the extended accent palette as supporting material, not a competing identity.
- All grays should come from the neutral palette and all production colors should come from approved design-system palette tokens or semantic color tokens.

- If a neutral needs a brand tint, add a named tinted-neutral token to the design system and reuse it consistently instead of mixing colors ad hoc in individual components.

### 4) Components and States
- All CTAs must come from standardized button variants.
- Define and reuse variants for: primary, secondary, nav/ghost.
- Keep corner radius, border thickness, and hover/focus behavior consistent.
- Focus states must be visible and accessible across components.
- Prefer the lean foundation scale from the spec: tokenized spacing, radius, shadows, and minimal size variants.

### 5) Motion
- Use subtle, purposeful motion only (fade, slight rise, gentle stagger).
- Use Framer Motion for implemented UI motion and interaction work in this repo instead of ad-hoc CSS animation patterns.
- Default to ease-out easing curves for most transitions unless a stronger reason is documented.
- Animation must support hierarchy, not distract.
- Respect `prefers-reduced-motion`.

## Conversion Rules (Founder Audience)
- Speak outcomes, not internal process.
- Make the primary CTA obvious and singular per section.
- Support every claim with structure (work samples, process clarity, proof blocks).
- Remove copy or UI that feels generic, verbose, or low-signal.

## Marketing Website Composition
- Keep the hero dominant and above the fold where possible.
- Sequence sections to reduce founder uncertainty: promise, proof, capability, process, evidence, CTA.
- Use section rhythm and contrast shifts deliberately so the page feels guided, not monotonous.
- Treat motion as supportive hierarchy, not spectacle.

## Design-System Alignment
- Keep the digital system minimal before expanding components: foundations first, first-pass components second, patterns third.
- Use semantic color roles instead of styling elements directly from raw palette values unless the task is a palette preview.
- Keep reference pages and internal previews instructional rather than marketing-polished if the task is system setup.
- When a task is implementation-heavy, hand off to `../frontend-design-system/SKILL.md` rather than putting code-specific rules here.

## Page Composition Checklist
Before finalizing any page:
1. Is there exactly one dominant hero message?
2. Does the hero fit above the fold on desktop?
3. Are button styles fully consistent across nav, hero, and sections?
4. Is spacing consistent by tokenized steps?
5. Are headline, subcopy, and CTA clearly scannable in 5 seconds?
6. Do visuals feel premium through restraint, not clutter?

## Implementation Guidance for This Repo
- Prefer editing shared primitives first:
  - `components/ui/button.tsx`
  - `app/globals.css`
- Then apply variants in page sections (`app/page.tsx`) without custom drift.
- If a new style is needed, add a reusable variant/token instead of inline overrides.

## Anti-Patterns to Avoid
- Multiple button styles with different radius, height, or border logic.
- Overlong hero paragraphs.
- Decorative noise that reduces contrast or readability.
- Inconsistent paddings between sections.
- Excessive motion or flashy transitions.
- Pages that use many type sizes when the same hierarchy could be achieved through restraint and styling.`r`n- Pages or components that introduce custom colors, ad-hoc color mixing, or one-off type treatments instead of extending and using the design system first.





