"use client";

import { useEffect, useState } from "react";
import { QuickIntake } from "@/components/quick-intake";
import { WhatsappCta } from "@/components/whatsapp-cta";

export function ConsultationActions({ source, message }: { source: string; message?: string }) {
  const [canSendForm, setCanSendForm] = useState(false);
  const [formOpened, setFormOpened] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/intake", { signal: controller.signal })
      .then(response => response.ok ? response.json() : null)
      .then(status => setCanSendForm(status?.deliveryAvailable === true))
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <div className="consult-actions">
      <WhatsappCta location={source} message={message} />
      {canSendForm && (
        <details className="consult-actions__form" onToggle={event => {
          if (event.currentTarget.open) setFormOpened(true);
        }}>
          <summary>Prefiero enviar mis datos por la web</summary>
          {formOpened && <QuickIntake source={source} deliveryConfirmed />}
        </details>
      )}
    </div>
  );
}
