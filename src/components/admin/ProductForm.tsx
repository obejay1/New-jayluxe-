"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import type { Product, ProductStatus } from "@/types";
import { categories } from "@/lib/data/categories";
import { saveProductRecord } from "@/lib/admin-db";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";

type FormState = {
  name: string;
  slug: string;
  sku: string;
  categorySlug: string;
  categoryName: string;
  price: string;
  salePrice: string;
  stock: string;
  status: ProductStatus;
  badge: string;
  images: string[];
  editorNote: string;
  description: string;
  details: string;
};

function toFormState(product: Product | undefined): FormState {
  return {
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    sku: product?.sku ?? "",
    categorySlug: product?.categorySlug ?? categories[0].slug,
    categoryName: product?.categoryName ?? categories[0].name,
    price: product ? String(product.price) : "",
    salePrice: product?.salePrice !== undefined ? String(product.salePrice) : "",
    stock: product ? String(product.stock) : "0",
    status: product?.status ?? "draft",
    badge: product?.badge ?? "",
    images: product ? product.images : ["", "", ""],
    editorNote: product?.editorNote ?? "",
    description: product?.description.join("\n") ?? "",
    details: product?.details.join("\n") ?? "",
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProductForm({
  mode,
  product,
  existingSlugs,
}: {
  mode: "create" | "edit";
  product?: Product;
  existingSlugs: string[];
}) {
  const router = useRouter();
  const { show } = useToast();
  const initial = toFormState(product);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onNameChange = (name: string) => {
    if (mode !== "create") {
      set("name", name);
      return;
    }
    setForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === "" || prev.slug === slugify(prev.name) ? slugify(name) : prev.slug,
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) errs.slug = "Lowercase letters, numbers and dashes only";
    if (mode === "create" && existingSlugs.includes(form.slug)) errs.slug = "This slug is already taken";
    if (!form.sku.trim()) errs.sku = "Required";
    if (!form.price || Number(form.price) <= 0) errs.price = "Enter a price";
    if (form.salePrice && Number(form.salePrice) >= Number(form.price)) errs.salePrice = "Must be below the regular price";
    if (form.stock === "" || Number(form.stock) < 0) errs.stock = "Enter a stock level";
    if (!form.images[0].trim()) errs.images = "At least one image URL is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const save = () => {
    if (!validate()) return;
    setSaving(true);
    const price = Number(form.price);
    const salePrice = form.salePrice ? Number(form.salePrice) : undefined;
    const base: Product = {
      id: product?.id ?? `p-${Date.now()}`,
      slug: form.slug,
      name: form.name,
      sku: form.sku,
      categorySlug: form.categorySlug,
      categoryName: form.categoryName,
      price,
      salePrice,
      stock: Number(form.stock),
      status: form.status,
      badge: form.badge || undefined,
      rating: product?.rating ?? 0,
      reviewCount: product?.reviewCount ?? 0,
      images: form.images.filter(Boolean).length > 0 ? form.images.filter(Boolean) : [""],
      editorNote: form.editorNote,
      description: form.description
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      details: form.details
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      variants: product?.variants ?? [],
      isNew: product?.isNew,
      isBestSeller: product?.isBestSeller,
      isFeatured: product?.isFeatured,
    };
    saveProductRecord(base);
    setSaving(false);
    show(
      "success",
      mode === "create" ? "Product created" : "Product saved",
      `${form.name} was saved locally in demo mode.`,
    );
    window.setTimeout(() => router.push("/admin/products"), 600);
  };

  const cancelLabel = mode === "create" ? "Back to products" : "Discard changes";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="space-y-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-sm text-taupe transition-colors hover:text-obsidian"
        >
          <ArrowLeft className="h-4 w-4" /> Back to products
        </Link>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
            {cancelLabel}
          </Button>
          <Button type="submit" isPending={saving}>
            {mode === "create" ? "Create product" : "Save changes"}
          </Button>
        </div>
      </div>

      <section className="rounded-xl border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-medium">Basics</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Product name" id="name" error={errors.name}>
            <Input id="name" value={form.name} onChange={(e) => onNameChange(e.target.value)} />
          </Field>
          <Field
            label="Slug"
            id="slug"
            hint={mode === "create" ? "Auto-suggested from the name" : undefined}
            error={errors.slug}
          >
            <Input id="slug" value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
          </Field>
          <Field label="SKU" id="sku" error={errors.sku}>
            <Input id="sku" value={form.sku} onChange={(e) => set("sku", e.target.value)} />
          </Field>
          <Field label="Category" id="category">
            <Select
              id="category"
              value={form.categorySlug}
              onChange={(e) => {
                const c = categories.find((x) => x.slug === e.target.value);
                set("categorySlug", c?.slug ?? form.categorySlug);
                set("categoryName", c?.name ?? form.categoryName);
              }}
            >
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </Select>
          </Field>
          <Field label="Price (₦)" id="price" error={errors.price}>
            <Input id="price" inputMode="numeric" value={form.price} onChange={(e) => set("price", e.target.value.replace(/[^\d]/g, ""))} />
          </Field>
          <Field label="Sale price (₦)" id="salePrice" error={errors.salePrice} hint="Leave blank for no sale">
            <Input id="salePrice" inputMode="numeric" value={form.salePrice} onChange={(e) => set("salePrice", e.target.value.replace(/[^\d]/g, ""))} />
          </Field>
          <Field label="Stock" id="stock" error={errors.stock}>
            <Input id="stock" inputMode="numeric" value={form.stock} onChange={(e) => set("stock", e.target.value.replace(/[^\d]/g, ""))} />
          </Field>
          <Field label="Status" id="status">
            <Select id="status" value={form.status} onChange={(e) => set("status", e.target.value as ProductStatus)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </Select>
          </Field>
          <Field label="Badge" id="badge" hint="e.g. New In, Best Seller, Limited" error={errors.badge}>
            <Input id="badge" value={form.badge} onChange={(e) => set("badge", e.target.value)} />
          </Field>
        </div>
      </section>

      <section className="rounded-xl border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-medium">Images</h2>
        <div className="mt-5 space-y-4">
          {form.images.map((img, i) => (
            <Field
              key={i}
              label={i === 0 ? "Image URL (cover)" : `Image URL ${i + 1}`}
              id={`image-${i}`}
              error={i === 0 ? errors.images : undefined}
              hint={i === 0 ? "First image is the thumbnail everywhere in the store" : undefined}
            >
              <Input
                id={`image-${i}`}
                type="url"
                value={img}
                placeholder="https://images.unsplash.com/…"
                onChange={(e) => {
                  const next = [...form.images];
                  next[i] = e.target.value;
                  set("images", next);
                }}
              />
            </Field>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-line bg-white p-6">
        <h2 className="font-serif text-lg font-medium">Content</h2>
        <div className="mt-5 space-y-5">
          <Field label="Editor's note" id="note" hint="Short marketing line shown under the product name">
            <Textarea id="note" value={form.editorNote} onChange={(e) => set("editorNote", e.target.value)} />
          </Field>
          <Field label="Description" id="description" hint="One paragraph per line — each becomes its own block">
            <Textarea id="description" value={form.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
          <Field label="Details" id="details" hint="One detail per line, e.g. material, care, sizing">
            <Textarea id="details" value={form.details} onChange={(e) => set("details", e.target.value)} />
          </Field>
        </div>
      </section>
    </form>
  );
}