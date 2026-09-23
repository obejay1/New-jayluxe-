import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { products } from "@/lib/data/products";
import { AdminProductsTable } from "@/components/admin/AdminProductsTable";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Products",
  robots: { index: false },
};

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-medium sm:text-3xl">Products</h1>
          <p className="mt-1.5 text-sm text-taupe">
            {products.length} products in the catalogue.
          </p>
        </div>
        <Button href="/admin/products/new">
          <Plus className="h-4 w-4" aria-hidden="true" /> New product
        </Button>
      </div>

      <AdminProductsTable baseProducts={products} />

      <p className="text-xs text-taupe">
        <Link href="/admin/products/new" className="underline underline-offset-4 hover:text-obsidian">
          New product created
        </Link>{" "}
        in demo mode is stored locally in this browser until the API lands.
      </p>
    </div>
  );
}