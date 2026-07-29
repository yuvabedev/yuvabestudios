"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";

import type { BlogHeading } from "@/components/blog/blog-body";

// ─── Reading progress bar ─────────────────────────────────────────────────────
function ReadingProgress({ targetRef }: { targetRef: React.RefObject<HTMLDivElement | null> }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport;
      if (total <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [targetRef]);

  return (
    <div className="fixed inset-x-0 top-0 z-40 h-1 bg-transparent">
      <div
        className="h-full origin-left bg-brand transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

// ─── Share links ──────────────────────────────────────────────────────────────
function ShareLinks({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable — no-op.
    }
  }

  const iconCls =
    "flex size-9 items-center justify-center rounded-full border border-(--color-border-default) bg-white text-(--neutral-500) transition-colors hover:border-brand/30 hover:text-brand";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-(--neutral-400)">
        Share
      </span>
      <a
        className={iconCls}
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X / Twitter"
      >
        <Twitter size={15} />
      </a>
      <a
        className={iconCls}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </a>
      <button type="button" onClick={copy} className={iconCls} aria-label="Copy link">
        {copied ? <Check size={15} className="text-brand" /> : <Link2 size={15} />}
      </button>
    </div>
  );
}

// ─── Table of contents (scroll-spy) ───────────────────────────────────────────
function TableOfContents({ headings }: { headings: BlogHeading[] }) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // Pick the first heading (in document order) currently in the band.
        const firstVisible = headings.find((h) => visible.has(h.id));
        if (firstVisible) setActiveId(firstVisible.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [headings]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-(--neutral-400)">
        On this page
      </p>
      <ul className="space-y-1 border-l border-(--color-border-default)">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={[
                  "-ml-px block border-l-2 py-1 leading-snug transition-colors",
                  heading.level === 3 ? "pl-6" : "pl-4",
                  isActive
                    ? "border-brand font-medium text-brand"
                    : "border-transparent text-(--neutral-500) hover:text-(--neutral-900)",
                ].join(" ")}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ─── Reader shell ─────────────────────────────────────────────────────────────
export function BlogReader({
  headings,
  title,
  shareUrl,
  children,
}: {
  headings: BlogHeading[];
  title: string;
  shareUrl: string;
  children: ReactNode;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const hasToc = headings.length > 1;

  return (
    <>
      <ReadingProgress targetRef={contentRef} />

      <div
        ref={contentRef}
        className={
          hasToc
            ? "grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14"
            : ""
        }
      >
        {hasToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <TableOfContents headings={headings} />
              <div className="border-t border-(--color-border-default) pt-6">
                <ShareLinks title={title} url={shareUrl} />
              </div>
            </div>
          </aside>
        )}

        <div className="min-w-0 max-w-3xl">
          {children}

          {/* Mobile / no-sidebar share row */}
          <div className={hasToc ? "mt-12 border-t border-(--color-border-default) pt-6 lg:hidden" : "mt-12 border-t border-(--color-border-default) pt-6"}>
            <ShareLinks title={title} url={shareUrl} />
          </div>
        </div>
      </div>
    </>
  );
}
