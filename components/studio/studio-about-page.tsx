import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import {
  type StudioAboutPageContent,
  type StudioAboutProofContent,
  type StudioAboutStoryContent,
  type StudioAboutValuesContent,
  type StudioAboutWorkflowContent,
} from "@/components/studio/studio-about-content";
import { StudioHeader } from "@/components/studio/studio-header";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { Button } from "@/components/ui/button";
import { PremiumSurface } from "@/components/ui/premium-surface";

type StudioAboutPageProps = {
  navigationItems: StudioHomepageNavItem[];
  content: StudioAboutPageContent;
};

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

const storyIcons = [Target, Sparkles, Rocket] as const;
const workflowIcons = [Compass, Lightbulb, Rocket, ShieldCheck] as const;
const valueIcons = [HeartHandshake, Target, Sparkles] as const;
const principleHashtagClasses = [
  "text-[var(--purple-500)]",
  "text-[var(--cyan-500)]",
  "text-[var(--orange-500)]",
  "text-[var(--lavender-500)]",
] as const;
const aboutAssets = {
  cover: {
    src: "/assets/about/yuvabe-cover.jpeg",
    alt: "The Yuvabe team gathered outdoors on the studio campus in Auroville.",
  },
  roots: {
    src: "/assets/about/yuvabe-image.jpeg",
    alt: "An earlier Yuvabe team group photo taken under a large tree in Auroville.",
  },
  shirtDetail: {
    src: "/assets/about/yuvabe-shirt-jpg.jpeg",
    alt: "A close-up of the Yuvabe mark printed on a grey team shirt.",
  },
  illustration: {
    src: "/assets/about/yuvabe-illustration.png",
    alt: "An illustration of a sprout growing inside a light bulb.",
  },
} as const;
const workflowCardStyles = [
  {
    tone: "tintLavender",
    numberClassName: "text-[var(--lavender-500)]",
    iconShellClassName:
      "border-white/80 bg-white/78 text-[var(--purple-500)]",
  },
  {
    tone: "tintWarm",
    numberClassName: "text-[var(--orange-500)]",
    iconShellClassName:
      "border-white/80 bg-white/80 text-[var(--orange-500)]",
  },
  {
    tone: "tintCyan",
    numberClassName: "text-[var(--cyan-500)]",
    iconShellClassName:
      "border-white/80 bg-white/78 text-[var(--cyan-500)]",
  },
  {
    tone: "tintGreen",
    numberClassName: "text-[var(--green-500)]",
    iconShellClassName:
      "border-white/80 bg-white/78 text-[var(--green-500)]",
  },
] as const;

function SectionIntro({
  eyebrow,
  title,
  description,
  className,
}: SectionIntroProps) {
  return (
    <div className={["max-w-4xl space-y-4", className].filter(Boolean).join(" ")}>
      <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
        {eyebrow}
      </p>
      <h2 className="text-section-display text-[var(--neutral-950)]">{title}</h2>
      <p className="text-body-lg text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}

type AboutMediaCardProps = {
  asset: (typeof aboutAssets)[keyof typeof aboutAssets];
  altCaption?: string;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
};

// The reusable image frame keeps the new About assets aligned to the existing premium surface system.
function AboutMediaCard({
  asset,
  altCaption,
  className,
  frameClassName,
  imageClassName,
  priority = false,
  sizes,
}: AboutMediaCardProps) {
  return (
    <PremiumSurface
      tone="glassSubtle"
      elevation="sm"
      blur="sm"
      radius="xl"
      className={["overflow-hidden", className].filter(Boolean).join(" ")}
    >
      <div
        className={[
          "relative min-h-[26rem] w-full",
          frameClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={["object-cover object-center", imageClassName].filter(Boolean).join(" ")}
        />
      </div>
      {altCaption ? (
        <div className="border-t border-slate-200/80 bg-white/92 px-4 py-3">
          <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
            {altCaption}
          </p>
        </div>
      ) : null}
    </PremiumSurface>
  );
}

// The hero reframes the legacy About story into the sharper AI-first founder promise.
function AboutHero({ content }: { content: StudioAboutPageContent["hero"] }) {
  const hero = content;
  const descriptionHighlight = "AI-first studio from Auroville";
  const descriptionParts = hero.description.split(descriptionHighlight);

  return (
    <section className="relative overflow-hidden border-b border-slate-200/80 bg-white pb-14 pt-14 md:pb-20 md:pt-16">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
        <div className="absolute left-[-12rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.12)_0%,rgba(88,41,199,0)_72%)] blur-3xl" />
        <div className="absolute right-[-10rem] top-[-10rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.18)_0%,rgba(255,202,45,0)_72%)] blur-3xl" />
      </div>

      <StudioPageContainer className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-start lg:gap-10">
        {/* The left hero column carries the founder-facing page narrative and CTA pair. */}
        <div className="space-y-6 lg:pl-4 xl:pl-6">
          <p className="text-label-sm uppercase tracking-[0.24em] text-[var(--color-text-tertiary)]">
            {hero.eyebrow}
          </p>
          <div className="space-y-5">
            <h1 className="max-w-5xl text-hero-display text-[var(--neutral-950)]">
              <span>{hero.title} </span>
              <span className="text-[var(--color-text-brand)]">{hero.highlight}</span>
            </h1>
            <p className="max-w-4xl text-hero-support text-[var(--color-text-secondary)]">
              {descriptionParts.length === 2 ? (
                <>
                  {descriptionParts[0]}
                  <span className="font-semibold text-[var(--neutral-950)]">
                    {descriptionHighlight}
                  </span>
                  {descriptionParts[1]}
                </>
              ) : (
                hero.description
              )}
            </p>

            {hero.supportingLine ? (
              /* This optional identity line only renders when the content model needs a second supporting statement. */
              <p className="max-w-4xl text-hero-support text-[var(--color-text-brand)]">
                {hero.supportingLine}
              </p>
            ) : null}
          </div>

          {/* The CTA pair reuses the shared button contract so this route matches the rest of the site. */}
          <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="min-w-[220px]">
              <Link href={hero.primaryCtaHref}>
                {hero.primaryCtaLabel}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="min-w-[180px]">
              <Link href={hero.secondaryCtaHref}>{hero.secondaryCtaLabel}</Link>
            </Button>
          </div>
        </div>

        {/* The right column becomes a quieter editorial timeline so the three positioning points can breathe. */}
        <div className="relative lg:pt-6">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[0.6875rem] top-6 w-px bg-[linear-gradient(180deg,rgba(150,136,192,0.14)_0%,rgba(150,136,192,0.5)_12%,rgba(150,136,192,0.5)_88%,rgba(150,136,192,0.14)_100%)]"
          />

          <div className="space-y-10 md:space-y-12">
            {hero.callouts.map((callout) => (
              <div
                key={callout.label}
                className="grid grid-cols-[1.375rem_minmax(0,1fr)] items-start gap-x-5 md:gap-x-6"
              >
                <div className="flex justify-center pt-[calc(0.5rem-7px)]">
                  <div
                    aria-hidden="true"
                    className="flex size-5 items-center justify-center rounded-full border border-[color:color-mix(in_srgb,var(--lavender-200)_74%,white)] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]"
                  >
                    <div className="size-2 rounded-full bg-[var(--purple-500)]" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex min-h-5 items-center pt-[2px]">
                    <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                      {callout.label}
                    </p>
                  </div>
                  <p className="text-heading-lg text-[var(--neutral-950)]">
                    {callout.value}
                  </p>
                  <p className="max-w-[30rem] text-body-md text-[var(--color-text-secondary)]">
                    {callout.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </StudioPageContainer>
    </section>
  );
}

// This section pairs the studio origin story with the practical differentiators founders should remember.
function AboutStorySection({ content }: { content: StudioAboutStoryContent }) {
  const [storyTitleLead, storyTitleRest] = content.title.split(". ");

  return (
    <section className="border-b border-slate-200/80 bg-white py-14 md:py-20">
      <StudioPageContainer className="grid gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:gap-12">
        {/* The left column becomes the narrative anchor with one strong headline and one tight origin paragraph. */}
        <div className="space-y-5 lg:pl-4 xl:pl-6">
          <div className="space-y-3">
            <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
              {content.eyebrow}
            </p>
            <div className="h-px w-24 bg-[linear-gradient(90deg,var(--lavender-500),rgba(203,195,223,0))]" />
          </div>

          <h2 className="max-w-[13ch] text-section-display text-[var(--neutral-950)]">
            {storyTitleRest ? (
              <>
                <span>{`${storyTitleLead}.`}</span>
                <br />
                <span>{storyTitleRest}</span>
              </>
            ) : (
              content.title
            )}
          </h2>

          <p className="max-w-[38rem] text-body-lg text-[var(--color-text-secondary)]">
            {content.paragraphs[0]}
          </p>

          {/* The illustration gives the origin story a warmer metaphor instead of another team photo. */}
          <AboutMediaCard
            asset={aboutAssets.illustration}
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="mt-6 max-w-[34rem] bg-[color:color-mix(in_srgb,var(--yellow-500)_18%,white)]"
            imageClassName="object-contain p-6"
          />
        </div>

        <div className="space-y-5">
          {/* The primary support card carries the one key shift in a tighter editorial block. */}
          <PremiumSurface
            tone="neutral"
            elevation="sm"
            blur="none"
            radius="xl"
            className="p-5 md:p-6"
          >
            <div className="max-w-4xl space-y-3">
              <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-brand)]">
                What changed
              </p>
              <p className="text-body-lg text-[var(--color-text-secondary)]">
                {content.paragraphs[1]}
              </p>
            </div>
          </PremiumSurface>

          {/* The secondary block now uses the shared aurora surface so the strategic takeaway feels like a system callout, not a one-off panel. */}
          <PremiumSurface
            tone="editorialSunrise"
            elevation="md"
            blur="lg"
            radius="xl"
            className="overflow-hidden p-5 md:p-6"
          >
            <div className="max-w-4xl space-y-3">
              <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--neutral-700)]">
                What we care about now
              </p>
              <p className="max-w-3xl text-body-lg text-[var(--color-text-primary)]">
                {content.paragraphs[2]}
              </p>
            </div>
          </PremiumSurface>

          {/* The operating-principle cards become a lighter, shorter scan row instead of mini article cards. */}
          <div className="grid gap-4 md:grid-cols-3">
            {content.operatingPrinciples.map((principle, index) => {
              const Icon = storyIcons[index % storyIcons.length];

              return (
                <PremiumSurface
                  key={principle.title}
                  tone="glassSubtle"
                  elevation="sm"
                  blur="sm"
                  radius="xl"
                  className="p-4 md:p-5"
                >
                  <div className="space-y-3">
                    <div className="flex size-10 items-center justify-center rounded-full border border-white/80 bg-white/80 text-[var(--color-text-brand)] shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                      <Icon className="size-4.5" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-heading-md text-[var(--neutral-950)]">
                        {principle.title}
                      </h3>
                      <p className="text-body-md text-[var(--color-text-secondary)]">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </PremiumSurface>
              );
            })}
          </div>
        </div>
      </StudioPageContainer>
    </section>
  );
}

// This band introduces the larger team image later in the page so the founder-first story stays intact.
function AboutTeamBandSection() {
  return (
    <section className="border-b border-slate-200/80 bg-[var(--color-background-canvas)] py-14 md:py-20">
      <StudioPageContainer className="space-y-6">
        <div className="space-y-3 lg:pl-4 xl:pl-6">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            People behind the work
          </p>
          <h2 className="max-w-[28ch] text-section-display text-[var(--neutral-950)]">
            <span>Small team. Deep involvement.</span>
            <br />
            <span>Start to finish.</span>
          </h2>
        </div>

        <AboutMediaCard
          asset={aboutAssets.cover}
          priority
          sizes="100vw"
          className="lg:mx-4 xl:mx-6"
          frameClassName="min-h-[18rem] sm:min-h-[22rem] md:min-h-[26rem]"
          imageClassName="object-cover object-[center_40%] md:object-center"
        />
      </StudioPageContainer>
    </section>
  );
}

// This section turns the studio model into a compact, four-part execution loop instead of a services dump.
function AboutWorkflowSection({
  content,
}: {
  content: StudioAboutWorkflowContent;
}) {
  return (
    <section
      id="process"
      className="border-b border-slate-200/80 bg-[var(--color-background-canvas)] py-14 md:py-20"
    >
      <StudioPageContainer className="space-y-10">
        <SectionIntro
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          className="lg:pl-4 xl:pl-6"
        />

        {/* The workflow grid gives each discipline a clear role while preserving the one-loop story. */}
        <div className="grid gap-4 lg:grid-cols-4 lg:pl-4 xl:pl-6">
          {content.stages.map((stage, index) => {
            const Icon = workflowIcons[index % workflowIcons.length];
            const workflowCardStyle =
              workflowCardStyles[index % workflowCardStyles.length];

            return (
              <PremiumSurface
                key={stage.label}
                tone={workflowCardStyle.tone}
                elevation="sm"
                blur="sm"
                radius="xl"
                className="h-full p-5 md:p-6"
              >
                <div className="flex h-full flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className={[
                        "text-heading-lg",
                        workflowCardStyle.numberClassName,
                      ].join(" ")}
                    >
                      {`${index + 1}`.padStart(2, "0")}
                    </p>
                    <div
                      className={[
                        "flex size-11 items-center justify-center rounded-full shadow-[0_10px_28px_rgba(15,23,42,0.06)]",
                        workflowCardStyle.iconShellClassName,
                      ].join(" ")}
                    >
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-display-muted-editorial leading-[0.94] text-[var(--neutral-950)]">
                      {stage.label}
                    </h3>
                    <p className="text-body-md text-[var(--color-text-secondary)]">
                      {stage.description}
                    </p>
                  </div>
                </div>
              </PremiumSurface>
            );
          })}
        </div>
      </StudioPageContainer>
    </section>
  );
}

// The proof grid keeps named-project evidence tight and narrative-led instead of turning into a case-study wall.
function AboutProofSection({ content }: { content: StudioAboutProofContent }) {
  return (
    <section className="border-b border-slate-200/80 bg-white py-14 md:py-20">
      <StudioPageContainer className="space-y-10">
        <SectionIntro
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          className="lg:pl-4 xl:pl-6"
        />

        {/* The proof module trades isolated cards for a dotted grid so the project notes feel lighter and more editorial. */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white lg:ml-4 xl:ml-6">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(88,41,199,0.16)_1px,transparent_1.4px)] bg-[size:20px_20px] opacity-75 [mask-image:linear-gradient(90deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.92)_34%,rgba(0,0,0,0.18)_64%,transparent_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,202,45,0.22)_1px,transparent_1.45px)] bg-[size:20px_20px] opacity-70 [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.16)_36%,rgba(0,0,0,0.88)_68%,rgba(0,0,0,1)_100%)]" />
          </div>

          <div className="relative grid lg:grid-cols-2">
            {content.entries.map((entry, index) => {
              const totalRows = Math.ceil(content.entries.length / 2);
              const rowIndex = Math.floor(index / 2);
              const isLeftColumn = index % 2 === 0;
              const hasBottomBorder = rowIndex < totalRows - 1;

              return (
                <article
                  key={entry.client}
                  className={[
                    "min-h-[15rem] space-y-4 px-6 py-7 md:px-8 md:py-8",
                    hasBottomBorder ? "border-b border-slate-200/80" : "",
                    isLeftColumn ? "lg:border-r lg:border-slate-200/80" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                    {entry.sector}
                  </p>
                  <h3 className="text-heading-lg text-[var(--neutral-950)]">
                    {entry.client}
                  </h3>
                  <p className="max-w-[32rem] text-body-md text-[var(--color-text-secondary)]">
                    {entry.summary}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </StudioPageContainer>
    </section>
  );
}

// The closing mid-page section combines enduring values with a lightweight team/culture teaser.
function AboutValuesAndTeamSection({
  values,
  teamTeaser,
}: {
  values: StudioAboutValuesContent;
  teamTeaser: StudioAboutPageContent["teamTeaser"];
}) {
  return (
    <section className="border-b border-slate-200/80 bg-[var(--color-background-canvas)] py-14 md:py-20">
      <StudioPageContainer className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-12">
        <div className="min-w-0 space-y-8 lg:pl-4 xl:pl-6">
          <SectionIntro
            eyebrow={values.eyebrow}
            title={values.title}
            description={values.description}
          />

          {/* The value cards keep the original root values visible without repeating the old site structure verbatim. */}
          <div className="grid gap-4">
            {values.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];

              return (
                <PremiumSurface
                  key={value.title}
                  tone="glassSubtle"
                  elevation="sm"
                  blur="sm"
                  radius="xl"
                  className="min-w-0 p-5 md:p-6"
                >
                  <div className="grid min-w-0 gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start">
                    <div className="flex size-11 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[var(--color-text-brand)] shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 space-y-2">
                      <h3 className="text-heading-md text-[var(--neutral-950)]">
                        {value.title}
                      </h3>
                      <p className="text-body-md text-[var(--color-text-secondary)]">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </PremiumSurface>
              );
            })}
          </div>

          <div className="flex w-full min-w-0 flex-wrap items-center gap-x-4 gap-y-2 pb-1 sm:flex-nowrap sm:gap-y-4 sm:overflow-x-auto">
            {values.principles.map((principle, index) => (
              <span
                key={principle}
                className={[
                  "shrink-0 whitespace-nowrap text-label-lg font-semibold md:text-label-xl",
                  principleHashtagClasses[index % principleHashtagClasses.length],
                ].join(" ")}
              >
                #{principle.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        </div>

        {/* The right column stays editorial-only so the values section remains focused on principles, not imagery. */}
        <PremiumSurface
          tone="glass"
          elevation="md"
          blur="md"
          radius="xl"
          className="min-w-0 self-start p-6 md:p-7 lg:mt-16"
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                {teamTeaser.eyebrow}
              </p>
              <h3 className="text-display-muted-editorial text-[var(--neutral-950)]">
                {teamTeaser.title}
              </h3>
              <p className="text-body-lg text-[var(--color-text-secondary)]">
                {teamTeaser.description}
              </p>
            </div>
            <div className="space-y-3">
              {teamTeaser.points.map((point) => (
                <div
                  key={point}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-[1rem] border border-slate-200/80 bg-white/80 px-4 py-4"
                >
                  <span className="flex size-2.5 shrink-0 rounded-full bg-[var(--purple-500)]" />
                  <p className="text-body-md text-[var(--color-text-secondary)]">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PremiumSurface>
      </StudioPageContainer>
    </section>
  );
}

// The final CTA closes the page on one clear next step while preserving a lower-friction proof path.
function AboutFinalCta({ content }: { content: StudioAboutPageContent["cta"] }) {
  const cta = content;

  return (
    <section className="bg-white py-16 md:py-20">
      <StudioPageContainer className="lg:px-10 xl:px-14">
        <PremiumSurface
          tone="glass"
          elevation="lg"
          blur="lg"
          radius="xl"
          className="overflow-hidden p-8 transition-transform duration-300 ease-out hover:[transform:perspective(1600px)_rotateX(0.8deg)_rotateY(-1.8deg)] md:p-10"
        >
          <div aria-hidden="true" className="absolute inset-0">
            <div className="absolute right-[-8rem] top-[-8rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.18)_0%,rgba(255,202,45,0)_72%)] blur-3xl" />
            <div className="absolute left-[-8rem] bottom-[-8rem] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.16)_0%,rgba(88,41,199,0)_72%)] blur-3xl" />
          </div>

          {/* The CTA panel reuses the established shell but simplifies the message to one clear invitation. */}
          <div className="relative z-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="space-y-4">
              <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
                {cta.eyebrow}
              </p>
              <h2 className="max-w-4xl text-section-display text-[var(--neutral-950)]">
                {cta.title}
              </h2>
              <p className="max-w-3xl text-body-lg text-[var(--color-text-secondary)]">
                {cta.description}
              </p>
            </div>
            <div className="flex items-start">
              <Button asChild size="lg" className="min-w-[220px]">
                <Link href={cta.primaryCtaHref}>
                  {cta.primaryCtaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </PremiumSurface>
      </StudioPageContainer>
    </section>
  );
}

export function StudioAboutPage({ navigationItems, content }: StudioAboutPageProps) {
  const { hero, story, workflow, proof, values, teamTeaser, cta } = content;

  return (
    <main
      data-studio-shell
      className="relative min-h-screen overflow-hidden bg-white text-foreground"
    >
      {/* The page-level rails keep the dedicated route visually tied to the homepage shell. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <StudioPageRails />
        <div className="absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(circle_at_16%_4%,rgba(88,41,199,0.08),rgba(255,255,255,0)_32%),radial-gradient(circle_at_88%_0%,rgba(255,202,45,0.1),rgba(255,255,255,0)_30%)]" />
      </div>

      <StudioHeader navigationItems={navigationItems} />

      <article className="relative z-10">
        <AboutHero content={hero} />
        <AboutStorySection content={story} />
        <AboutTeamBandSection />
        <AboutWorkflowSection content={workflow} />
        <AboutProofSection content={proof} />
        <AboutValuesAndTeamSection values={values} teamTeaser={teamTeaser} />
        <AboutFinalCta content={cta} />
      </article>
    </main>
  );
}
