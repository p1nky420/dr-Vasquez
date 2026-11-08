import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PanoramicHero } from "@/components/panoramic-hero";
import { heroPhotos, type HeroPhoto } from "@/lib/hero-photos";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  photo?: HeroPhoto;
  actionLabel?: string;
  actionHref?: string;
};

export function PageHero({ eyebrow, title, text, photo = heroPhotos.reception, actionLabel = "Explorar", actionHref = "#contenido" }: PageHeroProps) {
  const ActionIcon = actionHref.startsWith("#") ? ArrowDown : ArrowUpRight;
  return (
    <PanoramicHero photo={photo} variant="interior" titleId="page-title">
      <nav className="ed-breadcrumb" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span>{eyebrow}</span>
      </nav>
      <p className="ed-kicker">{eyebrow}</p>
      <h1 id="page-title">{title}</h1>
      <p className="ed-lead">{text}</p>
      <a className="fv-cover__action" href={actionHref}>
        {actionLabel} <ActionIcon size={18} aria-hidden="true" />
      </a>
    </PanoramicHero>
  );
}
