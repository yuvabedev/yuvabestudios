---
name: seo-audit
description: Audit technical SEO, crawlability, indexability, metadata, structured data, internal linking, and search-performance risks in code repositories. Use when running an SEO audit, reviewing Next.js SEO setup, checking crawl/index controls, or prioritizing SEO fixes before launch.
---

You are now operating with the Yuvabe SEO Audit skill loaded.

## Required Context — Load First

Read these files before running the audit:
1. @.claude/skills/seo-audit/references/google-search-central.md — first-party search expectations
2. @.claude/skills/seo-audit/references/audit-rubric.md — category checklist and severity anchors
3. @.claude/skills/seo-audit/references/nextjs-seo.md — load when the repo uses Next.js
4. @.claude/skills/seo-audit/references/tooling-playbook.md — load when deciding whether to recommend external SEO tools

## Audit Posture

- Start with non-mutating repo inspection.
- Prefer first-party standards: Google Search Central and framework docs.
- Recommend external SEO tools only when they would materially deepen the audit.
- Treat missing evidence as uncertainty, not proof of failure.

## Default Audit Workflow

1. Detect framework and public route surface — run `node .claude/skills/seo-audit/scripts/route_inventory.js` for Next.js App Router repos.
2. Classify likely rendering behavior for each route (static, dynamic SSR, ISR-like, or heavily client-hydrated).
3. Audit crawl and index controls (robots.txt, sitemap, noindex, canonicals).
4. Audit titles, descriptions, canonicals, Open Graph, and Twitter metadata.
5. Audit structured data against visible page intent (JSON-LD / schema).
6. Audit headings, internal linking, breadcrumbs, and image discoverability.
7. Audit performance and mobile UX risks from the codebase.
8. Produce a severity-sorted audit with a fix order and passed checks.

## Required Checks

- Route inventory and major public entrypoints
- Rendering surface classification per route
- Robots, sitemap, canonical, noindex, and duplicate-control coverage
- Title, description, H1, Open Graph, Twitter, and image alt coverage
- JSON-LD or schema coverage and page-to-schema fit
- Navigation, breadcrumbs, anchor text, and orphan-risk pages
- Obvious Core Web Vitals and mobile UX risks
- Monitoring readiness: Search Console, sitemap submission, rich results testing

## Severity Rubric

- `Critical` — directly blocks crawling, indexing, canonical resolution, or search-result eligibility
- `High` — strongly degrades search visibility, snippet quality, or route discoverability on important pages
- `Medium` — meaningful weakness with clear SEO upside, but not immediately blocking
- `Low` — improvement opportunity, polish issue, or monitoring gap

## Evidence Rules

- Cite exact file paths, route paths, and missing or misconfigured artifacts.
- Distinguish framework-level issues from page-level issues.
- For rendering findings, explain whether page HTML is server-rendered first.
- Call out uncertainty explicitly if a live deployment or Search Console data is unavailable.

## Output Format

Produce exactly these sections:
1. **Route inventory**
2. **Findings** — grouped by severity (Critical → High → Medium → Low), each with: Issue, Why it matters, Evidence, Recommended fix, Scope
3. **Passed checks**
4. **Priority fix order**
5. **Recommended tool follow-ups** — only when needed

Now run the audit for:

$ARGUMENTS
