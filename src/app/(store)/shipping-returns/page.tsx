import type { Metadata } from "next";
import Link from "next/link";
import { Truck, RefreshCcw, PackageOpen, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description:
    "Delivery times and fees across Nigeria, plus our 7-day returns policy at Jayluexestore.",
};

const SECTIONS = [
  {
    Icon: Truck,
    title: "Shipping",
    body: [
      "Orders are dispatched within 24 hours of confirmation (Mon–Sat).",
      `Standard delivery takes ${site.deliveryDays} to Lagos, Abuja and Port Harcourt, and up to 5 business days to other states.`,
      `Express delivery (1–2 days) is available in select cities — choose it at checkout.`,
      `Delivery is ₦3,500 nationwide and complimentary on orders over ₦150,000.`,
      "You'll receive tracking updates by email and SMS on every leg of the journey.",
    ],
  },
  {
    Icon: RefreshCcw,
    title: "Returns & exchanges",
    body: [
      "You have 7 days from delivery to return or exchange any item.",
      "Items must be unworn, unwashed, unused and in original packaging with tags attached.",
      "Fragrance and beauty products must be unopened for hygiene reasons.",
      "Refunds return to your original payment method within 3–5 business days of approval.",
      "To start a return, sign in → Orders → the order in question, or message us on WhatsApp.",
    ],
  },
  {
    Icon: PackageOpen,
    title: "Packaging & gifts",
    body: [
      "Every order arrives hand-wrapped in signature ivory paper with a gold ribbon — free.",
      "Add a handwritten note at checkout and we'll write it out for you.",
      "Gift recipients never see prices — your private drop includes a discreet price-free invoice we keep out of sight.",
    ],
  },
  {
    Icon: ShieldCheck,
    title: "Quality promise",
    body: [
      "If something arrives damaged or not as described, we'll replace it or refund you — your choice — within 48 hours.",
      "Every piece passes our hands before dispatch. If it wouldn't feel special to us, it doesn't ship.",
      "Our team is on WhatsApp every day, including for after-sale questions.",
    ],
  },
];

export default function ShippingReturnsPage() {
  return (
    <div className="container-store py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Policies</p>
        <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Shipping & returns</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-taupe">
          Simple, human policies. If anything isn&apos;t clear, we&apos;re one message away.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {SECTIONS.map(({ Icon, title, body }) => (
          <section key={title} className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne">
              <Icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 font-serif text-xl font-medium">{title}</h2>
            <ul className="mt-4 space-y-2.5">
              {body.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-taupe">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-obsidian p-6 text-ivory sm:p-8">
        <div>
          <h2 className="font-serif text-xl font-medium">Still wondering about something?</h2>
          <p className="mt-1 text-sm text-ivory/80">
            Reply on WhatsApp or email {site.email} — a human answers fast.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center rounded-full bg-ivory px-6 text-sm font-medium text-obsidian transition-colors hover:bg-gold"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}