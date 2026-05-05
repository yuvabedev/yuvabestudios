import type { ReactNode } from "react";
import {
  AppWindowMac,
  Brain,
  BrainCircuit,
  CheckCircle2,
  Compass,
  Cog,
  Hourglass,
  Lightbulb,
  PencilRuler,
  Rocket,
  Sparkles,
} from "lucide-react";

import { IllustrationCard } from "@/components/ui/illustration-card";
import { cn } from "@/lib/utils";

type GraphicStep = {
  label: string;
  tone?: "muted" | "brand" | "warm";
};

const legacyWorkflowSteps: GraphicStep[] = [
  { label: "Idea", tone: "muted" },
  { label: "Design", tone: "muted" },
  { label: "Build", tone: "muted" },
  { label: "Launch", tone: "muted" },
];

const speedGraphicSteps: GraphicStep[] = [
  { label: "Prompt", tone: "muted" },
  { label: "Prototype", tone: "brand" },
  { label: "Iteration", tone: "muted" },
];



// Signal labels fed into the framing funnel SVG.
const framingSignals = [
  "SIGNAL 1",
  "USER INPUT A",
  "ASSUMPTION X",
  "MARKET TREND",
  "USER FEEDBACK B",
  "SIGNAL 2",
  "COMPETITOR ACTIVITY",
];
const legacyWorkflowIcons = [Lightbulb, PencilRuler, Cog, Rocket];

type WorkflowNodeProps = {
  label: string;
  tone?: "muted" | "brand";
  className?: string;
  icon?: ReactNode;
  compact?: boolean;
};

const oldWorkflowNodePath =
  "M513.5 14.4338C528.97 5.50212 548.03 5.50212 563.5 14.4338L979.855 254.816C995.325 263.748 1004.85 280.254 1004.85 298.118V778.882C1004.85 796.746 995.325 813.252 979.855 822.184L563.5 1062.57C548.03 1071.5 528.97 1071.5 513.5 1062.57L97.1453 822.184C81.6753 813.252 72.1453 796.746 72.1453 778.882V298.118C72.1453 280.254 81.6753 263.748 97.1453 254.816L513.5 14.4338Z";
const oldWorkflowNodeStrokePath =
  "M512.25 12.2686C528.494 2.89038 548.506 2.89038 564.75 12.2686L981.104 252.651C997.348 262.03 1007.35 279.361 1007.35 298.117V778.883C1007.35 797.639 997.348 814.97 981.104 824.349L564.75 1064.73C548.506 1074.11 528.494 1074.11 512.25 1064.73L95.8955 824.349C79.652 814.97 69.6456 797.639 69.6455 778.883V298.117C69.6456 279.361 79.652 262.03 95.8955 252.651L512.25 12.2686Z";
const oldWorkflowArrowBodyPath = "M869 444H1358V634H869V444Z";
const oldWorkflowArrowHeadPath =
  "M1602 539L1316.25 704.411L1316.25 373.589L1602 539Z";
const nativeFrameHexPath =
  "M375.871 12.3691C392.888 2.54449 413.854 2.54439 430.871 12.3691L730.2 185.188C747.217 195.012 757.7 213.169 757.7 232.818V578.454C757.7 598.104 747.217 616.261 730.2 626.086L430.871 798.903C413.854 808.728 392.888 808.728 375.871 798.903L76.541 626.086C59.5241 616.261 49.041 598.104 49.041 578.454V232.818C49.0411 213.169 59.5243 195.012 76.541 185.188L375.871 12.3691Z";
const nativeFrameArrowPath =
  "M752.518 366.659C918.518 272.659 945.394 301.575 1109.02 340.661L1111.63 423.975C947.016 340.661 888.518 346.65 752.518 415.061L752.518 366.659Z";
const nativeFrameArrowHeadPath =
  "M1237.98 419.098L1008.73 467.215L1107.37 382.455L1082.08 244.262L1237.98 419.098Z";
const nativePrototypeHexPath =
  "M845.871 12.3691C862.888 2.54449 883.854 2.54439 900.871 12.3691L1200.2 185.188C1217.22 195.012 1227.7 213.169 1227.7 232.818V578.454C1227.7 598.104 1217.22 616.261 1200.2 626.086L900.871 798.903C883.854 808.728 862.888 808.728 845.871 798.903L546.541 626.086C529.524 616.261 519.041 598.104 519.041 578.454V232.818C519.041 213.169 529.524 195.012 546.541 185.188L845.871 12.3691Z";
const nativePrototypeArrowLeftPath =
  "M522.139 366.661C356.139 272.661 329.263 301.577 165.642 340.662L163.022 423.977C327.641 340.662 386.139 346.652 522.139 415.063L522.139 366.661Z";
const nativePrototypeArrowLeftHeadPath =
  "M36.6761 419.1L265.93 467.217L167.292 382.457L192.577 244.264L36.6761 419.1Z";
const nativePrototypeArrowRightPath =
  "M1232.52 366.659C1398.52 272.659 1425.39 301.575 1589.02 340.661L1591.63 423.975C1427.02 340.661 1368.52 346.65 1232.52 415.061L1232.52 366.659Z";
const nativePrototypeArrowRightHeadPath =
  "M1717.98 419.1L1488.73 467.217L1587.37 382.457L1562.08 244.264L1717.98 419.1Z";
const nativeDecideLoopPath =
  "M390.04 751.595C357.354 936.775 319.39 941.203 189.653 1047.45L126.365 1001.28C289.458 919.851 321.064 870.305 354.211 723.571L390.04 751.595Z";
const nativeDecideLoopArrowHeadPath =
  "M86.1288 1061.67L167.543 901.006L169.065 998.722L259.925 1045.04L86.1288 1061.67Z";
const nativeDecideHexPath =
  "M482.871 12.3691C499.888 2.54449 520.854 2.54439 537.871 12.3691L837.2 185.188C854.217 195.012 864.7 213.169 864.7 232.818V578.454C864.7 598.104 854.217 616.261 837.2 626.086L537.871 798.903C520.854 808.728 499.888 808.728 482.871 798.903L183.541 626.086C166.524 616.261 156.041 598.104 156.041 578.454V232.818C156.041 213.169 166.524 195.012 183.541 185.188L482.871 12.3691Z";
const nativeDecideArrowBodyPath =
  "M861 310.266L982.5 298.766L1037 294.766H1086V500.266L1037 517.766L982.5 514.266L861 500.266V310.266Z";
const nativeDecideArrowHeadPath =
  "M1294.25 405.346L1016 566.427L1080.75 405.346L1016 244.266L1294.25 405.346Z";
const nativeTestHexPath =
  "M784.916 60.543C801.933 50.7182 822.899 50.7182 839.916 60.543L1031.54 171.176C1048.55 181.001 1059.04 199.157 1059.04 218.807V440.072C1059.04 459.722 1048.55 477.878 1031.54 487.703L839.916 598.336C822.899 608.161 801.933 608.161 784.916 598.336L593.295 487.703C576.278 477.878 565.795 459.722 565.795 440.072V218.807C565.795 199.157 576.278 181.001 593.295 171.176L784.916 60.543Z";
const nativeTestLoopPath =
  "M561.507 411.938C339.775 404.707 301.645 353.611 151.948 222.392L192.771 142.403C320.388 315.858 384.342 343.968 561.507 357.994L561.507 411.938Z";
const nativeTestLoopArrowHeadPath =
  "M114.468 106.184L317.591 173.202L204.388 190.877L168.976 302.459L114.468 106.184Z";

function NativeFrameFlow() {
  return (
    <div className="relative w-[9rem] ds-workflow-node-pulse ds-workflow-native-svg-glow">
      <svg aria-hidden="true" viewBox="0 0 1275 812" className="h-auto w-full">
        <path
          d={nativeFrameHexPath}
          fill="var(--color-workflow-native-node-fill)"
          stroke="var(--color-workflow-native-node-stroke)"
          strokeWidth="10"
        />
        <path
          d={nativeFrameArrowPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
        <path
          d={nativeFrameArrowHeadPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
      </svg>
      <div className="pointer-events-none absolute left-[31.7%] top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-[var(--color-workflow-native-gold)]">
        <Compass className="size-6 stroke-[1.8]" />
        <span className="text-label-lg uppercase tracking-[0.03em] text-white">
          Frame
        </span>
      </div>
    </div>
  );
}

function NativePrototypeFlow() {
  return (
    <div className="relative w-[11rem] ds-workflow-node-pulse ds-workflow-native-svg-glow">
      <svg aria-hidden="true" viewBox="0 0 1755 812" className="h-auto w-full">
        <path
          d={nativePrototypeHexPath}
          fill="var(--color-workflow-native-node-fill)"
          stroke="var(--color-workflow-native-node-stroke)"
          strokeWidth="10"
        />
        <path
          d={nativePrototypeArrowLeftPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
        <path
          d={nativePrototypeArrowLeftHeadPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
        <path
          d={nativePrototypeArrowRightPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
        <path
          d={nativePrototypeArrowRightHeadPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
      </svg>
      <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-[var(--color-workflow-native-gold)]">
        <AppWindowMac className="size-6 stroke-[1.8]" />
        <span className="text-label-lg uppercase tracking-[0.03em] text-white">
          Prototype
        </span>
      </div>
    </div>
  );
}

function NativeDecideFlow() {
  return (
    <div className="relative w-42 ds-workflow-node-pulse ds-workflow-native-svg-glow">
      <svg aria-hidden="true" viewBox="0 0 1295 1178" className="h-auto w-full">
        <path
          d={nativeDecideLoopPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
        <path
          d={nativeDecideLoopArrowHeadPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
        <path
          d={nativeDecideHexPath}
          fill="var(--color-workflow-native-node-fill)"
          stroke="var(--color-workflow-native-node-stroke)"
          strokeWidth="10"
        />
        <path
          d={nativeDecideArrowBodyPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
        <path
          d={nativeDecideArrowHeadPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
      </svg>
      <div className="pointer-events-none absolute left-[39.4%] top-[34.6%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-[var(--color-workflow-native-gold)]">
        <BrainCircuit className="size-6 stroke-[1.8]" />
        <span className="text-label-lg uppercase tracking-[0.03em] text-white">
          Decide
        </span>
      </div>
    </div>
  );
}

function NativeTestFlow() {
  return (
    <div className="relative w-28 ds-workflow-node-pulse ds-workflow-native-svg-glow">
      <svg aria-hidden="true" viewBox="0 0 1092 611" className="h-auto w-full">
        <path
          d={nativeTestHexPath}
          fill="var(--color-workflow-native-node-fill)"
          stroke="var(--color-workflow-native-node-stroke)"
          strokeWidth="10"
        />
        <path
          d={nativeTestLoopPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
        <path
          d={nativeTestLoopArrowHeadPath}
          fill="var(--color-workflow-native-arrow-fill)"
        />
      </svg>
      <div className="pointer-events-none absolute left-[74.3%] top-[53.9%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 text-[var(--color-workflow-native-gold)]">
        <CheckCircle2 className="size-5.5 stroke-[1.8]" />
        <span className="text-label-md uppercase tracking-[0.03em] text-white">
          Test
        </span>
      </div>
    </div>
  );
}

function workflowStepClassName(tone: GraphicStep["tone"] = "muted") {
  if (tone === "brand") {
    return "border-[rgb(88_41_199_/_0.48)] bg-[rgb(88_41_199_/_0.18)] text-white shadow-[0_0_0_1px_rgb(88_41_199_/_0.2),0_12px_30px_rgb(88_41_199_/_0.18)]";
  }

  if (tone === "warm") {
    return "border-[rgb(255_202_45_/_0.28)] bg-[rgb(255_202_45_/_0.12)] text-white";
  }

  return "border-[rgb(203_195_223_/_0.12)] bg-[rgb(255_255_255_/_0.04)] text-[var(--color-text-inverse-muted)]";
}

function OldWorkflowStep({
  label,
  isLast = false,
}: {
  label: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center",
        isLast ? "justify-center" : "justify-start",
      )}
    >
      <div className="relative h-[7.5rem] w-[9.8rem]">
        <svg
          aria-hidden="true"
          viewBox={isLast ? "0 0 1080 1077" : "0 0 1602 1077"}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d={oldWorkflowNodePath} fill="#4B6071" />
          <path
            d={oldWorkflowNodeStrokePath}
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeOpacity="0.6"
          />
          {!isLast ? (
            <path d={oldWorkflowArrowBodyPath} fill="#4B6071" />
          ) : null}
          {!isLast ? (
            <path d={oldWorkflowArrowHeadPath} fill="#4B6071" />
          ) : null}
        </svg>
        <span
          className={cn(
            "pointer-events-none absolute top-1/2 flex h-[7.5rem] -translate-y-1/2 items-center justify-center text-center text-label-lg uppercase tracking-[0.02em] text-white/82",
            isLast ? "left-0 w-full" : "left-0 w-[67.4%]",
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// This lane graphic compares the old linear workflow with the tighter AI-native loop in one glance.
function WorkflowShiftGraphic() {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-[rgb(170_191_214_/_0.5)] bg-[linear-gradient(180deg,rgb(11_24_36_/_0.96)_0%,rgb(9_19_31_/_0.98)_100%)]">
      {/* The right-top dot texture mirrors the reference's technical field without introducing an external asset. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-4 h-32 w-52 bg-[radial-gradient(circle,rgb(170_191_214_/_0.28)_0_1px,transparent_1.2px)] bg-[length:12px_12px] opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_22%,rgb(74_102_132_/_0.16),transparent_38%)]"
      />

      {/* The upper lane frames the old path as a slower sequence with subdued blue nodes. */}
      <div className="grid gap-6 px-5 py-5 md:grid-cols-[240px_minmax(0,1fr)] md:px-6 md:py-6">
        <div className="space-y-3 md:pt-8">
          <h4 className="text-heading-lg uppercase tracking-[0.02em] text-[rgb(118_147_176)]">
            Old workflow
          </h4>
          <div className="flex items-center gap-2 text-[rgb(118_147_176_/_0.74)]">
            {legacyWorkflowIcons.map((Icon, index) => (
              <div key={index} className="flex items-center gap-2">
                <Icon className="size-4 stroke-[1.7]" />
                {index < legacyWorkflowIcons.length - 1 ? (
                  <span className="h-px w-4 bg-[rgb(118_147_176_/_0.24)]" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[rgb(118_147_176_/_0.86)]">
            <Hourglass className="size-5 stroke-[1.6]" />
            <span className="text-label-lg">Linear production path</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 md:flex-nowrap">
          {legacyWorkflowSteps.map((step, index) => (
            <OldWorkflowStep
              key={step.label}
              label={step.label}
              isLast={index === legacyWorkflowSteps.length - 1}
            />
          ))}
        </div>
      </div>

      {/* The acceleration divider is the visual hinge between old execution and AI-native loops. */}
      <div className="relative px-5 md:px-6">
        <div className="h-px bg-[linear-gradient(90deg,transparent_0%,rgb(200_184_149_/_0.86)_50%,transparent_100%)] shadow-[0_0_22px_rgb(200_184_149_/_0.34)]" />
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
          <div className="inline-flex items-center gap-1.5 bg-[rgb(8_15_25_/_0.98)] px-3 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--color-workflow-accent)]">
            <Cog className="size-3.5 stroke-[1.8]" />
            <Sparkles className="size-3.5 stroke-[1.8]" />
            AI acceleration
          </div>
        </div>
      </div>

      {/* The lower lane emphasizes fast looping with brighter nodes, beam effects, and explicit loop-back paths. */}
      <div className="grid gap-6 px-5 py-6 md:grid-cols-[240px_minmax(0,1fr)] md:px-6 md:py-8">
        <div className="space-y-4 md:pt-10">
          <div className="flex items-start gap-3">
            <h4 className="max-w-[12.5rem] text-heading-xl uppercase leading-[1.06] tracking-[0.01em] text-[var(--color-workflow-native-gold)]">
              New AI-native workflow
            </h4>
            <Sparkles className="mt-1 size-6 stroke-[1.8] text-[var(--color-workflow-native-gold)]" />
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[24%] top-[20%] h-36 w-[54%] bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-workflow-native-gold)_26%,transparent)_0%,transparent_72%)] blur-3xl"
          />
          <div className="relative hidden min-h-64 md:block">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[35.5%] top-16 h-10 w-48 bg-(--gradient-workflow-native-beam) blur-2xl"
            />

            <div className="absolute left-[1%] top-12">
              <NativeFrameFlow />
            </div>

            <div className="absolute left-[22%] top-12">
              <NativePrototypeFlow />
            </div>

            <div className="absolute left-[44%] top-9">
              <NativeDecideFlow />
            </div>

            <div className="absolute left-[34%] top-42">
              <NativeTestFlow />
            </div>

            <div className="absolute right-6 top-20 flex items-center gap-2 text-(--color-workflow-native-gold)">
              <Compass className="size-5 stroke-[1.8]" />
              <div className="space-y-0.5">
                <p className="text-label-lg text-white">Final decision</p>
                <p className="text-body-sm text-[color-mix(in_srgb,var(--color-workflow-native-gold)_78%,white)]">
                  Sharper path to launch
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 md:hidden">
            <div className="grid gap-4">
              <WorkflowNode
                label="Frame"
                tone="brand"
                compact
                icon={<Compass className="size-5 stroke-[1.8]" />}
              />
              <WorkflowNode
                label="Prototype"
                tone="brand"
                compact
                icon={<AppWindowMac className="size-5 stroke-[1.8]" />}
              />
              <div className="grid grid-cols-2 gap-4">
                <WorkflowNode
                  label="Test"
                  tone="brand"
                  compact
                  icon={<CheckCircle2 className="size-5 stroke-[1.8]" />}
                />
                <WorkflowNode
                  label="Decide"
                  tone="brand"
                  compact
                  icon={<BrainCircuit className="size-5 stroke-[1.8]" />}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-[1rem] border border-[color-mix(in_srgb,var(--color-workflow-native-gold)_46%,transparent)] bg-[color-mix(in_srgb,var(--color-workflow-native-gold)_12%,transparent)] px-4 py-3 text-[var(--color-workflow-native-gold)]">
              <Compass className="size-5 stroke-[1.8]" />
              <div className="space-y-0.5">
                <p className="text-label-md text-white">Final decision</p>
                <p className="text-caption text-[color-mix(in_srgb,var(--color-workflow-native-gold)_78%,white)]">
                  Sharper path to launch
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// The workflow node keeps the reference-inspired step shape reusable across the lower AI-native lane.
function WorkflowNode({
  label,
  tone = "muted",
  className,
  icon,
  compact = false,
}: WorkflowNodeProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center [clip-path:polygon(25%_0%,75%_0%,100%_22%,100%_78%,75%_100%,25%_100%,0%_78%,0%_22%)]",
        compact
          ? "h-[7.2rem] w-[6.2rem]"
          : "h-[8.25rem] w-[7rem] md:h-[9rem] md:w-[7.75rem]",
        tone === "brand"
          ? "border border-[var(--color-workflow-native-node-border)] bg-[var(--gradient-workflow-native-node)] text-white shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-workflow-native-gold)_34%,transparent),0_0_22px_color-mix(in_srgb,var(--color-workflow-native-gold)_36%,transparent),0_0_58px_color-mix(in_srgb,var(--color-workflow-native-gold)_24%,transparent)]"
          : "border border-[var(--color-border-brand-dark)] bg-[var(--gradient-brand-night-card)] text-[var(--color-text-inverse-muted)] shadow-[0_10px_24px_rgb(6_9_24_/_0.16)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center text-center",
          compact ? "gap-1.5" : "gap-2",
        )}
      >
        {icon ? (
          <span
            className={cn(
              "opacity-90",
              tone === "brand"
                ? "text-[var(--color-workflow-native-gold)]"
                : "text-white/72",
            )}
          >
            {icon}
          </span>
        ) : null}
        <span
          className={cn(
            "uppercase tracking-[0.03em]",
            compact ? "text-label-md" : "text-label-lg",
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// This compact flow keeps the speed story to three visible beats so the card stays scannable on mobile.
function SpeedGraphic() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {speedGraphicSteps.map((step, index) => (
        <div key={step.label} className="relative">
          {index < speedGraphicSteps.length - 1 ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-1/2 hidden h-px w-[calc(100%+0.5rem)] -translate-y-1/2 sm:block bg-[rgb(88_41_199_/_0.28)]"
            />
          ) : null}

          <div
            className={cn(
              "min-h-[7.5rem] rounded-[1.25rem] border px-4 py-4",
              workflowStepClassName(step.tone),
              step.tone === "brand"
                ? "before:absolute before:inset-x-[18%] before:top-[18%] before:h-8 before:rounded-full before:bg-[radial-gradient(circle,rgba(150,136,192,0.42)_0%,rgba(150,136,192,0)_78%)] before:blur-xl"
                : undefined,
            )}
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <span className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-inverse-muted)]">
                Step {index + 1}
              </span>
              <span className="text-heading-sm text-white">{step.label}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// These stacked panels show fidelity rising quickly without needing a literal UI screenshot.
function MvpGraphic() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        {
          eyebrow: "First pass",
          title: "Wireframe",
          chrome: "bg-[rgb(255_255_255_/_0.05)]",
        },
        {
          eyebrow: "Soon after",
          title: "Interactive",
          chrome: "bg-[rgb(88_41_199_/_0.16)] border-[rgb(88_41_199_/_0.42)]",
        },
        {
          eyebrow: "Ready to learn",
          title: "Useful signal",
          chrome: "bg-[rgb(255_202_45_/_0.08)] border-[rgb(255_202_45_/_0.2)]",
        },
      ].map((panel) => (
        <div
          key={panel.title}
          className={cn(
            "rounded-[1.25rem] border border-[rgb(203_195_223_/_0.12)] p-4",
            panel.chrome,
          )}
        >
          <div className="space-y-3">
            <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-inverse-muted)]">
              {panel.eyebrow}
            </p>
            <div className="space-y-2">
              <div className="h-2.5 w-20 rounded-full bg-[rgb(255_255_255_/_0.16)]" />
              <div className="h-2.5 w-full rounded-full bg-[rgb(255_255_255_/_0.1)]" />
              <div className="h-2.5 w-[78%] rounded-full bg-[rgb(255_255_255_/_0.08)]" />
            </div>
            <p className="text-label-lg text-white">{panel.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Elaborate SVG funnel: signal labels curve into a glowing hex, which fans rays out to the output node.
function FramingGraphic() {
  // Token strings as template literals so the build pipeline cannot corrupt them.
  const gold = `var(--color-workflow-native-gold)`;
  const bgDeep = `var(--color-background-brand-deep)`;
  const white = `var(--neutral-0)`;

  // SVG canvas 1000x560; hex at center, output node at right.
  const hexCx = 500;
  const hexCy = 280;
  const hexR = 80;
  const outX = 880;
  const outY = 280;

  // Crystal gem: scaled from 123x242 viewBox, centered at the hex position.
  const crystalScale = 0.7;
  const crystalTx = hexCx - (123 / 2) * crystalScale;
  const crystalTy = hexCy - (242 / 2) * crystalScale;
  const crystalLeft = crystalTx + 2 * crystalScale;
  const crystalRight = crystalTx + 115 * crystalScale;
  const crystalFill = `var(--color-workflow-native-gold-soft)`;
  const crystalStroke = `var(--color-workflow-native-node-stroke)`;
  const cpTopRight = `M77.6887 2.49081L49.0991 2.63298L45.25 2.65209L47.4789 5.79026L82.979 55.7909L83.5761 56.633L84.6099 56.6326L112.106 56.6326L115.905 56.6321L113.756 53.5009L79.348 3.35891L78.748 2.4856L77.6887 2.49081Z`;
  const cpBottomRight = `M116.109 182.525L83.2659 182.525L46.1917 236.057C61.3715 236.268 64.314 236.486 79.0092 236.924L116.109 182.525Z`;
  const cpLeftFacet = `M51.9668 21.7227L23.0752 67.1279L22.9971 67.251V176.545L23.0938 176.677L53.4922 218.07L43.3926 232.271L4.6084 178.227L4.10938 61.79L41.6299 8.47266L51.9668 21.7227Z`;
  const cpOutline = `M43.2168 6.44238L83.2168 60.4424L83.6123 60.9766L83.6094 61.6416L83.1094 178.642L83.1064 179.286L82.7275 179.809L44.2275 232.809L42.5889 235.063L40.9775 232.789L2.36816 178.289L2 177.77V61.0049L2.3584 60.4902L39.9678 6.49023L41.5596 4.20508L43.2168 6.44238Z`;

  const noFill = `none`;
  const svgClass = `h-auto w-full`;
  const svgViewBox = `0 0 1000 560`;
  const animFloat = `animate-float-particle`;
  const animSignal = `animate-signal`;
  const anchorEnd = `end`;
  const iconClass = `size-5`;
  const overlayClass = `pointer-events-none absolute flex gap-1 text-[var(--color-workflow-native-gold)]`;
  const transformCenter = `translate(-50%, -50%)`;

  return (
    <div className={`relative w-full`}>
      <svg viewBox={svgViewBox} className={svgClass} fill={noFill}>

        {/* Vertical streak particles scattered across the background */}
        <g opacity={0.7}>
          {Array.from({ length: 40 }).map((_, i) => {
            const seed = (i * 73) % 1000;
            const x = 30 + ((seed * 13) % 940);
            const y = 20 + ((seed * 29) % 520);
            const len = 8 + ((seed * 7) % 30);
            if (x > crystalRight - 10 && x < outX - 20 && Math.abs(y - hexCy) < 30) return null;
            return (
              <line
                key={i}
                x1={x} y1={y} x2={x} y2={y - len}
                stroke={gold}
                strokeWidth={0.8}
                opacity={0.2 + ((seed * 3) % 10) / 25}
                className={animFloat}
                style={{ animationDelay: `${(i % 8) * 0.3}s` }}
              />
            );
          })}
        </g>

        {/* Soft radial glow behind the hex via two stacked semi-transparent circles */}
        <circle cx={hexCx} cy={hexCy} r={140} fill={gold} opacity={0.14} />
        <circle cx={hexCx} cy={hexCy} r={100} fill={gold} opacity={0.08} />

        {/* One curved signal line + animated overlay per input label */}
        {framingSignals.map((label, i) => {
          const startY = 80 + i * 55;
          const d = `M220,${startY} C360,${startY} 430,${hexCy} ${crystalLeft.toFixed(1)},${hexCy}`;
          return (
            <g key={label}>
              <path d={d} stroke={gold} strokeWidth={1} fill={noFill} opacity={0.35} />
              <path
                d={d}
                stroke={gold}
                strokeWidth={1}
                fill={noFill}
                className={animSignal}
                style={{ animationDelay: `${i * 0.3}s` }}
              />
              <text
                x={210} y={startY + 4}
                textAnchor={anchorEnd}
                fontSize={13}
                fontWeight={600}
                letterSpacing={1.5}
                fill={white}
                fillOpacity={0.85}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Extra unlabeled rays add funnel density */}
        {Array.from({ length: 14 }).map((_, i) => {
          const startY = 60 + i * 32 + ((i * 13) % 20);
          const startX = 240 + ((i * 17) % 30);
          return (
            <path
              key={`ray-${i}`}
              d={`M${startX},${startY} Q430,${hexCy} ${crystalLeft.toFixed(1)},${hexCy}`}
              stroke={gold}
              strokeWidth={0.6}
              fill={noFill}
              opacity={0.25 + (i % 4) * 0.1}
            />
          );
        })}

        {/* Crystal gem node: 123x242 SVG scaled and centered at (hexCx, hexCy) */}
        <g transform={`translate(${crystalTx} ${crystalTy}) scale(${crystalScale})`}>
          <rect x={83.1094} y={60.6328} width={34} height={118} fill={crystalFill} stroke={crystalStroke} strokeWidth={5} />
          <path d={cpTopRight} fill={crystalFill} stroke={crystalStroke} strokeWidth={4} />
          <path d={cpBottomRight} fill={crystalFill} stroke={crystalStroke} strokeWidth={4} />
          <path d={cpLeftFacet} fill={crystalFill} fillOpacity={0.5} stroke={crystalFill} />
          <path d={cpOutline} fill={noFill} stroke={crystalStroke} strokeWidth={4} />
        </g>

        {/* Outgoing fanned rays from hex right edge to the output node */}
        {Array.from({ length: 18 }).map((_, i) => {
          const t = (i - 8.5) / 8.5;
          const startY = hexCy + t * hexR * 0.55;
          const ctrlX = (crystalRight + outX) / 2;
          const ctrlY = hexCy + t * 25;
          const isCenter = Math.abs(t) < 0.15;
          return (
            <path
              key={`out-${i}`}
              d={`M${crystalRight.toFixed(1)},${startY.toFixed(1)} Q${ctrlX.toFixed(1)},${ctrlY.toFixed(1)} ${outX - 32},${outY}`}
              stroke={gold}
              strokeWidth={isCenter ? 1.4 : 0.7}
              fill={noFill}
              opacity={isCenter ? 0.95 : 0.35 + (1 - Math.abs(t)) * 0.4}
            />
          );
        })}

        {/* Animated dashed center beam */}
        <path
          d={`M${crystalRight.toFixed(1)},${hexCy} Q${((crystalRight + outX) / 2).toFixed(1)},${hexCy} ${outX - 32},${outY}`}
          stroke={gold}
          strokeWidth={2}
          fill={noFill}
          className={animSignal}
        />

        {/* Output node circle */}
        <circle cx={outX} cy={outY} r={28} fill={bgDeep} stroke={gold} strokeWidth={2} />

        {/* Callout labels below the output node */}
        <g transform={`translate(${outX - 180} ${outY + 60})`}>
          <text x={0} y={0} fontSize={12} fontWeight={700} letterSpacing={1.5} fill={white} fillOpacity={0.85}>
            THE RIGHT PROBLEM
          </text>
          <rect x={-8} y={14} width={180} height={30} rx={6} fill={bgDeep} stroke={gold} strokeWidth={1.5} />
          <text x={0} y={34} fontSize={13} fontWeight={700} letterSpacing={1.8} fill={gold}>
            STRATEGIC WEDGE
          </text>
        </g>
      </svg>

      {/* Brain + Compass icon overlay positioned over the output node */}
      <div
        className={overlayClass}
        style={{
          left: `${(outX / 1000) * 100}%`,
          top: `${(outY / 560) * 100}%`,
          transform: transformCenter,
        }}
      >
        <Brain className={iconClass} />
        <Compass className={iconClass} />
      </div>
    </div>
  );
}

type JudgmentRowProps = {
  icon: ReactNode;
  title: string;
  tone: "cool" | "warm";
};

// These rows mirror the reference card's left/right evidence list while staying inside Yuvabe's palette.
function JudgmentRow({ icon, title, tone }: JudgmentRowProps) {
  return (
    <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-3 md:grid-cols-[3rem_minmax(0,1fr)] md:gap-4">
      <span
        className={cn(
          "flex size-10 items-center justify-center md:size-11",
          tone === "warm"
            ? "text-[var(--green-500)]"
            : "text-[var(--cyan-200)]",
        )}
      >
        {icon}
      </span>
      <p className="text-heading-md leading-[1.04] tracking-[-0.02em] text-white">
        {title}
      </p>
    </div>
  );
}

// The inline SVG keeps the beam and fulcrum geometry close to the reference while labels remain responsive HTML.
function JudgmentBalanceGraphic() {
  return (
    <div className="pt-1">
      <div className="relative mx-auto w-full max-w-[40rem]">
        <svg
          aria-hidden="true"
          viewBox="0 0 640 150"
          className="h-[8.5rem] w-full"
          preserveAspectRatio="none"
        >
          <rect
            x="18"
            y="28"
            width="604"
            height="10"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
          />
          <path
            d="M320 41 L365 145 H275 Z"
            fill="none"
            stroke="white"
            strokeWidth="2.4"
          />
        </svg>

        <div className="mt-3 grid grid-cols-2 gap-4 px-4 text-center md:px-5">
          <p className="text-heading-sm tracking-[-0.01em] text-white">
            AI-Generated Options
          </p>
          <p className="text-heading-sm tracking-[-0.01em] text-white">
            Human Judgment
          </p>
        </div>
      </div>
    </div>
  );
}

function JudgmentBurstIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 5v4" />
      <path d="M16 23v4" />
      <path d="M6.5 9.5 9.6 12" />
      <path d="M22.4 20 25.5 22.5" />
      <path d="M5 16h4" />
      <path d="M23 16h4" />
      <path d="M6.5 22.5 9.6 20" />
      <path d="M22.4 12 25.5 9.5" />
      <path d="M13.2 13.8c0-1.9 1.4-3.3 2.8-3.3s2.8 1.4 2.8 3.3c0 2.1-2.8 4.3-2.8 4.3s-2.8-2.2-2.8-4.3Z" />
      <path d="M12 22h8" />
    </svg>
  );
}

function JudgmentLinesIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M4 9h24" />
      <path d="M4 16h18" />
      <path d="M4 23h24" />
    </svg>
  );
}

function JudgmentDoorIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 24V9.5L18 7v17" />
      <path d="M18 8.5 25 10v14l-7-1.5" />
      <path d="M14 16h.1" />
    </svg>
  );
}

function JudgmentSelectionIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 7c2.5 0 4.5 2 4.5 4.5S18.5 16 16 16s-4.5-2-4.5-4.5S13.5 7 16 7Z" />
      <path d="M7 24c1.4-3.6 4.4-5.6 9-5.6 4.6 0 7.6 2 9 5.6" />
      <path d="M23.5 7.5 27 11l-3.5 3.5" />
      <path d="M27 11h-7" />
    </svg>
  );
}

function JudgmentDirectionIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="16" cy="16" r="9" />
      <path d="M16 7v18" />
      <path d="M12 12.5 16 8l4 4.5" />
      <path d="M12.5 24H20" />
    </svg>
  );
}

function JudgmentValueIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 6v20" />
      <path d="M8 10h16" />
      <path d="M10.5 10 7 17h7l-3.5-7Z" />
      <path d="M25 17h-7l3.5-7 3.5 7Z" />
      <path d="M12 25h8" />
    </svg>
  );
}

// This replica follows the reference card closely while translating it into Yuvabe's token-led dark palette.
function JudgmentGraphic() {
  return (
    <div className="space-y-7 md:space-y-8">
      {/* The centered headline mirrors the reference card while staying in Yuvabe's typography system. */}
      <div className="mx-auto max-w-[35rem] text-center">
        <h4 className="font-display text-[clamp(1.9rem,2.7vw,2.85rem)] leading-[0.98] tracking-[-0.045em] text-white">
          AI expands possibilities, but human judgment
          <br className="hidden sm:block" />
          determines value.
        </h4>
      </div>

      {/* The left/right evidence columns stay close to the reference spacing and hierarchy. */}
      <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 sm:gap-y-5 md:gap-x-14">
        <div className="space-y-4 md:space-y-5">
          <JudgmentRow
            icon={<JudgmentBurstIcon />}
            title="Abundance of Choices"
            tone="cool"
          />
          <JudgmentRow
            icon={<JudgmentLinesIcon />}
            title="Lack of Clarity"
            tone="cool"
          />
          <JudgmentRow
            icon={<JudgmentDoorIcon />}
            title="Increased Possibility"
            tone="cool"
          />
        </div>

        <div className="space-y-4 md:space-y-5">
          <JudgmentRow
            icon={<JudgmentSelectionIcon />}
            title="Strategic Selection"
            tone="warm"
          />
          <JudgmentRow
            icon={<JudgmentDirectionIcon />}
            title="Clear Direction"
            tone="warm"
          />
          <JudgmentRow
            icon={<JudgmentValueIcon />}
            title="Determined Value"
            tone="warm"
          />
        </div>
      </div>

      <JudgmentBalanceGraphic />
    </div>
  );
}

// Both cards share one surface so they read as a single coherent argument in the section grid.
function FramingAndJudgmentRow() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-0">
      {/* Left: framing panel — copy + funnel graphic */}
      <div className="flex flex-col gap-5 lg:pr-8 lg:border-r lg:border-[var(--color-border-brand-dark)]">
        <div className="space-y-2">
          <h3 className="text-heading-md text-white">Framing matters more</h3>
          <p className="text-body-md text-[var(--color-text-inverse-muted)]">
            When execution gets cheaper, picking the right problem and wedge
            becomes the real advantage.
          </p>
        </div>
        <FramingGraphic />
      </div>

      {/* Right: judgment panel */}
      <div className="lg:pl-8">
        <JudgmentGraphic />
      </div>
    </div>
  );
}

// This section packages the dark-band story into one reusable homepage-ready pattern while we review it in isolation first.
export function StudioAiFirstSection({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "ds-section-brand-night relative overflow-hidden border-t border-[rgb(11_15_25_/_0.04)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] ds-pattern-brand-night-dots opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8rem] top-[-10rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(150,136,192,0.18)_0%,rgba(150,136,192,0)_72%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8rem] left-[18%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(255,202,45,0.1)_0%,rgba(255,202,45,0)_74%)] blur-3xl"
      />

      {/* The dark rails preserve the homepage framing while adapting it to the night section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-7xl -translate-x-1/2 px-6 md:block md:px-10"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-white/8" />
        <div className="absolute inset-y-0 right-0 w-px bg-white/8" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        {/* The intro keeps the section argument tight so the graphic grid can do the rest of the work. */}
        <div className="max-w-4xl space-y-4 md:space-y-5">
          <p className="text-label-sm uppercase tracking-[0.22em] text-[var(--color-text-inverse-muted)]">
            AI-first DNA
          </p>
          <h2
            className="text-section-display text-white md:max-w-4xl"
            style={{
              fontSize: "3.5rem",
              fontWeight: 600,
              wordSpacing: ".2rem",
            }}
          >
            The 0-to-1 workflow changed.
          </h2>
          <p className="max-w-3xl text-body-lg text-[var(--color-text-inverse-muted)]">
            Execution got cheaper. The edge moved to framing, faster
            experiments, richer MVPs, and better judgment.
          </p>
        </div>

        {/* The workflow anchor card explains the overall shift before the supporting cards unpack the details. */}
        <div className="mt-10">
          <IllustrationCard
            title="The workflow changed"
            body="AI fundamentally reshaped the path from 0 to 1."
            illustration={<WorkflowShiftGraphic />}
          />
        </div>

        {/* The lower grid breaks the change into four scan-friendly founder-relevant shifts. */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <IllustrationCard
            title="Making got faster"
            body="From prompt to prototype to iteration, teams can explore and ship far earlier than before."
            illustration={
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/assets/making.jpeg"
                  alt="Making got faster"
                  className="h-full w-full object-cover"
                />
              </div>
            }
          />
          <IllustrationCard
            title="Richer MVPs, earlier"
            body="First versions can be usable enough to learn from without waiting for a full polished build."
            illustration={
              <div className="overflow-hidden rounded-xl">
                <img
                  src="/assets/mvps.jpeg"
                  alt="Richer MVPs, earlier"
                  className="h-full w-full object-cover"
                />
              </div>
            }
          />
          <IllustrationCard
            className="lg:col-span-2"
            graphicOnly
            illustration={<FramingAndJudgmentRow />}
          />
        </div>
      </div>
    </section>
  );
}
