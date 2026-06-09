"use client";

import { useTransition } from "react";
import { updateMaintenanceStatus } from "@/app/actions";
import type { MaintenanceStatus } from "@/lib/types";

const options: { value: MaintenanceStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export default function MaintenanceStatusSelect({ id, current }: { id: string; current: MaintenanceStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      disabled={pending}
      defaultValue={current}
      onChange={(e) => {
        const val = e.target.value as MaintenanceStatus;
        startTransition(() => updateMaintenanceStatus(id, val));
      }}
      className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700 disabled:opacity-50 cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
