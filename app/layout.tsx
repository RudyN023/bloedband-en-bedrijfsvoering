import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bloedband & Bedrijfsvoering — Dé podcast over familiebedrijven",
  description:
    "Dé podcast over familiebedrijven in Nederland. Nick Waterman spreekt met ondernemers en opvolgers over opvolging, eigenaarschap en de spanning tussen bloedband en bedrijfsvoering. Luister op Spotify, Apple Podcasts en YouTube.",
  keywords: [
    "familiebedrijf podcast",
    "familiebedrijven Nederland",
    "podcast ondernemers",
    "opvolging familiebedrijf",
    "eigenaarschap bedrijf",
    "Nick Waterman podcast",
    "bloedband bedrijfsvoering",
    "Nederlandse ondernemers podcast",
    "FBNed podcast",
  ],
  openGraph: {
    title: "Bloedband & Bedrijfsvoering — Dé podcast over familiebedrijven",
    description:
      "Nick Waterman spreekt met ondernemers en opvolgers uit Nederlandse familiebedrijven over opvolging, eigenaarschap en familiedynamiek.",
    type: "website",
    url: "https://bloedbandenbedrijfsvoering.nl",
    siteName: "Bloedband & Bedrijfsvoering",
  },
  verification: {
    google: "qbcrePL4fwkK3Qwm3fBvMcu2er-1pAMg52PO4z_TxQc",
  },
  alternates: {
    canonical: "https://bloedbandenbedrijfsvoering.nl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${cormorant.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
