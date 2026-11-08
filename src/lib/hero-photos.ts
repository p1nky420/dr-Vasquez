export type HeroPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
  copySide?: "left" | "right";
};

export const heroPhotos = {
  home: {
    src: "/estudio/portada-panoramica.webp",
    alt: "Fausto Vásquez Cevallos trabajando en su despacho en Quito",
    width: 2400,
    height: 1800,
  },
  profile: {
    src: "/estudio/panorama-trayectoria.webp",
    alt: "Fausto Vásquez Cevallos en la mesa principal de su despacho",
    width: 2000,
    height: 1500,
  },
  practice: {
    src: "/estudio/panorama-practica.webp",
    alt: "Fausto Vásquez Cevallos revisa su trabajo en la mesa de reuniones",
    width: 2000,
    height: 1500,
    copySide: "left",
  },
  library: {
    src: "/estudio/panorama-biblioteca.webp",
    alt: "Biblioteca jurídica y sala de trabajo del despacho",
    width: 2000,
    height: 1500,
  },
  desk: {
    src: "/estudio/panorama-mesa.webp",
    alt: "Mesa de trabajo junto a la biblioteca y el ventanal",
    width: 1600,
    height: 900,
    copySide: "left",
  },
  office: {
    src: "/estudio/panorama-estudio.webp",
    alt: "Sala de trabajo del estudio con vista a Quito",
    width: 1600,
    height: 900,
    copySide: "left",
  },
  window: {
    src: "/estudio/panorama-ventanal.webp",
    alt: "Mesa de reuniones y vista de Quito desde el despacho",
    width: 1600,
    height: 900,
    copySide: "left",
  },
  reception: {
    src: "/estudio/panorama-recepcion.webp",
    alt: "Recepción del estudio jurídico en Quito",
    width: 1600,
    height: 900,
    copySide: "left",
  },
  meetings: {
    src: "/estudio/panorama-encuentros.webp",
    alt: "Detalle de la sala de recepción del estudio jurídico",
    width: 1600,
    height: 900,
  },
  chessRoom: {
    src: "/estudio/sala-tablero.webp",
    alt: "Sala del despacho con el tablero de ajedrez junto a la mesa de reuniones",
    width: 1800,
    height: 1350,
  },
} satisfies Record<string, HeroPhoto>;
