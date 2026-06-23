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
    template: "%s | Fausto Vásquez Abogados",
  },
  description:
    "Abogado penalista en Quito especializado en derecho penal económico, lavado de activos, delitos financieros y litigio estratégico en Ecuador.",
  keywords: [
    "Fausto Vásquez Abogados",
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
    title: "Fausto Vásquez Abogados",
    description:
      "Defensa penal estratégica para casos complejos donde están en juego libertad, patrimonio, empresa y reputación.",
    type: "website",
    locale: "es_EC",
    siteName: "Fausto Vásquez Abogados",
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
    title: "Fausto Vásquez Abogados | Abogado Penalista Quito",
    description:
      "Defensa penal estratégica para asuntos empresariales, patrimoniales y financieros complejos.",
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
        "Especialista en Derecho Penal Económico, Constitucional y Litigio Estratégico en Ecuador. Más de 20 años de trayectoria. Doctor Honoris Causa por la Universidad del Golfo de México. Autor de obras jurídicas sobre imputación objetiva y falsedad documental.",
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
        "Derecho Penal Económico",
        "Lavado de Activos",
        "Delitos Financieros",
        "Derecho Constitucional Penal",
        "Litigio Estratégico",
      ],
    },
    {
      "@type": ["LegalService", "Attorney"],
      "@id": "https://faustovasquezabogados.com/#legal-service",
      name: "Fausto Vásquez Abogados",
      url: "https://faustovasquezabogados.com",
      image: "https://faustovasquezabogados.com/reception_marble.png",
      telephone: "+593983076881",
      email: "contacto@faustovasquezabogados.com",
      priceRange: "$$$$",
      availableLanguage: "Spanish",
      founder: {
        "@id": "https://faustovasquezabogados.com/#person",
      },
      areaServed: [
        { "@type": "City", name: "Quito" },
        { "@type": "City", name: "Guayaquil" },
        { "@type": "Country", name: "Ecuador" },
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
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Derecho Penal Económico",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Lavado de Activos",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://faustovasquezabogados.com/#website",
      url: "https://faustovasquezabogados.com",
      name: "Fausto Vásquez Abogados",
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
