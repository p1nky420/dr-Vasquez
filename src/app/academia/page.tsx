import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WhatsappCta } from "@/components/whatsapp-cta";
import { AcademicCredentials } from "@/components/academic-credentials";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
export const metadata: Metadata = {
  title: "Actividad académica y docencia en derecho penal",
  description:
    "Docencia, pensamiento jurídico y líneas de formación del Dr. Fausto Vásquez Cevallos.",
  alternates: { canonical: "/academia" },
};
export default function AcademiaPage() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Academia"
        title="El conocimiento también se comparte."
        text="Docencia y discusión jurídica en diálogo con la práctica. Derecho penal, prueba y proceso como ámbitos de estudio y reflexión."
        photo={heroPhotos.desk}
        actionHref="#trayectoria-academica"
        actionLabel="Explorar trayectoria académica"
      />
      <AcademicCredentials />
      <section id="contenido" className="in-wrap in-tint in-seminar" aria-labelledby="academia-lineas">
        <header className="in-heading">
          <p className="ed-kicker">Líneas de estudio</p>
          <h2 id="academia-lineas">Temas que conectan el aula y el litigio</h2>
          <Link className="ed-text-link" href="/publicaciones#contenido">Consultar obra jurídica <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </header>
        <dl className="in-ledger">
          <div><dt>Dogmática penal</dt><dd>Teoría del delito, atribución de responsabilidad y argumentación jurídica.</dd></div>
          <div><dt>Prueba y proceso</dt><dd>Prueba documental, etapas del proceso penal y construcción de argumentos.</dd></div>
          <div><dt>Litigio estratégico</dt><dd>Teoría del caso, preparación de audiencias y análisis de decisiones procesales.</dd></div>
          <div><dt>Derecho penal económico</dt><dd>Actividad empresarial, decisiones corporativas y responsabilidad penal.</dd></div>
        </dl>
      </section>
      <aside className="in-wrap in-action" aria-labelledby="academia-invitacion">
        <div>
          <h2 id="academia-invitacion">Invitaciones académicas</h2>
          <p>Para una conferencia o actividad docente, indique la institución, el tema y las fechas tentativas.</p>
        </div>
        <div className="in-action__links">
          <WhatsappCta location="interior-cierre" label="Consultar actividad académica" message="Hola, deseo consultar sobre una actividad académica con el Dr. Fausto Vásquez Cevallos." />
          <Link href="/eventos#contenido" className="ed-text-link">Ver formatos de encuentro <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </aside>
    </div>
  );
}
