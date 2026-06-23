"use client";

import { Award, Brain, Gavel, Shield, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/animated";
import { PortraitWidget } from "@/components/portrait-widget";

const profile = [
  "Amplia trayectoria profesional y académica de trayectoria profesional en litigio penal complejo en el Ecuador.",
  "Especialización avanzada en procesos de corrupción pública y delincuencia organizada.",
  "Reconocido autor y docente de Dogmática Penal e Imputación Objetiva en posgrados.",
  "Defensa técnica rigurosa bajo los más estrictos estándares de confidencialidad.",
];

const principles = [
  {
    title: "Rigor Técnico",
    text: "Lectura jurídica y dogmática minuciosa de hechos, pruebas e imputaciones en cada etapa del proceso.",
    icon: Brain,
  },
  {
    title: "Estrategia Procesal",
    text: "Cada decisión responde a una teoría del caso estructurada científicamente y a un mapa de riesgo.",
    icon: Gavel,
  },
  {
    title: "Defensa de Alto Impacto",
    text: "Enfocada en casos críticos donde la libertad, el patrimonio, la empresa y la reputación están bajo máxima presión.",
    icon: Shield,
  },
];

export default function FirmaPage() {
  return (
    <>
      {/* 1. Immersive Hero Background using the gorgeous Office Board Room image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-5 pt-36 pb-12 bg-marble-dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="/office_meeting.png"
            alt="Sala de Juntas de Estudio Jurídico"
            fill
            className="object-cover opacity-20 filter grayscale brightness-50 contrast-[1.1] scale-102"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 led-strip-gold" />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow tracking-[0.24em] text-gold">Quiénes Somos</span>
            <h1 className="mt-6 font-serif text-5xl font-normal leading-[0.95] tracking-[-0.045em] text-[#fffaf0] sm:text-7xl">
              Nuestra Firma
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[#c9c1b5] sm:text-lg">
              Asumimos defensas penales complejas con absoluto rigor técnico, lectura estratégica del proceso y capacidad de convertir conflictos difíciles en rutas jurídicas claras.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Main content section with Portrait Widget and specific real academic references */}
      <section className="section-shell bg-[#06080b]/35 backdrop-blur-md relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* Left: Technical Profile & Real publications of Dr. Fausto */}
            <Reveal>
              <span className="eyebrow">Dirección Estratégica</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.035em] text-ivory md:text-6xl">
                Dr. Fausto Ramiro Vásquez Cevallos
              </h2>
              <div className="h-px w-20 bg-gold mt-4 mb-6" />
              
              <p className="text-[1.05rem] leading-8 text-[#b8b0a5]">
                El <strong className="font-medium text-ivory">Dr. Fausto Ramiro Vásquez Cevallos</strong> es penalista y jurista ecuatoriano. Su práctica está orientada al patrocinio de causas complejas en materia de <strong className="font-medium text-ivory">Derecho Penal Económico, Constitucional, Político y Financiero</strong>.
              </p>
              
              <p className="mt-5 text-[1.05rem] leading-8 text-[#b8b0a5]">
                Es un reconocido tratadista y docente de dogmática penal y debido proceso en programas de posgrado y especializaciones. Ha influenciado la doctrina judicial ecuatoriana a través de sus reconocidas obras de texto:
              </p>

              {/* Real Book References Plaque */}
              <div className="mt-6 border border-gold/15 bg-black/45 p-5 rounded-sm shadow-glow-gold relative overflow-hidden">
                <div className="absolute right-0 top-0 h-10 w-10 border-l border-b border-gold/10" />
                <h4 className="font-serif text-gold text-sm font-bold uppercase tracking-wider">Obras Cumbre Publicadas:</h4>
                <ul className="mt-4 grid gap-3 text-sm leading-6 text-ivory/95 font-medium pl-1">
                  <li className="flex items-center gap-2">
                    <ChevronRight size={14} className="text-gold shrink-0" />
                    <span><em>&ldquo;Punto de Inflexión de la Imputación Objetiva en el COIP&rdquo;</em> (2016)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight size={14} className="text-gold shrink-0" />
                    <span><em>&ldquo;La falsedad documental en materia penal&rdquo;</em> (2018)</span>
                  </li>
                </ul>
              </div>

              {/* List of custom capabilities profile */}
              <div className="mt-8 grid gap-3">
                {profile.map((item, idx) => (
                  <div className="flex items-start gap-3 border border-gold/10 bg-[#0b0f14]/50 p-4 rounded-sm hover:border-gold/25 transition duration-300" key={idx}>
                    <Award className="text-gold shrink-0 mt-0.5" size={17} strokeWidth={1.8} />
                    <p className="text-sm leading-6 text-[#b8b0a5] group-hover:text-ivory">{item}</p>
                  </div>
                ))}
              </div>

              {/* Animated Signature vector */}
              <div className="mt-8 flex flex-col items-center sm:items-start pl-2">
                <svg
                  className="w-48 h-14 text-gold opacity-90 hover:opacity-100 transition duration-300"
                  viewBox="0 0 200 70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
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
                <span className="text-[0.55rem] max-sm:text-[0.6rem] uppercase tracking-[0.24em] text-gold/60 mt-1 pl-4">Firma de Responsabilidad Técnica</span>
              </div>
            </Reveal>

            {/* Right: Premium Portrait Widget with interactive 3D Mouse Tilt */}
            <Reveal delay={0.18} className="flex justify-center">
              <PortraitWidget />
            </Reveal>

          </div>
        </div>
      </section>

      {/* 3. Principles section with beveled glassmorphic cards */}
      <section className="section-shell border-y border-gold/15 bg-marble-dark overflow-hidden">
        <div className="absolute top-0 inset-x-0 led-strip-gold animate-pulse-soft" />
        <div className="mx-auto max-w-7xl relative z-10">
          
          <div className="text-center mb-14">
            <Reveal>
              <span className="eyebrow">Filosofía</span>
              <h3 className="mt-4 font-serif text-3xl sm:text-4xl text-ivory tracking-wide uppercase">Nuestros Pilares</h3>
              <div className="h-px w-20 bg-gold mx-auto mt-4" />
            </Reveal>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal delay={index * 0.07} key={item.title}>
                  <article className="h-full rounded-sm glass-beveled border-gold-active p-8 hover:translate-y-[-6px] duration-500">
                    <div className="flex items-center justify-between text-gold">
                      <Icon size={24} strokeWidth={1.5} />
                      <span className="font-serif text-xs font-bold text-gold/30">0{index + 1}</span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl text-ivory tracking-wide group-hover:text-gold transition duration-300">{item.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-steel group-hover:text-ivory/80 transition duration-300">{item.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

        </div>
      </section>

      <CtaBand />
    </>
  );
}
