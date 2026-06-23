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
    window.requestAnimationFrame(() => {
      if (saved === "accepted" || saved === "rejected") setConsent(saved);
      setReady(true);
    });
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    window.localStorage.setItem("analytics-consent", value);
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" && gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-consented" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}
      {consent === "accepted" && metaPixelId ? (
        <Script id="meta-pixel-consented" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}
      {ready && consent === null ? (
        <aside
          aria-label="Preferencias de privacidad"
          className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] left-3 right-3 z-[80] border border-[#9a835b]/35 bg-[#11100e]/96 p-5 text-[#f4efe5] shadow-[0_24px_70px_rgba(0,0,0,0.68)] backdrop-blur-xl md:bottom-5 md:left-5 md:right-auto md:max-w-[28rem]"
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
