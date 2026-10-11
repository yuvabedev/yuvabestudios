"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

import { useStartProjectModal } from "@/components/studio/start-project-modal-provider";

type StartProjectLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: ComponentProps<typeof Link>["href"];
  source?: string;
};

// Link-shaped "Start a project" trigger for CTAs with bespoke styling. A plain click opens the
// shared inquiry modal; modified clicks (new tab/window) and no-JS fall back to the contact page.
export function StartProjectLink({
  href = "/contact",
  source,
  onClick,
  ...props
}: StartProjectLinkProps) {
  const { openStartProject } = useStartProjectModal();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }

    event.preventDefault();
    openStartProject(source);
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
