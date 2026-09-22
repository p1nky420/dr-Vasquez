import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditorialReveal } from "@/components/editorial-motion";
import { QuickIntake } from "@/components/quick-intake";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

const url = `${SITE_URL}/publicaciones`;

export const metadata: Metadata = {
  title: { absolute: "Publicaciones y conferencias | Dr. Fausto Vásquez" },
  description:
    "Obra jurídica del Dr. Fausto Vásquez: libros sobre imputación objetiva y falsedad documental, ponencias, artículos y conferencias en ciencias penales.",
  alternates: { canonical: url },
  openGraph: {
    title: "Publicaciones y conferencias del Dr. Fausto Vásquez",
    description:
      "Libros, doctrina, ponencias y conferencias en derecho penal económico y dogmática penal.",
    url,
    type: "profile",
    locale: "es_EC",
  },
};

/**
 * La obra publicada vivía dentro de la home y costaba 1.633 px de scroll.
 * Aquí tiene URL propia: es la página que un motor de respuestas puede citar
 * cuando alguien pregunta quién ha escrito sobre imputación objetiva en el
 * COIP, y la que acredita la autoridad del autor ante Google.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${url}#page`,
      url,
      name: "Publicaciones y conferencias del Dr. Fausto Vásquez",
      about: { "@id": `${SITE_URL}/#person` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "Book",
      "@id": `${url}#imputacion-objetiva`,
      name: "Punto de inflexión de la imputación objetiva en el COIP",
      author: { "@id": `${SITE_URL}/#person` },
      publisher: { "@type": "Organization", name: "Ergo Editores" },
      datePublished: "2016",
      inLanguage: "es",
      about: "Imputación objetiva en el derecho penal ecuatoriano",
    },
    {
      "@type": "Book",
      "@id": `${url}#falsedad-documental`,
      name: "La falsedad documental en materia penal",
      author: { "@id": `${SITE_URL}/#person` },
      datePublished: "2018",
      inLanguage: "es",
      about: "Verdad documental, prueba instrumental y responsabilidad penal",
    },
    breadcrumbJsonLd([
      { name: "Inicio", path: "/" },
      { name: "Publicaciones", path: "/publicaciones" },
    ]),
  ],
};

export default function PublicacionesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section id="intro" className="bg-[#0a0908] px-5 pb-14 pt-32 text-[#f3eee4] md:px-8 md:pb-20 md:pt-40">
        <div className="mx-auto max-w-[88rem]">
          <nav aria-label="Ruta de navegación" className="text-[0.8125rem] text-[#9a9287]">
            <Link href="/" className="hover:text-[#ecc058]">Inicio</Link>
          </nav>
          <p className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-[#ecc058]">
            Producción jurídica
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.3rem,5.4vw,4.2rem)] leading-[1.04] tracking-[-0.03em] text-[#fffaf0]">
            Publicaciones y conferencias del Dr. Fausto Vásquez
          </h1>
          <p className="mt-6 max-w-2xl text-[1.02rem] leading-[1.85] text-[#c2baae]">
            Dos libros, ponencias, artículos y conferencias en ciencias penales.
            La doctrina que sostiene el criterio con el que se litiga cada caso.
          </p>
        </div>
      </section>
      <section id="obra" className="relative bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-24 overflow-hidden">
        <div className="pointer-events-none absolute -left-[10%] top-1/2 -translate-y-1/2 w-[38%] opacity-[0.1] md:w-[28%]">
          <Image src="/logoFV-solo.png" alt="" width={826} height={644} className="w-full h-auto" />
        </div>
        <div className="mx-auto max-w-[88rem]">
          <div className="grid gap-6">
            {/* Books + Conferences row */}
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <EditorialReveal delay={0.06}>
                <div className="relative overflow-hidden border border-[#15130f]/15 bg-[#f3ede3]">
                  <div className="absolute inset-0 opacity-[0.04]">
                    <Image src="/practice-consulting-dossier-v1.png" alt="" fill className="object-cover" />
                  </div>
                  <div className="relative p-8 md:p-10">
                    <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">Libros</p>
                    <div className="mt-8 grid gap-8">
                      <div className="flex gap-6">
                        <div className="relative h-40 w-28 shrink-0 overflow-hidden shadow-lg md:h-48 md:w-32">
                          <Image src="/practice-economic-glass-v1.png" alt="" fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#15130f]/90 via-[#15130f]/30 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-2.5">
                            <p className="text-[0.4rem] max-sm:text-[0.65rem] leading-tight text-[#ecc058]">Ergo Editores<br />2016</p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-serif text-xl leading-snug md:text-2xl">Punto de inflexión de la imputación objetiva en el COIP</p>
                          <p className="mt-3 text-[0.78rem] leading-relaxed text-[#514b43]">Análisis doctrinal sobre los límites de atribución penal y su aplicación en el sistema ecuatoriano.</p>
                          <p className="mt-2 text-[0.5rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/60">Ergo Editores · 2016</p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="relative h-40 w-28 shrink-0 overflow-hidden shadow-lg md:h-48 md:w-32">
                          <Image src="/practice-defense-marble-v1.png" alt="" fill className="object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#15130f]/90 via-[#15130f]/30 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-2.5">
                            <p className="text-[0.4rem] max-sm:text-[0.65rem] leading-tight text-[#ecc058]">Publicación<br />2018</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-serif text-xl leading-snug md:text-2xl">La falsedad documental en materia penal</p>
                          <p className="mt-3 text-[0.78rem] leading-relaxed text-[#514b43]">Estudio sobre verdad documental, relevancia probatoria y responsabilidad penal.</p>
                          <p className="mt-2 text-[0.5rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/60">Publicación jurídica · 2018</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </EditorialReveal>

              {/* Conferences */}
              <EditorialReveal delay={0.1}>
                <div className="relative flex h-full flex-col overflow-hidden border border-[#15130f]/15">
                  <div className="absolute inset-0">
                    <Image src="/eventos_bg.png" alt="" fill className="object-cover opacity-[0.06]" />
                  </div>
                  <div className="relative flex h-full flex-col bg-[#f3ede3]/95 p-8 backdrop-blur-sm md:p-10">
                    <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">Conferencias</p>
                    <div className="mt-8 flex-1 space-y-6">
                      {[
                        { title: "Ciencias penales y litigación oral", event: "Congreso Internacional de Derecho Penal", year: "2024" },
                        { title: "Imputación objetiva en el sistema ecuatoriano", event: "Universidad Central del Ecuador", year: "2023" },
                        { title: "Responsabilidad penal de la persona jurídica", event: "Foro de Derecho Empresarial", year: "2023" },
                        { title: "La prueba en el proceso penal", event: "Seminario de Litigación Oral", year: "2022" },
                      ].map((conf) => (
                        <div key={conf.title} className="border-l-2 border-[#8a6941]/25 pl-4 transition-colors hover:border-[#8a6941]">
                          <p className="font-serif text-base leading-snug md:text-lg">{conf.title}</p>
                          <p className="mt-1.5 text-[0.7rem] text-[#514b43]">{conf.event}</p>
                          <p className="mt-0.5 text-[0.45rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/50">{conf.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </EditorialReveal>
            </div>

            {/* Ponencias + Entrevistas row */}
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <EditorialReveal delay={0.12}>
                <div className="relative overflow-hidden border border-[#15130f]/15 bg-[#f3ede3] p-8 md:p-10">
                  <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#8a6941]">Ponencias y artículos</p>
                  <div className="mt-8 space-y-6">
                    {[
                      { title: "Estándares probatorios en el delito de lavado de activos", venue: "Revista de Derecho Penal", year: "2024" },
                      { title: "La imputación objetiva como límite al poder punitivo", venue: "Congreso Internacional de Ciencias Penales", year: "2023" },
                      { title: "Responsabilidad penal de las personas jurídicas en Ecuador", venue: "Foro de Derecho Empresarial", year: "2023" },
                      { title: "El debido proceso como garantía frente a la prisión preventiva", venue: "Universidad Nacional de Loja", year: "2022" },
                    ].map((art) => (
                      <div key={art.title} className="border-l-2 border-[#8a6941]/25 pl-4 transition-colors hover:border-[#8a6941]">
                        <p className="font-serif text-base leading-snug md:text-lg">{art.title}</p>
                        <p className="mt-1 text-[0.7rem] text-[#514b43]">{art.venue}</p>
                        <p className="mt-0.5 text-[0.45rem] max-sm:text-[0.65rem] uppercase tracking-[0.18em] text-[#8a6941]/50">{art.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </EditorialReveal>

              {/* Entrevistas */}
              <EditorialReveal delay={0.16}>
                <div className="flex h-full flex-col border border-[#15130f]/15 bg-[#15130f] p-8 text-[#f3eee4] md:p-10">
                  <p className="text-[0.5rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#ecc058]">Entrevistas y medios</p>
                  <div className="mt-8 space-y-6">
                    {[
                      { label: "Análisis jurídico en medios nacionales", desc: "Entrevistas y columnas de opinión sobre actualidad penal y procesal." },
                      { label: "Participación en foros académicos", desc: "Paneles, debates y espacios de discusión jurídica especializada." },
                      { label: "Contenido editorial y publicaciones digitales", desc: "Artículos de análisis doctrinal publicados en plataformas jurídicas." },
                    ].map((item) => (
                      <div key={item.label} className="border-l-2 border-[#ecc058]/25 pl-4 transition-colors hover:border-[#ecc058]">
                        <p className="font-serif text-base leading-snug md:text-lg">{item.label}</p>
                        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-[#cec6ba]">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://www.facebook.com/fausto.vasquez.9083"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-[0.55rem] max-sm:text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#ecc058] transition-colors hover:text-[#f3eee4]"
                  >
                    Ver contenido en redes <ArrowRight size={13} />
                  </a>
                </div>
              </EditorialReveal>
            </div>
          </div>
        </div>
      </section>



      <section id="consulta" className="bg-[#15120f] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-serif text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] text-[#f3eee4]">
              La doctrina sostiene la defensa.
            </h2>
            <p className="mt-5 max-w-xl text-[1rem] leading-[1.85] text-[#c2baae]">
              El mismo criterio que sostiene estas publicaciones es el que se
              aplica a cada expediente. Si su caso lo requiere, conversemos.
            </p>
            <Link
              href="/areas-de-practica"
              className="mt-7 inline-flex items-center gap-3 border-b border-[#ecc058] pb-2 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-[#ecc058]"
            >
              Ver áreas de práctica <ArrowRight size={14} />
            </Link>
          </div>
          <QuickIntake source="publicaciones" />
        </div>
      </section>
    </>
  );
}
