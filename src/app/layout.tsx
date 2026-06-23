import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { EvaluationVault } from "@/components/evaluation-vault";
import { ScrollAnalytics } from "@/components/scroll-analytics";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CustomCursor } from "@/components/custom-cursor";
import { SearchProvider, SearchModal } from "@/components/search-modal";
import { HapticFeedback } from "@/components/haptic-feedback";
import { faqs } from "@/lib/home-content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faustovasquezabogados.com"),
  title: {
    default: "Dr. Fausto Vásquez | Derecho Penal Estratégico",
    template: "%s | Dr. Fausto Vásquez — Estudio Jurídico",
  },
  description:
    "Abogado penalista ecuatoriano especializado en defensa penal estratégica, derecho penal económico, derecho constitucional, derecho penal político y casos de alta complejidad. Su práctica profesional combina litigación técnica, análisis dogmático, estrategia probatoria y experiencia académica para la defensa de personas, empresarios, funcionarios y organizaciones involucradas en procesos complejos.",
  keywords: [
    "Dr. Fausto Vásquez — Estudio Jurídico",
    "derecho penal económico",
    "litigio estratégico",
    "delitos financieros",
    "defensa penal",
      "derecho constitucional penal",
      "abogado penalista Quito",
      "lavado de activos",
      "delitos complejos",
  ],
  openGraph: {
    title: "Dr. Fausto Vásquez — Estudio Jurídico",
    description:
      "Defensa penal estratégica para casos económicos, constitucionales, políticos y de alta complejidad en Ecuador.",
    type: "website",
    locale: "es_EC",
    siteName: "Dr. Fausto Vásquez — Estudio Jurídico",
    url: "/",
    images: [
      {
        url: "/portrait-editorial-authority-v2.png",
        width: 1003,
        height: 1568,
        alt: "Dr. Fausto Vásquez, jurista penalista ecuatoriano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Fausto Vásquez — Estudio Jurídico | Abogado Penalista Quito",
    description:
      "Defensa penal estratégica para casos económicos, constitucionales, políticos y de alta complejidad en Ecuador.",
    images: ["/portrait-editorial-authority-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const institutionalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://faustovasquezabogados.com/#person",
      name: "Fausto Ramiro Vásquez Cevallos",
      givenName: "Fausto Ramiro",
      familyName: "Vásquez Cevallos",
      honorificSuffix: "Doctor Honoris Causa",
      jobTitle: "Abogado Penalista · Profesor Universitario · Autor · Investigador · Litigante",
      description:
        "Abogado penalista ecuatoriano especializado en defensa penal estratégica, derecho penal económico, derecho constitucional, derecho penal político y casos de alta complejidad. Doctor Honoris Causa por la Universidad del Golfo de México. Autor de obras jurídicas sobre imputación objetiva y falsedad documental.",
      url: "https://faustovasquezabogados.com",
      image:
        "https://faustovasquezabogados.com/portrait-editorial-authority-v2.png",
      telephone: "+593983076881",
      email: "contacto@faustovasquezabogados.com",
      worksFor: {
        "@id": "https://faustovasquezabogados.com/#legal-service",
      },
      sameAs: [
        "https://www.facebook.com/share/1AFRvUQQiB/?mibextid=wwXIfr",
      ],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Universidad Central del Ecuador" },
        { "@type": "CollegeOrUniversity", name: "Universitat Pompeu Fabra" },
        { "@type": "CollegeOrUniversity", name: "Universidad Externado de Colombia" },
        { "@type": "CollegeOrUniversity", name: "Universidad del Golfo de México" },
      ],
      knowsAbout: [
        "Derecho penal económico",
        "Derecho penal empresarial",
        "Derecho constitucional",
        "Derecho penal político",
        "Delitos contra la administración pública",
        "Delitos económicos y financieros",
        "Cohecho",
        "Lavado de activos",
        "Defensa en investigaciones penales complejas",
        "Imputación objetiva",
        "Dogmática penal",
        "Litigación oral",
        "Recursos penales y constitucionales",
        "Asesoría estratégica preventiva",
      ],
    },
    {
      "@type": ["LegalService", "Attorney"],
      "@id": "https://faustovasquezabogados.com/#legal-service",
      name: "Dr. Fausto Vásquez — Estudio Jurídico",
      url: "https://faustovasquezabogados.com",
      image: "https://faustovasquezabogados.com/reception_marble.png",
      telephone: "+593983076881",
      email: "contacto@faustovasquezabogados.com",
      availableLanguage: "Spanish",
      founder: {
        "@id": "https://faustovasquezabogados.com/#person",
      },
      areaServed: [
        { "@type": "City", name: "Quito" },
        { "@type": "City", name: "Guayaquil" },
      ],
      address: [
        {
          "@type": "PostalAddress",
          streetAddress:
            "Av. 12 de Octubre N26-97 y Lincoln, Torre 1492, Piso 8, Oficina 802",
          addressLocality: "Quito",
          addressRegion: "Pichincha",
          postalCode: "170522",
          addressCountry: "EC",
        },
        {
          "@type": "PostalAddress",
          streetAddress:
            "Av. Malecón Simón Bolívar y Loja, Edificio The Point, Piso 12, Oficina 1203",
          addressLocality: "Guayaquil",
          addressRegion: "Guayas",
          postalCode: "090150",
          addressCountry: "EC",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios legales",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Derecho penal económico" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Derecho penal empresarial" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Derecho constitucional" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Derecho penal político" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Delitos contra la administración pública" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lavado de activos" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Litigación penal estratégica" }},
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://faustovasquezabogados.com/#website",
      url: "https://faustovasquezabogados.com",
      name: "Dr. Fausto Vásquez — Estudio Jurídico",
      inLanguage: "es-EC",
      publisher: {
        "@id": "https://faustovasquezabogados.com/#legal-service",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://faustovasquezabogados.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://faustovasquezabogados.com/#faq",
      mainEntity: faqs.slice(0, 10).map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-[#0b0a09] text-[#f4efe5]">
        <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(institutionalJsonLd) }}
        />
        <SearchProvider>
          <CustomCursor />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <SearchModal />
          <EvaluationVault />
          <FloatingWhatsapp />
          <AnalyticsConsent />
          <ScrollAnalytics />
          <SmoothScroll />
          <HapticFeedback />
        </SearchProvider>
      </body>
    </html>
  );
}
