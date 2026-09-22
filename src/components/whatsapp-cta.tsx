"use client";

import { MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { whatsappHref, phoneHref, phoneDisplay } from "@/lib/site";

/**
 * The immediate-contact pair, for visitors who will not fill a form.
 * Both actions report where on the site they were used.
 */
export function WhatsappCta({
  location,
  message,
  className = "",
}: {
  location: string;
  message: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-center ${className}`}>
      <a
        href={whatsappHref(message)}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("whatsapp_click", { location })}
        className="inline-flex min-h-13 items-center justify-center gap-2.5 border border-[#25d366]/45 bg-[#25d366]/10 px-5 py-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#f3eee4] transition-colors hover:bg-[#25d366] hover:text-[#08130c]"
      >
        <MessageCircle size={17} /> Escribir por WhatsApp
      </a>
      <a
        href={phoneHref}
        onClick={() => trackEvent("phone_click", { location })}
        className="inline-flex min-h-13 items-center justify-center gap-2.5 border border-[#ecc058]/40 px-5 py-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.12em] text-[#ecc058] transition-colors hover:border-[#ecc058] hover:bg-[#ecc058] hover:text-[#15130f]"
      >
        <Phone size={16} /> {phoneDisplay}
      </a>
    </div>
  );
}
