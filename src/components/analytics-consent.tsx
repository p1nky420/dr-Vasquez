"use client";

import Script from "next/script";
import { useState } from "react";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function AnalyticsConsent() {
  const [accepted, setAccepted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {accepted && gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-consented" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}
      {accepted && metaPixelId ? (
        <Script id="meta-pixel-consented" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}
      {!accepted && !dismissed ? (
        <div className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[80] mx-auto max-w-2xl border border-[#9a835b]/40 bg-[#11100e]/95 p-4 text-[#f4efe5] shadow-[0_18px_55px_rgba(0,0,0,0.65)] backdrop-blur-xl md:inset-x-4 md:bottom-4 md:flex md:items-center md:gap-5">
          <p className="flex-1 text-xs leading-5 text-[#aaa298]">
            Usamos medición de conversión para mejorar la experiencia. No se activa analítica sin su consentimiento.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 md:mt-0 md:flex">
            <button onClick={() => setDismissed(true)} className="min-h-11 touch-manipulation border border-[#9a835b]/35 px-4 py-2 text-[0.62rem] uppercase tracking-[0.16em]">Rechazar</button>
            <button onClick={() => setAccepted(true)} className="min-h-11 touch-manipulation bg-[#c7a86a] px-4 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[#11100e]">Aceptar</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
