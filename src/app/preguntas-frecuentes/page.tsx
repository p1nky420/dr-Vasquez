import type { Metadata } from "next";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaqExplorer } from "@/components/faq-explorer";
import { faqs } from "@/lib/home-content";
import { SITE_URL, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
export const metadata: Metadata = {
  title: "Preguntas frecuentes sobre procesos penales en Ecuador",
  description:
    "Orientación inicial sobre procesos penales, evaluación de asuntos, confidencialidad y atención del Dr. Fausto Vásquez Cevallos.",
  alternates: { canonical: "/preguntas-frecuentes" },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    faqJsonLd(`${SITE_URL}/preguntas-frecuentes`, faqs),
    breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
    ]),
  ],
};
export default function FaqPage() {
  return (
    <div className="ed-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Orientación inicial"
        title="Claridad antes de dar el siguiente paso."
        text="Respuestas sobre el proceso penal y la atención del despacho. Son orientaciones generales y no sustituyen la evaluación privada de un caso."
        photo={heroPhotos.meetings}
        actionLabel="Buscar una respuesta"
      />
      <section id="contenido" className="in-wrap in-faq" aria-labelledby="preguntas-titulo">
        <header className="in-heading">
          <p className="ed-kicker">Preguntas frecuentes</p>
          <h2 id="preguntas-titulo">Encuentre su pregunta</h2>
        </header>
        <FaqExplorer items={faqs} />
        <aside className="in-faq__help">
          <div><h3>¿Su situación requiere una revisión individual?</h3><p>El despacho puede orientarle en una evaluación privada.</p></div>
          <Link className="fv-cover__action" href="/contacto#contenido">Coordinar una consulta <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </aside>
      </section>
    </div>
  );
}
