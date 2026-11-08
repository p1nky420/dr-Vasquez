import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { EvaluationVault } from "@/components/evaluation-vault";
import { ScrollAnalytics } from "@/components/scroll-analytics";
import { SmoothScroll } from "@/components/smooth-scroll";
import { SearchProvider, SearchModal } from "@/components/search-modal";
import { ScrollProgress } from "@/components/scroll-progress";
import { HapticFeedback } from "@/components/haptic-feedback";
import "./globals.css";
import "./palette.css";
import "./interiors.css";
import "./interior-sections.css";
import "./panoramic-hero.css";

/**
 * Playfair Display + Inter es la pareja más usada de la web: lee como
 * plantilla antes de que nadie haya leído una palabra.
 *
 * Newsreader es una serif editorial con eje óptico —se adelgaza al crecer—
 * diseñada para textos largos con autoridad, que es exactamente el registro
 * de un jurista que publica. Instrument Sans acompaña sin imitar a Inter.
 */
const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const text = Instrument_Sans({
  variable: "--font-text",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.faustovasquezabogado.com"),
  title: {
    default: "Dr. Fausto Vásquez Cevallos | Derecho Penal Estratégico",
    template: "%s | Dr. Fausto Vásquez Cevallos — Estudio Jurídico",
  },
  description:
    "Abogado penalista ecuatoriano especializado en defensa penal estratégica, derecho penal económico, derecho constitucional, derecho penal político y casos de alta complejidad. Su práctica profesional combina litigación técnica, análisis dogmático, estrategia probatoria y experiencia académica para la defensa de personas, empresarios, funcionarios y organizaciones involucradas en procesos complejos.",
  keywords: [
    "Dr. Fausto Vásquez Cevallos — Estudio Jurídico",
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
    title: "Dr. Fausto Vásquez Cevallos — Estudio Jurídico",
    description:
      "Defensa penal estratégica para casos económicos, constitucionales, políticos y de alta complejidad en Ecuador.",
    type: "website",
    locale: "es_EC",
    siteName: "Dr. Fausto Vásquez Cevallos — Estudio Jurídico",
    url: "/",
    images: [
      {
        url: "/estudio/portada-editorial.webp",
        width: 960,
        height: 1280,
        alt: "Dr. Fausto Vásquez Cevallos, jurista penalista ecuatoriano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Fausto Vásquez Cevallos — Estudio Jurídico | Abogado Penalista Quito",
    description:
      "Defensa penal estratégica para casos económicos, constitucionales, políticos y de alta complejidad en Ecuador.",
    images: ["/estudio/portada-editorial.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
      "@id": "https://www.faustovasquezabogado.com/#person",
      name: "Fausto Vásquez Cevallos",
      givenName: "Fausto",
      familyName: "Vásquez Cevallos",
      jobTitle: "Abogado Penalista · Profesor Universitario · Autor · Investigador · Litigante",
      description:
        "Abogado penalista ecuatoriano especializado en defensa penal estratégica, derecho penal económico, derecho constitucional, derecho penal político y casos de alta complejidad. Autor de obras jurídicas sobre imputación objetiva y falsedad documental.",
      url: "https://www.faustovasquezabogado.com",
      image:
        "https://www.faustovasquezabogado.com/estudio/portada-editorial.webp",
      telephone: "+593983076881",
      worksFor: {
        "@id": "https://www.faustovasquezabogado.com/#legal-service",
      },
      sameAs: [
        "https://www.facebook.com/share/1AFRvUQQiB/?mibextid=wwXIfr",
        "https://www.facebook.com/fausto.vasquez.9083",
        "https://www.youtube.com/@FaustoVasquez-Abogado",
        "https://www.tiktok.com/@ab.fausto.vasquez",
      ],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Universidad Central del Ecuador" },
        { "@type": "CollegeOrUniversity", name: "Universitat Pompeu Fabra" },
        { "@type": "CollegeOrUniversity", name: "Universidad Externado de Colombia" },
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
      "@id": "https://www.faustovasquezabogado.com/#legal-service",
      name: "Dr. Fausto Vásquez Cevallos — Estudio Jurídico",
      url: "https://www.faustovasquezabogado.com",
      image: "https://www.faustovasquezabogado.com/reception_marble.png",
      telephone: "+593983076881",
      availableLanguage: "Spanish",
      founder: {
        "@id": "https://www.faustovasquezabogado.com/#person",
      },
      areaServed: [
        { "@type": "City", name: "Quito" },
        { "@type": "City", name: "Guayaquil" },
      ],
      openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "19:00" }],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios legales",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Derecho penal económico", url: "https://www.faustovasquezabogado.com/derecho-penal-economico" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lavado de activos y delitos financieros", url: "https://www.faustovasquezabogado.com/areas-de-practica/lavado-de-activos" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Delitos contra la administración pública", url: "https://www.faustovasquezabogado.com/areas-de-practica/delitos-administracion-publica" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Constitucional penal y garantías", url: "https://www.faustovasquezabogado.com/areas-de-practica/constitucional-penal" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Litigio penal estratégico", url: "https://www.faustovasquezabogado.com/areas-de-practica/litigio-penal-estrategico" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Derecho penal empresarial" }},
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Derecho penal político" }},
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.faustovasquezabogado.com/#website",
      url: "https://www.faustovasquezabogado.com",
      name: "Dr. Fausto Vásquez Cevallos — Estudio Jurídico",
      inLanguage: "es-EC",
      publisher: {
        "@id": "https://www.faustovasquezabogado.com/#legal-service",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.faustovasquezabogado.com/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    // El FAQPage vive únicamente en la página que muestra las preguntas.
    // Emitirlo también aquí producía dos nodos con el mismo @id en la home.
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
      className={`${display.variable} ${text.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Consent Mode v2 en estado denegado, antes de que cargue gtag.
            GA4 recibe pings sin cookies que usa para modelar a quien rechaza,
            así que el comportamiento no se pierde: se estima. */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html:
                "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}" +
                "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied'," +
                "ad_personalization:'denied',analytics_storage:'denied'," +
                "functionality_storage:'granted',security_storage:'granted',wait_for_update:500});",
            }}
          />
        ) : null}
      </head>
      <body className="bg-[#0b0a09] text-[#f4efe5]">
        <a className="skip-link" href="#main-content">Saltar al contenido principal</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(institutionalJsonLd) }}
        />
          <SearchProvider>
            <ScrollProgress />
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
          <SpeedInsights />
        </SearchProvider>
      </body>
    </html>
  );
}
