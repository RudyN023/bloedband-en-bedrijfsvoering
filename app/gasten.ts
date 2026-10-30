export type Gast = {
  slug: string;
  naam: string;
  bedrijf: string;
  welkom: string;
  titel?: string;
  citaat?: string;
  beschrijving: string;
  foto: { src: string; alt: string };
  extraFoto?: { src: string; alt: string };
  links: { youtube?: string; spotify?: string; apple?: string };
};

export const gasten: Gast[] = [
  {
    slug: "vandervalk",
    naam: "Marlijn van der Valk",
    bedrijf: "Van der Valk Amersfoort",
    welkom: "Gescand in Van der Valk Amersfoort? Welkom.",
    beschrijving:
      "In deze aflevering spreekt Nick Waterman met Marlijn van der Valk van Van der Valk Amersfoort over ondernemen in een familiebedrijf.",
    foto: {
      src: "/gasten/vandervalk-marlijn-nick.jpg",
      alt: "Marlijn van der Valk en Nick Waterman in het restaurant van Van der Valk Amersfoort",
    },
    extraFoto: {
      src: "/gasten/vandervalk-opname.jpg",
      alt: "Opname van de podcast met Marlijn van der Valk en Nick Waterman",
    },
    links: {},
  },
];

export function getGast(slug: string) {
  return gasten.find((g) => g.slug === slug);
}
