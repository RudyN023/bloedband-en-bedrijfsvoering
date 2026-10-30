import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gasten, getGast, youtubeId } from "../gasten";
import { topEpisodes, platformLinks } from "../afleveringen";
import { NewsletterForm } from "../components/NewsletterForm";
import { SpotifyIcon, AppleIcon } from "../components/PlatformIcons";

type Props = { params: Promise<{ gast: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return gasten.map((g) => ({ gast: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gast = getGast((await params).gast);
  if (!gast) return {};

  const url = `https://bloedbandenbedrijfsvoering.nl/${gast.slug}`;
  const title = `${gast.naam} (${gast.bedrijf}) — Bloedband & Bedrijfsvoering`;

  return {
    title,
    description: gast.beschrijving,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: gast.beschrijving,
      type: "website",
      url,
      siteName: "Bloedband & Bedrijfsvoering",
      images: [gast.foto.src],
    },
  };
}

export default async function GastPage({ params }: Props) {
  const gast = getGast((await params).gast);
  if (!gast) notFound();

  const videoId = youtubeId(gast.links.youtube);

  return (
    <div className="min-h-screen bg-bb-plum-900">
      <header className="py-6">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" aria-label="Naar de homepage van Bloedband & Bedrijfsvoering">
            <Image src="/bb-icon.svg" alt="BB" width={40} height={40} className="h-10 w-10" />
          </Link>
          <Link href="/" className="font-body text-white/70 hover:text-white text-sm transition-colors">
            Over de podcast
          </Link>
        </div>
      </header>

      <main>
        {/* Aflevering */}
        <section className="pb-16">
          <div className="max-w-2xl mx-auto px-6">
            <p className="font-body text-bb-salmon text-sm font-semibold">{gast.welkom}</p>
            <h1 className="font-display text-white text-4xl sm:text-5xl font-bold leading-tight mt-4">
              {gast.titel ?? `${gast.naam} in Bloedband & Bedrijfsvoering`}
            </h1>

            {videoId ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden mt-8 bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                  title={`${gast.naam} in Bloedband & Bedrijfsvoering`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ) : (
              <div className="relative aspect-video rounded-2xl overflow-hidden mt-8">
                <Image src={gast.foto.src} alt={gast.foto.alt} fill priority className="object-cover" sizes="(max-width: 672px) 100vw, 672px" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bb-plum-900/90 to-transparent p-5 pt-12">
                  <p className="font-body text-white font-semibold">De video verschijnt binnenkort.</p>
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className="font-body text-white text-lg font-semibold mb-4">Liever luisteren?</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={gast.links.spotify ?? platformLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold px-6 py-4 rounded-full transition-colors text-base font-body"
                >
                  <SpotifyIcon />
                  Spotify
                </Link>
                <Link
                  href={gast.links.apple ?? platformLinks.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-3 bg-[#9933CC] hover:bg-[#aa44dd] text-white font-semibold px-6 py-4 rounded-full transition-colors text-base font-body"
                >
                  <AppleIcon />
                  Apple Podcasts
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Over de podcast */}
        <section className="bg-bb-purple-100 py-16">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-bb-plum-900 text-3xl font-bold">Over Bloedband &amp; Bedrijfsvoering</h2>
            <p className="font-body text-bb-plum-800 leading-relaxed mt-4">
              Familiebedrijven zijn de ruggengraat van de Nederlandse economie en goed voor één op
              de drie banen. In deze podcast spreekt Nick Waterman met ondernemers en opvolgers uit
              die bedrijven.
            </p>
            <p className="font-body text-bb-plum-800 leading-relaxed mt-4">
              Over opvolging, eigenaarschap en wat er gebeurt als familie en zaken door elkaar
              lopen. Eerlijke verhalen van achter de schermen, voor iedereen die met een
              familiebedrijf te maken heeft.
            </p>
            {gast.extraFoto && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mt-8">
                <Image src={gast.extraFoto.src} alt={gast.extraFoto.alt} fill className="object-cover" sizes="(max-width: 672px) 100vw, 672px" />
              </div>
            )}
          </div>
        </section>

        {/* Meer afleveringen */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-white text-3xl font-bold">Best beluisterde afleveringen</h2>
            <div className="flex flex-col divide-y divide-white/10 mt-6">
              {topEpisodes.map((ep) => (
                <Link key={ep.rank} href={ep.href} target="_blank" rel="noopener noreferrer" className="group py-5">
                  <div className="font-body text-bb-salmon text-xs font-semibold tracking-wider uppercase mb-1">{ep.company}</div>
                  <p className="font-display text-white text-lg font-bold leading-snug group-hover:text-bb-salmon transition-colors">
                    &ldquo;{ep.title}&rdquo;
                  </p>
                  <p className="font-body text-white/60 text-sm mt-1">{ep.guest}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Nieuwsbrief */}
        <section className="bg-bb-salmon py-16">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display text-white text-3xl font-bold">De Donderdag Drie</h2>
            <p className="font-body text-white leading-relaxed mt-4 mb-8">
              Elke donderdag één dilemma, één inzicht en één vraag over ondernemen in een
              familiebedrijf. Gratis in je inbox.
            </p>
            <NewsletterForm />
          </div>
        </section>
      </main>

      <footer className="py-8">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Link href="/" className="font-body text-white/70 hover:text-white text-sm transition-colors">
            Naar bloedbandenbedrijfsvoering.nl
          </Link>
        </div>
      </footer>
    </div>
  );
}
