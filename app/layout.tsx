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
    default: "Titan Pilot — Replayable AI Trading Infrastructure",
    template: "%s — Titan Pilot",
  },
  description:
    "Titan Pilot is a risk-first AI trading infrastructure platform with replayable decisions, deterministic scoring, MT5 execution, broker reconciliation, and shadow-mode validation.",
  alternates: {
    canonical: "/",
  },
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
    title: "Titan Pilot — Replayable AI Trading Infrastructure",
    description:
      "AI reasons. Software decides. Risk-first AI trading infrastructure with replayable decisions, deterministic scoring, and shadow-mode validation.",
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
