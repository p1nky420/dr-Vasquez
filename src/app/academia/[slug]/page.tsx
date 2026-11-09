import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { academyProgramPath, academyPrograms, type AcademyProgram } from "@/lib/academia";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { AcademyInterest } from "../interest";
import { academyMetadata } from "../metadata";
import { AcademyMetrics } from "../metrics";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return academyPrograms.map(({ slug }) => ({ slug }));
}

async function getProgram(params: Props["params"]) {
  const { slug } = await params;
  const program = academyPrograms.find((entry) => entry.slug === slug);
  if (!program) notFound();
  return program;
}

function programPhoto(program: AcademyProgram) {
  return { src: `/estudio/${program.photo}`, alt: program.alt, width: 960, height: 1280 };
}

export async function generateMetadata({ params }: Props) {
  const program = await getProgram(params);
  return academyMetadata({
    path: academyProgramPath(program.slug),
    title: `${program.title} | Academia · Nivel ${program.level}`,
    description: program.description,
    photo: programPhoto(program),
    index: program.approved,
  });
}

export default async function AcademyProgramPage({ params }: Props) {
  const program = await getProgram(params);
  const path = academyProgramPath(program.slug);
  const breadcrumb = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Academia", path: "/academia" },
    { name: program.title, path },
  ]);
  const schema = {
    "@context": "https://schema.org",
    "@graph": program.approved ? [breadcrumb, {
      "@type": "Course",
      "@id": `${SITE_URL}${path}#programa`,
      name: program.title,
      description: program.description,
      courseCode: program.code,
      inLanguage: "es-EC",
      url: `${SITE_URL}${path}`,
      provider: { "@type": "Organization", name: "Academia Jurídica", url: `${SITE_URL}/academia` },
    }] : [breadcrumb],
  };

  return (
    <>
      <AcademyMetrics program={program.code} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="academy-program-hero" aria-labelledby="page-title">
        <div className="academy-program-hero__copy">
          <nav className="ed-breadcrumb" aria-label="Ruta de navegación">
            <Link href="/">Inicio</Link><span aria-hidden="true">/</span>
            <Link href="/academia">Academia</Link><span aria-hidden="true">/</span>
            <span aria-current="page">Nivel {program.level}</span>
          </nav>
          <p className="ed-kicker">Nivel {program.level} · {program.tag}</p>
          <h1 id="page-title">{program.title}</h1>
          <p className="ed-lead">{program.description}</p>
          <a className="ed-text-link" href="#temario">Explorar temario <ArrowDown size={18} aria-hidden="true" /></a>
        </div>
        <figure>
          <Image src={programPhoto(program).src} alt={program.alt} fill preload sizes="(max-width: 760px) 100vw, 43vw" />
        </figure>
      </section>

      <section className="in-wrap academy-overview" aria-labelledby="perfil">
        <div>
          <p className="ed-kicker">{program.approved ? "Formación continua" : "Programa en preparación"}</p>
          <h2 id="perfil">A quién se dirige.</h2>
          <p>{program.audience}</p>
          <h3>Conocimientos previos</h3>
          <p>{program.requirements}</p>
        </div>
        <div>
          <p className="ed-kicker">Objetivos de aprendizaje</p>
          <ul>{program.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
        </div>
      </section>

      <section id="temario" className="in-wrap in-tint academy-syllabus" aria-labelledby="temario-titulo">
        <header className="in-heading">
          <p className="ed-kicker">{program.modules.length} módulos</p>
          <h2 id="temario-titulo">{program.approved ? "Temario" : "Temario propuesto"}</h2>
        </header>
        {program.modules.map((module, index) => (
          <details key={module.title} open={index === 0} data-module={index + 1}>
            <summary><h3>{module.title}</h3><Plus size={20} aria-hidden="true" /></summary>
            <div>
              <p>{module.objective}</p>
              <ul>{module.topics.map((topic, i) => <li key={i}>{topic}</li>)}</ul>
            </div>
          </details>
        ))}
      </section>

      <AcademyInterest program={program.slug} />

      <nav className="in-wrap academy-related" aria-label="Más sobre este programa">
        <Link className="ed-text-link" href="/academia#contenido">Ver todos los programas <ArrowUpRight size={17} aria-hidden="true" /></Link>
        {program.links.map((link) => (
          <Link className="ed-text-link" key={link.href} href={link.href}>{link.label} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        ))}
      </nav>
    </>
  );
}
