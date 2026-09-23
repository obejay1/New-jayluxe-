import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/data/products";
import { WishlistGrid } from "@/components/product/WishlistGrid";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
};

export default function WishlistPage() {
  return (
    <div className="container-store py-10 sm:py-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Saved for later</p>
      <h1 className="mt-3 font-serif text-3xl font-medium sm:text-4xl">Your wishlist</h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-taupe">
        Everything you&apos;ve loved, kept in one place. Add to bag anytime — they sell out often.
      </p>
      <div className="mt-10">
        <WishlistGrid allProducts={products} />
      </div>
      <div className="mt-12 flex flex-col items-start gap-2">
        <Link href="/shop" className="inline-flex h-11 items-center rounded-full border border-obsidian/25 px-6 text-sm font-medium transition-colors hover:border-obsidian hover:bg-obsidian hover:text-ivory">
          Browse the store
        </Link>
      </div>
    </div>
  );
}