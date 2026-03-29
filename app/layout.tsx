import type { Metadata } from "next";
import "./globals.css";

import { siteMetadataBase } from "@/lib/site";
import { StudioFooter } from "@/components/studio/studio-footer";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: {
    default: "Yuvabe Studios — AI-First Design & Engineering",
    template: "%s | Yuvabe Studios",
  },
  description:
    "AI-first strategy, design, engineering, and growth marketing studio for startups. We turn ambitious ideas into polished products.",
  keywords: [
    "AI studio",
    "design studio",
    "engineering studio",
    "startup studio",
    "product design",
    "growth marketing",
    "UI/UX design",
    "software engineering",
    "brand strategy",
    "Yuvabe Studios",
  ],
  authors: [{ name: "Yuvabe Studios", url: "https://www.yuvabestudios.com" }],
  creator: "Yuvabe Studios",
  publisher: "Yuvabe Studios",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.yuvabestudios.com",
    siteName: "Yuvabe Studios",
    title: "Yuvabe Studios — AI-First Design & Engineering",
    description:
      "AI-first strategy, design, engineering, and growth marketing studio for startups. We turn ambitious ideas into polished products.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Yuvabe Studios — AI-First Design & Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvabe Studios — AI-First Design & Engineering",
    description:
      "AI-first strategy, design, engineering, and growth marketing studio for startups.",
    images: ["/og-image.png"],
    creator: "@yuvabestudios",
  },
  icons: {
    icon: [
      { url: "/yb.ico", sizes: "any" },
    ],
    shortcut: "/yb.ico",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        {children}
        <StudioFooter />
      </body>
    </html>
  );
}
