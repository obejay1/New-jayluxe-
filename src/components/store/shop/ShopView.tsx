"use client";

import { useMemo, useState } from "react";
import type { Category } from "@/types";
import { getPublishedProducts } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Drawer } from "@/components/ui/Drawer";
import { cn } from "@/lib/utils";

type SortId = "featured" | "newest" | "price-asc" | "price-desc" | "best-selling" | "rating";

const SORT_OPTIONS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest first" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "best-selling", label: "Best selling" },
  { id: "rating", label: "Top rated" },
];

const PRICE_RANGES = [
  { id: "all", label: "All prices", min: 0, max: Infinity },
  { id: "under-30", label: "Under ₦30,000", min: 0, max: 30000 },
  { id: "30-60", label: "₦30,000 – ₦60,000", min: 30000, max: 60000 },
  { id: "60-100", label: "₦60,000 – ₦100,000", min: 60000, max: 100000 },
  { id: "over-100", label: "Over ₦100,000", min: 100000, max: Infinity },
];

export function ShopView({
  categories,
  initialSort,
  initialCategory,
}: {
  categories: Category[];
  initialSort?: string;
  initialCategory?: string;
}) {
  const [sort, setSort] = useState<SortId>(
    (SORT_OPTIONS.some((o) => o.id === initialSort) ? initialSort : "featured") as SortId,
  );
  const [category, setCategory] = useState<string>(initialCategory ?? "all");
  const [priceRange, setPriceRange] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const all = useMemo(() => getPublishedProducts(), []);

  const filtered = useMemo(() => {
    const range = PRICE_RANGES.find((r) => r.id === priceRange) ?? PRICE_RANGES[0];
    let list = all.filter((p) => {
      const price = p.salePrice ?? p.price;
      if (category !== "all" && p.categorySlug !== category) return false;
      if (price < range.min || price > range.max) return false;
      if (inStockOnly && p.stock === 0) return false;
      if (onSaleOnly && typeof p.salePrice !== "number") return false;
      return true;
    });

    switch (sort) {
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      case "price-asc":
        list = [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        list = [...list].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "best-selling":
        list = [...list].sort((a, b) => Number(b.isBestSeller ?? false) - Number(a.isBestSeller ?? false));
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
    }
    return list;
  }, [all, category, priceRange, inStockOnly, onSaleOnly, sort]);

  const activeFilterCount =
    (category !== "all" ? 1 : 0) +
    (priceRange !== "all" ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  const clearAll = () => {
    setCategory("all");
    setPriceRange("all");
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const filterControls = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        <div className="space-y-1">
          <FilterOption active={category === "all"} onClick={() => setCategory("all")} label="All categories" />
          {categories.map((c) => (
            <FilterOption
              key={c.slug}
              active={category === c.slug}
              onClick={() => setCategory(c.slug)}
              label={c.name}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <div className="space-y-1">
          {PRICE_RANGES.map((r) => (
            <FilterOption key={r.id} active={priceRange === r.id} onClick={() => setPriceRange(r.id)} label={r.label} />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className="flex items-center justify-between py-1">
          <span className="text-sm">In stock only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 accent-obsidian"
          />
        </label>
        <label className="flex items-center justify-between py-1">
          <span className="text-sm">On sale</span>
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={(e) => setOnSaleOnly(e.target.checked)}
            className="h-4 w-4 accent-obsidian"
          />
        </label>
      </FilterGroup>

      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="text-[13px] font-medium text-taupe underline underline-offset-4 hover:text-obsidian">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container-store py-8 sm:py-12">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{filterControls}</div>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-sm text-taupe" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white px-4 text-[13px] font-medium"
                aria-expanded={filtersOpen}
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-obsidian px-1 text-[10px] text-ivory">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <label className="sr-only" htmlFor="sort-select">Sort products</label>
              <select
                id="sort-select"
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
          </div>

          <div className="mt-8">
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>

      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters" side="left">
        <div className="px-5 py-6">
          {filterControls}
          <button
            onClick={() => setFiltersOpen(false)}
            className="mt-8 h-11 w-full rounded-full bg-obsidian text-sm font-medium text-ivory"
          >
            Show {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </button>
        </div>
      </Drawer>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function FilterOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors",
        active ? "bg-champagne font-medium text-obsidian" : "text-taupe hover:text-obsidian",
      )}
    >
      {label}
      {active && <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
    </button>
  );
}