import { store } from "@/lib/store";
import type { MaintenanceRequest } from "@/lib/types";

export async function GET() {
  return Response.json(store.maintenance.getAll());
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<MaintenanceRequest>;
  const today = new Date().toISOString().split("T")[0];
  const req: MaintenanceRequest = {
    id: `m${Date.now()}`,
    roomId: body.roomId!,
    tenantId: body.tenantId,
    category: body.category!,
    description: body.description!,
    status: "pending",
    priority: body.priority ?? "medium",
    createdAt: today,
    updatedAt: today,
    assignedTo: body.assignedTo,
  };
  return Response.json(store.maintenance.create(req), { status: 201 });
}
