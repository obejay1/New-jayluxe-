"use client";

import { useEffect, useState } from "react";
import type { OrderStatus } from "@/lib/data/orders";
import { loadOrderStatusOverrides } from "@/lib/admin-db";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export function OrderStatusControl({
  orderNumber,
  value,
}: {
  orderNumber: string;
  value: OrderStatus;
}) {
  const [status, setStatus] = useState<OrderStatus>(value);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const override = loadOrderStatusOverrides()[orderNumber];
      if (override && override !== value) setStatus(override);
    }, 0);
    return () => window.clearTimeout(t);
  }, [orderNumber, value]);

  return <OrderStatusSelect orderNumber={orderNumber} value={status} onChange={setStatus} />;
}