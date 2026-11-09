import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { AcademicCredentials } from "@/components/academic-credentials";
import { PanoramicHero } from "@/components/panoramic-hero";
import { academyProgramPath, academyPrograms } from "@/lib/academia";
import { breadcrumbJsonLd } from "@/lib/seo";
import { heroPhotos } from "@/lib/hero-photos";
import { whatsappHref } from "@/lib/site";
import { AcademyInterest } from "./interest";
import { academyMetadata } from "./metadata";
import { AcademyMetrics } from "./metrics";

const photo = heroPhotos.library;
const breadcrumb = {
  "@context": "https://schema.org",
  ...breadcrumbJsonLd([{ name: "Inicio", path: "/" }, { name: "Academia", path: "/academia" }]),
};

export const metadata = academyMetadata({
  path: "/academia",
  title: "Academia de Derecho Penal en Ecuador | Fausto Vásquez Cevallos",
  description: "Explore la propuesta de formación continua en litigio penal, derecho penal económico y dogmática jurídica. Consulte los temarios y registre su interés.",
  photo,
});

export default function AcademiaPage() {
  return (
    <>
      <AcademyMetrics />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <PanoramicHero photo={photo} variant="interior" titleId="page-title">
        <nav className="ed-breadcrumb" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link><span aria-hidden="true">/</span><span aria-current="page">Academia</span>
        </nav>
        <p className="ed-kicker">Academia Jurídica · Ecuador</p>
        <h1 id="page-title">Formación continua en derecho penal</h1>
        <p className="ed-lead">Cuatro propuestas para estudiar el derecho penal ecuatoriano, desde la teoría del delito hasta la preparación de una defensa compleja.</p>
        <a className="fv-cover__action" href="#contenido">Ver programas <ArrowDown size={18} aria-hidden="true" /></a>
      </PanoramicHero>

      <section id="contenido" className="in-wrap" aria-labelledby="programas">
        <header className="in-heading academy-heading">
          <div>
            <p className="ed-kicker">Ruta de formación</p>
            <h2 id="programas">Encuentre su punto de partida.</h2>
          </div>
          <Link className="ed-text-link" href="#lista-de-interes">Avisarme cuando abran inscripciones <ArrowDown size={17} aria-hidden="true" /></Link>
        </header>
        <div className="academy-catalog">
          {academyPrograms.map((program) => (
            <article className="academy-card" key={program.slug}>
              <Image src={`/estudio/${program.photo}`} alt={program.alt} width={960} height={1280} sizes="(max-width: 600px) 88vw, (max-width: 1100px) 44vw, 22vw" />
              <div className="academy-card__copy">
                <p className="ed-kicker">Nivel {program.level} · {program.tag}</p>
                <h3><Link href={academyProgramPath(program.slug)}>{program.title}</Link></h3>
                <p>{program.description}</p>
                <Link className="ed-text-link" href={academyProgramPath(program.slug)} aria-label={`Ver temario de ${program.title}`}>Ver temario <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="in-wrap in-tint academy-direction" aria-labelledby="direccion">
        <Image src="/estudio/fausto-trayectoria.webp" alt="Fausto Vásquez Cevallos en su despacho" width={960} height={1280} sizes="(max-width: 760px) 88vw, 42vw" />
        <div>
          <p className="ed-kicker">Dirección académica</p>
          <h2 id="direccion">Fausto Vásquez Cevallos</h2>
          <p>Abogado penalista en ejercicio desde 2000. Su trabajo académico reúne publicaciones sobre la prueba documental, el proceso penal y la imputación objetiva.</p>
          <Link className="ed-text-link" href="/publicaciones">Consultar obra jurídica <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </section>
      <AcademicCredentials />

      <AcademyInterest />

      <section className="in-wrap academy-faq" aria-labelledby="academia-preguntas">
        <div>
          <p className="ed-kicker">Preguntas frecuentes</p>
          <h2 id="academia-preguntas">Antes de inscribirse.</h2>
        </div>
        <div>
          <details><summary>¿Cuándo empiezan los programas?</summary><p>Las fechas se comunicarán cuando se confirme cada cohorte. Puede registrar su interés para recibir ese aviso.</p></details>
          <details><summary>¿Registrarme reserva un cupo?</summary><p>La lista sirve para recibir novedades del programa. La inscripción se abrirá por separado.</p></details>
          <details><summary>¿La formación equivale a un grado académico?</summary><p>La propuesta corresponde a formación continua de la Academia. Los detalles de evaluación y certificación se informarán al abrir la convocatoria.</p></details>
        </div>
      </section>

      <aside className="in-wrap in-action in-tint" aria-labelledby="academia-invitacion">
        <div>
          <h2 id="academia-invitacion">Invitaciones académicas</h2>
          <p>Para una conferencia o actividad docente, indique la institución, el tema y las fechas tentativas.</p>
        </div>
        <div className="in-action__links">
          <a className="ed-text-link" href={whatsappHref("Hola, deseo consultar sobre una actividad académica con Fausto Vásquez Cevallos.")} target="_blank" rel="noreferrer">Consultar actividad académica <ArrowUpRight size={17} aria-hidden="true" /></a>
          <Link href="/eventos#contenido" className="ed-text-link">Ver formatos de encuentro <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </aside>
    </>
  );
}
