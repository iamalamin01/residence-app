import { store } from "@/lib/store";
import type { Payment } from "@/lib/types";

export async function GET() {
  return Response.json(store.payments.getAll());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Payment>;
  const payment: Payment = {
    id: `p${Date.now()}`,
    tenantId: body.tenantId!,
    roomId: body.roomId!,
    amount: body.amount!,
    month: body.month!,
    status: body.status ?? "pending",
    dueDate: body.dueDate!,
    paidAt: body.paidAt,
  };
  return Response.json(store.payments.create(payment), { status: 201 });
}
