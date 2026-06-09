import type { Room, Tenant, MaintenanceRequest, Payment } from "./types";
import {
  rooms as seedRooms,
  tenants as seedTenants,
  maintenanceRequests as seedMaintenance,
  payments as seedPayments,
} from "./data";

// Global singleton — survives Next.js hot-module reloads in dev
const g = global as typeof global & {
  _residenceDb?: {
    rooms: Room[];
    tenants: Tenant[];
    maintenance: MaintenanceRequest[];
    payments: Payment[];
  };
};

if (!g._residenceDb) {
  g._residenceDb = {
    rooms: JSON.parse(JSON.stringify(seedRooms)),
    tenants: JSON.parse(JSON.stringify(seedTenants)),
    maintenance: JSON.parse(JSON.stringify(seedMaintenance)),
    payments: JSON.parse(JSON.stringify(seedPayments)),
  };
}

const db = g._residenceDb;

export const store = {
  rooms: {
    getAll: (): Room[] => db.rooms,
    getById: (id: string) => db.rooms.find((r) => r.id === id),
    create: (room: Room): Room => { db.rooms.push(room); return room; },
    update: (id: string, data: Partial<Room>): Room | null => {
      const i = db.rooms.findIndex((r) => r.id === id);
      if (i === -1) return null;
      db.rooms[i] = { ...db.rooms[i], ...data };
      return db.rooms[i];
    },
    remove: (id: string): boolean => {
      const i = db.rooms.findIndex((r) => r.id === id);
      if (i === -1) return false;
      db.rooms.splice(i, 1);
      return true;
    },
  },
  tenants: {
    getAll: (): Tenant[] => db.tenants,
    getById: (id: string) => db.tenants.find((t) => t.id === id),
    create: (tenant: Tenant): Tenant => { db.tenants.push(tenant); return tenant; },
    update: (id: string, data: Partial<Tenant>): Tenant | null => {
      const i = db.tenants.findIndex((t) => t.id === id);
      if (i === -1) return null;
      db.tenants[i] = { ...db.tenants[i], ...data };
      return db.tenants[i];
    },
    remove: (id: string): boolean => {
      const i = db.tenants.findIndex((t) => t.id === id);
      if (i === -1) return false;
      db.tenants.splice(i, 1);
      return true;
    },
  },
  maintenance: {
    getAll: (): MaintenanceRequest[] => db.maintenance,
    getById: (id: string) => db.maintenance.find((m) => m.id === id),
    create: (req: MaintenanceRequest): MaintenanceRequest => { db.maintenance.push(req); return req; },
    update: (id: string, data: Partial<MaintenanceRequest>): MaintenanceRequest | null => {
      const i = db.maintenance.findIndex((m) => m.id === id);
      if (i === -1) return null;
      db.maintenance[i] = { ...db.maintenance[i], ...data };
      return db.maintenance[i];
    },
    remove: (id: string): boolean => {
      const i = db.maintenance.findIndex((m) => m.id === id);
      if (i === -1) return false;
      db.maintenance.splice(i, 1);
      return true;
    },
  },
  payments: {
    getAll: (): Payment[] => db.payments,
    getById: (id: string) => db.payments.find((p) => p.id === id),
    create: (payment: Payment): Payment => { db.payments.push(payment); return payment; },
    update: (id: string, data: Partial<Payment>): Payment | null => {
      const i = db.payments.findIndex((p) => p.id === id);
      if (i === -1) return null;
      db.payments[i] = { ...db.payments[i], ...data };
      return db.payments[i];
    },
    remove: (id: string): boolean => {
      const i = db.payments.findIndex((p) => p.id === id);
      if (i === -1) return false;
      db.payments.splice(i, 1);
      return true;
    },
  },
};
