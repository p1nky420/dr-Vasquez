import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Aviso legal | Dr. Fausto Vásquez — Estudio Jurídico" },
  description:
    "Condiciones de uso del sitio del Estudio Jurídico Dr. Fausto Vásquez, alcance de la información publicada y naturaleza de la relación profesional.",
  alternates: { canonical: `${SITE_URL}/aviso-legal` },
  robots: { index: true, follow: true },
};

export default function AvisoLegalPage() {
  return (
    <LegalPage
      eyebrow="Condiciones de uso"
      title="Aviso legal"
      updated="septiembre de 2026"
      intro="Qué es y qué no es la información publicada en este sitio, y en qué momento nace una relación profesional con la firma."
    >
      <h2>Titular del sitio</h2>
      <p>
        <strong>Dr. Fausto Ramiro Vásquez Cevallos</strong> — Estudio Jurídico.
        Abogado de los Tribunales y Juzgados de la República del Ecuador.
        Oficina en Av. 12 de Octubre N26-97 y Lincoln, Torre 1492, Piso 8,
        Oficina 802, Quito.{" "}
        <a href="mailto:contacto@faustovasquezabogados.com">
          contacto@faustovasquezabogados.com
        </a>{" "}
        · <a href="tel:+593983076881">+593 98 307 6881</a>.
      </p>

      <h2>La información publicada no es asesoría jurídica</h2>
      <p>
        Los contenidos de este sitio —incluidos los artículos, las áreas de
        práctica y las preguntas frecuentes— describen generalidades del
        ordenamiento penal ecuatoriano con fines informativos. <strong>No
        constituyen asesoría jurídica para un caso concreto</strong> y no deben
        utilizarse como sustituto de una consulta profesional.
      </p>
      <p>
        Cada asunto depende de sus hechos, su prueba, su etapa procesal y su
        contexto institucional. Dos situaciones que parecen iguales pueden
        requerir estrategias opuestas.
      </p>

      <h2>Cuándo nace la relación abogado-cliente</h2>
      <div className="aside">
        <p>
          Enviar el formulario, escribir por WhatsApp o mantener una primera
          conversación <strong>no crea una relación abogado-cliente</strong>.
          Esa relación nace únicamente cuando la firma acepta expresamente el
          asunto por escrito, después de verificar disponibilidad y ausencia de
          conflictos de interés.
        </p>
      </div>
      <p>
        Hasta ese momento, la información que usted comparta se trata con
        confidencialidad, pero la firma no asume la dirección técnica de su
        caso ni el cómputo de plazos procesales.
      </p>

      <h2>No se prometen resultados</h2>
      <p>
        Ninguna referencia a la trayectoria, a la formación académica o a la
        experiencia de la firma debe interpretarse como garantía o predicción
        de un resultado. Los casos representativos que puedan publicarse se
        presentan anonimizados y con autorización, y describen intervenciones
        pasadas que no anticipan desenlaces futuros.
      </p>

      <h2>Admisión selectiva</h2>
      <p>
        La firma no asume todos los asuntos que se le plantean. La aceptación
        depende de la naturaleza del caso, su urgencia, la jurisdicción, la
        disponibilidad real para dirigirlo y la ausencia de conflictos de
        interés.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, obras jurídicas, análisis, fotografías y elementos gráficos
        de este sitio son propiedad de su titular o se utilizan con
        autorización. Se permite citarlos indicando la fuente y enlazando a la
        página de origen. No se autoriza su reproducción íntegra con fines
        comerciales sin consentimiento previo.
      </p>

      <h2>Enlaces externos</h2>
      <p>
        El sitio puede enlazar a páginas de terceros —instituciones académicas,
        editoriales o medios—. La firma no controla esos contenidos ni responde
        por ellos.
      </p>

      <h2>Legislación y jurisdicción</h2>
      <p>
        Este aviso se rige por la legislación ecuatoriana. Cualquier
        controversia derivada del uso del sitio se someterá a los jueces
        competentes del Distrito Metropolitano de Quito.
      </p>

      <h2>Tratamiento de datos</h2>
      <p>
        El tratamiento de los datos personales recogidos a través del sitio se
        describe en la{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>
    </LegalPage>
  );
}
