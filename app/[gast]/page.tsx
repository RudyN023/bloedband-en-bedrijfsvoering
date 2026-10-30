import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { gasten, getGast } from "../gasten";
import { topEpisodes, platformLinks } from "../afleveringen";
import { NewsletterForm } from "../components/NewsletterForm";
import { SpotifyIcon, AppleIcon, YouTubeIcon } from "../components/PlatformIcons";

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

  const platforms = [
    { label: "Spotify", href: gast.links.spotify, icon: <SpotifyIcon />, className: "bg-[#1DB954] hover:bg-[#1ed760]" },
    { label: "Apple Podcasts", href: gast.links.apple, icon: <AppleIcon />, className: "bg-[#9933CC] hover:bg-[#aa44dd]" },
    { label: "YouTube", href: gast.links.youtube, icon: <YouTubeIcon />, className: "bg-[#FF0000] hover:bg-[#cc0000]" },
  ].filter((p): p is typeof p & { href: string } => Boolean(p.href));

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
              {gast.titel ?? `${gast.naam} in gesprek met Nick Waterman`}
            </h1>
            <p className="font-body text-white/70 mt-3">{gast.bedrijf}</p>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mt-8">
              <Image src={gast.foto.src} alt={gast.foto.alt} fill priority className="object-cover" sizes="(max-width: 672px) 100vw, 672px" />
            </div>

            {platforms.length > 0 ? (
              <div className="mt-8">
                <p className="font-body text-white text-lg font-semibold mb-4">Luister de aflevering</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {platforms.map((p) => (
                    <Link
                      key={p.label}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-3 text-white font-semibold px-6 py-4 rounded-full transition-colors text-base font-body ${p.className}`}
                    >
                      {p.icon}
                      {p.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl bg-white/10 p-6">
                <p className="font-body text-white font-semibold">Deze aflevering verschijnt binnenkort.</p>
                <p className="font-body text-white/70 text-sm mt-2 leading-relaxed">
                  Meld je hieronder aan voor De Donderdag Drie, dan hoor je het als hij online staat.
                </p>
              </div>
            )}

            {gast.citaat && (
              <blockquote className="font-display text-white text-2xl italic leading-snug mt-12 border-l-4 border-bb-salmon pl-6">
                &ldquo;{gast.citaat}&rdquo;
                <footer className="font-body not-italic text-white/60 text-sm mt-3">{gast.naam}</footer>
              </blockquote>
            )}

            <p className="font-body text-white/80 leading-relaxed mt-10">{gast.beschrijving}</p>
          </div>
        </section>

        {/* Over de podcast */}
        <section className="bg-bb-purple-100 py-16">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-display text-bb-plum-900 text-3xl font-bold">Over Bloedband &amp; Bedrijfsvoering</h2>
            <p className="font-body text-bb-plum-800 leading-relaxed mt-4">
              In deze podcast spreekt Nick Waterman met ondernemers en opvolgers uit Nederlandse
              familiebedrijven. Over opvolging, eigenaarschap en de spanning tussen bloedband en
              bedrijfsvoering.
            </p>
            {gast.extraFoto && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mt-8">
                <Image src={gast.extraFoto.src} alt={gast.extraFoto.alt} fill className="object-cover" sizes="(max-width: 672px) 100vw, 672px" />
              </div>
            )}
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href={platformLinks.spotify} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-bb-plum-900 hover:bg-bb-plum-800 text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors font-body">
                <SpotifyIcon />
                Volg op Spotify
              </Link>
              <Link href={platformLinks.apple} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-bb-plum-700 text-bb-plum-900 hover:bg-bb-plum-900 hover:text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors font-body">
                <AppleIcon />
                Apple Podcasts
              </Link>
              <Link href={platformLinks.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-bb-plum-700 text-bb-plum-900 hover:bg-bb-plum-900 hover:text-white text-sm font-semibold px-5 py-3 rounded-full transition-colors font-body">
                <YouTubeIcon />
                YouTube
              </Link>
            </div>
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
