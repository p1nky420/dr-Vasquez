/**
 * Apariciones en medios comprobadas: medio, fecha y enlace a la pieza original.
 * Cuando la nota lo cita de pasada, el enlace lleva un fragmento de texto
 * (#:~:text=) para que el navegador salte a su nombre y lo resalte.
 */
export type PressItem = {
  outlet: string;
  date: string;
  dateLabel: string;
  title: string;
  url: string;
};

export const press: PressItem[] = [
  {
    outlet: "Radio Centro",
    date: "2025-06-13",
    dateLabel: "Junio 2025",
    title: "Entrevista en NotiHoy como abogado penalista",
    url: "https://www.youtube.com/watch?v=dTsg1MiRXEQ",
  },
  {
    outlet: "Ergo Podcast",
    date: "2025-04-02",
    dateLabel: "Abril 2025",
    title: "Escuela de Litigantes: dogmática penal",
    url: "https://www.youtube.com/watch?v=AIHkaUVGp_A",
  },
  {
    outlet: "El Universo",
    date: "2020-06-24",
    dateLabel: "Junio 2020",
    title: "Citado como abogado penalista y catedrático de la Universidad Central",
    url: "https://www.eluniverso.com/noticias/2020/06/25/nota/7883586/esposa-morales-pide-que-dejen-piso-su-orden-detencion-declarar/#:~:text=Fausto%20V%C3%A1squez",
  },
  {
    outlet: "FM Mundo",
    date: "2019-09-18",
    dateLabel: "Septiembre 2019",
    title: "La identificación del rostro en delitos flagrantes",
    url: "https://www.youtube.com/watch?v=5_xD1Z0UkRo",
  },
];
