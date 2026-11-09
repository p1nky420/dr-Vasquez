import type { Metadata } from "next";
import Link from "next/link";
import { WhatsappCta } from "@/components/whatsapp-cta";
import { ArrowUpRight, BookOpenText, FileText } from "lucide-react";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { books, researchArticle } from "@/lib/publications";

export const metadata: Metadata = {
  title: { absolute: "Libros y publicaciones del Dr. Fausto Vásquez Cevallos" },
  description: "Bibliografía del Dr. Fausto Vásquez Cevallos sobre prueba documental, proceso penal e imputación objetiva en el COIP.",
  alternates: { canonical: "/publicaciones" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...books.map(book => ({
      "@type": "Book",
      "@id": `${SITE_URL}/publicaciones#${book.id}`,
      name: book.title,
      description: book.description,
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: "es",
      ...(book.edition && {
        datePublished: book.edition.year,
        isbn: book.edition.isbn,
        publisher: { "@type": "Organization", name: book.edition.publisher },
      }),
    })),
    {
      "@type": "ScholarlyArticle",
      headline: researchArticle.title,
      url: researchArticle.url,
      author: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@type": "Periodical", name: "Revista Ciencias Sociales" },
      inLanguage: "es",
    },
    breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Publicaciones", path: "/publicaciones" },
    ]),
  ],
};

export default function PublicacionesPage() {
  return (
    <div className="ed-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        eyebrow="Publicaciones"
        title="Biblioteca del autor."
        text="Libros y artículos del Dr. Fausto Vásquez Cevallos sobre prueba documental, proceso penal e imputación objetiva."
        photo={heroPhotos.library}
        actionLabel="Consultar bibliografía"
      />
      <section id="contenido" className="in-wrap" aria-labelledby="biblioteca-titulo">
        <header className="in-heading">
          <p className="ed-kicker">Bibliografía</p>
          <h2 id="biblioteca-titulo">Libros del autor</h2>
        </header>
        <div className="in-books">
          {books.map(book => (
            <article key={book.id} id={book.id}>
              <header>
                <BookOpenText size={22} strokeWidth={1.35} aria-hidden="true" />
                <p className="ed-kicker">{book.subject}</p>
                <h3>{book.title}</h3>
              </header>
              <div className="in-books__record">
                <p>{book.description}</p>
                {book.edition && (
                  <dl>
                    <div><dt>Año</dt><dd>{book.edition.year}</dd></div>
                    <div><dt>Editorial</dt><dd>{book.edition.publisher}</dd></div>
                    <div><dt>ISBN</dt><dd>{book.edition.isbn}</dd></div>
                  </dl>
                )}
                <a className="ed-text-link" href={book.reference.url}>
                  {book.reference.label} <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="in-wrap in-tint in-journal" aria-labelledby="biblioteca-articulo">
        <FileText size={44} strokeWidth={1.15} aria-hidden="true" />
        <div>
          <p className="ed-kicker">Artículo en acceso abierto</p>
          <h2 id="biblioteca-articulo">{researchArticle.title}</h2>
          <p>{researchArticle.source}</p>
        </div>
        <a className="ed-text-link" href={researchArticle.url}>Leer en la revista <ArrowUpRight size={17} aria-hidden="true" /></a>
      </section>
      <aside className="in-wrap in-action" aria-labelledby="biblioteca-disponibilidad">
        <div><h2 id="biblioteca-disponibilidad">Disponibilidad de los libros</h2><p>El despacho puede confirmar qué obras están disponibles para consulta.</p></div>
        <div className="in-action__links">
          <WhatsappCta location="interior-cierre" label="Consultar publicaciones" message="Hola, deseo consultar sobre las publicaciones del Dr. Fausto Vásquez Cevallos." />
          <Link href="/academia#contenido" className="ed-text-link">Explorar formación en derecho penal <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </aside>
    </div>
  );
}
