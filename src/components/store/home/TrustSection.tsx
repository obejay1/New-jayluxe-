import { LockKeyhole, PackageOpen, Truck, Headset } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Motion";

const TRUST = [
  {
    Icon: LockKeyhole,
    title: "Secure payments",
    body: "Encrypted checkout with trusted Nigerian providers. Your details stay yours.",
  },
  {
    Icon: PackageOpen,
    title: "Careful packaging",
    body: "Every order is hand-wrapped and gift-ready. Because presentation matters.",
  },
  {
    Icon: Truck,
    title: "Reliable delivery",
    body: "Dispatched within 24 hours, tracked on every leg, across all 36 states.",
  },
  {
    Icon: Headset,
    title: "Human support",
    body: "Real people on WhatsApp and email — before your order, and long after.",
  },
];

export function TrustSection() {
  return (
    <section className="border-y border-line bg-ivory py-14 sm:py-16" aria-label="Why shop with us">
      <div className="container-store">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {TRUST.map(({ Icon, title, body }) => (
            <StaggerItem key={title} className="text-center lg:text-left">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-champagne text-obsidian lg:mx-0">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg font-medium">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-taupe">{body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}