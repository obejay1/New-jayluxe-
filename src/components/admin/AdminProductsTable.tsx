"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Package, Pencil, Search } from "lucide-react";
import type { Product } from "@/types";
import type { ProductStatus } from "@/types";
import { mergeSavedProducts } from "@/lib/admin-db";
import { formatPrice } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

type StatusFilter = "all" | ProductStatus;

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All statuses" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "archived", label: "Archived" },
];

const STATUS_TONE: Record<ProductStatus, "success" | "obsidian" | "ivory"> = {
  published: "success",
  draft: "obsidian",
  archived: "ivory",
};

export function AdminProductsTable({ baseProducts }: { baseProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(baseProducts);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const t = window.setTimeout(() => {
      setProducts(mergeSavedProducts(baseProducts));
    }, 0);
    return () => window.clearTimeout(t);
  }, [baseProducts]);

  const categories = useMemo(
    () => Array.from(new Set(baseProducts.map((p) => p.categorySlug))).sort(),
    [baseProducts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (category !== "all" && p.categorySlug !== category) return false;
      if (!q) return true;
      return `${p.name} ${p.sku} ${p.categoryName}`.toLowerCase().includes(q);
    });
  }, [products, query, status, category]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-taupe" aria-hidden="true" />
          <Input
            type="search"
            placeholder="Search by name, SKU or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            aria-label="Search products"
          />
        </div>
        <div className="flex gap-3">
          <div className="w-44">
            <Select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div className="w-44">
            <Select value={status} onChange={(e) => setStatus(e.target.value as StatusFilter)} aria-label="Filter by status">
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-line bg-white py-20 text-center">
          <Package className="mx-auto h-8 w-8 text-taupe" />
          <h2 className="mt-4 font-serif text-lg font-medium">No products found</h2>
          <p className="mt-1.5 text-sm text-taupe">Try a different search or filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] font-semibold uppercase tracking-[0.14em] text-taupe">
                <th scope="col" className="px-5 py-3 font-semibold">Product</th>
                <th scope="col" className="px-5 py-3 font-semibold">SKU</th>
                <th scope="col" className="px-5 py-3 font-semibold">Category</th>
                <th scope="col" className="px-5 py-3 font-semibold">Stock</th>
                <th scope="col" className="px-5 py-3 font-semibold">Price</th>
                <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((p) => (
                <tr key={p.id} className="transition-colors hover:bg-champagne/30">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="relative aspect-[4/5] w-9 shrink-0 overflow-hidden rounded bg-champagne">
                        <Image src={p.images[0]} alt="" fill sizes="36px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="text-xs text-taupe">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-taupe">{p.sku}</td>
                  <td className="px-5 py-3.5 text-taupe">{p.categoryName}</td>
                  <td className="px-5 py-3.5">
                    <span className={p.stock <= 5 ? "font-semibold text-error" : "text-taupe"}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium">{formatPrice(p.price)}</p>
                    {p.salePrice !== undefined && (
                      <p className="text-xs text-success">
                        <s className="text-taupe">{formatPrice(p.price)}</s> → {formatPrice(p.salePrice)}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={STATUS_TONE[p.status]}>{p.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Button href={`/admin/products/${p.slug}`} variant="ghost" size="sm">
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">Edit {p.name}</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-taupe">
        Showing {filtered.length} of {products.length} products.
      </p>
    </div>
  );
}