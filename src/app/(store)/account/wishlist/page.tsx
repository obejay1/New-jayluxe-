import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { WishlistGrid } from "@/components/product/WishlistGrid";

export const metadata: Metadata = {
  title: "Wishlist",
  robots: { index: false },
};

export default function AccountWishlistPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-xl font-medium">Your wishlist</h2>
        <p className="mt-1 text-sm text-taupe">Pieces you&apos;ve saved — they sell out fast.</p>
      </div>
      <WishlistGrid allProducts={products} />
    </div>
  );
}