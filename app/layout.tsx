import type { Metadata } from "next";
import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://www.titanpilot.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Titan Pilot — The System of Record for AI Trading Decisions",
    template: "%s — Titan Pilot",
  },
  description:
    "Titan Pilot is supervised AI trading infrastructure — every AI thesis, objection, score, and approval becomes replayable, evidence your desk can defend.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI trading infrastructure",
    "supervised AI trading",
    "algorithmic trading",
    "AI trading agents",
    "deterministic execution",
    "trading automation",
    "broker reconciliation",
    "MetaTrader 5 automation",
    "MT5 trading infrastructure",
    "replayable trading decisions",
    "financial AI",
    "risk-first trading automation",
    "event-sourced trading platform",
    "AI market analysis",
    "AI decision audit trail",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Titan Pilot",
    title: "Titan Pilot — The System of Record for AI Trading Decisions",
    description:
      "Supervised AI trading. Titan Pilot turns every AI thesis, objection, score, and approval into replayable, machine-validated evidence.",
    images: [
      {
        url: "/banner.png",
        width: 1982,
        height: 793,
        alt: "Titan Pilot — AI Trading Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Titan Pilot — Supervised AI Trading",
    description:
      "Every AI trading decision, recorded and replayable. Titan Pilot is the system of record for supervised AI trading.",
    images: ["/banner.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${unbounded.variable}`}
    >
      <body className="antialiased bg-bg text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
