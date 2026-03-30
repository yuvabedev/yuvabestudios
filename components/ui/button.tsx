"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";

import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const MotionButton = motion.button;
const MotionSlot = motion.create(Slot) as React.ElementType;

// Tweak this shared motion config to make every button hover feel snappier or softer.
const buttonMotionConfig = {
  hoverDuration: 0.5,
  ease: [0.22, 1, 0.36, 1] as const,
};

const buttonHoverTransition = {
  duration: buttonMotionConfig.hoverDuration,
  ease: buttonMotionConfig.ease,
};

type ButtonVariant = "default" | "secondary" | "ghost";
type ButtonElementProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
>;

const buttonMotionMap: Record<
  ButtonVariant,
  {
    rest: { backgroundColor: string; boxShadow: string; y: number };
    hover: { backgroundColor: string; boxShadow: string; y: number };
  }
> = {
  default: {
    rest: {
      backgroundColor: "var(--color-action-primary-bg)",
      boxShadow: "var(--ds-shadow-sm)",
      y: 0,
    },
    hover: {
      backgroundColor: "var(--color-action-primary-hover)",
      boxShadow: "var(--ds-shadow-lg)",
      y: -1,
    },
  },
  secondary: {
    rest: {
      backgroundColor: "var(--color-action-secondary-bg)",
      boxShadow: "var(--ds-shadow-sm)",
      y: 0,
    },
    hover: {
      backgroundColor: "var(--color-action-secondary-hover)",
      boxShadow: "var(--ds-shadow-lg)",
      y: 0,
    },
  },
  ghost: {
    rest: {
      backgroundColor: "rgba(255,255,255,0)",
      boxShadow: "var(--ds-shadow-none)",
      y: 0,
    },
    hover: {
      backgroundColor: "var(--color-action-ghost-hover)",
      boxShadow: "var(--ds-shadow-md)",
      y: 0,
    },
  },
};

// Keep button variants centralized so every CTA shares the same base contract.
const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--ds-radius-md)] text-sm font-medium transition-[color,border-color,opacity] duration-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2 [&_[data-icon='inline-end']]:ml-0.5 [&_[data-icon='inline-start']]:mr-0.5",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:opacity-95",
        secondary: "border border-border bg-background text-foreground shadow-sm",
        ghost: "text-foreground",
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
  extends ButtonElementProps,
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
  const shouldReduceMotion = useReducedMotion();
  const resolvedVariant = variant ?? "default";
  const resolvedDisabled = disabled || loading;
  const spinner = (
    <Spinner
      data-icon={spinnerPlacement === "start" ? "inline-start" : "inline-end"}
    />
  );
  const content = loadingText ?? children;
  const motionState = buttonMotionMap[resolvedVariant];
  const motionProps =
    shouldReduceMotion || resolvedDisabled
      ? undefined
      : {
        initial: false as const,
        animate: motionState.rest,
        whileHover: motionState.hover,
        transition: buttonHoverTransition,
      };

  if (asChild) {
    return (
      <MotionSlot
        aria-busy={loading || undefined}
        aria-disabled={resolvedDisabled || undefined}
        className={cn(buttonVariants({ variant: resolvedVariant, size, className }))}
        {...motionProps}
        {...props}
      >
        {children}
      </MotionSlot>
    );
  }

  return (
    <MotionButton
      aria-busy={loading || undefined}
      aria-disabled={undefined}
      className={cn(buttonVariants({ variant: resolvedVariant, size, className }))}
      disabled={resolvedDisabled}
      {...motionProps}
      {...props}
    >
      {loading && spinnerPlacement === "start" ? spinner : null}
      {content}
      {loading && spinnerPlacement === "end" ? spinner : null}
    </MotionButton>
  );
}

export { Button, buttonMotionConfig, buttonVariants };
