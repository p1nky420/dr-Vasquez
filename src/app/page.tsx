import type { Metadata } from "next";
import { HomeLanding } from "@/components/home-landing";
import { faqs, serviceCategories } from "@/lib/home-content";

export const metadata: Metadata = {
  title: {
    absolute: "Dr. Fausto Vásquez | Derecho Penal Estratégico en Ecuador",
  },
  description:
    "Jurista penalista en Quito especializado en defensa penal económica, litigio constitucional y casos complejos. Consulta privada y confidencial.",
  alternates: {
    canonical: "https://www.faustovasquezabogado.com",
  },
  openGraph: {
    title: "Dr. Fausto Vásquez | Derecho Penal Estratégico",
    description:
      "Inteligencia jurídica, excelencia académica y estrategia procesal para asuntos penales de alta complejidad.",
    locale: "es_EC",
    type: "website",
    url: "https://www.faustovasquezabogado.com",
    images: [
      {
        url: "/portrait-editorial-quito-v2.png",
        width: 1003,
        height: 1568,
        alt: "Dr. Fausto Vásquez, jurista penalista ecuatoriano",
      },
    ],
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...serviceCategories.slice(0, 4).map((service) => ({
      "@type": "Service",
      "@id": `https://www.faustovasquezabogado.com/#${service.id}`,
      name: service.title,
      description: service.description,
      url: `https://www.faustovasquezabogado.com/#${service.id}`,
      provider: { "@id": "https://www.faustovasquezabogado.com/#legal-service" },
      areaServed: { "@type": "Country", name: "Ecuador" },
    })),
    {
      "@type": "WebPage",
      "@id": "https://www.faustovasquezabogado.com/#webpage",
      url: "https://www.faustovasquezabogado.com",
      name: "Abogado Penalista en Quito | Dr. Fausto Vásquez — Estudio Jurídico",
      description:
        "Defensa penal estratégica en Quito para asuntos económicos, financieros y corporativos complejos.",
      inLanguage: "es-EC",
      isPartOf: { "@id": "https://www.faustovasquezabogado.com/#website" },
      about: { "@id": "https://www.faustovasquezabogado.com/#legal-service" },
      mainEntity: { "@id": "https://www.faustovasquezabogado.com/#legal-service" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.faustovasquezabogado.com/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: "https://www.faustovasquezabogado.com",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.faustovasquezabogado.com/#faq",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <HomeLanding />
      {false && (
        <section aria-hidden="true">
          <h2>Academia</h2>
        </section>
      )}
    </>
  );
}
