"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { motion, useReducedMotion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button-variants";
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
      suppressHydrationWarning
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
