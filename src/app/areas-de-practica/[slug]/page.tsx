import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { QuickIntake } from "@/components/quick-intake";
import { WhatsappCta } from "@/components/whatsapp-cta";
import {
  SITE_URL,
  breadcrumbJsonLd,
  faqJsonLd,
  getLanding,
  practiceLandings,
} from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceLandings.map((landing) => ({ slug: landing.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const landing = getLanding((await params).slug);
  if (!landing) return {};

  const url = `${SITE_URL}/areas-de-practica/${landing.slug}`;

  return {
    title: { absolute: `${landing.metaTitle} | Dr. Fausto Vásquez` },
    description: landing.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: landing.metaTitle,
      description: landing.metaDescription,
      url,
      type: "article",
      locale: "es_EC",
      images: [{ url: landing.image, alt: landing.title }],
    },
  };
}

export default async function PracticeLandingPage({ params }: Params) {
  const landing = getLanding((await params).slug);
  if (!landing) notFound();

  const url = `${SITE_URL}/areas-de-practica/${landing.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: landing.title,
        description: landing.metaDescription,
        url,
        serviceType: landing.eyebrow,
        provider: { "@id": `${SITE_URL}/#legal-service` },
        areaServed: { "@type": "Country", name: "Ecuador" },
        audience: { "@type": "Audience", audienceType: "Personas y empresas investigadas en Ecuador" },
      },
      faqJsonLd(url, landing.faqs),
      breadcrumbJsonLd([
        { name: "Inicio", path: "/" },
        { name: "Áreas de práctica", path: "/areas-de-practica" },
        { name: landing.title, path: `/areas-de-practica/${landing.slug}` },
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
        {/* Hero — sized to its content, with the offer visible immediately. */}
        <section id="intro" className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
          <Image
            src={landing.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25 grayscale"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#080706_0%,rgba(8,7,6,.94)_52%,rgba(8,7,6,.62)_100%)]" />

          <div className="relative mx-auto max-w-[88rem]">
            <nav aria-label="Ruta de navegación" className="text-[0.8125rem] text-[#9a9287]">
              <Link href="/" className="hover:text-[#ecc058]">Inicio</Link>
              <span className="mx-2 text-[#ecc058]/40">/</span>
              <Link href="/areas-de-practica" className="hover:text-[#ecc058]">Áreas de práctica</Link>
            </nav>

            <p className="mt-8 text-[0.8125rem] font-semibold uppercase tracking-[0.18em] text-[#ecc058]">
              {landing.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[1.02] tracking-[-0.03em] text-[#fffaf0]">
              {landing.keyword}
            </h1>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-[1.85] text-[#d5cdc1]">
              {landing.lede}
            </p>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
              <div>
                <h2 className="font-serif text-2xl text-[#f3eee4]">
                  Esta página es para usted si…
                </h2>
                <ul className="mt-6 grid gap-4">
                  {landing.situations.map((situation) => (
                    <li key={situation} className="flex gap-3 text-[0.98rem] leading-[1.75] text-[#c2baae]">
                      <Check size={17} className="mt-1 shrink-0 text-[#ecc058]" />
                      {situation}
                    </li>
                  ))}
                </ul>
                <WhatsappCta
                  className="mt-8"
                  location={`area-${landing.slug}`}
                  message={`Hola, necesito asesoría sobre ${landing.title.toLowerCase()}.`}
                />
              </div>

              <div>
                <p className="mb-4 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#ecc058]">
                  Evaluación confidencial · Respuesta el mismo día hábil
                </p>
                <QuickIntake source={`area-${landing.slug}`} />
              </div>
            </div>
          </div>
        </section>

        {/* What the firm actually does */}
        <section id="intervencion" className="bg-[#ece5d9] px-5 py-16 text-[#15130f] md:px-8 md:py-28">
          <div className="mx-auto max-w-[88rem]">
            <h2 className="max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.15]">
              Cómo interviene la firma
            </h2>
            <div className="mt-12 grid gap-px bg-[#15130f]/12 md:grid-cols-2">
              {landing.work.map((item, index) => (
                <div key={item.title} className="bg-[#f3ede3] p-7 md:p-9">
                  <span className="font-serif text-2xl text-[#75552f]/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-serif text-2xl leading-tight">{item.title}</h3>
                  <p className="mt-4 text-[0.95rem] leading-[1.8] text-[#514b43]">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 border-l-2 border-[#75552f] pl-5">
              <ShieldCheck className="shrink-0 text-[#75552f]" size={22} />
              <p className="text-[0.95rem] leading-[1.7] text-[#4f4941]">
                Admisión selectiva, verificación de conflicto de interés y secreto
                profesional estricto. La firma no promete resultados: construye
                estrategia sobre el expediente real.
              </p>
            </div>
          </div>
        </section>

        {/* Question-shaped answers — the unit answer engines quote. */}
        <section id="preguntas" className="px-5 py-16 md:px-8 md:py-28">
          <div className="mx-auto max-w-[72rem]">
            <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.15] text-[#f3eee4]">
              Preguntas frecuentes
            </h2>
            <div className="mt-10 border-t border-[#ecc058]/20">
              {landing.faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-[#ecc058]/20 py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl leading-snug text-[#f3eee4] md:text-2xl">
                    {faq.question}
                    <span className="text-[#ecc058] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="max-w-3xl pt-5 text-[0.98rem] leading-[1.85] text-[#c2baae]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {landing.related.map((slug) => {
                const related = getLanding(slug);
                if (!related) return null;
                return (
                  <Link
                    key={slug}
                    href={`/areas-de-practica/${slug}`}
                    className="group border border-[#ecc058]/20 p-6 transition-colors hover:border-[#ecc058]/60"
                  >
                    <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#ecc058]">
                      {related.eyebrow}
                    </p>
                    <p className="mt-3 font-serif text-xl leading-snug text-[#f3eee4]">
                      {related.title}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[#ecc058]">
                      Ver área <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Closing conversion block */}
        <section id="consulta" className="bg-[#15120f] px-5 py-16 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-[76rem] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.1] text-[#f3eee4]">
                Una conversación privada antes de decidir.
              </h2>
              <p className="mt-5 max-w-xl text-[1rem] leading-[1.85] text-[#c2baae]">
                Comparta solo la información inicial necesaria. La firma verifica
                disponibilidad y posibles conflictos de interés antes de recibir
                documentación sensible.
              </p>
              <WhatsappCta
                className="mt-7"
                location={`area-${landing.slug}-cierre`}
                message={`Hola, deseo agendar una evaluación sobre ${landing.title.toLowerCase()}.`}
              />
            </div>
            <QuickIntake source={`area-${landing.slug}-cierre`} />
          </div>
        </section>
      </article>
    </>
  );
}
