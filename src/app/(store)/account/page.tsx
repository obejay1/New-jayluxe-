import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Heart, Package, Wallet } from "lucide-react";
import { customerOrders } from "@/lib/data/orders";
import { formatPrice, formatDateTime } from "@/lib/site";
import { OrderStatusBadge } from "@/components/account/OrderStatusBadge";
import { WishlistCount } from "@/components/account/WishlistCount";

export default function AccountProfilePage() {
  const orders = customerOrders;
  const totalSpent = orders.filter((o) => o.paymentStatus === "paid").reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-line bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium">Profile</h2>
          <Link href="/account/security" className="text-[13px] text-taupe underline-offset-4 hover:text-obsidian hover:underline">
            Manage
          </Link>
        </div>
        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-taupe">Full name</dt>
            <dd className="mt-0.5 font-medium">Amara Okafor</dd>
          </div>
          <div>
            <dt className="text-taupe">Email</dt>
            <dd className="mt-0.5 font-medium">amara@example.com</dd>
          </div>
          <div>
            <dt className="text-taupe">Phone</dt>
            <dd className="mt-0.5 font-medium">+234 803 000 0000</dd>
          </div>
          <div>
            <dt className="text-taupe">Member since</dt>
            <dd className="mt-0.5 font-medium">March 2026</dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Package} label="Orders placed" value={String(orders.length)} href="/account/orders" />
        <StatCard icon={Wallet} label="Total spent" value={formatPrice(totalSpent)} href="/account/orders" />
        <StatCard icon={Heart} label="Wishlist" value={<WishlistCount />} href="/account/wishlist" />
      </section>

      <section className="rounded-xl border border-line bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium">Recent orders</h2>
          <Link href="/account/orders" className="inline-flex items-center gap-1 text-[13px] text-taupe hover:text-obsidian">
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <ul className="mt-5 divide-y divide-line">
          {orders.slice(0, 3).map((o) => (
            <li key={o.id}>
              <Link href={`/account/orders/${o.orderNumber}`} className="flex flex-wrap items-center justify-between gap-3 py-4 transition-colors group">
                <div>
                  <p className="text-[13px] font-medium group-hover:text-gold">{o.orderNumber}</p>
                  <p className="text-xs text-taupe">{formatDateTime(o.placedAt)} · {o.items.length} {o.items.length === 1 ? "item" : "items"}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{formatPrice(o.total)}</span>
                  <OrderStatusBadge status={o.status} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Package;
  label: string;
  value: ReactNode;
  href: string;
}) {
  return (
    <Link href={href} className="group rounded-xl border border-line bg-white p-5 transition-colors hover:border-gold">
      <Icon className="h-5 w-5 text-gold" />
      <p className="mt-3 font-serif text-xl font-medium">{value}</p>
      <p className="text-[13px] text-taupe">{label}</p>
    </Link>
  );
}