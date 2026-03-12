import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yuvabe Studios",
  description: "AI-first product design, development, and engineering studio for startups.",
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
