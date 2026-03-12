import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const premiumSurfaceVariants = cva("relative border text-foreground transition-[background-color,border-color,box-shadow,filter]", {
  variants: {
    tone: {
      glass:
        "border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.64),rgba(255,255,255,0.38))]",
      glassSubtle: "border-white/50 bg-white/45",
      warm:
        "border-[color:color-mix(in_srgb,var(--purple-500)_20%,white)] bg-[color:color-mix(in_srgb,var(--purple-500)_8%,white)]",
      neutral: "border-slate-200/80 bg-white/90",
    },
    elevation: {
      sm: "shadow-[0_12px_28px_rgba(15,23,42,0.07)]",
      md: "shadow-[0_20px_48px_rgba(15,23,42,0.08)]",
      lg: "shadow-[0_28px_80px_rgba(15,23,42,0.12)]",
    },
    blur: {
      none: "backdrop-blur-none",
      sm: "backdrop-blur-sm",
      md: "backdrop-blur-md",
      lg: "backdrop-blur-xl",
    },
    radius: {
      md: "rounded-[1rem]",
      lg: "rounded-[1.5rem]",
      xl: "rounded-[2rem]",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    tone: "glass",
    elevation: "md",
    blur: "md",
    radius: "lg",
  },
});

export interface PremiumSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof premiumSurfaceVariants> {
  asChild?: boolean;
}

// This shared surface contract keeps glass, elevated, and hero-callout layers visually consistent.
function PremiumSurface({
  className,
  tone,
  elevation,
  blur,
  radius,
  asChild = false,
  ...props
}: PremiumSurfaceProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="premium-surface"
      className={cn(premiumSurfaceVariants({ tone, elevation, blur, radius }), className)}
      {...props}
    />
  );
}

export { PremiumSurface, premiumSurfaceVariants };
