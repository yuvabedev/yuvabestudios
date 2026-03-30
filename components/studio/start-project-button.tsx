"use client";

import type { ReactNode, MouseEvent } from "react";

import { useStartProjectModal } from "@/components/studio/start-project-modal-provider";
import { Button, type ButtonProps } from "@/components/ui/button";

type StartProjectButtonProps = ButtonProps & {
  children: ReactNode;
  source?: string;
};

// This shared trigger keeps the project-start action consistent no matter which section launches it.
export function StartProjectButton({
  children,
  source,
  onClick,
  ...props
}: StartProjectButtonProps) {
  const { openStartProject } = useStartProjectModal();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    openStartProject(source);
  }

  return (
    <Button type="button" onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
