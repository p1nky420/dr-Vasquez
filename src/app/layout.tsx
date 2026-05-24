import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Preloader } from "@/components/preloader";
import { AmbientBackground } from "@/components/ambient-background";
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
    "Firma jurídica premium especializada en derecho penal económico, constitucional, político, financiero y litigio estratégico.",
  keywords: [
    "Fausto Vásquez Abogados",
    "derecho penal económico",
    "litigio estratégico",
    "delitos financieros",
    "defensa penal",
    "derecho constitucional penal",
  ],
  openGraph: {
    title: "Fausto Vásquez Abogados",
    description:
      "Defensa penal estratégica para casos complejos donde están en juego libertad, patrimonio, empresa y reputación.",
    type: "website",
    locale: "es_EC",
  },
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
      <body>
        <Preloader />
        <AmbientBackground />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
