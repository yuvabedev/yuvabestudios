---
description: Visual design direction for Yuvabe's marketing site — layout, hierarchy, spacing, surfaces, component polish, motion. Load after brand context is established.
---

You are now operating with Yuvabe's Visual Design (VD) skill loaded.

## Required Context — Load First

Read these files before making any visual decisions:
1. @.agents/skills/brand-foundation/references/brand-summary.md — shared brand system (always first)
2. @design-system-spec.md — exact digital token, typography, and component-foundation guidance
3. @.agents/skills/marketing-website/SKILL.md — load when work is for homepage or landing-page composition

## Non-Negotiables

1. **System first** — define or reuse tokens before styling sections.
2. **Enforce consistency** — no ad-hoc one-off button, card, or text styles.
3. **Prioritize clarity** — every visual choice must improve scanability, trust, or conversion.
4. **Respect hierarchy** — one dominant message per viewport.

## Whitespace and Rhythm

- Use generous spacing; avoid cramped layouts.
- Keep a clear vertical rhythm with repeatable section spacing.
- Prefer fewer elements with stronger spacing over dense UI blocks.
- Keep hero above the fold on desktop when possible.

## Typography

- Display font (Clash Display) for hero/headlines only.
- Neutral sans (Gilroy) for body, UI text, labels, buttons, forms, nav, cards, captions.
- Default to 3 font sizes per page; allow a 4th only when a real hierarchy break is necessary.
- Use weight, casing, tracking, color, contrast, and spacing to create hierarchy — not more font sizes.
- All production type choices must map back to design system tokens.
- Keep headline copy short; review real line breaks at likely viewport widths to avoid stranded words.

## Color and Surface

- Deep, controlled base tones with subtle gradients.
- Restrained accent colors; avoid rainbow palettes or equal-weight multi-accent layouts.
- Keep violet as the primary brand anchor and yellow as the main warm counterweight.
- All grays from the neutral palette; all production colors from approved palette or semantic tokens.
- If a neutral needs a brand tint, add a named tinted-neutral token to the design system first.
- Introduce small amounts of brand color as short dividers, micro-accents, badges, or focus cues.

## Premium Surfaces

- Use when a layer needs to feel elevated, focused, or modal: navigation overlays, hero badges, key cards, floating proof modules, CTA-adjacent callouts.
- Rely on restrained translucency, soft borders, layered shadows, and subtle backdrop blur.
- Reserve the strongest glass treatments for top-priority interaction layers.
- On mobile, favor larger tap targets, calmer typography, and stronger contrast inside premium surfaces.

## Motion

- Subtle, purposeful motion only: fade, slight rise, gentle stagger.
- Use Framer Motion for implemented UI motion in this repo.
- Default to ease-out easing curves.
- Animation must support hierarchy, not distract.
- Respect `prefers-reduced-motion`.

## Components and States

- All CTAs from standardized button variants: primary, secondary, nav/ghost.
- Keep corner radius, border thickness, and hover/focus behavior consistent.
- Focus states must be visible and accessible across all components.

## Conversion Rules (Founder Audience)

- Speak outcomes, not internal process.
- Make the primary CTA obvious and singular per section.
- Support every claim with structure: work samples, process clarity, proof blocks.
- Remove UI that feels generic, verbose, or low-signal.

## Page Composition Checklist

Before finalizing any page:
1. Is there exactly one dominant hero message?
2. Does the hero fit above the fold on desktop?
3. Are button styles fully consistent across nav, hero, and sections?
4. Is spacing consistent by tokenized steps?
5. Are headline, subcopy, and CTA clearly scannable in 5 seconds?
6. Do visuals feel premium through restraint, not clutter?
7. Do headline and intro line breaks look intentional on desktop and mobile?

## Anti-Patterns to Avoid

- Multiple button styles with different radius, height, or border logic
- Overlong hero paragraphs
- Decorative noise that reduces contrast or readability
- Inconsistent paddings between sections
- Excessive motion or flashy transitions
- Extra font sizes when the same hierarchy can be achieved through restraint
- Custom colors or one-off type treatments when design system tokens exist

When implementation is needed, hand off to the `frontend-design-system` skill rather than putting code-specific rules here.

Now apply visual direction to:

$ARGUMENTS
