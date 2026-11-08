import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { heroPhotos, type HeroPhoto } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaqExplorer } from "@/components/faq-explorer";
import { ConsultationActions } from "@/components/consultation-actions";
import {
  SITE_URL,
  breadcrumbJsonLd,
  faqJsonLd,
  getLanding,
  practiceLandings,
} from "@/lib/seo";
type Params = { params: Promise<{ slug: string }> };
const presentations: Record<string, { photo: HeroPhoto; focus: string }> = {
  "delitos-administracion-publica": { photo: heroPhotos.practice, focus: "De la decisión administrativa a la imputación" },
  "lavado-de-activos": { photo: heroPhotos.desk, focus: "Operaciones, documentos y pericias" },
  "constitucional-penal": { photo: heroPhotos.window, focus: "Garantías y actuaciones cuestionadas" },
  "litigio-penal-estrategico": { photo: heroPhotos.chessRoom, focus: "Prueba, audiencias y decisiones pendientes" },
};
export function generateStaticParams() {
  return practiceLandings.map((landing) => ({ slug: landing.slug }));
}
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const landing = getLanding((await params).slug);
  if (!landing) return {};
  const photo = presentations[landing.slug]?.photo ?? heroPhotos.practice;
  return {
    title: { absolute: `${landing.metaTitle} | Dr. Fausto Vásquez Cevallos` },
    description: landing.metaDescription,
    alternates: { canonical: `${SITE_URL}/areas-de-practica/${landing.slug}` },
    openGraph: {
      title: landing.metaTitle,
      description: landing.metaDescription,
      url: `${SITE_URL}/areas-de-practica/${landing.slug}`,
      locale: "es_EC",
      type: "article",
      images: [{ url: photo.src, alt: photo.alt, width: photo.width, height: photo.height }],
    },
  };
}
export default async function PracticeLandingPage({ params }: Params) {
  const landing = getLanding((await params).slug);
  if (!landing) notFound();
  const url = `${SITE_URL}/areas-de-practica/${landing.slug}`;
  const presentation = presentations[landing.slug];
  const related = landing.related.map(getLanding).filter(item => item !== undefined);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: landing.title,
        description: landing.metaDescription,
        url,
        provider: { "@id": `${SITE_URL}/#legal-service` },
        areaServed: { "@type": "Country", name: "Ecuador" },
      },
      faqJsonLd(url, landing.faqs),
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Especialidades", path: "/areas-de-practica" },
        { name: landing.title, path: `/areas-de-practica/${landing.slug}` },
      ]),
    ],
  };
  return (
    <div className="ed-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={landing.eyebrow}
        title={landing.keyword}
        text={landing.lede}
        photo={presentation?.photo}
        actionHref="#consulta-form"
        actionLabel="Solicitar evaluación privada"
      />
      <div id="contenido" className="in-wrap in-case">
        <div className="in-case__reading">
          <section aria-labelledby="caso-contexto">
            <header className="in-heading">
              <p className="ed-kicker">Reconozca su situación</p>
              <h2 id="caso-contexto">Cuándo consultar</h2>
            </header>
            <ul className="in-checklist">
              {landing.situations.map(text => <li key={text}>{text}</li>)}
            </ul>
          </section>
          <section aria-labelledby="caso-intervencion" className="in-dossier">
            <p className="ed-kicker">Cómo interviene el despacho</p>
            <h2 id="caso-intervencion">{presentation?.focus ?? "Claves de la defensa"}</h2>
            <div className="in-dossier__grid">
              {landing.work.map(work => (
                <article key={work.title}>
                  <h3>{work.title}</h3>
                  <p>{work.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section aria-labelledby="caso-preguntas" className="in-case__faq">
            <h2 id="caso-preguntas">Preguntas de esta especialidad</h2>
            <FaqExplorer items={landing.faqs} showSearch={false} />
          </section>
        </div>
        <aside id="consulta-form" className="in-case__contact ed-contact" aria-labelledby="caso-consulta">
          <p className="ed-kicker">Primera conversación</p>
          <h2 id="caso-consulta">Qué revisa el despacho</h2>
          <p>{landing.firstReview}</p>
          <p className="in-case__privacy">Antes de recibir documentación, el despacho confirma disponibilidad y posibles conflictos de interés. Comparta solo sus datos de contacto en el primer mensaje.</p>
          <ConsultationActions source={`especialidad-${landing.slug}`} message="Hola, deseo coordinar una evaluación privada con el Dr. Fausto Vásquez Cevallos." />
        </aside>
      </div>
      {related.length > 0 && (
        <nav className="in-wrap in-tint in-related" aria-label="Especialidades relacionadas">
          <p className="ed-kicker">Especialidades relacionadas</p>
          <div>
            {related.map(item => (
              <Link key={item.slug} href={`/areas-de-practica/${item.slug}`}>
                <span>{item.title}</span><ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
