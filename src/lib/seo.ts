export const SITE_URL = "https://faustovasquezabogados.com";

export const CANONICAL_HOSTS = [
  "faustovasquezabogados.com",
  "www.faustovasquezabogados.com",
];

export type PracticeLanding = {
  slug: string;
  /** Question-shaped H1 keyword the page is built to answer. */
  keyword: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  lede: string;
  image: string;
  /** What the visitor is actually living through when they land here. */
  situations: string[];
  /** What the firm does about it. */
  work: Array<{ title: string; text: string }>;
  /** Short, citable answers — the unit answer engines quote. */
  faqs: Array<{ question: string; answer: string }>;
  related: string[];
};

export const practiceLandings: PracticeLanding[] = [
  {
    slug: "lavado-de-activos",
    keyword: "Abogado de lavado de activos en Ecuador",
    title: "Defensa penal en lavado de activos y delitos financieros",
    metaTitle: "Abogado de Lavado de Activos en Quito y Guayaquil",
    metaDescription:
      "Defensa técnica en investigaciones por lavado de activos y delitos financieros en Ecuador: origen de fondos, trazabilidad patrimonial, pericias contables y estándares probatorios.",
    eyebrow: "Derecho penal económico",
    lede: "Las investigaciones por lavado de activos se construyen sobre prueba documental, pericias contables y trazabilidad patrimonial. La defensa se decide en cómo se leen esos elementos, no en la audiencia.",
    image: "/practice-area-lavado-activos.png",
    situations: [
      "La Unidad de Análisis Financiero o la Fiscalía ha requerido información sobre operaciones o cuentas.",
      "Se han dispuesto medidas cautelares sobre bienes, cuentas o participaciones societarias.",
      "Una operación comercial legítima está siendo leída como acto de conversión o transferencia.",
      "La imputación alcanza a administradores o socios por decisiones societarias ordinarias.",
    ],
    work: [
      {
        title: "Reconstrucción del origen de los fondos",
        text: "Análisis contable y documental del flujo patrimonial completo, para sostener con prueba el origen lícito de cada operación cuestionada.",
      },
      {
        title: "Control del estándar probatorio",
        text: "Revisión técnica de pericias, informes financieros y cadena de custodia, y objeción de inferencias que no alcanzan el estándar de condena.",
      },
      {
        title: "Defensa del patrimonio durante el proceso",
        text: "Impugnación de medidas cautelares reales desproporcionadas y protección de la continuidad operativa de la empresa.",
      },
      {
        title: "Delimitación de la responsabilidad",
        text: "Separación entre la actuación individual, la decisión corporativa y la responsabilidad penal de la persona jurídica.",
      },
    ],
    faqs: [
      {
        question: "¿Qué debo hacer si la Fiscalía pide información sobre mis cuentas?",
        answer:
          "Solicite asesoría antes de entregar documentación o rendir versión. La forma en que se presenta la información financiera en la etapa inicial condiciona toda la investigación posterior, y una entrega desordenada puede generar inferencias que después cuesta mucho revertir.",
      },
      {
        question: "¿Pueden incautar mis bienes antes de una sentencia?",
        answer:
          "Sí. En procesos por lavado de activos se dictan con frecuencia medidas cautelares reales durante la instrucción. Son impugnables, y su proporcionalidad debe discutirse desde el inicio, no al final del proceso.",
      },
      {
        question: "¿La empresa puede ser procesada además de sus administradores?",
        answer:
          "Sí. El COIP contempla la responsabilidad penal de la persona jurídica, que es independiente de la responsabilidad de las personas naturales. Por eso la defensa de la empresa y la del administrador deben diseñarse de forma coordinada pero diferenciada.",
      },
      {
        question: "¿Cuánto puede durar una investigación por lavado de activos?",
        answer:
          "Depende del volumen de prueba financiera, del número de procesados y de la carga del órgano judicial. Son de los procesos más extensos del sistema penal ecuatoriano, y la estrategia debe estar construida para sostenerse durante años.",
      },
    ],
    related: ["delitos-administracion-publica", "litigio-penal-estrategico"],
  },
  {
    slug: "delitos-administracion-publica",
    keyword: "Abogado de delitos contra la administración pública",
    title: "Defensa de funcionarios, servidores públicos y contratistas",
    metaTitle: "Abogado Penal: Peculado, Cohecho y Administración Pública",
    metaDescription:
      "Defensa penal en peculado, cohecho, concusión, tráfico de influencias y enriquecimiento ilícito en Ecuador. Funcionarios, exautoridades y contratistas del Estado.",
    eyebrow: "Administración pública",
    lede: "Estos procesos combinan presión institucional, exposición mediática y prueba administrativa voluminosa. La defensa exige leer el expediente técnico antes que el titular del periódico.",
    image: "/practice-area-admin-publica.png",
    situations: [
      "Un informe de la Contraloría ha derivado en indicios de responsabilidad penal.",
      "Una decisión administrativa o contractual está siendo imputada como delito.",
      "La investigación alcanza a exautoridades por actos realizados en el ejercicio del cargo.",
      "Un contratista del Estado es vinculado a un proceso por la actuación de la entidad.",
    ],
    work: [
      {
        title: "Separación entre irregularidad administrativa y delito",
        text: "No toda observación de control se traduce en responsabilidad penal. La defensa trabaja en delimitar dónde termina lo administrativo y dónde empieza la tipicidad.",
      },
      {
        title: "Análisis del deber funcional concreto",
        text: "Revisión de competencias, delegaciones, informes técnicos previos y márgenes de decisión reales del funcionario imputado.",
      },
      {
        title: "Imputación objetiva aplicada a decisiones colegiadas",
        text: "En decisiones de directorio o comisión, la atribución individual del resultado debe sostenerse técnicamente, no presumirse del cargo.",
      },
      {
        title: "Gestión de la exposición pública",
        text: "Coordinación entre estrategia procesal y exposición mediática, con criterio de discreción y protección reputacional.",
      },
    ],
    faqs: [
      {
        question: "¿Un informe de Contraloría implica que habrá condena penal?",
        answer:
          "No. El control administrativo y el proceso penal responden a estándares distintos. Un informe con indicios de responsabilidad penal inicia una investigación, pero la tipicidad, el dolo y la atribución del resultado deben probarse de forma autónoma en sede penal.",
      },
      {
        question: "¿Puedo ser procesado por una decisión que firmé siguiendo informes técnicos?",
        answer:
          "Es un escenario frecuente. La defensa se construye sobre el principio de confianza y los límites de la imputación objetiva: hasta dónde alcanzaba el deber de verificación del firmante respecto del trabajo técnico de otros.",
      },
      {
        question: "¿Atienden casos de exautoridades ya fuera del cargo?",
        answer:
          "Sí. La firma tiene experiencia en defensa de funcionarios, servidores públicos y exautoridades investigadas por actos relacionados con el ejercicio del cargo.",
      },
      {
        question: "¿Se puede asumir la defensa con el proceso ya avanzado?",
        answer:
          "Sí. El procesado puede designar un nuevo defensor en cualquier etapa. La firma realiza primero una auditoría del estado procesal para determinar qué decisiones siguen abiertas y cuáles ya precluyeron.",
      },
    ],
    related: ["lavado-de-activos", "constitucional-penal"],
  },
  {
    slug: "constitucional-penal",
    keyword: "Abogado constitucional penal y hábeas corpus en Ecuador",
    title: "Garantías constitucionales dentro del proceso penal",
    metaTitle: "Hábeas Corpus y Acción de Protección | Abogado Quito",
    metaDescription:
      "Hábeas corpus, acción de protección, medidas cautelares constitucionales y defensa del debido proceso frente a actuaciones penales en Ecuador.",
    eyebrow: "Garantías fundamentales",
    lede: "Cuando el proceso penal excede sus propios límites, la vía no es solo penal. Las garantías jurisdiccionales existen para corregir la actuación, y tienen plazos propios.",
    image: "/practice-area-constitucional.png",
    situations: [
      "Existe una privación de libertad que se considera ilegal, arbitraria o ilegítima.",
      "La prisión preventiva se ha prolongado más allá de lo razonable o proporcionado.",
      "Una resolución judicial carece de motivación suficiente.",
      "Una actuación administrativa o fiscal vulnera derechos fundamentales.",
    ],
    work: [
      {
        title: "Hábeas corpus",
        text: "Acción frente a privaciones de libertad ilegales, arbitrarias o ilegítimas, y frente a condiciones de detención que vulneran la integridad.",
      },
      {
        title: "Acción de protección",
        text: "Defensa de derechos constitucionales afectados por actos u omisiones de autoridad pública, cuando no existe otra vía eficaz.",
      },
      {
        title: "Control de motivación",
        text: "Impugnación de decisiones que no satisfacen el estándar constitucional de motivación, uno de los vicios más frecuentes y menos alegados.",
      },
      {
        title: "Proporcionalidad de las medidas cautelares",
        text: "Discusión técnica de la necesidad, idoneidad y proporcionalidad de la prisión preventiva y de las medidas reales.",
      },
    ],
    faqs: [
      {
        question: "¿Cuándo procede un hábeas corpus en Ecuador?",
        answer:
          "Procede cuando la privación de libertad es ilegal, arbitraria o ilegítima, y también frente a condiciones de detención que afecten la vida o la integridad de la persona privada de libertad. Es una acción de conocimiento urgente y su tramitación es preferente.",
      },
      {
        question: "¿La acción de protección sirve dentro de un proceso penal en curso?",
        answer:
          "Tiene carácter residual: no sustituye los recursos ordinarios del proceso penal. Procede cuando la vulneración de derechos no puede ser corregida eficazmente por la vía penal ordinaria. Determinar cuál es la vía correcta es parte del análisis técnico inicial.",
      },
      {
        question: "¿Qué se puede hacer si la prisión preventiva se prolonga demasiado?",
        answer:
          "Existen vías para solicitar su revisión o sustitución cuando han variado las circunstancias que la motivaron o cuando su duración deja de ser proporcionada. La estrategia depende de la etapa procesal concreta.",
      },
      {
        question: "¿Litigan ante cortes internacionales?",
        answer:
          "La práctica incluye litigio constitucional ante cortes nacionales e internacionales en asuntos vinculados a garantías del debido proceso, previa evaluación del agotamiento de la vía interna.",
      },
    ],
    related: ["litigio-penal-estrategico", "delitos-administracion-publica"],
  },
  {
    slug: "litigio-penal-estrategico",
    keyword: "Litigio penal estratégico y segunda opinión jurídica",
    title: "Teoría del caso, audiencias y recursos",
    metaTitle: "Litigio Penal Estratégico y Segunda Opinión | Quito",
    metaDescription:
      "Revisión de expedientes, preparación de audiencias, apelación, casación y revisión. Segunda opinión técnica independiente sobre procesos penales en Ecuador.",
    eyebrow: "Alta complejidad",
    lede: "La mayoría de los procesos no se pierden en el juicio: se pierden antes, en decisiones tomadas sin una teoría del caso construida. Una segunda opinión técnica llega a tiempo más veces de lo que se cree.",
    image: "/practice-area-litigio.png",
    situations: [
      "Ya existe un abogado, pero se busca una evaluación independiente del estado del caso.",
      "Hay una audiencia próxima y la intervención necesita preparación técnica.",
      "Una resolución adversa admite apelación, casación o revisión.",
      "El expediente es voluminoso, con prueba financiera o contable y varios procesados.",
    ],
    work: [
      {
        title: "Revisión de expediente",
        text: "Segunda opinión técnica sobre actuaciones fiscales, elementos de convicción, estrategia actual, errores cometidos y riesgos para las siguientes etapas.",
      },
      {
        title: "Preparación de audiencias",
        text: "Definición del objetivo procesal, orden de argumentos, revisión de prueba, anticipación de contraargumentos y preparación de la intervención.",
      },
      {
        title: "Apelación, casación y revisión",
        text: "Estudio de la decisión, identificación de errores jurídicos y de motivación, y determinación de la vía de impugnación viable.",
      },
      {
        title: "Defensa de alta complejidad",
        text: "Intervención en expedientes voluminosos, con pericia financiera o contable, pluralidad de procesados y exposición pública.",
      },
    ],
    faqs: [
      {
        question: "¿Puedo pedir una segunda opinión sin cambiar de abogado?",
        answer:
          "Sí. La firma emite evaluaciones estratégicas independientes con absoluta confidencialidad y respeto al profesional titular del caso. Una segunda opinión no implica sustituir la defensa.",
      },
      {
        question: "¿Qué documentos debo llevar a una evaluación?",
        answer:
          "Denuncia, versiones rendidas, providencias, partes policiales, informes periciales, impulsos fiscales y los escritos presentados. Con eso se puede hacer una lectura técnica seria del estado del proceso.",
      },
      {
        question: "¿Se puede cambiar de abogado con el proceso avanzado?",
        answer:
          "Sí. El procesado tiene derecho a designar un nuevo defensor en cualquier etapa. Lo relevante es determinar antes qué decisiones siguen siendo reversibles en la etapa en que se encuentra el caso.",
      },
      {
        question: "¿Qué diferencia hay entre una evaluación y asumir la defensa?",
        answer:
          "La evaluación es un diagnóstico del caso, sus riesgos y escenarios posibles. La representación implica la dirección técnica del proceso desde la etapa en que se encuentre, con intervención en audiencias y escritos.",
      },
    ],
    related: ["lavado-de-activos", "constitucional-penal"],
  },
];

export function getLanding(slug: string) {
  return practiceLandings.find((landing) => landing.slug === slug);
}

/** FAQPage JSON-LD scoped to a single URL, so no two nodes share an @id. */
export function faqJsonLd(
  url: string,
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${trail[trail.length - 1].path}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
