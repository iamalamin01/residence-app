import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoomStatusButton from "@/components/RoomStatusButton";
import { store } from "@/lib/store";
import { DoorOpen, User, BanknoteIcon, Wifi } from "lucide-react";

const statusColor: Record<string, string> = {
  occupied: "bg-blue-100 border-blue-300",
  vacant: "bg-green-100 border-green-300",
  maintenance: "bg-orange-100 border-orange-300",
};

const statusBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  occupied: "default",
  vacant: "secondary",
  maintenance: "destructive",
};

const typeLabel: Record<string, string> = {
  single: "Single",
  double: "Double",
  suite: "Suite",
};

export default function RoomsPage() {
  const rooms = store.rooms.getAll();
  const tenants = store.tenants.getAll();
  const floors = [...new Set(rooms.map((r) => r.floor))].sort();

  return (
    <div className="flex flex-col h-full">
      <Header title="Rooms" />
      <div className="p-6 space-y-8">
        {floors.map((floor) => (
          <div key={floor}>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Floor {floor}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {rooms
                .filter((r) => r.floor === floor)
                .map((room) => {
                  const tenant = room.tenantId ? tenants.find((t) => t.id === room.tenantId) : null;
                  return (
                    <Card
                      key={room.id}
                      className={`border-2 shadow-sm hover:shadow-md transition-shadow ${statusColor[room.status]}`}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <DoorOpen className="w-5 h-5 text-slate-600" />
                            <span className="font-bold text-lg text-slate-800">Room {room.number}</span>
                          </div>
                          <Badge variant={statusBadge[room.status]} className="capitalize text-xs">
                            {room.status}
                          </Badge>
                        </div>

                        <div className="text-xs text-slate-500 space-y-1">
                          <p className="font-medium text-slate-700">{typeLabel[room.type]} Room</p>
                          {tenant && (
                            <p className="flex items-center gap-1">
                              <User className="w-3 h-3" /> {tenant.name}
                            </p>
                          )}
                          <p className="flex items-center gap-1">
                            <BanknoteIcon className="w-3 h-3" /> ৳{room.rent.toLocaleString()} / month
                          </p>
                          <p className="flex items-center gap-1 flex-wrap">
                            <Wifi className="w-3 h-3" />
                            {room.amenities.join(", ")}
                          </p>
                        </div>

                        <div className="pt-1 border-t border-black/5">
                          <RoomStatusButton roomId={room.id} current={room.status} />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        ))}

        <div className="flex gap-6 text-sm text-slate-600 pt-2">
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded border-2 bg-green-100 border-green-300" /> Vacant</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded border-2 bg-blue-100 border-blue-300" /> Occupied</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 rounded border-2 bg-orange-100 border-orange-300" /> Maintenance</span>
        </div>
      </div>
    </div>
  );
}
