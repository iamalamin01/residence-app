"use client";

import { useState } from "react";
import { Room, Tenant } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DoorOpen, User, BanknoteIcon, Phone, Calendar, Wifi } from "lucide-react";

const statusConfig = {
  vacant: {
    card: "bg-emerald-500/15 border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-400",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  occupied: {
    card: "bg-blue-500/15 border-blue-500/30 hover:bg-blue-500/25 hover:border-blue-400",
    text: "text-blue-300",
    dot: "bg-blue-400",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  },
  maintenance: {
    card: "bg-amber-500/15 border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-400",
    text: "text-amber-300",
    dot: "bg-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
};

interface Props {
  rooms: Room[];
  tenants: Tenant[];
}

export default function RoomOverviewGrid({ rooms, tenants }: Props) {
  const [selected, setSelected] = useState<Room | null>(null);

  const tenant = selected ? tenants.find((t) => t.id === selected.tenantId) : null;
  const vacant = rooms.filter((r) => r.status === "vacant").length;
  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const maintenance = rooms.filter((r) => r.status === "maintenance").length;

  return (
    <>
      <div className="grid grid-cols-5 gap-3">
        {rooms.map((room) => {
          const cfg = statusConfig[room.status];
          return (
            <button
              key={room.id}
              onClick={() => setSelected(room)}
              className={`group relative rounded-2xl border-2 p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-black/20 active:scale-95 ${cfg.card}`}
              style={{ minHeight: "72px" }}
            >
              <span className={`text-xs font-bold tracking-wide ${cfg.text}`}>{room.number}</span>
              <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <span className="text-[10px] text-slate-400 capitalize hidden group-hover:block absolute -bottom-5 whitespace-nowrap font-medium">
                {room.type}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-5 mt-6 text-xs text-slate-400">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Vacant <span className="text-slate-500">({vacant})</span></span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Occupied <span className="text-slate-500">({occupied})</span></span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Maintenance <span className="text-slate-500">({maintenance})</span></span>
      </div>

      {/* Room Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-md bg-[#0d1b2a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <DoorOpen className="w-5 h-5 text-teal-400" />
              Room {selected?.number}
            </DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm capitalize">{selected.type} Room · Floor {selected.floor}</span>
                <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusConfig[selected.status].badge}`}>
                  {selected.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">Monthly Rent</p>
                  <p className="text-lg font-bold text-teal-300">৳{selected.rent.toLocaleString()}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">Deposit</p>
                  <p className="text-lg font-bold text-slate-200">৳{selected.deposit.toLocaleString()}</p>
                </div>
              </div>

              {tenant ? (
                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Current Tenant</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs font-bold">
                      {tenant.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <p className="font-semibold text-white">{tenant.name}</p>
                  </div>
                  <p className="flex items-center gap-2 text-xs text-slate-400"><Phone className="w-3 h-3" /> {tenant.phone}</p>
                  <p className="flex items-center gap-2 text-xs text-slate-400"><Calendar className="w-3 h-3" /> Joined {tenant.joinDate}</p>
                  <p className="flex items-center gap-2 text-xs text-slate-400">
                    Rent status:
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      tenant.paymentStatus === "paid" ? "bg-emerald-500/20 text-emerald-300" :
                      tenant.paymentStatus === "pending" ? "bg-yellow-500/20 text-yellow-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>{tenant.paymentStatus}</span>
                  </p>
                </div>
              ) : (
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <p className="text-slate-500 text-sm">No tenant assigned</p>
                </div>
              )}

              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1"><Wifi className="w-3 h-3" /> Amenities</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.amenities.map((a) => (
                    <span key={a} className="text-xs px-2.5 py-1 bg-white/10 rounded-full text-slate-300">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
