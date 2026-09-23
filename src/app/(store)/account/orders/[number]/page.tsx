import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getOrderByNumber } from "@/lib/data/orders";
import { getProductBySlug } from "@/lib/data/products";
import { formatPrice, formatDateTime } from "@/lib/site";
import { OrderStatusBadge, PaymentStatusBadge, TimelineStep } from "@/components/account/OrderStatusBadge";

export const metadata: Metadata = {
  title: "Order details",
  robots: { index: false },
};

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const order = getOrderByNumber(number);
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <Link href="/account/orders" className="inline-flex items-center gap-2 text-sm text-taupe hover:text-obsidian">
        <ArrowLeft className="h-4 w-4" /> Back to orders
      </Link>

      <div className="rounded-xl border border-line bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-medium">{order.orderNumber}</h2>
            <p className="mt-0.5 text-sm text-taupe">Placed {formatDateTime(order.placedAt)}</p>
          </div>
          <div className="flex items-center gap-2">
            <OrderStatusBadge status={order.status} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
        </div>

        <ol className="mt-7 space-y-4">
          {order.timeline.map((step) => (
            <TimelineStep key={step.label} {...step} />
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-line bg-white p-6">
        <h3 className="font-serif text-lg font-medium">Items</h3>
        <ul className="mt-4 divide-y divide-line">
          {order.items.map((item) => {
            const product = getProductBySlug(item.productSlug);
            return (
              <li key={item.productSlug} className="flex gap-4 py-4">
                {product ? (
                  <Link href={`/products/${product.slug}`} className="shrink-0" aria-label={item.name}>
                    <div className="relative aspect-[4/5] w-14 overflow-hidden rounded-md bg-champagne">
                      <Image src={product.images[0]} alt={item.name} fill sizes="56px" className="object-cover" />
                    </div>
                  </Link>
                ) : (
                  <div className="aspect-[4/5] w-14 shrink-0 rounded-md bg-champagne" aria-hidden="true" />
                )}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-taupe">SKU {item.sku}</p>
                  </div>
                  <p className="text-sm text-taupe">Qty {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatPrice(item.lineTotal)}</p>
                  <p className="text-xs text-taupe">{formatPrice(item.price)} each</p>
                </div>
              </li>
            );
          })}
        </ul>

        <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-taupe">Subtotal</dt>
            <dd className="font-medium">{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-taupe">Delivery</dt>
            <dd className="font-medium">{order.deliveryFee === 0 ? "Complimentary" : formatPrice(order.deliveryFee)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-success">
              <dt>Discount</dt>
              <dd>−{formatPrice(order.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-line pt-3 text-base">
            <dt className="font-medium">Total</dt>
            <dd className="font-serif text-lg font-medium">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-line bg-white p-6">
        <h3 className="font-serif text-lg font-medium">Delivery details</h3>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-taupe">Recipient</dt>
            <dd className="mt-0.5 font-medium">{order.deliveryAddress.name}</dd>
          </div>
          <div>
            <dt className="text-taupe">Address</dt>
            <dd className="mt-0.5 font-medium">{order.deliveryAddress.address}, {order.deliveryAddress.city}, {order.deliveryAddress.state}</dd>
          </div>
          <div>
            <dt className="text-taupe">Phone</dt>
            <dd className="mt-0.5 font-medium">{order.deliveryAddress.phone}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-taupe">Method</dt>
            <dd className="mt-0.5 font-medium">{order.deliveryMethod}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return ["JLX-2026-0041", "JLX-2026-0032", "JLX-2026-0021"].map((number) => ({ number }));
}