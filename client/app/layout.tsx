import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BreatheClean — Breathe Easier on Every Journey",
    template: "%s | BreatheClean",
  },
  description:
    "Health-first route planning for urban commuters. Real-time air quality data to help you find the cleanest path on every journey.",
  keywords: [
    "air quality",
    "route planner",
    "AQI",
    "healthy commute",
    "pollution",
    "BreatheClean",
  ],
  authors: [{ name: "BreatheClean" }],
  openGraph: {
    title: "BreatheClean — Breathe Easier on Every Journey",
    description:
      "Health-first route planning for urban commuters. Find the cleanest path with real-time AQI data.",
    siteName: "BreatheClean",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BreatheClean — Breathe Easier on Every Journey",
    description:
      "Health-first route planning for urban commuters. Find the cleanest path with real-time AQI data.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} font-outfit antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
