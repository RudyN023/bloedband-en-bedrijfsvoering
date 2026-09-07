import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { NewsletterForm } from "../components/NewsletterForm";

export const metadata: Metadata = {
  title: "De Donderdag Drie — nieuwsbrief van Bloedband & Bedrijfsvoering",
  description:
    "Elke donderdag één dilemma, één inzicht en één vraag die je helpt scherper te kijken naar ondernemen in een familiebedrijf. Gratis, rechtstreeks van Nick Waterman.",
  alternates: {
    canonical: "https://bloedbandenbedrijfsvoering.nl/nieuwsbrief",
  },
};

const items = [
  {
    label: "Het dilemma",
    text: "Een herkenbare keuze waar familie, eigenaarschap en ondernemerschap elkaar raken.",
  },
  {
    label: "Het inzicht",
    text: "Een scherpe les uit gesprekken met ondernemende families.",
  },
  {
    label: "Eén vraag aan jou",
    text: "Om op te reageren, over na te denken of samen te bespreken.",
  },
];

export default function NieuwsbriefPage() {
  return (
    <div className="min-h-screen bg-bb-purple-100 flex flex-col">
      {/* Minimal header */}
      <header className="py-8">
        <div className="max-w-2xl mx-auto px-6 flex justify-center">
          <Link href="/" aria-label="Terug naar Bloedband & Bedrijfsvoering">
            <Image src="/bb-icon.svg" alt="BB" width={40} height={40} className="h-10 w-10" />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-6 pb-24">
          {/* Hero */}
          <div className="text-center">
            <h1 className="font-display text-bb-plum-900 text-4xl sm:text-5xl font-bold leading-tight">
              De Donderdag Drie
            </h1>
            <p className="font-body text-bb-plum-800 text-lg leading-relaxed mt-6 max-w-lg mx-auto">
              Elke donderdag krijg je één dilemma, één inzicht en één vraag
              die je helpt scherper te kijken naar ondernemen in een
              familiebedrijf.
            </p>
          </div>

          {/* Form */}
          <div className="mt-10">
            <NewsletterForm />
            <p className="font-body text-bb-plum-700/70 text-xs text-center mt-4">
              Gratis. Geen spam. Uitschrijven kan altijd.
            </p>
          </div>

          {/* What you get */}
          <div className="mt-20 flex flex-col divide-y divide-bb-plum-800/10">
            {items.map((item, i) => (
              <div key={item.label} className="flex gap-5 py-6">
                <span className="font-display text-2xl text-bb-salmon shrink-0 w-8">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-display text-bb-plum-900 text-xl font-bold mb-1">
                    {item.label}
                  </h2>
                  <p className="font-body text-bb-plum-800 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Signature */}
          <div className="mt-20 flex items-center gap-4 justify-center">
            <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden">
              <Image
                src="/nick-waterman.png"
                alt="Nick Waterman"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-display text-bb-plum-900 font-bold">Nick Waterman</p>
              <p className="font-body text-bb-plum-700 text-sm">
                Host van Bloedband &amp; Bedrijfsvoering
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-bb-plum-800/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Link
            href="/"
            className="font-body text-bb-plum-700 hover:text-bb-plum-900 text-sm transition-colors"
          >
            ← Terug naar de podcast
          </Link>
        </div>
      </footer>
    </div>
  );
}
