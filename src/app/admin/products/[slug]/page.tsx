import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/lib/data/products";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = {
  title: "Edit product",
  robots: { index: false },
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return <ProductForm mode="edit" product={product} existingSlugs={products.map((p) => p.slug)} />;
}