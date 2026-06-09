"use client";

import { useRef, useState, useTransition } from "react";
import { addTenant } from "@/app/actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import type { Room } from "@/lib/types";

export default function AddTenantDialog({ vacantRooms }: { vacantRooms: Room[] }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRoom) return;
    const fd = new FormData(e.currentTarget);
    fd.set("roomId", selectedRoom);
    startTransition(async () => {
      await addTenant(fd);
      setOpen(false);
      formRef.current?.reset();
      setSelectedRoom("");
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" className="gap-2" />}>
        <UserPlus className="w-4 h-4" />
        Add Tenant
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Tenant</DialogTitle>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" required placeholder="e.g. Rahim Uddin" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone *</Label>
              <Input id="phone" name="phone" required placeholder="01711-123456" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required placeholder="name@gmail.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nid">NID *</Label>
              <Input id="nid" name="nid" required placeholder="NID number" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="emergencyContact">Emergency Contact *</Label>
              <Input id="emergencyContact" name="emergencyContact" required placeholder="01711-000000" />
            </div>
            <div className="space-y-1">
              <Label>Room *</Label>
              <Select value={selectedRoom || null} onValueChange={(v) => { if (v) setSelectedRoom(v); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  {vacantRooms.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      Room {r.number} — ৳{r.rent.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="rentDueDate">Rent Due Day</Label>
              <Input id="rentDueDate" name="rentDueDate" type="number" min={1} max={28} defaultValue={5} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={pending || !selectedRoom}>
              {pending ? "Adding…" : "Add Tenant"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
