-- ============================================================================
-- Yuvabe Studios — Supabase schema
-- Run this once in the NEW org-owned Supabase project (SQL Editor → New query).
--
-- The app talks to Supabase only from the server using the SERVICE ROLE key
-- (see lib/supabase-admin.ts), so RLS is enabled with no public policies:
-- the service role bypasses RLS, and anon/public access is denied by default.
-- If you ever read these tables from the browser with the anon key, add
-- explicit SELECT policies below.
-- ============================================================================

-- ── content_documents ───────────────────────────────────────────────────────
-- One JSON payload per page/section, keyed by a stable string:
--   homepage, about, work_page, case_studies, careers_page, ai_workflows,
--   digital_marketing, uiux_design, ai_native_engineering, ...
-- The app upserts on `key` (onConflict: "key"), so `key` is the primary key.
create table if not exists public.content_documents (
  key         text primary key,
  payload     jsonb not null,
  updated_at  timestamptz not null default now()
);

-- ── blog_posts ───────────────────────────────────────────────────────────────
create table if not exists public.blog_posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text not null default '',
  body          text not null default '',
  cover_image   text not null default '',
  author        text not null default '',
  category      text not null default '',
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc);

-- ── keep updated_at fresh on every write ─────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists content_documents_set_updated_at on public.content_documents;
create trigger content_documents_set_updated_at
  before update on public.content_documents
  for each row execute function public.set_updated_at();

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- ── Row Level Security (server-only access via service role) ─────────────────
alter table public.content_documents enable row level security;
alter table public.blog_posts enable row level security;

-- No policies are defined on purpose: the service-role key (used only on the
-- server) bypasses RLS, and everything else is denied. Add SELECT policies here
-- only if you start reading from the browser with the anon key.
