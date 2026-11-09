import { academyPrograms } from "@/lib/academia";
import { academyInterestSiteKey } from "@/lib/server/academy-interest";
import { whatsappHref } from "@/lib/site";
import { AcademyInterestForm } from "./interest-form";

export function AcademyInterest({ program }: { program?: string }) {
  const options = academyPrograms.map(({ slug, code, level, title }) => ({
    slug, code, label: `Nivel ${level} · ${title}`,
  }));
  const whatsapp = Object.fromEntries(options.map(({ slug, label }) => [
    slug, whatsappHref(`Hola, me interesa la formación de la Academia. ¿Pueden avisarme cuando se abra la convocatoria de ${label}?`),
  ]));
  whatsapp.general = whatsappHref("Hola, me interesa la formación de la Academia. ¿Pueden avisarme cuando abran las próximas convocatorias?");
  const siteKey = academyInterestSiteKey();

  return (
    <section id="lista-de-interes" className="in-wrap academy-interest" aria-labelledby="interes-titulo">
      <header>
        <p className="ed-kicker">Próximas cohortes</p>
        <h2 id="interes-titulo">Reciba el aviso de apertura.</h2>
        <p>Le informaremos sobre las fechas y los detalles de la convocatoria cuando se confirmen. El aviso es gratuito y el registro es voluntario.</p>
      </header>
      <AcademyInterestForm key={program ?? "general"} options={options} selected={program} whatsapp={whatsapp} siteKey={siteKey} />
    </section>
  );
}
