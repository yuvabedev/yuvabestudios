"use client";

import dynamic from "next/dynamic";

// reCAPTCHA touches `window`, so load it client-side only and keep it out of the initial bundle.
export const RecaptchaField = dynamic(
  () => import("@/components/studio/recaptcha-widget").then((mod) => mod.RecaptchaWidget),
  { ssr: false },
);

// When unset (e.g. local dev without keys) forms hide the widget and the API skips verification.
export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
