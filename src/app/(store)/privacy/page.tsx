import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Jayluexestore collects, uses and protects your personal information.",
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "What we collect",
    body: "We collect only what we need to serve you: your name, delivery address, phone number, email address and payment confirmation details when you place an order. We never ask for or store your full card number or CVV — card payments are handled directly by our payment providers (Paystack and Flutterwave).",
  },
  {
    title: "How we use it",
    body: "Your details are used to process and deliver your orders, keep you updated on delivery status, respond to your enquiries, and — only if you opt in — share early access and private sale invitations.",
  },
  {
    title: "Cookies & local storage",
    body: "We use browser storage to remember your shopping bag and wishlist between visits, and minimal cookies to keep the store running smoothly. We don't sell your data, and we don't run invasive tracking or advertising networks.",
  },
  {
    title: "Who we share it with",
    body: "We share the minimum necessary with delivery partners (your name and address), our payment providers (to authorise your payment), and — only if you contact us for support — our WhatsApp and email inbox. Nobody else, ever.",
  },
  {
    title: "How we protect it",
    body: "All traffic to jayluxestore.com is encrypted in transit. Access to customer data is limited to the small team behind the store, on a need-to-know basis, and is never stored on public or shared servers.",
  },
  {
    title: "Your rights",
    body: "You can ask us what we hold about you, correct it, or request deletion at any time by emailing care@jayluxestore.com. We'll respond within 48 hours.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-store py-12 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">The fine print, honestly</p>
        <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">Privacy policy</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-taupe">
          Last updated: September 2026 · {site.name}, {site.address}
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
          Questions about this policy? Email{" "}
          <a href={`mailto:${site.email}`} className="text-obsidian underline underline-offset-4 hover:text-gold">
            {site.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}