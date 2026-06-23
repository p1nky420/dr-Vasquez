"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/site";
import { SearchButton } from "@/components/search-modal";

export function Header() {
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "border-b border-white/10 bg-[#090806]/92 shadow-[0_18px_60px_rgba(0,0,0,.28)] backdrop-blur-xl" : "bg-gradient-to-b from-black/65 to-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-[94rem] items-center justify-between px-5 md:h-24 md:px-8">
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-4" aria-label="Dr. Fausto Vásquez — Estudio Jurídico, inicio">
          <div className="relative h-8 w-14 md:h-10 md:w-20">
            <Image src="/logoFV-solo.png" alt="Fausto Vásquez" fill className="object-contain" sizes="80px" />
          </div>
          <span className="h-7 w-px bg-[#ecc058]/35" />
          <span>
            <strong className="block font-serif text-sm font-normal tracking-[0.04em] text-[#f3eee4] sm:text-base">Fausto Vásquez</strong>
            <small className="mt-1 block text-[0.58rem] uppercase tracking-[0.26em] text-[#b8b0a5] max-sm:text-[0.65rem]">Jurista penalista</small>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="relative py-3 text-[0.6rem] xl:text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#c2baae] transition-colors whitespace-nowrap after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[#ecc058] after:transition-transform hover:text-[#f3eee4] hover:after:scale-x-100">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SearchButton />
          <Link href="/#consulta" className="hidden border border-[#ecc058]/55 px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-[#f3eee4] transition-colors hover:bg-[#ecc058] hover:text-[#15130f] md:inline-flex">
            Consulta privada
          </Link>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-navigation" className="grid size-12 place-items-center border border-white/15 text-[#ecc058] touch-manipulation lg:hidden">
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="border-t border-white/10 bg-[#090806] px-5 pb-8 lg:hidden">
            <nav id="mobile-navigation" className="grid" aria-label="Navegación móvil">
              {navItems.map((item, index) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center justify-between border-b border-white/10 font-serif text-xl text-[#f3eee4]">
                  {item.label}<span className="font-sans text-[0.65rem] text-[#ecc058]">0{index + 1}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
