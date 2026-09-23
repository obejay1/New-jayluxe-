"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutGrid, Search, User } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { cn } from "@/lib/utils";

const ITEMS = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Shop", href: "/shop", Icon: LayoutGrid },
  { label: "Search", href: "/search", Icon: Search },
  { label: "Wishlist", href: "/wishlist", Icon: Heart },
  { label: "Account", href: "/account", Icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const { slugs } = useWishlist();
  const wishCount = slugs.length;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 backdrop-blur lg:hidden"
      aria-label="Mobile bottom navigation"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ label, href, Icon }) => {
          const active = pathname === href;
          return (
            <li key={label}>
              <Link
                href={href}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] text-[10px] font-medium transition-colors",
                  active ? "text-obsidian" : "text-taupe hover:text-obsidian",
                )}
                aria-current={active ? "page" : undefined}
              >
                {label === "Wishlist" && wishCount > 0 && (
                  <span className="absolute right-1/2 top-1.5 ml-4 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-obsidian">
                    {wishCount > 9 ? "9+" : wishCount}
                  </span>
                )}
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}