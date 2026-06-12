import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abogado de Derecho Penal Económico en Quito",
  description:
    "Defensa penal económica en Quito para lavado de activos, delitos financieros, responsabilidad empresarial y contingencias corporativas complejas.",
  alternates: {
    canonical: "/derecho-penal-economico",
  },
  openGraph: {
    title: "Derecho Penal Económico en Quito",
    description:
      "Defensa estratégica para investigaciones financieras, empresariales y patrimoniales complejas.",
    url: "/derecho-penal-economico",
    type: "website",
  },
};

export default function PenalEconomicoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
