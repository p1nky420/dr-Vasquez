import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "Política de privacidad | Dr. Fausto Vásquez — Estudio Jurídico" },
  description:
    "Cómo el Estudio Jurídico Dr. Fausto Vásquez trata los datos personales recibidos a través de este sitio, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.",
  alternates: { canonical: `${SITE_URL}/privacidad` },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalPage
      eyebrow="Protección de datos"
      title="Política de privacidad"
      updated="septiembre de 2026"
      intro="Este sitio recibe información de personas que atraviesan situaciones jurídicas sensibles. Esta política explica qué datos se recogen, para qué se usan y qué derechos tiene sobre ellos."
    >
      <h2>Quién trata sus datos</h2>
      <p>
        El responsable del tratamiento es el <strong>Estudio Jurídico Dr. Fausto
        Vásquez</strong>, con oficina en Av. 12 de Octubre N26-97 y Lincoln,
        Torre 1492, Piso 8, Oficina 802, Quito, Ecuador. Para cualquier asunto
        relacionado con sus datos puede escribir a{" "}
        <a href="mailto:contacto@faustovasquezabogados.com">
          contacto@faustovasquezabogados.com
        </a>.
      </p>

      <h2>Qué datos se recogen</h2>
      <h3>Los que usted nos entrega</h3>
      <p>
        A través del formulario de evaluación: nombre y teléfono, que son los
        únicos campos obligatorios. De forma opcional, correo electrónico y una
        descripción inicial de su situación, así como materia, etapa procesal,
        urgencia y jurisdicción si decide indicarlos.
      </p>
      <div className="aside">
        <p>
          <strong>No envíe documentos ni hechos especialmente sensibles a
          través del formulario.</strong> El primer contacto sirve únicamente
          para verificar disponibilidad y posibles conflictos de interés. La
          documentación se entrega por los canales que se acuerden después.
        </p>
      </div>

      <h3>Los que se recogen automáticamente</h3>
      <p>
        Si usted acepta la medición en el aviso de privacidad del sitio, Google
        Analytics registra datos de navegación de forma agregada: páginas
        vistas, origen de la visita, tipo de dispositivo y profundidad de
        lectura. Si no la acepta, esos datos no se asocian a cookies ni permiten
        identificarle.
      </p>

      <h2>Para qué se usan</h2>
      <ul>
        <li>Responder a su consulta y evaluar si la firma puede asumir el asunto.</li>
        <li>Verificar la existencia de conflictos de interés antes de recibir información confidencial.</li>
        <li>Entender de forma agregada cómo se usa el sitio, para mejorarlo.</li>
      </ul>
      <p>
        Sus datos <strong>no se venden, no se ceden con fines comerciales y no
        se usan para publicidad dirigida</strong>.
      </p>

      <h2>Base legal</h2>
      <p>
        El tratamiento se apoya en su consentimiento expreso, que usted otorga
        al marcar la casilla del formulario, y en el interés legítimo de
        atender una solicitud de servicios profesionales que usted inicia.
        Puede retirar el consentimiento en cualquier momento escribiendo a la
        dirección indicada arriba.
      </p>

      <h2>Cuánto tiempo se conservan</h2>
      <p>
        Las solicitudes que no derivan en una relación profesional se conservan
        un máximo de noventa días y después se eliminan. Si la firma asume su
        caso, la conservación pasa a regirse por las obligaciones aplicables al
        ejercicio profesional y por el secreto profesional.
      </p>

      <h2>Confidencialidad y seguridad</h2>
      <p>
        La información que recibe la firma está amparada por el{" "}
        <strong>secreto profesional</strong>, incluso cuando no llega a
        formalizarse una representación. La transmisión del formulario se
        realiza cifrada, y el acceso a las solicitudes está restringido a las
        personas que intervienen en la evaluación del asunto.
      </p>
      <p>
        Ningún sistema es infalible. Si detectamos un incidente que afecte a sus
        datos, se lo comunicaremos y notificaremos a la autoridad de control
        conforme a la normativa aplicable.
      </p>

      <h2>Sus derechos</h2>
      <p>
        Conforme a la Ley Orgánica de Protección de Datos Personales del
        Ecuador, usted puede solicitar en cualquier momento:
      </p>
      <ul>
        <li><strong>Acceso</strong> — saber qué datos suyos conservamos.</li>
        <li><strong>Rectificación</strong> — corregir datos inexactos.</li>
        <li><strong>Eliminación</strong> — pedir que se supriman.</li>
        <li><strong>Oposición</strong> — oponerse a un tratamiento concreto.</li>
        <li><strong>Portabilidad</strong> — recibir sus datos en formato legible.</li>
      </ul>
      <p>
        Escriba a{" "}
        <a href="mailto:contacto@faustovasquezabogados.com">
          contacto@faustovasquezabogados.com
        </a>{" "}
        indicando qué derecho desea ejercer. Si considera que sus derechos no
        han sido atendidos, puede acudir a la Superintendencia de Protección de
        Datos Personales.
      </p>

      <h2>Terceros que intervienen</h2>
      <ul>
        <li><strong>Vercel</strong> — alojamiento del sitio.</li>
        <li><strong>Google Analytics</strong> — medición agregada, solo con su consentimiento.</li>
        <li><strong>Cloudflare Turnstile</strong> — verificación anti-spam del formulario, cuando está activa.</li>
      </ul>
      <p>
        Estos proveedores pueden procesar datos fuera del Ecuador. Se eligen por
        ofrecer garantías contractuales de protección equivalentes.
      </p>

      <h2>Cambios en esta política</h2>
      <p>
        Cualquier modificación se publicará en esta misma página con su fecha de
        actualización.
      </p>
    </LegalPage>
  );
}
