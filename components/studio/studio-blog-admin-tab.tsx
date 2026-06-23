"use client";

import { useState } from "react";
import type { BlogPost, BlogPostInput } from "@/lib/blog";
import { saveBlogPostAction, deleteBlogPostAction } from "@/app/studio-admin/actions";

type Mode = { type: "list" } | { type: "edit"; post: BlogPostInput & { id?: string } };

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const empty: BlogPostInput = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  cover_image: "",
  author: "",
  category: "",
  published: false,
  published_at: null,
};

const inputCls =
  "w-full rounded-lg border border-(--color-border-default) bg-white px-3 py-2 text-sm text-(--neutral-900) outline-none focus:border-brand focus:ring-2 focus:ring-brand/10";
const textareaCls = `${inputCls} min-h-[120px] resize-y`;
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-widest text-(--neutral-500)";

export function BlogAdminTab({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [mode, setMode] = useState<Mode>({ type: "list" });
  const [deleting, setDeleting] = useState<string | null>(null);

  function openNew() {
    setMode({ type: "edit", post: { ...empty } });
  }

  function openEdit(post: BlogPost) {
    setMode({
      type: "edit",
      post: {
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        body: post.body,
        cover_image: post.cover_image,
        author: post.author,
        category: post.category,
        published: post.published,
        published_at: post.published_at,
      },
    });
  }

  if (mode.type === "list") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-md font-semibold text-(--neutral-900)">
            Blog posts ({initialPosts.length})
          </h2>
          <button
            onClick={openNew}
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90"
          >
            + New post
          </button>
        </div>

        {initialPosts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-(--color-border-default) py-16 text-center">
            <p className="text-sm text-(--neutral-500)">No posts yet. Create your first one.</p>
          </div>
        ) : (
          <div className="divide-y divide-(--color-border-default) rounded-2xl border border-(--color-border-default) bg-white">
            {initialPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest ${
                        post.published
                          ? "bg-green-100 text-green-700"
                          : "bg-(--neutral-100) text-(--neutral-500)"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    {post.category && (
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest text-brand">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-sm font-semibold text-(--neutral-900)">
                    {post.title}
                  </p>
                  <p className="text-xs text-(--neutral-500)">/blog/{post.slug}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => openEdit(post)}
                    className="rounded-lg border border-(--color-border-default) px-3 py-1.5 text-xs font-medium text-(--neutral-600) transition hover:border-brand/30 hover:text-brand"
                  >
                    Edit
                  </button>
                  <form
                    action={deleteBlogPostAction}
                    onSubmit={() => setDeleting(post.id)}
                  >
                    <input type="hidden" name="id" value={post.id} />
                    <input type="hidden" name="slug" value={post.slug} />
                    <button
                      type="submit"
                      disabled={deleting === post.id}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:border-red-400 hover:bg-red-50 disabled:opacity-50"
                      onClick={(e) => {
                        if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {deleting === post.id ? "Deleting…" : "Delete"}
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Edit mode
  const draft = mode.post;

  function update<K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) {
    setMode({ type: "edit", post: { ...draft, [key]: value } });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMode({ type: "list" })}
          className="text-sm text-(--neutral-500) transition hover:text-brand"
        >
          ← Back
        </button>
        <h2 className="text-heading-md font-semibold text-(--neutral-900)">
          {draft.id ? "Edit post" : "New post"}
        </h2>
      </div>

      <form action={saveBlogPostAction} className="space-y-5">
        <input type="hidden" name="payload" value={JSON.stringify(draft)} readOnly />

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelCls}>Title</label>
            <input
              className={inputCls}
              value={draft.title}
              onChange={(e) => {
                const newTitle = e.target.value;
                const next = { ...draft, title: newTitle };
                if (!draft.id) next.slug = slugify(newTitle);
                setMode({ type: "edit", post: next });
              }}
              placeholder="My first post"
            />
          </div>
          <div>
            <label className={labelCls}>Slug</label>
            <input
              className={inputCls}
              value={draft.slug}
              onChange={(e) => update("slug", slugify(e.target.value))}
              placeholder="my-first-post"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelCls}>Author</label>
            <input
              className={inputCls}
              value={draft.author}
              onChange={(e) => update("author", e.target.value)}
              placeholder="Name"
            />
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <input
              className={inputCls}
              value={draft.category}
              onChange={(e) => update("category", e.target.value)}
              placeholder="AI, Design, Engineering…"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Cover image URL</label>
          <input
            className={inputCls}
            value={draft.cover_image}
            onChange={(e) => update("cover_image", e.target.value)}
            placeholder="https://…"
          />
        </div>

        <div>
          <label className={labelCls}>Excerpt</label>
          <textarea
            className={textareaCls}
            style={{ minHeight: "72px" }}
            value={draft.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            placeholder="One or two sentences summarising the post."
          />
        </div>

        <div>
          <label className={labelCls}>Body</label>
          <p className="mb-2 text-xs text-(--neutral-400)">
            Separate paragraphs with a blank line (double Enter).
          </p>
          <textarea
            className={textareaCls}
            style={{ minHeight: "320px" }}
            value={draft.body}
            onChange={(e) => update("body", e.target.value)}
            placeholder="Write your post here…"
          />
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-(--color-border-default) bg-(--neutral-50) px-5 py-4">
          <label className="flex cursor-pointer items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={draft.published}
                onChange={(e) => {
                  update("published", e.target.checked);
                  if (e.target.checked && !draft.published_at) {
                    update("published_at", new Date().toISOString());
                  }
                }}
              />
              <div
                className={`h-5 w-9 rounded-full transition-colors duration-200 ${
                  draft.published ? "bg-brand" : "bg-(--neutral-300)"
                }`}
              />
              <div
                className={`absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform duration-200 ${
                  draft.published ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-(--neutral-700)">
              {draft.published ? "Published" : "Draft"}
            </span>
          </label>
          {draft.published && draft.published_at && (
            <span className="text-xs text-(--neutral-500)">
              {new Date(draft.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand/90"
          >
            {draft.id ? "Save changes" : "Create post"}
          </button>
          <button
            type="button"
            onClick={() => setMode({ type: "list" })}
            className="rounded-lg border border-(--color-border-default) px-6 py-2.5 text-sm font-medium text-(--neutral-600) transition hover:text-(--neutral-900)"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
