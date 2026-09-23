"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, LayoutDashboard, Package, Settings, Tags } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard, exact: true },
  { label: "Products", href: "/admin/products", Icon: Package },
  { label: "Orders", href: "/admin/orders", Icon: ClipboardList },
  { label: "Categories", href: "/admin/categories", Icon: Tags },
  { label: "Settings", href: "/admin/settings", Icon: Settings, exact: true },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <Link href="/admin" className="flex items-center gap-2.5 px-6 pt-6 pb-8">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold text-sm font-bold text-obsidian">
          J
        </span>
        <span>
          <span className="block font-serif text-base font-medium leading-none">jayluexestore</span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-ivory/50">
            admin
          </span>
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
        {LINKS.map(({ label, href, Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-colors",
                active
                  ? "bg-ivory/10 font-medium text-gold"
                  : "text-ivory/60 hover:bg-ivory/5 hover:text-ivory",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-ivory/10 p-4">
        <div className="rounded-lg bg-ivory/5 px-3.5 py-3">
          <p className="text-[11px] font-medium text-ivory/80">Signed in as</p>
          <p className="mt-0.5 text-xs font-semibold text-ivory">obejay1</p>
          <p className="mt-1 text-[10px] leading-relaxed text-ivory/50">
            Demo mode — API pending. Changes persist locally in this browser.
          </p>
        </div>
      </div>
    </div>
  );
}