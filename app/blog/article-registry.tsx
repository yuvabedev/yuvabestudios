import type { ComponentType } from "react";

// Maps a blog slug to its rich article component (migrated from the legacy
// per-slug files). The detail route renders the matching component as the body.
import CodeGenerationLLMs from "./code-generation-LLMs";
import ContentPillars from "./content-pillars";
import CreatingMarketingCopy from "./creating-marketing-copy";
import DataToConnection from "./data-to-connection";
import FutureOfFashion from "./future-of-fashion";
import HuggingFace from "./hugging-face";
import LocalLLM from "./local-llm";
import MeasuringUxBeyondUsability from "./measuring-ux-beyond-usability";
import ObjectDetectionSystemInFlutter from "./object-detection-system-in-flutter";
import SecurityFlawInAnimations from "./security-flaw-in-animations";
import SeoInTheAgeOfAi from "./seo-in-the-age-of-ai";
import SocialMediaMarketingForLocalBusiness from "./social-media-marketing-for-local-business";
import VirtualTryOn from "./virtual-try-on";

export const articleRegistry: Record<string, ComponentType> = {
  "code-generation-LLMs": CodeGenerationLLMs,
  "content-pillars": ContentPillars,
  "creating-marketing-copy": CreatingMarketingCopy,
  "data-to-connection": DataToConnection,
  "future-of-fashion": FutureOfFashion,
  "hugging-face": HuggingFace,
  "local-llm": LocalLLM,
  "measuring-ux-beyond-usability": MeasuringUxBeyondUsability,
  "object-detection-system-in-flutter": ObjectDetectionSystemInFlutter,
  "security-flaw-in-animations": SecurityFlawInAnimations,
  "seo-in-the-age-of-ai": SeoInTheAgeOfAi,
  "social-media-marketing-for-local-business": SocialMediaMarketingForLocalBusiness,
  "virtual-try-on": VirtualTryOn,
};
