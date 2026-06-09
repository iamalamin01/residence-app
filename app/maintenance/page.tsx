import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaintenanceStatusSelect from "@/components/MaintenanceStatusSelect";
import AddMaintenanceDialog from "@/components/AddMaintenanceDialog";
import { store } from "@/lib/store";
import type { MaintenanceStatus } from "@/lib/types";
import { Wrench, User, Calendar, Tag } from "lucide-react";

const statusColor: Record<MaintenanceStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  in_progress: "bg-blue-100 text-blue-800 border-blue-300",
  completed: "bg-green-100 text-green-800 border-green-300",
};

const priorityVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
};

const categoryIcons: Record<string, string> = {
  plumbing: "🔧",
  electrical: "⚡",
  cleaning: "🧹",
  ac: "❄️",
  furniture: "🪑",
  internet: "📶",
  other: "🔩",
};

export default function MaintenancePage() {
  const maintenanceRequests = store.maintenance.getAll();
  const rooms = store.rooms.getAll();
  const tenants = store.tenants.getAll();

  const pending = maintenanceRequests.filter((m) => m.status === "pending");
  const inProgress = maintenanceRequests.filter((m) => m.status === "in_progress");
  const completed = maintenanceRequests.filter((m) => m.status === "completed");

  function RequestCard({ req }: { req: (typeof maintenanceRequests)[0] }) {
    const room = rooms.find((r) => r.id === req.roomId);
    const tenant = req.tenantId ? tenants.find((t) => t.id === req.tenantId) : null;

    return (
      <Card className="border shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{categoryIcons[req.category] || "🔩"}</span>
              <div>
                <p className="font-semibold text-slate-800 capitalize">{req.category}</p>
                <p className="text-xs text-slate-500">Room {room?.number}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={priorityVariant[req.priority]} className="capitalize text-xs">
                {req.priority}
              </Badge>
              <span className={`text-xs px-2 py-0.5 rounded-full border capitalize font-medium ${statusColor[req.status]}`}>
                {req.status.replace("_", " ")}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600">{req.description}</p>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-1 border-t border-slate-100">
            {tenant && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" /> {tenant.name}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {req.createdAt}
            </span>
            {req.assignedTo && (
              <span className="flex items-center gap-1 col-span-2">
                <Tag className="w-3 h-3" /> Assigned: {req.assignedTo}
              </span>
            )}
          </div>

          <div className="pt-1 border-t border-slate-100">
            <MaintenanceStatusSelect id={req.id} current={req.status} />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <Header title="Maintenance" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="grid grid-cols-3 gap-4 flex-1 mr-4">
            {[
              { label: "Pending", count: pending.length, color: "text-yellow-600" },
              { label: "In Progress", count: inProgress.length, color: "text-blue-600" },
              { label: "Completed", count: completed.length, color: "text-green-600" },
            ].map((s) => (
              <Card key={s.label} className="border-0 shadow-sm text-center">
                <CardContent className="py-4">
                  <p className={`text-3xl font-bold ${s.color}`}>{s.count}</p>
                  <p className="text-sm text-slate-500">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <AddMaintenanceDialog rooms={rooms} />
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="bg-slate-100">
            <TabsTrigger value="pending">Pending ({pending.length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({inProgress.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
            <TabsTrigger value="all">All ({maintenanceRequests.length})</TabsTrigger>
          </TabsList>
          {[
            { value: "pending", list: pending },
            { value: "in_progress", list: inProgress },
            { value: "completed", list: completed },
            { value: "all", list: maintenanceRequests },
          ].map(({ value, list }) => (
            <TabsContent key={value} value={value} className="mt-4">
              {list.length === 0 ? (
                <Card className="border-0 shadow-sm">
                  <CardContent className="py-12 text-center">
                    <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500">No requests found</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {list.map((req) => <RequestCard key={req.id} req={req} />)}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
