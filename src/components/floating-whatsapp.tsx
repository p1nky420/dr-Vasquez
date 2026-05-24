import { MessageCircle } from "lucide-react";
import { contactMessage, whatsappHref } from "@/lib/site";

export function FloatingWhatsapp() {
  return (
    <a
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center border border-gold/50 bg-gold text-graphite shadow-[0_18px_60px_rgba(184,155,94,0.24)] transition hover:-translate-y-1 hover:bg-ivory"
      href={whatsappHref(contactMessage)}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={24} />
    </a>
  );
}
