# Next.js SEO Distillation

Use this file whenever the repo uses Next.js, especially the App Router.

## Rendering Reality
- App Router route files are Server Components by default.
- A page can still be server-rendered on first load even if it imports Client Components for interactivity.
- Distinguish:
  - route component type: server by default, client only if the route file itself has `"use client"`
  - rendering mode: static, dynamic, or revalidated based on route exports and build output
  - client boundaries: imported interactive components that hydrate after the initial HTML

## Metadata API
- Check for:
  - exported `metadata`
  - `generateMetadata`
  - route-specific `alternates.canonical`
  - Open Graph and Twitter coverage
  - `metadataBase` at the layout level
- Nested metadata objects are shallowly overwritten, not deep-merged.
  - If a child route defines `openGraph` or `twitter`, it can accidentally drop inherited fields unless the route explicitly carries them forward.
- Flag missing or inconsistent page metadata on important routes.

## Metadata Files and Conventions
- Check for presence or absence of:
  - `app/robots.ts` or `public/robots.txt`
  - `app/sitemap.ts` or `public/sitemap.xml`
  - `manifest.*` when relevant
  - `opengraph-image.*` or route-level OG image coverage
  - `twitter-image.*` when route-specific sharing images are expected

## Route-Level Checks
- Review `dynamic`, `revalidate`, and `generateStaticParams` to understand how the route is served.
- In production builds, use the route manifest output to confirm whether routes are static or dynamic.
- Flag public pages that are unnecessarily forced dynamic when the content is stable enough to prerender.

## JSON-LD Guidance
- JSON-LD is valid in App Router pages when the schema matches visible content.
- Check that schema values align with route metadata, canonical URLs, and actual content.

## Common Next.js SEO Risks
- Missing sitemap or robots coverage
- Layout-level metadata present, but route-level metadata incomplete
- Canonical missing on important detail pages
- Dynamic pages that could be static
- Route pages that rely too heavily on client-only presentation for primary content
- Missing OG image assets or broken image references
- Child route `openGraph` and `twitter` overrides that unintentionally drop inherited fields

