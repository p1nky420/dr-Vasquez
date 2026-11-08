import type { Metadata } from "next";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import { PracticeGrid } from "@/components/practice-grid";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const metadata: Metadata = {
  title: "Áreas de práctica | Abogado penalista en Quito",
  description:
    "Administración pública, penal económico, delitos financieros y garantías constitucionales. Defensa penal del Dr. Fausto Vásquez Cevallos.",
  alternates: { canonical: "/areas-de-practica" },
};
export default function AreasPage() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Especialidades"
        title="Cada asunto exige una estrategia propia."
        text="Libertad, patrimonio y reputación. Defensa penal en investigaciones y procesos de alta complejidad, previa evaluación del asunto."
        photo={heroPhotos.practice}
        actionLabel="Explorar especialidades"
      />
      <section id="contenido" className="in-wrap" aria-labelledby="practicas-titulo">
        <header className="in-heading">
          <p className="ed-kicker">Ámbitos de intervención</p>
          <h2 id="practicas-titulo">Explore las especialidades</h2>
        </header>
        <PracticeGrid />
      </section>
      <aside className="in-wrap in-action in-tint" aria-labelledby="practicas-orientacion">
        <div>
          <p className="ed-kicker">Orientación inicial</p>
          <h2 id="practicas-orientacion">¿Por dónde empezar?</h2>
          <p>Atendemos consultas de personas, funcionarios, contratistas y empresas. La primera conversación permite revisar el alcance del asunto y posibles conflictos de interés.</p>
        </div>
        <div className="in-action__links">
          <Link className="fv-cover__action" href="/contacto#contenido">Coordinar una consulta <ArrowUpRight size={17} aria-hidden="true" /></Link>
          <Link className="ed-text-link" href="/areas-de-practica/litigio-penal-estrategico">Solicitar una segunda opinión <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </aside>
    </div>
  );
}
