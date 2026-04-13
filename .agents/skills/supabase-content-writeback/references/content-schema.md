# Content Schema Reference

Use this reference when writing homepage, about, AI Workflows, or case-study content through the script.

## Local Source Of Truth
- The only local source of truth is the JSON files in `components/studio/data/`.
- Update local content there first.
- Only push to Supabase after the user explicitly confirms production writeback.
- Do not maintain duplicate local mirrors of the same content elsewhere in the repo.

## Supabase Target
- Table: `content_documents`
- Primary keys: `homepage`, `about`, `ai_workflows`, `case_studies`
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

## AI Workflows Document Shape
```json
{
  "hero": {
    "eyebrow": "AI Workflows",
    "titleLineOne": "AI belongs inside every",
    "titleLineTwo": "product loop.",
    "description": "AI compresses the path from ambiguity to traction..."
  },
  "workflow": {
    "eyebrow": "How We Infuse AI",
    "title": "AI is woven into the loop, not bolted on afterward.",
    "description": "...",
    "stages": [
      {
        "step": "01",
        "title": "Frame",
        "eyebrow": "Sharper problem selection",
        "description": "...",
        "bullets": ["..."],
        "iconKey": "compass",
        "tone": "tintLavender"
      }
    ]
  },
  "disciplines": {
    "eyebrow": "Across The Stack",
    "title": "Strategy, design, engineering, and growth stay in one learning system.",
    "description": "...",
    "items": [
      {
        "title": "Strategy",
        "description": "...",
        "bullets": ["..."],
        "iconKey": "searchCheck"
      }
    ]
  },
  "guardrails": {
    "eyebrow": "What Stays Human",
    "title": "AI raises leverage. Judgment keeps the work valuable.",
    "description": "...",
    "items": [
      {
        "title": "Problem framing still needs humans",
        "description": "...",
        "iconKey": "compass"
      }
    ]
  },
  "cta": {
    "eyebrow": "AI-first execution",
    "title": "If you want AI inside the operating model, not added as theater.",
    "description": "...",
    "primaryCtaLabel": "Start Your Project",
    "primaryCtaHref": "#"
  }
}
```

## Case Studies Document Shape
- Value is an array of case-study objects.
- Preserve each case study's `id` and existing structural fields.
- For homepage studio card references in `case_studies`, keep `coverImages.card` and `mockImageSrc` on the `cover-mock` asset paths unless the user explicitly requests a homepage asset change first.
