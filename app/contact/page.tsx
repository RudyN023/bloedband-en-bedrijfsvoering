import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { NavBar } from "../components/NavBar";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Bloedband & Bedrijfsvoering",
  description:
    "Neem contact op met Nick Waterman over de podcast Bloedband & Bedrijfsvoering. Voor vragen, gastsuggesties of samenwerkingen.",
};

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden min-h-screen bg-bb-purple-100">
      <NavBar />

      <main className="pt-20">
        {/* ── Hero ── */}
        <section className="bg-bb-plum-900 py-20 lg:py-28 relative overflow-hidden">
          {/* Accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-bb-salmon" />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-bb-salmon opacity-5 pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-60 h-60 rounded-full bg-bb-teal-700 opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-bb-salmon" />
              <span className="font-body text-bb-salmon text-xs font-semibold tracking-[0.2em] uppercase">
                Neem contact op
              </span>
            </div>
            <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl">
              Laten we kennismaken
            </h1>
            <p className="font-body text-white/60 mt-5 text-lg max-w-xl leading-relaxed">
              Heb je een vraag, een gastsuggestie of interesse in samenwerking?
              Nick hoort graag van je.
            </p>
          </div>
        </section>

        {/* ── Form + Info ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Form */}
              <div className="bg-bb-sage-100/50 rounded-3xl p-8 lg:p-10 shadow-sm">
                <h2 className="font-display text-bb-plum-900 text-2xl font-bold mb-8">
                  Stuur een bericht
                </h2>
                <ContactForm />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-10">
                {/* Nick photo + intro */}
                <div className="flex items-start gap-5">
                  <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src="/nick-waterman.png"
                      alt="Nick Waterman"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display text-bb-plum-900 text-xl font-bold leading-tight">
                      Nick Waterman
                    </div>
                    <div className="font-body text-bb-plum-700 text-sm mt-0.5">
                      Host van Bloedband &amp; Bedrijfsvoering
                    </div>
                    <p className="font-body text-bb-plum-800 text-sm leading-relaxed mt-3">
                      Nick spreekt regelmatig met ondernemers en opvolgers uit
                      familiebedrijven. Heb jij een verhaal dat de moeite waard
                      is om te vertellen?
                    </p>
                  </div>
                </div>

                <hr className="border-bb-plum-800/20" />

                {/* Direct contact options */}
                <div className="flex flex-col gap-5">
                  <h3 className="font-body text-bb-plum-800 text-xs font-semibold tracking-[0.2em] uppercase">
                    Direct contact
                  </h3>

                  {/* Email */}
                  <Link
                    href="mailto:nick@quatrevingtquatre.nl"
                    className="group flex items-center gap-4 bg-white rounded-2xl p-5 hover:shadow-md transition-all border border-bb-purple-100 hover:border-bb-salmon/30"
                  >
                    <div className="w-11 h-11 rounded-xl bg-bb-salmon/10 flex items-center justify-center text-bb-salmon shrink-0 group-hover:bg-bb-salmon group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-body text-bb-plum-900 text-sm font-semibold">
                        E-mail
                      </div>
                      <div className="font-body text-bb-plum-700 text-sm">
                        nick@quatrevingtquatre.nl
                      </div>
                    </div>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 ml-auto text-bb-plum-700/30 group-hover:text-bb-salmon group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>

                  {/* Podcast */}
                  <Link
                    href="https://open.spotify.com/show/7lPmQPXoACeysRV3zIuYn1?si=7cc4de525dd9482a"
                    target="_blank"
                    className="group flex items-center gap-4 bg-white rounded-2xl p-5 hover:shadow-md transition-all border border-bb-purple-100 hover:border-bb-salmon/30"
                  >
                    <div className="w-11 h-11 rounded-xl bg-bb-salmon/10 flex items-center justify-center text-bb-salmon shrink-0 group-hover:bg-bb-salmon group-hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-body text-bb-plum-900 text-sm font-semibold">
                        Luister op Spotify
                      </div>
                      <div className="font-body text-bb-plum-700 text-sm">
                        Bloedband &amp; Bedrijfsvoering
                      </div>
                    </div>
                    <svg viewBox="0 0 24 24" className="w-4 h-4 ml-auto text-bb-plum-700/30 group-hover:text-bb-salmon group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <hr className="border-bb-plum-800/20" />

                {/* Back link */}
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-body text-bb-plum-800 hover:text-bb-plum-900 text-sm font-semibold transition-colors group"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                  </svg>
                  Terug naar de podcast
                </Link>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
