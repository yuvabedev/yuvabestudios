# Yuvabe Studios Direction

Core principle:

We are transitioning from a not-for-profit identity to a cutting-edge product design, development, and engineering studio focused on startups.
We are AI-first by DNA in everything we do across strategy, product, engineering, and growth execution.
In a world where building is no longer the main constraint, deciding what to build is the competitive edge. Our messaging must consistently position Yuvabe as the partner that helps founders discover what matters, prioritize correctly, and iterate fast toward traction.

Design system instruction:

Always build and update this website with a design-system-first approach. Define and use shared tokens and component variants for buttons, typography, spacing, colors, borders, and states before adding page-level styling. Avoid one-off inline styling that creates visual drift. Every CTA and interactive element must use the same standardized component variants so we never end up with multiple inconsistent button styles.
Design-system drift is prohibited: do not introduce custom colors, ad-hoc color mixes, one-off type sizes, bespoke typography treatments, or arbitrary spacing/radius/shadow values directly in page or component code when the same need can be solved by the shared system.
All production colors and type decisions must come from the design system's palette, semantic tokens, or approved shared utilities.
If a neutral needs a brand tint, define that tinted neutral as a named shared token in the design system first and reuse it everywhere; never create one-off per-case blends inside a component or page. If a needed value does not exist yet, add it to the shared design-system foundation first, then consume that token or utility in component code.
Treat `design-system-spec.md` as the source of truth for Yuvabe's digital foundation layer unless a newer repo instruction explicitly overrides it. The implementation order is foundations first, components second, patterns third, page composition last.
Keep foundation implementation centralized: tokens and typography contracts belong in shared theme files, reusable UI contracts belong in shared components, and exploratory or reviewable system work should use internal preview routes instead of homepage-only markup.
Componentization is mandatory: every discrete UI part (for example navbar, hero block, marquee, background layer, section headers, cards, CTA blocks) must be implemented as a reusable component instead of inline page markup. Build pages by composing these reusable components.
Use shadcn as the base for all UI components wherever possible. Prefer extending or composing shadcn primitives such as Dialog, Sheet, Card, Button, Accordion, and similar building blocks instead of creating custom component foundations from scratch. Custom wrappers are allowed, but their base should still come from shadcn primitives unless there is a documented reason not to.

Code clarity instruction:

Add short, purposeful comments for each non-trivial method and each major JSX section going forward so component structure is easy to scan. Comments should explain intent, not restate obvious syntax.

Coding principles:

Use DRY, WET, and AHA as complementary heuristics rather than rigid rules.

DRY:
Keep each important piece of knowledge in one authoritative place when the duplication is clearly the same concept. Use DRY to reduce bug-fix repetition, inconsistent behavior, and scattered business rules.

WET:
Treat early duplication as acceptable while a pattern is still forming. Writing something twice can be safer than inventing a brittle abstraction too early, especially when the use cases are still meaningfully different.

AHA:
Avoid Hasty Abstractions. Prefer duplication over the wrong abstraction, optimize for change first, and only extract shared helpers once the repeated pattern is stable and the variation points are clear.

Repo preference:
Default to AHA-guided decisions. Reach for DRY when the duplication represents stable shared knowledge. Accept a little WET duplication when it keeps the code clearer and avoids premature abstraction. Keep abstractions small, readable, and grounded in real repeated use cases rather than speculative reuse.

Skill architecture instruction:

This repo now uses a layered skill architecture for all brand, website, proof, and frontend system work. Do not collapse these responsibilities back into one skill.

Use the skills in this order when relevant:
1. `brand-foundation` for source-of-truth brand direction, tone, visual language, and strategic positioning.
2. `proof-library` for named-client work, case-study proof, service evidence, and reusable credibility material.
3. `marketing-website` for website structure, section planning, CTA flow, and overall marketing-site orchestration.
4. `Copywriting` for messaging execution, headline writing, section copy, and CTA writing.
5. `Visual Design (VD)` for layout, hierarchy, surfaces, spacing, component polish, and visual consistency.
6. `frontend-design-system` for coded tokens, typography utilities, reusable component variants, preview routes, and design-system-aware frontend implementation.

Skill responsibility rules:
- `brand-foundation` is the authoritative brand source. If there is overlap elsewhere, prefer `brand-foundation`.
- `proof-library` is the authoritative source for project proof, case-study facts, and named client references.
- `marketing-website` is the orchestrator for Yuvabe's marketing site and landing-page work.
- `Copywriting` must stay focused on how to write, not on storing raw proof or brand-system duplication.
- `Visual Design (VD)` must stay focused on visual decisions, not on storing brand source material or case-study facts.
- `frontend-design-system` must stay focused on implementation of the shared system in code, not on replacing brand, proof, or copy source material.

Reference material policy:
- Treat PDFs and project pages as source material, then distill durable knowledge into concise Markdown references inside the relevant skill.
- Prefer distilled references before opening large source files.
- Use named project references from `proof-library` before making broad generic claims.
- When a claim is public-facing, prefer concrete, verifiable project evidence over vague capability language.
- Treat `design-system-spec.md` as a durable implementation reference for digital system work, then update the relevant skill references when patterns become stable.

Current proof-library guidance:
- `proof-library` should prioritize named, public-facing work such as TVAM, KittyKat, Bevolve, General Aeronautics, and AgeShift.
- Generic sales decks should not be used as the primary proof source when named project references are available.
- If new project pages or case-study content are provided, update `proof-library` references rather than stuffing those details into `Copywriting` or `marketing-website`.

Website implementation guidance:
- For any homepage or landing-page build, load `brand-foundation` first, then `proof-library`, then `marketing-website`, then pull in `Copywriting` and/or `Visual Design (VD)` based on the task.
- When the task moves into coded design-system implementation, load `frontend-design-system` after brand and website context are established.
- Keep website messaging founder-focused, AI-first, and traction-oriented.
- Use project proof to support claims, especially around AI systems, product engineering, design execution, and multi-disciplinary delivery.


## Skills
A skill is a set of local instructions to follow that is stored in a `SKILL.md` file. Below is the list of skills that can be used. Each entry includes a name, description, and file path so you can open the source for full instructions when using a specific skill.
### Available skills
- Copywriting: Use when writing or refining Yuvabe's founder-focused website copy, headlines, section messaging, proof framing, and CTAs after brand and proof context are established. (file: C:/Users/cyril varghese/code/yuvae-new-light/.agents/skills/copywriting/SKILL.md)
- Visual Design (VD): Use when designing or refining Yuvabe's marketing-site visual direction after brand context is established. Apply for layout, hierarchy, spacing, surfaces, component polish, consistency, and motion. (file: C:/Users/cyril varghese/code/yuvae-new-light/.agents/skills/VD/SKILL.md)
- brand-foundation: Use when tasks need Yuvabe's source-of-truth brand direction, positioning, tone, messaging system, visual language, or brand-usage guidance before copy, design, or website execution. (file: C:/Users/cyril varghese/code/yuvae-new-light/.agents/skills/brand-foundation/SKILL.md)
- marketing-website: Use when planning, structuring, writing, designing, or building Yuvabe's homepage, landing pages, site map, or conversion-focused studio website flows after brand and proof context are established. (file: C:/Users/cyril varghese/code/yuvae-new-light/.agents/skills/marketing-website/SKILL.md)
- proof-library: Use when tasks need Yuvabe's named-client work, case-study facts, proof points, service evidence, or public project references to support website, sales, or messaging work. (file: C:/Users/cyril varghese/code/yuvae-new-light/.agents/skills/proof-library/SKILL.md)
- frontend-design-system: Use when building or refactoring tokens, typography, component variants, preview routes, or shadcn/Tailwind UI in this repo so frontend implementation stays aligned with `design-system-spec.md` and the shared brand system. (file: C:/Users/cyril varghese/code/yuvae-new-light/.agents/skills/frontend-design-system/SKILL.md)
- figma: Use the Figma MCP server to fetch design context, screenshots, variables, and assets from Figma, and to translate Figma nodes into production code. Trigger when a task involves Figma URLs, node IDs, design-to-code implementation, or Figma MCP setup and troubleshooting. (file: C:/Users/cyril varghese/.codex/skills/figma/SKILL.md)
- figma-implement-design: Translate Figma nodes into production-ready code with 1:1 visual fidelity using the Figma MCP workflow (design context, screenshots, assets, and project-convention translation). Trigger when the user provides Figma URLs or node IDs, or asks to implement designs or components that must match Figma specs. Requires a working Figma MCP server connection. (file: C:/Users/cyril varghese/.codex/skills/figma-implement-design/SKILL.md)
- skill-creator: Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations. (file: C:/Users/cyril varghese/.codex/skills/.system/skill-creator/SKILL.md)
- skill-installer: Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos). (file: C:/Users/cyril varghese/.codex/skills/.system/skill-installer/SKILL.md)
### How to use skills
- Discovery: The list above is the skills available in this session (name + description + file path). Skill bodies live on disk at the listed paths.
- Trigger rules: If the user names a skill (with `$SkillName` or plain text) OR the task clearly matches a skill's description shown above, you must use that skill for that turn. Multiple mentions mean use them all. Do not carry skills across turns unless re-mentioned.
- Missing/blocked: If a named skill isn't in the list or the path can't be read, say so briefly and continue with the best fallback.
- How to use a skill (progressive disclosure):
  1) After deciding to use a skill, open its `SKILL.md`. Read only enough to follow the workflow.
  2) When `SKILL.md` references relative paths (e.g., `scripts/foo.py`), resolve them relative to the skill directory listed above first, and only consider other paths if needed.
  3) If `SKILL.md` points to extra folders such as `references/`, load only the specific files needed for the request; don't bulk-load everything.
  4) If `scripts/` exist, prefer running or patching them instead of retyping large code blocks.
  5) If `assets/` or templates exist, reuse them instead of recreating from scratch.
- Coordination and sequencing:
  - If multiple skills apply, choose the minimal set that covers the request and state the order you'll use them.
  - Announce which skill(s) you're using and why (one short line). If you skip an obvious skill, say why.
- Context hygiene:
  - Keep context small: summarize long sections instead of pasting them; only load extra files when needed.
  - Avoid deep reference-chasing: prefer opening only files directly linked from `SKILL.md` unless you're blocked.
  - When variants exist (frameworks, providers, domains), pick only the relevant reference file(s) and note that choice.
- Safety and fallback: If a skill can't be applied cleanly (missing files, unclear instructions), state the issue, pick the next-best approach, and continue.


