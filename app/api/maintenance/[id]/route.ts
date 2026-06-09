import type { NextRequest } from "next/server";
import { store } from "@/lib/store";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/maintenance/[id]">) {
  const { id } = await ctx.params;
  const req = store.maintenance.getById(id);
  if (!req) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(req);
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/maintenance/[id]">) {
  const { id } = await ctx.params;
  const body = await request.json();
  const updated = store.maintenance.update(id, {
    ...body,
    updatedAt: new Date().toISOString().split("T")[0],
  });
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/maintenance/[id]">) {
  const { id } = await ctx.params;
  const ok = store.maintenance.remove(id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
