---
name: studio-cms-page
description: Use when adding CMS support for a new or existing page so it becomes editable via Studio-Admin. Covers schema definition, local data file, studio-content.ts wiring, server action, and admin editor tab. Trigger when the user says "add this page to Studio-Admin", "make this page editable", or "wire up CMS for <page>".
---

# Studio CMS Page Skill

## Objective
Wire a new or existing Next.js page into the Studio-Admin editor so its content can be edited and persisted to Supabase, following the same pattern as homepage, about, ai-workflows, and case-studies.

## Required Load Order
1. Read the target page component to inventory all content fields before touching anything else.
2. Load `../supabase-content-writeback/references/content-schema.md` to keep the Supabase document shape valid.
3. Load `../brand-foundation/SKILL.md` if any copy or field labels are being written for the first time.

---

## Four-Step Implementation Pattern

Every page follows this exact sequence. Complete all four steps before testing.

### Step 1 — Schema file
**Location**: `components/studio/studio-<page-slug>-content.ts`

- Export a TypeScript type for the full page content shape.
- Export a `parse<PageSlug>ContentInput(raw: unknown)` function that validates and normalizes every field using the same helpers used in existing parsers (`expectString`, `optionalString`, `expectArray`, `normalizeString`).
- Mirror these helpers — do not import them from elsewhere; copy the exact same logic used in `lib/studio-content.ts`.
- Every field path in validation errors must be dot-notated from the root, e.g. `"digitalMarketing.hero.title"`.

**Reference**: `components/studio/studio-ai-workflows-content.ts` is the cleanest example to follow.

### Step 2 — Local data file
**Location**: `components/studio/data/studio-<page-slug>-content.json`

- Copy the current hardcoded content out of the page component (or its content file) into this JSON.
- The JSON must be valid against the TypeScript type defined in Step 1.
- This file is the local source of truth and the fallback when Supabase is unreachable.
- Keep `iconKey` and other enum fields as their string values (not resolved components).

### Step 3 — studio-content.ts wiring
**Location**: `lib/studio-content.ts`

Add four things for the new page (follow the exact pattern of `getStudioAiWorkflowsContent` / `saveStudioAiWorkflowsContent`):

1. `CONTENT_KEY_<PAGE>` constant matching the Supabase `content_documents.key` value (snake_case, e.g. `"digital_marketing"`).
2. `getStudio<PageSlug>Content(opts?)` — reads from Supabase first, falls back to the local JSON file.
3. `saveStudio<PageSlug>Content(content, opts?)` — validates then upserts to Supabase.
4. Re-export `parseStudio<PageSlug>ContentInput` from the schema file so `actions.ts` has a single import path.

### Step 4 — Server action + editor tab

**Action** (`app/studio-admin/actions.ts`):
```ts
export async function save<PageSlug>ContentAction(formData: FormData) {
  const payload = expectString(formData.get("payload"), "<Page> payload");
  const parsedPayload = parse<PageSlug>ContentInput(JSON.parse(payload));
  await saveStudio<PageSlug>Content(parsedPayload, { source: "supabase" });
  revalidatePath("/<page-route>");
  revalidatePath("/studio-admin");
  redirect("/studio-admin?tab=<page-slug>&saved=<page-slug>");
}
```

**Editor tab** (`components/studio/studio-admin-editor.tsx`):
- Add a new `<TabsTrigger>` and `<TabsContent>` entry.
- Use the existing tab components as the template — each field maps to a labeled input or textarea.
- Pass the server action as the form action.
- For arrays (services, case studies, etc.) render one group of fields per item with an index prefix in the field name.

---

## Page Route Integration

After the four steps, update the page's route file (`app/<page-route>/page.tsx`):

1. Remove the hardcoded content import (the `export const` literal object).
2. Call `getStudio<PageSlug>Content()` in the server component and pass the result as props.
3. Mark the route `export const dynamic = "force-dynamic"` if it isn't already.

---

## Supabase Bootstrap

The first time `getStudio<PageSlug>Content()` is called against an empty Supabase instance, the function must:
1. Detect that no row exists for the new key.
2. Insert the local JSON as the initial document (same bootstrap pattern used for `homepage`).

Verify by running the dev server, loading the page, then opening `/studio-admin` and confirming the new tab shows the seeded content.

---

## Content Key Registry

Keep this list updated as pages are added:

| Page | content_documents.key | Local fallback file |
|------|-----------------------|---------------------|
| Homepage | `homepage` | `studio-homepage-content.json` |
| About | `about` | `studio-about-content.json` |
| AI Workflows | `ai_workflows` | `studio-ai-workflows-content.json` |
| Case Studies | `case_studies` | `studio-case-studies.json` |
| Digital Marketing | `digital_marketing` | `studio-digital-marketing-content.json` |

---

## Guardrails

- Never hardcode content inside a page component once CMS wiring is complete. All copy must come through `getStudio<PageSlug>Content()`.
- Do not change the shape of existing Supabase documents when adding a new page.
- The local JSON file and the Supabase document must stay in sync; if they differ after a save, the Supabase version wins at runtime.
- Do not add `iconKey` resolution logic to the schema/data layer — keep that in the UI component.
- Run `parse<PageSlug>ContentInput` on the Supabase payload on every read to catch schema drift early.
- After wiring, update `supabase-content-writeback/SKILL.md` to include the new script commands for the new content key.

---

## Checklist

Use this before marking a page as wired:

- [ ] Schema file created and parser exported
- [ ] Local JSON file created with current content
- [ ] `getStudio<PageSlug>Content` added to `lib/studio-content.ts`
- [ ] `saveStudio<PageSlug>Content` added to `lib/studio-content.ts`
- [ ] Server action added to `app/studio-admin/actions.ts`
- [ ] Editor tab added to `components/studio/studio-admin-editor.tsx`
- [ ] Page route updated to call `getStudio<PageSlug>Content()`
- [ ] Supabase bootstrap verified (dev server loads without errors)
- [ ] Studio-Admin tab shows correct seeded content
- [ ] Save round-trip tested (edit a field, save, reload page)
- [ ] `supabase-content-writeback/SKILL.md` script commands updated
