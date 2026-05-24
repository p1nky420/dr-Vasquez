"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Scale, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ButtonLink } from "@/components/button-link";
import { contactMessage, navItems, whatsappHref } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "border-gold/25 bg-[#0b0f14]/96 py-0 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          : "border-gold/10 bg-transparent py-2"
      }`}
    >
      {/* Upper strip shown only on top */}
      <div
        className={`hidden border-b border-gold/10 text-[0.62rem] uppercase tracking-[0.24em] text-steel/80 transition-all duration-500 lg:block ${
          scrolled ? "h-0 overflow-hidden opacity-0 border-none" : "h-9 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
          <span>Derecho Penal Económico & Litigio Estratégico</span>
          <span className="text-gold/80 italic normal-case tracking-wider">Defensa · Prueba · Garantías · Reputación</span>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        
        {/* FV Monogram Logo (with golden metallic animation) */}
        <Link className="group flex items-center gap-4" href="/" onClick={() => setOpen(false)}>
          <span className="font-serif text-3xl font-black tracking-tight text-gold-metallic animate-text-shine select-none">
            FV
          </span>
          <div className="hidden h-6 w-px bg-gold/30 sm:block" />
          <span className="hidden leading-none sm:block">
            <span className="block font-serif text-[1rem] tracking-wider text-ivory group-hover:text-gold transition duration-300">
              Fausto Vásquez
            </span>
            <span className="mt-0.5 block text-[0.55rem] uppercase tracking-[0.32em] text-gold/80">
              Abogados
            </span>
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2.5 text-[0.78rem] font-semibold tracking-[0.1em] transition duration-300 uppercase ${
                  active ? "text-gold" : "text-steel hover:text-ivory"
                }`}
              >
                {item.label}
                {active ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-[1.5px] bg-gradient-to-r from-gold/50 via-gold to-gold/50"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Right side icon */}
        <div className="hidden lg:block">
          <Link
            href="/contacto"
            className="text-gold hover:text-ivory hover:rotate-[15deg] transform transition duration-500 block"
            aria-label="Contacto"
          >
            <Scale size={23} strokeWidth={1.2} />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="grid size-11 place-items-center border border-gold/20 text-gold hover:text-ivory hover:border-gold/50 transition duration-300 lg:hidden rounded-sm"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Subtle pulsing bottom light boundary strip */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-80" />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-gold/10 bg-[#0b0f14]/98 px-5 pb-8 pt-4 lg:hidden shadow-2xl backdrop-blur-xl"
          >
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`border-b border-gold/5 py-3 text-sm uppercase tracking-widest font-semibold ${
                    pathname === item.href ? "text-gold" : "text-ivory"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ButtonLink
              className="mt-6 w-full shadow-glow-gold"
              href={whatsappHref(contactMessage)}
              target="_blank"
            >
              Contactar por WhatsApp
            </ButtonLink>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
