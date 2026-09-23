import { CheckCircle2, Clock } from "lucide-react";
import type { OrderStatus, PaymentStatus } from "@/lib/data/orders";
import { cn } from "@/lib/utils";

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { className: string }> = {
    processing: { className: "bg-warning/10 text-warning" },
    shipped: { className: "bg-gold/15 text-gold" },
    delivered: { className: "bg-success/10 text-success" },
    cancelled: { className: "bg-error/10 text-error" },
  };
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]", map[status].className)}>
      {status}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const map: Record<PaymentStatus, { className: string }> = {
    paid: { className: "bg-success/10 text-success" },
    pending: { className: "bg-warning/10 text-warning" },
    refunded: { className: "bg-taupe/15 text-taupe" },
  };
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]", map[status].className)}>
      {status === "paid" ? "✓ Paid" : status}
    </span>
  );
}

export function TimelineStep({ label, at, done }: { label: string; at: string; done: boolean }) {
  return (
    <li className="flex gap-3">
      <span
        className={cn(
          "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
          done ? "bg-success/10 text-success" : "bg-champagne text-taupe",
        )}
      >
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
      </span>
      <div>
        <p className={cn("text-sm font-medium", done ? "text-obsidian" : "text-taupe")}>{label}</p>
        <p className="text-xs text-taupe">{at}</p>
      </div>
    </li>
  );
}