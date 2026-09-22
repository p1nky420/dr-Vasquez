import { NextResponse, type NextRequest } from "next/server";

/**
 * Only the canonical domain may be indexed.
 *
 * `robots.txt` and `<link rel="canonical">` are hints Google can overrule —
 * which is why the *.vercel.app deployment ended up ranking. `X-Robots-Tag`
 * is a directive, not a hint, so it is applied to every response served from
 * any host other than the canonical one (previews included).
 */
const CANONICAL_HOSTS = new Set([
  "faustovasquezabogados.com",
  "www.faustovasquezabogados.com",
]);

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host")?.toLowerCase().split(":")[0] ?? "";

  const isLocal = host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");

  if (!isLocal && !CANONICAL_HOSTS.has(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return response;
}

export const config = {
  // Everything except Next internals and static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
