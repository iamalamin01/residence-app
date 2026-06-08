import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { tenants, rooms } from "@/lib/data";
import { Phone, Mail, DoorOpen, Calendar } from "lucide-react";

const paymentBadge: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  paid: "default",
  pending: "secondary",
  overdue: "destructive",
};

export default function TenantsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Tenants" />
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tenants.map((tenant) => {
            const room = rooms.find((r) => r.id === tenant.roomId);
            return (
              <Card key={tenant.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-slate-700 text-white font-semibold text-base">
                        {tenant.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 truncate">{tenant.name}</p>
                      <p className="text-xs text-slate-500">NID: {tenant.nid}</p>
                    </div>
                    <Badge variant={paymentBadge[tenant.paymentStatus]} className="capitalize text-xs shrink-0">
                      {tenant.paymentStatus}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {tenant.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" /> <span className="truncate">{tenant.email}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <DoorOpen className="w-3.5 h-3.5 text-slate-400" /> Room {room?.number} ({room?.type})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined {tenant.joinDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <span className="text-xs text-slate-500">Rent due: {tenant.rentDueDate}th of month</span>
                    <span className="text-sm font-semibold text-slate-800">৳{room?.rent.toLocaleString()}/mo</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
