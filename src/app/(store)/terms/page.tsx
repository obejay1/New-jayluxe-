import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions that apply to shopping at Jayluexestore.",
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "Who we are",
    body: "Jayluexestore is a luxury lifestyle store based in Lagos, Nigeria. These terms govern your use of our website and any order you place with us.",
  },
  {
    title: "Orders & acceptance",
    body: "Placing an order is an offer to buy; we accept it when we confirm your order by email. We reserve the right to decline or cancel an order in cases of evident pricing error, suspected fraud, or when stock is genuinely unavailable. If we cancel, you'll be refunded in full.",
  },
  {
    title: "Pricing & payment",
    body: "All prices are in Nigerian Naira and include applicable taxes. Payment is taken securely through Paystack or Flutterwave when you complete checkout. We never see or store your card number.",
  },
  {
    title: "Delivery",
    body: "Orders usually reach you within 4 business days across Nigeria. Standard delivery is complimentary over ₦150,000 and charged at ₦3,500 otherwise. We'll share tracking and delivery updates by email and SMS once your order ships.",
  },
  {
    title: "Returns & exchanges",
    body: "You can start a return or exchange within 14 days of receipt. Items must be unworn, unwashed and in their original packaging. Fragrance and beauty items can only be returned if unopened. See our Shipping & Returns page for the full rundown.",
  },
  {
    title: "Product accuracy",
    body: "We photograph every piece carefully and describe it honestly, but monitor colours may differ very slightly in real life. If an item isn't what you expected, the return window has your back.",
  },
  {
    title: "Promotions",
    body: "Promo codes are single-use per order, can't be exchanged for cash, and apply to eligible items only unless stated otherwise. Discount codes like JAYLUXE10 welcome offer are applied at checkout before delivery fees.",
  },
  {
    title: "Our rights",
    body: "Jayluexestore and our content, photography and branding belong to us. You may not copy, scrape or republish our product images or copy without written permission.",
  },
];

export default function TermsPage() {
  return (
    <div className="container-store py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Fair and square</p>
        <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Terms of service</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-taupe">
          Last updated: September 2026 · By shopping with us, you agree to these terms.
        </p>
      </div>

      <div className="mt-10 max-w-2xl space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="font-serif text-xl font-medium">{s.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-taupe">{s.body}</p>
          </section>
        ))}
        <p className="border-t border-line pt-6 text-sm leading-relaxed text-taupe">
          Questions about these terms? Email{" "}
          <a href={`mailto:${site.email}`} className="text-obsidian underline underline-offset-4 hover:text-gold">
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}