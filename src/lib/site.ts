export const site = {
  name: "Jayluexestore",
  tagline: "Luxury lifestyle store for the modern woman",
  currency: "NGN",
  currencySymbol: "₦",
  email: "care@jayluxestore.com",
  phone: "+234 800 000 0000",
  whatsapp: "+2348000000000",
  instagram: "https://instagram.com/jayluxestore",
  tiktok: "https://tiktok.com/@jayluxestore",
  address: "12 Remi Olowude Street, Lekki Phase 1, Lagos, Nigeria",
  freeDeliveryThreshold: 150000,
  deliveryFee: 3500,
  deliveryDays: "2–4 business days",
};

export function formatPrice(value: number): string {
  return `${site.currencySymbol}${new Intl.NumberFormat("en-NG").format(value)}`;
}

export function formatPriceCompact(value: number): string {
  if (value >= 1000000) return `${site.currencySymbol}${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${site.currencySymbol}${(value / 1000).toFixed(0)}k`;
  return formatPrice(value);
}

export function formatDateTime(value: string | Date): string {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}