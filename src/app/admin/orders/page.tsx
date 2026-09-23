import type { Metadata } from "next";
import { customerOrders } from "@/lib/data/orders";
import { AdminOrdersTable } from "@/components/admin/AdminOrdersTable";

export const metadata: Metadata = {
  title: "Orders",
  robots: { index: false },
};

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-medium sm:text-3xl">Orders</h1>
        <p className="mt-1.5 text-sm text-taupe">
          {customerOrders.length} orders total. Change a status to update it instantly.
        </p>
      </div>

      <AdminOrdersTable baseOrders={customerOrders} />
    </div>
  );
}