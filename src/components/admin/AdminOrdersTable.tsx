"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ClipboardList, Search } from "lucide-react";
import type { CustomerOrder, OrderStatus } from "@/lib/data/orders";
import { applyOrderStatusOverrides } from "@/lib/admin-db";
import { formatPrice, formatDateTime } from "@/lib/site";
import { PaymentStatusBadge, OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Input, Select } from "@/components/ui/Field";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

type StatusFilter = "all" | OrderStatus;

export function AdminOrdersTable({ baseOrders }: { baseOrders: CustomerOrder[] }) {
  const [orders, setOrders] = useState<CustomerOrder[]>(baseOrders);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");

  useEffect(() => {
    const t = window.setTimeout(() => {
      setOrders(applyOrderStatusOverrides(baseOrders));
    }, 0);
    return () => window.clearTimeout(t);
  }, [baseOrders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (status !== "all" && o.status !== status) return false;
      if (!q) return true;
      return `${o.orderNumber} ${o.deliveryAddress.name} ${o.deliveryAddress.city}`.toLowerCase().includes(q);
    });
  }, [orders, query, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-taupe" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Search by order number or customer"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Search orders"
          />
        </div>
        <div className="w-44">
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            {(["processing", "shipped", "delivered", "cancelled"] as OrderStatus[]).map((s) => (
              <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
            ))}
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-line bg-white py-20 text-center">
          <ClipboardList className="mx-auto h-8 w-8 text-taupe" />
          <h2 className="mt-4 font-serif text-lg font-medium">No orders found</h2>
          <p className="mt-1.5 text-sm text-taupe">Try a different search or filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-[0.14em] text-taupe">
                <th scope="col" className="px-5 py-3 font-semibold">Order</th>
                <th scope="col" className="px-5 py-3 font-semibold">Customer</th>
                <th scope="col" className="px-5 py-3 font-semibold">Items</th>
                <th scope="col" className="px-5 py-3 font-semibold">Total</th>
                <th scope="col" className="px-5 py-3 font-semibold">Payment</th>
                <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((o) => (
                <tr key={o.id} className="transition-colors hover:bg-champagne/30">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/orders/${o.orderNumber}`} className="font-medium hover:text-gold">
                      {o.orderNumber}
                    </Link>
                    <p className="mt-0.5 text-xs text-taupe">{formatDateTime(o.placedAt)}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium">{o.deliveryAddress.name}</p>
                    <p className="text-xs text-taupe">{o.deliveryAddress.city}, {o.deliveryAddress.state}</p>
                  </td>
                  <td className="px-5 py-3.5 text-taupe">
                    {o.items.reduce((s, i) => s + i.quantity, 0)}
                  </td>
                  <td className="px-5 py-3.5 font-medium">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3.5">
                    <PaymentStatusBadge status={o.paymentStatus} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <OrderStatusBadge status={o.status} />
                      <OrderStatusSelect
                        orderNumber={o.orderNumber}
                        value={o.status}
                        onChange={(next) =>
                          setOrders((prev) =>
                            prev.map((x) => (x.id === o.id ? { ...x, status: next } : x)),
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-taupe">Showing {filtered.length} of {orders.length} orders.</p>
    </div>
  );
}