import * as React from "react";

import { cn } from "@/lib/utils";

// The base card primitive gives higher-level marketing and product cards a shared shadcn-style shell.
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-[var(--ds-radius-xl)] border border-[var(--color-border-default)] bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}

// The card header keeps title-group spacing consistent across card compositions.
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex flex-col gap-3 p-6", className)} {...props} />;
}

// The card title preserves a reusable heading contract inside cards.
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("text-heading-sm text-foreground", className)} {...props} />;
}

// The card description gives supporting copy a quieter but still readable treatment.
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-body-sm text-muted-foreground", className)} {...props} />;
}

// The card content holds the main body without re-defining the shell.
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

// The card footer keeps bottom-aligned content spacing predictable across variants.
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
