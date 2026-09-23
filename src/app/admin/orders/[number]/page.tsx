import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Truck } from "lucide-react";
import { customerOrders } from "@/lib/data/orders";
import { formatPrice, formatDateTime } from "@/lib/site";
import { PaymentStatusBadge, TimelineStep } from "@/components/account/OrderStatusBadge";
import { OrderStatusControl } from "@/components/admin/OrderStatusControl";

export const metadata: Metadata = {
  title: "Order detail",
  robots: { index: false },
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const order = customerOrders.find((o) => o.orderNumber.toLowerCase() === number.toLowerCase());
  if (!order) notFound();

  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-sm text-taupe transition-colors hover:text-obsidian"
        >
          <ArrowLeft className="h-4 w-4" /> Back to orders
        </Link>
        <div className="flex items-center gap-3">
          <PaymentStatusBadge status={order.paymentStatus} />
          <OrderStatusControl orderNumber={order.orderNumber} value={order.status} />
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Order detail</p>
          <h1 className="mt-2 font-serif text-2xl font-medium sm:text-3xl">{order.orderNumber}</h1>
          <p className="mt-1 text-sm text-taupe">
            Placed {formatDateTime(order.placedAt)} · {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <p className="font-serif text-2xl font-medium">{formatPrice(order.total)}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="overflow-hidden rounded-xl border border-line bg-white">
            <h2 className="border-b border-line px-5 py-4 font-serif text-lg font-medium">Items</h2>
            <ul className="divide-y divide-line">
              {order.items.map((i) => (
                <li key={i.productSlug} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="mt-0.5 text-xs text-taupe">
                      {i.sku} · Qty {i.quantity} · {formatPrice(i.price)}
                    </p>
                  </div>
                  <p className="font-medium">{formatPrice(i.lineTotal)}</p>
                </li>
              ))}
            </ul>
            <dl className="space-y-2 border-t border-line px-5 py-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-taupe">Subtotal</dt>
                <dd className="font-medium">{formatPrice(order.subtotal)}</dd>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-success">
                  <dt>Discount</dt>
                  <dd className="font-medium">− {formatPrice(order.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-taupe">Delivery</dt>
                <dd className="font-medium">{order.deliveryFee === 0 ? "Complimentary" : formatPrice(order.deliveryFee)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-2 text-base">
                <dt className="font-medium">Total</dt>
                <dd className="font-serif text-lg font-medium">{formatPrice(order.total)}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-line bg-white p-5">
            <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-taupe">
              <MapPin className="h-4 w-4 text-gold" aria-hidden="true" /> Delivery address
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <p className="font-medium">{order.deliveryAddress.name}</p>
              <p className="text-taupe">{order.deliveryAddress.phone}</p>
              <p className="text-taupe">{order.deliveryAddress.address}</p>
              <p className="text-taupe">{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-champagne px-3 py-1.5 text-xs font-medium text-obsidian">
              <Truck className="h-3.5 w-3.5" aria-hidden="true" /> {order.deliveryMethod}
            </p>
          </section>
        </div>

        <section className="h-fit rounded-xl border border-line bg-white p-5">
          <h2 className="font-serif text-lg font-medium">Progress</h2>
          <ul className="mt-5 space-y-5">
            {order.timeline.map((t) => (
              <TimelineStep key={t.label} {...t} />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}