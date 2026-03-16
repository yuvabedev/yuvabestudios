---
name: marketing-website
description: Use when planning, structuring, writing, designing, or building Yuvabe's homepage, landing pages, site map, or conversion-focused studio website flows after brand and proof context are established. Route frontend system implementation through `frontend-design-system` when the task moves from page strategy into coded design-system work.
---

# Marketing Website Skill

## Objective
Build Yuvabe's marketing website as a premium, founder-focused, AI-first studio site with clear conversion paths and strong system consistency.

## Required Load Order
1. Load `../brand-foundation/SKILL.md` first.
2. Pull `../proof-library/SKILL.md` when the task needs service content, proof points, case-study material, or offer evidence.
3. Pull `../copywriting/SKILL.md` when the task involves messaging, headlines, section copy, or CTAs.
4. Pull `../VD/SKILL.md` when the task involves hierarchy, layout, styling, motion, or component polish.
5. Pull `../frontend-design-system/SKILL.md` when the task involves coded tokens, reusable components, preview routes, or design-system implementation in the Next.js repo.

## Website Strategy
- The site must clearly communicate the shift into an AI-first studio serving startups.
- Position Yuvabe as the partner that helps founders decide what to build, execute it fast, and iterate toward traction through product, engineering, and growth marketing support.
- Favor clarity, momentum, and trust over feature dumping or agency-style fluff.

## Default Page Structure
- Navigation with a clear primary CTA.
- Hero with a short headline, one supporting paragraph, and one primary conversion action.
- Proof or credibility section to reduce founder risk.
- Capabilities/services section framed around outcomes, not internal departments.
- Process or operating-model section showing how Yuvabe helps founders decide, build, and learn.
- Work, case studies, or evidence section.
- FAQ or objection-handling block when needed.
- Final CTA section with one strong next step.

## Website Content Rules
- Keep the primary story above the fold on desktop.
- Every section should answer a founder question: why trust you, what do you do, how do you work, why now, what happens next.
- Use AI-first language as practical leverage: faster iteration, sharper prioritization, smarter automation, stronger economics.
- When describing the offer, keep growth marketing explicit enough that the site does not read like a product-only studio.
- Each page should have one dominant CTA path and minimal decision noise.

## Surface Guidance
- Use premium surfaces to support conversion-critical layers like mobile navigation, hero proof, featured case studies, and final CTA framing when they need stronger focus than the page canvas.
- Keep premium surface usage selective; too many frosted or elevated panels reduce hierarchy and make the page feel busy instead of high-trust.

## Repo Implementation Rules
- Build design-system first: shared tokens, reusable variants, and reusable sections before page assembly.
- Treat `design-system-spec.md` as the digital foundation source of truth for tokens, typography, and first-pass components.
- Use shadcn primitives as the base for UI components whenever possible.
- Avoid one-off styling for buttons, cards, section headers, and surfaces.
- Add short comments for non-trivial methods and major JSX sections so structure is easy to scan.
- Use internal preview routes when foundation or component work needs to be reviewed outside the live homepage.

## Output Expectations
- For planning tasks: produce sitemap, section order, content goals, and CTA strategy.
- For proof-heavy tasks: pull source material from Proof Library before drafting claims.
- For writing tasks: route to Copywriting while staying anchored to brand-foundation.
- For visual tasks: route to VD while staying anchored to brand-foundation.
- For build tasks: translate the strategy through `frontend-design-system` into reusable Next.js/Tailwind/shadcn components.

