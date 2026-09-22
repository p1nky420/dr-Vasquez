import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { SITE_URL, CANONICAL_HOSTS } from "@/lib/seo";

/**
 * Answer-engine crawlers are listed explicitly so their access is a deliberate
 * decision rather than an accident of the wildcard rule — this site wants to be
 * cited by ChatGPT, Perplexity, Claude and Google's AI surfaces.
 */
const ANSWER_ENGINE_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckDuckBot",
  "Amazonbot",
  "meta-externalagent",
  "cohere-ai",
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.toLowerCase().split(":")[0] ?? "";
  const isCanonical = CANONICAL_HOSTS.includes(host) || host === "localhost";

  // Preview and *.vercel.app hosts must not invite crawlers at all.
  if (!isCanonical) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  const disallow = ["/api/", "/gracias"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...ANSWER_ENGINE_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
