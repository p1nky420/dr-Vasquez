"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FloatingWhatsapp } from "@/components/floating-whatsapp";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/scroll-progress";

/** The cinematic home owns its chrome; every existing interior keeps its layout. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const cinematic = usePathname() === "/";
  return (
    <>
      {!cinematic && (
        <>
          <ScrollProgress />
          <CustomCursor />
          <Header />
        </>
      )}
      <main id="main-content">{children}</main>
      {!cinematic && (
        <>
          <Footer />
          <FloatingWhatsapp />
        </>
      )}
    </>
  );
}
