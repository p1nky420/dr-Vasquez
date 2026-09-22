import "server-only";

import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { isUrgentIntake, summarizeIntake, type IntakeSubmission } from "@/lib/intake";

function encryptionKey() {
  const secret = process.env.INTAKE_ENCRYPTION_KEY;
  if (!secret) return null;
  return createHash("sha256").update(secret).digest();
}

export type EncryptedIntake = {
  algorithm: string;
  iv: string;
  authTag: string;
  payload: string;
};

/** Returns null when no key is configured, instead of throwing. */
export function encryptIntake(data: IntakeSubmission): EncryptedIntake | null {
  const key = encryptionKey();
  if (!key) return null;

  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data), "utf8"),
    cipher.final(),
  ]);

  return {
    algorithm: "aes-256-gcm",
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
    payload: encrypted.toString("base64"),
  };
}

export async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // No secret configured: the firm has chosen not to run a challenge. Do not
  // turn that into a blanket rejection of every real lead in production.
  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, cache: "no-store" },
    );
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    // Cloudflare being unreachable must not cost the firm a client.
    return true;
  }
}

async function persistEncrypted(record: Record<string, unknown>) {
  const storageUrl = process.env.INTAKE_STORAGE_URL;
  const storageToken = process.env.INTAKE_STORAGE_TOKEN;
  if (!storageUrl || !storageToken) return false;

  const response = await fetch(storageUrl, {
    method: "POST",
    headers: {
      authorization: `Bearer ${storageToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(record),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Storage responded ${response.status}`);
  return true;
}

async function notifyWebhook(summary: string, meta: Record<string, unknown>) {
  const webhookUrl = process.env.INTAKE_NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ text: summary, ...meta }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  return true;
}

async function notifyEmail(subject: string, summary: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INTAKE_NOTIFICATION_EMAIL;
  const from = process.env.INTAKE_NOTIFICATION_FROM;
  if (!apiKey || !to || !from) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((address) => address.trim()),
      subject,
      text: summary,
    }),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Email responded ${response.status}`);
  return true;
}

export type DeliveryResult = {
  delivered: boolean;
  channels: string[];
  failures: string[];
};

/**
 * Delivers a lead through every configured channel and reports which ones
 * worked. A single working channel is enough to tell the visitor "recibido" —
 * losing the lead is a worse failure than storing it in only one place.
 *
 * The full lead is always written to the server log as a last-resort record
 * that can be recovered from the hosting provider's log stream.
 */
export async function deliverIntake(
  data: IntakeSubmission,
  meta: { id: string; createdAt: string; ip: string | null },
): Promise<DeliveryResult> {
  const summary = summarizeIntake(data);
  const urgent = isUrgentIntake(data);
  const subject = `${urgent ? "🔴 URGENTE — " : ""}Nueva solicitud de evaluación · ${data.name}`;

  const channels: string[] = [];
  const failures: string[] = [];

  const attempts: Array<[string, Promise<boolean>]> = [
    [
      "storage",
      (async () => {
        const encrypted = encryptIntake(data);
        if (!encrypted) return false;
        return persistEncrypted({
          id: meta.id,
          status: "new",
          createdAt: meta.createdAt,
          retentionUntil: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          encrypted,
        });
      })(),
    ],
    ["webhook", notifyWebhook(`${subject}\n\n${summary}`, { ...meta, urgent })],
    ["email", notifyEmail(subject, `${summary}\n\nID: ${meta.id}`)],
  ];

  const settled = await Promise.allSettled(attempts.map(([, promise]) => promise));

  settled.forEach((result, index) => {
    const name = attempts[index][0];
    if (result.status === "fulfilled") {
      if (result.value) channels.push(name);
    } else {
      failures.push(`${name}: ${String(result.reason)}`);
    }
  });

  // Always leave a recoverable trace, whatever happened above.
  console.info(
    `[intake] ${meta.id} ${urgent ? "URGENT " : ""}delivered=[${channels.join(",")}] ` +
      `failed=[${failures.join(" | ")}]\n${summary}`,
  );

  return { delivered: channels.length > 0, channels, failures };
}
