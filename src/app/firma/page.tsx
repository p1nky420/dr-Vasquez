import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpenText, GraduationCap, Scale } from "lucide-react";
import { heroPhotos } from "@/lib/hero-photos";
import { PageHero } from "@/components/page-hero";


export default function FirmaPage() {
  return (
    <div className="ed-page">
      <PageHero
        eyebrow="Trayectoria"
        title="El criterio tiene autor."
        text="Fausto Vásquez Cevallos, abogado penalista en Quito. Desde el año 2000 ejerce una práctica que reúne litigio, docencia y escritura jurídica."
        photo={heroPhotos.profile}
        actionLabel="Ver trayectoria y obra"
      />
      <section id="contenido" className="ed-profile" aria-labelledby="firma-trayectoria">
        <figure>
          <Image
            src="/estudio/preparacion-expediente.webp"
            alt="El Dr. Fausto Vásquez Cevallos revisa y anota documentos en su despacho"
            width={960}
            height={1280}
            sizes="(max-width: 760px) 88vw, 46vw"
          />
          <figcaption>Fausto Vásquez Cevallos en su despacho, Quito</figcaption>
        </figure>
        <div className="ed-profile__statement">
          <p className="ed-kicker">Trayectoria · Ejercicio desde 2000</p>
          <h2 id="firma-trayectoria">Defensa penal, docencia y escritura.</h2>
          <p>Su práctica se concentra en asuntos de administración pública y derecho penal económico. El estudio de la prueba y de cómo se atribuye responsabilidad conecta su trabajo en el despacho con su obra jurídica.</p>
          <Link href="/academia#trayectoria-academica" className="ed-text-link">Actividad académica <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="in-wrap in-profile-links" aria-labelledby="perfil-facetas">
        <header className="in-heading">
          <p className="ed-kicker">Tres facetas de la trayectoria</p>
          <h2 id="perfil-facetas">Del expediente al aula y al libro</h2>
        </header>
        <div className="in-three">
          <Link href="/#metodo"><Scale size={25} strokeWidth={1.3} aria-hidden="true" /><h3>Práctica penal</h3><p>Lectura del expediente, análisis de la prueba y preparación de la defensa.</p><span className="in-inline">Conocer el método <ArrowUpRight size={16} aria-hidden="true" /></span></Link>
          <Link href="/academia#trayectoria-academica"><GraduationCap size={25} strokeWidth={1.3} aria-hidden="true" /><h3>Formación y docencia</h3><p>Vínculos académicos, tutorías e investigación con respaldo documental.</p><span className="in-inline">Ver trayectoria académica <ArrowUpRight size={16} aria-hidden="true" /></span></Link>
          <Link href="/publicaciones#contenido"><BookOpenText size={25} strokeWidth={1.3} aria-hidden="true" /><h3>Obra jurídica</h3><p>Libros y artículos sobre prueba documental, proceso penal e imputación objetiva.</p><span className="in-inline">Ir a la biblioteca <ArrowUpRight size={16} aria-hidden="true" /></span></Link>
        </div>
      </section>
      <aside className="in-wrap in-tint in-action" aria-labelledby="perfil-contacto">
        <div><h2 id="perfil-contacto">Una primera conversación</h2><p>El despacho revisa disponibilidad y posibles conflictos de interés antes de recibir documentación sensible.</p></div>
        <Link href="/contacto#contenido" className="fv-cover__action">Solicitar evaluación privada <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </aside>
    </div>
  );
}
