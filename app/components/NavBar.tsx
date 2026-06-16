"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

const navLinks = ["Afleveringen", "Over de podcast"];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bb-plum-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/bb-icon.svg"
            alt="BB icon"
            width={44}
            height={44}
            className="h-11 w-11"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="font-body text-white/70 hover:text-white text-sm tracking-wider uppercase transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* CTA */}
          <Link
            href="https://open.spotify.com/show/7lPmQPXoACeysRV3zIuYn1?si=7cc4de525dd9482a"
            target="_blank"
            className="flex items-center gap-2 bg-bb-salmon hover:bg-bb-salmon-light text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <SpotifyIcon />
            <span className="hidden sm:inline font-body">Luister nu</span>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bb-plum-900 border-t border-white/10 px-6 py-5 flex flex-col gap-1">
          {navLinks.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setOpen(false)}
              className="font-body text-white/70 hover:text-white text-sm tracking-wider uppercase transition-colors py-3 border-b border-white/10 last:border-0"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
