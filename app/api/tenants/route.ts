import { store } from "@/lib/store";
import type { Tenant } from "@/lib/types";

export async function GET() {
  return Response.json(store.tenants.getAll());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<Tenant>;
  const tenant: Tenant = {
    id: `t${Date.now()}`,
    name: body.name!,
    phone: body.phone!,
    email: body.email!,
    nid: body.nid!,
    emergencyContact: body.emergencyContact!,
    roomId: body.roomId!,
    joinDate: body.joinDate ?? new Date().toISOString().split("T")[0],
    rentDueDate: body.rentDueDate ?? 5,
    paymentStatus: "pending",
  };
  store.tenants.create(tenant);
  // Mark room as occupied
  store.rooms.update(tenant.roomId, { status: "occupied", tenantId: tenant.id });
  return Response.json(tenant, { status: 201 });
}
