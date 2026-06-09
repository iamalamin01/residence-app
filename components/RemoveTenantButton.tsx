"use client";

import { useTransition } from "react";
import { removeTenant } from "@/app/actions";
import { Trash2 } from "lucide-react";

export default function RemoveTenantButton({ tenantId, roomId, tenantName }: {
  tenantId: string;
  roomId: string;
  tenantName: string;
}) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    if (!confirm(`Remove "${tenantName}" from the residence?`)) return;
    startTransition(() => removeTenant(tenantId, roomId));
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
      title="Remove tenant"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
