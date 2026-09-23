"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Orders are dispatched within 24 hours of confirmation. Delivery takes 2–4 business days to Lagos, Abuja and Port Harcourt, and up to 5 business days to other states. You'll receive tracking updates by email and SMS at every stage.",
  },
  {
    q: "How much is delivery?",
    a: "Delivery is ₦3,500 nationwide, and complimentary on orders over ₦150,000. Express delivery (1–2 days) is available in select cities for an extra fee, shown at checkout.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept debit and credit cards (Visa, Mastercard, Verve), bank transfer and USSD — all processed securely through Paystack or Flutterwave. We never see or store your card details.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. Checkout is 256-bit encrypted, and every payment is verified server-side with our payment provider before an order moves forward. If a payment fails, you are never charged and can safely retry.",
  },
  {
    q: "What is your return policy?",
    a: "You can return unworn, unwashed items in original packaging within 7 days of delivery for a full refund or exchange. Fragrance and beauty items must be unopened for hygiene reasons. Start a return from your account or by contacting us directly.",
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Every order arrives hand-wrapped in our signature ivory paper with a gold ribbon — free. Add a handwritten note during checkout and we'll include it.",
  },
  {
    q: "Can I track my order?",
    a: "Yes. Sign in to your account and open the order for a live timeline, or follow the tracking link sent to your email and phone.",
  },
  {
    q: "What if I receive a damaged or wrong item?",
    a: "We're so sorry if that happens. Contact us on WhatsApp or email within 48 hours with a photo and we'll arrange a replacement or refund as fast as possible.",
  },
  {
    q: "How can I get a discount?",
    a: "Join the Inner Circle (our newsletter) for 10% off your first order and early access to private sales. Occasionally we'll send codes to members — watch your inbox.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
            >
              <span className="font-serif text-lg font-medium">{f.q}</span>
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors", isOpen ? "bg-obsidian text-ivory" : "bg-champagne text-obsidian")}>
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-taupe">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}