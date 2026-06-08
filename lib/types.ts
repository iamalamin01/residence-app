export type RoomStatus = "vacant" | "occupied" | "maintenance";
export type RoomType = "single" | "double" | "suite";
export type MaintenanceStatus = "pending" | "in_progress" | "completed";
export type MaintenanceCategory = "plumbing" | "electrical" | "cleaning" | "ac" | "furniture" | "internet" | "other";
export type PaymentStatus = "paid" | "pending" | "overdue";
export type UserRole = "admin" | "manager" | "maintenance_staff" | "tenant";

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: RoomType;
  status: RoomStatus;
  rent: number;
  deposit: number;
  amenities: string[];
  tenantId?: string;
}

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  nid: string;
  emergencyContact: string;
  roomId: string;
  joinDate: string;
  rentDueDate: number;
  paymentStatus: PaymentStatus;
  avatar?: string;
}

export interface MaintenanceRequest {
  id: string;
  roomId: string;
  tenantId?: string;
  category: MaintenanceCategory;
  description: string;
  status: MaintenanceStatus;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  roomId: string;
  amount: number;
  month: string;
  status: PaymentStatus;
  paidAt?: string;
  dueDate: string;
}
