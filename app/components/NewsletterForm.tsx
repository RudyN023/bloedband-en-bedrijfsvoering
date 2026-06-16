"use client";

export function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        required
        placeholder="jouw@emailadres.nl"
        className="flex-1 bg-white/20 border border-white/30 placeholder:text-white/50 text-white rounded-full px-6 py-4 text-sm focus:outline-none focus:border-white font-body backdrop-blur-sm"
      />
      <button
        type="submit"
        className="bg-bb-plum-900 hover:bg-bb-plum-800 text-white font-semibold px-8 py-4 rounded-full transition-colors text-sm whitespace-nowrap font-body"
      >
        Aanmelden
      </button>
    </form>
  );
}
