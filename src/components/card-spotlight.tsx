"use client";

import React, { useRef, useState } from "react";

interface CardSpotlightProps {
  children: React.ReactNode;
  className?: string;
}

export function CardSpotlight({ children, className = "" }: CardSpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative p-[1px] overflow-hidden rounded-sm transition duration-300 ${className}`}
      style={{
        // The container background behaves as the glowing interactive border
        background: isHovered
          ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(184, 155, 94, 0.45), rgba(184, 155, 94, 0.08) 55%, transparent)`
          : "rgba(184, 155, 94, 0.12)",
      }}
    >
      {/* Dynamic glow halo overlay behind the card text content */}
      <div
        className="absolute inset-[1px] -z-10 rounded-[1px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(184, 155, 94, 0.08), transparent)`,
        }}
      />
      {children}
    </div>
  );
}
