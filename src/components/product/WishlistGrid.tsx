"use client";

import type { Product } from "@/types";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { useToast } from "@/components/ui/Toast";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

export function WishlistGrid({ allProducts }: { allProducts: Product[] }) {
  const { slugs } = useWishlist();
  const { add } = useCart();
  const { show } = useToast();

  const items = allProducts.filter((p) => slugs.includes(p.slug));

  if (items.length === 0) {
    return (
      <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-line bg-white py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-champagne">
          <Heart className="h-7 w-7 text-taupe" />
        </span>
        <h2 className="mt-5 font-serif text-xl font-medium">Nothing saved yet</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-taupe">
          Tap the heart on any piece you love and it&apos;ll wait right here for you.
        </p>
        <Button href="/shop" className="mt-6">Discover pieces to love</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-taupe">
          {items.length} {items.length === 1 ? "piece" : "pieces"}
        </p>
        <button
          onClick={() => {
            items.forEach((p) => add(p, 1));
            show("success", "Added to your bag", `${items.length} ${items.length === 1 ? "piece" : "pieces"} from your wishlist`);
          }}
          className={cn("h-10 rounded-full bg-obsidian px-5 text-[13px] font-medium text-ivory transition-colors hover:bg-gold hover:text-obsidian")}
        >
          Add all to bag
        </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}