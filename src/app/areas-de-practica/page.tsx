import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { PracticeGrid } from "@/components/practice-grid";
import { Reveal } from "@/components/animated";
import { practiceAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "Áreas de Práctica | Abogado Penalista Quito",
  description:
    "Defensa especializada en Derecho Penal Económico, lavado de activos, delitos financieros y litigio estratégico en Quito, Ecuador.",
  alternates: {
    canonical: "https://faustovasquezabogados.com/areas-de-practica",
  },
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Áreas de práctica"
        title="Áreas de defensa penal especializada"
        text="Casos empresariales, financieros, constitucionales y políticos requieren una defensa penal capaz de leer hechos, prueba, instituciones y estrategia."
        bgImage="/consultoria_bg.png"
      />
      <section className="section-shell">
        <div className="mx-auto max-w-7xl">
          <PracticeGrid />
        </div>
      </section>
      <section className="section-shell border-y border-gold/10 bg-[#090d12]/45 backdrop-blur-md relative overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <p className="eyebrow">Criterio rector</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ivory md:text-6xl">
              Libertad, patrimonio, empresa y reputación requieren una defensa superior.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {practiceAreas.map((area, index) => (
              <Reveal delay={index * 0.04} key={area.title}>
                <div className="border border-ivory/10 bg-ivory/[0.035] p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl text-ivory">{area.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
