"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Lock, ShieldCheck, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { PromoField } from "@/components/cart/PromoField";
import { cn } from "@/lib/utils";

type Step = "contact" | "delivery" | "payment";

const STATES = ["Lagos", "Abuja", "Ogun", "Rivers", "Kano", "Oyo", "Delta", "Anambra", "Other"];

const PAYMENT_METHODS = [
  { id: "card", label: "Card", note: "Visa, Mastercard, Verve" },
  { id: "transfer", label: "Bank transfer", note: "Instant NGN transfer" },
  { id: "ussd", label: "USSD", note: "Pay from any phone" },
] as const;

export function CheckoutView() {
  const { lines, subtotal, count, discount, promo } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<Step>("contact");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [failed, setFailed] = useState(false);

  const [contact, setContact] = useState({ email: "", phone: "" });
  const [delivery, setDelivery] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "Lagos",
    instructions: "",
    method: "standard",
  });
  const [payment, setPayment] = useState<{ method: (typeof PAYMENT_METHODS)[number]["id"]; cardNumber: string; expiry: string; cvv: string; name: string; gateway: "paystack" | "flutterwave" }>({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    gateway: "paystack",
  });

  const free = subtotal >= site.freeDeliveryThreshold;
  const standardFee = free ? 0 : site.deliveryFee;
  const expressFee = free ? 0 : site.deliveryFee * 2.5;
  const deliveryFee = delivery.method === "express" ? expressFee : standardFee;
  const total = subtotal - discount + deliveryFee;

  const validateContact = () => {
    const errs: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = "Enter a valid email address.";
    if (contact.phone.replace(/\D/g, "").length < 10) errs.phone = "Enter a valid phone number.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateDelivery = () => {
    const errs: Record<string, string> = {};
    if (!delivery.firstName.trim()) errs.firstName = "Required";
    if (!delivery.lastName.trim()) errs.lastName = "Required";
    if (delivery.address.trim().length < 5) errs.address = "Enter a delivery address.";
    if (!delivery.city.trim()) errs.city = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs: Record<string, string> = {};
    if (!payment.name.trim()) errs.payName = "Required";
    if (payment.method === "card") {
      if (payment.cardNumber.replace(/\s/g, "").length < 12) errs.cardNumber = "Enter a valid card number.";
      if (!/^\d{2}\s?\/\s?\d{2}$/.test(payment.expiry)) errs.expiry = "MM/YY";
      if (payment.cvv.replace(/\D/g, "").length < 3) errs.cvv = "3–4 digits";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (step === "contact" && validateContact()) setStep("delivery");
    else if (step === "delivery" && validateDelivery()) setStep("payment");
  };

  const pay = () => {
    if (!validatePayment()) return;
    setProcessing(true);
    setFailed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.setTimeout(() => {
      setFailed(true);
      setProcessing(false);
    }, 1800);
  };

  const retry = () => {
    setFailed(false);
    setProcessing(true);
    window.setTimeout(() => router.push("/checkout/success?order=JLX-2026-0041"), 1400);
  };

  if (lines.length === 0 && !processing) {
    return (
      <div className="container-store flex flex-col items-center justify-center py-24 text-center">
        <ShieldCheck className="h-10 w-10 text-taupe" />
        <h1 className="mt-5 font-serif text-3xl font-medium">Nothing to check out</h1>
        <p className="mt-3 max-w-sm text-[15px] text-taupe">
          Your bag is empty. Add a few pieces first, then come back to checkout.
        </p>
        <Button href="/shop" className="mt-8">Shop the collection</Button>
      </div>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: "contact", label: "Contact" },
    { id: "delivery", label: "Delivery" },
    { id: "payment", label: "Payment" },
  ];
  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="container-store py-8 sm:py-12">
      {failed && (
        <div className="mb-8 rounded-lg border border-error/30 bg-error/5 p-5" role="alert">
          <h2 className="flex items-center gap-2 font-medium text-error">
            <Lock className="h-4 w-4" /> Payment didn&apos;t go through
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-taupe">
            Your card was not charged. This can happen with a declined or expired card, or a
            network timeout. Please try again or choose a different payment method.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={retry} isPending={processing}>
              Try again
            </Button>
            <Button variant="outline" onClick={() => setFailed(false)}>
              Edit payment details
            </Button>
          </div>
        </div>
      )}

      {processing && (
        <div className="mb-8 rounded-lg border border-line bg-white p-6 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-line border-t-obsidian" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-xl font-medium">Contacting your bank…</h2>
          <p className="mt-1.5 text-sm text-taupe">Please don&apos;t close this window or press back.</p>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Secure checkout</p>
          <h1 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">Almost yours</h1>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-taupe">
          <Lock className="h-3.5 w-3.5" /> 256-bit encrypted
        </span>
      </div>

      <ol className="mb-8 flex items-center gap-2 text-xs font-medium sm:gap-3" aria-label="Checkout progress">
        {steps.map((s, i) => (
          <li key={s.id} className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => i < stepIndex && setStep(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors",
                i === stepIndex
                  ? "bg-obsidian text-ivory"
                  : i < stepIndex
                    ? "bg-success/10 text-success hover:bg-success/20"
                    : "bg-champagne text-taupe",
              )}
              aria-current={i === stepIndex ? "step" : undefined}
            >
              {i < stepIndex ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              {s.label}
            </button>
            {i < steps.length - 1 && <span className="h-px w-4 bg-line sm:w-8" aria-hidden="true" />}
          </li>
        ))}
      </ol>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          {step === "contact" && (
            <section aria-labelledby="contact-step">
              <h2 className="mb-5 font-serif text-xl font-medium" id="contact-step">Contact details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" id="email" error={errors.email}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                </Field>
                <Field label="Phone" id="phone" error={errors.phone}>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+234 800 000 0000"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                </Field>
              </div>
              <p className="mt-4 text-xs text-taupe">
                Order updates go here. We won&apos;t share your details — ever.
              </p>
            </section>
          )}

          {step === "delivery" && (
            <section aria-labelledby="delivery-step">
              <h2 className="mb-5 font-serif text-xl font-medium" id="delivery-step">Delivery</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" id="firstName" error={errors.firstName}>
                  <Input id="firstName" autoComplete="given-name" value={delivery.firstName} onChange={(e) => setDelivery({ ...delivery, firstName: e.target.value })} />
                </Field>
                <Field label="Last name" id="lastName" error={errors.lastName}>
                  <Input id="lastName" autoComplete="family-name" value={delivery.lastName} onChange={(e) => setDelivery({ ...delivery, lastName: e.target.value })} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Street address" id="address" error={errors.address}>
                    <Input id="address" autoComplete="street-address" placeholder="House no., street, area" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} />
                  </Field>
                </div>
                <Field label="City" id="city" error={errors.city}>
                  <Input id="city" autoComplete="address-level2" value={delivery.city} onChange={(e) => setDelivery({ ...delivery, city: e.target.value })} />
                </Field>
                <Field label="State" id="state">
                  <Select id="state" value={delivery.state} onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}>
                    {STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </Select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Delivery instructions (optional)" id="instructions">
                    <Textarea id="instructions" placeholder="Gate code, landmark, preferred time…" value={delivery.instructions} onChange={(e) => setDelivery({ ...delivery, instructions: e.target.value })} />
                  </Field>
                </div>
              </div>

              <fieldset className="mt-6">
                <legend className="mb-3 text-[13px] font-medium">Delivery method</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <MethodCard
                    active={delivery.method === "standard"}
                    onClick={() => setDelivery({ ...delivery, method: "standard" })}
                    title="Standard"
                    note={`${site.deliveryDays} · ${free ? "Complimentary" : formatPrice(standardFee)}`}
                  />
                  <MethodCard
                    active={delivery.method === "express"}
                    onClick={() => setDelivery({ ...delivery, method: "express" })}
                    title="Express"
                    note={`1–2 days · ${free ? "Complimentary" : formatPrice(expressFee)}`}
                  />
                </div>
              </fieldset>
            </section>
          )}

          {step === "payment" && (
            <section aria-labelledby="payment-step">
              <h2 className="mb-2 font-serif text-xl font-medium" id="payment-step">Payment</h2>
              <fieldset className="mb-6">
                <legend className="mb-3 text-[13px] font-medium">Gateway</legend>
                <div className="grid grid-cols-2 gap-3">
                  <MethodCard active={payment.gateway === "paystack"} onClick={() => setPayment({ ...payment, gateway: "paystack" })} title="Paystack" note="Cards, transfer, USSD" />
                  <MethodCard active={payment.gateway === "flutterwave"} onClick={() => setPayment({ ...payment, gateway: "flutterwave" })} title="Flutterwave" note="Cards, transfer, USSD" />
                </div>
              </fieldset>

              <div className="mb-3 flex gap-3" role="group" aria-label="Payment method">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setPayment({ ...payment, method: m.id })}
                    aria-pressed={payment.method === m.id}
                    className={cn(
                      "flex flex-col items-start gap-0.5 rounded-lg border p-3 text-left transition-all",
                      payment.method === m.id ? "border-obsidian bg-champagne/40" : "border-line bg-white hover:border-obsidian/40",
                    )}
                  >
                    <span className="text-sm font-medium">{m.label}</span>
                    <span className="text-[11px] text-taupe">{m.note}</span>
                  </button>
                ))}
              </div>

              <div className="grid gap-4">
                <Field label="Name on card" id="payName" error={errors.payName}>
                  <Input id="payName" autoComplete="cc-name" value={payment.name} onChange={(e) => setPayment({ ...payment, name: e.target.value })} />
                </Field>
                {payment.method === "card" && (
                  <>
                    <Field label="Card number" id="cardNumber" error={errors.cardNumber}>
                      <Input
                        id="cardNumber"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="0000 0000 0000 0000"
                        value={payment.cardNumber}
                        onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Expiry" id="expiry" error={errors.expiry}>
                        <Input id="expiry" placeholder="MM/YY" autoComplete="cc-exp" value={payment.expiry} onChange={(e) => setPayment({ ...payment, expiry: e.target.value })} />
                      </Field>
                      <Field label="CVV" id="cvv" error={errors.cvv}>
                        <Input id="cvv" inputMode="numeric" placeholder="•••" autoComplete="cc-csc" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} />
                      </Field>
                    </div>
                  </>
                )}
                {payment.method === "transfer" && (
                  <p className="rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-taupe">
                    We&apos;ll show account details on the next screen to complete your instant transfer
                    securely through {payment.gateway === "paystack" ? "Paystack" : "Flutterwave"}.
                  </p>
                )}
                {payment.method === "ussd" && (
                  <p className="rounded-lg border border-line bg-white p-4 text-sm leading-relaxed text-taupe">
                    You&apos;ll receive a USSD code on your phone to confirm the payment.
                  </p>
                )}
              </div>
            </section>
          )}

          <div className="flex items-center justify-between border-t border-line pt-6">
            <button
              onClick={() => (step === "contact" ? router.push("/cart") : setStep(steps[stepIndex - 1].id))}
              className="inline-flex items-center gap-2 text-sm text-taupe transition-colors hover:text-obsidian"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step !== "payment" ? (
              <Button onClick={next}>
                {step === "contact" ? "Continue to delivery" : "Continue to payment"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={pay} size="lg" isPending={processing}>
                <Lock className="h-4 w-4" /> Pay {formatPrice(total)}
              </Button>
            )}
          </div>

          <p className="flex items-center gap-2 text-xs text-taupe">
            <ShieldCheck className="h-4 w-4 text-success" />
            Your payment details are encrypted and never stored on our servers.
          </p>
        </div>

        <OrderSummary
          lines={lines}
          subtotal={subtotal}
          count={count}
          discount={discount}
          promo={promo}
          deliveryFee={deliveryFee}
          total={total}
          free={free}
        />
      </div>
    </div>
  );
}

function MethodCard({ active, onClick, title, note }: { active: boolean; onClick: () => void; title: string; note: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-between rounded-lg border p-3.5 transition-all",
        active ? "border-obsidian bg-champagne/40" : "border-line bg-white hover:border-obsidian/40",
      )}
    >
      <span>
        <span className="block text-sm font-medium">{title}</span>
        <span className="mt-0.5 block text-[11px] text-taupe">{note}</span>
      </span>
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
          active ? "border-obsidian bg-obsidian" : "border-line",
        )}
      >
        {active && <Check className="h-2.5 w-2.5 text-ivory" />}
      </span>
    </button>
  );
}

function OrderSummary({
  lines,
  subtotal,
  count,
  discount,
  promo,
  deliveryFee,
  total,
  free,
}: {
  lines: ReturnType<typeof useCart>["lines"];
  subtotal: number;
  count: number;
  discount: number;
  promo: string | null;
  deliveryFee: number;
  total: number;
  free: boolean;
}) {
  const visibleLines = useMemo(() => lines.slice(0, 3), [lines]);
  const hidden = Math.max(0, count - visibleLines.reduce((s, l) => s + l.quantity, 0));

  return (
    <aside className="h-fit rounded-xl border border-line bg-white p-6 lg:sticky lg:top-24">
      <h2 className="font-serif text-xl font-medium">
        Order summary{" "}
        <span className="text-sm text-taupe">
          ({count} {count === 1 ? "item" : "items"})
        </span>
      </h2>
      <ul className="mt-5 space-y-4">
        {visibleLines.map((l) => (
          <li key={l.key} className="flex gap-3">
            <div className="relative aspect-[4/5] w-12 shrink-0 overflow-hidden rounded-md bg-champagne">
              <Image src={l.image} alt={l.name} fill sizes="48px" className="object-cover" />
            </div>
            <div className="flex flex-1 justify-between gap-2 text-sm">
              <div>
                <p className="font-medium">{l.name}</p>
                {l.optionLabels && <p className="text-xs text-taupe">{l.optionLabels}</p>}
                <p className="text-xs text-taupe">Qty {l.quantity}</p>
              </div>
              <p className="font-medium">{formatPrice(l.price * l.quantity)}</p>
            </div>
          </li>
        ))}
        {visibleLines.length === 0 && (
          <li className="text-sm text-taupe">
            <Link href="/shop" className="underline underline-offset-4 hover:text-obsidian">
              Add items to your bag
            </Link>
          </li>
        )}
      </ul>
      <PromoField className="mt-5" />
      <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
        <div className="flex justify-between">
          <dt className="text-taupe">Subtotal</dt>
          <dd className="font-medium">{formatPrice(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <dt>Promo ({promo})</dt>
            <dd className="font-medium">− {formatPrice(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="flex items-center gap-1.5 text-taupe">
            Delivery <Truck className="h-3.5 w-3.5" /> {free && <span className="text-success">free</span>}
          </dt>
          <dd className="font-medium">{deliveryFee === 0 ? "Complimentary" : formatPrice(deliveryFee)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base">
          <dt className="font-medium">Total</dt>
          <dd className="font-serif text-xl font-medium">{formatPrice(total)}</dd>
        </div>
      </dl>
      {hidden > 0 && <p className="mt-3 text-xs text-taupe">+ {hidden} more in your bag</p>}
    </aside>
  );
}