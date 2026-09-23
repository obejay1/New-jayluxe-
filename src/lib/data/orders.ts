import type { Product } from "@/types";
import { products } from "@/lib/data/products";
import { formatDateTime } from "@/lib/site";

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "paid" | "pending" | "refunded";

export type CustomerOrderItem = {
  productSlug: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  lineTotal: number;
};

export type CustomerOrder = {
  id: string;
  orderNumber: string;
  placedAt: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  items: CustomerOrderItem[];
  deliveryAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  deliveryMethod: string;
  timeline: { label: string; at: string; done: boolean }[];
};

type CustomerOrderInput = Omit<CustomerOrder, "subtotal" | "total">;

const bySlug = (slug: string): Product => {
  const p = products.find((x) => x.slug === slug);
  if (!p) throw new Error(`missing product ${slug}`);
  return p;
};

const item = (slug: string, qty: number, priceBump = 0): CustomerOrderItem => {
  const p = bySlug(slug);
  const price = (p.salePrice ?? p.price) + priceBump;
  return {
    productSlug: p.slug,
    name: p.name,
    sku: p.sku,
    price,
    quantity: qty,
    lineTotal: price * qty,
  };
};

const inputOrders: CustomerOrderInput[] = [
  {
    id: "o1",
    orderNumber: "JLX-2026-0041",
    placedAt: "2026-09-18",
    status: "processing",
    paymentStatus: "paid",
    deliveryFee: 3500,
    discount: 0,
    items: [item("pearl-drop-earrings", 1), item("palermo-eau-de-parfum", 1, 1200)],
    deliveryAddress: {
      name: "Amara Okafor",
      phone: "+234 803 000 0000",
      address: "12 Remi Olowude Street, Lekki Phase 1",
      city: "Lekki",
      state: "Lagos",
    },
    deliveryMethod: "Standard (2–4 days)",
    timeline: [
      { label: "Order placed", at: formatDateTime("2026-09-18"), done: true },
      { label: "Payment confirmed", at: formatDateTime("2026-09-18"), done: true },
      { label: "Dispatch", at: "Within 24 hours", done: false },
      { label: "Delivery", at: "Est. 2–4 days", done: false },
    ],
  },
  {
    id: "o2",
    orderNumber: "JLX-2026-0032",
    placedAt: "2026-08-30",
    status: "delivered",
    paymentStatus: "paid",
    deliveryFee: 0,
    discount: 0,
    items: [item("the-ivory-trench", 1)], // 145000 → free delivery
    deliveryAddress: {
      name: "Amara Okafor",
      phone: "+234 803 000 0000",
      address: "12 Remi Olowude Street, Lekki Phase 1",
      city: "Lekki",
      state: "Lagos",
    },
    deliveryMethod: "Standard (2–4 days)",
    timeline: [
      { label: "Order placed", at: formatDateTime("2026-08-30"), done: true },
      { label: "Payment confirmed", at: formatDateTime("2026-08-30"), done: true },
      { label: "Dispatched", at: formatDateTime("2026-08-31"), done: true },
      { label: "Delivered", at: formatDateTime("2026-09-02"), done: true },
    ],
  },
  {
    id: "o3",
    orderNumber: "JLX-2026-0021",
    placedAt: "2026-08-03",
    status: "delivered",
    paymentStatus: "paid",
    deliveryFee: 3500,
    discount: 0,
    items: [item("ivory-ribbed-set", 1), item("amber-glow-bath-set", 1, 800)],
    deliveryAddress: {
      name: "Amara Okafor",
      phone: "+234 803 000 0000",
      address: "12 Remi Olowude Street, Lekki Phase 1",
      city: "Lekki",
      state: "Lagos",
    },
    deliveryMethod: "Standard (2–4 days)",
    timeline: [
      { label: "Order placed", at: formatDateTime("2026-08-03"), done: true },
      { label: "Payment confirmed", at: formatDateTime("2026-08-03"), done: true },
      { label: "Dispatched", at: formatDateTime("2026-08-04"), done: true },
      { label: "Delivered", at: formatDateTime("2026-08-06"), done: true },
    ],
  },
];

export const customerOrders: CustomerOrder[] = inputOrders.map((o) => {
  const subtotal = o.items.reduce((s, i) => s + i.lineTotal, 0);
  return { ...o, subtotal, total: subtotal - o.discount + o.deliveryFee };
});

export const getOrderByNumber = (number: string) =>
  customerOrders.find((o) => o.orderNumber.toLowerCase() === number.toLowerCase());