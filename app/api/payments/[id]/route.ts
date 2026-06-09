import type { NextRequest } from "next/server";
import { store } from "@/lib/store";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/payments/[id]">) {
  const { id } = await ctx.params;
  const payment = store.payments.getById(id);
  if (!payment) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(payment);
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/payments/[id]">) {
  const { id } = await ctx.params;
  const body = await request.json();
  const updated = store.payments.update(id, body);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  // Sync tenant payment status if payment is now paid
  if (body.status === "paid" && updated.tenantId) {
    store.tenants.update(updated.tenantId, { paymentStatus: "paid" });
  }
  return Response.json(updated);
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/payments/[id]">) {
  const { id } = await ctx.params;
  const ok = store.payments.remove(id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return new Response(null, { status: 204 });
}
