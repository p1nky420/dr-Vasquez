"use client";

import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronRight,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Quote,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EditorialReveal, MaskReveal, ParallaxLayer } from "@/components/editorial-motion";
import { IntakeForm } from "@/components/intake-form";
import { QuickIntake } from "@/components/quick-intake";
import { WhatsappCta } from "@/components/whatsapp-cta";
import { SwipeableCard } from "@/components/swipeable-card";
import { TrajectoryAtlas } from "@/components/trajectory-atlas";
import { SectionDivider } from "@/components/section-divider";
import { faqs, tacticalServices, proofInstitutions } from "@/lib/home-content";
import { whatsappHref } from "@/lib/site";
import { trackCta } from "@/lib/analytics";

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


/** Las preguntas que más influyen en si alguien contacta o abandona. */
const FEATURED_QUESTIONS = [
  "¿Qué debo hacer si recibo una notificación de Fiscalía?",
  "¿La primera consulta tiene costo?",
  "¿Pueden revisar un caso que ya tiene abogado?",
  "¿Atienden urgencias penales?",
];

const featuredFaqs = FEATURED_QUESTIONS
  .map((question) => faqs.find((faq) => faq.question === question))
  .filter((faq): faq is (typeof faqs)[number] => Boolean(faq));


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
        {/* pb deja sitio a la barra fija de WhatsApp, que tapaba el CTA en móvil. */}
        <div className="relative mx-auto flex min-h-[100svh] max-w-[94rem] items-end px-5 pb-28 pt-28 md:px-8 md:pb-20 lg:items-center lg:pb-10">
          <div className="max-w-[45rem] lg:ml-[2vw]">
            <EditorialReveal>
              <p className="text-[0.64rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#ecc058]">
                Jurista penalista · Ecuador
              </p>
            </EditorialReveal>
            {/* El h1 se pinta visible y solo se desplaza: era el elemento LCP
                y estaba oculto hasta que React hidrataba. */}
            <h1 className="hero-title mt-5 font-serif text-[clamp(2.9rem,8.4vw,5.6rem)] leading-[0.94] tracking-[-0.02em]">
              <MaskReveal>Derecho penal</MaskReveal>
              <MaskReveal delay={0.08} className="text-[#ecc058]">más allá</MaskReveal>
              <MaskReveal delay={0.16}>del litigio.</MaskReveal>
            </h1>
            {/* Señal de relevancia local que el h1 de marca no da. */}
            <p className="mt-4 text-[0.95rem] leading-[1.7] tracking-[0.02em] text-[#e2dbd0] md:text-[1.02rem]">
              Abogado penalista en Quito y Guayaquil · Defensa penal económica,
              delitos financieros y casos de alta complejidad.
            </p>
            <EditorialReveal delay={0.22}>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-[1.8] tracking-[0.02em] text-[#c2baae]">
                Doctor en Jurisprudencia · Profesor e investigador · Autor de dos
                obras sobre dogmática penal.
              </p>
            </EditorialReveal>
            <EditorialReveal delay={0.28} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="#consulta-rapida"
                onClick={() => trackCta("hero", "Solicitar evaluación")}
                className="premium-button group"
              >
                Solicitar evaluación confidencial
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={whatsappHref("Hola, necesito asesoría penal urgente.")}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackCta("hero", "WhatsApp")}
                className="premium-button premium-button--ghost group"
              >
                <MessageCircle size={15} /> WhatsApp directo
              </a>
            </EditorialReveal>
            <EditorialReveal delay={0.34}>
              <p className="proof-strip mt-6">
                <span>+20 años de ejercicio</span>
                <span>Formación en 4 países</span>
                <span>Atención personal del Dr. Vásquez</span>
              </p>
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

      {/* ─────────────────────────────────────────────────────────────────
          Captación inmediata. El único punto de conversión estaba al 69 %
          de profundidad; este bloque lo coloca justo debajo del hero, en
          lenguaje del problema del cliente y no de la firma.
          ───────────────────────────────────────────────────────────────── */}
      <section id="consulta-rapida" className="relative bg-[#0e0c0a] px-5 py-14 md:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(201,173,120,0.07),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <Eyebrow>Atención inmediata</Eyebrow>
            <h2 className="mt-5 max-w-xl font-serif text-[clamp(1.85rem,4vw,2.9rem)] leading-[1.12] text-[#f3eee4]">
              ¿En qué punto está su caso hoy?
            </h2>
            <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.8] text-[#c2baae]">
              Cada una de estas situaciones tiene decisiones críticas con plazo.
              Una lectura técnica temprana del expediente cambia lo que todavía
              es posible hacer.
            </p>

            <div className="mt-9 grid gap-px bg-[#ecc058]/12 sm:grid-cols-2">
              {tacticalServices.map((service) => (
                <EditorialReveal key={service.number} className="bg-[#0e0c0a] p-6">
                  <span className="font-serif text-xl text-[#ecc058]/55">{service.number}</span>
                  <h3 className="mt-3 font-serif text-xl leading-snug text-[#f3eee4]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-[1.7] text-[#b5ada2]">{service.text}</p>
                </EditorialReveal>
              ))}
            </div>

            <WhatsappCta
              className="mt-9"
              location="consulta-rapida"
              message="Hola, necesito una evaluación de mi caso penal."
            />
          </div>

          <EditorialReveal delay={0.08}>
            <p className="mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#ecc058]">
              Evaluación confidencial · Respuesta el mismo día hábil
            </p>
            <QuickIntake source="home-hero" />

            <div className="mt-8 border-t border-[#ecc058]/15 pt-6">
              <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-[#8f877c]">
                Trayectoria construida en
              </p>
              <p className="proof-strip mt-3">
                {proofInstitutions.map((institution) => (
                  <span key={institution}>{institution}</span>
                ))}
              </p>
            </div>
          </EditorialReveal>
        </div>
      </section>

      <SectionDivider />

      <section id="legado" className="bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-24">
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

      <section id="trayectoria" className="relative bg-[#080706] px-5 py-16 md:px-8 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,173,120,0.02),transparent_55%)]" />
        <div className="relative mx-auto max-w-[88rem]">
          <EditorialReveal>
            <Eyebrow>Trayectoria</Eyebrow>
            <h2 className="mt-6 max-w-4xl font-serif text-[clamp(2rem,5vw,3.6rem)] leading-[1.12] tracking-[-0.01em] text-[#f3eee4]">
              La construcción de una visión jurídica.
            </h2>
            <p className="mt-6 max-w-2xl text-[0.98rem] leading-[1.85] text-[#c2baae]">
              Cuatro tradiciones académicas y una escuela propia. Recorra el
              expediente.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.1} className="mt-12">
            <TrajectoryAtlas nodes={visionNodes} />
          </EditorialReveal>
        </div>
      </section>

      <SectionDivider />

      <section id="practica" className="bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-24">
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

                  <div className="mt-8 flex-1 flex flex-col">
                    <p className="text-[0.58rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#8a6941]">{practice.specialty}</p>
                    <h3 className="mt-4 font-serif text-3xl leading-[1.04] tracking-[-0.04em] text-[#15130f] md:text-4xl">{practice.title}</h3>
                    <p className="mt-5 text-[0.9rem] leading-[1.9] tracking-[0.02em] text-[#514b43]">{practice.text}</p>

                    <div className="mt-auto space-y-3 pt-8">
                      <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#8a6941]">Doctrina relacionada</p>
                      <ul className="space-y-2">
                        {practice.methodology.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-[0.82rem] leading-relaxed text-[#514b43]">
                            <span className="mt-2 h-px w-4 shrink-0 bg-[#8a6941]/50" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 space-y-2">
                      <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#8a6941]">Publicaciones</p>
                      {practice.publications.map((pub) => (
                        <p key={pub} className="flex items-center gap-2 text-[0.7rem] leading-snug text-[#6f512f] underline decoration-[#8a6941]/30 underline-offset-2">
                          <span className="size-1 rounded-full bg-[#8a6941]/40 shrink-0" />
                          {pub}
                        </p>
                      ))}
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#8a6941] transition-colors group-hover:text-[#6f512f]">
                      Explorar especialidad <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
                </SwipeableCard>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="metodo" className="relative bg-[#15120f] px-5 py-16 md:px-8 md:py-24 overflow-hidden ">
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

        </div>
      </section>
      <SectionDivider />

      <section id="proceso" className="relative bg-[#0c0b09] px-5 py-16 md:px-8 md:py-24 overflow-hidden ">
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
                  <span className="font-serif text-6xl text-[#ecc058]">{number}</span>
                  <div>
                    <h3 className="font-serif text-2xl">{title}</h3>
                    <p className="mt-4 text-[0.98rem] leading-[1.85] text-[#e8e2d5]">{text}</p>
                  </div>
                </article>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="pensamiento-juridico" className="relative overflow-hidden bg-[#e9e1d4] px-5 py-16 text-[#15130f] md:px-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(138,105,65,.13),transparent_28%),linear-gradient(90deg,transparent_49.9%,rgba(21,19,15,.08)_50%,transparent_50.1%)]" />
        <div className="pointer-events-none absolute -right-12 top-12 font-serif text-[16rem] leading-none tracking-[-0.1em] text-[#8a6941]/[0.045] md:text-[28rem]" aria-hidden="true">
          FV
        </div>

        <div className="relative mx-auto max-w-[92rem]">
          <EditorialReveal>
            <p className="text-[0.64rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#8a6941]">
              Pensamiento jurídico
            </p>
            <blockquote className="mt-8 max-w-[88rem] font-serif text-[clamp(2.4rem,5.2vw,5rem)] leading-[1] tracking-[0.01em]">
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
          </EditorialReveal>

          <EditorialReveal className="relative mt-16 min-h-[26rem] overflow-hidden bg-[#15120f] text-[#f3eee4] md:mt-20 md:min-h-[32rem]">
            <Image
              src="/portrait-editorial-desk-v2.png"
              alt="Dr. Fausto Vásquez durante una sesión de análisis jurídico"
              fill
              sizes="(min-width: 1024px) 88vw, 100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,9,8,.08),rgba(10,9,8,.28)_45%,rgba(10,9,8,.94)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-11">
              <p className="text-[0.58rem] max-sm:text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#ecc058]">
                Producción intelectual
              </p>
              <span className="mt-4 block font-serif text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] tracking-[-0.03em] text-[#f3eee4]">
                PUBLICACIONES
              </span>
              <p className="mt-5 max-w-2xl text-[1rem] leading-[1.85] text-[#cec6ba]">
                Libros, doctrina y análisis jurídico que trascienden el expediente y
                consolidan una voz de referencia en el derecho penal ecuatoriano.
              </p>
            </div>
          </EditorialReveal>

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
                  <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                    <Link href="/publicaciones" className="inline-flex min-h-6 items-center gap-3 py-0.5 text-[0.62rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#ecc058]">
                      Ver publicaciones y conferencias <ArrowRight size={14} />
                    </Link>
                    <Link href="/eventos" className="inline-flex min-h-6 items-center gap-3 py-0.5 text-[0.62rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#ecc058]/70">
                      Actividad académica <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            </EditorialReveal>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="consulta" className="bg-[#15120f] px-5 py-16 md:px-8 md:py-24 relative overflow-hidden ">
        {/* Decorative elements representing private safe room */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(184,155,94,0.06),transparent_50%)] pointer-events-none" />
        
        <div className="mx-auto max-w-[88rem] relative z-10">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <div>
              <SectionIntro
                eyebrow="Evaluación estratégica confidencial"
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
                  <h3 className="text-[0.68rem] uppercase tracking-[0.2em] text-[#ecc058] font-semibold">Garantía Constitucional</h3>
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

      <section id="faq" className="bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-24">
        <div className="mx-auto max-w-[72rem]">
          <SectionIntro eyebrow="Preguntas frecuentes" title="Información antes de iniciar." dark />
          <div className="mt-10 grid gap-px bg-[#15130f]/12 md:grid-cols-2">
            {featuredFaqs.map((faq) => (
              <div key={faq.question} className="bg-[#f3ede3] p-6 md:p-7">
                <h3 className="font-serif text-lg leading-snug md:text-xl">{faq.question}</h3>
                <p className="mt-3 text-[0.93rem] leading-[1.75] text-[#514b43]">{faq.answer}</p>
              </div>
            ))}
          </div>
          <Link
            href="/preguntas-frecuentes"
            className="mt-10 inline-flex items-center gap-3 border-b border-[#75552f] pb-2 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#75552f]"
          >
            Las {faqs.length} preguntas frecuentes <ArrowRight size={14} />
          </Link>
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
