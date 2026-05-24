"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export function PortraitWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotate({
      x: -y * 8, // Reduced tilt for maximum elegance
      y: x * 8,
    });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.25s ease-out",
      }}
      className="relative group p-1.5 border border-gold/10 bg-[#0b0f14]/80 backdrop-blur-md rounded-sm cursor-pointer select-none"
    >
      {/* Soft spotlight behind */}
      <div className="absolute inset-0 bg-gold/5 blur-[25px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Single ultra-thin golden frame */}
      <div className="absolute inset-2 border border-gold/15 pointer-events-none group-hover:border-gold/30 transition duration-500" />

      {/* Profile picture */}
      <div 
        className="relative overflow-hidden w-full max-w-[340px] aspect-[4/5] bg-graphite"
        style={{ transform: "translateZ(10px)" }}
      >
        <Image
          src="/portrait_fausto.jpg"
          alt="Retrato oficial Dr. Fausto Vásquez"
          fill
          className="object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 340px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/40 to-transparent pointer-events-none" />
      </div>

      {/* Sub-label */}
      <div 
        className="mt-4 pb-2 text-center"
        style={{ transform: "translateZ(15px)" }}
      >
        <h3 className="font-serif text-lg font-bold text-ivory group-hover:text-gold transition duration-300">
          Dr. Fausto Vásquez
        </h3>
        <p className="text-[0.58rem] uppercase tracking-[0.24em] text-steel mt-1 font-semibold">
          Socio Fundador & Director Legal
        </p>
      </div>
    </div>
  );
}
