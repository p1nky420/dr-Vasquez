import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";
import { featuredPosts } from "@/lib/site";
import { researchArticle } from "@/lib/publications";

export default function BlogPage() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Pensamiento jurídico"
        title="Leer el derecho en profundidad."
        text="Prueba, responsabilidad y estrategia. Líneas de análisis conectadas con la práctica penal del despacho y su obra jurídica."
        photo={heroPhotos.office}
        actionLabel="Explorar lecturas y temas"
      />
      <section id="contenido" className="in-wrap in-reading" aria-labelledby="lectura-destacada">
        <figure>
          <Image src="/estudio/lectura-editorial.webp" alt="Fausto Vásquez Cevallos durante una sesión de lectura en su despacho" width={960} height={1280} sizes="(max-width: 680px) 88vw, 33vw" />
        </figure>
        <div>
          <p className="ed-kicker">Lectura destacada</p>
          <h2 id="lectura-destacada">{researchArticle.title}</h2>
          <p>{researchArticle.source}</p>
          <a href={researchArticle.url} className="fv-cover__action">Leer el artículo <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </section>
      <section className="in-wrap in-tint" aria-labelledby="analisis-temas">
        <header className="in-heading">
          <p className="ed-kicker">Notas de práctica</p>
          <h2 id="analisis-temas">Temas de análisis</h2>
        </header>
        <div className="in-topics">
          {featuredPosts.map(post => (
            <article key={post.title}>
              <p className="ed-kicker">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <Link href={post.href} className="ed-text-link">Área relacionada <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
        <Link className="ed-text-link" href="/publicaciones#contenido">Explorar la biblioteca <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
