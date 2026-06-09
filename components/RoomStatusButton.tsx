"use client";

import { useTransition } from "react";
import { updateRoomStatus } from "@/app/actions";
import type { RoomStatus } from "@/lib/types";

const options: { value: RoomStatus; label: string }[] = [
  { value: "vacant", label: "Vacant" },
  { value: "occupied", label: "Occupied" },
  { value: "maintenance", label: "Maintenance" },
];

export default function RoomStatusButton({ roomId, current }: { roomId: string; current: RoomStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      disabled={pending}
      defaultValue={current}
      onChange={(e) => {
        const val = e.target.value as RoomStatus;
        startTransition(() => updateRoomStatus(roomId, val));
      }}
      className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white text-slate-700 disabled:opacity-50 cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
