import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "./components/NewsletterForm";
import { NavBar } from "./components/NavBar";
import { AnimateIn } from "./components/AnimateIn";
import { StatCounter } from "./components/StatCounter";

// ─── Data ───────────────────────────────────────────────────────────────────

const episodes = [
  {
    title: "Ik heb de eerste dertig dagen gewoon mijn mond gehouden.",
    company: "Royal NNZ",
    image: "https://img.youtube.com/vi/B8nKuQBcnog/maxresdefault.jpg",
    description:
      "Over de kunst van luisteren als je een familiebedrijf binnenstapt. Wat zie je als buitenstaander, en wanneer spreek je je uit?",
    href: "https://youtu.be/B8nKuQBcnog",
  },
  {
    title: "De familie is ons heilig.",
    company: "Koninklijke Saan",
    image: "https://img.youtube.com/vi/LFJlQRdGPrU/maxresdefault.jpg",
    description:
      "Bij Koninklijke Saan staat de familie centraal in alles. Maar wat betekent dat concreet als je harde zakelijke beslissingen moet nemen?",
    href: "https://youtu.be/LFJlQRdGPrU",
  },
  {
    title: "Alles wat we doen moet geld opleveren voor de kapper.",
    company: "Keune Haircosmetics",
    image: "https://img.youtube.com/vi/47HcY-HM-KQ/maxresdefault.jpg",
    description:
      "Hoe bouw je een merk dat volledig om de vakman draait? Keune over focus, familiaire waarden en waarom de kapper altijd centraal staat.",
    href: "https://youtu.be/47HcY-HM-KQ",
  },
];

const themes = [
  {
    title: "Opvolging",
    description:
      "De lastige vraag: wie neemt het stokje over, en hoe ga je daarmee om?",
    icon: "succession",
  },
  {
    title: "Eigenaarschap",
    description:
      "Wie bezit het bedrijf, wat betekent dat juridisch én emotioneel?",
    icon: "ownership",
  },
  {
    title: "Familiedynamiek",
    description:
      "Hoe verhoud je het zakelijke en het persoonlijke als beide door elkaar lopen?",
    icon: "family",
  },
  {
    title: "Professionalisering",
    description: "Wanneer haal je extern talent in huis, en hoe doe je dat?",
    icon: "professionalization",
  },
  {
    title: "Generatieverandering",
    description:
      "Vernieuwen zonder het werk van eerdere generaties af te wijzen.",
    icon: "generation",
  },
  {
    title: "Continuïteit",
    description:
      "Hoe bouw je een bedrijf dat ook de volgende generatie nog kan dragen?",
    icon: "continuity",
  },
];


const topEpisodes = [
  {
    rank: "01",
    company: "Damen Shipyards",
    title: "Je moet niet heel oud worden en proberen nog de dagelijkse baas voor zo'n bedrijf te zijn.",
    guest: "Kommer en Arnout Damen",
    href: "https://open.spotify.com/episode/2Vp75oerce0Ey84UwIFEud?si=cc25d74e4c8a4c85",
  },
  {
    rank: "02",
    company: "Kesbeke",
    title: "Als je werk niet leuk is, ben je potentieel hartpatiënt.",
    guest: "Oos Kesbeke",
    href: "https://open.spotify.com/episode/0gMTFf2RtP3bRW1IBGIZXs?si=669d8b9753474d5c",
  },
  {
    rank: "03",
    company: "Vebego",
    title: "De familiewaarden van mijn opa zijn nog steeds zichtbaar.",
    guest: "Ton Goedmakers",
    href: "https://open.spotify.com/episode/7of4JYaT7vRxRcHWnKT2zt?si=a31294241db640ee",
  },
  {
    rank: "04",
    company: "Bosch Beton",
    title: "In zijn beleving was het eigenlijk logisch dat mijn jongere broertje directeur zou worden.",
    guest: "Brechtje van den Beuken",
    href: "https://open.spotify.com/episode/1D4c5smie2ijD11exySkMi?si=4856526e86af44d8",
  },
  {
    rank: "05",
    company: "Royal Swinkels",
    title: "De reden waarom wij zo oud zijn geworden komt doordat we ons constant hebben weten te vernieuwen.",
    guest: "Peer Swinkels",
    href: "https://open.spotify.com/episode/4W9NCYaTECexjkpBDW2Ynp?si=ae2fed8f52bc4ba3",
  },
];

const stats = [
  { value: "45+", label: "Afleveringen" },
  { value: "30+", label: "Familiebedrijven" },
  { value: "6", label: "Thematische reeksen" },
];

// ─── Icon Components ─────────────────────────────────────────────────────────

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ThemeIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    succession: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M17 3h4v4M21 3l-9 9M7 21H3v-4M3 21l9-9" />
        <path d="M14 7l3-4 3 4M17 3v8M7 17l-4 3 4 3M3 20h8" />
      </svg>
    ),
    ownership: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    family: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="9" cy="7" r="2.5" />
        <circle cx="15" cy="7" r="2.5" />
        <path d="M2 21v-1a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7v1" />
        <path d="M12 13v8" />
      </svg>
    ),
    professionalization: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M12 12v5M9.5 14.5h5" />
      </svg>
    ),
    generation: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
    continuity: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
        <path d="M8 12h8M12 8v8" />
        <path d="M6.34 6.34l11.32 11.32M17.66 6.34 6.34 17.66" opacity="0" />
        <path d="M7 7l10 10" opacity="0.3" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}

// ─── Page ────────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  name: "Bloedband & Bedrijfsvoering",
  description:
    "Dé podcast over familiebedrijven in Nederland. Nick Waterman spreekt met ondernemers en opvolgers over opvolging, eigenaarschap en de spanning tussen bloedband en bedrijfsvoering.",
  url: "https://bloedband-en-bedrijfsvoering.vercel.app",
  inLanguage: "nl",
  author: {
    "@type": "Person",
    name: "Nick Waterman",
  },
  publisher: {
    "@type": "Organization",
    name: "Bloedband & Bedrijfsvoering",
  },
  potentialAction: [
    {
      "@type": "ListenAction",
      target: "https://open.spotify.com/show/7lPmQPXoACeysRV3zIuYn1",
      name: "Luister op Spotify",
    },
    {
      "@type": "ListenAction",
      target:
        "https://podcasts.apple.com/nl/podcast/bloedband-bedrijfsvoering/id1715013376",
      name: "Luister op Apple Podcasts",
    },
    {
      "@type": "WatchAction",
      target: "https://www.youtube.com/@Bloedbandenbedrijfsvoering",
      name: "Bekijk op YouTube",
    },
  ],
};

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Nav ── */}
      <NavBar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-bb-plum-900 flex items-center pt-20">
        {/* Salmon accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-bb-salmon z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-12 py-24 lg:py-0 lg:min-h-screen lg:items-center">
          {/* Text side */}
          <div className="flex flex-col justify-center lg:pr-16">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-bb-salmon" />
              <span className="font-body text-bb-salmon text-xs font-semibold tracking-[0.2em] uppercase">
                Dé podcast over familiebedrijven
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display font-bold leading-[1.05]">
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                Van keukentafel
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-bb-salmon">
                naar
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white">
                boardroom
              </span>
            </h1>

            {/* Description */}
            <p className="font-body text-white/70 text-base lg:text-lg leading-relaxed mt-8 max-w-lg">
              Dé Nederlandse podcast over familiebedrijven. Nick Waterman
              spreekt met ondernemers en opvolgers over opvolging,
              eigenaarschap en de spanning tussen bloedband en
              bedrijfsvoering. Luister op Spotify, Apple Podcasts en YouTube.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="https://open.spotify.com/show/7lPmQPXoACeysRV3zIuYn1?si=7cc4de525dd9482a"
                target="_blank"
                className="flex items-center gap-2.5 bg-bb-salmon hover:bg-bb-salmon-light text-white font-semibold px-7 py-4 rounded-full transition-colors text-sm font-body"
              >
                <SpotifyIcon />
                Luister op Spotify
              </Link>
              <Link
                href="#afleveringen"
                className="flex items-center gap-2.5 border border-white/30 hover:border-white text-white font-semibold px-7 py-4 rounded-full transition-colors text-sm font-body"
              >
                Bekijk afleveringen
              </Link>
            </div>

            {/* Also on */}
            <div className="flex items-center gap-5 mt-10 pt-8 border-t border-white/10">
              <span className="font-body text-white/40 text-xs uppercase tracking-widest shrink-0">
                Ook op
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href="https://podcasts.apple.com/nl/podcast/bloedband-bedrijfsvoering/id1715013376"
                  target="_blank"
                  className="flex items-center gap-2 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-semibold transition-all font-body"
                  aria-label="Apple Podcasts"
                >
                  <AppleIcon />
                  Apple Podcasts
                </Link>
                <Link
                  href="https://www.youtube.com/@Bloedbandenbedrijfsvoering"
                  target="_blank"
                  className="flex items-center gap-2 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs font-semibold transition-all font-body"
                  aria-label="YouTube"
                >
                  <YouTubeIcon />
                  YouTube
                </Link>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="relative hidden lg:block h-screen">
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-bb-plum-900 via-bb-plum-900/30 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-bb-plum-900/70 via-transparent to-bb-plum-900/30 z-10 pointer-events-none" />

            <Image
              src="/oos-en-nick.jpg"
              alt="Oos Kesbeke en Nick Waterman"
              fill
              className="object-cover"
              priority
            />

            {/* Floating card */}
            <div className="absolute bottom-24 right-8 z-20 bg-bb-teal-900/90 backdrop-blur-sm border border-bb-teal-700/40 rounded-2xl p-6 max-w-[180px]">
              <div className="font-display text-5xl font-bold text-white leading-none">
                45<span className="text-bb-salmon">+</span>
              </div>
              <div className="font-body text-white/60 text-xs mt-2 leading-relaxed">
                Afleveringen beschikbaar
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── Stats bar ── */}
      <section className="bg-bb-salmon relative z-10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)", paddingBottom: "4rem" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-3">
          {stats.map((stat, i) => (
            <div key={stat.label} className={`px-2 sm:px-6 lg:px-8 ${i > 0 ? "border-l border-white/25" : ""}`}>
              <StatCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Episodes ── */}
      <section id="afleveringen" className="bg-bb-teal-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <AnimateIn>
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-bb-salmon" />
                <span className="font-body text-bb-salmon text-xs font-semibold tracking-[0.2em] uppercase">
                  Recente afleveringen
                </span>
              </div>
              <h2 className="font-display text-white text-4xl lg:text-5xl font-bold">
                Nieuwste gesprekken
              </h2>
            </div>
            <Link
              href="https://www.youtube.com/@Bloedbandenbedrijfsvoering"
              target="_blank"
              className="hidden md:flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors group font-body"
            >
              Alle afleveringen
              <span className="group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </Link>
          </div>
          </AnimateIn>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode, i) => (
              <AnimateIn key={episode.title} delay={i * 100}>
              <Link
                href={episode.href}
                target="_blank"
                className="group bg-bb-teal-800 rounded-2xl overflow-hidden hover:bg-bb-teal-700 transition-colors block h-full"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-bb-plum-900/40 z-10 group-hover:bg-bb-plum-900/10 transition-colors" />
                  <Image
                    src={episode.image}
                    alt={episode.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-bb-salmon/90 flex items-center justify-center">
                      <span className="text-white text-lg ml-1">▶</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="font-body text-bb-salmon text-xs font-semibold tracking-wider uppercase mb-3">
                    {episode.company}
                  </div>
                  <h3 className="font-display text-white text-xl font-bold leading-snug mb-3 group-hover:text-bb-salmon transition-colors">
                    {episode.title}
                  </h3>
                  <p className="font-body text-white/80 text-sm leading-relaxed">
                    {episode.description}
                  </p>
                  <div className="flex items-center gap-2 mt-5 text-bb-salmon text-xs font-semibold font-body">
                    <YouTubeIcon />
                    Bekijk op YouTube
                  </div>
                </div>
              </Link>
              </AnimateIn>
            ))}
          </div>

          {/* Mobile link */}
          <div className="mt-10 text-center md:hidden">
            <Link
              href="https://www.youtube.com/@Bloedbandenbedrijfsvoering"
              target="_blank"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold hover:border-white transition-colors font-body"
            >
              Alle afleveringen →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Top Episodes ── */}
      <section className="bg-bb-plum-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateIn>
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="font-display text-white text-4xl lg:text-5xl font-bold">
                Best beluisterde afleveringen
              </h2>
            </div>
            <Link
              href="https://open.spotify.com/show/7lPmQPXoACeysRV3zIuYn1?si=7cc4de525dd9482a"
              target="_blank"
              className="hidden md:flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors group font-body"
            >
              Alle afleveringen
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
          </AnimateIn>

          <div className="flex flex-col divide-y divide-white/10">
            {topEpisodes.map((ep, i) => (
              <AnimateIn key={ep.rank} delay={i * 80}>
              <Link
                href={ep.href}
                target="_blank"
                className="group flex items-center gap-4 lg:gap-10 py-5 hover:bg-white/5 rounded-xl transition-colors"
              >
                <span className="font-display text-2xl lg:text-4xl text-white/15 group-hover:text-bb-salmon transition-colors tabular-nums shrink-0 w-8 lg:w-12 text-right">
                  {ep.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-body text-bb-salmon text-xs font-semibold tracking-wider uppercase mb-1">
                    {ep.company}
                  </div>
                  <p className="font-display text-white text-base lg:text-xl font-bold leading-snug group-hover:text-bb-salmon transition-colors">
                    &ldquo;{ep.title}&rdquo;
                  </p>
                  <p className="font-body text-white/40 text-xs lg:text-sm mt-1">{ep.guest}</p>
                </div>
                <div className="shrink-0 text-white/20 group-hover:text-bb-salmon transition-all group-hover:translate-x-1">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="over-de-podcast" className="bg-bb-purple-100 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[3/2] sm:aspect-[4/3] lg:aspect-[4/5] shadow-2xl">
                <Image
                  src="/nick-waterman.png"
                  alt="Nick Waterman, presentator van Bloedband & Bedrijfsvoering"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bb-plum-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="font-display text-white text-xl font-bold">
                    Nick Waterman
                  </div>
                  <div className="font-body text-white/70 text-sm mt-0.5">
                    Host van Bloedband &amp; Bedrijfsvoering
                  </div>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-bb-salmon opacity-20 pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-bb-teal-700 opacity-15 pointer-events-none" />
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-bb-plum-800" />
                <span className="font-body text-bb-plum-800 text-xs font-semibold tracking-[0.2em] uppercase">
                  Over de podcast
                </span>
              </div>

              <blockquote className="font-display text-bb-plum-900 text-2xl lg:text-3xl font-semibold italic leading-snug mb-8 border-l-4 border-bb-salmon pl-6">
                &ldquo;Een besluit over een directiefunctie raakt niet alleen
                collega&rsquo;s, maar ook ouders, kinderen, broers en
                zussen.&rdquo;
              </blockquote>

              <p className="font-body text-bb-plum-800 leading-relaxed mb-5 text-[15px]">
                In de podcast{" "}
                <strong className="font-semibold">
                  Bloedband &amp; Bedrijfsvoering
                </strong>{" "}
                duiken we in de wereld van succesvolle familiebedrijven.
              </p>

              <p className="font-body text-bb-plum-800 leading-relaxed mb-5 text-[15px]">
                Familiebedrijven vormen de ruggengraat van de Nederlandse
                economie. Ze zorgen voor economische stabiliteit en zijn goed
                voor één op de drie banen in Nederland. Daarmee zijn ze van
                grote waarde, zowel landelijk als in hun eigen regio.
              </p>

              <p className="font-body text-bb-plum-800 leading-relaxed mb-8 text-[15px]">
                Met deze serie geven we een inkijkje in het reilen en zeilen
                van deze unieke ondernemingen. We laten zien wat er speelt
                achter de schermen, welke uitdagingen er zijn en hoe
                familiebanden en bedrijfsvoering elkaar beïnvloeden.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="https://open.spotify.com/show/7lPmQPXoACeysRV3zIuYn1?si=7cc4de525dd9482a"
                  target="_blank"
                  className="flex items-center gap-2 bg-bb-plum-900 hover:bg-bb-plum-800 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors font-body"
                >
                  <SpotifyIcon />
                  Luister op Spotify
                </Link>
                <Link
                  href="#afleveringen"
                  className="flex items-center gap-2 border border-bb-plum-700 text-bb-plum-900 hover:bg-bb-plum-900 hover:text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors font-body"
                >
                  Bekijk afleveringen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Themes ── */}
      <section className="bg-bb-sage-100 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-bb-plum-800" />
              <span className="font-body text-bb-plum-900 text-xs font-semibold tracking-[0.2em] uppercase">
                Onderwerpen
              </span>
              <div className="h-px w-12 bg-bb-plum-800" />
            </div>
            <h2 className="font-display text-bb-plum-900 text-4xl lg:text-5xl font-bold">
              Waar gaat het over?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {themes.map((theme, i) => (
              <AnimateIn key={theme.title} delay={i * 80}>
              <div
                className="bg-white rounded-2xl p-8 border-t-4 border-bb-salmon shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-bb-salmon/10 text-bb-salmon mb-6">
                  <ThemeIcon name={theme.icon} />
                </div>
                <h3 className="font-display text-bb-plum-900 text-2xl font-bold mb-3 group-hover:text-bb-teal-800 transition-colors">
                  {theme.title}
                </h3>
                <p className="font-body text-bb-plum-700 leading-relaxed text-sm">
                  {theme.description}
                </p>
              </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className="bg-bb-plum-900 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-bb-salmon" />
            <span className="font-body text-bb-salmon text-xs font-semibold tracking-[0.2em] uppercase">
              Gratis beschikbaar
            </span>
            <div className="h-px w-12 bg-bb-salmon" />
          </div>
          <h2 className="font-display text-white text-4xl lg:text-5xl font-bold mb-4">
            Luister waar jij wilt
          </h2>
          <p className="font-body text-white/60 mb-14 max-w-lg mx-auto">
            Bloedband &amp; Bedrijfsvoering is gratis beschikbaar op alle grote
            podcastplatforms.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://open.spotify.com/show/7lPmQPXoACeysRV3zIuYn1?si=7cc4de525dd9482a"
              target="_blank"
              className="flex items-center justify-center gap-3 bg-[#1DB954] hover:bg-[#1ed760] text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm font-body"
            >
              <SpotifyIcon />
              Spotify
            </Link>
            <Link
              href="https://podcasts.apple.com/nl/podcast/bloedband-bedrijfsvoering/id1715013376"
              target="_blank"
              className="flex items-center justify-center gap-3 bg-[#9933CC] hover:bg-[#aa44dd] text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm font-body"
            >
              <AppleIcon />
              Apple Podcasts
            </Link>
            <Link
              href="https://www.youtube.com/@Bloedbandenbedrijfsvoering"
              target="_blank"
              className="flex items-center justify-center gap-3 bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm font-body"
            >
              <YouTubeIcon />
              YouTube
            </Link>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-bb-salmon py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-white text-4xl lg:text-5xl font-bold mb-4">
            Blijf op de hoogte
          </h2>
          <p className="font-body text-white mb-10 text-lg leading-relaxed">
            Ontvang een melding bij elke nieuwe aflevering, plus exclusieve
            achtergrondverhalen over de familiebedrijven in de podcast.
          </p>

          <NewsletterForm />

          <p className="font-body text-white/80 text-xs mt-5">
            Geen spam. Uitschrijven kan altijd. Wij respecteren jouw privacy.
          </p>
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="bg-bb-plum-900 py-16 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <p className="font-body text-white/50 text-xs font-semibold tracking-[0.2em] uppercase mb-10">
            Deze podcast wordt mede mogelijk gemaakt door
          </p>
          <div className="flex flex-wrap items-center justify-center gap-14 lg:gap-20">
            <Link href="https://www.quatrevingtquatre.nl/" target="_blank" className="relative h-10 w-40 opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src="/logo-qvq.webp"
                alt="Quatre Vingt Quatre"
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>
            <Link href="https://www.studiopodcast.nl/" target="_blank" className="relative h-10 w-52 opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src="/logo-studiopodcast.png"
                alt="Studio Podcast"
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>
            <Link href="https://fbned.nl/nl" target="_blank" className="relative h-14 w-36 opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src="/logo-fbned.png"
                alt="FBNed — FamilieBedrijven Nederland"
                fill
                className="object-contain brightness-0 invert"
              />
            </Link>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="font-body text-white/40 hover:text-white/80 text-sm transition-colors"
            >
              Partner worden?
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-bb-plum-900 border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/bb-icon.svg"
                  alt="BB"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </div>
              <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs">
                De podcast over het bijzondere leven en werk van
                familiebedrijven in Nederland.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-body text-white text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                Navigatie
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Afleveringen", href: "#afleveringen" },
                  { label: "Over de podcast", href: "#over-de-podcast" },
                  { label: "Gasten & bedrijven", href: "#gasten" },
                  { label: "Contact", href: "mailto:nick@quatrevingtquatre.nl" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-body text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Listen */}
            <div>
              <h4 className="font-body text-white text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                Luister op
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Spotify", href: "https://open.spotify.com/show/7lPmQPXoACeysRV3zIuYn1?si=7cc4de525dd9482a" },
                  { label: "Apple Podcasts", href: "https://podcasts.apple.com/nl/podcast/bloedband-bedrijfsvoering/id1715013376" },
                  { label: "YouTube", href: "https://www.youtube.com/@Bloedbandenbedrijfsvoering" },
                ].map((p) => (
                  <li key={p.label}>
                    <Link
                      href={p.href}
                      target="_blank"
                      className="font-body text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/30 text-xs">
              © 2025 Bloedband &amp; Bedrijfsvoering. Alle rechten
              voorbehouden.
            </p>
            <div className="flex items-center gap-6">
              {["Privacybeleid", "Cookiebeleid"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="font-body text-white/30 hover:text-white/60 text-xs transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
