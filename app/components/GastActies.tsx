"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { track } from "@vercel/analytics";

type TrackedLinkProps = React.ComponentProps<typeof Link> & {
  event: string;
  data?: Record<string, string>;
};

export function TrackedLink({ event, data, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, data);
        onClick?.(e);
      }}
    />
  );
}

export function YouTubeVideo({ id, title, gast }: { id: string; title: string; gast: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        track("Video afgespeeld", { gast });
        setPlaying(true);
      }}
      className="group absolute inset-0 h-full w-full"
      aria-label={`Speel de video af: ${title}`}
    >
      <Image
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="(max-width: 672px) 100vw, 672px"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
        <span className="flex items-center justify-center w-20 h-20 rounded-full bg-bb-salmon group-hover:scale-105 transition-transform shadow-xl">
          <svg viewBox="0 0 24 24" className="w-9 h-9 ml-1 text-white" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

export function BewaarKnop({ url, titel, gast }: { url: string; titel: string; gast: string }) {
  const [gekopieerd, setGekopieerd] = useState(false);

  async function bewaar() {
    track("Bewaard voor later", { gast });
    try {
      if (navigator.share) {
        await navigator.share({ title: titel, text: `Luister later: ${titel}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setGekopieerd(true);
      setTimeout(() => setGekopieerd(false), 2500);
    } catch {
      // Delen geannuleerd of niet toegestaan
    }
  }

  return (
    <button
      type="button"
      onClick={bewaar}
      className="flex w-full items-center justify-center gap-3 border border-white/30 hover:border-white text-white font-semibold px-6 py-4 rounded-full transition-colors text-base font-body"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {gekopieerd ? "Link gekopieerd" : "Bewaar voor later"}
    </button>
  );
}
