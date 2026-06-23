"use client";

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
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EditorialReveal, MaskReveal, ParallaxLayer } from "@/components/editorial-motion";
import { IntakeForm } from "@/components/intake-form";
import { faqs } from "@/lib/home-content";
import { whatsappHref } from "@/lib/site";

const practices = [
  {
    number: "01",
    eyebrow: "Defensa especializada",
    title: "Derecho penal económico",
    text: "Cuando una investigación compromete empresa, patrimonio o reputación, cada decisión jurídica debe responder a una estrategia integral.",
    detail: "Lavado de activos · delitos financieros · responsabilidad empresarial",
    href: "/derecho-penal-economico",
    image: "/practice-economic-glass-v1.png",
  },
  {
    number: "02",
    eyebrow: "Garantías fundamentales",
    title: "Litigio constitucional penal",
    text: "Protección sofisticada del debido proceso, la libertad y la tutela judicial efectiva frente a actuaciones que exceden los límites constitucionales.",
    detail: "Hábeas corpus · acción de protección · debido proceso",
    href: "/areas-de-practica",
    image: "/real-reception.jpg",
  },
  {
    number: "03",
    eyebrow: "Alta complejidad",
    title: "Defensa penal estratégica",
    text: "Intervención técnica en expedientes complejos, audiencias críticas, recursos extraordinarios y asuntos con exposición institucional.",
    detail: "Investigación · juicio · apelación · casación",
    href: "/areas-de-practica",
    image: "/real-office-view.jpg",
  },
];

const principles = [
  ["Estrategia individual", "Cada asunto se construye desde sus hechos, prueba, etapa procesal y nivel real de exposición."],
  ["Discreción absoluta", "La información se administra con criterio, canales controlados y estricto respeto al secreto profesional."],
  ["Dirección personal", "Los momentos decisivos reciben atención directa del abogado responsable de la arquitectura de defensa."],
  ["Rigor intelectual", "La dogmática penal no es teoría ornamental: es una herramienta concreta para cuestionar la imputación."],
];

const journey = [
  {
    mark: "UCE",
    chapter: "I",
    logo: "/university-uce.png",
    logoClass: "object-contain p-4",
    flagColors: "linear-gradient(180deg,#f4d342 0 50%,#21468b 50% 75%,#b3262d 75%)",
    country: "Ecuador",
    location: "Quito, Ecuador",
    institution: "Universidad Central del Ecuador",
    degree: "Doctor en Jurisprudencia, abogado y formación de posgrado en Derecho Penal",
  },
  {
    mark: "UPF",
    chapter: "II",
    logo: "/university-upf-transparent.png",
    logoClass: "object-contain p-3",
    flagColors: "linear-gradient(180deg,#aa151b 0 25%,#f1bf00 25% 75%,#aa151b 75%)",
    country: "España",
    location: "Barcelona, España",
    institution: "Universitat Pompeu Fabra",
    degree: "Máster en Derecho Penal",
  },
  {
    mark: "UEC",
    chapter: "III",
    logo: "/university-externado.svg",
    logoClass: "object-contain p-3",
    flagColors: "linear-gradient(180deg,#fcd116 0 50%,#003893 50% 75%,#ce1126 75%)",
    country: "Colombia",
    location: "Bogotá, Colombia",
    institution: "Universidad Externado de Colombia",
    degree: "Estudios de maestría en Derecho Penal y Derecho Procesal Penal",
  },
  {
    mark: "UGM",
    chapter: "IV",
    logo: "/university-ugm-transparent.png",
    logoClass: "object-contain p-3",
    flagColors: "linear-gradient(90deg,#006847 0 33.33%,#f7f3ea 33.33% 66.66%,#ce1126 66.66%)",
    country: "México",
    location: "México",
    institution: "Universidad del Golfo de México",
    degree: "Doctor Honoris Causa",
  },
];

const process = [
  ["01", "Análisis confidencial", "Comprensión inicial del asunto, su urgencia, jurisdicción y posibles conflictos de interés."],
  ["02", "Diagnóstico estratégico", "Lectura jurídica y probatoria para identificar exposición, decisiones críticas y escenarios."],
  ["03", "Arquitectura de defensa", "Construcción de teoría del caso, estrategia de prueba y ruta de intervención procesal."],
  ["04", "Representación activa", "Ejecución rigurosa, comunicación directa y revisión continua de la estrategia."],
];

const insights = [
  {
    type: "Obra jurídica",
    title: "Punto de inflexión de la imputación objetiva en el COIP",
    text: "Análisis doctrinal sobre los límites de atribución penal y su aplicación en el sistema ecuatoriano.",
  },
  {
    type: "Obra jurídica",
    title: "La falsedad documental en materia penal",
    text: "Estudio sobre verdad documental, relevancia probatoria y responsabilidad penal.",
  },
  {
    type: "Análisis",
    title: "Responsabilidad penal de la persona jurídica",
    text: "Claves para comprender la exposición penal de organizaciones, administradores y órganos de decisión.",
  },
];

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.26em] ${dark ? "text-[#8a6941]" : "text-[#c9ad78]"}`}>
      <span className={`h-px w-9 ${dark ? "bg-[#8a6941]" : "bg-[#c9ad78]"}`} />
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
      <h2 className={`mt-6 max-w-4xl font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.04em] ${dark ? "text-[#15130f]" : "text-[#f3eee4]"}`}>
        {title}
      </h2>
      {text ? (
        <p className={`mt-7 max-w-2xl text-[0.98rem] leading-[1.9] md:text-[1.06rem] ${dark ? "text-[#514b43]" : "text-[#c2baae]"}`}>
          {text}
        </p>
      ) : null}
    </EditorialReveal>
  );
}

export function HomeLanding() {
  return (
    <div className="overflow-hidden bg-[#0a0908] text-[#f3eee4]">
      <section id="inicio" className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-[#080706]" />
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
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-[#c9ad78]">
                Jurista penalista · Ecuador
              </p>
            </EditorialReveal>
            <h1 className="hero-title mt-6 font-serif text-[clamp(3.35rem,12vw,7.25rem)] leading-[0.84] tracking-[-0.068em]">
              <MaskReveal>Derecho penal</MaskReveal>
              <MaskReveal delay={0.1} className="text-[#c9ad78]">más allá</MaskReveal>
              <MaskReveal delay={0.2}>del litigio.</MaskReveal>
            </h1>
            <EditorialReveal delay={0.3}>
              <p className="mt-7 max-w-xl text-[0.98rem] leading-[1.9] text-[#eee7dc] md:text-[1.06rem]">
                Inteligencia jurídica, excelencia académica y estrategia procesal para proteger libertad, patrimonio y reputación.
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
                    <p className="text-[0.62rem] font-semibold uppercase leading-[1.75] tracking-[0.16em] text-[#e2dbd0]">
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
            <p className="mt-1.5 text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-[#c9ad78]">
              Dirección personal de la defensa
            </p>
          </div>
        </EditorialReveal>
      </section>

      <section id="legado" className="bg-[#ece5d9] px-5 py-24 text-[#15130f] md:px-8 md:py-36">
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
                <p className="absolute bottom-6 left-6 right-6 border-t border-white/35 pt-4 text-[0.6rem] uppercase tracking-[0.22em] text-white/80">
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
                <Link href="/firma" className="mt-10 inline-flex items-center gap-3 border-b border-[#8a6941] pb-2 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-[#6f512f]">
                  Conocer el perfil profesional <ArrowRight size={14} />
                </Link>
              </EditorialReveal>
            </div>
          </div>
        </div>
      </section>

      <section id="trayectoria" className="relative bg-[#0e0c0a] px-5 py-24 md:px-8 md:py-36">
        <div className="absolute inset-0 museum-grid opacity-40" />
        <div className="relative mx-auto max-w-[88rem]">
          <SectionIntro
            eyebrow="Trayectoria internacional"
            title="Formación construida entre escuelas jurídicas."
            text="Una ruta académica que conecta tradición jurídica, dogmática penal, proceso y pensamiento constitucional."
          />
          <div className="relative mt-20">
            <div className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-[#c9ad78]/12 md:left-1/2" />
            <motion.div
              aria-hidden="true"
              className="absolute bottom-0 left-[1.15rem] top-0 w-px origin-top bg-gradient-to-b from-transparent via-[#d8bd89] to-transparent md:left-1/2"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            />
            {journey.map((item, index) => (
              <EditorialReveal
                key={item.institution}
                delay={index * 0.1}
                className="relative mb-10 pl-14 md:mb-16 md:grid md:grid-cols-[minmax(0,1fr)_7rem_minmax(0,1fr)] md:pl-0"
              >
                <div className="absolute left-0 top-8 z-10 flex size-9 items-center justify-center rounded-full border border-[#c9ad78]/35 bg-[#0e0c0a] font-serif text-[0.62rem] text-[#c9ad78] shadow-[0_0_0_7px_#0e0c0a,0_0_28px_rgba(201,173,120,.22)] md:left-1/2 md:-translate-x-1/2">
                  {item.chapter}
                </div>
                <article className={`academic-exhibit group relative overflow-hidden bg-[#12100d]/92 p-7 shadow-[0_36px_100px_rgba(0,0,0,.32)] backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 md:p-10 ${
                  index % 2 === 0 ? "md:col-start-1" : "md:col-start-3"
                }`}>
                  <span className="academic-corner academic-corner--tl" />
                  <span className="academic-corner academic-corner--tr" />
                  <span className="academic-corner academic-corner--bl" />
                  <span className="academic-corner academic-corner--br" />
                  <div className="absolute -right-5 -top-8 font-serif text-[8.5rem] leading-none tracking-[-0.08em] text-[#c9ad78]/[0.045]" aria-hidden="true">
                    {item.chapter}
                  </div>
                  <div className="relative">
                    <div className="flex items-center justify-between gap-5 border-b border-[#c9ad78]/16 pb-7">
                      <div
                        className="academic-logo-plaque relative h-20 w-36 shrink-0 overflow-hidden sm:h-24 sm:w-48"
                      >
                        <Image
                          src={item.logo}
                          alt={`Logotipo de ${item.institution}`}
                          fill
                          sizes="192px"
                          className={item.logoClass}
                        />
                      </div>
                      <div className="hidden text-right sm:block">
                        <p className="text-[0.5rem] uppercase tracking-[0.24em] text-[#81796f]">Archivo académico</p>
                        <p className="mt-2 font-serif text-sm text-[#c9ad78]">Capítulo {item.chapter}</p>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      <span
                        className="h-3 w-8 shadow-[0_0_0_1px_rgba(255,255,255,.1)]"
                        style={{ background: item.flagColors }}
                        role="img"
                        aria-label={`Bandera de ${item.country}`}
                      />
                      <p className="text-[0.61rem] font-semibold uppercase tracking-[0.22em] text-[#c9ad78]">
                        {item.location}
                      </p>
                    </div>
                    <h3 className="mt-5 max-w-lg font-serif text-3xl leading-[1.06] tracking-[-0.04em] text-[#f6f0e6] md:text-[2.55rem]">
                      {item.institution}
                    </h3>
                    <p className="mt-7 max-w-xl text-[1rem] leading-[1.9] text-[#c8c0b5]">
                      {item.degree}
                    </p>
                    <div className="mt-9 flex items-end justify-between gap-5">
                      <div>
                        <p className="text-[0.49rem] uppercase tracking-[0.22em] text-[#777066]">Colección</p>
                        <p className="mt-2 text-[0.58rem] uppercase tracking-[0.18em] text-[#aaa297]">Formación internacional</p>
                      </div>
                      <span className="font-serif text-4xl italic text-[#c9ad78]/45">{item.chapter}</span>
                    </div>
                  </div>
                </article>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="practica" className="bg-[#ece5d9] px-5 py-24 text-[#15130f] md:px-8 md:py-36">
        <div className="mx-auto max-w-[88rem]">
          <SectionIntro
            eyebrow="Práctica estratégica"
            title="Defensa diseñada para asuntos de máxima consecuencia."
            text="No son servicios estándar. Son arquitecturas jurídicas construidas para escenarios donde una decisión incorrecta puede alterar libertad, patrimonio, empresa o legado."
            dark
          />
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {practices.map((practice, index) => (
              <EditorialReveal key={practice.title} delay={index * 0.08}>
                <Link href={practice.href} className="practice-card group">
                  <div className="absolute inset-0">
                    <Image src={practice.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,.18),rgba(10,9,8,.96)_84%)]" />
                  </div>
                  <div className="relative flex min-h-[34rem] flex-col justify-between p-7 md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl text-[#c9ad78]">{practice.number}</span>
                      <ArrowDownRight className="text-[#c9ad78] transition-transform group-hover:translate-x-1 group-hover:translate-y-1" size={20} />
                    </div>
                    <div>
                      <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#c9ad78]">{practice.eyebrow}</p>
                      <h3 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-[#f3eee4]">{practice.title}</h3>
                      <p className="mt-5 text-[0.96rem] leading-[1.85] text-[#d0c8bc]">{practice.text}</p>
                      <p className="mt-7 border-t border-white/20 pt-5 text-[0.63rem] uppercase leading-6 tracking-[0.14em] text-[#bbb2a6]">{practice.detail}</p>
                    </div>
                  </div>
                </Link>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="bg-[#15120f] px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <SectionIntro
                eyebrow="El estándar"
                title="La diferencia está en cómo se piensa el caso."
                text="La representación de alto nivel exige una combinación poco común: profundidad doctrinal, experiencia procesal, capacidad de anticipación y comunicación directa."
              />
              <EditorialReveal delay={0.12}>
                <div className="mt-10 flex items-center gap-4 border-l border-[#c9ad78] pl-5">
                  <ShieldCheck className="shrink-0 text-[#c9ad78]" size={24} />
                  <p className="text-[0.8rem] uppercase leading-7 tracking-[0.14em] text-[#c8c0b5]">Admisión selectiva · Conflicto de interés · Secreto profesional</p>
                </div>
              </EditorialReveal>
            </div>
            <div className="grid border-t border-[#c9ad78]/20 sm:grid-cols-2">
              {principles.map(([title, text], index) => (
                <EditorialReveal key={title} delay={index * 0.06} className="border-b border-[#c9ad78]/20 p-7 sm:min-h-64 sm:[&:nth-child(odd)]:border-r md:p-9">
                  <span className="font-serif text-2xl text-[#c9ad78]/55">0{index + 1}</span>
                  <h3 className="mt-10 font-serif text-2xl">{title}</h3>
                  <p className="mt-4 text-[0.98rem] leading-[1.85] text-[#c2baae]">{text}</p>
                </EditorialReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="conocimiento" className="bg-[#ece5d9] px-5 py-24 text-[#15130f] md:px-8 md:py-36">
        <div className="mx-auto max-w-[88rem]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionIntro
              eyebrow="Centro de pensamiento penal"
              title="Ideas que trascienden el expediente."
              text="Publicaciones, análisis y espacios académicos que convierten conocimiento especializado en una fuente pública de criterio jurídico."
              dark
            />
            <Link href="/blog" className="inline-flex shrink-0 items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#6f512f]">
              Explorar biblioteca jurídica <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-16 grid border-l border-t border-[#15130f]/20 lg:grid-cols-3">
            {insights.map((item, index) => (
              <EditorialReveal key={item.title} delay={index * 0.06} className="border-b border-r border-[#15130f]/20">
                <article className="group flex min-h-80 flex-col justify-between p-7 transition-colors hover:bg-[#15130f] md:p-9">
                  <div className="flex items-center justify-between">
                    <BookOpen size={18} className="text-[#8a6941] group-hover:text-[#c9ad78]" />
                    <span className="text-[0.55rem] uppercase tracking-[0.2em] text-[#8a6941] group-hover:text-[#c9ad78]">{item.type}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl leading-tight group-hover:text-[#f3eee4]">{item.title}</h3>
                    <p className="mt-5 text-[0.98rem] leading-[1.85] text-[#514b43] group-hover:text-[#c2baae]">{item.text}</p>
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
                <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#c9ad78]">Conferencias y análisis</p>
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

      <section id="proceso" className="relative bg-[#0c0b09] px-5 py-24 md:px-8 md:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,173,120,.08),transparent_28%)]" />
        <div className="relative mx-auto max-w-[88rem]">
          <SectionIntro
            eyebrow="Proceso privado"
            title="Claridad desde la primera conversación."
            text="Un proceso de admisión serio, discreto y diseñado para convertir incertidumbre en decisiones jurídicas concretas."
          />
          <div className="mt-16 grid border-l border-t border-[#c9ad78]/20 lg:grid-cols-4">
            {process.map(([number, title, text], index) => (
              <EditorialReveal key={number} delay={index * 0.07} className="border-b border-r border-[#c9ad78]/20">
                <article className="flex min-h-80 flex-col justify-between p-7 md:p-8">
                  <span className="font-serif text-4xl text-[#c9ad78]">{number}</span>
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

      <section id="pensamiento-juridico" className="relative overflow-hidden bg-[#e9e1d4] px-5 py-24 text-[#15130f] md:px-8 md:py-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(138,105,65,.13),transparent_28%),linear-gradient(90deg,transparent_49.9%,rgba(21,19,15,.08)_50%,transparent_50.1%)]" />
        <div className="pointer-events-none absolute -right-12 top-12 font-serif text-[16rem] leading-none tracking-[-0.1em] text-[#8a6941]/[0.045] md:text-[28rem]" aria-hidden="true">
          FV
        </div>

        <div className="relative mx-auto max-w-[92rem]">
          <EditorialReveal>
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-[#8a6941]">
              Pensamiento jurídico
            </p>
            <blockquote className="mt-8 max-w-[88rem] font-serif text-[clamp(3rem,7.4vw,8.5rem)] leading-[0.94] tracking-[-0.058em]">
              El derecho penal no se ejerce únicamente en los tribunales.
              <span className="mt-2 block text-[#8a6941]">
                Se construye desde la investigación, el análisis y la estrategia.
              </span>
            </blockquote>
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
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#c9ad78]">
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
              <EditorialReveal delay={0.08}>
                <article className="group relative min-h-72 overflow-hidden border border-[#15130f]/20 bg-[#f3ede3] p-7 md:p-9">
                  <BookOpen className="text-[#8a6941]" size={24} strokeWidth={1.4} />
                  <p className="mt-12 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">
                    Obras publicadas
                  </p>
                  <h3 className="mt-4 max-w-lg font-serif text-3xl leading-tight tracking-[-0.035em]">
                    Punto de inflexión de la imputación objetiva en el COIP
                  </h3>
                  <p className="mt-5 text-[0.9rem] leading-7 text-[#514b43]">
                    Publicación jurídica · 2016
                  </p>
                  <span className="absolute -bottom-10 right-4 font-serif text-[9rem] leading-none text-[#8a6941]/[0.065]" aria-hidden="true">01</span>
                </article>
              </EditorialReveal>

              <div className="grid gap-5 sm:grid-cols-2">
                <EditorialReveal delay={0.14}>
                  <article className="flex min-h-64 flex-col justify-between bg-[#8a6941] p-7 text-[#fffaf0]">
                    <Mic2 size={23} strokeWidth={1.4} />
                    <div>
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#ead9bb]">
                        Conferencias
                      </p>
                      <h3 className="mt-4 font-serif text-3xl leading-tight">Ciencias penales y litigación oral.</h3>
                    </div>
                  </article>
                </EditorialReveal>
                <EditorialReveal delay={0.2}>
                  <article className="flex min-h-64 flex-col justify-between border border-[#15130f]/20 bg-transparent p-7">
                    <GraduationCap className="text-[#8a6941]" size={24} strokeWidth={1.4} />
                    <div>
                      <p className="text-[0.56rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">
                        Docencia
                      </p>
                      <h3 className="mt-4 font-serif text-3xl leading-tight">Formación de nuevas generaciones jurídicas.</h3>
                    </div>
                  </article>
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
                <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#6d655b]">Fragmento editorial · Fausto Vásquez</p>
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
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[#c9ad78]">
                    Archivo académico
                  </p>
                  <h3 className="mt-5 font-serif text-4xl leading-tight">Conferencias, entrevistas y formación avanzada.</h3>
                  <Link href="/eventos" className="mt-8 inline-flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#c9ad78]">
                    Explorar actividad académica <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </EditorialReveal>
          </div>
        </div>
      </section>

      <section id="consulta" className="bg-[#15120f] px-5 py-24 md:px-8 md:py-36 relative overflow-hidden">
        {/* Decorative elements representing private safe room */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(184,155,94,0.03),transparent_50%)] pointer-events-none" />
        
        <div className="mx-auto max-w-[88rem] relative z-10">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <SectionIntro
                eyebrow="Consulta privada"
                title="Todo asunto importante comienza con una conversación confidencial."
                text="Comparta únicamente la información inicial necesaria. Antes de recibir documentos o detalles sensibles, la firma verificará disponibilidad y posibles conflictos de interés."
              />
              
              <EditorialReveal delay={0.08} className="mt-8 space-y-5 border-l border-[#c9ad78]/30 pl-5">
                <div className="flex gap-3 items-start text-[0.92rem] leading-[1.7] text-[#e8e2d5]">
                  <span className="text-[#c9ad78] mt-1.5 shrink-0 size-1.5 rounded-full bg-[#c9ad78]" />
                  <p>
                    <strong className="text-[#c9ad78] font-medium">Atención exclusiva:</strong> Su caso será atendido directamente por el Dr. Fausto Vásquez.
                  </p>
                </div>
                <div className="flex gap-3 items-start text-[0.92rem] leading-[1.7] text-[#e8e2d5]">
                  <span className="text-[#c9ad78] mt-1.5 shrink-0 size-1.5 rounded-full bg-[#c9ad78]" />
                  <p>
                    <strong className="text-[#c9ad78] font-medium">Secreto Profesional:</strong> Toda información compartida será tratada bajo estricta confidencialidad profesional.
                  </p>
                </div>
              </EditorialReveal>

              {/* Insignia de Privacidad */}
              <EditorialReveal delay={0.1} className="mt-10 flex items-center gap-4 border border-[#c9ad78]/25 bg-[#c9ad78]/[0.03] p-5 rounded-sm">
                <div className="size-12 rounded-full border border-[#c9ad78]/30 flex items-center justify-center bg-[#15120f] shrink-0">
                  <svg className="size-6 text-[#c9ad78]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c9ad78] font-semibold">Garantía Constitucional</h4>
                  <p className="text-[0.62rem] text-[#bbb2a6] mt-0.5 uppercase tracking-wider">Admisión Selectiva bajo Secreto Profesional</p>
                </div>
              </EditorialReveal>

              <EditorialReveal delay={0.12} className="mt-10 grid gap-5">
                <a href={whatsappHref("Hola, deseo agendar una llamada privada de evaluación confidencial con el Dr. Fausto Vásquez.")} target="_blank" rel="noreferrer" className="contact-line hover:border-[#c9ad78]/50 transition-all duration-300">
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
              <div className="consultation-vault-card p-6 md:p-9 rounded-sm border border-[#c9ad78]/30">
                <div className="mb-8 flex items-center justify-between border-b border-[#c9ad78]/18 pb-6">
                  <div>
                    <p className="text-[0.56rem] uppercase tracking-[0.22em] text-[#c9ad78]">Solicitud de Consulta</p>
                    <h3 className="mt-2 font-serif text-2xl">Sala de Admisión Privada</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.55rem] uppercase tracking-wider text-[#8f877c] font-medium hidden sm:inline">Cifrado de Extremo a Extremo</span>
                    <LockKeyhole className="text-[#c9ad78]" size={20} />
                  </div>
                </div>
                <IntakeForm />
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#ece5d9] px-5 py-24 text-[#15130f] md:px-8 md:py-32">
        <div className="mx-auto max-w-[72rem]">
          <SectionIntro eyebrow="Preguntas frecuentes" title="Información antes de iniciar." dark />
          <div className="mt-14 border-t border-[#15130f]/20">
            {faqs.slice(0, 5).map((faq, index) => (
              <EditorialReveal key={faq.question} delay={index * 0.04}>
                <details className="group border-b border-[#15130f]/20 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl md:text-2xl">
                    {faq.question}
                    <span className="text-[#8a6941] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-5 text-[0.98rem] leading-[1.9] text-[#514b43]">{faq.answer}</p>
                </details>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[72vh] overflow-hidden px-5 py-24 md:px-8">
        <Image src="/quito_night.png" alt="Quito de noche" fill sizes="100vw" className="object-cover grayscale" />
        <div className="absolute inset-0 bg-[#080706]/82" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,173,120,.16),transparent_35%)]" />
        <div className="relative mx-auto flex min-h-[55vh] max-w-5xl flex-col items-center justify-center text-center">
          <EditorialReveal>
            <p className="text-[0.62rem] uppercase tracking-[0.3em] text-[#c9ad78]">Fausto Vásquez Abogados</p>
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
