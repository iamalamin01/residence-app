import Header from "@/components/Header";
import RoomOverviewGrid from "@/components/RoomOverviewGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { store } from "@/lib/store";
import { DoorOpen, Users, Wrench, CreditCard, TrendingUp, AlertCircle } from "lucide-react";

const statCards = (
  occupied: number, vacant: number, maintenance: number, tenantCount: number,
  pendingMaint: number, maintTotal: number, totalRentCollected: number, overdueCount: number
) => [
  {
    title: "Total Rooms",
    value: occupied + vacant + maintenance,
    sub: `${occupied} occupied · ${vacant} vacant · ${maintenance} maintenance`,
    icon: DoorOpen,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    accent: "from-blue-500/10",
    valueColor: "text-slate-800",
  },
  {
    title: "Tenants",
    value: tenantCount,
    sub: `${vacant} room${vacant !== 1 ? "s" : ""} available to rent`,
    icon: Users,
    iconBg: "bg-teal-500/15",
    iconColor: "text-teal-500",
    accent: "from-teal-500/10",
    valueColor: "text-slate-800",
  },
  {
    title: "Maintenance",
    value: maintTotal,
    sub: `${pendingMaint} pending requests`,
    icon: Wrench,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-500",
    accent: "from-amber-500/10",
    valueColor: "text-slate-800",
  },
  {
    title: "Rent Collected",
    value: `৳${(totalRentCollected / 1000).toFixed(0)}k`,
    sub: `${overdueCount} overdue · June 2026`,
    icon: CreditCard,
    iconBg: "bg-purple-500/15",
    iconColor: "text-purple-500",
    accent: "from-purple-500/10",
    valueColor: "text-slate-800",
  },
];

export default function DashboardPage() {
  const rooms = store.rooms.getAll();
  const tenants = store.tenants.getAll();
  const maintenanceRequests = store.maintenance.getAll();
  const payments = store.payments.getAll();

  const occupied = rooms.filter((r) => r.status === "occupied").length;
  const vacant = rooms.filter((r) => r.status === "vacant").length;
  const maintenance = rooms.filter((r) => r.status === "maintenance").length;
  const totalRentCollected = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const pendingMaint = maintenanceRequests.filter((m) => m.status === "pending").length;
  const overdueCount = payments.filter((p) => p.status === "overdue").length;

  const stats = statCards(occupied, vacant, maintenance, tenants.length, pendingMaint, maintenanceRequests.length, totalRentCollected, overdueCount);
  const recentRequests = maintenanceRequests.filter((m) => m.status !== "completed").slice(0, 5);
  const dueTenants = payments.filter((p) => p.status !== "paid").slice(0, 5);

  return (
    <div className="flex flex-col min-h-full bg-slate-50">
      <Header title="Dashboard" />

      <div className="p-6 space-y-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.title}
              className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} to-transparent opacity-60`} />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-4xl font-black tracking-tight text-slate-800 leading-none">{s.value}</p>
                  <p className="text-sm font-semibold text-slate-600 mt-2">{s.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                </div>
                <div className={`${s.iconBg} p-3 rounded-2xl`}>
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Room Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-800">Room Overview</h2>
              <p className="text-xs text-slate-400 mt-0.5">Click any room to view details</p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full font-medium">
              {rooms.length} rooms total
            </span>
          </div>
          <RoomOverviewGrid rooms={rooms} tenants={tenants} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Pending Maintenance */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-800">Pending Maintenance</h2>
              <div className="bg-amber-100 p-2 rounded-xl">
                <Wrench className="w-4 h-4 text-amber-500" />
              </div>
            </div>
            <div className="space-y-0">
              {recentRequests.length === 0 ? (
                <p className="text-slate-400 text-sm py-4 text-center">No pending requests</p>
              ) : (
                recentRequests.map((req, i) => {
                  const room = rooms.find((r) => r.id === req.roomId);
                  return (
                    <div key={req.id} className={`flex items-center justify-between py-3 ${i < recentRequests.length - 1 ? "border-b border-slate-50" : ""}`}>
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="text-sm font-semibold text-slate-700 capitalize">
                          Room {room?.number} · {req.category}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{req.description}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                        req.priority === "high" ? "bg-red-100 text-red-600" :
                        req.priority === "medium" ? "bg-yellow-100 text-yellow-600" :
                        "bg-slate-100 text-slate-500"
                      }`}>
                        {req.priority}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Rent Due */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-800">Rent Due / Overdue</h2>
              <div className="bg-red-100 p-2 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400" />
              </div>
            </div>
            <div className="space-y-0">
              {dueTenants.length === 0 ? (
                <p className="text-slate-400 text-sm py-4 text-center">All rents collected</p>
              ) : (
                dueTenants.map((p, i) => {
                  const tenant = tenants.find((t) => t.id === p.tenantId);
                  const room = rooms.find((r) => r.id === p.roomId);
                  return (
                    <div key={p.id} className={`flex items-center justify-between py-3 ${i < dueTenants.length - 1 ? "border-b border-slate-50" : ""}`}>
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="text-sm font-semibold text-slate-700">{tenant?.name}</p>
                        <p className="text-xs text-slate-400">Room {room?.number} · Due {p.dueDate}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-slate-800">৳{p.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          p.status === "overdue" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                        }`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Monthly Rent Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-800">June 2026 — Rent Summary</h2>
              <p className="text-xs text-slate-400 mt-0.5">Monthly collection overview</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-xl">
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Collected", amount: payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0), color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
              { label: "Pending", amount: payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0), color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
              { label: "Overdue", amount: payments.filter(p => p.status === "overdue").reduce((s, p) => s + p.amount, 0), color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
            ].map((s) => (
              <div key={s.label} className={`${s.bg} border ${s.border} rounded-2xl p-5 text-center`}>
                <p className={`text-3xl font-black ${s.color} tracking-tight`}>৳{(s.amount / 1000).toFixed(0)}k</p>
                <p className="text-xs text-slate-500 mt-1.5 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
