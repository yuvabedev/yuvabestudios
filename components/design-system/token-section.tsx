import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TokenSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
};

// This wrapper keeps every foundation section visually and structurally consistent.
export function TokenSection({ title, description, children, className }: TokenSectionProps) {
  return (
    <section
      className={cn(
        "rounded-[var(--ds-radius-xl)] border bg-card p-[var(--space-300)] shadow-sm md:p-[var(--space-400)]",
        className
      )}
    >
      <div className="mb-[var(--space-300)] max-w-3xl space-y-[var(--space-100)]">
        <h2 className="text-heading-md text-foreground">{title}</h2>
        <p className="text-body-md text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  );
}
