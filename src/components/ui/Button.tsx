import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-obsidian text-ivory hover:bg-gold hover:text-obsidian focus-visible:outline-gold",
  secondary:
    "bg-champagne text-obsidian hover:bg-blush hover:text-ivory focus-visible:outline-blush",
  outline:
    "border border-obsidian/25 bg-transparent text-obsidian hover:border-obsidian hover:bg-obsidian hover:text-ivory",
  ghost: "bg-transparent text-obsidian hover:bg-champagne",
  danger: "bg-error text-white hover:bg-error/90",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  isPending?: boolean;
  children: ReactNode;
};

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

type LinkButtonProps = {
  href: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href">;

type ButtonProps = CommonProps & (NativeButtonProps | LinkButtonProps);

export function BaseButtonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-wide transition-all duration-300 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", isPending, href, className, children, ...props },
  ref,
) {
  const classes = BaseButtonClasses({ variant, size, className });

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={isPending}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={isPending}
      aria-busy={isPending}
      {...(props as NativeButtonProps)}
    >
      {isPending && <Spinner />}
      {children}
    </button>
  );
});

export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4 animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}