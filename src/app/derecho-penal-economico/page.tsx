"use client";

import { AlertTriangle, Building2, FileSearch, ShieldCheck, WalletCards, ChevronRight } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/animated";

const subjects = [
  { title: "Conflictos comerciales con riesgo penal en el Ecuador", icon: AlertTriangle },
  { title: "Responsabilidad penal de empresarios y directivos bajo el COIP", icon: Building2 },
  { title: "Delitos financieros, lavado de activos y origen de fondos", icon: WalletCards },
  { title: "Defensa penal corporativa y criminal compliance", icon: ShieldCheck },
  { title: "Prevención y mitigación estratégica antes de una instrucción fiscal", icon: FileSearch },
];

export default function PenalEconomicoPage() {
  return (
    <>
      {/* 1. Immersive Hero Background using the gorgeous Reception image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden px-5 pt-36 pb-12 bg-marble-dark">
        <div className="absolute inset-0 z-0">
          <Image
            src="/penal_economico_bg.png"
            alt="Bóveda de Seguridad Penal Económico"
            fill
            className="object-cover opacity-45 filter grayscale brightness-[0.6] contrast-[1.1] scale-102 transition-transform duration-[12s]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14] via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 led-strip-gold" />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow tracking-[0.24em] text-gold">Capacidad Especializada</span>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl text-gold-metallic animate-text-shine tracking-tight leading-none uppercase select-none">
              Penal Económico
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-steel leading-relaxed">
              El derecho penal económico exige una defensa distinta: comprensión profunda de operaciones empresariales, flujos financieros, decisiones corporativas y debido proceso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Main content section with connected layouts */}
      <section className="section-shell bg-[#06080b]/35 backdrop-blur-md relative overflow-hidden">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* Left Column: Core content & subjects lists */}
            <Reveal>
              <span className="eyebrow">Defensa Corporativa</span>
              <h2 className="mt-4 font-serif text-4xl text-ivory tracking-wide leading-tight uppercase">
                La frontera entre decisiones comerciales y riesgo penal
              </h2>
              <div className="h-px w-20 bg-gold mt-4 mb-6" />
              
              <p className="text-base leading-relaxed text-steel mb-8">
                No basta con conocer la ley penal sustantiva. Es necesario reconstruir las decisiones del directorio, verificar la trazabilidad de contratos, auditar los flujos patrimoniales y estructurar una teoría del caso defensiva rigurosa antes de que una discrepancia comercial se convierta en una acusación formal de la Fiscalía.
              </p>

              <div className="grid gap-4 mt-6">
                {subjects.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Reveal delay={index * 0.05} key={item.title}>
                      <div className="flex items-center gap-4 border border-gold/15 bg-black/45 p-5 rounded-sm shadow-glow-gold hover:border-gold/35 transition duration-300">
                        <span className="grid size-11 shrink-0 place-items-center border border-gold/30 bg-gold/5 text-gold rounded-full">
                          <Icon size={20} strokeWidth={1.5} />
                        </span>
                        <span className="text-sm font-semibold tracking-wide text-ivory/95">{item.title}</span>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <div className="mt-8">
                <ButtonLink href="/contacto" className="shadow-glow-gold">
                  Solicitar Evaluación de Caso
                </ButtonLink>
              </div>
            </Reveal>

            {/* Right Column: Volumetric Board Room card with gold framing */}
            <Reveal delay={0.18} className="flex justify-center">
              <div className="relative group p-3 border border-gold/25 bg-[#0b0f14] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm">
                
                {/* Spotlight glow overlay */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-gold/15 blur-[35px] rounded-full pointer-events-none" />
                
                <div className="relative overflow-hidden w-full max-w-[380px] aspect-[4/5] border border-gold/15 bg-graphite">
                  <Image
                    src="/office_meeting.png"
                    alt="Sala de juntas ejecutiva"
                    fill
                    className="object-cover transition duration-[8s] scale-102 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Captions */}
                <div className="mt-4 text-center">
                  <h3 className="font-serif text-lg font-bold text-ivory">Gabinete de Crisis</h3>
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-gold mt-1 font-semibold">Defensa Empresarial & Corporativa</p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <CtaBand title="El derecho penal económico exige precisión, prueba y estrategia." />
    </>
  );
}
