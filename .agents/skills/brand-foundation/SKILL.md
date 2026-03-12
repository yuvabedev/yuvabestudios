---
name: brand-foundation
description: Source-of-truth skill for Yuvabe's positioning, tone, visual language, brand usage, and digital brand translation. Use before copy, website, visual, or frontend design-system work that needs alignment to the current AI-first studio identity.
---

# Brand Foundation Skill

## Objective
Provide the single source of truth for Yuvabe's brand direction so other skills do not duplicate core brand knowledge.

## Workflow
1. Start with `references/brand-summary.md` for the durable rules Codex should apply by default.
2. If the task involves digital UI foundations, use `../../../design-system-spec.md` after the summary for exact token, typography, and first-pass component guidance.
3. If the task needs deeper rationale or asset-usage guidance, open `references/brand-page-map.md` and then the original PDF in `references/Yb studios brand guidelines.pdf`.
4. For marketing website work, load `../marketing-website/SKILL.md` after this skill.
5. For visual design work, load `../VD/SKILL.md` after this skill.
6. For frontend implementation work, load `../frontend-design-system/SKILL.md` after this skill.

## Guardrails
- Keep brand knowledge centralized here; do not restate long-form brand rules in specialist skills.
- Apply the current studio direction from the repo when older guideline examples reflect the legacy not-for-profit phase.
- Convert the brand into operational decisions for website and product UI work instead of quoting the PDF at length.
- Treat the repo's design-system spec as the implementation layer of the brand, not as a separate visual direction.
- Keep violet and yellow as the dominant brand anchors; use the wider accent palette only as supporting structure.
