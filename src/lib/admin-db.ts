import type { Product } from "@/types";
import type { CustomerOrder, OrderStatus } from "@/lib/data/orders";

const SAVED_ORDER_STATUS_KEY = "jlx-admin-order-status-v1";
const SAVED_PRODUCTS_KEY = "jlx-admin-products-v1";
const SAVED_SETTINGS_KEY = "jlx-admin-settings-v1";

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export const LOW_STOCK_THRESHOLD = 5;

// ─── Order status overrides ────────────────────────────────────────────────

export function loadOrderStatusOverrides(): Record<string, OrderStatus> {
  return safeGet<Record<string, OrderStatus>>(SAVED_ORDER_STATUS_KEY) ?? {};
}

export function setOrderStatusOverride(orderNumber: string, status: OrderStatus) {
  const overrides = loadOrderStatusOverrides();
  overrides[orderNumber] = status;
  safeSet(SAVED_ORDER_STATUS_KEY, overrides);
}

export function applyOrderStatusOverrides(orders: CustomerOrder[]): CustomerOrder[] {
  const overrides = loadOrderStatusOverrides();
  if (Object.keys(overrides).length === 0) return orders;
  return orders.map((o) => (overrides[o.orderNumber] ? { ...o, status: overrides[o.orderNumber] } : o));
}

// ─── Product records (new + edits) ─────────────────────────────────────────

export function loadSavedProducts(): Product[] {
  return safeGet<Product[]>(SAVED_PRODUCTS_KEY) ?? [];
}

export function saveProductRecord(product: Product) {
  const saved = loadSavedProducts();
  const idx = saved.findIndex((p) => p.slug === product.slug);
  if (idx >= 0) saved[idx] = product;
  else saved.push(product);
  safeSet(SAVED_PRODUCTS_KEY, saved);
}

export function mergeSavedProducts(base: Product[]): Product[] {
  const saved = loadSavedProducts();
  if (saved.length === 0) return base;
  const baseSlugs = new Set(base.map((p) => p.slug));
  const merged: Product[] = [];
  for (const p of base) {
    merged.push(saved.find((s) => s.slug === p.slug) ?? p);
  }
  for (const s of saved) {
    if (!baseSlugs.has(s.slug)) merged.push(s);
  }
  return merged;
}

// ─── Store settings ────────────────────────────────────────────────────────

export function loadSavedSettings(): Record<string, string | number> | null {
  return safeGet<Record<string, string | number>>(SAVED_SETTINGS_KEY);
}

export function saveSettings(values: Record<string, string | number>) {
  safeSet(SAVED_SETTINGS_KEY, values);
}