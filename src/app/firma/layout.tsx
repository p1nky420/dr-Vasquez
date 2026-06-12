import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Fausto Vásquez | Abogado Penalista Quito",
  description:
    "Conozca la trayectoria del Dr. Fausto Ramiro Vásquez Cevallos, abogado penalista en Quito especializado en defensa penal económica y litigio estratégico.",
  alternates: {
    canonical: "https://faustovasquezabogados.com/firma",
  },
};

export default function FirmaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
