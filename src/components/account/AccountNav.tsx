"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Heart, MapPin, ShieldCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Profile", href: "/account", Icon: User },
  { label: "Orders", href: "/account/orders", Icon: ClipboardList },
  { label: "Wishlist", href: "/account/wishlist", Icon: Heart },
  { label: "Addresses", href: "/account/addresses", Icon: MapPin },
  { label: "Security", href: "/account/security", Icon: ShieldCheck },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-1.5" aria-label="Account">
      {LINKS.map(({ label, href, Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-md px-3 py-2.5 text-sm transition-colors",
              active ? "bg-obsidian text-ivory" : "text-taupe hover:bg-champagne hover:text-obsidian",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}