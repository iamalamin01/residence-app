import type { NextRequest } from "next/server";
import { store } from "@/lib/store";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/tenants/[id]">) {
  const { id } = await ctx.params;
  const tenant = store.tenants.getById(id);
  if (!tenant) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(tenant);
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/tenants/[id]">) {
  const { id } = await ctx.params;
  const body = await request.json();
  const updated = store.tenants.update(id, body);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/tenants/[id]">) {
  const { id } = await ctx.params;
  const tenant = store.tenants.getById(id);
  if (!tenant) return Response.json({ error: "Not found" }, { status: 404 });
  // Free the room
  store.rooms.update(tenant.roomId, { status: "vacant", tenantId: undefined });
  store.tenants.remove(id);
  return new Response(null, { status: 204 });
}
