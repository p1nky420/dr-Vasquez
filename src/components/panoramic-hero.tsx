import type { ReactNode } from "react";
import Image from "next/image";
import type { HeroPhoto } from "@/lib/hero-photos";

export function PanoramicHero({
  photo,
  titleId,
  variant,
  children,
}: {
  photo: HeroPhoto;
  titleId: string;
  variant: "home" | "interior";
  children: ReactNode;
}) {
  return (
    <section className={`fv-panorama ${variant === "home" ? "fv-cover" : "ed-hero"}`}
      data-copy-side={photo.copySide ?? "right"} aria-labelledby={titleId}>
      <figure className="fv-panorama__photo">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} preload fetchPriority="high" sizes="100vw" />
      </figure>
      <div className="fv-panorama__copy">{children}</div>
    </section>
  );
}
