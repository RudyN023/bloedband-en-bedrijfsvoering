import type { MetadataRoute } from "next";
import { gasten } from "./gasten";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bloedbandenbedrijfsvoering.nl",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://bloedbandenbedrijfsvoering.nl/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://bloedbandenbedrijfsvoering.nl/nieuwsbrief",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...gasten.map((g) => ({
      url: `https://bloedbandenbedrijfsvoering.nl/${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
