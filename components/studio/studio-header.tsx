"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

import type { StudioHomepageNavItem } from "@/components/studio/studio-homepage-content";
import { PremiumSurface } from "@/components/ui/premium-surface";

const overlayTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

const menuListVariants = {
  closed: {},
  open: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, y: 18 },
  open: { opacity: 1, y: 0, transition: overlayTransition },
};

const pendingHomepageSectionStorageKey = "studio-pending-homepage-section";

function subscribe() {
  return () => {};
}

type StudioHeaderProps = {
  navigationItems: StudioHomepageNavItem[];
};

// The header keeps desktop navigation calm while letting mobile users open a full-screen overlay menu.
export function StudioHeader({ navigationItems }: StudioHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMounted = useSyncExternalStore(subscribe, () => true, () => false);
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();

  // The shell starts seamless at the top, then eases into a floating rounded rail as the page moves.
  const headerProgress = useSpring(useTransform(scrollY, [0, 120], [0, 1]), {
    stiffness: 240,
    damping: 32,
    mass: 0.32,
  });
  const headerInset = useTransform(headerProgress, [0, 1], [0, 12]);
  const headerRadius = useTransform(headerProgress, [0, 1], [0, 32]);
  const headerShadowY = useTransform(headerProgress, [0, 1], [0, 18]);
  const headerShadowBlur = useTransform(headerProgress, [0, 1], [0, 48]);
  const headerShadowAlpha = useTransform(headerProgress, [0, 1], [0, 0.1]);
  const headerBorderAlpha = useTransform(headerProgress, [0, 1], [0.56, 0.8]);
  const headerShadow = useMotionTemplate`0 ${headerShadowY}px ${headerShadowBlur}px rgba(15, 23, 42, ${headerShadowAlpha})`;
  const headerBorderColor = useMotionTemplate`rgba(255, 255, 255, ${headerBorderAlpha})`;

  // Lock page scroll and flag the shell while the overlay menu is open so the background can blur and scale.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    document.body.dataset.mobileNavOpen = isMenuOpen ? "true" : "false";

    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.mobileNavOpen;
    };
  }, [isMenuOpen]);

  // Pending cross-route section targets are resolved after the homepage mounts.
  useEffect(() => {
    if (pathname !== "/" || typeof window === "undefined") {
      return;
    }

    const pendingHash = window.sessionStorage.getItem(
      pendingHomepageSectionStorageKey,
    );

    if (!pendingHash) {
      return;
    }

    let frameId = 0;
    let attempts = 0;

    const tryPendingScroll = () => {
      if (scrollToSection(pendingHash)) {
        window.sessionStorage.removeItem(pendingHomepageSectionStorageKey);
        return;
      }

      attempts += 1;

      if (attempts >= 18) {
        window.sessionStorage.removeItem(pendingHomepageSectionStorageKey);
        return;
      }

      frameId = window.requestAnimationFrame(tryPendingScroll);
    };

    frameId = window.requestAnimationFrame(tryPendingScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  // Close the mobile panel after navigation so the page content regains focus immediately.
  function handleNavClick() {
    setIsMenuOpen(false);
  }

  // Hash links should target homepage sections when the user is browsing a non-home route.
  function resolveHref(href: string) {
    if (!href.startsWith("#")) {
      return href;
    }

    return pathname === "/" ? href : `/${href}`;
  }

  // Shared section scrolling keeps homepage anchors out of the router's default hash-jump behavior.
  function scrollToSection(href: string) {
    const targetId = href.replace(/^#/, "");
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return false;
    }

    const headerOffset = (headerRef.current?.offsetHeight ?? 0) + 12;
    const targetTop =
      targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${href}`,
    );

    return true;
  }

  // Hash items scroll in JS so same-route and cross-route section navigation share one deterministic path.
  function handleSectionNavigation(href: string) {
    setIsMenuOpen(false);

    if (pathname !== "/") {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(pendingHomepageSectionStorageKey, href);
      }

      router.push("/", { scroll: false });
      return;
    }

    const runSectionScroll = () => {
      scrollToSection(href);
    };

    if (isMenuOpen) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(runSectionScroll);
      });
      return;
    }

    runSectionScroll();
  }

  // Shared nav rendering keeps section items on buttons while route changes stay on real links.
  function renderNavigationItem(
    item: StudioHomepageNavItem,
    className: string,
    isMobile = false,
  ) {
    if (item.href.startsWith("#")) {
      return (
        <button
          key={item.label}
          type="button"
          onClick={() => handleSectionNavigation(item.href)}
          className={className}
        >
          <span>{item.label}</span>
          {isMobile ? (
            <span className="inline-flex items-center gap-2 text-label-lg tracking-normal text-slate-400">
              Go
              <ArrowUpRight className="size-4" />
            </span>
          ) : null}
        </button>
      );
    }

    return (
      <Link
        key={item.label}
        href={resolveHref(item.href)}
        onClick={handleNavClick}
        prefetch={item.href.startsWith("/") ? undefined : false}
        className={className}
      >
        <span>{item.label}</span>
        {isMobile ? (
          <span className="inline-flex items-center gap-2 text-label-lg tracking-normal text-slate-400">
            Go
            <ArrowUpRight className="size-4" />
          </span>
        ) : null}
      </Link>
    );
  }

  const overlay = (
    <AnimatePresence>
      {isMenuOpen ? (
        <motion.div
          key="mobile-nav-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-[100] lg:hidden"
        >
          <button
            type="button"
            aria-label="Close navigation overlay"
            onClick={handleNavClick}
            className="absolute inset-0 h-full w-full cursor-default bg-[rgba(255,255,255,0.2)] backdrop-blur-2xl"
          />

          {/* The overlay shell keeps the brand row and nav card floating above the softened page. */}
          <div className="absolute inset-0 overflow-y-auto">
            <div className="min-h-full bg-[radial-gradient(circle_at_top,rgba(255,202,45,0.16),rgba(255,255,255,0)_34%),linear-gradient(180deg,rgba(255,255,255,0.42),rgba(255,255,255,0.22))] px-6 pb-10 pt-4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={overlayTransition}
                className="mx-auto flex max-w-7xl items-center justify-between gap-4"
              >
                <Link href="/" onClick={handleNavClick} className="flex shrink-0 items-center">
                  <Image
                    src="/logo.svg"
                    alt="Yuvabe Studios"
                    width={140}
                    height={36}
                    priority
                    className="h-9 w-auto"
                  />
                </Link>

                {/* The dismiss control now reuses the shared premium-surface contract instead of one-off glass styling. */}
                <PremiumSurface asChild tone="glassSubtle" elevation="md" blur="md" radius="full">
                  <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={handleNavClick}
                    className="inline-flex size-11 items-center justify-center text-slate-900 transition-colors hover:border-[var(--purple-500)] hover:text-[var(--purple-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2"
                  >
                    <X className="size-5" />
                  </button>
                </PremiumSurface>
              </motion.div>

              {/* The overlay menu uses the shared premium surface so other modal-like panels can inherit the same shell. */}
              <PremiumSurface
                asChild
                tone="glass"
                elevation="lg"
                blur="lg"
                radius="xl"
                className="mx-auto mt-6 max-w-7xl p-3"
              >
                <motion.nav
                  id="mobile-site-nav"
                  variants={menuListVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {navigationItems.map((item) => (
                    <motion.div key={item.label} variants={menuItemVariants}>
                      {renderNavigationItem(
                        item,
                        "flex min-h-[5.5rem] w-full items-center justify-between rounded-[1.25rem] px-5 py-6 text-left text-[2.25rem] leading-[0.96] tracking-[-0.04em] text-slate-900 transition-colors hover:bg-white/55 hover:text-[var(--purple-500)] touch-manipulation sm:min-h-[6rem] sm:px-6 sm:py-6 sm:text-[2.5rem]",
                        true,
                      )}
                    </motion.div>
                  ))}
                </motion.nav>
              </PremiumSurface>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <motion.header
        ref={headerRef}
        className="sticky top-0 z-50 mx-auto w-full max-w-7xl"
        style={{
          paddingTop: headerInset,
          paddingLeft: headerInset,
          paddingRight: headerInset,
        }}
      >
        {/* The sticky shell spans edge-to-edge at the top, then gains inset and radius as it turns into a floating rail. */}
        <PremiumSurface
          asChild
          tone="glassPanelSubtle"
          elevation="none"
          blur="lg"
          radius="md"
          className="w-full"
        >
          <motion.div
            style={{
              borderRadius: headerRadius,
              boxShadow: headerShadow,
              borderColor: headerBorderColor,
            }}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-10">
              {/* Logo - left side */}
              <Link href="/" onClick={handleNavClick} className="flex shrink-0 items-center">
                <Image
                  src="/logo.svg"
                  alt="Yuvabe Studios"
                  width={140}
                  height={36}
                  priority
                  className="h-9 w-auto"
                />
              </Link>

              {/* Desktop navigation - right side */}
              <nav className="hidden items-center gap-8 lg:flex">
                {navigationItems.map((item) =>
                  renderNavigationItem(
                    item,
                    "text-label-lg text-slate-900/90 transition-colors hover:text-[var(--purple-500)]",
                  ),
                )}
              </nav>

              {/* Mobile trigger - right side */}
              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-site-nav"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/75 bg-white/55 text-slate-900 shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-colors hover:border-[var(--purple-500)] hover:text-[var(--purple-500)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:ring-offset-2 lg:hidden"
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </motion.div>
        </PremiumSurface>
      </motion.header>

      {isMounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
