import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "blush",
  className,
}: {
  children: React.ReactNode;
  tone?: "blush" | "gold" | "obsidian" | "ivory" | "success" | "error";
  className?: string;
}) {
  const tones = {
    blush: "bg-blush/15 text-blush",
    gold: "bg-gold/15 text-gold",
    obsidian: "bg-obsidian text-ivory",
    ivory: "bg-ivory text-obsidian border border-line",
    success: "bg-success/10 text-success",
    error: "bg-error/10 text-error",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Rating({ value, className }: { value: number; className?: string }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(value));
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-sm", className)}
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {stars.map((filled, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={cn("h-3.5 w-3.5", filled ? "fill-gold text-gold" : "fill-line text-line")}
          aria-hidden="true"
        >
          <path d="M10 1l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.3l-5.2 2.8 1-5.8L1.5 7.2l5.9-.9L10 1z" />
        </svg>
      ))}
    </span>
  );
}

export function BadgeFor({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const tone = label.toLowerCase().includes("sale")
    ? "gold"
    : label.toLowerCase().includes("gone") || label.toLowerCase().includes("limited")
      ? "error"
      : "obsidian";
  return <Badge tone={tone} className={className}>{label}</Badge>;
}