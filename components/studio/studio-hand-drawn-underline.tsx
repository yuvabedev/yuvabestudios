import { cn } from "@/lib/utils";

type StudioHandDrawnUnderlineProps = {
  variant?: "short" | "long";
  delay?: boolean;
  className?: string;
};

const brushShape =
  "M8 12.4C62 10.8 116 10.6 170 11.6C226 12.8 281 14.1 337 14.4C396 14.6 455 13.8 513 15.1C530 15.5 546 14.9 562 15.6C566.8 15.8 570.3 17.6 570.5 20.2C570.6 22.6 567.3 24.4 562.6 24.7C546.3 25.3 530.3 25.3 514 24.9C455.7 24.2 397 24.4 338.4 25C282 25.6 226.2 24.8 169.7 23.8C116.7 22.8 62.9 22.8 9.9 25C5.3 25.2 1.4 23.6 0.8 21.3C0.2 18.8 3.4 12.7 8 12.4Z";

// This underline component uses one shared tapered brush shape so every headline accent feels consistent.
export function StudioHandDrawnUnderline({ delay = false, className }: StudioHandDrawnUnderlineProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 576 32"
      className={cn(
        "hand-drawn-underline absolute left-0 top-full h-[0.18em] overflow-visible",
        delay && "hand-drawn-underline--delay",
        className
      )}
      fill="none"
      preserveAspectRatio="none"
    >
      <path className="hand-drawn-underline__shape" d={brushShape} fill="var(--purple-500)" />
    </svg>
  );
}
