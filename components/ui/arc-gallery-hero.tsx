"use client";

import React, { useEffect, useState } from "react";

// Arc-gallery hero: fans a set of images along an arc above a content slot.
// Adapted to the Yuvabe design system — brand tokens, no forced dark mode,
// and a `children` slot so page-level copy and CTAs drive the content.
type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  // radius for different screen sizes
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  // size of each card for different screen sizes
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  // optional extra class on outer section
  className?: string;
  // content rendered below the arc (heading, copy, CTAs)
  children?: React.ReactNode;
};

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 220,
  cardSizeLg = 120,
  cardSizeMd = 100,
  cardSizeSm = 76,
  className = "",
  children,
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
  });

  // Responsive resizing of the arc radius and card size.
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  // Ensure at least 2 points to distribute angles for the arc calculation.
  const count = Math.max(images.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <section
      className={`relative flex flex-col overflow-hidden text-(--neutral-900) ${className}`}
    >
      {/* Background ring container that controls geometry */}
      <div
        className="relative mx-auto"
        style={{
          width: "100%",
          height: dimensions.radius * 1.2,
        }}
      >
        {/* Center pivot for transforms — positioned at bottom center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {images.map((src, i) => {
            const angle = startAngle + step * i; // degrees
            const angleRad = (angle * Math.PI) / 180;

            const x = Math.cos(angleRad) * dimensions.radius;
            const y = Math.sin(angleRad) * dimensions.radius;

            return (
              <div
                key={i}
                className="animate-fade-in-up absolute opacity-0"
                style={{
                  width: dimensions.cardSize,
                  height: dimensions.cardSize,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: "forwards",
                  zIndex: count - i,
                }}
              >
                <div
                  className="h-full w-full overflow-hidden rounded-2xl bg-white shadow-[0_16px_32px_rgba(11,15,25,0.12)] ring-1 ring-(--color-border-default)"
                  style={{ transform: `rotate(${angle / 4}deg)` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="block h-full w-full object-cover"
                    draggable={false}
                    loading={i < 4 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content positioned below the arc */}
      <div className="relative z-10 flex flex-1 items-start justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
        <div
          className="animate-fade-in w-full max-w-3xl px-2 text-center opacity-0"
          style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
        >
          {children}
        </div>
      </div>

      {/* Local keyframes for the arc and content reveal */}
      <style>{`
        @keyframes arc-fade-in-up {
          from { opacity: 0; transform: translate(-50%, 60%); }
          to { opacity: 1; transform: translate(-50%, 50%); }
        }
        @keyframes arc-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation-name: arc-fade-in-up;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
        .animate-fade-in {
          animation-name: arc-fade-in;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up, .animate-fade-in {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};
