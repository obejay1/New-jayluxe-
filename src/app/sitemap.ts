import type { MetadataRoute } from "next";
import { getPublishedProducts } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { edits } from "@/lib/data/edits";

const BASE = "https://jayluxestore.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/contact",
    "/faq",
    "/shipping-returns",
  ].map((path) => ({ url: `${BASE}${path}`, lastModified: now, priority: path === "" ? 1 : 0.7 }));

  const productRoutes: MetadataRoute.Sitemap = getPublishedProducts().map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: now,
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/categories/${c.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  const editRoutes: MetadataRoute.Sitemap = edits.map((e) => ({
    url: `${BASE}/collections/${e.slug}`,
    lastModified: now,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...editRoutes];
}