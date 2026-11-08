"use client";

import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { contactMessage, whatsappHref, phoneHref, phoneDisplay } from "@/lib/site";

/**
 * The immediate-contact pair, for visitors who will not fill a form.
 * Both actions report where on the site they were used.
 */
export function WhatsappCta({
  location,
  message = contactMessage,
  label = "Solicitar evaluación privada",
  className = "",
}: {
  location: string;
  message?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`contact-actions ${className}`}>
      <a href={whatsappHref(message)} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click", { location })} className="contact-actions__primary">
        <span className="contact-actions__icon"><MessageCircle size={19} strokeWidth={1.5} /></span>
        <span><strong>{label}</strong><small>Por WhatsApp</small></span>
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
      <a href={phoneHref} onClick={() => trackEvent("phone_click", { location })} className="contact-actions__phone">
        <Phone size={16} strokeWidth={1.5} aria-hidden="true" /><span><small>Llamar al despacho</small><strong>{phoneDisplay}</strong></span>
      </a>
    </div>
  );
}
