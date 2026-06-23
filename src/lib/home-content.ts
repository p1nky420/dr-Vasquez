import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Landmark,
  Scale,
  ShieldCheck,
  Video,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  services: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "defensa-penal",
    title: "Defensa penal estratégica",
    description:
      "Servicio dirigido a personas investigadas, procesadas o vinculadas a una causa penal. La defensa se construye desde el expediente, la imputación y los elementos de convicción.",
    image: "/practice-defense-marble-v1.png",
    icon: Scale,
    services: [
      "Investigación previa y formulación de cargos",
      "Audiencias penales, juicio y medidas cautelares",
      "Prisión preventiva y revisión de estrategia defensiva",
      "Apelación, casación y recursos de revisión",
    ],
  },
  {
    id: "penal-economico",
    title: "Penal económico y delitos complejos",
    description:
      "Defensa especializada donde confluyen operaciones financieras, estructura empresarial, prueba documental, pericias y trazabilidad patrimonial.",
    image: "/practice-economic-glass-v1.png",
    icon: BriefcaseBusiness,
    services: [
      "Lavado de activos, cohecho y peculado",
      "Delitos financieros, societarios y tributarios",
      "Responsabilidad penal empresarial",
      "Procesos de alto impacto y exposición mediática",
    ],
  },
  {
    id: "consultoria",
    title: "Consultoría penal preventiva",
    description:
      "Revisión de operaciones, contratos, decisiones corporativas y contingencias antes de que se conviertan en procesos judiciales.",
    image: "/practice-consulting-dossier-v1.png",
    icon: Building2,
    services: [
      "Riesgos penales empresariales",
      "Responsabilidad de administradores",
      "Contratación pública y privada",
      "Asesoría a gerencias y directorios",
    ],
  },
  {
    id: "constitucional",
    title: "Civil, constitucional y garantías",
    description:
      "Análisis jurídico de conflictos patrimoniales y actuaciones que puedan afectar derechos fundamentales, debido proceso o tutela judicial efectiva.",
    image: "/reception.jpg",
    icon: Landmark,
    services: [
      "Hábeas corpus y acción de protección",
      "Contratos, obligaciones e incumplimientos",
      "Medidas cautelares constitucionales",
      "Seguridad jurídica y motivación judicial",
    ],
  },
  {
    id: "academia",
    title: "Academia y formación avanzada",
    description:
      "Formación jurídica desde la dogmática, la estrategia procesal y la práctica real del litigio penal.",
    image: "/eventos_bg.png",
    icon: GraduationCap,
    services: [
      "Academia de Litigio Penal Estratégico",
      "Programas inicial, básico, intermedio y avanzado",
      "Seminarios, conferencias y clases magistrales",
      "Invitación institucional como expositor",
    ],
  },
  {
    id: "publicaciones",
    title: "Publicaciones y orientación jurídica",
    description:
      "Obras jurídicas, análisis doctrinal y herramientas de primera orientación para profesionales y personas que requieren criterio especializado.",
    image: "/office.jpg",
    icon: BookOpen,
    services: [
      "Biblioteca Jurídica Fausto Vásquez",
      "Venta y envío nacional de libros jurídicos",
      "Asesoría online por hora",
      "Asistente Jurídico FV",
    ],
  },
];

export const credentials = [
  "Doctor Honoris Causa — Universidad del Golfo de México",
  "Maestría en Derecho Penal — Universidad Central del Ecuador",
  "Máster en Derecho Penal — Universitat Pompeu Fabra, España",
  "Máster en Derecho Penal — Universidad Externado de Colombia",
  "Doctor en Jurisprudencia y Abogado de los Tribunales y Juzgados de la República — Universidad Central del Ecuador",
  "Maestría en Derecho Penal y Procesal Penal — Universidad Central del Ecuador",
  "Máster en Derecho Procesal Penal — Universidad Externado de Colombia",
];

export const specializations = [
  "Derecho penal económico",
  "Derecho penal empresarial",
  "Derecho constitucional",
  "Derecho penal político",
  "Delitos contra la administración pública",
  "Delitos económicos y financieros",
  "Cohecho",
  "Lavado de activos",
  "Defensa en investigaciones penales complejas",
  "Imputación objetiva",
  "Dogmática penal",
  "Litigación oral",
  "Recursos penales y constitucionales",
  "Asesoría estratégica preventiva",
];

export const tacticalServices = [
  {
    number: "01",
    title: "Revisión de expedientes",
    text: "Segunda opinión técnica sobre actuaciones fiscales, elementos de convicción, estrategia actual, posibles errores y riesgos para las siguientes etapas.",
    cta: "Solicitar revisión de expediente",
  },
  {
    number: "02",
    title: "Preparación de audiencias",
    text: "Análisis del objetivo procesal, orden de argumentos, revisión de prueba, riesgos y preparación estratégica de la intervención.",
    cta: "Preparar audiencia penal",
  },
  {
    number: "03",
    title: "Apelación, casación y revisión",
    text: "Estudio de decisiones judiciales, errores jurídicos, motivación, garantías y posibles vías de impugnación.",
    cta: "Consultar recurso penal",
  },
  {
    number: "04",
    title: "Defensa de alta complejidad",
    text: "Intervención en expedientes voluminosos, prueba financiera o contable, varios procesados y escenarios de exposición pública.",
    cta: "Evaluar caso complejo",
  },
];

export const academicAuthority = [
  {
    eyebrow: "Autoridad académica",
    title: "Mentor · Congreso Jurídico Edición 2026",
    text: "Invitación institucional de la Universidad Estatal de Bolívar para contribuir a la formación de futuros juristas.",
    meta: "Universidad Estatal de Bolívar",
  },
  {
    eyebrow: "Trayectoria",
    title: "Docente y conferencista en ciencias penales",
    text: "Proyección académica orientada a la dogmática penal, litigación oral, delitos complejos y defensa estratégica.",
    meta: "Quito · Guayaquil · Ecuador",
  },
];

export const academicProgramStats = [
  { value: "200", label: "Horas académicas" },
  { value: "02", label: "Certificaciones" },
  { value: "03", label: "Talleres prácticos" },
  { value: "11", label: "Módulos" },
];

export const audiovisualEvidence = [
  {
    title: "Archivo audiovisual · 01",
    href: "https://www.facebook.com/share/v/18yrgVxCD1/",
  },
  {
    title: "Archivo audiovisual · 02",
    href: "https://www.facebook.com/share/v/1NRGmXd9dz/",
  },
];

export const interventionSteps = [
  {
    number: "01",
    title: "Admisión y conflicto de interés",
    text: "La firma revisa la naturaleza del asunto, su urgencia, jurisdicción y posibles conflictos antes de solicitar información sensible.",
  },
  {
    number: "02",
    title: "Auditoría y mapa de riesgo",
    text: "Lectura jurídica, probatoria y reputacional para identificar exposición, decisiones críticas y escenarios procesales.",
  },
  {
    number: "03",
    title: "Arquitectura de la defensa",
    text: "Construcción de teoría del caso, estrategia de prueba, narrativa y ruta de intervención para cada etapa.",
  },
  {
    number: "04",
    title: "Defensa activa",
    text: "Ejecución táctica en investigación, audiencias, juicio, recursos y gestión de riesgos asociados.",
  },
];

export const educationalGuides = [
  {
    number: "01",
    title: "Qué implica un proceso penal",
    text: "Un proceso penal puede comprometer libertad, patrimonio, actividad empresarial y reputación. La respuesta inicial debe partir de una revisión técnica del expediente, la imputación y los elementos de convicción disponibles.",
  },
  {
    number: "02",
    title: "Riesgos que deben evaluarse",
    text: "Medidas cautelares, exposición patrimonial, decisiones corporativas, evidencia documental, pericias y tiempos procesales pueden modificar la estrategia y requieren valoración conjunta.",
  },
  {
    number: "03",
    title: "Etapas y decisiones críticas",
    text: "Investigación, instrucción fiscal, audiencias, juicio y recursos plantean objetivos y riesgos distintos. La estrategia debe adaptarse a la etapa concreta y a la información legalmente disponible.",
  },
  {
    number: "04",
    title: "Cómo se construye una defensa",
    text: "Una defensa estratégica integra análisis jurídico, control probatorio, teoría del caso, preparación de audiencias y revisión permanente de escenarios, sin prometer resultados.",
  },
];

export const internalSeoLinks = [
  {
    eyebrow: "Servicio especializado",
    title: "Derecho penal económico",
    text: "Conozca el enfoque para investigaciones financieras, empresariales y patrimoniales complejas.",
    href: "/derecho-penal-economico",
  },
  {
    eyebrow: "Capacidad de defensa",
    title: "Áreas de práctica",
    text: "Revise las materias penales, constitucionales y preventivas atendidas por la firma.",
    href: "/areas-de-practica",
  },
  {
    eyebrow: "Experiencia y autoridad",
    title: "Perfil del Dr. Fausto Vásquez",
    text: "Conozca su formación, trayectoria académica, publicaciones y criterio profesional.",
    href: "/firma",
  },
  {
    eyebrow: "Criterio jurídico",
    title: "Análisis y publicaciones",
    text: "Explore contenido sobre derecho penal económico, litigio estratégico y dogmática penal.",
    href: "/blog",
  },
];

export const faqs = [
  {
    question: "¿Qué debo hacer si recibo una notificación de Fiscalía?",
    answer: "Debe solicitar asesoría inmediata antes de rendir versión o entregar documentación, para evitar errores estratégicos desde el inicio.",
  },
  {
    question: "¿Qué ocurre después de una formulación de cargos?",
    answer: "Se abre una etapa procesal en la que la defensa debe analizar la imputación, los elementos de convicción, los riesgos procesales y la estrategia probatoria.",
  },
  {
    question: "¿Puedo solicitar una segunda opinión jurídica?",
    answer: "Sí. La firma puede revisar el estado del caso y emitir una evaluación estratégica independiente, con absoluta confidencialidad y respeto al abogado titular.",
  },
  {
    question: "¿Atienden casos fuera de Quito?",
    answer: "Sí. Se atienden casos en Quito, Guayaquil y otras ciudades del Ecuador, previa evaluación de la naturaleza y etapa del caso.",
  },
  {
    question: "¿Qué documentos debo preparar para una evaluación jurídica?",
    answer: "Denuncia, versiones, providencias, partes policiales, informes, impulsos fiscales, escritos presentados y cualquier documento relacionado con el caso.",
  },
  {
    question: "¿Atienden urgencias penales?",
    answer: "Sí, previa disponibilidad y evaluación de la situación por parte del Dr. Fausto Vásquez.",
  },
  {
    question: "¿La primera consulta tiene costo?",
    answer: "La evaluación jurídica privada tiene un valor definido. Consulte directamente para conocer las condiciones vigentes.",
  },
  {
    question: "¿Puedo agendar una consulta online?",
    answer: "Sí. La asesoría online está disponible para clientes dentro y fuera de Ecuador, a través de videollamada o llamada telefónica.",
  },
  {
    question: "¿Manejan casos de lavado de activos?",
    answer: "Sí. La firma trabaja en defensa penal económica y casos complejos relacionados con delitos financieros, lavado de activos y delitos societarios.",
  },
  {
    question: "¿Manejan delitos contra la administración pública?",
    answer: "Sí. Se atienden casos relacionados con cohecho, peculado, concusión, tráfico de influencias y otras figuras penales contra la administración pública.",
  },
  {
    question: "¿Qué diferencia tiene una defensa penal estratégica?",
    answer: "No se limita a responder escritos. Analiza riesgos, prueba, teoría del caso, dogmática penal, tiempos procesales y escenarios de decisión para construir una arquitectura de defensa.",
  },
  {
    question: "¿Pueden revisar un caso que ya tiene abogado?",
    answer: "Sí. Se puede realizar una segunda opinión o auditoría estratégica del caso, con absoluta confidencialidad y respeto al profesional titular.",
  },
  {
    question: "¿La información del cliente es confidencial?",
    answer: "Sí. Toda consulta y documentación recibida se maneja bajo estricta confidencialidad profesional, incluso si no se formaliza una representación.",
  },
  {
    question: "¿Publican casos reales en la web?",
    answer: "Solo se publican casos anónimos y autorizados, sin revelar nombres, datos sensibles ni información que vulnere el secreto profesional.",
  },
  {
    question: "¿Cómo se agenda una cita?",
    answer: "El cliente debe contactarse por WhatsApp o formulario web, enviar información básica del caso y coordinar fecha, modalidad y condiciones de atención.",
  },
  {
    question: "¿Qué tipo de clientes atiende la firma?",
    answer: "Personas naturales, empresarios, directivos, funcionarios, profesionales y organizaciones involucradas en asuntos penales o constitucionales complejos.",
  },
  {
    question: "¿Atienden casos constitucionales?",
    answer: "Sí. Se trabaja en temas constitucionales vinculados a procesos penales, garantías jurisdiccionales y defensa de derechos fundamentales.",
  },
  {
    question: "¿El doctor Fausto atiende personalmente?",
    answer: "Sí, el Dr. Fausto Vásquez dirige personalmente cada caso. La modalidad de atención depende del tipo de servicio contratado y su disponibilidad.",
  },
  {
    question: "¿Se puede comprar libros desde la web?",
    answer: "Consulte disponibilidad y condiciones de compra y envío a través del formulario de contacto o WhatsApp.",
  },
  {
    question: "¿Qué debo hacer si tengo un proceso penal en curso?",
    answer: "Solicite una evaluación estratégica para revisar el estado del proceso, identificar riesgos procesales y recibir una recomendación jurídica fundamentada.",
  },
]
export const proofInstitutions = [
  "Corte Nacional de Justicia",
  "Universidad Central del Ecuador",
  "Universidad Externado de Colombia",
  "Universitat Pompeu Fabra",
  "Universidad del Golfo de México",
  "Ergo Editores",
];

// CASOS DE ÉXITO — PENDIENTE AUTORIZACIÓN DEL CLIENTE
// export const confidentialCaseStudies = [...]

export const ecosystemItems = [
  { title: "Academia jurídica", icon: GraduationCap, href: "/academia" },
  { title: "Libros y publicaciones", icon: BookOpen, href: "/blog" },
  { title: "Seminarios y eventos", icon: Video, href: "/eventos" },
  { title: "Garantías y prevención", icon: ShieldCheck, href: "/areas-de-practica" },
];
