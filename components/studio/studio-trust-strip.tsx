import {
  StudioPageContainer,
  StudioPageRails,
} from "@/components/studio/studio-page-shell";
import { cn } from "@/lib/utils";

const companyLogos = [
  // imageClass: override h/w per logo so each mark reads at a consistent visual weight.
  // Icon-only marks → equal h/w (square). Wide wordmarks → tall h + constrained max-w. Mixed marks → tuned pair.

  {
    name: "AV Marathon",
    src: "/logos/av-marathon.svg",
    imageClass: "h-18 w-auto max-w-42",
  },
  {
    name: "Bevolve AI",
    src: "/assets/bevolve/logo.svg",
    imageClass: "h-16 w-auto max-w-28",
  },
  { name: "BMH", src: "/logos/bmh.svg", imageClass: "h-9 w-auto max-w-24" },
  {
    name: "Buglerock",
    src: "/logos/buglerock.svg",
    imageClass: "h-16 w-auto max-w-28",
  },
  { name: "CAT", src: "/logos/cat.svg", imageClass: "h-14 w-auto max-w-42" },
  {
    name: "Tvam",
    src: "/assets/tvam/logo.svg",
    imageClass: "h-14 w-auto max-w-28",
  },
  {
    name: "General Aeronautics",
    src: "/assets/general-aeronautics/logo.svg",
    imageClass: "h-9 w-auto max-w-32",
  },

  {
    name: "Hemplanet",
    src: "/logos/hemplanet.svg",
    imageClass: "h-14 w-auto max-w-28",
  },
  {
    name: "Indic",
    src: "/logos/indic.svg",
    imageClass: "h-18 w-auto max-w-28",
  },
  {
    name: "Kittykat",
    src: "/assets/KK/logo.svg",
    imageClass: "h-14 w-auto max-w-28",
  },
  {
    name: "Maatram",
    src: "/logos/maatram.svg",
    imageClass: "h-14 w-auto max-w-28",
  },
  {
    name: "Matrimandir",
    src: "/logos/matrimandir.svg",
    imageClass: "h-14 w-auto max-w-42",
  },
  { name: "NSF", src: "/logos/nsf.svg", imageClass: "h-14 w-auto max-w-42" },
  {
    name: "Prakriti Sattva",
    src: "/logos/prakriti-sattva.svg",
    imageClass: "h-16 w-auto max-w-24",
  },
  {
    name: "Quilt AI",
    src: "/logos/quilt.ai.svg",
    imageClass: "h-10 w-auto max-w-28",
  },
  {
    name: "Rangsutra",
    src: "/logos/rangsutra.svg",
    imageClass: "h-14 w-auto max-w-42",
  },
  {
    name: "Ageshift",
    src: "/assets/ageshift/logo.svg",
    imageClass: "h-14 w-auto max-w-28",
  },
  {
    name: "Shraddha Yoga",
    src: "/logos/shraddha-yoga.svg",
    imageClass: "h-14 w-auto max-w-42",
  },
  {
    name: "Solitude Farm",
    src: "/logos/solitude-farm.svg",
    imageClass: "h-14 w-auto max-w-28",
  },
  {
    name: "Startup-O",
    src: "/logos/startup-o.svg",
    imageClass: "h-14 w-auto max-w-28",
  },
];

// The frame guides keep the hero background and strip edges aligned to the same centered rail.
export function StudioTrustStripGuides() {
  return <StudioPageRails />;
}

type TrustStripLogoProps = {
  name: string;
  src: string;
  imageClass?: string;
};

// Each logo uses its own imageClass so marks with very different aspect ratios read at the same visual weight.
function TrustStripLogo({ name, src, imageClass = "h-8 w-auto max-w-28" }: TrustStripLogoProps) {
  return (
    <span className="inline-flex flex-none items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className={cn(
          imageClass,
          "object-contain opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0"
        )}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

type TrustStripGroupProps = {
  groupKey: string;
  ariaHidden?: boolean;
};

// Each repeated group stays isolated so the marquee loop can duplicate content without layout drift.
function TrustStripGroup({ groupKey, ariaHidden = false }: TrustStripGroupProps) {
  return (
    <div aria-hidden={ariaHidden || undefined} className="marquee-group">
      {companyLogos.map(({ name, src, imageClass }) => (
        <TrustStripLogo key={`${groupKey}-${name}`} name={name} src={src} imageClass={imageClass} />
      ))}
    </div>
  );
}

type TrustStripMaskProps = {
  side: "left" | "right";
};

// The masks create the edge fade while keeping the strip background tone consistent.
function TrustStripMask({ side }: TrustStripMaskProps) {
  const sideClass = side === "left" ? "left-0" : "right-0";
  const gradientClass =
    side === "left"
      ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.84),rgba(255,255,255,0))]"
      : "bg-[linear-gradient(to_left,rgba(255,255,255,0.84),rgba(255,255,255,0))]";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${sideClass} z-10 w-20 md:w-28 ${gradientClass}`}
    />
  );
}

type TrustStripDividerProps = {
  side: "left" | "right";
};

// The dividers mark the visible frame edge before the logos slide under the fade.
function TrustStripDivider({ side }: TrustStripDividerProps) {
  const sideClass = side === "left" ? "left-0" : "right-0";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${sideClass} z-20 w-px bg-slate-200/80`}
    />
  );
}

type StudioTrustStripProps = {
  className?: string;
};

// The trust strip stays modular so the hero can reuse the same edge system and marquee structure.
export function StudioTrustStrip({ className }: StudioTrustStripProps) {
  return (
    <div
      className={cn(
        "relative z-10 border-y border-slate-200/70 bg-white/80 backdrop-blur-sm",
        className
      )}
    >
      <StudioPageContainer className="relative md:px-0">
        {/* The viewport owns the clipping so the dividers and masks stay locked to the same edge. */}
        <div className="relative overflow-hidden">
          <TrustStripMask side="left" />
          <TrustStripMask side="right" />
          <TrustStripDivider side="left" />
          <TrustStripDivider side="right" />

          {/* The duplicated groups keep the marquee loop seamless across the strip width. */}
          <div className="marquee-viewport">
            <div className="marquee-track py-6">
              <TrustStripGroup groupKey="primary" />
              <TrustStripGroup groupKey="duplicate" ariaHidden />
            </div>
          </div>
        </div>
      </StudioPageContainer>
    </div>
  );
}
