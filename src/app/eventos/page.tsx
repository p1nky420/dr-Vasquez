import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/animated";
import { eventFormats, pageDescriptions } from "@/lib/site";

export const metadata: Metadata = {
  title: "Eventos de Derecho Penal y Litigio Estratégico",
  description: pageDescriptions.eventos,
  alternates: {
    canonical: "/eventos",
  },
};

export default function EventosPage() {
  return (
    <>
      <PageHero
        eyebrow="Eventos"
        title="Eventos, seminarios y formación jurídica de alto nivel"
        text="La firma proyecta seminarios, masterclass y eventos especializados en derecho penal económico, litigio estratégico y dogmática penal contemporánea, con participación de juristas nacionales e internacionales."
        bgImage="/eventos_bg.png"
      />
      <section className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-5">
          {eventFormats.map((format, index) => (
            <Reveal delay={index * 0.06} key={format}>
              <article className="h-full border border-ivory/10 bg-ivory/[0.035] p-6 transition hover:-translate-y-1 hover:border-gold/45">
                <CalendarDays className="text-gold" size={27} strokeWidth={1.5} />
                <h2 className="mt-7 font-serif text-2xl leading-tight text-ivory">{format}</h2>
                <p className="mt-4 text-sm leading-7 text-steel">
                  Formato diseñado para discusión técnica, networking profesional y actualización especializada.
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaBand title="Eventos jurídicos para quienes exigen profundidad, técnica y estrategia." />
    </>
  );
}
