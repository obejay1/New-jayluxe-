import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  const orderNumber = order ?? "JLX-2026-0041";

  return (
    <div className="container-store flex flex-col items-center py-16 text-center sm:py-24">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
        <CheckCircle2 className="h-10 w-10 text-success" />
      </div>
      <h1 className="mt-6 font-serif text-3xl font-medium sm:text-4xl">Thank you — it&apos;s on its way</h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-taupe">
        Your order has been confirmed and paid. A receipt and delivery updates are on their way to
        your inbox and phone.
      </p>

      <div className="mt-8 w-full max-w-md rounded-xl border border-line bg-white p-6 text-left">
        <dl className="space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-taupe">Order number</dt>
            <dd className="font-medium tabular-nums">{orderNumber}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-taupe">Payment</dt>
            <dd className="inline-flex items-center gap-1.5 font-medium text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> Paid
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-taupe">Delivery estimate</dt>
            <dd className="font-medium">{site.deliveryDays}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-taupe">Updates</dt>
            <dd className="font-medium">Email + SMS</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <Link
          href="/account/orders"
          className="inline-flex h-11 items-center rounded-full bg-obsidian px-7 text-sm font-medium text-ivory transition-all duration-300 hover:bg-gold hover:text-obsidian"
        >
          Track this order
        </Link>
        <Link href="/shop" className="text-sm text-taupe underline-offset-4 hover:text-obsidian hover:underline">
          Continue shopping
        </Link>
      </div>

      <p className="mt-10 max-w-md text-xs leading-relaxed text-taupe">
        Every order is hand-wrapped and gift-ready in our signature ivory paper. If you need
        anything at all, we&apos;re on WhatsApp and email — {site.email}.
      </p>
    </div>
  );
}