"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

export function NewsletterForm({ bron }: { bron?: string } = {}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Er ging iets mis");
      }

      if (bron) track("Nieuwsbrief aanmelding", { bron });
      setStatus("success");
      setMessage("Je bent aangemeld!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Er ging iets mis");
    }
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="jouw@emailadres.nl"
        disabled={status === "loading"}
        className="flex-1 bg-white border border-bb-plum-900/15 placeholder:text-bb-plum-700/70 text-bb-plum-900 rounded-lg px-6 py-4 text-base focus:outline-none focus:border-bb-plum-900 font-body disabled:opacity-50"
      />
      {status === "success" ? (
        <p className="text-bb-plum-900 font-semibold px-8 py-4 text-sm font-body self-center">
          {message}
        </p>
      ) : (
        <>
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-bb-plum-900 hover:bg-bb-plum-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-sm whitespace-nowrap font-body disabled:opacity-50"
          >
            {status === "loading" ? "Even geduld..." : "Aanmelden"}
          </button>
          {status === "error" && (
            <p className="text-red-800 text-sm self-center font-body">{message}</p>
          )}
        </>
      )}
    </form>
  );
}
