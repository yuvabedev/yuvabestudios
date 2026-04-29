# Tooling Playbook

Use tools as optional follow-ups, not as the default source of truth.

## Prefer These First
- Repo inspection
- Production build output
- Google Search Central guidance
- Framework docs

## Recommend Search Console When
- The user needs confirmation that a page is indexed
- There is uncertainty around canonical selection
- The audit needs query, impression, or coverage data
- Sitemap submission status matters

## Recommend Rich Results Test When
- JSON-LD exists or is being proposed
- The user wants to validate whether markup is parseable
- Schema eligibility is part of the launch checklist

## Recommend PageSpeed Insights or CWV Measurement When
- The repo shows obvious media or hydration risk
- The user needs live Core Web Vitals evidence
- A route is performance-sensitive and repo inspection cannot quantify the impact

## Recommend Screaming Frog When
- The site has many URLs
- The user needs a crawl map, duplicate-title detection, redirect analysis, or internal-link inventory
- The repo and the live site may be out of sync

## Recommend Ahrefs or Semrush When
- The user wants keyword, backlink, or competitive visibility context
- The audit should include opportunity sizing beyond technical SEO
- The user needs a second pass on broken links, duplicate metadata, or content gaps at scale

## Tool Recommendation Rule
- Recommend tools only when they materially improve confidence or scale.
- Keep the core audit valid even if the user has no paid tooling.

