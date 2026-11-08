"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";
import { SearchButton } from "@/components/search-modal";
import { Seal } from "@/components/fusion/seal";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-[#9c7c54]/20 bg-[#fffdf9]/95 shadow-[0_10px_30px_rgba(35,26,18,.08)] backdrop-blur-xl" : "bg-[#fffdf9]"}`}>
      <div className="mx-auto flex h-20 max-w-[94rem] items-center justify-between px-4 sm:px-5 md:h-24 md:px-8">
        <Link href="/" onClick={() => setOpen(false)} className="group flex shrink-0 items-center gap-2 sm:gap-3" aria-label="Dr. Fausto Vásquez Cevallos — Estudio Jurídico, inicio">
          <Seal className="size-10 text-[#76572f] md:size-13" title="Sello Fausto Vásquez Cevallos" />
          <span className="h-7 w-px bg-[#76572f]/30" />
          <span>
            <strong className="block whitespace-nowrap font-serif text-sm font-normal tracking-[0.02em] text-[#24211e] sm:text-base">Fausto Vásquez Cevallos</strong>
            <small className="mt-1 block text-[0.58rem] uppercase tracking-[0.17em] text-[#594f46]">Jurista penalista</small>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 xl:gap-6 xl:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative py-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#51473d] transition-colors whitespace-nowrap after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[#76572f] after:transition-transform hover:text-[#201915] hover:after:scale-x-100">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden min-[380px]:block"><SearchButton /></div>
          <Link href={pathname === "/" ? "#consulta-form" : "/contacto#contenido"} className="hidden whitespace-nowrap border border-[#76572f]/40 px-5 py-3 text-[0.75rem] font-medium text-[#24211e] transition-colors hover:bg-[#24211e] hover:text-[#fffdf9] md:inline-flex">
            Solicitar evaluación privada
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-navigation" className="grid size-12 place-items-center border border-[#76572f]/25 text-[#76572f] touch-manipulation xl:hidden">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-t border-[#76572f]/20 bg-[#fffdf9] px-5 pb-8 xl:hidden">
            <nav id="mobile-navigation" className="grid" aria-label="Navegación móvil">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center justify-between border-b border-[#76572f]/20 font-serif text-xl text-[#24211e]">
                  {item.label}
                </Link>
              ))}
              <Link href={pathname === "/" ? "#consulta-form" : "/contacto#contenido"} onClick={() => setOpen(false)} className="flex min-h-16 items-center text-sm font-medium text-[#76572f]">
                Solicitar evaluación privada <span aria-hidden="true" className="ml-3">↗</span>
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
