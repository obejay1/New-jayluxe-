import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order — contact, delivery and secure payment.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}