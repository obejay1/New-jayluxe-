import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "New product",
  robots: { index: false },
};

export default function NewProductPage() {
  return <ProductForm mode="create" existingSlugs={products.map((p) => p.slug)} />;
}