"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the preloader has already run in this session
    const hasRun = sessionStorage.getItem("fv_preloader_run");
    if (hasRun === "true") {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("fv_preloader_run", "true");
    }, 3700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0b0f14]"
        >
          {/* Subtle marble background inside the preloader */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,#b89b5e,transparent_70%)] pointer-events-none" />

          <div className="relative flex flex-col items-center">
            
            {/* Elegant SVG draw path laser animation for monogram FV */}
            <svg
              className="w-36 h-36 text-gold drop-shadow-[0_0_12px_rgba(184,155,94,0.25)]"
              viewBox="0 0 140 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="preloaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f5f2ea" />
                  <stop offset="35%" stopColor="#d4af37" />
                  <stop offset="70%" stopColor="#b89b5e" />
                  <stop offset="100%" stopColor="#8b6d2c" />
                </linearGradient>
              </defs>
              
              {/* Monograma FV Caligráfico Cruzado */}
              {/* F - Cuerpo Vertical Estilizado */}
              <motion.path
                d="M 46 25 C 46 25, 52 10, 52 30 C 52 50, 46 72, 42 78 C 38 84, 28 86, 32 80 C 36 74, 45 64, 45 64"
                stroke="url(#preloaderGold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.8, ease: "easeInOut" },
                  opacity: { duration: 0.2 },
                }}
              />
              {/* F - Bucle y Sombrero Superior */}
              <motion.path
                d="M 22 34 C 32 24, 58 20, 78 26 C 82 27, 85 30, 80 34 C 74 38, 62 36, 54 36"
                stroke="url(#preloaderGold)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.4, ease: "easeInOut", delay: 0.3 },
                  opacity: { duration: 0.2, delay: 0.3 },
                }}
              />
              {/* F - Barra Intermedia Elegante */}
              <motion.path
                d="M 36 52 C 44 52, 54 48, 62 46"
                stroke="url(#preloaderGold)"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.0, ease: "easeInOut", delay: 0.6 },
                  opacity: { duration: 0.2, delay: 0.6 },
                }}
              />
              {/* V - Trazo Izquierdo (Entrelazado con F) */}
              <motion.path
                d="M 68 35 C 72 48, 82 76, 86 84 C 88 88, 91 90, 94 84"
                stroke="url(#preloaderGold)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.5, ease: "easeInOut", delay: 0.8 },
                  opacity: { duration: 0.2, delay: 0.8 },
                }}
              />
              {/* V - Trazo Derecho Caligráfico con Bucle Superior */}
              <motion.path
                d="M 94 84 C 99 68, 108 38, 114 28 C 116 23, 122 14, 126 24 C 128 30, 123 37, 115 34 C 107 30, 110 22, 118 19"
                stroke="url(#preloaderGold)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 2.0, ease: "easeInOut", delay: 1.2 },
                  opacity: { duration: 0.2, delay: 1.2 },
                }}
              />
            </svg>

            {/* Glowing gold dot below */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-6 h-1 w-1 rounded-full bg-gold shadow-[0_0_12px_#b89b5e]"
            />

            {/* Micro-label at bottom */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.45, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-8 font-serif text-[0.6rem] uppercase tracking-[0.38em] text-ivory"
            >
              Estudio Jurídico · Fausto Vásquez
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
