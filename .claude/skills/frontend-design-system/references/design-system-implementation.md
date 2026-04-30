# Design System Implementation Notes

Use this file as the quick reference for frontend implementation work after loading the full spec.

## Source of Truth Order
1. `brand-foundation` for brand intent and visual priorities.
2. `design-system-spec.md` for exact digital system requirements.
3. Existing token and preview files in the repo for current implementation shape.

## Build Order
1. Foundations: color, spacing, radius, shadow, typography.
2. Shared primitives and variants.
3. First-pass components.
4. Patterns composed only from published components.

## Key Frontend Rules
- Premium surfaces should be implemented as reusable patterns with shared blur, border, shadow, and translucency behavior, especially for overlays, floating cards, and hero callouts.
- Use stronger glass or elevated treatments only when a layer needs obvious separation from the canvas beneath it; keep standard sections flatter so hierarchy stays readable.
- Keep tokens centralized in `app/globals.css`.
- Keep font wiring centralized in `app/layout.tsx`.
- Always start from shadcn primitives in `components/ui/*` before introducing custom wrappers or parallel primitives.
- Use preview routes to document system state while the site is still evolving.
- Make responsiveness part of the shared system: default to mobile-first layouts, then scale up through component variants and section composition.
- Use Framer Motion for implemented interaction animation, with ease-out curves as the default motion language.
- Comment intent, not syntax.
- Homepage studio case-study card image refs should keep using `cover-mock` assets for `coverImages.card` and `mockImageSrc`; do not swap those fields to `cover-home` unless the user explicitly changes the homepage asset contract.

## Current Repo Foundation Files
- `app/globals.css`
- `app/layout.tsx`
- `app/design-system/foundations/page.tsx`
- `components/design-system/*`

