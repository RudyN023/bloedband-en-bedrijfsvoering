export type Gast = {
  slug: string;
  naam: string;
  bedrijf: string;
  welkom: string;
  titel?: string;
  beschrijving: string;
  foto: { src: string; alt: string };
  logo?: { src: string; alt: string; width: number; height: number };
  extraFoto?: { src: string; alt: string; bijschrift?: string };
  links: { youtube?: string; spotify?: string; apple?: string };
};

export const gasten: Gast[] = [
  {
    slug: "vandervalk",
    naam: "Marlijn van der Valk",
    bedrijf: "Van der Valk Amersfoort",
    welkom: "Welkom vanuit Van der Valk Amersfoort",
    beschrijving:
      "In deze aflevering spreekt Nick Waterman met Marlijn van der Valk van Van der Valk Amersfoort over ondernemen in een familiebedrijf.",
    foto: {
      src: "/gasten/vandervalk-marlijn-nick.jpg",
      alt: "Marlijn van der Valk en Nick Waterman in het restaurant van Van der Valk Amersfoort",
    },
    extraFoto: {
      src: "/gasten/vandervalk-opname.jpg",
      alt: "Opname van de podcast met Marlijn van der Valk en Nick Waterman",
      bijschrift: "Opgenomen in Van der Valk Amersfoort",
    },
    links: {},
  },
];

export function youtubeId(url?: string) {
  return url?.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/)?.[1];
}

export function getGast(slug: string) {
  return gasten.find((g) => g.slug === slug);
}
