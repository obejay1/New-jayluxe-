import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Shopping bag",
  description: "Review your items and head to checkout.",
};

export default function CartPage() {
  return <CartView />;
}