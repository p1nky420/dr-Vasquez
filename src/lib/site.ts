import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  Building2,
  FileText,
  Landmark,
  Scale,
  ShieldCheck,
  Target,
  WalletCards,
} from "lucide-react";

export const whatsappNumber = "+593983076881";
export const navItems = [
  { href: "/#legado", label: "Legado" },
  { href: "/#trayectoria", label: "Trayectoria" },
  { href: "/#practica", label: "Práctica" },
  { href: "/#pensamiento-juridico", label: "Pensamiento" },
  { href: "/#consulta", label: "Consulta" },
];

export type PracticeArea = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  href: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    title: "Derecho Penal Económico",
    description:
      "Defensa en investigaciones por fraude, estafa, abuso de confianza, delitos societarios, tributarios y conflictos empresariales con relevancia penal.",
    icon: BriefcaseBusiness,
    image: "/practice-area-penal-economico.png",
    href: "/derecho-penal-economico",
  },
  {
    title: "Lavado de Activos y Delitos Financieros",
    description:
      "Estrategia de defensa ante análisis de origen de fondos, operaciones patrimoniales, estructuras financieras y movimientos empresariales complejos.",
    icon: WalletCards,
    image: "/practice-area-lavado-activos.png",
    href: "/contacto?area=lavado-de-activos",
  },
  {
    title: "Delitos contra la Administración Pública",
    description:
      "Defensa en casos de peculado, cohecho, concusión, tráfico de influencias, enriquecimiento ilícito y responsabilidad de funcionarios o contratistas.",
    icon: Landmark,
    image: "/practice-area-admin-publica.png",
    href: "/contacto?area=administracion-publica",
  },
  {
    title: "Derecho Constitucional Penal",
    description:
      "Acciones constitucionales, garantías jurisdiccionales, debido proceso, tutela judicial efectiva y defensa frente a vulneraciones de derechos fundamentales.",
    icon: ShieldCheck,
    image: "/practice-area-constitucional.png",
    href: "/contacto?area=constitucional-penal",
  },
  {
    title: "Litigio Penal Estratégico",
    description:
      "Construcción de teoría del caso, análisis probatorio, audiencias, recursos, juicio oral y diseño integral de defensa.",
    icon: Target,
    image: "/practice-area-litigio.png",
    href: "/contacto?area=litigio-estrategico",
  },
];

export const processSteps = [
  {
    title: "Análisis del Caso",
    text: "Examinamos cada detalle jurídico, fáctico y probatorio para comprender a fondo el contexto y los riesgos.",
    iconName: "Search",
  },
  {
    title: "Teoría de la Defensa",
    text: "Diseñamos una teoría sólida, coherente y personalizada que sustenta nuestra estrategia.",
    iconName: "Columns",
  },
  {
    title: "Prueba y Argumentación",
    text: "Seleccionamos, producimos y controvertimos la prueba clave para construir argumentos contundentes.",
    iconName: "Gavel",
  },
  {
    title: "Audiencias y Recursos",
    text: "Litigamos con precisión y firmeza en cada audiencia, protegiendo sus derechos en todas las instancias.",
    iconName: "Scale",
  },
  {
    title: "Protección de Libertad, Patrimonio y Reputación",
    text: "Nuestro objetivo final: resguardar lo que más valora con estrategias efectivas y confidenciales.",
    iconName: "Lock",
  },
];

export const courses = [
  "Derecho Penal Económico",
  "Litigio Penal Estratégico",
  "Teoría del Delito Aplicada",
  "Prueba Penal y Teoría del Caso",
  "Derecho Constitucional Penal",
];

export const eventFormats = [
  "Masterclass online",
  "Seminarios presenciales",
  "Eventos premium para abogados",
  "Conferencias internacionales",
  "Programas de formación avanzada",
];

export const blogCategories = [
  "Derecho Penal Económico",
  "Delitos Financieros",
  "Lavado de Activos",
  "Derecho Constitucional Penal",
  "Litigio Estratégico",
];

export const featuredPosts = [
  {
    title: "Responsabilidad Penal de la Persona Jurídica",
    category: "Derecho Penal Económico",
    summary:
      "La evolución dogmática y práctica de la responsabilidad penal de las corporaciones en el COIP ecuatoriano.",
    icon: Building2,
  },
  {
    title: "El Principio de Confianza y los Delitos de Omisión",
    category: "Litigio Estratégico",
    summary:
      "Límites técnicos de la imputación objetiva en las decisiones directivas y empresariales complejas.",
    icon: Scale,
  },
  {
    title: "La Falsedad Documental en Materia Penal",
    category: "Dogmática Penal",
    summary:
      "Estudio dogmático sobre la alteración de la verdad, la prueba instrumental y el dolo procesal en Ecuador.",
    icon: FileText,
  },
  {
    title: "Litigio Penal Estratégico y Teoría del Caso",
    category: "Técnica Procesal",
    summary:
      "Diseño científico de la teoría del caso frente a la imputación fiscal en el proceso penal ecuatoriano.",
    icon: Target,
  },
];

export const credentials = [
  {
    value: "Penal económico",
    label: "Defensa en investigaciones donde confluyen empresa, patrimonio y riesgo penal.",
  },
  {
    value: "Alto impacto",
    label: "Estrategia para personas expuestas a presión procesal, institucional o reputacional.",
  },
  {
    value: "Dogmática aplicada",
    label: "Lectura técnica de imputación, prueba, responsabilidad y garantías.",
  },
];

export const representativeMatters = [
  {
    tag: "Investigaciones corporativas",
    title: "Conflictos empresariales con exposición penal",
    text: "Evaluación de hechos societarios, operaciones, documentación y decisiones administrativas para contener riesgo penal.",
  },
  {
    tag: "Delitos financieros",
    title: "Origen de fondos, trazabilidad y estructura patrimonial",
    text: "Lectura defensiva de movimientos patrimoniales, flujos financieros y narrativa acusatoria.",
  },
  {
    tag: "Sector público",
    title: "Responsabilidad penal de funcionarios y contratistas",
    text: "Defensa frente a investigaciones por administración pública, contratación, influencia o enriquecimiento.",
  },
  {
    tag: "Garantías",
    title: "Control constitucional en procesos penales",
    text: "Debido proceso, tutela judicial efectiva, medidas cautelares, recursos y acciones constitucionales.",
  },
];

export const pageDescriptions = {
  home: "Defensa penal estratégica para casos complejos en derecho penal económico, constitucional, político y financiero.",
  firma:
    "Firma jurídica premium enfocada en defensa penal compleja, litigio estratégico y casos de alto impacto.",
  areas:
    "Áreas de defensa penal especializada: derecho penal económico, delitos financieros, administración pública, constitucional penal y litigio estratégico.",
  penal:
    "Derecho Penal Económico para casos donde empresa, patrimonio, reputación y libertad están bajo riesgo.",
  academia:
    "Academia de Derecho Penal y Litigio Estratégico para formación avanzada de abogados, estudiantes y profesionales.",
  eventos:
    "Eventos, seminarios y masterclass de alto nivel en derecho penal económico y litigio estratégico.",
  blog: "Análisis penal estratégico sobre derecho penal económico, delitos financieros, lavado de activos y litigio penal.",
  contacto:
    "Solicite una evaluación estratégica para investigaciones penales, audiencias próximas o conflictos con riesgo penal.",
};

export function whatsappHref(message: string) {
  const encoded = encodeURIComponent(message);
  const number = whatsappNumber;
  return `https://wa.me/${number}?text=${encoded}`;
}

export const contactMessage =
  "Hola, deseo solicitar una evaluación estratégica de mi caso con Dr. Fausto Vásquez — Estudio Jurídico.";
