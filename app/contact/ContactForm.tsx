"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const naam = data.get("naam") as string;
    const organisatie = data.get("organisatie") as string;
    const email = data.get("email") as string;
    const bericht = data.get("bericht") as string;

    const subject = encodeURIComponent(`Bericht van ${naam}${organisatie ? ` — ${organisatie}` : ""}`);
    const body = encodeURIComponent(
      `Naam: ${naam}\nOrganisatie: ${organisatie || "—"}\nE-mail: ${email}\n\n${bericht}`
    );

    setStatus("sending");
    setTimeout(() => {
      window.location.href = `mailto:nick@quatrevingtquatre.nl?subject=${subject}&body=${body}`;
      setStatus("sent");
    }, 400);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-body text-bb-plum-800 text-xs font-semibold tracking-wider uppercase">
            Naam <span className="text-bb-salmon">*</span>
          </label>
          <input
            name="naam"
            required
            type="text"
            placeholder="Jan de Vries"
            className="font-body bg-white border border-bb-purple-100 rounded-xl px-5 py-3.5 text-bb-plum-900 placeholder:text-bb-plum-700/40 focus:outline-none focus:border-bb-salmon transition-colors text-sm"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-body text-bb-plum-800 text-xs font-semibold tracking-wider uppercase">
            Organisatie
          </label>
          <input
            name="organisatie"
            type="text"
            placeholder="Familiebedrijf BV"
            className="font-body bg-white border border-bb-purple-100 rounded-xl px-5 py-3.5 text-bb-plum-900 placeholder:text-bb-plum-700/40 focus:outline-none focus:border-bb-salmon transition-colors text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-body text-bb-plum-800 text-xs font-semibold tracking-wider uppercase">
          E-mailadres <span className="text-bb-salmon">*</span>
        </label>
        <input
          name="email"
          required
          type="email"
          placeholder="jij@bedrijf.nl"
          className="font-body bg-white border border-bb-purple-100 rounded-xl px-5 py-3.5 text-bb-plum-900 placeholder:text-bb-plum-700/40 focus:outline-none focus:border-bb-salmon transition-colors text-sm"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-body text-bb-plum-800 text-xs font-semibold tracking-wider uppercase">
          Bericht <span className="text-bb-salmon">*</span>
        </label>
        <textarea
          name="bericht"
          required
          rows={5}
          placeholder="Vertel kort wie je bent en waar je contact over wilt opnemen…"
          className="font-body bg-white border border-bb-purple-100 rounded-xl px-5 py-3.5 text-bb-plum-900 placeholder:text-bb-plum-700/40 focus:outline-none focus:border-bb-salmon transition-colors text-sm resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "sent"}
        className="self-start flex items-center gap-2 bg-bb-plum-900 hover:bg-bb-plum-800 disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm font-body"
      >
        {status === "sending" ? "Openen…" : status === "sent" ? "Geopend ✓" : "Verstuur bericht"}
        {status === "idle" && (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </button>

      <p className="font-body text-bb-plum-700/60 text-xs">
        Gratis en vrijblijvend · We reageren doorgaans binnen één werkdag.
      </p>
    </form>
  );
}
