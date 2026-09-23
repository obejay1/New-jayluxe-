import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
        {accent && (
          <span
            className={cn(
              "text-[11px] font-semibold",
              accent.startsWith("-") ? "text-error" : "text-success",
            )}
          >
            {accent}
          </span>
        )}
      </div>
      <p className="mt-4 font-serif text-2xl font-medium tracking-tight">{value}</p>
      <p className="mt-1 text-[13px] text-taupe">{label}</p>
      {sub && <p className="mt-2 text-xs leading-relaxed text-taupe">{sub}</p>}
    </div>
  );
}