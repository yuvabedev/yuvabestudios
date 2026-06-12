"use client";

import { useEffect, useRef } from "react";

interface TvamInViewVideoProps {
  src: string;
  className?: string;
}

export function TvamInViewVideo({ src, className }: TvamInViewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else { video.pause(); video.currentTime = 0; }
      },
      { threshold: 0.25 },
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      className={className}
    />
  );
}
