"use client";

import { useState, useEffect } from "react";
import { ChevronUp, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";
import { hapticFeedback } from "@/lib/haptics";

export function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowScroll(window.scrollY > 600);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-center gap-3 sm:hidden">
      {showScroll && (
        <button
          onClick={() => {
            hapticFeedback();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Volver al inicio"
          className="flex size-12 items-center justify-center rounded-full border border-[#ecc058]/30 bg-[#15120f]/90 text-[#ecc058] backdrop-blur-sm transition-all duration-300 active:scale-90 hover:border-[#ecc058]/60"
        >
          <ChevronUp size={20} />
        </button>
      )}
      <a
        href={whatsappHref("Hola, deseo agendar una llamada privada de evaluación confidencial con el Dr. Fausto Vásquez.")}
        target="_blank"
        rel="noreferrer"
        onClick={hapticFeedback}
        aria-label="Contactar por WhatsApp"
        className="flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/30 transition-all duration-300 active:scale-90 hover:bg-[#20c05b]"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
