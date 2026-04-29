# Audit Rubric

Use these categories to structure findings and to avoid drifting into generic advice.

## 1. Crawl and Index Controls
- Missing `robots` coverage
- Missing sitemap coverage
- No clear canonical strategy
- Public pages blocked or implicitly non-indexable
- Duplicate URL variants without canonical handling

## 2. Canonicals and Duplicate Management
- Route-level canonicals missing on important pages
- Canonicals inconsistent with actual route paths
- Template-level metadata reused without differentiation

## 3. Title and Description Quality
- Missing title or description
- Duplicate titles across public routes
- Weak or generic descriptions
- Title and H1 intent mismatch

## 4. Heading and Semantic Structure
- Missing H1 on a primary page
- Multiple competing H1s without clear page hierarchy
- Heading order that makes page structure ambiguous
- Major content hidden behind purely interactive UI without crawlable fallback

## 5. Structured Data
- Missing justified schema on key pages
- Schema type that does not match page content
- JSON-LD values inconsistent with metadata or visible copy
- Breadcrumb navigation present but not represented in schema when appropriate

## 6. Internal Linking and Breadcrumbs
- Important pages reachable only through weak paths
- Missing breadcrumbs on deep detail pages
- Generic anchor text
- Footer/nav gaps that create orphan-risk routes

## 7. Image Alt and Media Discoverability
- Important decorative vs informative media not distinguished
- Missing alt text on informative images
- Massive hero media or autoplay-heavy assets on critical routes
- OG/Twitter image assets missing or inconsistent

## 8. Performance and Mobile UX
- Very large media on above-the-fold routes
- Heavy client-side interaction on content-critical sections
- Layout-shift risk from missing dimensions or unstable shells
- Excessive dynamic rendering on stable marketing pages

## 9. Measurement and Monitoring Readiness
- No evidence of sitemap submission workflow
- No recommendation to validate rich results when schema exists
- No guidance to use Search Console for indexing confirmation
- No recommendation for live Core Web Vitals checks when repo-only evidence is limited

## Finding Shape
For every finding, keep the structure stable:
- `Issue`
- `Why it matters`
- `Evidence`
- `Recommended fix`
- `Scope`

