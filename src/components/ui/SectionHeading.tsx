import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl leading-tight font-medium text-obsidian sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className={cn("max-w-xl text-[15px] leading-relaxed text-taupe", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
      {action}
    </div>
  );
}