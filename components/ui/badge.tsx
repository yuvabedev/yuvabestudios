import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { premiumSurfaceVariants } from "@/components/ui/premium-surface";
import { cn } from "@/lib/utils";

// Keep badge styles centralized so proof tags and future chips share one contract.
const badgeVariants = cva(
  "inline-flex items-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border text-foreground",
        service: "px-3 py-1.5 text-[14px] text-[var(--color-text-glass-pill)]",
        brandTagSubtle: "px-4 py-1.5 text-label-md text-[var(--color-text-brand)]",
        brandTag: "px-5 py-2.5 text-label-md text-[var(--color-text-inverse)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  colorIndex?: number;
}

function Badge({ className, variant, colorIndex, ...props }: BadgeProps) {
  const isService = variant === "service";
  const isBrandTagSubtle = variant === "brandTagSubtle";
  const isBrandTag = variant === "brandTag";
  const useBrandServiceColor = isService && colorIndex !== undefined;

  return (
    <div
      className={cn(
        useBrandServiceColor
          ? "rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-[14px] font-medium text-violet-700"
          : isService
            ? premiumSurfaceVariants({ tone: "glassPillSubtle", elevation: "sm", blur: "md", radius: "full" })
            : isBrandTagSubtle
              ? premiumSurfaceVariants({ tone: "brandPillSubtle", elevation: "sm", blur: "sm", radius: "full" })
              : isBrandTag
                ? premiumSurfaceVariants({ tone: "brandPillViolet", elevation: "sm", blur: "sm", radius: "full" })
                : badgeVariants({ variant }),
        !useBrandServiceColor && badgeVariants({ variant }),
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
