"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export type Faq = { question: string; answer: string };

type FaqSectionProps = {
  title?: string;
  description?: string;
  faqs: Faq[];
};

export default function FaqSection({ title, description, faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs?.length) return null;

  return (
    <section className="mb-12">
      {(title || description) && (
        <div className="mb-8 space-y-2">
          {title && (
            <h2 className="text-3xl font-medium font-primary text-[#5829C7]">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-base text-gray-600 font-secondary">{description}</p>
          )}
        </div>
      )}

      <div className="divide-y divide-(--color-border-default) rounded-2xl border border-(--color-border-default) bg-white">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-base font-semibold text-(--neutral-900) md:text-lg">
                  {faq.question}
                </span>
                <Plus
                  size={20}
                  className={`shrink-0 text-brand transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
              <div
                className={`grid overflow-hidden px-6 transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <p className="min-h-0 text-[15px] leading-relaxed text-(--color-text-secondary)">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
