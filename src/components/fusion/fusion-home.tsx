import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LockKeyhole } from "lucide-react";
import { QuickIntake } from "@/components/quick-intake";
import { WhatsappCta } from "@/components/whatsapp-cta";
import { TrajectoryAtlas, type TrajectoryNode } from "@/components/trajectory-atlas";
import { faqs } from "@/lib/home-content";
import { heritage, heritageCredits } from "@/lib/patrimonio";
import { MethodChess } from "./method-chess";
import { Seal } from "./seal";
import "./fusion.css";

const practices = [
  {
    title: "Delitos contra la administración pública",
    detail: "Peculado, cohecho, concusión, enriquecimiento ilícito y tráfico de influencias. Defensa de funcionarios, exfuncionarios y contratistas del Estado.",
    href: "/areas-de-practica/delitos-administracion-publica",
  },
  {
    title: "Derecho penal económico",
    detail: "Fraude, estafa, abuso de confianza, delitos societarios y tributarios cuando una investigación compromete empresa y patrimonio.",
    href: "/derecho-penal-economico",
  },
  {
    title: "Lavado de activos y delitos financieros",
    detail: "Análisis de origen de fondos, operaciones patrimoniales y estructuras financieras complejas.",
    href: "/areas-de-practica/lavado-de-activos",
  },
  {
    title: "Garantías constitucionales",
    detail: "Debido proceso, libertad y tutela judicial efectiva frente a actuaciones que exceden los límites de la ley.",
    href: "/areas-de-practica/constitucional-penal",
  },
  {
    title: "Litigio penal estratégico",
    detail: "Audiencias decisivas, juicio oral, apelación y casación, con teoría del caso desde la investigación previa.",
    href: "/areas-de-practica/litigio-penal-estrategico",
  },
];


const teaching = [
  "Universidad Central del Ecuador",
  "Universidad de las Américas",
  "Universidad Internacional del Ecuador",
  "Universidad del Azuay",
  "Universidad de Cuenca",
  "Universidad Técnica del Norte",
];

const books = [
  { title: "Falsedad documental en materia penal", note: "Autor" },
  { title: "La sustanciación del proceso penal", note: "Autor · dos tomos" },
  { title: "Punto de inflexión en el COIP", note: "Autor" },
];

/** Trayectoria académica de la versión clásica (A), con foto real del despacho en la última etapa. */
const trajectory: TrajectoryNode[] = [
  { number: "I", country: "Ecuador", institution: "Universidad Central del Ecuador", title: "Los fundamentos.", description: "Doctor en Jurisprudencia y Abogado de los Tribunales y Juzgados de la República.", logo: "/university-uce.png" },
  { number: "II", country: "España", institution: "Universitat Pompeu Fabra", title: "La tradición.", description: "Formación de posgrado en derecho penal en una de las escuelas penales de referencia en Europa.", logo: "/university-upf-transparent.png" },
  { number: "III", country: "Colombia", institution: "Universidad Externado de Colombia", title: "La interdisciplinariedad.", description: "Derecho penal y procesal penal desde la dogmática, el proceso y las garantías.", logo: "/university-externado.svg" },
  { number: "IV", country: "México", institution: "Universidad del Golfo de México", title: "El reconocimiento.", description: "Doctorado Honoris Causa.", logo: "/university-ugm-transparent.png" },
  { number: "V", country: "Aulas", institution: "Docencia en seis universidades del Ecuador", title: "La transmisión del conocimiento.", description: "Clases y conferencias de derecho penal para nuevas generaciones de juristas.", image: "/estudio/lectura.webp" },
];

const studio = [
  { src: "/estudio/muro-logo.webp", w: 1280, h: 960, alt: "El Dr. Fausto Vásquez junto al muro con el nombre del estudio jurídico", cls: "fx-studio__wide" },
  { src: "/estudio/firma-detalle.webp", w: 960, h: 1280, alt: "Detalle de la mano del Dr. Vásquez firmando un documento con pluma", cls: "" },
  { src: "/estudio/pasillo-camina.webp", w: 960, h: 1280, alt: "El Dr. Vásquez caminando por el pasillo del estudio", cls: "" },
  { src: "/estudio/sala-tablero.webp", w: 1800, h: 1350, alt: "Sala de trabajo del estudio con el muro de tablero de ajedrez y vista a la ciudad", cls: "fx-studio__wide" },
  { src: "/estudio/sofa.webp", w: 960, h: 1280, alt: "El Dr. Vásquez sentado en la sala del despacho", cls: "" },
  { src: "/estudio/laptop-quito.webp", w: 960, h: 1280, alt: "El Dr. Vásquez trabajando frente al ventanal con vista a Quito", cls: "" },
];

const FEATURED = [
  "¿Qué debo hacer si recibo una notificación de Fiscalía?",
  "¿El doctor Fausto atiende personalmente?",
  "¿La información del cliente es confidencial?",
  "¿Atienden casos de funcionarios públicos?",
];
const featuredFaqs = FEATURED.map((q) => faqs.find((f) => f.question === q)).filter(
  (f): f is (typeof faqs)[number] => Boolean(f),
);

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="fx-caption">{children}</p>;
}

export function FusionHome() {
  return (
    <div className="fx">
      {/* ── Apertura ─────────────────────────────────────────────── */}
      <section id="inicio" className="fx-hero" aria-labelledby="fx-titulo">
        <div className="fx-hero__image">
          <Image
            src="/estudio/despacho-escritorio.webp"
            alt="El Dr. Fausto Vásquez en su escritorio, frente al ventanal del estudio en Quito"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
            className="fx-kenburns"
          />
        </div>
        <div className="fx-hero__veil" />
        <div className="fx-wrap fx-hero__inner">
          <Seal className="fx-hero__seal" />
          <p className="fx-eyebrow">Estudio jurídico · Quito · Desde 2000</p>
          <h1 id="fx-titulo" className="fx-hero__title">
            <span className="fx-hero__name">Fausto Vásquez</span>
            <span className="fx-hero__role">El arte de anticiparse.</span>
          </h1>
          <p className="fx-hero__lead">
            Defensa penal estratégica. Veintiséis años defendiendo a personas, empresas y funcionarios en procesos de alta
            complejidad, con el rigor de quien también enseña y escribe derecho penal.
          </p>
          <div className="fx-actions">
            <Link href="#consulta-form" className="fx-btn fx-btn--solid">
              Solicitar evaluación confidencial <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="#estudio" className="fx-btn fx-btn--line">
              Conocer el estudio
            </Link>
          </div>
        </div>
      </section>

      {/* ── La ciudad ────────────────────────────────────────────── */}
      <section className="fx-city" aria-labelledby="fx-ciudad">
        <Image src={heritage.panorama.src} alt="Vista del Centro Histórico de Quito desde El Panecillo, con la Basílica del Voto Nacional" fill sizes="100vw" className="fx-city__img" />
        <div className="fx-city__veil" />
        <div className="fx-wrap fx-city__inner">
          <p className="fx-eyebrow">Quito</p>
          <h2 id="fx-ciudad" className="fx-h2 fx-h2--light">
            Una ciudad que fue sede de la Real Audiencia desde 1563. Aquí el derecho tiene memoria.
          </h2>
          <p className="fx-city__text">
            La defensa penal exige la paciencia con que se levantó esta ciudad: piedra sobre piedra, prueba sobre prueba.
          </p>
          <figure className="fx-city__window">
            <Image src="/estudio/ventana-quito.webp" alt="El Dr. Vásquez mirando la ciudad de Quito desde el ventanal de su estudio" width={960} height={1280} sizes="(max-width: 900px) 70vw, 26vw" />
          </figure>
          <figure className="fx-city__archive">
            <Image src={heritage.archivo.src} alt="Fotografía antigua de Quito a comienzos del siglo XX" width={heritage.archivo.width} height={heritage.archivo.height} sizes="240px" />
            <figcaption>{heritage.archivo.place}</figcaption>
          </figure>
        </div>
        <Caption>{heritage.panorama.place}</Caption>
      </section>

      {/* ── Especialidades ───────────────────────────────────────── */}
      <section id="practica" className="fx-practice" aria-labelledby="fx-practica">
        <div className="fx-wrap fx-practice__grid">
          <div className="fx-practice__aside">
            <p className="fx-eyebrow fx-eyebrow--dark">Especialidades</p>
            <h2 id="fx-practica" className="fx-h2 fx-h2--dark">Donde se juegan la libertad, el patrimonio y el nombre.</h2>
            <figure className="fx-practice__figure">
              <Image src={heritage.portico.src} alt="Puerta tallada del pórtico de la Basílica del Voto Nacional en Quito" width={heritage.portico.width} height={heritage.portico.height} sizes="(max-width: 900px) 90vw, 30vw" />
              <figcaption>{heritage.portico.place}</figcaption>
            </figure>
          </div>
          <ul className="fx-practice__list">
            {practices.map((practice) => (
              <li key={practice.title}>
                <Link href={practice.href} className="fx-practice__item">
                  <h3>{practice.title}</h3>
                  <p>{practice.detail}</p>
                  <span className="fx-practice__more">
                    Ver especialidad <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Método (ajedrez) ─────────────────────────────────────── */}
      <MethodChess />

      {/* ── El jurista ───────────────────────────────────────────── */}
      <section id="jurista" className="fx-jurist" aria-labelledby="fx-jurista">
        <div className="fx-wrap fx-jurist__grid">
          <figure className="fx-jurist__portrait">
            <Image src="/estudio/biblioteca-brazos.webp" alt="El Dr. Fausto Vásquez de brazos cruzados frente a la biblioteca jurídica de su estudio" fill sizes="(max-width: 900px) 90vw, 40vw" />
          </figure>
          <div className="fx-jurist__body">
            <p className="fx-eyebrow fx-eyebrow--dark">El jurista</p>
            <h2 id="fx-jurista" className="fx-h2 fx-h2--dark">Litigante, profesor y autor.</h2>
            <p className="fx-jurist__lead">
              Ejerce la abogacía desde el año 2000. Dirige personalmente la estrategia de cada caso y comparte en las aulas lo que
              aprende en los tribunales.
            </p>

            <div className="fx-jurist__cols">
              <div>
                <h3 className="fx-label">Obra</h3>
                <ul className="fx-plainlist">
                  {books.map((book) => (
                    <li key={book.title}>{book.title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="fx-label">Docencia</h3>
                <ul className="fx-plainlist">
                  {teaching.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/firma" className="fx-textlink">
              Trayectoria completa <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trayectoria (versión A) ──────────────────────────────── */}
      <section id="trayectoria" className="fx-trajectory" aria-labelledby="fx-trayectoria">
        <div className="fx-wrap">
          <p className="fx-eyebrow">Trayectoria</p>
          <h2 id="fx-trayectoria" className="fx-h2 fx-h2--light">Formado en tres países. Enseña en seis universidades.</h2>
          <div className="fx-trajectory__atlas">
            <TrajectoryAtlas nodes={trajectory} />
          </div>
        </div>
      </section>

      {/* ── El estudio ───────────────────────────────────────────── */}
      <section id="estudio" className="fx-studio" aria-labelledby="fx-estudio">
        <div className="fx-wrap">
          <header className="fx-studio__head">
            <p className="fx-eyebrow fx-eyebrow--dark">El estudio</p>
            <h2 id="fx-estudio" className="fx-h2 fx-h2--dark">Un despacho en altura, con Quito a la vista.</h2>
            <p className="fx-studio__text">Aquí se reciben los casos, se estudian los expedientes y se prepara cada audiencia. Atención con cita previa.</p>
          </header>
          <div className="fx-studio__grid">
            <figure className="fx-studio__video">
              <video src="/estudio/despacho-loop.mp4" poster="/estudio/despacho-loop-poster.jpg" muted loop playsInline autoPlay preload="none" aria-label="El Dr. Vásquez trabajando en su escritorio" />
            </figure>
            {studio.map((photo) => (
              <figure key={photo.src} className={photo.cls}>
                <Image src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Obra ─────────────────────────────────────────────────── */}
      <section id="obra" className="fx-books" aria-labelledby="fx-obra">
        <div className="fx-wrap">
          <header className="fx-books__head">
            <p className="fx-eyebrow">Pensamiento jurídico</p>
            <h2 id="fx-obra" className="fx-h2 fx-h2--light">Lo que defiende en audiencia, lo ha escrito antes.</h2>
          </header>
          <ul className="fx-books__shelf">
            {books.map((book) => (
              <li key={book.title} className="fx-book">
                <span className="fx-book__mark">FV</span>
                <span className="fx-book__title">{book.title}</span>
                <span className="fx-book__note">{book.note}</span>
              </li>
            ))}
          </ul>
          <Link href="/publicaciones" className="fx-textlink fx-textlink--light">
            Ver publicaciones <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── Consulta ─────────────────────────────────────────────── */}
      <section id="consulta-rapida" className="fx-consult" aria-labelledby="fx-consulta">
        <div className="fx-wrap fx-consult__grid">
          <div>
            <p className="fx-eyebrow">Evaluación confidencial</p>
            <h2 id="fx-consulta" className="fx-h2 fx-h2--light">La primera conversación es el primer movimiento.</h2>
            <p className="fx-consult__text">
              Cuéntenos lo esencial. No comparta detalles sensibles del caso por este medio: los revisaremos en una reunión privada.
            </p>
            <ul className="fx-consult__facts">
              <li><LockKeyhole size={15} aria-hidden="true" /> Información protegida por el secreto profesional</li>
              <li>Atención con cita previa · 9:30 a 19:00</li>
              <li>Despacho en Quito; casos en todo el Ecuador, previa evaluación</li>
            </ul>
            <WhatsappCta className="mt-8" location="fusion-consulta" message="Hola, deseo solicitar una evaluación confidencial de mi caso." />
          </div>
          <div id="consulta-form" className="fx-consult__form">
            <QuickIntake source="home-fusion" />
          </div>
        </div>
      </section>

      {/* ── Preguntas ────────────────────────────────────────────── */}
      <section id="faq" className="fx-faq" aria-labelledby="fx-faq">
        <div className="fx-wrap fx-faq__grid">
          <div>
            <p className="fx-eyebrow fx-eyebrow--dark">Preguntas frecuentes</p>
            <h2 id="fx-faq" className="fx-h2 fx-h2--dark">Antes de la primera reunión.</h2>
            <Link href="/preguntas-frecuentes" className="fx-textlink">
              Todas las preguntas <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="fx-faq__list">
            {featuredFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cierre ───────────────────────────────────────────────── */}
      <section className="fx-close" aria-labelledby="fx-cierre">
        <Image src={heritage.garciaMoreno.src} alt="Calle García Moreno del Centro Histórico de Quito, con El Panecillo al fondo" fill sizes="100vw" className="fx-close__img" />
        <div className="fx-close__veil" />
        <div className="fx-wrap fx-close__inner">
          <Seal className="fx-close__seal" />
          <h2 id="fx-cierre" className="fx-close__title">Cada caso merece una estrategia propia.</h2>
          <Link href="#consulta-form" className="fx-btn fx-btn--solid">
            Solicitar evaluación confidencial <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <Caption>{heritage.garciaMoreno.place}</Caption>
      </section>

      <details className="fx-credits fx-wrap">
        <summary>Créditos de las fotografías del Centro Histórico</summary>
        <ul>
          {heritageCredits.map((image) => (
            <li key={image.src}>
              {image.place}. Foto: {image.author}, <a href={image.source} target="_blank" rel="noreferrer">Wikimedia Commons</a>
              {image.licenseUrl ? (
                <>
                  , <a href={image.licenseUrl} target="_blank" rel="noreferrer">{image.license}</a>
                </>
              ) : (
                <>, {image.license}</>
              )}
              . Versión en blanco y negro{image.license.startsWith("CC BY-SA") ? `, publicada con la misma licencia` : ""}.
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
