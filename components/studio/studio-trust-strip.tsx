const companyLogos = [
  { name: "Ageshift", src: "/logos/ageshift.svg" },
  { name: "AV Marathon", src: "/logos/av-marathon.svg" },
  { name: "Bevolve AI", src: "/logos/bevolve-ai.svg" },
  { name: "BMH", src: "/logos/bmh.svg" },
  { name: "Buglerock", src: "/logos/buglerock.svg" },
  { name: "CAT", src: "/logos/cat.svg" },
  { name: "General Aeronautics", src: "/logos/general-aeronautics.svg" },
  { name: "Hemplanet", src: "/logos/hemplanet.svg" },
  { name: "Indic", src: "/logos/indic.svg" },
  { name: "Kittykat", src: "/logos/kittykat.svg" },
  { name: "Maatram", src: "/logos/maatram.svg" },
  { name: "Matrimandir", src: "/logos/matrimandir.svg" },
  { name: "NSF", src: "/logos/nsf.svg" },
  { name: "Prakriti Sattva", src: "/logos/prakriti-sattva.svg" },
  { name: "Quilt AI", src: "/logos/quilt.ai.svg" },
  { name: "Rangsutra", src: "/logos/rangsutra.svg" },
  { name: "Shraddha Yoga", src: "/logos/shraddha-yoga.svg" },
  { name: "Solitude Farm", src: "/logos/solitude-farm.svg" },
  { name: "Startup-O", src: "/logos/startup-o.svg" },
  { name: "Tvam", src: "/logos/tvam.svg" },
];

// The frame guides keep the hero background and strip edges aligned to the same centered rail.
export function StudioTrustStripGuides() {
  return (
    <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10">
      <TrustStripDivider side="left" />
      <TrustStripDivider side="right" />
    </div>
  );
}

type TrustStripLogoProps = {
  name: string;
  src: string;
};

// Each logo sits in a fixed-height box so all SVGs render at the same visual scale regardless of viewBox.
function TrustStripLogo({ name, src }: TrustStripLogoProps) {
  return (
    <span className="inline-flex flex-none items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="h-8 w-auto max-w-30 object-contain opacity-60 grayscale transition-[opacity,filter] duration-200 hover:opacity-100 hover:grayscale-0"
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
      {companyLogos.map(({ name, src }) => (
        <TrustStripLogo key={`${groupKey}-${name}`} name={name} src={src} />
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

// The trust strip stays modular so the hero can reuse the same edge system and marquee structure.
export function StudioTrustStrip() {
  return (
    <div className="relative z-10 mt-10 border-y border-slate-200/70 bg-white/80 backdrop-blur-sm">
      <div className="relative mx-auto max-w-7xl px-6 md:px-0">
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
      </div>
    </div>
  );
}