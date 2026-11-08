import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Fausto Vásquez Cevallos | Jurista penalista en Quito" },
  description:
    "Conozca la trayectoria del Dr. Fausto Vásquez Cevallos, abogado penalista en Quito especializado en defensa penal económica y litigio estratégico.",
  alternates: {
    canonical: "https://www.faustovasquezabogado.com/firma",
  },
};

export default function FirmaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
