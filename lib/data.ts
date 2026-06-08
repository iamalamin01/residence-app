import { Room, Tenant, MaintenanceRequest, Payment } from "./types";

export const rooms: Room[] = [
  { id: "r1", number: "101", floor: 1, type: "single", status: "occupied", rent: 8000, deposit: 16000, amenities: ["AC", "WiFi", "Attached Bath"], tenantId: "t1" },
  { id: "r2", number: "102", floor: 1, type: "double", status: "occupied", rent: 12000, deposit: 24000, amenities: ["AC", "WiFi", "Attached Bath", "Balcony"], tenantId: "t2" },
  { id: "r3", number: "103", floor: 1, type: "single", status: "vacant", rent: 8000, deposit: 16000, amenities: ["WiFi", "Attached Bath"] },
  { id: "r4", number: "104", floor: 1, type: "single", status: "maintenance", rent: 8000, deposit: 16000, amenities: ["AC", "WiFi"] },
  { id: "r5", number: "201", floor: 2, type: "suite", status: "occupied", rent: 18000, deposit: 36000, amenities: ["AC", "WiFi", "Attached Bath", "Balcony", "TV"], tenantId: "t3" },
  { id: "r6", number: "202", floor: 2, type: "double", status: "occupied", rent: 12000, deposit: 24000, amenities: ["AC", "WiFi", "Attached Bath"], tenantId: "t4" },
  { id: "r7", number: "203", floor: 2, type: "single", status: "vacant", rent: 8500, deposit: 17000, amenities: ["AC", "WiFi"] },
  { id: "r8", number: "204", floor: 2, type: "single", status: "occupied", rent: 8500, deposit: 17000, amenities: ["WiFi", "Attached Bath"], tenantId: "t5" },
  { id: "r9", number: "301", floor: 3, type: "suite", status: "occupied", rent: 20000, deposit: 40000, amenities: ["AC", "WiFi", "Attached Bath", "Balcony", "TV", "Kitchen"], tenantId: "t6" },
  { id: "r10", number: "302", floor: 3, type: "double", status: "vacant", rent: 13000, deposit: 26000, amenities: ["AC", "WiFi", "Attached Bath"] },
  { id: "r11", number: "303", floor: 3, type: "single", status: "occupied", rent: 9000, deposit: 18000, amenities: ["AC", "WiFi"], tenantId: "t7" },
  { id: "r12", number: "304", floor: 3, type: "single", status: "maintenance", rent: 9000, deposit: 18000, amenities: ["WiFi"] },
  { id: "r13", number: "401", floor: 4, type: "suite", status: "occupied", rent: 22000, deposit: 44000, amenities: ["AC", "WiFi", "Attached Bath", "Balcony", "TV", "Kitchen"], tenantId: "t8" },
  { id: "r14", number: "402", floor: 4, type: "double", status: "occupied", rent: 14000, deposit: 28000, amenities: ["AC", "WiFi", "Attached Bath"], tenantId: "t9" },
  { id: "r15", number: "403", floor: 4, type: "single", status: "vacant", rent: 9500, deposit: 19000, amenities: ["AC", "WiFi", "Attached Bath"] },
];

export const tenants: Tenant[] = [
  { id: "t1", name: "Rahim Uddin", phone: "01711-234567", email: "rahim@gmail.com", nid: "1234567890", emergencyContact: "01711-999888", roomId: "r1", joinDate: "2025-01-15", rentDueDate: 5, paymentStatus: "paid" },
  { id: "t2", name: "Karim Hossain", phone: "01812-345678", email: "karim@gmail.com", nid: "2345678901", emergencyContact: "01812-888777", roomId: "r2", joinDate: "2024-11-01", rentDueDate: 5, paymentStatus: "pending" },
  { id: "t3", name: "Nusrat Jahan", phone: "01913-456789", email: "nusrat@gmail.com", nid: "3456789012", emergencyContact: "01913-777666", roomId: "r5", joinDate: "2025-03-20", rentDueDate: 10, paymentStatus: "paid" },
  { id: "t4", name: "Sabbir Ahmed", phone: "01614-567890", email: "sabbir@gmail.com", nid: "4567890123", emergencyContact: "01614-666555", roomId: "r6", joinDate: "2024-09-01", rentDueDate: 5, paymentStatus: "overdue" },
  { id: "t5", name: "Roksana Begum", phone: "01515-678901", email: "roksana@gmail.com", nid: "5678901234", emergencyContact: "01515-555444", roomId: "r8", joinDate: "2025-02-10", rentDueDate: 10, paymentStatus: "paid" },
  { id: "t6", name: "Tanvir Islam", phone: "01716-789012", email: "tanvir@gmail.com", nid: "6789012345", emergencyContact: "01716-444333", roomId: "r9", joinDate: "2024-06-15", rentDueDate: 5, paymentStatus: "pending" },
  { id: "t7", name: "Mitu Akter", phone: "01817-890123", email: "mitu@gmail.com", nid: "7890123456", emergencyContact: "01817-333222", roomId: "r11", joinDate: "2025-04-01", rentDueDate: 15, paymentStatus: "paid" },
  { id: "t8", name: "Jahangir Alam", phone: "01918-901234", email: "jahangir@gmail.com", nid: "8901234567", emergencyContact: "01918-222111", roomId: "r13", joinDate: "2024-08-20", rentDueDate: 5, paymentStatus: "paid" },
  { id: "t9", name: "Shirin Sultana", phone: "01619-012345", email: "shirin@gmail.com", nid: "9012345678", emergencyContact: "01619-111000", roomId: "r14", joinDate: "2025-01-05", rentDueDate: 10, paymentStatus: "overdue" },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: "m1", roomId: "r4", tenantId: "t1", category: "electrical", description: "Fan is not working properly, making noise", status: "in_progress", priority: "high", createdAt: "2026-06-01", updatedAt: "2026-06-02", assignedTo: "Electrician Rafiq" },
  { id: "m2", roomId: "r12", category: "plumbing", description: "Water tap leaking in bathroom", status: "pending", priority: "medium", createdAt: "2026-06-05", updatedAt: "2026-06-05" },
  { id: "m3", roomId: "r2", tenantId: "t2", category: "ac", description: "AC not cooling, needs gas refill", status: "pending", priority: "high", createdAt: "2026-06-07", updatedAt: "2026-06-07" },
  { id: "m4", roomId: "r9", tenantId: "t6", category: "internet", description: "WiFi router not working in room", status: "completed", priority: "medium", createdAt: "2026-05-28", updatedAt: "2026-05-30", assignedTo: "IT Support Shakil" },
  { id: "m5", roomId: "r6", tenantId: "t4", category: "cleaning", description: "Deep cleaning required before new tenant", status: "pending", priority: "low", createdAt: "2026-06-08", updatedAt: "2026-06-08" },
  { id: "m6", roomId: "r1", tenantId: "t1", category: "furniture", description: "Chair leg broken, needs repair", status: "completed", priority: "low", createdAt: "2026-05-20", updatedAt: "2026-05-22", assignedTo: "Carpenter Jamal" },
];

export const payments: Payment[] = [
  { id: "p1", tenantId: "t1", roomId: "r1", amount: 8000, month: "June 2026", status: "paid", paidAt: "2026-06-03", dueDate: "2026-06-05" },
  { id: "p2", tenantId: "t2", roomId: "r2", amount: 12000, month: "June 2026", status: "pending", dueDate: "2026-06-05" },
  { id: "p3", tenantId: "t3", roomId: "r5", amount: 18000, month: "June 2026", status: "paid", paidAt: "2026-06-08", dueDate: "2026-06-10" },
  { id: "p4", tenantId: "t4", roomId: "r6", amount: 12000, month: "June 2026", status: "overdue", dueDate: "2026-06-05" },
  { id: "p5", tenantId: "t5", roomId: "r8", amount: 8500, month: "June 2026", status: "paid", paidAt: "2026-06-09", dueDate: "2026-06-10" },
  { id: "p6", tenantId: "t6", roomId: "r9", amount: 20000, month: "June 2026", status: "pending", dueDate: "2026-06-05" },
  { id: "p7", tenantId: "t7", roomId: "r11", amount: 9000, month: "June 2026", status: "paid", paidAt: "2026-06-14", dueDate: "2026-06-15" },
  { id: "p8", tenantId: "t8", roomId: "r13", amount: 22000, month: "June 2026", status: "paid", paidAt: "2026-06-04", dueDate: "2026-06-05" },
  { id: "p9", tenantId: "t9", roomId: "r14", amount: 14000, month: "June 2026", status: "overdue", dueDate: "2026-06-10" },
];
