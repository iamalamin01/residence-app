import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MarkPaidButton from "@/components/MarkPaidButton";
import { store } from "@/lib/store";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const statusConfig = {
  paid: { variant: "default" as const, icon: CheckCircle2, color: "text-green-600" },
  pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
  overdue: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
};

export default function PaymentsPage() {
  const payments = store.payments.getAll();
  const tenants = store.tenants.getAll();
  const rooms = store.rooms.getAll();

  const collected = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const pending = payments.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const overdue = payments.filter((p) => p.status === "overdue").reduce((s, p) => s + p.amount, 0);
  const total = collected + pending + overdue;

  return (
    <div className="flex flex-col h-full">
      <Header title="Payments" />
      <div className="p-6 space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Total Expected", amount: total, color: "text-slate-800" },
            { label: "Collected", amount: collected, color: "text-green-600" },
            { label: "Pending", amount: pending, color: "text-yellow-600" },
            { label: "Overdue", amount: overdue, color: "text-red-600" },
          ].map((s) => (
            <Card key={s.label} className="border-0 shadow-sm">
              <CardContent className="p-5">
                <p className={`text-2xl font-bold ${s.color}`}>৳{s.amount.toLocaleString()}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">June 2026 — All Payments</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Tenant</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => {
                  const tenant = tenants.find((t) => t.id === payment.tenantId);
                  const room = rooms.find((r) => r.id === payment.roomId);
                  const config = statusConfig[payment.status];
                  const Icon = config.icon;
                  return (
                    <TableRow key={payment.id} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{tenant?.name || "—"}</TableCell>
                      <TableCell>Room {room?.number}</TableCell>
                      <TableCell className="font-semibold">৳{payment.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-slate-600">{payment.dueDate}</TableCell>
                      <TableCell className="text-slate-600">{payment.paidAt || "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Icon className={`w-4 h-4 ${config.color}`} />
                          <Badge variant={config.variant} className="capitalize text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {payment.status !== "paid" && (
                          <MarkPaidButton paymentId={payment.id} />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
