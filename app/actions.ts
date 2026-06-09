"use server";

import { revalidatePath } from "next/cache";
import { store } from "@/lib/store";
import type { MaintenanceCategory, RoomStatus, MaintenanceStatus } from "@/lib/types";

// --- Rooms ---
export async function updateRoomStatus(id: string, status: RoomStatus) {
  store.rooms.update(id, { status });
  revalidatePath("/rooms");
  revalidatePath("/");
}

// --- Tenants ---
export async function addTenant(formData: FormData) {
  const roomId = formData.get("roomId") as string;
  const id = `t${Date.now()}`;
  store.tenants.create({
    id,
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    nid: formData.get("nid") as string,
    emergencyContact: formData.get("emergencyContact") as string,
    roomId,
    joinDate: new Date().toISOString().split("T")[0],
    rentDueDate: parseInt(formData.get("rentDueDate") as string) || 5,
    paymentStatus: "pending",
  });
  store.rooms.update(roomId, { status: "occupied", tenantId: id });
  revalidatePath("/tenants");
  revalidatePath("/rooms");
  revalidatePath("/");
}

export async function removeTenant(tenantId: string, roomId: string) {
  store.tenants.remove(tenantId);
  store.rooms.update(roomId, { status: "vacant", tenantId: undefined });
  revalidatePath("/tenants");
  revalidatePath("/rooms");
  revalidatePath("/");
}

// --- Maintenance ---
export async function addMaintenanceRequest(formData: FormData) {
  const today = new Date().toISOString().split("T")[0];
  store.maintenance.create({
    id: `m${Date.now()}`,
    roomId: formData.get("roomId") as string,
    tenantId: (formData.get("tenantId") as string) || undefined,
    category: formData.get("category") as MaintenanceCategory,
    description: formData.get("description") as string,
    status: "pending",
    priority: (formData.get("priority") as "low" | "medium" | "high") ?? "medium",
    createdAt: today,
    updatedAt: today,
    assignedTo: (formData.get("assignedTo") as string) || undefined,
  });
  revalidatePath("/maintenance");
  revalidatePath("/");
}

export async function updateMaintenanceStatus(id: string, status: MaintenanceStatus) {
  store.maintenance.update(id, { status, updatedAt: new Date().toISOString().split("T")[0] });
  revalidatePath("/maintenance");
  revalidatePath("/");
}

export async function deleteMaintenanceRequest(id: string) {
  store.maintenance.remove(id);
  revalidatePath("/maintenance");
  revalidatePath("/");
}

// --- Payments ---
export async function markPaymentPaid(id: string) {
  const today = new Date().toISOString().split("T")[0];
  const payment = store.payments.update(id, { status: "paid", paidAt: today });
  if (payment) {
    store.tenants.update(payment.tenantId, { paymentStatus: "paid" });
  }
  revalidatePath("/payments");
  revalidatePath("/tenants");
  revalidatePath("/");
}
