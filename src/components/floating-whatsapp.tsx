import { MessageCircle } from "lucide-react";
import { contactMessage, whatsappHref } from "@/lib/site";

export function FloatingWhatsapp() {
  return (
    <a
      aria-label="Contactar por WhatsApp"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex min-h-14 touch-manipulation items-center justify-center gap-3 border border-[#c9ad78]/55 bg-[#0b0a08]/95 px-5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#f3eee4] shadow-[0_16px_45px_rgba(0,0,0,0.55)] backdrop-blur-xl transition hover:bg-[#c9ad78] hover:text-[#11100e] md:inset-x-auto md:bottom-5 md:right-5 md:grid md:size-14 md:place-items-center md:rounded-full md:px-0"
      href={whatsappHref(contactMessage)}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={21} />
      <span className="md:hidden">Conversación privada por WhatsApp</span>
    </a>
  );
}
