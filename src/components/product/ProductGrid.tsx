import type { Product } from "@/types";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export function ProductGrid({
  products,
  priority = false,
}: {
  products: Product[];
  priority?: boolean;
}) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-xl text-obsidian">Nothing here yet</p>
        <p className="mt-2 text-sm text-taupe">Check back soon — new pieces arrive often.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={priority && i < 4} />
      ))}
    </div>
  );
}

export function ProductGridLoading({ count = 8 }: { count?: number }) {
  return <ProductGridSkeleton count={count} />;
}