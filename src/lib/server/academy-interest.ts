import "server-only";

export function academyInterestSiteKey() {
  return process.env.ACADEMIA_INTEREST_BLOB_TOKEN && process.env.TURNSTILE_SECRET_KEY
    ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
    : undefined;
}
