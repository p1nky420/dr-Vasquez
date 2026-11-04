/**
 * Fotografías del Centro Histórico de Quito usadas en la portada.
 * Todas proceden de Wikimedia Commons. Se publican en blanco y negro
 * (obra derivada); las licencias CC BY-SA exigen citar autor y licencia,
 * y que la versión adaptada se comparta con la misma licencia.
 */
export type HeritageImage = {
  src: string;
  width: number;
  height: number;
  place: string;
  author: string;
  license: string;
  licenseUrl?: string;
  source: string;
};

export const heritage = {
  hornacina: {
    src: "/patrimonio/compania-hornacina.webp",
    width: 1467,
    height: 2200,
    place: "Iglesia de La Compañía de Jesús, Quito",
    author: "Bernard Gagnon",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Iglesia_de_la_Compa%C3%B1%C3%ADa_de_Jesus,_Quito_02.jpg",
  },
  fachada: {
    src: "/patrimonio/compania-fachada.webp",
    width: 1463,
    height: 2200,
    place: "Fachada de La Compañía de Jesús, Quito",
    author: "Ymblanter",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    source: "https://commons.wikimedia.org/wiki/File:Quito_Iglesia_de_La_Compa%C3%B1%C3%ADa_main_facade.jpg",
  },
  portico: {
    src: "/patrimonio/basilica-portico.webp",
    width: 1650,
    height: 2200,
    place: "Pórtico de la Basílica del Voto Nacional, Quito",
    author: "Ranoutofusername",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    source: "https://commons.wikimedia.org/wiki/File:P%C3%B3rtico_este._Bas%C3%ADlica_del_Voto_Nacional,_Quito_-_Ecuador.jpg",
  },
  panorama: {
    src: "/patrimonio/quito-desde-panecillo.webp",
    width: 2200,
    height: 1363,
    place: "Quito desde El Panecillo",
    author: "Cayambe",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Quito_as_from_panecillo_Basilica.jpg",
  },
  garciaMoreno: {
    src: "/patrimonio/calle-garcia-moreno.webp",
    width: 2200,
    height: 1464,
    place: "Calle García Moreno hacia El Panecillo, Quito",
    author: "Cayambe",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Quito_calle_Garc%C3%ADa_Moreno.jpg",
  },
  venezuela: {
    src: "/patrimonio/calle-venezuela-basilica.webp",
    width: 2200,
    height: 1464,
    place: "Calle Venezuela y la Basílica del Voto Nacional, Quito",
    author: "Cayambe",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    source: "https://commons.wikimedia.org/wiki/File:Quito_calle_Venezuela_Basilica.jpg",
  },
  archivo: {
    src: "/patrimonio/quito-1900.webp",
    width: 583,
    height: 544,
    place: "Vista de Quito, comienzos del siglo XX",
    author: "Gebrüder Underwood",
    license: "Dominio público",
    source: "https://commons.wikimedia.org/wiki/File:Gebr%C3%BCder_Underwood_-_Blick_auf_Quito_(Zeno_Fotografie).jpg",
  },
} satisfies Record<string, HeritageImage>;

export const heritageCredits: HeritageImage[] = Object.values(heritage);
