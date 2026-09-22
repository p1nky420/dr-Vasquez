"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function AnalyticsConsent() {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("analytics-consent");
    if (saved === "accepted" || saved === "rejected") {
      queueMicrotask(() => setConsent(saved));
      return;
    }

    // El banner no compite con el hero: aparece tras el primer scroll o a los
    // 12 s. Antes tapaba el CTA principal en el momento de mayor atención.
    const reveal = () => setReady(true);
    const timer = window.setTimeout(reveal, 12_000);
    window.addEventListener("scroll", reveal, { once: true, passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    window.localStorage.setItem("analytics-consent", value);
    setConsent(value);
  };

  return (
    <>
      {/* Consent Mode v2: gtag carga siempre en estado denegado y solo se
          otorgan los permisos tras la aceptación. Esto permite a GA4 modelar
          conversiones de quienes rechazan, en lugar de perderlas por completo. */}
      {gaId ? (
        <>
          {/* El default de Consent Mode se declara en el <head> del layout,
              antes de que se cargue gtag. Ver app/layout.tsx. */}
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`gtag('js',new Date());gtag('config','${gaId}',{send_page_view:true});`}
          </Script>
        </>
      ) : null}
      {consent === "accepted" && gaId ? (
        <Script id="ga4-consent-granted" strategy="afterInteractive">
          {`gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});`}
        </Script>
      ) : null}
      {consent === "accepted" && metaPixelId ? (
        <Script id="meta-pixel-consented" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}
      {ready && consent === null ? (
        <aside
          aria-label="Preferencias de privacidad"
          className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-3 right-3 z-[80] border border-[#9a835b]/35 bg-[#11100e]/96 p-5 text-[#f4efe5] shadow-[0_24px_70px_rgba(0,0,0,0.68)] backdrop-blur-xl md:bottom-5 md:left-auto md:right-24 md:max-w-[26rem]"
        >
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#ecc058]">Privacidad</p>
          <p className="mt-2 text-sm leading-6 text-[#c3bbb0]">
            La medición anónima nos ayuda a mejorar el sitio. No activamos analítica sin su autorización.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button onClick={() => decide("rejected")} className="min-h-11 touch-manipulation border border-[#9a835b]/35 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-[#ecc058]">Solo necesarias</button>
            <button onClick={() => decide("accepted")} className="min-h-11 touch-manipulation bg-[#c7a86a] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#11100e] transition-colors hover:bg-[#dfc184]">Aceptar</button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
