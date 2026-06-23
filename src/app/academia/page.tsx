import type { Metadata } from "next";
import { BriefcaseBusiness, Scale, ShieldCheck, FileText, ChevronRight, Award } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/animated";
import { CardSpotlight } from "@/components/card-spotlight";
import { contactMessage, pageDescriptions, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Academia de Derecho Penal y Litigación",
  description: pageDescriptions.academia,
  alternates: {
    canonical: "/academia",
  },
};

const academicPrograms = [
  {
    title: "Derecho Penal Económico",
    description: "Análisis de delitos económicos, empresariales y financieros.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Dogmática Penal",
    description: "Fundamentos, principios y teorías del delito y la pena.",
    icon: Award,
  },
  {
    title: "Litigación Estratégica",
    description: "Técnicas avanzadas para la defensa, acusación y juicio.",
    icon: Scale,
  },
  {
    title: "Imputación Objetiva",
    description: "Criterios actuales de atribución de responsabilidad penal.",
    icon: ShieldCheck,
  },
  {
    title: "Reformas al COIP",
    description: "Estudio crítico de las reformas penales y su aplicación práctica.",
    icon: FileText,
  },
];

export default function AcademiaPage() {
  return (
    <>
      {/* 1. Hero / Portada de la Academia */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-5 pt-36 pb-20 md:px-8 bg-marble-dark">
        
        {/* Background city night overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/quito_night.png"
            alt="Quito de Noche"
            fill
            className="object-cover opacity-45 filter grayscale brightness-[0.6] contrast-[1.2] transition-transform duration-[12s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-[#0b0f14]/80 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 led-strip-gold" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* Left: Headline & Buttons */}
            <Reveal className="max-w-2xl">
              <span className="eyebrow tracking-[0.24em] text-gold">FORMACIÓN JURÍDICA DE EXCELENCIA</span>
              <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-ivory tracking-tight">
                ACADEMIA DE <br />
                <span className="text-gold-metallic font-extrabold uppercase">DERECHO PENAL</span>
              </h1>
              <div className="h-px w-24 bg-gold my-6" />
              <p className="text-base sm:text-lg leading-8 text-steel">
                Formación jurídica de excelencia para abogados que litigan, defienden y transforman la práctica procesal contemporánea.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#oferta"
                  className="inline-flex h-12 items-center justify-center border border-gold bg-gold hover:bg-ivory hover:border-ivory px-6 text-xs uppercase tracking-widest text-graphite font-semibold transition duration-300"
                >
                  Ver Programas
                </a>
                <ButtonLink href={whatsappHref(contactMessage)} target="_blank" variant="secondary">
                  Solicitar Información
                </ButtonLink>
              </div>
            </Reveal>

            {/* Right: Speaker frame using Dr. Fausto real portrait with warm backlighting */}
            <Reveal delay={0.18} className="flex justify-center">
              <div className="relative group p-3 border border-gold/25 bg-[#0b0f14] shadow-[0_20px_50px_rgba(0,0,0,0.55)] rounded-sm">
                
                {/* Simulated podium spotlight */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-44 h-20 bg-gold/20 blur-[30px] rounded-full pointer-events-none" />
                
                <div className="relative overflow-hidden w-full max-w-[360px] aspect-[4/5] border border-gold/15 bg-graphite">
                  <Image
                    src="/portrait_fausto.jpg"
                    alt="Dr. Fausto Vásquez - Conferencista de la Academia"
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/50 to-transparent" />
                </div>
                
                {/* Tiny digital signature/monogram in corner */}
                <div className="mt-4 text-center">
                  <span className="font-serif text-[0.8rem] text-gold uppercase tracking-[0.24em]">Dr. Fausto Vásquez Abogados</span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 2. Nuestra Oferta Académica - Grid de Tarjetas en Mármol y Oro */}
      <section id="oferta" className="section-shell bg-[#06080b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,155,94,0.05),transparent_35%)] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <Reveal>
              <span className="eyebrow">Programas</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-ivory tracking-wide uppercase">
                NUESTRA OFERTA ACADÉMICA
              </h2>
              <div className="h-px w-20 bg-gold mx-auto mt-4 mb-6" />
              <p className="max-w-2xl mx-auto text-sm text-steel leading-relaxed">
                Programas diseñados para fortalecer tu conocimiento, habilidades y pensamiento estratégico en el Derecho Penal.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {academicPrograms.map((program, index) => {
              const ProgramIcon = program.icon;
              return (
                <Reveal delay={index * 0.06} key={program.title} className="h-full">
                  <CardSpotlight className="h-full shadow-glow-gold">
                    <article className="relative flex h-full min-h-[280px] flex-col bg-graphite/40 p-6 rounded-sm transition duration-300 hover:bg-black/10">
                      <div className="flex items-center justify-between text-gold">
                        <div className="grid size-11 place-items-center border border-gold/30 bg-gold/5 group-hover:bg-gold/10 transition">
                          <ProgramIcon size={20} strokeWidth={1.5} />
                        </div>
                        <ChevronRight className="text-steel/50 group-hover:text-gold transition group-hover:translate-x-1 duration-300" size={16} />
                      </div>

                      <h3 className="mt-8 font-serif text-lg leading-tight text-ivory tracking-wide group-hover:text-gold transition duration-300">
                        {program.title}
                      </h3>
                      
                      <p className="mt-4 text-xs leading-relaxed text-steel group-hover:text-ivory/80 transition duration-300">
                        {program.description}
                      </p>

                      <div className="mt-auto pt-6 text-[0.6rem] max-sm:text-[0.65rem] uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition duration-300">
                        Ver más
                      </div>

                      {/* Subtle corner detail */}
                      <div className="absolute right-0 bottom-0 h-4 w-4 border-r border-b border-gold/15 group-hover:border-gold/40 transition duration-300" />
                    </article>
                  </CardSpotlight>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      <CtaBand title="Formación jurídica avanzada con precisión dogmática y práctica real." />
    </>
  );
}
