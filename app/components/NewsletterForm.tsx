"use client";

import { useState } from "react";

export function NewsletterForm() {
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
        className="flex-1 bg-white/20 border border-white/30 placeholder:text-white/50 text-white rounded-full px-6 py-4 text-sm focus:outline-none focus:border-white font-body backdrop-blur-sm disabled:opacity-50"
      />
      {status === "success" ? (
        <p className="text-white font-semibold px-8 py-4 text-sm font-body self-center">
          {message}
        </p>
      ) : (
        <>
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-bb-plum-900 hover:bg-bb-plum-800 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm whitespace-nowrap font-body disabled:opacity-50"
          >
            {status === "loading" ? "Even geduld..." : "Aanmelden"}
          </button>
          {status === "error" && (
            <p className="text-red-200 text-sm self-center font-body">{message}</p>
          )}
        </>
      )}
    </form>
  );
}
