import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { EvaluationVault } from "@/components/evaluation-vault";
import { ScrollAnalytics } from "@/components/scroll-analytics";
import { SmoothScroll } from "@/components/smooth-scroll";
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
    default: "Fausto Vásquez Abogados | Defensa Penal Estratégica",
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
        url: "/reception_marble.png",
        width: 1024,
        height: 1024,
        alt: "Fausto Vásquez Abogados, defensa penal estratégica en Quito",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fausto Vásquez Abogados | Abogado Penalista Quito",
    description:
      "Defensa penal estratégica para asuntos empresariales, patrimoniales y financieros complejos.",
    images: ["/reception_marble.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const institutionalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://faustovasquezabogados.com/#person",
      name: "Fausto Ramiro Vásquez Cevallos",
      jobTitle: "Abogado Penalista",
      description:
        "Especialista en Derecho Penal Económico, Constitucional y Litigio Estratégico en Ecuador. Más de 20 años de trayectoria.",
      url: "https://faustovasquezabogados.com",
      image:
        "https://faustovasquezabogados.com/portrait-editorial-authority-v2.png",
      worksFor: {
        "@id": "https://faustovasquezabogados.com/#legal-service",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Universidad Central del Ecuador" },
        { "@type": "CollegeOrUniversity", name: "Universitat Pompeu Fabra" },
        { "@type": "CollegeOrUniversity", name: "Universidad Externado de Colombia" },
      ],
      knowsAbout: [
        "Derecho Penal Económico",
        "Lavado de Activos",
        "Delitos Financieros",
        "Derecho Constitucional Penal",
        "Litigio Estratégico",
      ],
      sameAs: ["https://www.facebook.com/share/1Jy16EpESA/"],
    },
    {
      "@type": "LegalService",
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
        { "@type": "Country", name: "Ecuador" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Av. 12 de Octubre N26-97 y Lincoln, Torre 1492, Piso 8",
        addressLocality: "Quito",
        addressRegion: "Pichincha",
        postalCode: "170522",
        addressCountry: "EC",
      },
      // TODO: Validar las coordenadas exactas de la oficina con el cliente.
      geo: {
        "@type": "GeoCoordinates",
        latitude: -0.1969,
        longitude: -78.4818,
      },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(institutionalJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <EvaluationVault />
        <FloatingWhatsapp />
        <AnalyticsConsent />
        <ScrollAnalytics />
        <SmoothScroll />
      </body>
    </html>
  );
}
