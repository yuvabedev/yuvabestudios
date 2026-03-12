import {
  Building2,
  Coins,
  CreditCard,
  Globe,
  Package,
  Rocket,
  Search,
  ShoppingBag,
  Smartphone,
  Tv,
  Users,
  type LucideIcon,
} from "lucide-react";

const companyLogos = [
  { name: "Coinbase", Icon: Coins },
  { name: "Brex", Icon: Rocket },
  { name: "Airbnb", Icon: Building2 },
  { name: "DoorDash", Icon: ShoppingBag },
  { name: "Dropbox", Icon: Package },
  { name: "Instacart", Icon: ShoppingBag },
  { name: "Reddit", Icon: Users },
  { name: "Stripe", Icon: CreditCard },
  { name: "Twitch", Icon: Tv },
  { name: "Cruise", Icon: Globe },
  { name: "Apple", Icon: Smartphone },
  { name: "Google", Icon: Search },
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
  Icon: LucideIcon;
};

// Each logo item uses one shared contract so both marquee groups render identically.
function TrustStripLogo({ name, Icon }: TrustStripLogoProps) {
  return (
    <span className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap text-label-lg text-slate-400/90 sm:text-heading-sm">
      <Icon className="size-5 stroke-[1.8]" />
      {name}
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
      {companyLogos.map(({ name, Icon }) => (
        <TrustStripLogo key={`${groupKey}-${name}`} name={name} Icon={Icon} />
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
            <div className="marquee-track pt-4 pb-4">
              <TrustStripGroup groupKey="primary" />
              <TrustStripGroup groupKey="duplicate" ariaHidden />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



