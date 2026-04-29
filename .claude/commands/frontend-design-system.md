---
description: Implement Yuvabe's design system in Next.js — tokens, typography, component variants, shadcn/Tailwind, preview routes. Aligned with design-system-spec.md.
---

You are now operating with the Yuvabe Frontend Design System skill loaded.

## Required Context — Load First

Read these files before touching any code:
1. @.agents/skills/brand-foundation/references/brand-summary.md — brand direction and visual priorities
2. @.agents/skills/frontend-design-system/references/design-system-implementation.md — distilled implementation workflow
3. @design-system-spec.md — source of truth for exact foundation values and first-pass component requirements

## Workflow

1. Start with the existing design-system code before adding new UI:
   - `app/globals.css`
   - `app/layout.tsx`
   - `components/ui/button.tsx`
   - `app/design-system/foundations/page.tsx`
2. Translate the spec in order: tokens → typography → shared variants → components → patterns.
3. Always use shadcn primitives as the base layer; build custom wrappers on top, never invent new foundations from scratch.
4. For controls, start with an existing shadcn control or `components/ui/*` before creating anything new.
5. Check `https://ui.shadcn.com/docs/components` before hand-rolling any component.
6. When adding shadcn, prefer the CLI: `npx shadcn@latest add <component>`.
7. Add or update internal preview routes when introducing new foundation or component layers.

## Implementation Rules

- Keep `app/globals.css` as the single source of truth for tokens and typography utility contracts.
- Use semantic tokens in components; avoid hardcoded hex values, spacing, radius, or shadow values.
- Do not ship custom `color-mix(...)` recipes or arbitrary Tailwind color values when existing tokens cover it.
- All grays must come from the neutral palette; all production colors from the approved palette or semantic tokens.
- Keep variant counts lean and aligned with the spec.
- Reuse one button contract across nav, hero, and section CTAs.
- Buttons that trigger API or async work must use the shared loading-state contract with the shared `Spinner`.
- Treat responsive behavior as part of the component contract, not a page-level afterthought.
- Respect accessibility basics: visible focus states, readable contrast, reduced visual noise.
- Use Framer Motion for animation work; default to ease-out easing curves.

## Component Build Order

Build or refine in this order unless the task clearly asks otherwise:
1. `Button` 2. `Input` 3. `Textarea` 4. `Select` 5. `Checkbox`
6. `Radio` 7. `Toggle` 8. `Badge` 9. `Card` 10. `Callout`
11. `Navbar` 12. `Footer`

## Validation

- Run `npm run build` and `npm run lint` after implementation.
- Verify mobile responsiveness for any touched page or component (320px–768px).
- On homepage work, compare section-to-section alignment on mobile and desktop.
- Inspect internal preview routes to confirm token usage, hierarchy, and component consistency.

## Guardrails

- Do not bypass the token layer with one-off page styling.
- Do not let page code become where new colors or type scales are invented.
- Do not expand the component library beyond the current spec unless explicitly asked.
- Do not move brand-source material into this skill; keep brand truth in `brand-foundation`.

Now implement:

$ARGUMENTS
