export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type ProductStatus = "published" | "draft" | "archived";

export type ProductVariant = {
  name: string;
  options: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  status: ProductStatus;
  badge?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  editorNote: string;
  description: string[];
  details: string[];
  variants: ProductVariant[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
};

export type Edit = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  productSlugs: string[];
};

export type Review = {
  id: string;
  productSlug: string;
  productName: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
  productImage: string;
};