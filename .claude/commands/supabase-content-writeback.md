---
description: Persist approved homepage or case-study content directly to Supabase. Only trigger when the user explicitly says "write this change into production".
---

You are now operating with the Yuvabe Supabase Content Writeback skill loaded.

## Required Context — Load First

Read these files before any write operation:
1. @.agents/skills/supabase-content-writeback/references/content-schema.md — payload shape and table keys (read before every write)
2. @.agents/skills/brand-foundation/references/brand-summary.md — load for public-facing messaging changes
3. @.agents/skills/proof-library/references/client-projects.md — load when the update affects case-study facts

## Safety Gate

**Do not write to production unless BOTH conditions are met:**
1. The user explicitly said "write this change into production"
2. The user has responded with the exact phrase: **`confirm: write into production`**

If either is missing, stop and ask for explicit confirmation before proceeding.

## Workflow

1. Confirm the user explicitly said "write this change into production".
2. Ask for final confirmation with the exact phrase: "confirm: write into production".
3. Read the current content from Supabase before proposing or applying any changes.
4. Treat local files in `components/studio/data/` as the only local source of truth.
5. Draft or revise copy in those local files first — do not mutate the database while still exploring options.
6. Preserve the existing JSON shape exactly unless the user explicitly asks for a schema change.
7. Write the updated local document back only after the final copy is settled and the confirmation phrase is received.
8. Re-read the written row to verify the saved payload matches what was intended.
9. Tell the user what changed and which `content_documents.key` was written.

## Execution Paths

**Prefer MCP** if the server is available and authenticated.

**Script fallback** when MCP is unavailable:
```bash
# Read
node .agents/skills/supabase-content-writeback/scripts/content-doc.js read homepage

# Write
node .agents/skills/supabase-content-writeback/scripts/content-doc.js write homepage components/studio/data/studio-homepage-content.json
node .agents/skills/supabase-content-writeback/scripts/content-doc.js write about components/studio/data/studio-about-content.json
node .agents/skills/supabase-content-writeback/scripts/content-doc.js write case_studies components/studio/data/studio-case-studies.json
```

Script requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` to be set.

## Guardrails

- Treat Supabase as the source of truth only for the content document being edited; make no unrelated database changes.
- Prefer updating `content_documents.key = "homepage"` or `content_documents.key = "case_studies"`.
- Do not maintain a second local mirror outside `components/studio/data/`.
- Do not invent case-study facts; if proof is weak, route through proof-library first.
- Scope writes to the configured Yuvabe project; avoid broad account-level actions.
- If local files and Supabase differ, fix local files first, then push those exact files to production after confirmation.

## Response Pattern

- Say that the skill is using Supabase MCP writeback (or script fallback if MCP is unavailable).
- Summarize the current local content and current Supabase content when they differ.
- Show the proposed copy briefly when the change is substantial or risky.
- After writing, report the exact document key updated and the verification result.

The user wants to:

$ARGUMENTS
