"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/ProductGrid";

type SortId = "featured" | "newest" | "price-asc" | "price-desc" | "best-selling" | "rating";

const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest first" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "best-selling", label: "Best selling" },
  { id: "rating", label: "Top rated" },
];

export function SortableProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortId>("featured");

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case "newest":
        return list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
      case "price-asc":
        return list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      case "price-desc":
        return list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      case "best-selling":
        return list.sort((a, b) => Number(b.isBestSeller ?? false) - Number(a.isBestSeller ?? false));
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <div>
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="text-sm text-taupe" aria-live="polite">
          {sorted.length} {sorted.length === 1 ? "piece" : "pieces"}
        </p>
        <label className="sr-only" htmlFor="sort">Sort products</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortId)}
          className="h-10 rounded-full border border-line bg-white px-4 text-[13px] focus:border-gold focus:outline-none"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              Sort: {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8">
        <ProductGrid products={sorted} />
      </div>
    </div>
  );
}