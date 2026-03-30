"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { PremiumSurface } from "@/components/ui/premium-surface";
import { cn } from "@/lib/utils";

type ModalShellProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestClose?: (reason: "close-button" | "escape-key") => void;
  closeVariant?: "default" | "case-study";
  motionPreset?: "default" | "fade";
  onAfterClose?: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

// This shared shell keeps the modal simple: one gradient scrim plus one translucent glass panel.
export function ModalShell({
  open,
  onOpenChange,
  onRequestClose,
  closeVariant = "default",
  motionPreset = "default",
  onAfterClose,
  title,
  children,
  className,
  contentClassName,
}: ModalShellProps) {
  const shouldReduceMotion = useReducedMotion();
  const panelEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const [activeCloseVariant, setActiveCloseVariant] = useState<"default" | "case-study">("default");

  const shellMotion = shouldReduceMotion
    ? undefined
    : {
        // The shell keeps one shared motion contract so entry and exit stay perfectly mirrored.
        scrim: {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          transition: { duration: 0.68, ease: panelEase },
        },
        caseStudyScrim: {
          hidden: { opacity: 0 },
          transition: { duration: 0.56, ease: panelEase },
        },
        panel: {
          hidden:
            motionPreset === "fade"
              ? { opacity: 0, scale: 0.988 }
              : { opacity: 0, y: 100, scale: 0.992 },
          visible: { opacity: 1, y: 0, scale: 1 },
          transition: {
            y: { duration: 0.68, ease: panelEase },
            opacity: { duration: 0.68, ease: panelEase },
            scale: { duration: 0.68, ease: panelEase },
          },
        },
        caseStudyPanel: {
          hidden: { opacity: 0, y: 172, scale: 0.988 },
          transition: {
            y: { duration: 0.56, ease: panelEase },
            opacity: { duration: 0.56, ease: panelEase },
            scale: { duration: 0.56, ease: panelEase },
          },
        },
      };

  const isCaseStudyClose = activeCloseVariant === "case-study";
  const scrimExit = isCaseStudyClose ? shellMotion?.caseStudyScrim.hidden : shellMotion?.scrim.hidden;
  const scrimExitTransition = isCaseStudyClose ? shellMotion?.caseStudyScrim.transition : shellMotion?.scrim.transition;
  const panelExit = isCaseStudyClose ? shellMotion?.caseStudyPanel.hidden : shellMotion?.panel.hidden;
  const panelExitTransition = isCaseStudyClose ? shellMotion?.caseStudyPanel.transition : shellMotion?.panel.transition;

  function handleCloseIntent(reason: "close-button" | "escape-key") {
    if (closeVariant === "case-study") {
      setActiveCloseVariant("case-study");
    }

    if (onRequestClose) {
      onRequestClose(reason);
      return;
    }

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal forceMount>
        <AnimatePresence
          onExitComplete={() => {
            setActiveCloseVariant("default");
            onAfterClose?.();
          }}
        >
          {open ? (
            <>
              <DialogOverlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-40 overflow-y-auto bg-[radial-gradient(circle_at_6%_16%,color-mix(in_srgb,var(--purple-500)_38%,transparent)_0%,transparent_17%),radial-gradient(circle_at_16%_28%,color-mix(in_srgb,var(--lavender-500)_22%,transparent)_0%,transparent_13%),radial-gradient(circle_at_12%_86%,color-mix(in_srgb,var(--purple-500)_18%,transparent)_0%,transparent_13%),radial-gradient(circle_at_19%_76%,color-mix(in_srgb,var(--lavender-200)_14%,transparent)_0%,transparent_10%),radial-gradient(circle_at_88%_80%,color-mix(in_srgb,var(--yellow-500)_30%,transparent)_0%,transparent_23%),radial-gradient(circle_at_77%_66%,color-mix(in_srgb,var(--orange-500)_24%,transparent)_0%,transparent_15%),radial-gradient(circle_at_69%_90%,color-mix(in_srgb,var(--lavender-500)_14%,transparent)_0%,transparent_11%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.72)),linear-gradient(to_right,rgba(148,163,184,0.042)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.021)_1px,transparent_1px)] bg-[size:auto,auto,auto,auto,auto,auto,auto,auto,120px_100%,100%_120px] backdrop-blur-xl"
                  initial={shouldReduceMotion ? undefined : shellMotion?.scrim.hidden}
                  animate={shouldReduceMotion ? undefined : shellMotion?.scrim.visible}
                  exit={shouldReduceMotion ? undefined : scrimExit}
                  transition={shouldReduceMotion ? undefined : open ? shellMotion?.scrim.transition : scrimExitTransition}
                >
                  {/* The scrim and panel now share one timing system so exit cleanly reverses entry. */}
                  <div className="flex min-h-screen items-start justify-center p-4 sm:p-6 lg:p-8">
                    <DialogContent
                      forceMount
                      onEscapeKeyDown={(event) => {
                        if (!onRequestClose) {
                          return;
                        }

                        event.preventDefault();
                        handleCloseIntent("escape-key");
                      }}
                      className="!relative !left-auto !top-auto z-50 w-full !max-w-[74rem] !translate-x-0 !translate-y-0 border-0 bg-transparent p-0 shadow-none"
                    >
                      <motion.div
                        initial={shouldReduceMotion ? undefined : shellMotion?.panel.hidden}
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : { ...shellMotion?.panel.visible, transition: shellMotion?.panel.transition }
                        }
                        exit={
                          shouldReduceMotion
                            ? undefined
                            : { ...panelExit, transition: panelExitTransition }
                        }
                      >
                        {/* The panel stays on the same path in and out so close motion reads as the exact inverse. */}
                        <PremiumSurface
                          tone="glass"
                          elevation="lg"
                          blur="lg"
                          radius="xl"
                          className={cn(
                            "relative border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(255,255,255,0.34))] shadow-[0_20px_56px_rgba(15,23,42,0.045)] backdrop-blur-[20px]",
                            className,
                          )}
                        >
                          <DialogTitle className="sr-only">{title}</DialogTitle>

                          {/* The panel stays simple: translucent fill, subtle top highlight, and content above it. */}
                          <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit]">
                            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                            <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.20),rgba(255,255,255,0.08)_24%,rgba(255,255,255,0.02)_56%)]" />
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              handleCloseIntent("close-button");
                            }}
                            className="absolute right-4 top-4 z-20 rounded-full border border-[color:color-mix(in_srgb,var(--lavender-500)_26%,white)] bg-[linear-gradient(180deg,rgba(241,237,252,0.96),rgba(233,227,249,0.88))] text-[var(--neutral-700)] shadow-[0_8px_18px_rgba(15,23,42,0.04)] backdrop-blur-sm hover:bg-[linear-gradient(180deg,rgba(244,240,254,0.98),rgba(236,231,251,0.92))]"
                          >
                            <X className="size-4" />
                            <span className="sr-only">Close case study summary</span>
                          </Button>

                          <div className={cn("relative z-10 p-4 sm:p-6 lg:p-8", contentClassName)}>{children}</div>
                        </PremiumSurface>
                      </motion.div>
                    </DialogContent>
                  </div>
                </motion.div>
              </DialogOverlay>
            </>
          ) : null}
        </AnimatePresence>
      </DialogPortal>
    </Dialog>
  );
}



