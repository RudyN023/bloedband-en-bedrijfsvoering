import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gasten, getGast, youtubeId } from "../gasten";
import { topEpisodes, platformLinks } from "../afleveringen";
import { NewsletterForm } from "../components/NewsletterForm";
import { SpotifyIcon, AppleIcon } from "../components/PlatformIcons";
import { BewaarKnop, TrackedLink, YouTubeVideo } from "../components/GastActies";

type Props = { params: Promise<{ gast: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return gasten.map((g) => ({ gast: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gast = getGast((await params).gast);
  if (!gast) return {};

  const url = `https://bloedbandenbedrijfsvoering.nl/${gast.slug}`;
  const title = `${gast.naam} (${gast.bedrijf}) | Bloedband & Bedrijfsvoering`;

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
  const titel = gast.titel ?? `${gast.naam} in Bloedband & Bedrijfsvoering`;
  const url = `https://bloedbandenbedrijfsvoering.nl/${gast.slug}`;
  const data = { gast: gast.slug };

  return (
    <div className="min-h-screen bg-bb-plum-900">
      <header className="py-6">
        <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" aria-label="Naar de homepage van Bloedband & Bedrijfsvoering">
            <Image src="/bb-icon.svg" alt="BB" width={40} height={40} className="h-10 w-10" />
          </Link>
          {gast.logo && (
            <Image src={gast.logo.src} alt={gast.logo.alt} width={gast.logo.width} height={gast.logo.height} className="h-8 w-auto" />
          )}
        </div>
      </header>

      <main>
        {/* Aflevering */}
        <section className="pb-20">
          <div className="max-w-2xl mx-auto px-6">
            <p className="font-body text-bb-salmon-light text-sm font-semibold">{gast.welkom}</p>
            <h1 className="font-display text-white font-semibold leading-tight mt-3">
              {gast.titel ?? (
                <>
                  <span className="block text-4xl sm:text-5xl">{gast.naam}</span>
                  <span className="block text-2xl sm:text-3xl italic font-semibold text-bb-salmon-light mt-1">
                    in Bloedband &amp; Bedrijfsvoering
                  </span>
                </>
              )}
            </h1>

            {videoId ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden mt-6 bg-black">
                <YouTubeVideo id={videoId} title={titel} gast={gast.slug} />
              </div>
            ) : (
              <figure className="mt-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden">
                  <Image src={gast.foto.src} alt={gast.foto.alt} fill priority className="object-cover" sizes="(max-width: 672px) 100vw, 672px" />
                </div>
                <figcaption className="font-body text-white/70 text-sm mt-3">De video verschijnt binnenkort.</figcaption>
              </figure>
            )}

            <div className="mt-6">
              <p className="font-body text-white font-semibold mb-3">Liever luisteren?</p>
              <div className="grid grid-cols-2 gap-3">
                <TrackedLink
                  event="Spotify geklikt"
                  data={data}
                  href={gast.links.spotify ?? platformLinks.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-white hover:bg-bb-purple-100 text-bb-plum-900 font-semibold px-2 py-3.5 rounded-lg transition-colors text-sm whitespace-nowrap font-body"
                >
                  <span className="text-[#1DB954]"><SpotifyIcon /></span>
                  Spotify
                </TrackedLink>
                <TrackedLink
                  event="Apple Podcasts geklikt"
                  data={data}
                  href={gast.links.apple ?? platformLinks.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-white hover:bg-bb-purple-100 text-bb-plum-900 font-semibold px-2 py-3.5 rounded-lg transition-colors text-sm whitespace-nowrap font-body"
                >
                  <span className="text-[#9933CC]"><AppleIcon /></span>
                  Apple Podcasts
                </TrackedLink>
              </div>
              <div className="mt-2 flex justify-center">
                <BewaarKnop url={url} titel={titel} gast={gast.slug} />
              </div>
            </div>
          </div>
        </section>

        {/* Over de podcast */}
        <section className="bg-bb-purple-100 pt-20 pb-14" style={{ clipPath: "polygon(0 2.5rem, 100% 0, 100% 100%, 0 100%)" }}>
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-bb-plum-900 text-3xl font-semibold">Over Bloedband &amp; Bedrijfsvoering</h2>
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
            <div className="flex items-center gap-4 mt-6">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                <Image src="/nick-waterman.png" alt="Nick Waterman" fill className="object-cover object-top" sizes="56px" />
              </div>
              <div>
                <p className="font-body text-bb-plum-900 font-semibold">Nick Waterman</p>
                <p className="font-body text-bb-plum-700 text-sm">Host van Bloedband &amp; Bedrijfsvoering</p>
              </div>
            </div>
            {gast.extraFoto && (
              <figure className="mt-8">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image src={gast.extraFoto.src} alt={gast.extraFoto.alt} fill className="object-cover" sizes="(max-width: 672px) 100vw, 672px" />
                </div>
                {gast.extraFoto.bijschrift && (
                  <figcaption className="font-body text-bb-plum-700 text-sm mt-3">{gast.extraFoto.bijschrift}</figcaption>
                )}
              </figure>
            )}
          </div>
        </section>

        {/* Nieuwsbrief */}
        <section className="bg-bb-salmon-light pt-14 pb-20" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 2.5rem), 0 100%)" }}>
          <div className="max-w-2xl mx-auto px-6 text-center">
            <p className="font-body text-bb-plum-800 text-sm font-semibold">Mis de volgende aflevering niet</p>
            <h2 className="font-display text-bb-plum-900 text-3xl font-semibold mt-2">De Donderdag Drie</h2>
            <p className="font-body text-bb-plum-800 leading-relaxed mt-3 mb-6">
              Elke donderdag één dilemma, één inzicht en één vraag over ondernemen in een
              familiebedrijf. Gratis in je inbox.
            </p>
            <NewsletterForm bron={gast.slug} />
          </div>
        </section>

        {/* Meer afleveringen */}
        <section className="pt-12 pb-16">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-white text-3xl font-semibold">Best beluisterde afleveringen</h2>
            <p className="font-body text-white/70 text-sm mt-2">Tik op play om te luisteren op Spotify.</p>
            <div className="flex flex-col divide-y divide-white/10 mt-4">
              {topEpisodes.map((ep) => (
                <div key={ep.rank} className="flex items-center gap-4 py-5">
                  <div className="flex-1">
                    <div className="font-body text-bb-salmon-light text-sm font-medium mb-1">{ep.company}</div>
                    <p className="font-display text-white text-lg font-semibold leading-snug">&ldquo;{ep.title}&rdquo;</p>
                    <p className="font-body text-white/70 text-sm mt-1">
                      {ep.guest}
                      <span aria-hidden="true"> · </span>
                      <TrackedLink
                        event="Aflevering geklikt"
                        data={{ ...data, aflevering: ep.company, app: "Apple Podcasts" }}
                        href={ep.apple}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 hover:text-white whitespace-nowrap py-1"
                      >
                        Apple Podcasts
                      </TrackedLink>
                    </p>
                  </div>
                  <TrackedLink
                    event="Aflevering geklikt"
                    data={{ ...data, aflevering: ep.company, app: "Spotify" }}
                    href={ep.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Luister ${ep.company} op Spotify`}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-bb-salmon hover:bg-white text-white hover:text-bb-plum-900 transition-colors shrink-0"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 ml-0.5" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </TrackedLink>
                </div>
              ))}
            </div>
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
