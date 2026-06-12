import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Análisis Penal y Publicaciones Jurídicas",
  description:
    "Análisis jurídico sobre derecho penal económico, lavado de activos, litigio estratégico y dogmática penal en Ecuador.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Análisis Penal y Publicaciones Jurídicas",
    description:
      "Criterio jurídico sobre derecho penal económico, lavado de activos y litigio estratégico en Ecuador.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
