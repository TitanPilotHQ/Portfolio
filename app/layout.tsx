import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const siteUrl = "https://titanpilot.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Titan Pilot — AI Trading Infrastructure Built for Replayable, Risk-First Automation",
  description:
    "Titan Pilot is an AI trading infrastructure platform combining deterministic execution, replayable decisions, broker reconciliation, risk controls, and AI-assisted market reasoning.",
  keywords: [
    "AI trading infrastructure",
    "autonomous trading platform",
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
    "forex automation",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Titan Pilot",
    title: "Titan Pilot — AI Trading Infrastructure",
    description:
      "Autonomous trading intelligence built like mission-critical infrastructure. Deterministic execution, replayable decisions, risk-first automation.",
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
    title: "Titan Pilot — AI Trading Infrastructure",
    description:
      "Autonomous trading intelligence built like mission-critical infrastructure. AI reasons. Software decides.",
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg text-white`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
