import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

// Keep button variants centralized so every CTA shares the same base contract.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--ds-radius-md)] text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2 [&_[data-icon='inline-end']]:ml-0.5 [&_[data-icon='inline-start']]:mr-0.5",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:translate-y-[-1px] hover:opacity-95",
        secondary:
          "border border-border bg-background text-foreground shadow-sm hover:bg-muted",
        ghost: "text-foreground hover:bg-foreground/5",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
        icon: "size-10 rounded-[var(--ds-radius-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
  spinnerPlacement?: "start" | "end";
}

// Support native buttons and slotted links while preserving the shared variants.
function Button({
  children,
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  loadingText,
  spinnerPlacement = "start",
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const resolvedDisabled = disabled || loading;
  const spinner = (
    <Spinner
      data-icon={spinnerPlacement === "start" ? "inline-start" : "inline-end"}
    />
  );
  const content = loadingText ?? children;

  if (asChild) {
    return (
      <Comp
        aria-busy={loading || undefined}
        aria-disabled={resolvedDisabled || undefined}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      aria-busy={loading || undefined}
      aria-disabled={undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={resolvedDisabled}
      {...props}
    >
      {loading && spinnerPlacement === "start" ? spinner : null}
      {content}
      {loading && spinnerPlacement === "end" ? spinner : null}
    </Comp>
  );
}

export { Button, buttonVariants };
