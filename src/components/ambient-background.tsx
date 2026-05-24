"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  angle: number;
  spin: number;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 45; // Cantidad óptima de partículas doradas premium para no saturar la CPU

    // Ajustar resolución de pantalla retina (DPR)
    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2.8 + 1.0, // Tamaños de 1.0px a 3.8px (Bokeh sutil de lujo)
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: -(Math.random() * 0.35 + 0.10), // Flotar verticalmente hacia arriba
          opacity: Math.random() * 0.4 + 0.15,
          fadeSpeed: Math.random() * 0.004 + 0.001,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.015,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      const mouse = mouseRef.current;
      mouse.vx = clientX - mouse.lastX;
      mouse.vy = clientY - mouse.lastY;
      mouse.x = clientX;
      mouse.y = clientY;
      mouse.lastX = clientX;
      mouse.lastY = clientY;
    };

    const handleMouseLeave = () => {
      const mouse = mouseRef.current;
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    // Inicializar
    resizeCanvas();

    // Obtener dimensiones iniciales del contenedor
    const getDimensions = () => {
      const rect = containerRef.current?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      return { width: rect.width, height: rect.height };
    };

    // Bucle de renderizado
    const animate = () => {
      const { width, height } = getDimensions();
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;

      // Disipar la velocidad del ratón
      mouse.vx *= 0.95;
      mouse.vy *= 0.95;

      particles.forEach((p) => {
        // Movimiento natural
        p.angle += p.spin;
        p.y += p.speedY + Math.sin(p.angle) * 0.05;
        p.x += p.speedX + Math.cos(p.angle) * 0.08;

        // Comportamiento del ratón (brisa/repulsión elegante)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180; // Área de influencia de la brisa

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          // Empujar la partícula suavemente
          const angle = Math.atan2(dy, dx);
          // La brisa actúa como viento físico
          p.x += Math.cos(angle) * force * 1.5 + mouse.vx * force * 0.15;
          p.y += Math.sin(angle) * force * 1.5 + mouse.vy * force * 0.15;
        }

        // Si sale de los límites, reaparecer abajo o en los lados con desvanecimiento suave
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = 0;
        }
        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }

        // Pulsación de opacidad suave
        if (p.opacity < 0.70) {
          p.opacity += p.fadeSpeed;
        } else {
          p.opacity = 0.15;
        }

        // Dibujar partícula dorada con brillo
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Crear un degradado de oro radial para cada mota de polvo (Bokeh lujoso)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(245, 242, 234, ${p.opacity})`); // Oro marfil muy brillante
        grad.addColorStop(0.3, `rgba(184, 155, 94, ${p.opacity * 0.8})`); // Oro templado
        grad.addColorStop(1, `rgba(184, 155, 94, 0)`); // Transparente

        ctx.fillStyle = grad;
        
        // Agregar un sutil brillo para las partículas de primer plano
        if (p.size > 2.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(184, 155, 94, 0.35)";
        }

        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-[#05080c]"
      style={{
        // Fondo base de degradado líquido profundo en tonos azul zafiro, obsidiana y bronce sutil
        background: `
          radial-gradient(circle at 50% -20%, rgba(14, 42, 54, 0.4) 0%, transparent 65%),
          radial-gradient(circle at 10% 80%, rgba(28, 24, 14, 0.35) 0%, transparent 55%),
          radial-gradient(circle at 90% 80%, rgba(14, 42, 54, 0.28) 0%, transparent 55%),
          #05080c
        `
      }}
    >
      {/* 1. Procedural luxury analog grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-repeat pointer-events-none mix-blend-overlay" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} 
      />

      {/* 2. Auroras pulsantes premium de movimiento fluido (Framer Motion) */}
      {!prefersReducedMotion && (
        <>
          {/* Aurora 1: Oro Líquido Místico (Top Right) */}
          <motion.div
            animate={{
              x: [0, -80, 40, 0],
              y: [0, 60, -40, 0],
              scale: [1, 1.2, 0.95, 1],
              opacity: [0.08, 0.16, 0.11, 0.08],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-1/4 -top-1/4 w-[90vw] h-[90vw] rounded-full bg-gradient-to-tr from-gold via-[#e5c17d] to-[#0e2a36] blur-[150px] mix-blend-screen pointer-events-none"
          />

          {/* Aurora 2: Azul Zafiro Profundo (Left Center) */}
          <motion.div
            animate={{
              x: [0, 70, -50, 0],
              y: [0, -60, 80, 0],
              scale: [1, 1.1, 1.25, 1],
              opacity: [0.07, 0.14, 0.09, 0.07],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-1/4 top-1/4 w-[85vw] h-[85vw] rounded-full bg-gradient-to-br from-[#0e2a36] via-[#164356] to-transparent blur-[160px] pointer-events-none"
          />

          {/* Aurora 3: Oro Cobre Satén (Bottom Right) */}
          <motion.div
            animate={{
              x: [0, -50, 30, 0],
              y: [0, -70, 40, 0],
              scale: [1, 1.05, 0.9, 1],
              opacity: [0.06, 0.12, 0.08, 0.06],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-1/4 -bottom-1/4 w-[75vw] h-[75vw] rounded-full bg-gradient-to-t from-[#8b6d2c] via-[#b89b5e] to-transparent blur-[130px] mix-blend-screen pointer-events-none"
          />
        </>
      )}

      {/* 3. Canvas de partículas interactivas de polvo de oro */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
      />

      {/* 4. Sutiles líneas de malla geométrica clásica de bajo contraste (Luxury feel) */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(184,155,94,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(184,155,94,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "85px 85px"
        }}
      />
    </div>
  );
}

