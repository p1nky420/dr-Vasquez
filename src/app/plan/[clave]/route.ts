import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { isValidPlanKey, PLAN_PAGE_PATH, PRIVATE_HEADERS } from "@/lib/server/plan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ clave: string }> }) {
  const { clave } = await params;
  if (!isValidPlanKey(clave)) {
    return new NextResponse("Not found", { status: 404, headers: PRIVATE_HEADERS });
  }

  const page = await get(PLAN_PAGE_PATH, { access: "private" });
  if (!page?.stream) {
    return new NextResponse("El plan todavía no está publicado.", { status: 503, headers: PRIVATE_HEADERS });
  }

  return new NextResponse(page.stream, {
    headers: { ...PRIVATE_HEADERS, "Content-Type": "text/html; charset=utf-8" },
  });
}
