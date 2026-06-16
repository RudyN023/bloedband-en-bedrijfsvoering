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
  title: "Bloedband & Bedrijfsvoering — De podcast over familiebedrijven",
  description:
    "De podcast over het bijzondere leven en werk van familiebedrijven in Nederland. Presentator Nick Waterman spreekt met ondernemers en opvolgers over opvolging, eigenaarschap en familiedynamiek.",
  openGraph: {
    title: "Bloedband & Bedrijfsvoering",
    description:
      "De podcast over het bijzondere leven en werk van familiebedrijven in Nederland.",
    type: "website",
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
