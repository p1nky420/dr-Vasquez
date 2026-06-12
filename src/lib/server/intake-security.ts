import "server-only";

import { createCipheriv, createHash, randomBytes } from "node:crypto";
import type { IntakeSubmission } from "@/lib/intake";

function encryptionKey() {
  const secret = process.env.INTAKE_ENCRYPTION_KEY;
  if (!secret) return null;
  return createHash("sha256").update(secret).digest();
}

export function encryptIntake(data: IntakeSubmission) {
  const key = encryptionKey();
  if (!key) {
    throw new Error("INTAKE_ENCRYPTION_KEY is not configured.");
  }

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
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body, cache: "no-store" },
  );
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function persistEncryptedIntake(record: Record<string, unknown>) {
  const storageUrl = process.env.INTAKE_STORAGE_URL;
  const storageToken = process.env.INTAKE_STORAGE_TOKEN;
  if (!storageUrl || !storageToken) {
    throw new Error("Secure intake storage is not configured.");
  }

  const response = await fetch(storageUrl, {
    method: "POST",
    headers: {
      authorization: `Bearer ${storageToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(record),
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Secure intake storage rejected the request.");
}

export async function notifyIntake(record: {
  id: string;
  urgency: string;
  createdAt: string;
}) {
  const webhookUrl = process.env.INTAKE_NOTIFICATION_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      text: "Nueva solicitud de admisión recibida.",
      ...record,
    }),
    cache: "no-store",
  });
}
