import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { QuickIntake } from "@/components/quick-intake";
import { WhatsappCta } from "@/components/whatsapp-cta";
import { faqs } from "@/lib/home-content";
import { SITE_URL, breadcrumbJsonLd, faqJsonLd, practiceLandings } from "@/lib/seo";

const url = `${SITE_URL}/preguntas-frecuentes`;

export const metadata: Metadata = {
  title: { absolute: "Preguntas frecuentes sobre procesos penales en Ecuador | Dr. Fausto Vásquez" },
  description:
    "Qué hacer ante una notificación de Fiscalía, qué ocurre tras una formulación de cargos, cuánto dura un proceso penal en Ecuador y cómo pedir una segunda opinión jurídica.",
  alternates: { canonical: url },
  openGraph: {
    title: "Preguntas frecuentes sobre procesos penales en Ecuador",
    description:
      "Respuestas directas sobre notificaciones de Fiscalía, etapas procesales, segunda opinión y confidencialidad.",
    url,
    type: "article",
    locale: "es_EC",
  },
};

/**
 * Las 25 preguntas vivían en la home y costaban 2.178 px de scroll. Aquí
 * conservan su FAQPage completo y ganan una URL propia que puede posicionar
 * por sí misma — que es precisamente el formato que citan los motores de
 * respuesta.
 */
const GROUPS: Array<{ title: string; match: (q: string) => boolean }> = [
  {
    title: "Si el proceso ya empezó",
    match: (q) =>
      /Fiscalía|formulación de cargos|proceso penal en curso|durar|etapa|cambiar de abogado/i.test(q),
  },
  {
    title: "Segunda opinión y evaluación",
    match: (q) => /segunda opinión|ya tiene abogado|evaluación|documentos|cita|online/i.test(q),
  },
  {
    title: "Materias y tipo de casos",
    match: (q) =>
      /lavado de activos|administración pública|funcionarios|constitucionales|estratégica|clientes/i.test(q),
  },
  {
    title: "Confidencialidad, costos y la firma",
    match: () => true,
  },
];

export default function FaqPage() {
  const assigned = new Set<string>();
  const grouped = GROUPS.map((group) => {
    const items = faqs.filter(
      (faq) => !assigned.has(faq.question) && group.match(faq.question),
    );
    items.forEach((faq) => assigned.add(faq.question));
    return { title: group.title, items };
  }).filter((group) => group.items.length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      faqJsonLd(url, faqs),
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-[#0a0908] text-[#f3eee4]">
        <section id="intro" className="px-5 pb-12 pt-32 md:px-8 md:pt-40">
          <div className="mx-auto max-w-[76rem]">
            <nav aria-label="Ruta de navegación" className="text-[0.8125rem] text-[#9a9287]">
              <Link href="/" className="hover:text-[#ecc058]">Inicio</Link>
            </nav>
            <p className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-[#ecc058]">
              Orientación inicial
            </p>
            <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.2rem,5.2vw,4rem)] leading-[1.04] tracking-[-0.03em] text-[#fffaf0]">
              Preguntas frecuentes sobre procesos penales en Ecuador
            </h1>
            <p className="mt-6 max-w-2xl text-[1.02rem] leading-[1.85] text-[#c2baae]">
              Respuestas directas, sin tecnicismos innecesarios. Son
              generalidades del proceso penal ecuatoriano: no sustituyen el
              análisis de un caso concreto.
            </p>
            <WhatsappCta
              className="mt-8"
              location="faq-hero"
              message="Hola, tengo una duda sobre mi caso penal."
            />
          </div>
        </section>

        {grouped.map((group, index) => (
          <section
            key={group.title}
            id={`grupo-${index + 1}`}
            className={index % 2 === 0 ? "px-5 py-12 md:px-8 md:py-16" : "bg-[#0e0c0a] px-5 py-12 md:px-8 md:py-16"}
          >
            <div className="mx-auto max-w-[76rem]">
              <h2 className="font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-[#f3eee4]">
                {group.title}
              </h2>
              <div className="mt-8 border-t border-[#ecc058]/18">
                {group.items.map((faq) => (
                  <details key={faq.question} className="group border-b border-[#ecc058]/18 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg leading-snug text-[#f3eee4] md:text-xl">
                      {faq.question}
                      <span className="text-[#ecc058] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="max-w-3xl pt-4 text-[0.98rem] leading-[1.85] text-[#c2baae]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section id="areas" className="bg-[#ece5d9] px-5 py-14 text-[#15130f] md:px-8 md:py-20">
          <div className="mx-auto max-w-[76rem]">
            <h2 className="font-serif text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight">
              Según la materia de su caso
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {practiceLandings.map((landing) => (
                <Link
                  key={landing.slug}
                  href={`/areas-de-practica/${landing.slug}`}
                  className="group border border-[#15130f]/18 bg-[#f3ede3] p-6 transition-colors hover:border-[#75552f]"
                >
                  <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[#75552f]">
                    {landing.eyebrow}
                  </p>
                  <p className="mt-3 font-serif text-xl leading-snug">{landing.title}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#75552f]">
                    Ver área <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="consulta" className="bg-[#15120f] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] text-[#f3eee4]">
                Su caso no es una pregunta frecuente.
              </h2>
              <p className="mt-5 max-w-xl text-[1rem] leading-[1.85] text-[#c2baae]">
                Estas respuestas orientan. La evaluación de su expediente
                concreto es otra cosa, y empieza con una conversación privada.
              </p>
            </div>
            <QuickIntake source="faq" />
          </div>
        </section>
      </article>
    </>
  );
}
