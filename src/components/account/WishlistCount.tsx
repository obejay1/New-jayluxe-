"use client";

import { useWishlist } from "@/lib/wishlist";

export function WishlistCount() {
  const { slugs } = useWishlist();
  return <>{slugs.length}</>;
}
