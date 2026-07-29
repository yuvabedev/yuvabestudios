import Link from "next/link";
import type { ReactNode } from "react";

// ─── Markdown-lite renderer ───────────────────────────────────────────────────
// Renders CMS post bodies without a Markdown dependency. Everything is emitted
// as React text nodes (never dangerouslySetInnerHTML), so authored content can
// never inject markup — it is safe by construction.
//
// Supported syntax:
//   ## / ### / ####     headings
//   - or *              bullet list (consecutive lines)
//   1.                  ordered list (consecutive lines)
//   >                   blockquote
//   ```                 fenced code block
//   ![alt](url)         image (on its own line)
//   ---                 horizontal rule
//   blank line          paragraph break
// Inline: **bold**, *italic* / _italic_, `code`, [text](url)

type InlineMatch = {
  index: number;
  length: number;
  node: (key: string) => ReactNode;
};

export type BlogHeading = { id: string; text: string; level: 2 | 3 };

// Strip inline markdown markers so heading text/ids are clean.
function stripInlineMarkers(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/`([^`]+?)`/g, "$1")
    .replace(/\[(.+?)\]\((.+?)\)/g, "$1")
    .trim();
}

function slugifyHeading(text: string): string {
  return stripInlineMarkers(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Deterministic id with de-duplication. Both extractHeadings and renderBlocks
// walk the body top-to-bottom in the same order, so ids stay in sync.
function nextHeadingId(raw: string, counts: Map<string, number>): string {
  const base = slugifyHeading(raw) || "section";
  const seen = counts.get(base) ?? 0;
  counts.set(base, seen + 1);
  return seen === 0 ? base : `${base}-${seen}`;
}

// Pull the ## / ### headings out of a body for the table of contents.
export function extractHeadings(body: string): BlogHeading[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const counts = new Map<string, number>();
  const headings: BlogHeading[] = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.*)$/.exec(trimmed);
    if (match) {
      const level = match[1].length as 2 | 3;
      headings.push({
        id: nextHeadingId(match[2], counts),
        text: stripInlineMarkers(match[2]),
        level,
      });
    }
  }
  return headings;
}

function findInlineMatch(text: string): InlineMatch | null {
  const patterns: Array<{ re: RegExp; build: (m: RegExpExecArray, key: string) => ReactNode }> = [
    {
      re: /\*\*(.+?)\*\*/,
      build: (m, key) => <strong key={key}>{parseInline(m[1], key)}</strong>,
    },
    {
      re: /`([^`]+?)`/,
      build: (m, key) => (
        <code
          key={key}
          className="rounded bg-(--neutral-100) px-1.5 py-0.5 font-mono text-[0.85em] text-(--neutral-800)"
        >
          {m[1]}
        </code>
      ),
    },
    {
      re: /\[(.+?)\]\((.+?)\)/,
      build: (m, key) => {
        const href = m[2];
        const isInternal = href.startsWith("/");
        return isInternal ? (
          <Link
            key={key}
            href={href}
            className="text-(--color-text-brand) underline underline-offset-4 transition-colors hover:text-(--neutral-900)"
          >
            {parseInline(m[1], key)}
          </Link>
        ) : (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-text-brand) underline underline-offset-4 transition-colors hover:text-(--neutral-900)"
          >
            {parseInline(m[1], key)}
          </a>
        );
      },
    },
    {
      re: /\*(.+?)\*/,
      build: (m, key) => <em key={key}>{parseInline(m[1], key)}</em>,
    },
    {
      re: /_(.+?)_/,
      build: (m, key) => <em key={key}>{parseInline(m[1], key)}</em>,
    },
  ];

  let earliest: InlineMatch | null = null;
  for (const { re, build } of patterns) {
    const match = re.exec(text);
    if (match && (earliest === null || match.index < earliest.index)) {
      earliest = {
        index: match.index,
        length: match[0].length,
        node: (key) => build(match, key),
      };
    }
  }
  return earliest;
}

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let remaining = text;
  let cursor = 0;

  while (remaining.length > 0) {
    const match = findInlineMatch(remaining);
    if (!match) {
      nodes.push(remaining);
      break;
    }
    if (match.index > 0) {
      nodes.push(remaining.slice(0, match.index));
    }
    nodes.push(match.node(`${keyPrefix}-i${cursor}`));
    remaining = remaining.slice(match.index + match.length);
    cursor += 1;
  }

  return nodes;
}

function renderBlocks(body: string): ReactNode[] {
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  const headingCounts = new Map<string, number>();
  let key = 0;
  let i = 0;

  const isBullet = (line: string) => /^\s*[-*]\s+/.test(line);
  const isOrdered = (line: string) => /^\s*\d+\.\s+/.test(line);

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Blank line — skip.
    if (trimmed === "") {
      i += 1;
      continue;
    }

    // Horizontal rule.
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push(<hr key={`b${key++}`} className="my-10 border-(--color-border-default)" />);
      i += 1;
      continue;
    }

    // Fenced code block.
    if (trimmed.startsWith("```")) {
      const code: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1; // consume closing fence
      blocks.push(
        <pre
          key={`b${key++}`}
          className="my-6 overflow-x-auto rounded-xl bg-(--neutral-900) p-5 text-body-sm leading-relaxed text-(--neutral-100)"
        >
          <code className="font-mono">{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    // Standalone image: ![alt](url)
    const imageMatch = /^!\[(.*?)\]\((.+?)\)$/.exec(trimmed);
    if (imageMatch) {
      blocks.push(
        <figure key={`b${key++}`} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageMatch[2]}
            alt={imageMatch[1]}
            loading="lazy"
            className="w-full rounded-2xl"
          />
          {imageMatch[1] ? (
            <figcaption className="mt-3 text-center text-body-sm text-(--neutral-500)">
              {imageMatch[1]}
            </figcaption>
          ) : null}
        </figure>,
      );
      i += 1;
      continue;
    }

    // Headings.
    const headingMatch = /^(#{2,4})\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = parseInline(headingMatch[2], `b${key}`);
      if (level === 2) {
        blocks.push(
          <h2
            key={`b${key++}`}
            id={nextHeadingId(headingMatch[2], headingCounts)}
            className="mt-12 mb-4 scroll-mt-28 text-heading-xl font-semibold text-(--neutral-900)"
          >
            {content}
          </h2>,
        );
      } else if (level === 3) {
        blocks.push(
          <h3
            key={`b${key++}`}
            id={nextHeadingId(headingMatch[2], headingCounts)}
            className="mt-10 mb-3 scroll-mt-28 text-heading-lg font-semibold text-(--neutral-900)"
          >
            {content}
          </h3>,
        );
      } else {
        blocks.push(
          <h4 key={`b${key++}`} className="mt-8 mb-2 scroll-mt-28 text-heading-md font-semibold text-(--neutral-900)">
            {content}
          </h4>,
        );
      }
      i += 1;
      continue;
    }

    // Blockquote.
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i += 1;
      }
      blocks.push(
        <blockquote
          key={`b${key++}`}
          className="my-6 border-l-4 border-brand/40 pl-5 text-body-lg italic text-(--neutral-600)"
        >
          {parseInline(quoteLines.join(" "), `b${key}`)}
        </blockquote>,
      );
      continue;
    }

    // Bullet list.
    if (isBullet(line)) {
      const items: string[] = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ul key={`b${key++}`} className="my-5 list-disc space-y-2 pl-6 text-body-lg text-(--color-text-secondary)">
          {items.map((item, index) => (
            <li key={index}>{parseInline(item, `b${key}-${index}`)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    // Ordered list.
    if (isOrdered(line)) {
      const items: string[] = [];
      while (i < lines.length && isOrdered(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push(
        <ol key={`b${key++}`} className="my-5 list-decimal space-y-2 pl-6 text-body-lg text-(--color-text-secondary)">
          {items.map((item, index) => (
            <li key={index}>{parseInline(item, `b${key}-${index}`)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    // Paragraph — gather consecutive non-blank, non-special lines.
    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !isBullet(lines[i]) &&
      !isOrdered(lines[i]) &&
      !/^(#{2,4})\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith(">") &&
      !lines[i].trim().startsWith("```")
    ) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    blocks.push(
      <p key={`b${key++}`} className="my-5 text-body-lg leading-relaxed text-(--color-text-secondary)">
        {parseInline(paragraph.join(" "), `b${key}`)}
      </p>,
    );
  }

  return blocks;
}

export function BlogBody({ body, className = "" }: { body: string; className?: string }) {
  const trimmed = body.trim();
  if (!trimmed) return null;
  return <div className={className}>{renderBlocks(trimmed)}</div>;
}
