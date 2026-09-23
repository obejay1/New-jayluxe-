"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LayoutDashboard, Package, ClipboardList, Tags, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const MOBILE_LINKS = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard, exact: true },
  { label: "Products", href: "/admin/products", Icon: Package },
  { label: "Orders", href: "/admin/orders", Icon: ClipboardList },
  { label: "Categories", href: "/admin/categories", Icon: Tags },
  { label: "Settings", href: "/admin/settings", Icon: Settings, exact: true },
];

export function AdminTopbar() {
  const pathname = usePathname();

  return (
    <div className="border-b border-line bg-ivory/95 backdrop-blur">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <Link href="/admin" className="flex items-center gap-2 lg:hidden">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-gold text-[11px] font-bold text-obsidian">
            J
          </span>
          <span className="font-serif text-sm font-medium">jayluexestore admin</span>
        </Link>
        <span className="hidden text-sm text-taupe lg:block">Store management</span>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-full border border-obsidian/25 px-3.5 py-1.5 text-[13px] font-medium transition-colors hover:border-obsidian hover:bg-obsidian hover:text-ivory"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          View store
        </Link>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-line px-2 py-1.5 lg:hidden"
        aria-label="Admin"
      >
        {MOBILE_LINKS.map(({ label, href, Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-[13px] transition-colors",
                active
                  ? "bg-obsidian text-ivory"
                  : "text-taupe hover:bg-champagne hover:text-obsidian",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}