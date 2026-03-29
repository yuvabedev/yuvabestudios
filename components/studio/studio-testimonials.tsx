import type { StudioHomepageTestimonialsContent } from "@/components/studio/studio-homepage-content";
import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { PremiumSurface } from "@/components/ui/premium-surface";

type StudioTestimonialsProps = {
  content: StudioHomepageTestimonialsContent;
};

// The testimonials section turns direct client quotes into a dedicated trust layer before visitors hit the deeper work grid.
export function StudioTestimonials({ content }: StudioTestimonialsProps) {
  if (content.items.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      {/* The background stays aligned with the homepage's light editorial system while preserving the testimonial layout hierarchy. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px)] bg-[size:120px_100%]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:100%_120px]" />
        <div className="absolute left-[-10rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(88,41,199,0.12)_0%,rgba(88,41,199,0)_72%)] blur-3xl" />
        <div className="absolute right-[-12rem] bottom-[-10rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.16)_0%,rgba(255,202,45,0)_72%)] blur-3xl" />
        <StudioPageRails />
      </div>

      <StudioPageContainer className="relative z-10 flex flex-col gap-10">
        {/* The intro keeps the same editorial hierarchy as the other homepage sections. */}
        <div className="max-w-6xl space-y-5 lg:pl-10 xl:pl-14">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-tertiary)]">
            {content.eyebrow}
          </p>
          <h2 className="max-w-5xl text-display-muted-editorial text-[var(--neutral-950)]">
            <strong>{content.headline}</strong>
          </h2>
          <p className="max-w-6xl text-hero-support">
            {content.supportPrefix}{" "}
            <span className="text-[var(--color-text-brand)]">{content.supportHighlight}</span>{" "}
            {content.supportSuffix}
          </p>
        </div>

        {/* The testimonial matrix keeps the selected-work structure, but without the dotted proof texture. */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white lg:mx-10 xl:mx-14">
          <div className="relative grid lg:grid-cols-2">
            {content.items.map((entry, index) => {
              const totalRows = Math.ceil(content.items.length / 2);
              const rowIndex = Math.floor(index / 2);
              const isLeftColumn = index % 2 === 0;
              const hasBottomBorder = rowIndex < totalRows - 1;
              const isLastOddCard =
                content.items.length % 2 === 1 &&
                index === content.items.length - 1;

              return (
                <article
                  key={`${entry.name}-${index}`}
                  className={[
                    "min-h-[15rem] space-y-5 px-6 py-7 md:px-8 md:py-8",
                    hasBottomBorder ? "border-b border-slate-200/80" : "",
                    isLeftColumn && !isLastOddCard
                      ? "lg:border-r lg:border-slate-200/80"
                      : "",
                    isLastOddCard ? "lg:col-span-2" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <p className="max-w-[32rem] text-body-md font-medium italic text-[var(--neutral-700)]">
                    &ldquo;{entry.quote}&rdquo;
                  </p>

                  <div className="space-y-1">
                    <h3 className="text-heading-sm text-[var(--neutral-900)]">
                      {entry.name}
                    </h3>
                    {entry.attribution ? (
                      <div className="inline-flex max-w-full rounded-full border border-white/80 bg-white/90 px-3 py-1 backdrop-blur-sm">
                        <p className="truncate text-label-sm uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
                          {entry.attribution}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </StudioPageContainer>
    </section>
  );
}
