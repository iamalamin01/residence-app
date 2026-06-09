import { store } from "@/lib/store";

export async function GET() {
  const rooms = store.rooms.getAll();
  const tenants = store.tenants.getAll();
  const maintenance = store.maintenance.getAll();
  const payments = store.payments.getAll();

  return Response.json({
    rooms: {
      total: rooms.length,
      occupied: rooms.filter((r) => r.status === "occupied").length,
      vacant: rooms.filter((r) => r.status === "vacant").length,
      maintenance: rooms.filter((r) => r.status === "maintenance").length,
    },
    tenants: { total: tenants.length },
    maintenance: {
      total: maintenance.length,
      pending: maintenance.filter((m) => m.status === "pending").length,
      in_progress: maintenance.filter((m) => m.status === "in_progress").length,
      completed: maintenance.filter((m) => m.status === "completed").length,
    },
    payments: {
      collected: payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0),
      pending: payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0),
      overdue: payments.filter((p) => p.status === "overdue").reduce((s, p) => s + p.amount, 0),
    },
  });
}
