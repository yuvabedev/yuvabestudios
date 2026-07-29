"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, LoaderCircle, Mail, MapPin, Phone } from "lucide-react";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { StudioHeader } from "@/components/studio/studio-header";
import { StudioPageRails } from "@/components/studio/studio-page-shell";
import { Button } from "@/components/ui/button";

type StudioContactPageProps = {
  navigationItems: StudioHomepageNavItem[];
};

// Contact facts live in one place so the visible copy, the tap targets, and the
// structured data can never drift apart.
export const CONTACT_DETAILS = {
  email: "sales@yuvabe.com",
  phoneDisplay: "+91 96776 04467",
  phoneHref: "+919677604467",
  address: {
    line1: "Yuvabe, Saracon campus",
    line2: "Kottakarai Road, Auroville",
    line3: "Tamil Nadu 605009",
  },
} as const;

// Keyless Google Maps embed — renders the campus pin without an API key.
const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=Yuvabe%20Saracon%20campus%20Kottakarai%20Road%20Auroville%20Tamil%20Nadu%20605009&t=&z=15&ie=UTF8&iwloc=&output=embed";

const conversationTopics = [
  "Product strategy",
  "Design + engineering",
  "AI-native app or workflow",
  "Growth marketing",
] as const;

const inputClassName =
  "h-11 w-full rounded-[1.1rem] border border-[color:color-mix(in_srgb,var(--lavender-500)_22%,white)] bg-white/92 px-4 text-body-md text-[var(--neutral-900)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-colors placeholder:text-[var(--neutral-400)] focus:border-[color:color-mix(in_srgb,var(--purple-500)_36%,white)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--purple-500)_14%,white)]";

const textareaClassName =
  "min-h-[7rem] w-full rounded-[1.1rem] border border-[color:color-mix(in_srgb,var(--lavender-500)_22%,white)] bg-white/92 px-4 py-3 text-body-md text-[var(--neutral-900)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-colors placeholder:text-[var(--neutral-400)] focus:border-[color:color-mix(in_srgb,var(--purple-500)_36%,white)] focus:ring-2 focus:ring-[color:color-mix(in_srgb,var(--purple-500)_14%,white)]";

const pillClassName =
  "inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 py-1.5 text-left text-body-sm shadow-[0_8px_18px_rgba(15,23,42,0.04)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_srgb,var(--purple-500)_18%,white)]";

function toggleSelection(currentValues: string[], value: string) {
  return currentValues.includes(value)
    ? currentValues.filter((item) => item !== value)
    : [...currentValues, value];
}

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_DETAILS.email,
    href: `mailto:${CONTACT_DETAILS.email}`,
  },
  {
    icon: Phone,
    label: "Call or WhatsApp",
    value: CONTACT_DETAILS.phoneDisplay,
    href: `tel:${CONTACT_DETAILS.phoneHref}`,
  },
  {
    icon: MapPin,
    label: "Visit the studio",
    value: `${CONTACT_DETAILS.address.line1}, ${CONTACT_DETAILS.address.line2}, ${CONTACT_DETAILS.address.line3}`,
    href: MAP_EMBED_SRC.replace("&output=embed", ""),
  },
] as const;

export function StudioContactPage({ navigationItems }: StudioContactPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/start-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, needs, notes, source: "contact-page" }),
      });

      const body = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(body.error || "Unable to send your message.");
      }

      setSubmitState("success");
      setSubmitMessage("Thanks for reaching out — we'll be in touch shortly.");
      setName("");
      setEmail("");
      setPhone("");
      setNeeds([]);
      setNotes("");
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(
        error instanceof Error ? error.message : "Unable to send your message right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-x-clip overflow-y-visible bg-white text-foreground"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <article className="relative z-10">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white pt-16 pb-10 md:pt-24 md:pb-14">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="-bottom-28 absolute left-1/2 h-96 w-160 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.16)_0%,rgba(203,195,223,0.16)_34%,rgba(255,202,45,0.12)_56%,rgba(255,255,255,0)_78%)] blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
            <div className="max-w-4xl lg:pl-4 xl:pl-6">
              <p className="text-label-sm uppercase tracking-[0.22em] text-(--color-text-tertiary)">
                Get in touch
              </p>
              <h1
                className="mt-4 text-display-muted-editorial tracking-[-0.035em] text-(--neutral-950)"
                style={{ fontSize: "clamp(2.75rem,6vw,4rem)", fontWeight: 600 }}
              >
                Let&apos;s build something together.
              </h1>
              <p className="mt-5 max-w-2xl text-hero-support">
                Tell us about the product, the bottleneck, or the next big bet.{" "}
                <span className="text-(--color-text-brand)">
                  We usually reply within one business day.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ── Form + details ───────────────────────────────────────────────── */}
        <section className="relative pb-16 md:pb-24">
          <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:pl-4 xl:pl-6">
              {/* Form */}
              <div className="rounded-[1.75rem] border border-slate-200/80 bg-white/70 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)] backdrop-blur-sm sm:p-8 lg:p-10">
                <h2 className="text-heading-xl text-(--neutral-950)">Send us a message</h2>
                <p className="mt-2 text-body-md text-(--color-text-secondary)">
                  Fill in the form and the team will get back to you.
                </p>

                <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-label-lg text-(--neutral-800)">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      className={inputClassName}
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-label-lg text-(--neutral-800)">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className={inputClassName}
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-phone" className="text-label-lg text-(--neutral-800)">
                        Phone or WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        className={inputClassName}
                        placeholder="Optional"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-label-lg text-(--neutral-800)">What&apos;s this about?</p>
                    <div className="flex flex-wrap gap-2.5">
                      {conversationTopics.map((topic) => {
                        const isSelected = needs.includes(topic);
                        return (
                          <button
                            key={topic}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setNeeds((curr) => toggleSelection(curr, topic))}
                            className={[
                              pillClassName,
                              isSelected
                                ? "border-brand bg-brand text-white shadow-[0_12px_28px_rgba(88,41,199,0.22)]"
                                : "border-slate-200 bg-white text-(--neutral-800) hover:border-[color-mix(in_srgb,var(--purple-500)_24%,white)] hover:bg-white",
                            ].join(" ")}
                          >
                            {isSelected ? <Check className="size-3.5 text-white" /> : null}
                            <span>{topic}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-notes" className="text-label-lg text-(--neutral-800)">
                      Message
                    </label>
                    <textarea
                      id="contact-notes"
                      name="notes"
                      className={textareaClassName}
                      placeholder="Share the product, timeline, or the decision you want help making."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2">
                          <LoaderCircle className="size-4 animate-spin" />
                          Sending
                        </span>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                    <p
                      aria-live="polite"
                      className={[
                        "text-body-sm",
                        submitState === "error"
                          ? "text-red-600"
                          : submitState === "success"
                            ? "text-emerald-700"
                            : "text-(--color-text-tertiary)",
                      ].join(" ")}
                    >
                      {submitMessage || "Your message is captured securely and queued for follow-up."}
                    </p>
                  </div>
                </form>
              </div>

              {/* Details + map */}
              <div className="flex flex-col gap-6">
                <div className="grid gap-4">
                  {contactCards.map((card) => {
                    const Icon = card.icon;
                    const isExternal = card.href.startsWith("http");
                    return (
                      <a
                        key={card.label}
                        href={card.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-5 transition-colors hover:border-[color-mix(in_srgb,var(--purple-500)_28%,white)] hover:bg-white"
                      >
                        <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                          <Icon className="size-5 text-brand" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-label-sm uppercase tracking-[0.16em] text-(--color-text-tertiary)">
                            {card.label}
                          </span>
                          <span className="mt-1 block text-body-lg text-(--neutral-900) transition-colors group-hover:text-(--color-text-brand)">
                            {card.value}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>

                {/* Map */}
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[var(--neutral-100)] shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
                  <iframe
                    title="Yuvabe Studios — Saracon campus, Auroville"
                    src={MAP_EMBED_SRC}
                    className="h-72 w-full border-0 lg:h-80"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <p className="text-body-sm text-(--color-text-tertiary)">
                  Prefer email? Write to{" "}
                  <Link
                    href={`mailto:${CONTACT_DETAILS.email}`}
                    className="text-(--neutral-700) underline-offset-4 transition-colors hover:text-(--color-text-brand) hover:underline"
                  >
                    {CONTACT_DETAILS.email}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
