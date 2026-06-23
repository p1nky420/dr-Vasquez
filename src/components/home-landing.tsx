"use client";

import { useRef } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  GraduationCap,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Mic2,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EditorialReveal, MaskReveal, ParallaxLayer } from "@/components/editorial-motion";
import { IntakeForm } from "@/components/intake-form";
import { SwipeableCard } from "@/components/swipeable-card";
import { SectionDivider } from "@/components/section-divider";
import { faqs } from "@/lib/home-content";
import { whatsappHref } from "@/lib/site";

const practices = [
  {
    number: "01",
    specialty: "Defensa especializada",
    title: "Derecho penal económico",
    text: "Cuando una investigación compromete empresa, patrimonio o reputación, cada decisión jurídica debe responder a una estrategia integral.",
    methodology: [
      "Análisis de exposición patrimonial y empresarial",
      "Identificación de responsabilidades individuales y corporativas",
      "Estrategia de mitigación de riesgos penales",
    ],
    publications: [
      "La responsabilidad penal de la persona jurídica en el COIP",
      "Lavado de activos: estándares probatorios y defensa técnica",
    ],
    href: "/derecho-penal-economico",
  },
  {
    number: "02",
    specialty: "Garantías fundamentales",
    title: "Litigio constitucional penal",
    text: "Protección sofisticada del debido proceso, la libertad y la tutela judicial efectiva frente a actuaciones que exceden los límites constitucionales.",
    methodology: [
      "Evaluación de vulneraciones al debido proceso",
      "Construcción de acciones constitucionales estratégicas",
      "Litigio ante cortes nacionales e internacionales",
    ],
    publications: [
      "El debido proceso como límite al poder punitivo",
      "Acción de protección en materia penal: criterios de procedencia",
    ],
    href: "/areas-de-practica",
  },
  {
    number: "03",
    specialty: "Alta complejidad",
    title: "Defensa penal estratégica",
    text: "Intervención técnica en expedientes complejos, audiencias críticas, recursos extraordinarios y asuntos con exposición institucional.",
    methodology: [
      "Arquitectura de teoría del caso desde la etapa investigativa",
      "Dirección técnica de audiencias y recursos estratégicos",
      "Acompañamiento integral en casos de alta exposición",
    ],
    publications: [
      "Punto de inflexión de la imputación objetiva en el COIP",
      "La falsedad documental en materia penal",
    ],
    href: "/areas-de-practica",
  },
];

const principles = [
  ["Estrategia individual", "Cada asunto se construye desde sus hechos, prueba, etapa procesal y nivel real de exposición."],
  ["Discreción absoluta", "La información se administra con criterio, canales controlados y estricto respeto al secreto profesional."],
  ["Dirección personal", "Los momentos decisivos reciben atención directa del abogado responsable de la arquitectura de defensa."],
  ["Rigor intelectual", "La dogmática penal no es teoría ornamental: es una herramienta concreta para cuestionar la imputación."],
];

const visionNodes = [
  {
    number: "I",
    country: "Ecuador",
    institution: "Universidad Central del Ecuador",
    title: "Los fundamentos.",
    description: "La formación jurídica inicia con el estudio riguroso del Derecho y sus principios fundamentales.",
    logo: "/university-uce.png",
  },
  {
    number: "II",
    country: "España",
    institution: "Universitat Pompeu Fabra",
    title: "La tradición.",
    description: "La influencia de una de las escuelas jurídicas más prestigiosas de Europa en el pensamiento penal contemporáneo.",
    logo: "/university-upf-transparent.png",
  },
  {
    number: "III",
    country: "Colombia",
    institution: "Universidad Externado de Colombia",
    title: "La interdisciplinariedad.",
    description: "La comprensión del fenómeno jurídico desde el derecho penal, el proceso y las garantías constitucionales.",
    logo: "/university-externado.svg",
  },
  {
    number: "IV",
    country: "México",
    institution: "Universidad del Golfo de México",
    title: "El conocimiento nunca concluye.",
    description: "Doctorado Honoris Causa y reconocimiento a una trayectoria dedicada al pensamiento jurídico.",
    logo: "/university-ugm-transparent.png",
  },
  {
    number: "V",
    country: "Academia",
    institution: "Academia Vásquez · Investigación permanente",
    title: "La transmisión del conocimiento.",
    description: "Espacio de enseñanza, conferencias, publicaciones y formación de nuevas generaciones jurídicas.",
    image: "/portrait-editorial-desk-v2.png",
  },
];

const process = [
  ["01", "Evaluación estratégica", "Comprensión inicial del asunto, su urgencia, jurisdicción y posibles conflictos de interés."],
  ["02", "Investigación preliminar", "Lectura jurídica y probatoria para identificar exposición, decisiones críticas y escenarios."],
  ["03", "Diseño de defensa", "Construcción de teoría del caso, estrategia de prueba y ruta de intervención procesal."],
  ["04", "Ejecución procesal", "Ejecución rigurosa, comunicación directa y revisión continua de la estrategia."],
];

const insights = [
  {
    type: "Obra jurídica",
    title: "Punto de inflexión de la imputación objetiva en el COIP",
    text: "Análisis doctrinal sobre los límites de atribución penal y su aplicación en el sistema ecuatoriano.",
    date: "2016",
    author: "Dr. Fausto Vásquez",
    readTime: "45 min",
    category: "Dogmática penal",
  },
  {
    type: "Obra jurídica",
    title: "La falsedad documental en materia penal",
    text: "Estudio sobre verdad documental, relevancia probatoria y responsabilidad penal.",
    date: "2018",
    author: "Dr. Fausto Vásquez",
    readTime: "30 min",
    category: "Derecho probatorio",
  },
  {
    type: "Análisis",
    title: "Responsabilidad penal de la persona jurídica",
    text: "Claves para comprender la exposición penal de organizaciones, administradores y órganos de decisión.",
    date: "2023",
    author: "Dr. Fausto Vásquez",
    readTime: "20 min",
    category: "Derecho penal económico",
  },
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[0.64rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.26em] ${dark ? "text-[#8a6941]" : "text-[#ecc058]"}`}>
      <span className={`h-px w-9 ${dark ? "bg-[#8a6941]" : "bg-[#ecc058]"}`} />
      {children}
    </p>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <EditorialReveal className="max-w-4xl">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2 className={`mt-6 max-w-4xl font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.15] tracking-[0.01em] ${dark ? "text-[#15130f]" : "text-[#f3eee4]"}`}>
        {title}
      </h2>
      {text ? (
        <p className={`mt-7 max-w-2xl text-[0.98rem] leading-[1.9] md:text-[1.06rem] ${dark ? "text-[#514b43]]" : "text-[#c2baae]"}`}>
          {text}
        </p>
      ) : null}
    </EditorialReveal>
  );
}

export function HomeLanding() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 0.92], [0, 1]);

  return (
    <div className="overflow-hidden bg-[#0a0908] text-[#f3eee4]">
      <section id="inicio" className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[#080706]" />
        <div className="pointer-events-none absolute right-[5%] top-[15%] w-[28%] opacity-[0.12]">
          <Image src="/logoFV-solo.png" alt="" width={826} height={644} className="w-full h-auto" />
        </div>
        <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_28%_45%,rgba(201,173,120,.065),transparent_32%)] lg:w-[56%]" />
        <ParallaxLayer className="absolute -top-12 bottom-[-8rem] right-0 w-full lg:w-[51%]">
          <Image
            src="/portrait-editorial-authority-v2.png"
            alt="Dr. Fausto Vásquez, jurista penalista ecuatoriano"
            fill
            priority
            loading="eager"
            sizes="(min-width: 1024px) 51vw, 100vw"
            className="object-cover object-[52%_18%] contrast-[1.08] saturate-[0.88] lg:object-[50%_16%]"
          />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,4,.97)_0%,rgba(5,5,4,.91)_50%,rgba(5,5,4,.42)_72%,rgba(5,5,4,.18)_100%)] lg:bg-[linear-gradient(90deg,#080706_0%,#080706_47%,rgba(8,7,6,.93)_51%,rgba(8,7,6,.22)_63%,rgba(8,7,6,.02)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,4,.24)_0%,transparent_52%,rgba(5,5,4,.28)_78%,#0a0908_100%)] lg:bg-[linear-gradient(180deg,rgba(5,5,4,.16)_0%,transparent_62%,rgba(5,5,4,.34)_86%,#0a0908_100%)]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-[94rem] items-end px-5 pb-12 pt-32 md:px-8 md:pb-20 lg:items-center lg:pb-10">
          <div className="max-w-[45rem] lg:ml-[2vw]">
            <EditorialReveal>
              <p className="text-[0.64rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#ecc058]">
                Jurista penalista · Ecuador
              </p>
            </EditorialReveal>
            <h1 className="hero-title mt-6 font-serif text-[clamp(3.35rem,12vw,7.25rem)] leading-[0.92] tracking-[-0.02em]">
              <MaskReveal>Derecho penal</MaskReveal>
              <MaskReveal delay={0.1} className="text-[#ecc058]">más allá</MaskReveal>
              <MaskReveal delay={0.2}>del litigio.</MaskReveal>
            </h1>
            <EditorialReveal delay={0.3}>
              <p className="mt-6 max-w-xl text-[0.98rem] leading-[1.95] tracking-[0.02em] text-[#eee7dc] md:text-[1.06rem]">
                Inteligencia jurídica, excelencia académica y estrategia procesal para proteger libertad, patrimonio y reputación.
              </p>
            </EditorialReveal>
            <EditorialReveal delay={0.34}>
              <p className="mt-5 text-[0.55rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-[#ecc058]/70">
                Profesor <span className="mx-2 text-[#ecc058]/30">·</span> Investigador <span className="mx-2 text-[#ecc058]/30">·</span> Autor
              </p>
            </EditorialReveal>
            <EditorialReveal delay={0.36}>
              <div className="mt-7 grid max-w-2xl gap-4 sm:grid-cols-[1fr_1.18fr_0.9fr] sm:gap-6">
                {[
                  ["Doctor en", "Jurisprudencia"],
                  ["Derecho Penal", "Económico"],
                  ["Profesor e", "Investigador"],
                ].map(([firstLine, secondLine]) => (
                  <div key={secondLine}>
                    <p className="text-[0.62rem] max-sm:text-[0.65rem] font-semibold uppercase leading-[1.75] tracking-[0.16em] text-[#e2dbd0]">
                      <span className="block">{firstLine}</span>
                      <span className="block text-[#fffaf0]">{secondLine}</span>
                    </p>
                  </div>
                ))}
              </div>
            </EditorialReveal>
            <EditorialReveal delay={0.44} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#consulta" className="premium-button group">
                Solicitar consulta privada
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#legado" className="premium-button premium-button--ghost group">
                Explorar trayectoria
                <ArrowDownRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </EditorialReveal>
          </div>
        </div>

        <EditorialReveal delay={0.62} className="absolute bottom-[5rem] right-[4vw] hidden text-right lg:block">
          <div className="rounded-sm bg-black/28 px-5 py-4 backdrop-blur-[3px]">
            <p className="font-serif text-xl text-[#fffaf0]">Dr. Fausto Vásquez</p>
            <p className="mt-1.5 text-[0.52rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#ecc058]">
              Dirección personal de la defensa
            </p>
          </div>
        </EditorialReveal>
      </section>

      <SectionDivider />

      <section id="legado" className="bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-36">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-24">
            <EditorialReveal className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#d8cebe]">
                <Image
                  src="/portrait-editorial-quito-v2.png"
                  alt="Retrato editorial del Dr. Fausto Ramiro Vásquez Cevallos"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover object-[center_20%] grayscale-[15%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(20,17,12,.44)_100%)]" />
                <p className="absolute bottom-6 left-6 right-6 border-t border-white/35 pt-4 text-[0.6rem] max-sm:text-[0.65rem] uppercase tracking-[0.22em] text-white/80">
                  Jurista · Docente · Autor · Estratega
                </p>
              </div>
              <div className="absolute -bottom-5 -right-5 hidden size-32 border border-[#8a6941]/30 md:block" />
            </EditorialReveal>

            <div>
              <SectionIntro
                eyebrow="El legado"
                title="Una vida dedicada al pensamiento penal."
                text="La trayectoria del Dr. Fausto Vásquez une el ejercicio de la defensa con la investigación, la docencia y la producción jurídica. Su método parte de una convicción: los asuntos complejos exigen comprender el derecho con profundidad antes de actuar con precisión."
                dark
              />
              <EditorialReveal delay={0.12}>
                <blockquote className="mt-10 border-y border-[#15130f]/20 py-8 font-serif text-2xl leading-snug tracking-[-0.02em] md:text-3xl">
                  “La defensa eficaz no comienza en la audiencia. Comienza en la comprensión exacta del problema.”
                </blockquote>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {["Dogmática penal aplicada", "Litigación oral estratégica", "Dirección académica", "Análisis de casos complejos"].map((item) => (
                    <p key={item} className="flex items-center gap-3 text-[0.82rem] leading-6 uppercase tracking-[0.11em] text-[#4f4941]">
                      <Check size={14} className="text-[#8a6941]" /> {item}
                    </p>
                  ))}
                </div>
                <div className="mt-10 grid gap-px divide-y divide-[#15130f]/10 border-t border-b border-[#15130f]/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
                  {[
                    { stat: "20+", label: "años de experiencia" },
                    { stat: "Profesor", label: "universitario" },
                    { stat: "Autor", label: "publicaciones jurídicas" },
                    { stat: "Formación", label: "internacional" },
                  ].map(({ stat, label }) => (
                    <div key={label} className="py-5 text-center sm:py-6">
                      <p className="font-serif text-2xl tracking-tight text-[#15130f] md:text-3xl">{stat}</p>
                      <p className="mt-1 text-[0.6rem] max-sm:text-[0.65rem] uppercase tracking-[0.16em] text-[#6d655b]">{label}</p>
                    </div>
                  ))}
                </div>
                <Link href="/firma" className="mt-10 inline-flex items-center gap-3 border-b border-[#8a6941] pb-2 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-[#6f512f]">
                  Conocer el perfil profesional <ArrowRight size={14} />
                </Link>
              </EditorialReveal>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="trayectoria" ref={sectionRef} className="relative bg-[#080706] px-5 md:px-8">
        {/* Artisanal paper texture */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,173,120,0.018),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(201,173,120,0.012),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        <div className="relative mx-auto max-w-[94rem]">
          {/* Intro */}
          <div className="pt-24 md:pt-36 pb-8 md:pb-16">
            <EditorialReveal>
              <p className="text-[0.64rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#ecc058]">
                Trayectoria
              </p>
              <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.15] tracking-[0.01em] text-[#f3eee4]">
                La construcción de una visión jurídica.
              </h2>
              <p className="mt-6 max-w-2xl text-[0.98rem] leading-[1.95] tracking-[0.02em] text-[#c2baae]">
                Una trayectoria desarrollada entre distintas tradiciones académicas, escuelas de pensamiento e investigación permanente.
              </p>
            </EditorialReveal>
          </div>

          {/* Timeline */}
          <div className="relative pb-24 md:pb-36">
            {/* Organic line SVG */}
            <svg
              className="absolute left-[2%] top-0 h-full w-full md:left-[6%]"
              viewBox="0 0 100 500"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M 8,15 C 8,35 14,40 8,60 S 4,120 8,160 S 14,220 8,260 S 4,320 8,360 S 8,420 8,480"
                stroke="#ecc058"
                strokeWidth={0.5}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: lineProgress }}
              />
              {[
                { cx: 8, cy: 60 },
                { cx: 8, cy: 160 },
                { cx: 8, cy: 260 },
                { cx: 8, cy: 360 },
                { cx: 8, cy: 460 },
              ].map((dot, i) => (
                <circle key={i} cx={dot.cx} cy={dot.cy} r={2} fill="#ecc058" opacity={0.9} />
              ))}
            </svg>

            {/* Nodes */}
            {visionNodes.map((node, i) => (
              <motion.div
                key={node.number}
                className="relative min-h-[50vh] md:min-h-[80vh] flex items-center py-12 md:py-20"
                initial={{ opacity: 0.08 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Gold glow on active node */}
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, margin: "-20% 0px -20% 0px" }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse,rgba(201,173,120,0.06),transparent_65%)]" />
                </motion.div>

                <div className="relative z-10 w-full pl-[18%] md:pl-[24%]">
                  <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-12">
                    {/* Roman numeral */}
                    <div className="md:text-right md:w-32">
                      <p className="font-serif text-[5rem] leading-[0.78] tracking-[-0.08em] text-[#ecc058]/20 md:text-[10rem]">
                        {node.number}
                      </p>
                    </div>

                    {/* Content */}
                    <div className="max-w-2xl">
                      {/* Institution header with logo */}
                      <div className="flex items-center gap-4 flex-wrap md:gap-6">
                        {node.logo ? (
                          <div className="relative h-10 w-28 shrink-0 md:h-14 md:w-40">
                            <Image src={node.logo} alt="" fill className="object-contain object-left" sizes="160px" />
                          </div>
                        ) : (
                          <span className="font-serif text-[0.85rem] font-bold tracking-[0.1em] text-[#ecc058] md:text-[1rem]">
                            AV
                          </span>
                        )}
                        <div>
                          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#ecc058] md:text-[0.85rem]">
                            {node.institution}
                          </p>
                          <p className="mt-0.5 text-[0.55rem] max-sm:text-[0.65rem] uppercase tracking-[0.22em] text-[#8a7351]">
                            {node.country}
                          </p>
                        </div>
                      </div>

                      <h3 className="mt-8 font-serif text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[1.02] tracking-[-0.04em] text-[#f3eee4]">
                        {node.title}
                      </h3>
                      {node.description ? (
                        <p className="mt-6 max-w-xl text-[1rem] leading-[1.9] text-[#c2baae]">
                          {node.description}
                        </p>
                      ) : null}

                      {node.image ? (
                        <div className="mt-10 relative h-40 w-full max-w-xs overflow-hidden rounded-sm opacity-50">
                          <Image src={node.image} alt="" fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-r from-[#080706] via-transparent to-transparent" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="legado-academico" className="relative bg-[#0e0c0a] px-5 py-16 md:px-8 md:py-32 overflow-hidden ">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(201,173,120,0.08),transparent_50%)]" />
        <div className="pointer-events-none absolute right-[-10%] top-1/2 -translate-y-1/2 w-[45%] opacity-[0.12] md:w-[35%]">
          <Image src="/logoFV-solo.png" alt="" width={826} height={644} className="w-full h-auto" />
        </div>
        <div className="relative mx-auto max-w-[88rem]">
          <EditorialReveal>
            <p className="text-[0.55rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#ecc058]">Legado académico</p>
            <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.15] tracking-[0.01em] text-[#f3eee4]">
              Una voz jurídica construida desde la academia.
            </h2>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.95] tracking-[0.02em] text-[#c2baae]">
              El pensamiento no se improvisa. Se forma, se publica, se enseña y se comparte. El Dr. Fausto Vásquez ha construido su carrera sobre cuatro pilares académicos.
            </p>
          </EditorialReveal>

          <div className="mt-16 grid gap-px bg-[#ecc058]/10 md:grid-cols-4 sm:snap-scroll">
            {[
              { number: "15+", label: "años", role: "Profesor universitario", desc: "Docencia en pregrado y posgrado en universidades ecuatorianas y extranjeras." },
              { number: "12+", label: "conferencias", role: "Conferencista", desc: "Ponencias en congresos, foros y seminarios nacionales e internacionales de ciencias penales." },
              { number: "02", label: "obras publicadas", role: "Autor", desc: "Libros y artículos jurídicos sobre imputación objetiva, falsedad documental y derecho penal económico." },
              { number: "Perm.", label: "continua", role: "Investigador", desc: "Producción jurídica permanente y análisis doctrinal aplicado a la defensa estratégica." },
            ].map((item) => (
              <EditorialReveal key={item.role} className="bg-[#0e0c0a]/90 p-6 sm:p-8 md:p-10">
                <p className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tracking-[0.01em] text-[#ecc058]">{item.number}</p>
                <p className="mt-1 text-[0.55rem] max-sm:text-[0.65rem] uppercase tracking-[0.22em] text-[#ecc058]/50">{item.label}</p>
                <p className="mt-6 font-serif text-xl text-[#f3eee4] md:text-2xl">{item.role}</p>
                <p className="mt-3 text-[0.88rem] leading-relaxed text-[#c2baae]">{item.desc}</p>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="practica" className="bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-36">
        <div className="mx-auto max-w-[88rem]">
          <SectionIntro
            eyebrow="Práctica estratégica"
            title="Defensa diseñada para asuntos de máxima consecuencia."
            text="No son servicios estándar. Son arquitecturas jurídicas construidas para escenarios donde una decisión incorrecta puede alterar libertad, patrimonio, empresa o legado."
            dark
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-3 sm:snap-scroll">
            {practices.map((practice, index) => (
              <EditorialReveal key={practice.title} delay={index * 0.08}>
                <SwipeableCard href={practice.href}>
                  <Link href={practice.href} className="group flex min-h-[28rem] flex-col border border-[#15130f]/15 bg-[#f3ede3] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(21,19,15,0.12)] sm:p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-5xl leading-[0.95] tracking-[0.01em] text-[#15130f]/10">{practice.number}</span>
                    <ArrowDownRight className="text-[#8a6941] transition-transform group-hover:translate-x-1 group-hover:translate-y-1" size={18} />
                  </div>

                  <div className="mt-10 flex-1">
                    <p className="text-[0.58rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#8a6941]">{practice.specialty}</p>
                    <h3 className="mt-4 font-serif text-3xl leading-[1.04] tracking-[-0.04em] text-[#15130f] md:text-4xl">{practice.title}</h3>
                    <p className="mt-5 text-[0.9rem] leading-[1.9] tracking-[0.02em] text-[#514b43]">{practice.text}</p>

                    <div className="mt-8 space-y-3 border-t border-[#15130f]/10 pt-7">
                      <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#8a6941]">Metodología</p>
                      <ul className="space-y-2">
                        {practice.methodology.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[0.82rem] leading-relaxed text-[#514b43]]">
                            <span className="mt-2 h-px w-4 shrink-0 bg-[#8a6941]/50" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 space-y-2">
                      <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#8a6941]">Publicaciones relacionadas</p>
                      {practice.publications.map((pub) => (
                        <p key={pub} className="flex items-center gap-2 text-[0.7rem] leading-snug text-[#6f512f] underline decoration-[#8a6941]/30 underline-offset-2">
                          <span className="size-1 rounded-full bg-[#8a6941]/40 shrink-0" />
                          {pub}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
                </SwipeableCard>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="metodo" className="relative bg-[#15120f] px-5 py-16 md:px-8 md:py-36 overflow-hidden ">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(201,173,120,0.07),transparent_40%)]" />
        <div className="pointer-events-none absolute left-[5%] top-[10%] w-[25%] opacity-[0.1]">
          <Image src="/logoFV-solo.png" alt="" width={826} height={644} className="w-full h-auto" />
        </div>
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <SectionIntro
                eyebrow="El estándar"
                title="La diferencia está en cómo se piensa el caso."
                text="La representación de alto nivel exige una combinación poco común: profundidad doctrinal, experiencia procesal, capacidad de anticipación y comunicación directa."
              />
              <EditorialReveal delay={0.12}>
                <div className="mt-10 flex items-center gap-4 border-l border-[#ecc058] pl-5">
                  <ShieldCheck className="shrink-0 text-[#ecc058]" size={24} />
                  <p className="text-[0.8rem] uppercase leading-7 tracking-[0.14em] text-[#c8c0b5]">Admisión selectiva · Conflicto de interés · Secreto profesional</p>
                </div>
              </EditorialReveal>
            </div>
            <div className="grid border-t border-[#ecc058]/20 sm:grid-cols-2">
              {principles.map(([title, text], index) => (
                <EditorialReveal key={title} delay={index * 0.06} className="border-b border-[#ecc058]/20 p-7 sm:min-h-64 sm:[&:nth-child(odd)]:border-r md:p-9">
                  <span className="font-serif text-2xl text-[#ecc058]/55">0{index + 1}</span>
                  <h3 className="mt-10 font-serif text-2xl">{title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-[1.85] text-[#c2baae]">{text}</p>
                </EditorialReveal>
              ))}
            </div>
          </div>

          <EditorialReveal delay={0.24} className="relative mt-20 border-t border-[#ecc058]/12 pt-16 md:mt-28 md:pt-20">
            <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 bg-[#15120f] px-6 text-[0.58rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#ecc058]/50">
              Método de trabajo
            </div>
            <div className="grid gap-8 md:grid-cols-4 md:gap-0">
              {[
                { step: "01", label: "Investigación", desc: "Comprensión profunda del asunto, su contexto jurídico y los intereses en juego antes de cualquier decisión." },
                { step: "02", label: "Análisis", desc: "Identificación de exposición, valoración de prueba, derecho aplicable y escenarios procesales posibles." },
                { step: "03", label: "Estrategia", desc: "Arquitectura de teoría del caso, diseño de defensa y ruta de intervención ajustada al expediente." },
                { step: "04", label: "Litigio", desc: "Representación directa en audiencia, recursos y ejecución de la estrategia con dirección personal." },
              ].map((item, i) => (
                <div key={item.label} className="relative flex gap-5 md:flex-col md:gap-0 md:px-8">
                  {i < 3 ? (
                    <div className="pointer-events-none absolute left-[1.125rem] top-12 bottom-0 w-px bg-gradient-to-b from-[#ecc058]/25 to-transparent md:left-1/2 md:top-auto md:-right-4 md:bottom-auto md:h-px md:w-full md:from-transparent md:via-[#ecc058]/25 md:to-transparent" />
                  ) : null}
                  <div className="relative z-10 mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-[#ecc058]/30 bg-[#15120f] md:mx-auto md:mb-7 md:size-12">
                    <span className="font-serif text-[0.65rem] font-bold text-[#ecc058] md:text-[0.8rem]">{item.step}</span>
                  </div>
                  <div className="md:text-center">
                    <p className="font-serif text-xl font-medium text-[#f3eee4] md:text-2xl">{item.label}</p>
                    <p className="mt-2 max-w-sm text-[0.82rem] leading-relaxed text-[#c2baae] md:mx-auto md:text-[0.88rem]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </EditorialReveal>
        </div>
      </section>\n
      <SectionDivider />

      <section id="conocimiento" className="bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-36">
        <div className="mx-auto max-w-[88rem]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              eyebrow="Centro de pensamiento penal"
              title="Biblioteca Jurídica Vásquez"
              text="Publicaciones, análisis y espacios académicos que convierten conocimiento especializado en una fuente pública de criterio jurídico."
              dark
            />
            <Link href="/blog" className="inline-flex shrink-0 items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#6f512f]">
              Explorar biblioteca <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-16 grid gap-px bg-[#15130f]/10 lg:grid-cols-3">
            {insights.map((item, index) => (
              <EditorialReveal key={item.title} delay={index * 0.06}>
                <article className="flex min-h-[22rem] flex-col bg-[#f3ede3] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(21,19,15,0.1)] md:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 items-center justify-center rounded border border-[#8a6941]/30 bg-white/60 text-[0.45rem] max-sm:text-[0.65rem] font-bold uppercase tracking-wider text-[#8a6941]">
                        {item.category.split(" ").map(w => w[0]).join("").slice(0, 2)}
                      </span>
                      <span className="text-[0.5rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#8a6941]">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[0.45rem] max-sm:text-[0.65rem] uppercase tracking-[0.15em] text-[#8a6941]/60">
                      <span>{item.readTime}</span>
                      <span className="h-3 w-px bg-[#8a6941]/20" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <div className="mt-10 flex-1">
                    <div className="mb-3 flex items-center gap-2">
                      <BookOpen size={13} className="text-[#8a6941]" strokeWidth={1.5} />
                      <span className="text-[0.5rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#8a6941]">{item.type}</span>
                    </div>
                    <h3 className="font-serif text-2xl leading-tight tracking-[-0.03em] md:text-3xl">{item.title}</h3>
                    <p className="mt-4 text-[0.9rem] leading-[1.8] text-[#514b43]]">{item.text}</p>
                  </div>

                  <div className="mt-8 flex items-center gap-3 border-t border-[#15130f]/8 pt-5 text-[0.6rem] max-sm:text-[0.65rem] text-[#6f512f]">
                    <div className="flex size-6 items-center justify-center rounded-full bg-[#8a6941]/10 font-serif text-[0.5rem] max-sm:text-[0.65rem] font-bold text-[#8a6941]">FV</div>
                    {item.author}
                  </div>
                </article>
              </EditorialReveal>
            ))}
          </div>
          <EditorialReveal className="mt-5 grid gap-5 md:grid-cols-[1.25fr_0.75fr]">
            <div className="relative min-h-80 overflow-hidden bg-[#15130f] p-8 text-[#f3eee4] md:p-10">
              <Image src="/practice-consulting-dossier-v1.png" alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover opacity-35" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#15130f] via-[#15130f]/90 to-transparent" />
              <div className="relative max-w-lg">
                <p className="text-[0.58rem] max-sm:text-[0.65rem] uppercase tracking-[0.22em] text-[#ecc058]">Conferencias y análisis</p>
                <h3 className="mt-5 font-serif text-4xl">Una voz jurídica para la academia y la conversación pública.</h3>
                <p className="mt-5 text-[0.98rem] leading-[1.85] text-[#c8c0b5]">Conferencias, entrevistas, formación avanzada y análisis audiovisual sobre ciencias penales.</p>
              </div>
            </div>
            <div className="flex min-h-80 flex-col justify-between border border-[#15130f]/20 p-8 md:p-10">
              <Quote className="text-[#8a6941]" size={30} />
              <p className="font-serif text-2xl leading-snug">El conocimiento jurídico adquiere valor cuando permite comprender mejor el conflicto y decidir con responsabilidad.</p>
            </div>
          </EditorialReveal>
        </div>
      </section>

      <SectionDivider />

      <section id="proceso" className="relative bg-[#0c0b09] px-5 py-16 md:px-8 md:py-36 overflow-hidden ">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,173,120,.08),transparent_28%)]" />
        <div className="pointer-events-none absolute left-[5%] top-[20%] w-[25%] opacity-[0.1]">
          <Image src="/logoFV-solo.png" alt="" width={826} height={644} className="w-full h-auto" />
        </div>
        <div className="relative mx-auto max-w-[88rem]">
          <SectionIntro
            eyebrow="Proceso privado"
            title="Claridad desde la primera conversación."
            text="Un proceso de admisión serio, discreto y diseñado para convertir incertidumbre en decisiones jurídicas concretas."
          />
          <div className="mt-16 grid border-l border-t border-[#ecc058]/20 lg:grid-cols-4 sm:snap-scroll">
            {process.map(([number, title, text], index) => (
              <EditorialReveal key={number} delay={index * 0.07} className="border-b border-r border-[#ecc058]/20">
                <article className="flex min-h-[18rem] flex-col justify-between p-6 sm:p-7 md:p-8">
                  <span className="font-serif text-4xl text-[#ecc058]">{number}</span>
                  <div>
                    <h3 className="font-serif text-2xl">{title}</h3>
                    <p className="mt-4 text-[0.98rem] leading-[1.85] text-[#c2baae]">{text}</p>
                  </div>
                </article>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="pensamiento-juridico" className="relative overflow-hidden bg-[#e9e1d4] px-5 py-16 text-[#15130f] md:px-8 md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(138,105,65,.13),transparent_28%),linear-gradient(90deg,transparent_49.9%,rgba(21,19,15,.08)_50%,transparent_50.1%)]" />
        <div className="pointer-events-none absolute -right-12 top-12 font-serif text-[16rem] leading-none tracking-[-0.1em] text-[#8a6941]/[0.045] md:text-[28rem]" aria-hidden="true">
          FV
        </div>

        <div className="relative mx-auto max-w-[92rem]">
          <EditorialReveal>
            <p className="text-[0.64rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8a6941]">
              Pensamiento jurídico
            </p>
            <blockquote className="mt-8 max-w-[88rem] font-serif text-[clamp(3rem,7.4vw,8.5rem)] leading-[1] tracking-[0.01em]">
              El derecho penal no se ejerce únicamente en los tribunales.
              <span className="mt-2 block text-[#8a6941]">
                Se construye desde la investigación, el análisis y la estrategia.
              </span>
            </blockquote>
          </EditorialReveal>

          <EditorialReveal delay={0.12} className="mx-auto mt-16 max-w-4xl border-t border-b border-[#8a6941]/15 py-12 md:mt-20 md:py-16">
            <p className="text-[0.55rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8a6941]">Manifiesto</p>
            <p className="mt-8 font-serif text-[1.05rem] leading-[2] tracking-[0.02em] text-[#4a443c] md:text-[1.15rem]">
              En un tiempo donde el discurso jurídico se ha simplificado hasta volverse operativo, este despacho sostiene que la defensa penal no puede reducirse a una técnica de litigación. Es, ante todo, un ejercicio de pensamiento.
            </p>
            <p className="mt-5 font-serif text-[1.05rem] leading-[2] tracking-[0.02em] text-[#4a443c] md:text-[1.15rem]">
              Cada asunto que asumimos se construye desde la lectura crítica del derecho, el análisis riguroso de la prueba y la comprensión del contexto institucional donde se decide. No hay estrategia sin teoría. No hay litigio sin fundamento.
            </p>
            <p className="mt-5 font-serif text-[1.05rem] leading-[2] tracking-[0.02em] text-[#4a443c] md:text-[1.15rem]">
              Creemos en una abogacía que investiga, publica, enseña y piensa antes de actuar. Porque la libertad, el patrimonio y la reputación de quienes confían en nosotros no merecen menos que la excelencia del conocimiento puesto al servicio de la defensa.
            </p>
          </EditorialReveal>

          <div className="mt-20 grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
            <EditorialReveal className="relative min-h-[38rem] overflow-hidden bg-[#15120f] text-[#f3eee4]">
              <Image
                src="/portrait-editorial-desk-v2.png"
                alt="Dr. Fausto Vásquez durante una sesión de análisis jurídico"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,.08),rgba(10,9,8,.2)_40%,rgba(10,9,8,.94)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-11">
                <p className="text-[0.58rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#ecc058]">
                  Investigación y método
                </p>
                <h3 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.03] tracking-[-0.04em] md:text-6xl">
                  La doctrina como herramienta concreta de defensa.
                </h3>
                <p className="mt-6 max-w-2xl text-[1rem] leading-[1.9] text-[#cec6ba]">
                  Estudio de la imputación, la prueba y las garantías para transformar complejidad jurídica en decisiones estratégicas.
                </p>
              </div>
            </EditorialReveal>

            <div className="grid gap-5">
              <EditorialReveal delay={0.08} className="h-full">
                <div className="flex h-full flex-col border border-[#15130f]/20 bg-[#f3ede3] p-8 md:p-10">
                  <div className="flex items-center gap-3 border-b border-[#8a6941]/15 pb-5">
                    <BookOpen className="text-[#8a6941]" size={18} strokeWidth={1.4} />
                    <span className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">Libros</span>
                    <span className="ml-auto text-[0.45rem] max-sm:text-[0.65rem] uppercase tracking-[0.15em] text-[#8a6941]/50">02 obras</span>
                  </div>
                  <div className="mt-6 space-y-6 flex-1">
                    {[
                      { title: "Punto de inflexión de la imputación objetiva en el COIP", year: "2016", desc: "Análisis doctrinal sobre los límites de atribución penal en el sistema ecuatoriano." },
                      { title: "La falsedad documental en materia penal", year: "2018", desc: "Estudio sobre verdad documental, relevancia probatoria y responsabilidad penal." },
                    ].map((book) => (
                      <div key={book.title} className="group border-l-2 border-[#8a6941]/25 pl-4 transition-colors hover:border-[#8a6941]">
                        <p className="font-serif text-lg leading-snug tracking-[-0.02em] md:text-xl">{book.title}</p>
                        <p className="mt-2 text-[0.78rem] leading-relaxed text-[#514b43]]">{book.desc}</p>
                        <p className="mt-2 text-[0.5rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/60">{book.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </EditorialReveal>

              <div className="grid gap-5 sm:grid-cols-2">
                <EditorialReveal delay={0.14}>
                  <div className="flex min-h-56 flex-col justify-between bg-[#15130f] p-7 text-[#f3eee4] md:p-8">
                    <div className="flex items-center justify-between">
                      <Mic2 size={18} strokeWidth={1.4} className="text-[#ecc058]" />
                      <span className="text-[0.45rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#ecc058]/60">+12 conferencias</span>
                    </div>
                    <div>
                      <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#ecc058]">Conferencias</p>
                      <h3 className="mt-3 font-serif text-2xl leading-tight">Ciencias penales y litigación oral.</h3>
                      <p className="mt-3 text-[0.78rem] leading-relaxed text-[#cec6ba]">Conferencias académicas en universidades, foros y centros de estudio especializados.</p>
                    </div>
                  </div>
                </EditorialReveal>
                <EditorialReveal delay={0.2}>
                  <div className="flex min-h-56 flex-col justify-between border border-[#15130f]/20 bg-[#f3ede3] p-7 md:p-8">
                    <div className="flex items-center justify-between">
                      <GraduationCap className="text-[#8a6941]" size={18} strokeWidth={1.4} />
                      <span className="text-[0.45rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/50">Artículos</span>
                    </div>
                    <div>
                      <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">Publicaciones</p>
                      <h3 className="mt-3 font-serif text-2xl leading-tight">Responsabilidad penal de la persona jurídica.</h3>
                      <p className="mt-3 text-[0.78rem] leading-relaxed text-[#514b43]]">Análisis sobre exposición penal de organizaciones, administradores y órganos de decisión.</p>
                    </div>
                  </div>
                </EditorialReveal>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <EditorialReveal delay={0.12}>
              <article className="flex min-h-80 flex-col justify-between border border-[#15130f]/20 p-8 md:p-10">
                <Quote className="text-[#8a6941]" size={30} strokeWidth={1.3} />
                <blockquote className="font-serif text-3xl leading-[1.18] tracking-[-0.025em] md:text-4xl">
                  “La defensa eficaz comienza en la comprensión exacta del problema.”
                </blockquote>
                <p className="text-[0.58rem] max-sm:text-[0.65rem] uppercase tracking-[0.2em] text-[#6d655b]">Fragmento editorial · Fausto Vásquez</p>
              </article>
            </EditorialReveal>
            <EditorialReveal delay={0.18}>
              <article className="relative min-h-80 overflow-hidden bg-[#15120f] text-[#f3eee4]">
                <Image
                  src="/eventos_bg.png"
                  alt="Archivo editorial de conferencias y formación jurídica"
                  fill
                  sizes="(min-width: 1024px) 64vw, 100vw"
                  className="object-cover opacity-50 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#15120f] via-[#15120f]/82 to-[#15120f]/28" />
                <div className="relative flex min-h-80 max-w-xl flex-col justify-end p-8 md:p-10">
                  <p className="text-[0.58rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#ecc058]">
                    Archivo académico
                  </p>
                  <h3 className="mt-5 font-serif text-4xl leading-tight">Conferencias, entrevistas y formación avanzada.</h3>
                  <Link href="/eventos" className="mt-8 inline-flex items-center gap-3 text-[0.62rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#ecc058]">
                    Explorar actividad académica <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </EditorialReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="consulta" className="bg-[#15120f] px-5 py-16 md:px-8 md:py-36 relative overflow-hidden ">
        {/* Decorative elements representing private safe room */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(184,155,94,0.06),transparent_50%)] pointer-events-none" />
        
        <div className="mx-auto max-w-[88rem] relative z-10">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <SectionIntro
                eyebrow="Consulta privada"
                title="Todo asunto importante comienza con una conversación confidencial."
                text="Comparta únicamente la información inicial necesaria. Antes de recibir documentos o detalles sensibles, la firma verificará disponibilidad y posibles conflictos de interés."
              />
              
              <EditorialReveal delay={0.08} className="mt-8 space-y-5 border-l border-[#ecc058]/30 pl-5">
                <div className="flex gap-3 items-start text-[0.92rem] leading-[1.85] tracking-[0.02em] text-[#e8e2d5]">
                  <span className="text-[#ecc058] mt-1.5 shrink-0 size-1.5 rounded-full bg-[#ecc058]" />
                  <p>
                    <strong className="text-[#ecc058] font-medium">Atención exclusiva:</strong> Su caso será atendido directamente por el Dr. Fausto Vásquez.
                  </p>
                </div>
                <div className="flex gap-3 items-start text-[0.92rem] leading-[1.85] tracking-[0.02em] text-[#e8e2d5]">
                  <span className="text-[#ecc058] mt-1.5 shrink-0 size-1.5 rounded-full bg-[#ecc058]" />
                  <p>
                    <strong className="text-[#ecc058] font-medium">Secreto Profesional:</strong> Toda información compartida será tratada bajo estricta confidencialidad profesional.
                  </p>
                </div>
              </EditorialReveal>

              {/* Insignia de Privacidad */}
              <EditorialReveal delay={0.1} className="mt-10 flex items-center gap-4 border border-[#ecc058]/25 bg-[#ecc058]/[0.03] p-5 rounded-sm">
                <div className="size-12 rounded-full border border-[#ecc058]/30 flex items-center justify-center bg-[#15120f] shrink-0">
                  <svg className="size-6 text-[#ecc058]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[0.68rem] uppercase tracking-[0.2em] text-[#ecc058] font-semibold">Garantía Constitucional</h4>
                  <p className="text-[0.62rem] max-sm:text-[0.65rem] text-[#bbb2a6] mt-0.5 uppercase tracking-wider">Admisión Selectiva bajo Secreto Profesional</p>
                </div>
              </EditorialReveal>

              <EditorialReveal delay={0.12} className="mt-10 grid gap-5">
                <a href={whatsappHref("Hola, deseo agendar una llamada privada de evaluación confidencial con el Dr. Fausto Vásquez.")} target="_blank" rel="noreferrer" className="contact-line hover:border-[#ecc058]/50 transition-all duration-300">
                  <MessageCircle size={18} />
                  <span><small>Llamada / WhatsApp privado</small>+593 98 307 6881</span>
                  <ChevronRight size={16} />
                </a>
                <div className="contact-line">
                  <MapPin size={18} />
                  <span><small>Oficina Quito</small>Av. 12 de Octubre y Lincoln · Torre 1492</span>
                </div>
                <div className="contact-line">
                  <LockKeyhole size={18} />
                  <span><small>Protocolo de ingreso</small>Filtro de admisión selectiva y confidencial</span>
                </div>
              </EditorialReveal>
            </div>
            
            <EditorialReveal delay={0.14}>
              <div className="consultation-vault-card p-6 md:p-9 rounded-sm border border-[#ecc058]/30">
                <div className="mb-8 flex items-center justify-between border-b border-[#ecc058]/18 pb-6">
                  <div>
                    <p className="text-[0.56rem] max-sm:text-[0.65rem] uppercase tracking-[0.22em] text-[#ecc058]">Solicitud de Evaluación Estratégica</p>
                    <h3 className="mt-2 font-serif text-2xl">Sala de Admisión Privada</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.55rem] max-sm:text-[0.65rem] uppercase tracking-wider text-[#8f877c] font-medium hidden sm:inline">Cifrado de Extremo a Extremo</span>
                    <LockKeyhole className="text-[#ecc058]" size={20} />
                  </div>
                </div>
                <IntakeForm />
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="faq" className="bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-32">
        <div className="mx-auto max-w-[72rem]">
          <SectionIntro eyebrow="Preguntas frecuentes" title="Información antes de iniciar." dark />
          <div className="mt-14 border-t border-[#15130f]/20">
            {faqs.map((faq, index) => (
              <EditorialReveal key={faq.question} delay={Math.min(index * 0.04, 0.4)}>
                <details className="group border-b border-[#15130f]/20 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl tracking-[0.02em] md:text-2xl">
                    {faq.question}
                    <span className="text-[#8a6941] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-5 text-[0.98rem] leading-[1.9] text-[#514b43]]">{faq.answer}</p>
                </details>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="publicaciones" className="relative bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-36 overflow-hidden">
        <div className="pointer-events-none absolute -left-[10%] top-1/2 -translate-y-1/2 w-[38%] opacity-[0.1] md:w-[28%]">
          <Image src="/logoFV-solo.png" alt="" width={826} height={644} className="w-full h-auto" />
        </div>
        <div className="mx-auto max-w-[88rem]">
          <EditorialReveal>
            <p className="text-[0.55rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8a6941]">Producción jurídica</p>
            <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.15] tracking-[0.01em] text-[#15130f]">
              Publicaciones y conferencias.
            </h2>
            <p className="mt-5 max-w-xl text-[0.95rem] leading-[1.85] text-[#514b43]]">
              Obras jurídicas, análisis doctrinal y participación académica que trascienden el expediente.
            </p>
          </EditorialReveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Books */}
            <EditorialReveal delay={0.06}>
              <div className="relative overflow-hidden border border-[#15130f]/15 bg-[#f3ede3]">
                <div className="absolute inset-0 opacity-[0.04]">
                  <Image src="/practice-consulting-dossier-v1.png" alt="" fill className="object-cover" />
                </div>
                <div className="relative p-8 md:p-10">
                  <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">Libros</p>
                  <div className="mt-8 grid gap-8">
                    <div className="flex gap-6">
                      <div className="relative h-40 w-28 shrink-0 overflow-hidden shadow-lg md:h-48 md:w-32">
                        <Image src="/practice-economic-glass-v1.png" alt="" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#15130f]/90 via-[#15130f]/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5">
                          <p className="text-[0.4rem] max-sm:text-[0.65rem] leading-tight text-[#ecc058]">Ergo Editores<br />2016</p>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-serif text-xl leading-snug md:text-2xl">Punto de inflexión de la imputación objetiva en el COIP</p>
                        <p className="mt-3 text-[0.78rem] leading-relaxed text-[#514b43]">Análisis doctrinal sobre los límites de atribución penal y su aplicación en el sistema ecuatoriano.</p>
                        <p className="mt-2 text-[0.5rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/60">Ergo Editores · 2016</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div className="relative h-40 w-28 shrink-0 overflow-hidden shadow-lg md:h-48 md:w-32">
                        <Image src="/practice-defense-marble-v1.png" alt="" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#15130f]/90 via-[#15130f]/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-2.5">
                          <p className="text-[0.4rem] max-sm:text-[0.65rem] leading-tight text-[#ecc058]">Publicación<br />2018</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-serif text-xl leading-snug md:text-2xl">La falsedad documental en materia penal</p>
                        <p className="mt-3 text-[0.78rem] leading-relaxed text-[#514b43]">Estudio sobre verdad documental, relevancia probatoria y responsabilidad penal.</p>
                        <p className="mt-2 text-[0.5rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/60">Publicación jurídica · 2018</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </EditorialReveal>

            {/* Conferences */}
            <EditorialReveal delay={0.1}>
              <div className="relative flex h-full flex-col overflow-hidden border border-[#15130f]/15">
                <div className="absolute inset-0">
                  <Image src="/eventos_bg.png" alt="" fill className="object-cover opacity-[0.06]" />
                </div>
                <div className="relative flex h-full flex-col bg-[#f3ede3]/95 p-8 backdrop-blur-sm md:p-10">
                  <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">Conferencias</p>
                  <div className="mt-8 flex-1 space-y-6">
                    {[
                      { title: "Ciencias penales y litigación oral", event: "Congreso Internacional de Derecho Penal", year: "2024" },
                      { title: "Imputación objetiva en el sistema ecuatoriano", event: "Universidad Central del Ecuador", year: "2023" },
                      { title: "Responsabilidad penal de la persona jurídica", event: "Foro de Derecho Empresarial", year: "2023" },
                      { title: "La prueba en el proceso penal", event: "Seminario de Litigación Oral", year: "2022" },
                    ].map((conf) => (
                      <div key={conf.title} className="border-l-2 border-[#8a6941]/25 pl-4 transition-colors hover:border-[#8a6941]">
                        <p className="font-serif text-base leading-snug md:text-lg">{conf.title}</p>
                        <p className="mt-1.5 text-[0.7rem] text-[#514b43]">{conf.event}</p>
                        <p className="mt-0.5 text-[0.45rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/50">{conf.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="relative min-h-[72vh] overflow-hidden px-5 py-16 md:px-8">
        <Image src="/quito_night.png" alt="Quito de noche" fill sizes="100vw" className="object-cover grayscale" />
        <div className="absolute inset-0 bg-[#080706]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,173,120,.16),transparent_35%)]" />
        <div className="relative mx-auto flex min-h-[55vh] max-w-5xl flex-col items-center justify-center text-center">
          <EditorialReveal>
            <p className="text-[0.62rem] max-sm:text-[0.65rem] uppercase tracking-[0.3em] text-[#ecc058]">Dr. Fausto Vásquez — Estudio Jurídico</p>
            <h2 className="mt-7 font-serif text-[clamp(3rem,9vw,7rem)] leading-[0.94] tracking-[-0.055em]">
              Su libertad, reputación y legado merecen una defensa estratégica.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-[0.98rem] leading-[1.9] text-[#c8c0b5] md:text-[1.06rem]">
              Consulte con un profesional dedicado a la excelencia, la discreción y los más altos estándares de defensa penal.
            </p>
            <a href="#consulta" className="premium-button mx-auto mt-9">
              Solicitar consulta privada <ArrowRight size={15} />
            </a>
          </EditorialReveal>
        </div>
      </section>
    </div>
  );
}
