"use client";

import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { contactMessage, whatsappHref } from "@/lib/site";

export function FloatingWhatsapp() {
  return (
    <a
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 hidden size-12 place-items-center rounded-full border border-[#c9a96a]/55 bg-[#0b0a08]/95 text-[#f3eee4] shadow-lg backdrop-blur-xl transition hover:bg-[#c9a96a] hover:text-[#11100e] xl:grid"
      href={whatsappHref(contactMessage)}
      onClick={() => trackEvent("whatsapp_click", { location: "floating-desktop" })}
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={21} />
    </a>
  );
}
