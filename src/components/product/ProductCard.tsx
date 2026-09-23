"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/site";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useToast } from "@/components/ui/Toast";
import { BadgeFor, Rating } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const { show } = useToast();
  const wished = isWishlisted(product.slug);
  const hasSale = typeof product.salePrice === "number" && product.salePrice < product.price;
  const outOfStock = product.stock === 0;

  const onWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.slug);
    show(
      wished ? "info" : "success",
      wished ? "Removed from wishlist" : "Saved to wishlist",
      wished ? undefined : product.name,
    );
  };

  const onQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    add(product, 1);
    show("success", "Added to bag", product.name);
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col outline-offset-4"
      aria-label={product.name}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-champagne">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="absolute inset-0 scale-[1.02] object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}

        {product.badge && <BadgeFor label={product.badge} className="absolute top-3 left-3" />}

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-ivory/70">
            <span className="rounded-full bg-obsidian px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ivory">
              Sold out
            </span>
          </div>
        )}

        <button
          onClick={onWishlist}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/90 shadow-sm backdrop-blur transition-transform hover:scale-110"
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
        >
          <svg
            viewBox="0 0 24 24"
            className={cn("h-4.5 w-4.5 h-[18px] w-[18px] transition-colors", wished ? "fill-blush text-blush" : "fill-none text-obsidian")}
          >
            <path
              d="M12 20.5 4.7 13.2a4.8 4.8 0 0 1 0-6.8 4.8 4.8 0 0 1 6.8 0l.5.5.5-.5a4.8 4.8 0 0 1 6.8 0 4.8 4.8 0 0 1 0 6.8L12 20.5z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-medium leading-snug text-obsidian transition-colors group-hover:text-gold">
            {product.name}
          </h3>
        </div>
        <div className="mt-1 flex items-center gap-1.5">
          <Rating value={product.rating} />
          <span className="text-xs text-taupe">({product.reviewCount})</span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-2">
          {hasSale && (
            <span className="text-xs text-taupe line-through">{formatPrice(product.price)}</span>
          )}
          <span className="text-[15px] font-semibold">{formatPrice(product.salePrice ?? product.price)}</span>
        </div>
      </div>

      {!outOfStock && (
        <motion.button
          onClick={onQuickAdd}
          whileTap={{ scale: 0.97 }}
          className="mt-3 h-10 w-full rounded-full border border-obsidian/15 bg-transparent text-[13px] font-medium text-obsidian opacity-100 transition-all duration-300 group-hover:border-obsidian group-hover:bg-obsidian group-hover:text-ivory lg:opacity-0 lg:group-hover:opacity-100"
        >
          Quick add to bag
        </motion.button>
      )}
    </Link>
  );
}