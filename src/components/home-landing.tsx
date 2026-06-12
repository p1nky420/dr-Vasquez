"use client";

import {
  Award,
  ArrowDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  LockKeyhole,
  Play,
  Scale,
  Shield,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EditorialReveal, MaskReveal, ParallaxLayer } from "@/components/editorial-motion";
import { IntakeForm } from "@/components/intake-form";
import { MagneticEvaluationLink } from "@/components/magnetic-evaluation-link";
import { trackEvent } from "@/lib/analytics";
import {
  academicAuthority,
  academicProgramStats,
  audiovisualEvidence,
  credentials,
  confidentialCaseStudies,
  educationalGuides,
  ecosystemItems,
  faqs,
  internalSeoLinks,
  interventionSteps,
  proofInstitutions,
  serviceCategories,
  specializations,
  tacticalServices,
} from "@/lib/home-content";

const whatsappHref =
  "https://wa.me/+593983076881?text=Hola%2C%20necesito%20una%20evaluaci%C3%B3n%20urgente%20de%20mi%20caso%20penal.";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-[#c7a86a]">
      <span className="h-px w-8 bg-[#c7a86a]" />
      {children}
    </p>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <EditorialReveal className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`mt-6 font-serif text-4xl leading-[1.05] tracking-[-0.035em] md:text-6xl ${light ? "font-bold text-[#100f0d]" : "text-[#f4efe5]"}`}>
        {title}
      </h2>
      {text ? <p className={`mt-6 max-w-2xl text-sm leading-7 md:text-base ${light ? "text-[#625d54]" : "text-[#aaa298]"}`}>{text}</p> : null}
    </EditorialReveal>
  );
}

export function HomeLanding() {
  return (
    <div className="home-landing overflow-hidden bg-[#0b0a09] text-[#f4efe5]">
      <section id="inicio" className="relative min-h-[100svh] overflow-hidden">
        <ParallaxLayer className="absolute inset-0 -top-24 bottom-[-12rem]">
          <Image
            src="/practice-defense-marble-v1.png"
            alt="Arquitectura de mármol oscuro bajo iluminación dramática"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,5,0.98)_0%,rgba(7,6,5,0.88)_72%,rgba(7,6,5,0.5)_100%)] md:bg-[linear-gradient(90deg,rgba(7,6,5,0.98)_0%,rgba(7,6,5,0.8)_50%,rgba(7,6,5,0.18)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,6,5,0.25)_0%,transparent_55%,#0b0a09_100%)]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-14 pt-32 sm:pb-20 sm:pt-40 md:px-8 md:pb-24 lg:items-center">
          <div className="grid w-full gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <EditorialReveal>
                <Eyebrow>Abogado penalista en Quito, Ecuador</Eyebrow>
              </EditorialReveal>
              <EditorialReveal delay={0.12}>
                <h1 className="mt-6 max-w-5xl font-serif text-[clamp(2.85rem,14.5vw,4.75rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-[#f4efe5] sm:mt-7 sm:text-[6.2rem] sm:leading-[0.9] lg:text-[8.5rem]">
                  <MaskReveal>Defensa penal para casos</MaskReveal>
                  <MaskReveal delay={0.12}>que no admiten improvisación.</MaskReveal>
                </h1>
              </EditorialReveal>
              <EditorialReveal delay={0.24}>
                <p className="mt-7 max-w-xl border-l border-[#c7a86a] pl-5 text-sm leading-7 text-[#c8c0b5] md:text-base">
                  Estrategia jurídica para investigaciones y procesos donde están en juego la libertad, el patrimonio, la empresa y la reputación.
                </p>
              </EditorialReveal>
              <EditorialReveal delay={0.34} className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
                <MagneticEvaluationLink className="group inline-flex min-h-14 touch-manipulation items-center justify-center gap-3 border border-[#9a6b3d] bg-[#9a6b3d] px-5 text-center text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#f4efe5] transition-colors hover:bg-[#7f552f] sm:px-7 sm:text-xs sm:tracking-[0.16em]">
                  Solicitar evaluación confidencial
                  <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                </MagneticEvaluationLink>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { location: "hero" })}
                  className="inline-flex min-h-14 touch-manipulation items-center justify-center border border-[#c7a86a]/55 bg-black/30 px-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#f4efe5] backdrop-blur-sm transition-colors hover:border-[#c7a86a] hover:bg-[#c7a86a]/10 sm:px-7 sm:text-xs sm:tracking-[0.16em]"
                >
                  Atención urgente
                </a>
              </EditorialReveal>
              <EditorialReveal delay={0.42}>
                <p className="mt-6 max-w-2xl border-t border-[#c7a86a]/20 pt-5 font-serif text-sm italic leading-6 text-[#9d958a]">
                  Para garantizar el rigor técnico y la dedicación absoluta que exige cada contingencia, la firma acepta un número estrictamente limitado de defensas corporativas por trimestre.
                </p>
              </EditorialReveal>
            </div>

            <EditorialReveal delay={0.4} className="hidden lg:block">
              <div className="border-l border-[#c7a86a]/45 pl-8">
                <p className="text-xs uppercase tracking-[0.2em] text-[#c7a86a]">Dirección técnica</p>
                <p className="mt-3 font-serif text-3xl">Dr. Fausto Ramiro Vásquez Cevallos</p>
                <p className="mt-4 text-sm leading-6 text-[#aaa298]">Jurista penalista · Catedrático · Defensa estratégica en casos complejos</p>
              </div>
            </EditorialReveal>
          </div>
        </div>

        <a href="#autoridad" aria-label="Descubrir la firma" className="absolute bottom-7 right-7 hidden items-center gap-3 text-[0.62rem] uppercase tracking-[0.22em] text-[#b8afa3] md:flex">
          Descubrir la firma <ArrowDown size={14} />
        </a>
      </section>

      <section id="autoridad" className="relative border-y border-[#9a835b]/25 bg-[#12100e]">
        <div className="mx-auto grid max-w-[96rem] grid-cols-3 px-5 md:px-8 lg:grid-cols-[repeat(3,minmax(0,0.72fr))_minmax(0,2.4fr)]">
          {[
            ["20+", "Años de trayectoria"],
            ["2", "Obras jurídicas"],
            ["EC", "Litigio nacional"],
          ].map(([value, label]) => (
            <div className="flex min-h-32 min-w-0 flex-col justify-center border-r border-[#9a835b]/20 py-7 pr-2 last:border-r-0 md:min-h-52 md:px-7 md:py-10 lg:min-h-64 lg:border-r lg:px-9" key={label}>
              <p className="font-serif text-4xl leading-none tracking-[-0.04em] text-[#f4efe5] sm:text-5xl md:text-7xl lg:text-8xl">{value}</p>
              <p className="mt-3 max-w-24 text-[0.56rem] uppercase leading-4 tracking-[0.11em] text-[#b0b4ba] sm:text-[0.6rem] sm:tracking-[0.18em] md:mt-6 md:max-w-none md:text-[0.68rem]">{label}</p>
            </div>
          ))}
          <a
            href={audiovisualEvidence[0].href}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("testimonial_play")}
            className="group col-span-3 flex min-h-40 touch-manipulation items-center justify-between gap-5 border-t border-[#9a835b]/20 py-8 lg:col-span-1 lg:min-h-64 lg:border-l lg:border-t-0 lg:px-12"
          >
            <div className="max-w-2xl">
              <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#c7a86a]">Archivo audiovisual</p>
              <p className="mt-3 font-serif text-xl leading-tight tracking-[-0.02em] sm:text-2xl md:mt-4 md:text-3xl">Conozca el criterio y la trayectoria desde su canal oficial.</p>
            </div>
            <span className="grid size-14 shrink-0 place-items-center rounded-full border border-[#c7a86a]/45 text-[#c7a86a] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#c7a86a] group-hover:text-[#11100e] md:size-16"><Play size={17} fill="currentColor" /></span>
          </a>
        </div>
      </section>

      <section className="bg-ivory-paper px-5 py-24 text-[#100f0d] md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Cuando el riesgo es real"
            title="Una acusación compleja altera mucho más que un expediente."
            text="La defensa debe leer simultáneamente el proceso, la prueba, la empresa, el patrimonio y el contexto institucional. Cada decisión tiene consecuencias."
            light
          />
          <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mt-16 md:grid md:grid-cols-2 md:gap-0 md:overflow-visible md:border-x md:border-t md:border-[#17140f] md:px-0 md:pb-0 xl:grid-cols-4">
            {["Libertad", "Patrimonio", "Empresa", "Reputación"].map((item, index) => (
              <EditorialReveal
                delay={index * 0.08}
                key={item}
                className="group relative isolate flex min-h-72 min-w-[82vw] snap-center flex-col justify-between overflow-hidden border border-[#9a6b3d]/35 bg-[#15130f] p-7 text-[#f4efe5] transition-colors duration-500 md:min-h-80 md:min-w-0 md:border-b md:border-l-0 md:border-t-0 md:border-[#17140f] md:bg-transparent md:p-9 md:text-[#100f0d] md:hover:bg-[#15130f] md:[&:nth-child(odd)]:border-r xl:min-h-[25rem] xl:border-r xl:p-8 xl:[&:nth-child(4)]:border-r-0"
              >
                <span className="pointer-events-none absolute -right-3 -top-12 -z-10 font-serif text-[11rem] leading-none text-[#17140f]/[0.035] transition-colors duration-500 group-hover:text-[#c7a86a]/[0.08] md:text-[14rem]">
                  0{index + 1}
                </span>
                <div className="flex items-center justify-between gap-5">
                  <span className="font-sans text-[0.65rem] font-extrabold tracking-[0.24em] text-[#78552f] transition-colors duration-500 group-hover:text-[#c7a86a]">
                    0{index + 1}
                  </span>
                  <span className="h-px w-10 bg-[#9a6b3d]/70 transition-all duration-500 group-hover:w-20 group-hover:bg-[#c7a86a]" />
                </div>
                <div>
                  <h3 className="font-serif text-[clamp(2.65rem,14vw,4rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[#f4efe5] transition-colors duration-500 md:text-[clamp(2.65rem,4vw,4.5rem)] md:text-[#100f0d] md:group-hover:text-[#f4efe5] xl:text-[clamp(2.7rem,3.2vw,4rem)]">
                    {item}
                  </h3>
                  <div className="mt-8 h-px w-14 bg-[#17140f] transition-all duration-500 group-hover:w-full group-hover:bg-[#c7a86a]/70" />
                </div>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="orientacion" className="bg-ivory-paper px-5 py-24 text-[#100f0d] md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Orientación jurídica inicial"
            title="Comprender el proceso permite tomar mejores decisiones."
            text="Esta información ofrece una visión general y no sustituye una evaluación jurídica del caso concreto. Cada asunto requiere revisión individual."
            light
          />
          <div className="mt-16 grid border-x border-t border-[#17140f] md:grid-cols-2">
            {educationalGuides.map((guide) => (
              <EditorialReveal key={guide.number} className="border-b border-[#17140f] p-7 md:min-h-72 md:p-10 md:[&:nth-child(odd)]:border-r">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl text-[#9a6b3d]">{guide.number}</span>
                  <span className="h-px w-12 bg-[#17140f]" />
                </div>
                <h3 className="mt-12 max-w-md font-serif text-3xl font-bold leading-tight">{guide.title}</h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[#625d54]">{guide.text}</p>
              </EditorialReveal>
            ))}
          </div>
          <p className="mt-5 text-xs leading-6 text-[#625d54]">
            Información general basada en el funcionamiento del proceso penal ecuatoriano. No constituye asesoría jurídica ni crea una relación abogado-cliente.
          </p>
        </div>
      </section>

      <section id="defensa" className="bg-[#0b0a09] px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Defensa de alto riesgo"
            title="No ofrecemos respuestas estándar para problemas extraordinarios."
            text="La primera parte de nuestra práctica está dedicada a asuntos penales que exigen análisis técnico, capacidad táctica y absoluta discreción."
          />

          <div className="mt-20 grid gap-20">
            {serviceCategories.slice(0, 3).map((category, index) => {
              const Icon = category.icon;
              return (
                <EditorialReveal key={category.id}>
                  <article id={category.id} className="grid gap-8 border-t border-[#9a835b]/25 pt-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                    <div className={index % 2 ? "lg:order-2" : ""}>
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image src={category.image} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover transition-transform duration-[1600ms] hover:scale-[1.04]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09]/70 via-transparent to-transparent" />
                        <span className="absolute left-5 top-5 grid size-12 place-items-center border border-[#c7a86a]/45 bg-black/35 text-[#c7a86a] backdrop-blur-sm"><Icon size={20} /></span>
                      </div>
                    </div>
                    <div className={`flex flex-col justify-center ${index % 2 ? "lg:order-1" : ""}`}>
                      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#c7a86a]">Área estratégica · 0{index + 1}</p>
                      <h3 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">{category.title}</h3>
                      <p className="mt-6 max-w-xl text-sm leading-7 text-[#aaa298]">{category.description}</p>
                      <ul className="mt-7 grid gap-3 text-sm text-[#d4ccc0] sm:grid-cols-2">
                        {category.services.map((service) => <li className="flex gap-2" key={service}><CheckCircle2 className="mt-0.5 shrink-0 text-[#c7a86a]" size={15} />{service}</li>)}
                      </ul>
                      <a href="#admision" className="mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#c7a86a]">Evaluar este asunto <ArrowRight size={15} /></a>
                    </div>
                  </article>
                </EditorialReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ivory-paper relative overflow-hidden px-5 py-24 text-[#100f0d] md:px-8 md:py-36">
        <div className="absolute inset-0">
          <Image src="/practice-consulting-dossier-v1.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.07] grayscale contrast-125" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(154,107,61,0.14),transparent_24%),linear-gradient(90deg,rgba(238,231,219,0.9)_0%,rgba(238,231,219,0.78)_58%,rgba(238,231,219,0.58)_100%)]" />
          <div className="absolute inset-y-0 left-[7%] w-px bg-[#17140f]/10" />
          <div className="absolute inset-y-0 right-[7%] w-px bg-[#17140f]/10" />
        </div>
        <div className="pointer-events-none absolute -right-36 top-16 size-[30rem] rounded-full border border-[#9a6b3d]/15 animate-[spin_45s_linear_infinite] md:size-[42rem]">
          <div className="absolute inset-16 rounded-full border border-[#9a6b3d]/15" />
          <div className="absolute inset-32 rounded-full border border-[#9a6b3d]/15" />
        </div>
        <div className="relative mx-auto max-w-[90rem]">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <EditorialReveal className="max-w-3xl">
                <Eyebrow>Intervención táctica</Eyebrow>
                <h2 className="mt-6 font-serif text-4xl font-bold leading-[1.02] tracking-[-0.045em] text-[#100f0d] md:text-6xl">
                  El caso cambia. La estrategia también.
                </h2>
                <p className="mt-6 max-w-2xl text-sm leading-7 text-[#625d54] md:text-base">
                  Capacidades específicas para asuntos que ya se encuentran en movimiento y requieren una lectura técnica inmediata.
                </p>
              </EditorialReveal>
              <div className="mt-10 max-w-md border-l border-[#9a6b3d] pl-5 text-sm leading-7 text-[#625d54]">
                Cada intervención se define después de revisar la etapa procesal, la información disponible y los posibles conflictos de interés.
              </div>
              <p className="mt-12 hidden font-serif text-[9rem] leading-none tracking-[-0.08em] text-[#9a6b3d]/[0.08] lg:block">FV</p>
            </div>
            <div className="grid gap-3">
              {tacticalServices.map((service) => (
                <EditorialReveal key={service.number} className="group relative overflow-hidden border border-[#17140f]/20 bg-[#eee7db]/72 shadow-[0_20px_50px_rgba(43,31,18,0.06)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#9a6b3d]/60 hover:bg-[#eee7db]/95 hover:shadow-[0_28px_70px_rgba(43,31,18,0.12)]">
                  <article className="grid min-h-64 gap-8 p-7 md:grid-cols-[5rem_1fr] md:p-10 lg:grid-cols-[5rem_1fr_auto] lg:items-end">
                    <span className="font-serif text-5xl leading-none text-[#9a6b3d]/55 transition-colors duration-500 group-hover:text-[#78552f]">{service.number}</span>
                    <div>
                      <p className="text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#78552f]">Capacidad especializada</p>
                      <h3 className="mt-6 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">{service.title}</h3>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#625d54]">{service.text}</p>
                    </div>
                    <a href="#admision" className="inline-flex min-h-11 items-center gap-3 border-t border-[#17140f]/15 pt-5 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#78552f] lg:min-w-52 lg:justify-between">
                      {service.cta} <ArrowRight className="shrink-0 transition-transform group-hover:translate-x-1" size={14} />
                    </a>
                    <span className="pointer-events-none absolute -bottom-20 -right-5 font-serif text-[12rem] leading-none text-[#9a6b3d]/[0.04] transition-all duration-700 group-hover:-translate-y-3 group-hover:text-[#9a6b3d]/[0.08]">{service.number}</span>
                  </article>
                </EditorialReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="explorar-heading" className="border-y border-[#9a835b]/20 bg-[#11100e] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[#c7a86a]">Explore la firma</p>
          <h2 id="explorar-heading" className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Información relacionada para evaluar el siguiente paso.
          </h2>
          <nav aria-label="Enlaces relacionados" className="mt-12 grid gap-px bg-[#9a835b]/25 md:grid-cols-2">
            {internalSeoLinks.map((item) => (
              <Link key={item.href} href={item.href} className="group bg-[#11100e] p-7 transition-colors hover:bg-[#1a1612] md:p-9">
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em] text-[#c7a86a]">{item.eyebrow}</p>
                <h3 className="mt-5 font-serif text-2xl">{item.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#aaa298]">{item.text}</p>
                <span className="mt-7 inline-flex items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#c7a86a]">
                  Conocer más <ArrowRight className="transition-transform group-hover:translate-x-1" size={14} />
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section id="resultados" className="relative overflow-hidden bg-[#17130f] px-5 py-24 md:px-8 md:py-36">
        <div className="absolute inset-0 opacity-20">
          <Image src="/quito_night.png" alt="" fill sizes="100vw" className="object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#17130f_0%,rgba(23,19,15,0.88)_55%,rgba(23,19,15,0.65)_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Casos de estudio confidenciales"
            title="La estrategia se demuestra en asuntos de máxima consecuencia."
            text="Por mandato de secreto profesional, los asuntos se presentan anonimizados, sin datos identificables y sujetos a aprobación documental."
          />
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {confidentialCaseStudies.map((item, index) => (
              <article key={item.title} className="group flex min-h-[32rem] flex-col border border-[#c5a059]/20 bg-black/35 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-[#c5a059]/60 hover:bg-black/50">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#c7a86a]">Caso reservado · 0{index + 1}</p>
                  <LockKeyhole size={15} className="text-[#8f887d] transition-colors group-hover:text-[#c7a86a]" />
                </div>
                <h3 className="mt-9 min-h-16 font-serif text-3xl leading-tight">{item.title}</h3>
                <dl className="mt-7 grid gap-6 border-t border-[#9a835b]/20 pt-6">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">Riesgo</dt>
                    <dd className="mt-2 text-sm leading-6 text-[#d2c9bd]">{item.risk}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">Táctica</dt>
                    <dd className="mt-2 text-sm leading-6 text-[#d2c9bd]">{item.tactic}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-widest text-[#c5a059]">Resolución</dt>
                    <dd className="mt-2 font-serif text-lg leading-6 text-[#f4efe5]">{item.resolution}</dd>
                  </div>
                </dl>
                <p className="mt-auto border-t border-[#9a835b]/20 pt-5 text-[0.58rem] uppercase leading-5 tracking-[0.15em] text-[#8f887d]">Caso anonimizado · Sin datos identificables</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="perfil" className="bg-ivory-paper px-5 py-24 text-[#100f0d] md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <EditorialReveal className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#17140f]">
              {/* TODO: Sustituir este retrato editorial generado por la sesión fotográfica profesional final. */}
              <Image src="/portrait-editorial-authority-v2.png" alt="Retrato editorial provisional del Dr. Fausto Ramiro Vásquez Cevallos" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover object-top grayscale sepia-[.20] contrast-125 brightness-90" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-24 text-[#f4efe5]">
                <p className="font-serif text-3xl">Dr. Fausto Vásquez</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#c7a86a]">Jurista penalista · Catedrático</p>
              </div>
            </div>
          </EditorialReveal>
          <div>
            <SectionTitle eyebrow="Perfil y autoridad" title="La doctrina también se litiga." light />
            <p className="mt-8 max-w-2xl text-base leading-8 text-[#625d54]">Abogado y jurista especializado en derecho penal, derecho penal económico, derecho constitucional y litigación oral. Trayectoria académica y profesional orientada al análisis dogmático, la defensa estratégica y la resolución de casos complejos.</p>
            <div className="mt-10 flex flex-wrap gap-2">
              {specializations.map((specialization) => (
                <span key={specialization} className="border border-[#6f6048]/30 px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#625d54]">
                  {specialization}
                </span>
              ))}
            </div>
            <div className="mt-12 divide-y divide-[#6f6048]/25 border-y border-[#6f6048]/25">
              {credentials.map((credential, index) => (
                <EditorialReveal delay={index * 0.05} key={credential} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                  <span className="font-serif text-[#9a7c45]">0{index + 1}</span>
                  <p className="text-sm leading-6">{credential}</p>
                </EditorialReveal>
              ))}
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              <div className="bg-[#17140f] p-7 text-[#f4efe5]">
                <BookOpen className="text-[#c7a86a]" size={22} />
                <h3 className="mt-8 font-serif text-2xl">Punto de Inflexión de la Imputación Objetiva</h3>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#aaa298]">Ergo Editores · 2016</p>
              </div>
              <div className="border border-[#6f6048]/30 p-7">
                <Scale className="text-[#9a7c45]" size={22} />
                <h3 className="mt-8 font-serif text-2xl">La falsedad documental en materia penal</h3>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#625d54]">Obra jurídica · 2007</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="trayectoria" className="relative overflow-hidden bg-[#0a0908] px-5 py-24 md:px-8 md:py-36">
        <div className="absolute inset-0">
          <ParallaxLayer className="absolute inset-0 -top-16 bottom-[-8rem]">
            <Image src="/portrait-editorial-desk-v2.png" alt="" fill sizes="100vw" className="object-cover object-center opacity-45 grayscale sepia-[.18] contrast-125" />
          </ParallaxLayer>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0908_0%,rgba(10,9,8,0.92)_40%,rgba(60,36,18,0.56)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-[#0a0908]/75" />
          <div className="absolute right-[8%] top-[12%] h-[70%] w-px bg-[#c7a86a]/20" />
        </div>
        <div className="pointer-events-none absolute -right-28 top-20 size-72 rounded-full bg-[#9a4f12]/20 blur-[120px] animate-[pulse_8s_ease-in-out_infinite] md:size-[32rem]" />
        <div className="relative mx-auto max-w-[90rem]">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-24">
            <SectionTitle
              eyebrow="Trayectoria y proyección"
              title="Autoridad construida entre práctica, doctrina y formación."
              text="La actividad académica amplía la capacidad de análisis y mantiene la defensa conectada con la evolución del pensamiento jurídico."
            />
            <div className="grid grid-cols-2 border-x border-t border-[#9a835b]/25 lg:grid-cols-4">
              {academicProgramStats.map((stat) => (
                <EditorialReveal key={stat.label} className="border-b border-r border-[#9a835b]/25 bg-[#0d0c0a]/65 p-5 backdrop-blur-sm md:p-7">
                  <p className="font-serif text-4xl leading-none text-[#f4efe5] md:text-5xl">{stat.value}</p>
                  <p className="mt-4 text-[0.52rem] font-bold uppercase leading-5 tracking-[0.16em] text-[#9ca3af]">{stat.label}</p>
                </EditorialReveal>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <EditorialReveal className="relative min-h-[32rem] overflow-hidden border border-[#c7a86a]/35 bg-[#0d0c0a]/80 p-8 backdrop-blur-md md:p-12">
              <Award className="text-[#c7a86a]" size={28} strokeWidth={1.3} />
              <p className="mt-20 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#c7a86a]">{academicAuthority[0].eyebrow}</p>
              <h3 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.02] md:text-6xl">{academicAuthority[0].title}</h3>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-[#aaa298]">{academicAuthority[0].text}</p>
              <p className="absolute inset-x-8 bottom-8 border-t border-[#9a835b]/25 pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-[#8f887d] md:inset-x-12 md:bottom-12">{academicAuthority[0].meta}</p>
              <span className="pointer-events-none absolute -bottom-24 -right-8 font-serif text-[18rem] leading-none text-[#c7a86a]/[0.035]">26</span>
            </EditorialReveal>
            <EditorialReveal className="flex min-h-[32rem] flex-col border border-[#9a835b]/25 bg-[#0d0c0a]/78 p-8 backdrop-blur-md md:p-10">
              <ShieldCheck className="text-[#c7a86a]" size={26} strokeWidth={1.3} />
              <p className="mt-16 text-[0.58rem] font-bold uppercase tracking-[0.22em] text-[#c7a86a]">{academicAuthority[1].eyebrow}</p>
              <h3 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">{academicAuthority[1].title}</h3>
              <p className="mt-6 text-sm leading-7 text-[#aaa298]">{academicAuthority[1].text}</p>
              <p className="mt-auto border-t border-[#9a835b]/20 pt-6 text-[0.62rem] uppercase tracking-[0.18em] text-[#8f887d]">{academicAuthority[1].meta}</p>
            </EditorialReveal>
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-6 text-[#8f887d]">
            Cifras correspondientes al programa académico documentado en la pieza institucional recibida. Pendientes de validación final y autorización de logos.
          </p>

          <div className="mt-14 grid gap-3 md:grid-cols-2">
            {audiovisualEvidence.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("testimonial_play", { source: `archive_${index + 1}` })}
                className={`group relative flex min-h-44 items-center justify-between gap-5 overflow-hidden border p-7 transition-all duration-500 hover:-translate-y-1 md:p-9 ${
                  index === 0
                    ? "border-[#c7a86a]/35 bg-[linear-gradient(135deg,rgba(92,55,29,0.72),rgba(10,9,8,0.88))] hover:border-[#c7a86a]/75"
                    : "border-[#eee7db]/20 bg-[#eee7db] text-[#100f0d] hover:border-[#c7a86a]/75"
                }`}
              >
                <div>
                  <p className={`text-[0.58rem] font-bold uppercase tracking-[0.2em] ${index === 0 ? "text-[#c7a86a]" : "text-[#78552f]"}`}>Canal oficial · Facebook</p>
                  <p className="mt-4 font-serif text-2xl">{item.title}</p>
                  <p className={`mt-3 text-xs leading-6 ${index === 0 ? "text-[#b8afa3]" : "text-[#625d54]"}`}>Contenido original disponible para revisión audiovisual.</p>
                </div>
                <span className={`grid size-12 shrink-0 place-items-center rounded-full border transition-colors group-hover:bg-[#c7a86a] group-hover:text-[#11100e] ${index === 0 ? "border-[#c7a86a]/45 text-[#c7a86a]" : "border-[#78552f]/45 text-[#78552f]"}`}>
                  <Play size={15} fill="currentColor" />
                </span>
                <span className={`pointer-events-none absolute -bottom-14 right-16 font-serif text-[8rem] leading-none ${index === 0 ? "text-[#c7a86a]/[0.04]" : "text-[#78552f]/[0.07]"}`}>0{index + 1}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="relative overflow-hidden px-5 py-24 md:px-8 md:py-36">
        <div className="absolute inset-0">
          <Image src="/office_meeting.png" alt="" fill sizes="100vw" className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-[#0b0a09]/80" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionTitle eyebrow="Método de intervención" title="Control antes que reacción." text="La firma reduce incertidumbre mediante un proceso ordenado de admisión, auditoría, estrategia y ejecución." />
          </div>
          <div className="divide-y divide-[#9a835b]/25 border-y border-[#9a835b]/25">
            {interventionSteps.map((step) => (
              <EditorialReveal key={step.number} className="grid gap-5 py-12 md:grid-cols-[6rem_1fr] md:py-16">
                <span className="font-serif text-6xl leading-none text-[#c7a86a]">{step.number}</span>
                <div className="border-l border-[#9a835b]/30 pb-4 pl-8 md:pb-6 md:pl-10"><h3 className="font-serif text-2xl">{step.title}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-[#aaa298]">{step.text}</p></div>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-[#15120f] px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Ecosistema jurídico" title="Una práctica completa. Una jerarquía clara." text="La defensa penal domina nuestra intervención. Consultoría, garantías, academia y publicaciones amplían la capacidad de respuesta y la profundidad técnica." />
          <div className="mt-16 grid gap-4 md:grid-cols-2">
            {serviceCategories.slice(3).map((category) => {
              const Icon = category.icon;
              return (
                <details onToggle={() => trackEvent("service_expand", { service: category.id })} key={category.id} className="group relative border border-[#9a835b]/30 bg-[#0b0a09] text-white/55 transition-colors open:border-[#c7a86a]/60 open:text-white">
                  <span className="absolute inset-y-0 left-0 w-0 bg-[#c7a86a] transition-all group-open:w-0.5" />
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 transition-colors hover:text-white/80">
                    <span className="flex items-center gap-4"><Icon className="text-[#c7a86a]" size={20} /><span className="font-serif text-xl">{category.title}</span></span>
                    <span className="text-[#c7a86a]">+</span>
                  </summary>
                  <div className="border-t border-[#9a835b]/20 p-6">
                    <p className="text-sm leading-7 text-[#aaa298]">{category.description}</p>
                    <ul className="mt-5 grid gap-2 text-sm text-[#d4ccc0]">{category.services.map((service) => <li key={service}>— {service}</li>)}</ul>
                  </div>
                </details>
              );
            })}
          </div>
          <div className="mt-16 grid gap-px bg-[#9a835b]/25 sm:grid-cols-2 lg:grid-cols-4">
            {ecosystemItems.map((item) => {
              const Icon = item.icon;
              return <Link key={item.title} href={item.href} className="group bg-[#15120f] p-7 transition-colors hover:bg-[#1f1a14]"><Icon className="text-[#c7a86a]" size={23} strokeWidth={1.9} /><p className="mt-14 font-serif text-xl">{item.title}</p><ArrowRight className="mt-5 text-[#8f887d] transition-transform group-hover:translate-x-1 group-hover:text-[#c7a86a]" size={15} /></Link>;
            })}
          </div>
        </div>
      </section>

      <section id="admision" className="relative overflow-hidden bg-[#0b0a09] px-5 py-24 md:px-8 md:py-36">
        <div className="absolute right-0 top-0 hidden h-full w-1/2 lg:block">
          <Image src="/penal_economico_bg.png" alt="" fill sizes="50vw" className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a09] to-[#0b0a09]/35" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="Admisión selectiva" title="La primera decisión es determinar si podemos intervenir." text="Comparta únicamente información mínima. La firma revisará el asunto y verificará posibles conflictos antes de solicitar detalles sensibles." />
            <div className="mt-8 border-l border-[#c7a86a] pl-5 text-sm leading-7 text-[#aaa298]"><LockKeyhole className="mb-4 text-[#c7a86a]" size={20} />El envío no crea una relación abogado-cliente. No adjunte documentos ni describa hechos especialmente sensibles.</div>
          </div>
          <div className="border border-[#9a835b]/30 bg-[#11100e]/95 p-6 md:p-10"><IntakeForm /></div>
        </div>
      </section>

      <section id="faq" className="bg-ivory-paper px-5 py-24 text-[#100f0d] md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionTitle eyebrow="Preguntas frecuentes" title="Claridad antes de iniciar." light />
          <div className="divide-y divide-[#17140f] border-y border-[#17140f]">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none justify-between gap-5 font-serif text-2xl font-bold tracking-[-0.02em]"><span>{faq.question}</span><span className="font-sans text-[#78552f]">+</span></summary>
                <p className="max-w-2xl pt-4 text-sm leading-7 text-[#625d54]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#9a835b]/20 bg-[#11100e] py-5">
        <div className="flex w-max animate-[marquee_35s_linear_infinite] gap-12 whitespace-nowrap">
          {[...proofInstitutions, ...proofInstitutions, ...proofInstitutions].map((institution, index) => (
            <span key={`${institution}-${index}`} className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f887d]">{institution}<span className="ml-12 text-[#c7a86a]">·</span></span>
          ))}
        </div>
      </section>

      <section className="relative min-h-[65vh] overflow-hidden px-5 py-24 md:px-8">
        <ParallaxLayer className="absolute inset-0 -top-16 bottom-[-8rem]">
          <Image src="/practice-defense-marble-v1.png" alt="Arquitectura institucional en mármol oscuro" fill sizes="100vw" className="object-cover" />
        </ParallaxLayer>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(154,79,18,0.18),transparent_22%),linear-gradient(90deg,rgba(11,10,9,0.94),rgba(11,10,9,0.68))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c7a86a]/60 to-transparent" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-4xl flex-col items-center justify-center text-center">
          <Shield className="text-[#c7a86a]" size={28} strokeWidth={1.3} />
          <h2 className="mt-8 font-serif text-4xl leading-tight sm:text-5xl md:text-7xl">Cuando cada decisión importa, la defensa debe empezar antes.</h2>
          <MagneticEvaluationLink className="mt-10 inline-flex min-h-14 touch-manipulation items-center gap-3 border border-[#9a6b3d] bg-[#9a6b3d] px-6 text-center text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#f4efe5] transition-colors hover:bg-[#7f552f] sm:px-8 sm:text-xs sm:tracking-[0.18em]">Solicitar evaluación confidencial <ArrowRight size={15} /></MagneticEvaluationLink>
          <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#c7a86a]">Atención urgente <ExternalLink size={13} /></a>
        </div>
      </section>
    </div>
  );
}
