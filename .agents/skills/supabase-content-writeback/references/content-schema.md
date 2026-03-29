# Content Schema Reference

Use this reference when writing homepage, about, or case-study content through the script.

## Local Source Of Truth
- The only local source of truth is the JSON files in `components/studio/data/`.
- Update local content there first.
- Only push to Supabase after the user explicitly confirms production writeback.
- Do not maintain duplicate local mirrors of the same content elsewhere in the repo.

## Supabase Target
- Table: `content_documents`
- Primary keys: `homepage`, `about`, `case_studies`
- Project ref: `dremhlpuxcgjtkxxgfyw`

## Homepage Document Shape
```json
{
  "navigationItems": [{ "label": "About", "href": "/about" }],
  "hero": {
    "headlineIntro": "Build the",
    "headlineHighlight": "right",
    "headlineLineTwo": "product faster.",
    "supportPrefix": "Clarity for founders under pressure. We help you decide what to build, ship it fast, and move toward traction with",
    "supportHighlight": "AI-first strategy, design, engineering, and growth.",
    "ctaLabel": "Talk Through Your Roadmap",
    "ctaHref": "#"
  },
  "work": {
    "eyebrow": "Work",
    "headline": "Make better bets. Ship faster.",
    "supportPrefix": "Turn roadmap bets into",
    "supportHighlight": "shipped product",
    "supportSuffix": ", sharper positioning, and faster learning with one AI-first execution partner."
  }
}
```

## About Document Shape
```json
{
  "hero": {
    "eyebrow": "About Yuvabe",
    "title": "We help founders make better",
    "highlight": "bets.",
    "description": "Rooted in Auroville...",
    "supportingLine": "",
    "primaryCtaLabel": "Start Your Project",
    "primaryCtaHref": "/#process",
    "secondaryCtaLabel": "See Our Work",
    "secondaryCtaHref": "/#work",
    "callouts": [
      { "label": "Founded", "value": "2020", "description": "..." }
    ]
  },
  "story": {
    "eyebrow": "Our story",
    "title": "Rooted in care. Built for clearer bets.",
    "paragraphs": ["...", "...", "..."],
    "operatingPrinciples": [
      { "title": "Decide faster", "description": "..." }
    ]
  },
  "workflow": {
    "eyebrow": "How we work",
    "title": "One team across the full loop.",
    "description": "...",
    "stages": [
      { "label": "Strategy", "description": "..." }
    ]
  },
  "proof": {
    "eyebrow": "Selected work",
    "title": "A few places we've done this.",
    "description": "...",
    "entries": [
      { "client": "TVAM", "sector": "...", "summary": "..." }
    ]
  },
  "values": {
    "eyebrow": "How we work",
    "title": "How we work.",
    "description": "...",
    "values": [
      { "title": "Care", "description": "..." }
    ],
    "principles": ["Stay useful"]
  },
  "teamTeaser": {
    "eyebrow": "Team",
    "title": "Small team. Close collaboration.",
    "description": "...",
    "points": ["..."]
  },
  "cta": {
    "eyebrow": "Start the conversation",
    "title": "If you want more than a vendor, talk to us.",
    "description": "...",
    "primaryCtaLabel": "Start Your Project",
    "primaryCtaHref": "/#process",
    "secondaryCtaLabel": "See Our Work",
    "secondaryCtaHref": "/#work"
  }
}
```

## Case Studies Document Shape
- Value is an array of case-study objects.
- Preserve each case study's `id` and existing structural fields.
