import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { practiceAreas } from "@/lib/site";

const administrationHref = "/areas-de-practica/delitos-administracion-publica";
const featured = practiceAreas.find(area => area.href === administrationHref);
const otherAreas = practiceAreas.filter(area => area.href !== administrationHref);

export function PracticeGrid() {
  return (
    <div className="in-directory">
      {featured && (
        <Link href={featured.href} className="in-directory__feature">
          <Image src="/estudio/preparacion-expediente.webp" alt="Revisión de documentos en el despacho" width={960} height={1280} sizes="(max-width: 680px) 88vw, 32vw" />
          <div>
            <p className="ed-kicker">Funcionarios y contratistas</p>
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
            <span className="in-inline">Ver especialidad <ArrowUpRight size={16} aria-hidden="true" /></span>
          </div>
        </Link>
      )}
      <div className="in-directory__grid">
        {otherAreas.map(({ title, description, href, icon: Icon }) => (
          <Link key={href} href={href}>
            <div className="in-directory__icons"><Icon size={22} strokeWidth={1.45} aria-hidden="true" /><ArrowUpRight size={17} aria-hidden="true" /></div>
            <h3>{title}</h3>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
