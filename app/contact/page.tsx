import type { Metadata } from "next";

import { StudioContactPage, CONTACT_DETAILS } from "@/components/studio/studio-contact-page";
import { getAbsoluteUrl } from "@/lib/site";
import { getStudioHomepageContent } from "@/lib/studio-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Yuvabe Studios — AI-first strategy, design, engineering, and growth. Reach the team in Auroville by email, phone, or the contact form.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Yuvabe Studios",
    description:
      "Tell us about your product, bottleneck, or next big bet. We usually reply within one business day.",
    url: "/contact",
  },
  twitter: {
    title: "Contact Yuvabe Studios",
    description:
      "Tell us about your product, bottleneck, or next big bet. We usually reply within one business day.",
  },
};

export default async function ContactPage() {
  const homepageContent = await getStudioHomepageContent();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Yuvabe Studios",
    url: getAbsoluteUrl("/contact"),
    description:
      "Reach Yuvabe Studios by email, phone, or the contact form. Studio based in Auroville, Tamil Nadu.",
    mainEntity: {
      "@type": "Organization",
      name: "Yuvabe Studios",
      url: getAbsoluteUrl("/"),
      email: CONTACT_DETAILS.email,
      telephone: `+${CONTACT_DETAILS.phoneHref}`,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT_DETAILS.email,
        telephone: `+${CONTACT_DETAILS.phoneHref}`,
        areaServed: "IN",
        availableLanguage: ["English"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Saracon campus, Kottakarai Road",
        addressLocality: "Auroville",
        addressRegion: "Tamil Nadu",
        postalCode: "605009",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <StudioContactPage navigationItems={homepageContent.navigationItems} />
    </>
  );
}
