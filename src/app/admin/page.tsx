import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Banknote, ClipboardList, Package, TrendingUp } from "lucide-react";
import { products } from "@/lib/data/products";
import { customerOrders } from "@/lib/data/orders";
import { categories } from "@/lib/data/categories";
import { formatPrice, formatDateTime } from "@/lib/site";
import { StatCard } from "@/components/admin/StatCard";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/account/OrderStatusBadge";
import { LOW_STOCK_THRESHOLD } from "@/lib/admin-db";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

export default function AdminDashboardPage() {
  const paidOrders = customerOrders.filter((o) => o.paymentStatus === "paid");
  const revenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const publishedCount = products.filter((p) => p.status === "published").length;
  const lowStock = products
    .filter((p) => p.stock <= LOW_STOCK_THRESHOLD)
    .sort((a, b) => a.stock - b.stock);

  const inventoryByCategory = categories
    .map((c) => {
      const items = products.filter((p) => p.categorySlug === c.slug);
      const value = items.reduce((sum, p) => sum + (p.salePrice ?? p.price) * p.stock, 0);
      return { category: c, count: items.length, value };
    })
    .sort((a, b) => b.value - a.value);
  const maxInventory = inventoryByCategory[0]?.value ?? 1;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-medium sm:text-3xl">Dashboard</h1>
        <p className="mt-1.5 text-sm text-taupe">A live snapshot of your store.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Banknote}
          label="Revenue (paid orders)"
          value={formatPrice(revenue)}
          sub={`${paidOrders.length} paid order${paidOrders.length === 1 ? "" : "s"}`}
        />
        <StatCard
          icon={ClipboardList}
          label="Total orders"
          value={String(customerOrders.length)}
          sub={`${customerOrders.filter((o) => o.status === "processing").length} awaiting dispatch`}
        />
        <StatCard
          icon={Package}
          label="Published products"
          value={String(publishedCount)}
          sub={`${products.length} products in catalogue`}
        />
        <StatCard
          icon={TrendingUp}
          label="Low stock items"
          value={String(lowStock.length)}
          accent={`${lowStock.length} under ${LOW_STOCK_THRESHOLD}`}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-serif text-lg font-medium">Recent orders</h2>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-[13px] text-taupe transition-colors hover:text-obsidian"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="divide-y divide-line">
            {customerOrders.slice(0, 5).map((o) => (
              <li key={o.id}>
                <Link
                  href={`/admin/orders/${o.orderNumber}`}
                  className="group flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-champagne/40"
                >
                  <div>
                    <p className="text-sm font-medium group-hover:text-gold">{o.orderNumber}</p>
                    <p className="mt-0.5 text-xs text-taupe">
                      {formatDateTime(o.placedAt)} · {o.deliveryAddress.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{formatPrice(o.total)}</span>
                    <PaymentStatusBadge status={o.paymentStatus} />
                    <OrderStatusBadge status={o.status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-8">
          <section className="rounded-xl border border-line bg-white p-5">
            <h2 className="font-serif text-lg font-medium">Inventory by category</h2>
            <ul className="mt-4 space-y-4">
              {inventoryByCategory.map(({ category, count, value }) => (
                <li key={category.slug}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {category.name}
                      <span className="ml-2 text-xs font-normal text-taupe">{count} items</span>
                    </span>
                    <span className="text-taupe">{formatPrice(value)}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-champagne">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${Math.max(4, (value / maxInventory) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-line bg-white">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-serif text-lg font-medium">Low stock alert</h2>
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-1 text-[13px] text-taupe transition-colors hover:text-obsidian"
              >
                Products <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            {lowStock.length === 0 ? (
              <p className="px-5 py-6 text-sm text-taupe">Nothing below the threshold right now.</p>
            ) : (
              <ul className="divide-y divide-line">
                {lowStock.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/admin/products/${p.slug}`}
                      className="group flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-champagne/40"
                    >
                      <span className="text-sm font-medium group-hover:text-gold">{p.name}</span>
                      <span className="text-xs font-semibold text-error">
                        {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}