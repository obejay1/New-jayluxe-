"use client";

import type { OrderStatus } from "@/lib/data/orders";
import { setOrderStatusOverride } from "@/lib/admin-db";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const SELECT_CLASSES = cn(
  "h-9 w-36 appearance-none rounded-md border border-line bg-white px-2.5 pr-8 text-[13px] text-obsidian transition-colors focus:border-gold focus:outline-none",
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20fill%3D%22none%22%20viewBox=%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%23948d84%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.5rem_center] bg-no-repeat",
);

export function OrderStatusSelect({
  orderNumber,
  value,
  onChange,
  className,
}: {
  orderNumber: string;
  value: OrderStatus;
  onChange: (next: OrderStatus) => void;
  className?: string;
}) {
  const { show } = useToast();

  const update = (next: OrderStatus) => {
    setOrderStatusOverride(orderNumber, next);
    onChange(next);
    show("success", "Order updated", `${orderNumber} marked as ${next}`);
  };

  return (
    <select
      value={value}
      onChange={(e) => update(e.target.value as OrderStatus)}
      aria-label={`Status for ${orderNumber}`}
      className={cn(SELECT_CLASSES, className)}
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}