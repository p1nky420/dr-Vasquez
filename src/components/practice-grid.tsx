"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animated";
import { practiceAreas } from "@/lib/site";

export function PracticeGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="practice-catalogue">
      {practiceAreas.map((area, index) => {
        const Icon = area.icon;
        const isHovered = hoveredIndex === index;

        return (
          <Reveal delay={index * 0.08} key={area.title}>
            <article
              className={`practice-catalogue__card ${isHovered ? "practice-catalogue__card--active" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background image – revealed on hover */}
              <div className="practice-catalogue__image-layer">
                <Image
                  src={area.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="practice-catalogue__image"
                />
                <div className="practice-catalogue__image-overlay" />
              </div>

              {/* Ambient glow */}
              <div className="practice-catalogue__glow" />

              {/* Content */}
              <div className="practice-catalogue__content">
                {/* Header: number + icon */}
                <div className="practice-catalogue__header">
                  <span className="practice-catalogue__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="practice-catalogue__icon-ring">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="practice-catalogue__title">{area.title}</h3>

                {/* Separator line */}
                <div className="practice-catalogue__separator" />

                {/* Description – expands on hover */}
                <div className="practice-catalogue__description-wrapper">
                  <p className="practice-catalogue__description">
                    {area.description}
                  </p>
                </div>

                {/* CTA Button */}
                <div className="practice-catalogue__cta-wrapper">
                  <Link
                    href={area.href}
                    className="practice-catalogue__cta"
                  >
                    <span className="practice-catalogue__cta-text">Explorar</span>
                    <span className="practice-catalogue__cta-icon">
                      <ArrowRight size={14} strokeWidth={2} />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
