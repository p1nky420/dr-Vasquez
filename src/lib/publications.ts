export const researchArticle = {
  title: "Problemas de la tipicidad en la actio libera in causa en su estructura básica",
  source: "Revista Ciencias Sociales · Universidad Central del Ecuador",
  url: "https://revistadigital.uce.edu.ec/index.php/CSOCIALES/article/view/6429",
};

type Book = {
  id: string;
  title: string;
  subject: string;
  description: string;
  edition?: { year: string; publisher: string; isbn: string };
  reference: { label: string; url: string };
};

export const books: Book[] = [
  {
    id: "falsedad-documental",
    title: "La falsedad documental en materia penal",
    subject: "Prueba documental",
    description: "Un estudio jurídico sobre la falsedad documental en el ámbito penal.",
    edition: { year: "2007", publisher: "Cámara Ecuatoriana del Libro, Núcleo de Pichincha", isbn: "978-9942-01-315-6" },
    reference: { label: "Registro en ISBN Ecuador", url: "https://isbnecuador.com/catalogo.php?anio=2007&mode=busqueda_menu&pagina=32" },
  },
  {
    id: "sustanciacion-proceso",
    title: "La sustanciación del proceso penal",
    subject: "Derecho procesal penal",
    description: "Obra dedicada a la tramitación del proceso penal.",
    reference: { label: "Referencia bibliográfica en UNIANDES", url: "https://dspace.uniandes.edu.ec/bitstream/123456789/11835/1/PIUSDAB062-2020.pdf" },
  },
  {
    id: "punto-inflexion",
    title: "Punto de inflexión de la imputación objetiva en el Código Orgánico Integral Penal",
    subject: "Imputación objetiva",
    description: "Aborda el principio de confianza, la atribución de responsabilidad y la concurrencia de riesgos.",
    edition: { year: "2016", publisher: "Editorial Jurídica del Ecuador", isbn: "978-9978-17-440-1" },
    reference: { label: "Registro en ISBN Ecuador", url: "https://isbnecuador.com/catalogo.php?mode=detalle&nt=52760" },
  },
];
