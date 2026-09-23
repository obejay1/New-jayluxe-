import Link from "next/link";
import { PackageSearch, ArrowRight } from "lucide-react";
import { customerOrders } from "@/lib/data/orders";
import { formatPrice, formatDateTime } from "@/lib/site";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { Button } from "@/components/ui/Button";

export default function OrdersPage() {
  const orders = customerOrders;

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-line bg-white py-20 text-center">
        <PackageSearch className="h-8 w-8 text-taupe" />
        <h2 className="mt-4 font-serif text-xl font-medium">No orders yet</h2>
        <p className="mt-2 max-w-xs text-sm text-taupe">
          Your orders will appear here once you make your first purchase.
        </p>
        <Button href="/shop" className="mt-6">Start shopping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-medium">Your orders</h2>
        <span className="text-sm text-taupe">{orders.length} total</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        <ul className="divide-y divide-line">
          {orders.map((o) => (
            <li key={o.id}>
              <Link
                href={`/account/orders/${o.orderNumber}`}
                className="group flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-champagne/40"
              >
                <div>
                  <p className="text-sm font-medium group-hover:text-gold">{o.orderNumber}</p>
                  <p className="mt-0.5 text-xs text-taupe">
                    {formatDateTime(o.placedAt)} · {o.items.length} {o.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{formatPrice(o.total)}</span>
                  <OrderStatusBadge status={o.status} />
                  <ArrowRight className="h-4 w-4 text-taupe" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}