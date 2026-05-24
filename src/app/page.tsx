"use client";

import { ArrowRight, CheckCircle2, FileSearch, Shield } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BrandMarquee } from "@/components/brand-marquee";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { CredentialsStrip } from "@/components/credentials-strip";
import { EditorialInsights } from "@/components/editorial-insights";
import { IntelligencePanel } from "@/components/intelligence-panel";
import { PracticeGrid } from "@/components/practice-grid";
import { ProcessTimeline } from "@/components/process-timeline";
import { RepresentativeMatters } from "@/components/representative-matters";
import { Reveal } from "@/components/animated";
import { SectionHeading } from "@/components/section-heading";
import { PortraitWidget } from "@/components/portrait-widget";
import {
  contactMessage,
  courses,
  whatsappHref,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* 1. Hero Section (Inmersiva, limpia y de absoluta elegancia minimalista) */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 md:px-8">
        
        {/* Background Image: Maximum clarity and fotorrealism */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/reception_marble.png"
            alt="Recepción Estudio Jurídico Dr. Fausto Vásquez"
            fill
            className="object-cover opacity-85 filter brightness-[0.75] contrast-[1.05] transition-transform duration-[15s] scale-102 ease-out select-none pointer-events-none"
            priority
          />
          {/* Smart responsive gradient overlay to fully clear background text overlap on mobile vs desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14]/92 via-[#0b0f14]/82 to-[#0b0f14] md:bg-gradient-to-r md:from-[#0b0f14]/90 md:via-[#0b0f14]/30 md:to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 led-strip-gold" />
        </div>

        <div className="absolute left-5 top-28 z-10 hidden h-[62vh] w-px bg-gradient-to-b from-transparent via-gold/45 to-transparent lg:block" />
        <div className="absolute bottom-8 left-5 z-10 hidden origin-left -rotate-90 text-[0.66rem] uppercase tracking-[0.38em] text-gold lg:block">
          Defensa Penal · Estrategia · Prueba · Garantías
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            
            {/* Left Column content styled with extreme polish */}
            <Reveal>
              <span className="eyebrow tracking-[0.24em] text-gold/95 bg-black/45 px-3 py-1 border border-gold/10 backdrop-blur-sm rounded-sm inline-block">
                Firma Penal Especializada
              </span>
              
              <h1 className="mt-8 font-serif text-[2.5rem] leading-[1.08] text-ivory sm:text-[3.8rem] lg:text-[4.4rem] tracking-tight text-balance font-light shadow-sm text-shadow-premium">
                Casos críticos <br />
                requieren <span className="text-gold-gradient font-black">defensa penal superior.</span>
              </h1>
              
              <p className="mt-6 max-w-lg text-pretty text-sm sm:text-base leading-relaxed text-[#eae5d9] bg-black/45 p-5 border-l-2 border-gold backdrop-blur-md rounded-r-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                Derecho Penal Económico, Constitucional, Político y Financiero para escenarios críticos donde están en juego la libertad, el patrimonio, la empresa y la reputación.
              </p>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <ButtonLink href="/contacto" className="shadow-glow-gold bg-gold text-graphite hover:bg-ivory font-semibold text-xs tracking-widest uppercase">
                  Solicitar evaluación del caso
                </ButtonLink>
                <a
                  href={whatsappHref(contactMessage)}
                  target="_blank"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-gold/20 bg-black/35 hover:bg-gold/15 px-6 text-xs uppercase tracking-widest text-gold font-medium backdrop-blur-sm transition duration-300 rounded-sm"
                >
                  Contactar por WhatsApp
                </a>
              </div>
            </Reveal>

          </div>

          {/* Quick value props bar - simplified */}
          <Reveal delay={0.24} className="mt-20 grid gap-4 sm:grid-cols-3 max-w-5xl">
            <div className="flex items-center gap-4 border border-gold/10 bg-black/30 p-4 backdrop-blur-md rounded-sm transition hover:border-gold/20">
              <Shield className="text-gold shrink-0" size={18} strokeWidth={1.5} />
              <span className="text-[0.66rem] uppercase tracking-wider text-ivory font-medium">Libertad y reputación bajo estrategia</span>
            </div>
            <div className="flex items-center gap-4 border border-gold/10 bg-black/30 p-4 backdrop-blur-md rounded-sm transition hover:border-gold/20">
              <FileSearch className="text-gold shrink-0" size={18} strokeWidth={1.5} />
              <span className="text-[0.66rem] uppercase tracking-wider text-ivory font-medium">Análisis probatorio y dogmático</span>
            </div>
            <div className="flex items-center gap-4 border border-gold/10 bg-black/30 p-4 backdrop-blur-md rounded-sm transition hover:border-gold/20">
              <ArrowRight className="text-gold shrink-0" size={18} strokeWidth={1.5} />
              <span className="text-[0.66rem] uppercase tracking-wider text-ivory font-medium">Ruta procesal clara desde el inicio</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Sección del Abogado Principal */}
      <section className="section-shell border-y border-gold/10 bg-[#070a0e]/40 backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(184,155,94,0.06),transparent_40%)] pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* Left: Biography and Technical Rigor */}
            <Reveal>
              <span className="eyebrow">Dirección Técnica</span>
              <h2 className="mt-4 font-serif text-4xl text-ivory tracking-wide leading-tight uppercase">
                Defensa de excelencia guiada por la técnica y la dogmática.
              </h2>
              <div className="h-px w-16 bg-gold mt-4 mb-6" />
              
              <div className="border-l-2 border-gold/40 pl-6 py-1 mb-6">
                <p className="font-serif text-lg sm:text-xl leading-relaxed text-ivory/95 italic">
                  "No se trata solo de comparecer en audiencias; se trata de desmantelar la acusación mediante una teoría del caso científicamente estructurada."
                </p>
              </div>
              
              <p className="text-sm leading-relaxed text-steel">
                El **Dr. Fausto Vásquez** cuenta con más de dos décadas de trayectoria en litigio de alta complejidad en el Ecuador. Su práctica se fundamenta en un análisis dogmático profundo, una lectura estratégica impecable de los flujos de información procesal y una argumentación técnica capaz de resistir el rigor de los tribunales de casación.
              </p>
              
              {/* Signature with small elegant layout */}
              <div className="mt-8 flex flex-wrap items-center gap-8">
                <div>
                  <svg
                    className="w-44 h-12 text-gold/80 hover:text-gold transition duration-300"
                    viewBox="0 0 200 70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <motion.path
                      d="M 25 45 C 32 15, 48 10, 42 40 C 38 55, 20 65, 38 62 C 60 58, 75 42, 90 40 C 105 38, 122 45, 138 42 C 152 40, 168 32, 185 45"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.2, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M 80 40 C 85 30, 90 28, 98 50 C 102 55, 110 30, 120 40 C 130 50, 138 38, 145 42 M 55 20 L 135 20"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
                    />
                  </svg>
                </div>
                
                <ButtonLink href="/firma" variant="secondary" className="group">
                  Conocer la firma <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={15} />
                </ButtonLink>
              </div>
            </Reveal>

            {/* Right: PortraitWidget with pure interactive mouse-hover 3D tilt */}
            <Reveal delay={0.18} className="flex justify-center">
              <PortraitWidget />
            </Reveal>

          </div>
        </div>
      </section>

      {/* 3. Panel de Inteligencia y Casos */}
      <IntelligencePanel />
      <RepresentativeMatters />

      {/* 4. Áreas de Defensa Especializada */}
      <section className="section-shell relative overflow-hidden bg-[#06080b]/35 backdrop-blur-md">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Áreas de práctica"
            title="Áreas de defensa penal especializada"
            text="Una defensa superior exige comprender el proceso penal, la prueba, la empresa, los flujos financieros y el contexto institucional."
            align="center"
          />
          <div className="mt-12">
            <PracticeGrid />
          </div>
        </div>
      </section>

      {/* 5. Metodología de Defensa */}
      <section className="section-shell relative bg-marble-dark overflow-hidden">
        <div className="absolute top-0 inset-x-0 led-strip-gold" />
        
        {/* Background Meeting Room Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/office_meeting.png"
            alt="Sala de juntas corporativa"
            fill
            className="object-cover opacity-[0.05] filter grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14]/50 via-transparent to-[#0b0f14]/50" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <SectionHeading
            eyebrow="Metodología"
            title="Estrategia, prueba y litigio: el método para ordenar casos complejos"
            text="Cada decisión debe responder a una teoría de defensa clara, verificable y preparada para audiencias, recursos o juicio oral."
            align="center"
          />
          <div className="mt-16">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* 6. Formación Académica */}
      <section className="section-shell bg-[#070a0e]/40 backdrop-blur-md relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Academia"
            title="Formación avanzada en derecho penal y litigio estratégico"
            text="Cursos futuros para abogados, estudiantes y profesionales que buscan comprender el derecho penal desde la técnica, la dogmática y la práctica real del litigio."
          />
          <div className="grid gap-4">
            {courses.map((course, index) => (
              <Reveal delay={index * 0.05} key={course}>
                <div className="flex items-center gap-4 border border-gold/10 bg-graphite/40 p-5 text-ivory backdrop-blur-sm rounded-sm hover:border-gold/30 transition">
                  <CheckCircle2 className="text-gold shrink-0" size={18} />
                  <span className="text-sm tracking-wide font-medium">{course}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Análisis e Insights Académicos */}
      <EditorialInsights />

      <CtaBand />
    </>
  );
}
