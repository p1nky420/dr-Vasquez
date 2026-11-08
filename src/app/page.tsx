import type { Metadata } from "next";
import { FusionHome } from "@/components/fusion/fusion-home";
import { practiceLandings } from "@/lib/seo";
import { faqs } from "@/lib/home-content";

export const metadata: Metadata = {
  title: {
    absolute: "Abogado Penalista en Quito | Dr. Fausto Vásquez Cevallos",
  },
  description:
    "Defensa penal en Quito: peculado, cohecho, concusión y enriquecimiento ilícito. Ejercicio profesional desde 2000. Evaluación privada con cita previa.",
  alternates: {
    canonical: "https://www.faustovasquezabogado.com",
  },
  openGraph: {
    title: "Dr. Fausto Vásquez Cevallos | Derecho Penal Estratégico",
    description:
      "Inteligencia jurídica, excelencia académica y estrategia procesal para asuntos penales de alta complejidad.",
    locale: "es_EC",
    type: "website",
    url: "https://www.faustovasquezabogado.com",
    images: [
      {
        url: "/estudio/portada-panoramica.webp",
        width: 2400,
        height: 1800,
        alt: "Dr. Fausto Vásquez Cevallos, jurista penalista ecuatoriano",
      },
    ],
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    ...practiceLandings.map((service) => ({
      "@type": "Service",
      "@id": `https://www.faustovasquezabogado.com/areas-de-practica/${service.slug}`,
      name: service.title,
      description: service.lede,
      url: `https://www.faustovasquezabogado.com/areas-de-practica/${service.slug}`,
      provider: { "@id": "https://www.faustovasquezabogado.com/#legal-service" },
      areaServed: { "@type": "Country", name: "Ecuador" },
    })),
    {
      "@type": "WebPage",
      "@id": "https://www.faustovasquezabogado.com/#webpage",
      url: "https://www.faustovasquezabogado.com",
      name: "Abogado Penalista en Quito | Dr. Fausto Vásquez Cevallos — Estudio Jurídico",
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
      mainEntity: faqs.filter(f => ["¿Qué debo hacer si recibo una notificación de Fiscalía?", "¿El Dr. Fausto Vásquez Cevallos atiende personalmente?", "¿La información del cliente es confidencial?", "¿Atienden casos de funcionarios públicos?"].includes(f.question)).map((faq) => ({
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
      <FusionHome />
    </>
  );
}
