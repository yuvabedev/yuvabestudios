import type { Metadata } from "next";
import "./globals.css";

import { siteMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: "Yuvabe Studios",
  description:
    "AI-first strategy, design, engineering, and growth marketing studio for startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The layout stays network-independent while brand font assets are still pending. */}
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
