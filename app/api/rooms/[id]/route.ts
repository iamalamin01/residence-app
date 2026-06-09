import type { NextRequest } from "next/server";
import { store } from "@/lib/store";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/rooms/[id]">) {
  const { id } = await ctx.params;
  const room = store.rooms.getById(id);
  if (!room) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(room);
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/rooms/[id]">) {
  const { id } = await ctx.params;
  const body = await request.json();
  const updated = store.rooms.update(id, body);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/rooms/[id]">) {
  const { id } = await ctx.params;
  const ok = store.rooms.remove(id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
