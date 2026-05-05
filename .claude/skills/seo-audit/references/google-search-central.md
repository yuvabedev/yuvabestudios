# Google Search Central Distillation

Use this file as the first-party standard for repo-first SEO audits.

## Crawl and Index Controls
- Public pages need a crawl path and should not be unintentionally blocked by `robots`, `noindex`, auth walls, or broken route discovery.
- Canonical signals should be explicit on pages with duplicate or near-duplicate URL variants.
- Sitemaps help discovery, especially for larger or newer sites, but they do not override poor crawl/index controls.

## Titles and Snippets
- Titles should be unique, descriptive, and aligned with the page's main purpose.
- Meta descriptions are not a ranking guarantee, but strong descriptions improve snippet quality and click likelihood.
- Avoid boilerplate title patterns that make multiple important pages indistinguishable.
- Check title-to-H1 alignment: they do not need to match exactly, but they should reinforce the same intent.

## Structured Data
- Structured data should match visible page content and real page intent.
- Prefer schema types that are clearly justified by the page:
  - `Organization` or `WebSite` for site-level identity
  - `BreadcrumbList` where breadcrumb navigation is visible
  - `Article` for editorial or case-study pages that behave like articles
  - `FAQPage` only when real FAQ content is present on-page
- Do not recommend schema solely to "add SEO"; recommend it only when it accurately describes the content.

## Internal Linking and Discoverability
- Important pages should be reachable through ordinary navigation or internal links.
- Breadcrumbs, nav, footer links, and contextual links help crawlers understand page relationships.
- Anchor text should communicate destination intent; generic text like `click here` is weak.

## Helpful Content Signals
- Pages should have a clear purpose, useful original content, and enough differentiation from template siblings.
- Thin pages, duplicated section copy, or placeholder-like content should be treated as content quality risks.

## Performance and Mobile UX
- Good Core Web Vitals and mobile usability support discoverability and user retention.
- In repo-only audits, focus on obvious code-level risks:
  - very large hero media
  - unoptimized image usage
  - excessive client-side interactivity on primary content routes
  - layout instability risk from missing dimensions or late-loading content
- When repo evidence is insufficient, recommend live measurement instead of guessing.

## Audit Guidance
- Use Google’s standards as the baseline for "why this matters."
- If a tool-specific article disagrees with first-party guidance, prefer the first-party guidance and frame the other source as operational advice, not the source of truth.

