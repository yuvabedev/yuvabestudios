"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

import type { Job } from "@/lib/careers-data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type JobCardProps = {
  job: Job;
  index?: number;
};

export function JobCard({ job, index = 0 }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/careers/${job.slug}`}
        className={cn(
          "group flex flex-col gap-4 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-background-surface)] p-6",
          "shadow-[var(--ds-shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--ds-shadow-md)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-label-sm font-medium uppercase tracking-[0.12em] text-[var(--color-text-brand)]">
              {job.department}
            </span>
            <h3 className="text-heading-sm text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-text-brand)]">
              {job.title}
            </h3>
          </div>
          <span className="mt-1 shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight size={18} />
          </span>
        </div>

        <p className="text-body-sm text-[var(--color-text-secondary)] line-clamp-2">
          {job.summary}
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <Badge variant="brandTagSubtle" className="gap-1.5 text-label-sm">
            <Briefcase size={12} />
            {job.type}
          </Badge>
          <Badge variant="brandTagSubtle" className="gap-1.5 text-label-sm">
            <MapPin size={12} />
            {job.location}
          </Badge>
        </div>
      </Link>
    </motion.div>
  );
}
