import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import { ConsultationActions } from "@/components/consultation-actions";

export const metadata: Metadata = {
  title: { absolute: "Abogado de derecho penal económico en Quito | Dr. Fausto Vásquez Cevallos" },
  description: "Defensa penal económica en Quito para directivos y empresas. Investigaciones sobre fraude, documentación y operaciones patrimoniales.",
  alternates: { canonical: "/derecho-penal-economico" },
};

export default function PenalEconomicoPage() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Penal económico"
        title="Defensa penal económica en Quito."
        text="Defensa en investigaciones donde confluyen actividad comercial, patrimonio, documentación y riesgo penal. Una lectura del expediente que reconstruye las decisiones y su contexto."
        photo={heroPhotos.office}
        actionHref="#consulta-form"
        actionLabel="Solicitar evaluación privada"
      />
      <section id="contenido" className="in-wrap in-economic" aria-labelledby="economico-titulo">
        <div>
          <header className="in-heading">
            <p className="ed-kicker">Empresa y responsabilidad</p>
            <h2 id="economico-titulo">La decisión bajo investigación</h2>
          </header>
          <dl className="in-ledger">
            <div><dt>Conflictos empresariales</dt><dd>Asuntos societarios y comerciales con relevancia penal, como fraude, estafa, abuso de confianza y documentación cuestionada.</dd></div>
            <div><dt>Decisiones de directivos</dt><dd>Análisis de competencias, información disponible, decisiones colegiadas y atribución individual de responsabilidad.</dd></div>
            <div><dt>Operaciones financieras</dt><dd>Lectura de flujos patrimoniales, contratos y pericias. <Link href="/areas-de-practica/lavado-de-activos">Defensa en lavado de activos</Link>.</dd></div>
          </dl>
          <Link href="/areas-de-practica/litigio-penal-estrategico" className="ed-text-link">Consultar una segunda opinión <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <figure>
          <Image src="/estudio/laptop-quito.webp" alt="Fausto Vásquez Cevallos en su mesa de trabajo" width={960} height={1280} sizes="(max-width: 680px) 88vw, 32vw" />
        </figure>
      </section>
      <section id="consulta-form" className="in-wrap in-action in-tint ed-contact" aria-labelledby="economico-consulta">
        <div>
          <p className="ed-kicker">Primera conversación</p>
          <h2 id="economico-consulta">De la operación al expediente</h2>
          <p>La primera revisión sitúa el contrato u operación, el papel de quien consulta y el estado de las notificaciones, informes o pericias.</p>
        </div>
        <ConsultationActions source="especialidad-penal-economico" />
      </section>
    </div>
  );
}
