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
  "Derecho Penal",
  "Derecho Penal Económico",
  "Derecho Constitucional",
  "Litigación Oral",
  "Defensa estratégica en casos complejos",
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
    question: "¿El envío del formulario crea una relación abogado-cliente?",
    answer:
      "No. La relación profesional se formaliza únicamente después de revisar el asunto, verificar conflictos de interés y aceptar expresamente la representación.",
  },
  {
    question: "¿Debo enviar documentos o detalles sensibles en la primera solicitud?",
    answer:
      "No. La admisión inicial solicita únicamente datos mínimos. La firma indicará un canal seguro si el asunto avanza a una segunda etapa.",
  },
  {
    question: "¿Qué casos reciben atención prioritaria?",
    answer:
      "Asuntos con detenciones, audiencias próximas, investigaciones activas, exposición patrimonial, empresarial o reputacional requieren revisión prioritaria.",
  },
  {
    question: "¿La firma trabaja fuera de Quito?",
    answer:
      "La práctica atiende asuntos en Quito, Guayaquil y otras jurisdicciones del Ecuador, según la naturaleza y etapa del caso.",
  },
  {
    question: "¿Qué ocurre después de solicitar una evaluación?",
    answer:
      "El equipo revisa los datos mínimos, verifica posibles conflictos y contacta al solicitante para confirmar si el asunto puede avanzar a evaluación privada.",
  },
  {
    question: "¿Por qué importa la etapa procesal al diseñar una defensa?",
    answer:
      "Cada etapa presenta decisiones, riesgos y oportunidades diferentes. La estrategia debe construirse a partir del estado real del proceso, la imputación y los elementos disponibles.",
  },
  {
    question: "¿Una evaluación inicial garantiza un resultado?",
    answer:
      "No. Ningún resultado puede garantizarse. La evaluación inicial permite identificar riesgos, información necesaria y posibles rutas de intervención jurídica.",
  },
  {
    question: "¿Qué tipos de asuntos atiende el Dr. Fausto Vásquez?",
    answer:
      "Derecho penal económico, lavado de activos, delitos financieros, litigio constitucional penal, defensa penal estratégica, responsabilidad penal empresarial y delitos contra la administración pública.",
  },
  {
    question: "¿El secreto profesional aplica desde la primera consulta?",
    answer:
      "Sí. Toda información compartida durante el proceso de admisión o evaluación está protegida por el secreto profesional, incluso si no se formaliza una representación.",
  },
  {
    question: "¿Cuánto tiempo toma una evaluación estratégica inicial?",
    answer:
      "La evaluación inicial suele completarse en un plazo de 48 a 72 horas hábiles, dependiendo de la complejidad del asunto y la información disponible.",
  },
  {
    question: "¿Qué diferencia a esta firma de un bufete tradicional?",
    answer:
      "Cada asunto recibe dirección personal del Dr. Vásquez, combinando profundidad académica, experiencia procesal y una arquitectura de defensa construida específicamente para el caso.",
  },
  {
    question: "¿Se manejan casos con exposición mediática o institucional?",
    answer:
      "Sí. La firma cuenta con experiencia en asuntos de alta exposición, diseñando estrategias de comunicación jurídica y protección reputacional paralelas a la defensa técnica.",
  },
  {
    question: "¿Puedo solicitar una segunda opinión sobre mi caso?",
    answer:
      "Sí. La evaluación independiente de una estrategia de defensa en curso es una práctica habitual. Se realiza con absoluta confidencialidad y respeto al abogado titular.",
  },
  {
    question: "¿Cómo se protege la información que comparto digitalmente?",
    answer:
      "Todas las comunicaciones y documentos se gestionan a través de canales cifrados, con protocolos de seguridad diseñados para preservar la confidencialidad y el secreto profesional.",
  },
  {
    question: "¿La firma representa en audiencias orales y tribunales?",
    answer:
      "Sí. La representación incluye intervención directa en audiencias orales, juicios, recursos extraordinarios y litigio ante cortes nacionales, con dirección personal del Dr. Vásquez.",
  },
  {
    question: "¿Se atienden casos de delitos económicos y empresariales?",
    answer:
      "Es una de las áreas centrales de la práctica: lavado de activos, delitos financieros, responsabilidad penal de personas jurídicas, administración desleal y delitos societarios.",
  },
  {
    question: "¿Qué rol tiene la investigación académica en la defensa?",
    answer:
      "La producción jurídica del Dr. Vásquez —libros, artículos y análisis doctrinales— se integra directamente en la construcción de teoría del caso y en la argumentación estratégica de cada defensa.",
  },
];

export const proofInstitutions = [
  "Corte Nacional de Justicia",
  "Universidad Central del Ecuador",
  "Universidad Externado de Colombia",
  "Universitat Pompeu Fabra",
  "Universidad del Golfo de México",
  "Ergo Editores",
];

export const confidentialCaseStudies = [
  {
    title: "Lavado de activos",
    risk: "Acusación de lavado de activos; exposición patrimonial de $5M.",
    tactic: "Desvirtuación de elementos de convicción en fase de instrucción fiscal.",
    resolution: "Sobreseimiento y liberación total de cuentas.",
  },
  {
    title: "Administración pública",
    risk: "Imputación por peculado vinculada a contratación de obra pública.",
    tactic: "Contradicción técnica de la imputación y control de cargos en audiencia preparatoria.",
    resolution: "Desestimación de cargos.",
  },
  {
    title: "Corte Nacional",
    risk: "Sentencia condenatoria con error de derecho en la aplicación de imputación objetiva.",
    tactic: "Recurso de casación centrado en el error jurídico y la vulneración de garantías.",
    resolution: "Casación aceptada y caso remitido para nuevo juicio.",
  },
];

export const ecosystemItems = [
  { title: "Academia jurídica", icon: GraduationCap, href: "/academia" },
  { title: "Libros y publicaciones", icon: BookOpen, href: "/blog" },
  { title: "Seminarios y eventos", icon: Video, href: "/eventos" },
  { title: "Garantías y prevención", icon: ShieldCheck, href: "/areas-de-practica" },
];
