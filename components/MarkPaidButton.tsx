"use client";

import { useTransition } from "react";
import { markPaymentPaid } from "@/app/actions";
import { CheckCircle2 } from "lucide-react";

export default function MarkPaidButton({ paymentId }: { paymentId: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => markPaymentPaid(paymentId))}
      disabled={pending}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 font-medium"
    >
      <CheckCircle2 className="w-3.5 h-3.5" />
      {pending ? "Saving…" : "Mark Paid"}
    </button>
  );
}
