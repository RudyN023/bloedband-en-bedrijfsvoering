import { platformLinks } from "./afleveringen";

// Haalt de nieuwste afleveringen automatisch op. YouTube is de bron; Apple en
// Spotify worden erbij gezocht op bedrijfsnaam. Elk uur ververst.

const YOUTUBE_FEED = "https://www.youtube.com/feeds/videos.xml?channel_id=UCBNaGJ2RL6LyXPc4xhLtzUQ";
const APPLE_LOOKUP = "https://itunes.apple.com/lookup?id=1715013376&entity=podcastEpisode&limit=50&country=nl";
const SPOTIFY_SHOW_ID = "7lPmQPXoACeysRV3zIuYn1";
const REVALIDATE = 3600;

export type Aflevering = {
  title: string;
  company: string;
  image: string;
  description: string;
  href: string;
  spotify: string;
  apple: string;
};

type Kandidaat = { naam: string; url: string };

function decode(s: string) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function tag(xml: string, naam: string) {
  const m = xml.match(new RegExp(`<${naam}[^>]*>([\\s\\S]*?)</${naam}>`));
  return m ? decode(m[1].trim()) : "";
}

// "Breur: “Perfect is ook saai.” | Extra" -> { company: "Breur", title: "Perfect is ook saai." }
function splitTitel(titel: string) {
  const i = titel.indexOf(":");
  if (i === -1) return null;
  const company = titel.slice(0, i).trim();
  const title = titel
    .slice(i + 1)
    .split(" | ")[0]
    .trim()
    .replace(/^["“”']+|["“”']+$/g, "")
    .trim();
  return company && title ? { company, title } : null;
}

// Eerste alinea na "Over deze aflevering", afgekapt op een zinseinde.
function korteOmschrijving(beschrijving: string, max = 200) {
  const alinea =
    beschrijving
      .replace(/^Over deze aflevering\s*/i, "")
      .split(/\n\s*\n/)
      .map((a) => a.replace(/\s+/g, " ").trim())
      .find(Boolean) ?? "";
  if (alinea.length <= max) return alinea;
  const zinnen = alinea.match(/[^.!?]+[.!?]+["”]?/g) ?? [];
  let tekst = "";
  for (const zin of zinnen) {
    if ((tekst + zin).length > max) break;
    tekst += zin;
  }
  return tekst.trim() || alinea.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function zoek(kandidaten: Kandidaat[], company: string) {
  const prefix = company.toLowerCase() + ":";
  return kandidaten.find((k) => k.naam.toLowerCase().startsWith(prefix))?.url;
}

async function appleAfleveringen(): Promise<Kandidaat[]> {
  try {
    const res = await fetch(APPLE_LOOKUP, { next: { revalidate: REVALIDATE } });
    const data = await res.json();
    return data.results
      .filter((r: { wrapperType: string }) => r.wrapperType === "podcastEpisode")
      .map((r: { trackName: string; trackViewUrl: string }) => ({
        naam: r.trackName,
        url: r.trackViewUrl.replace(/&uo=\d+$/, ""),
      }));
  } catch {
    return [];
  }
}

// Optioneel: werkt alleen als SPOTIFY_CLIENT_ID en SPOTIFY_CLIENT_SECRET zijn ingesteld.
async function spotifyAfleveringen(): Promise<Kandidaat[]> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) return [];
  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      next: { revalidate: REVALIDATE },
    });
    const { access_token } = await tokenRes.json();
    const res = await fetch(`https://api.spotify.com/v1/shows/${SPOTIFY_SHOW_ID}/episodes?market=NL&limit=50`, {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: REVALIDATE },
    });
    const data = await res.json();
    return data.items
      .filter(Boolean)
      .map((e: { name: string; external_urls: { spotify: string } }) => ({
        naam: e.name,
        url: e.external_urls.spotify,
      }));
  } catch {
    return [];
  }
}

export async function getNieuwsteAfleveringen(fallback: Aflevering[], aantal = 3): Promise<Aflevering[]> {
  try {
    const res = await fetch(YOUTUBE_FEED, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return fallback;
    const xml = await res.text();
    const [apple, spotify] = await Promise.all([appleAfleveringen(), spotifyAfleveringen()]);

    const afleveringen: Aflevering[] = [];
    for (const entry of xml.split("<entry>").slice(1)) {
      const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
      const videoId = tag(entry, "yt:videoId");
      // Shorts en clips overslaan: alleen volledige afleveringen in "Bedrijf: citaat"-vorm
      if (!videoId || link.includes("/shorts/")) continue;
      const delen = splitTitel(tag(entry, "title"));
      if (!delen) continue;

      afleveringen.push({
        ...delen,
        image: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        description: korteOmschrijving(tag(entry, "media:description")),
        href: `https://youtu.be/${videoId}`,
        spotify: zoek(spotify, delen.company) ?? platformLinks.spotify,
        apple: zoek(apple, delen.company) ?? platformLinks.apple,
      });
      if (afleveringen.length === aantal) break;
    }

    return afleveringen.length === aantal ? afleveringen : fallback;
  } catch {
    return fallback;
  }
}
