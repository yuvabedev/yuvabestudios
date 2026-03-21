---
name: frontend-design-system
description: Frontend implementation skill for Yuvabe's design system in this Next.js repo. Use when building or refactoring tokens, typography, component variants, preview routes, or shadcn/Tailwind UI so the code stays aligned with `design-system-spec.md`, `brand-foundation`, and the repo's design-system-first rules.
---

# Frontend Design System Skill

## Objective
Implement Yuvabe's design system in code with a design-system-first approach so pages are assembled from stable tokens and reusable components instead of one-off styling.

## Required Context
- Load `../brand-foundation/SKILL.md` first for brand direction and visual priorities.
- Load `../VD/SKILL.md` when the task includes visual refinement or page-level hierarchy.
- Use `../../../design-system-spec.md` as the source of truth for exact foundation values and first-pass component requirements.
- Open `references/design-system-implementation.md` for the distilled implementation workflow before touching code.

## Workflow
1. Start with the existing design-system code foundation before adding new UI:
   - `../../../app/globals.css`
   - `../../../app/layout.tsx`
   - `../../../components/ui/button.tsx`
   - `../../../app/design-system/foundations/page.tsx`
2. Translate the spec in this order: tokens, typography, shared variants, components, then patterns.
3. Always use shadcn primitives as the base layer for UI components, and build custom wrappers or variants on top of them instead of inventing new foundations from scratch.
4. For controls specifically, always start with an existing shadcn control or the repo's existing `components/ui/*` shadcn-based control before creating anything new; do not invent parallel `Input`, `Textarea`, `Select`, `Checkbox`, or similar primitives unless the user explicitly asks to extend the design system.
5. Check `https://ui.shadcn.com/docs/components` first to see whether the needed component already exists in shadcn before hand-rolling it.
6. When adding a shadcn component, prefer the official CLI workflow first, using the documented pattern `npx shadcn@latest add <component>` instead of manually recreating the component from memory.
7. Check the original `https://ui.shadcn.com/` and `https://www.radix-ui.com/` docs before adding custom code; prefer documented built-in APIs, structure, and patterns before inventing wrappers or interaction logic.
8. Add or update internal preview routes when introducing new foundation or component layers so the system remains inspectable.
9. Add short intent-focused comments for non-trivial helpers and major JSX sections.

## Implementation Rules
- Keep `app/globals.css` as the single source of truth for tokens and typography utility contracts.
- Use semantic tokens in components whenever possible; avoid hardcoded hex values, spacing, radius, or shadow values in component code.
- Do not ship custom `color-mix(...)` recipes, arbitrary Tailwind color values, or one-off type-size utilities in production components when the same result can be achieved with existing design-system tokens.
- All grays must come from the neutral palette, and all production colors must come from the approved palette or semantic tokens defined in the shared foundation layer.
- If a neutral needs a primary tint, create a named tinted-neutral token or utility in the shared foundation first; never solve it with per-instance component-level color mixing.
- Keep variant counts lean and aligned with the spec.
- Reuse one button contract across nav, hero, and section CTAs.
- Buttons that trigger API or async work must use the shared loading-state contract on the design-system `Button` with the shared `Spinner`; do not ship ad-hoc loaders or text-only pending states for those actions.
- Before introducing a new shared UI primitive or control, check `https://ui.shadcn.com/docs/components` and prefer an existing shadcn component when it covers the need.
- If a needed shadcn component exists, add it through the shadcn CLI first, for example `npx shadcn@latest add button`, and only customize after the generated baseline is in place.
- Reuse existing shadcn-based form controls whenever possible; styling a one-off native control inside a narrow internal screen is acceptable, but adding a new shared control primitive requires a clear system-level need.
- Prefer composition over special-case page markup.
- Treat responsive behavior as part of the component contract, not a page-level afterthought; every shared component should work cleanly from mobile-first layouts upward.
- When editing homepage sections, compare their intro alignment, inner gutters, and body start lines against adjacent sections before finalizing; reuse the same container and mobile padding patterns unless there is a deliberate visual reason not to.
- Respect accessibility basics: visible focus states, readable contrast, and reduced visual noise.
- Treat premium surfaces as reusable contracts: glass overlays, elevated cards, floating panels, and badges should share consistent border, blur, shadow, and translucency behavior instead of ad-hoc one-off styles.
- Use premium surfaces only when a layer needs clear separation from the canvas or content beneath it, such as mobile nav overlays, hero callouts, proof cards, or modal-like states.
- Use Framer Motion for implemented component and interaction animation work, and default to ease-out easing curves unless a specific alternative is justified.
- Always check the original shadcn and Radix docs before adding custom interaction or primitive code; if the official APIs already cover the need, use or adapt those patterns first.

## Component Order
Build or refine components in this order unless the task clearly asks otherwise:
1. `Button`
2. `Input`
3. `Textarea`
4. `Select`
5. `Checkbox`
6. `Radio`
7. `Toggle`
8. `Badge`
9. `Card`
10. `Callout`
11. `Navbar`
12. `Footer`

## Validation
- Run targeted validation after implementation.
- Prefer `npm run build` and `npm run lint` for repo-level checks.
- Verify mobile responsiveness for any touched page or component, especially 320px-768px widths, stacked layouts, text wrapping, and tap-target sizing.
- On homepage work, explicitly compare section-to-section alignment on both mobile and desktop, with the `Work` section used as the baseline when checking services, process, proof, or CTA blocks.
- Inspect internal preview routes to confirm token usage, hierarchy, and component consistency.

## Guardrails
- Do not bypass the token layer with one-off page styling.
- Do not let page code become the place where new colors, type scales, or surface recipes are invented.
- Do not expand the component library beyond the current spec unless the user explicitly asks.
- Do not move brand-source material into this skill; keep brand truth in `brand-foundation`.
- Do not move visual-direction guidance into component code when it belongs in `VD`.
