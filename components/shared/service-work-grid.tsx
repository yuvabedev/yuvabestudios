"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// A service-page showcase that reuses the /work page's big-image editorial
// layout: a full-width feature lead, then an asymmetric 7/5 portrait rhythm
// with scroll parallax and on-hover micro-animations.
export type ServiceWorkItem = {
  key: string;
  title: string;
  summary: string;
  href: string;
  imageSrc?: string | null;
  category?: string;
  tags?: string[];
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const gradientFallbacks = [
  "bg-[radial-gradient(circle_at_30%_25%,rgba(88,41,199,0.22),transparent_62%),radial-gradient(circle_at_82%_75%,rgba(249,169,31,0.18),transparent_58%)]",
  "bg-[radial-gradient(circle_at_75%_20%,rgba(88,41,199,0.18),transparent_60%),radial-gradient(circle_at_18%_80%,rgba(56,189,248,0.16),transparent_58%)]",
  "bg-[radial-gradient(circle_at_25%_80%,rgba(249,169,31,0.2),transparent_60%),radial-gradient(circle_at_80%_18%,rgba(88,41,199,0.2),transparent_58%)]",
];

type WorkCardVariant = "feature" | "portrait";

function ServiceWorkCard({
  item,
  index,
  variant,
  fallbackIndex,
}: {
  item: ServiceWorkItem;
  index: number;
  variant: WorkCardVariant;
  fallbackIndex: number;
}) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const reduceMotion = useReducedMotion();
  const feature = variant === "feature";

  // Per-card scroll progress drives a gentle parallax drift on the cover.
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [34, -34]);
  const imageY = reduceMotion ? 0 : rawY;

  // Cap the media height to the viewport so the tall portrait covers never
  // overflow the screen on wide columns; object-cover handles the crop.
  const aspect = feature
    ? "aspect-[16/9] max-h-[80vh]"
    : "aspect-[9/16] max-h-[78vh]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: easeOut, delay: (index % 2) * 0.08 }}
    >
      <Link
        ref={cardRef}
        href={item.href}
        className="group block focus-visible:outline-none"
        aria-label={`View the ${item.title} case study`}
      >
        <div
          className={`relative ${aspect} w-full overflow-hidden rounded-3xl bg-(--neutral-100) ring-1 ring-(--color-border-default) transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-30px_rgba(17,17,17,0.45)]`}
        >
          {item.imageSrc ? (
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-0 -top-[8%] h-[116%] w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageSrc}
                alt={`${item.title} — ${item.summary}`}
                className="h-full w-full scale-[1.04] object-cover"
                loading={feature ? "eager" : "lazy"}
                decoding="async"
              />
            </motion.div>
          ) : (
            <div
              className={`absolute inset-0 flex items-center justify-center bg-(--neutral-950) ${
                gradientFallbacks[fallbackIndex % gradientFallbacks.length]
              }`}
            >
              <span className="px-8 text-center font-mono text-2xl font-semibold uppercase tracking-[0.12em] text-white/85 transition-transform duration-700 ease-out group-hover:scale-105 sm:text-4xl">
                {item.title}
              </span>
            </div>
          )}

          {/* Hover scrim keeps the floating CTA legible over any cover. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Floating "view case study" pill — the clay-style micro reveal. */}
          <div className="pointer-events-none absolute right-4 top-4 translate-y-2 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/85 px-4 py-2 text-[12px] font-medium text-white backdrop-blur">
              View case study
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <h3
            className={`font-semibold leading-tight text-(--neutral-950) transition-colors duration-200 group-hover:text-brand ${
              feature ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            }`}
          >
            {item.title}
          </h3>
          <p className="max-w-2xl text-[15px] leading-relaxed text-(--color-text-secondary)">
            {item.summary}
          </p>
          {(item.category || (item.tags && item.tags.length > 0)) && (
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[0.12em] text-(--neutral-500)">
              {item.category && (
                <span className="text-(--color-text-brand)">{item.category}</span>
              )}
              {item.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="before:mr-2 before:content-['·']">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export function ServiceWorkGrid({ items }: { items: ServiceWorkItem[] }) {
  if (!items.length) return null;

  return (
    <motion.div className="grid grid-cols-1 items-start gap-x-8 gap-y-14 md:gap-y-20 lg:grid-cols-12">
      {items.map((item, index) => {
        // First study leads as a full-bleed feature row.
        if (index === 0) {
          return (
            <div key={item.key} className="lg:col-span-12">
              <ServiceWorkCard
                item={item}
                index={index}
                variant="feature"
                fallbackIndex={index}
              />
            </div>
          );
        }

        // The rest fall into an asymmetric 7/5 rhythm that flips each row.
        const position = index - 1;
        const pairIndex = Math.floor(position / 2);
        const isRowStart = position % 2 === 0;
        const wideOnLeft = pairIndex % 2 === 0;
        const isWide = isRowStart ? wideOnLeft : !wideOnLeft;

        return (
          <div
            key={item.key}
            className={`${isWide ? "lg:col-span-7" : "lg:col-span-5"} ${
              !isWide ? "lg:mt-16" : ""
            }`}
          >
            <ServiceWorkCard
              item={item}
              index={index}
              variant="portrait"
              fallbackIndex={index}
            />
          </div>
        );
      })}
    </motion.div>
  );
}
