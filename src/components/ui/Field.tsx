import { forwardRef } from "react";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldWrap = "flex flex-col gap-1.5";

export function Field({
  label,
  id,
  hint,
  error,
  children,
}: {
  label: string;
  id: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={fieldWrap}>
      <label htmlFor={id} className="text-[13px] font-medium tracking-wide text-obsidian">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs leading-relaxed text-taupe">{hint}</p>
      )}
      {error && (
        <p role="alert" className="text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}

const baseFieldClasses =
  "h-11 w-full rounded-md border border-line bg-white px-3.5 text-sm text-obsidian placeholder:text-taupe/70 transition-colors focus:border-gold focus:outline-none disabled:cursor-not-allowed disabled:bg-champagne/50";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(baseFieldClasses, className)} {...props} />;
  },
);

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(baseFieldClasses, "h-auto min-h-28 py-2.5 leading-relaxed", className)}
      {...props}
    />
  );
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select ref={ref} className={cn(baseFieldClasses, "appearance-none pr-9", className)} {...props}>
        {children}
      </select>
    );
  },
);

export function QuantityInput({
  value,
  onChange,
  min = 1,
  max = 99,
  id,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  id?: string;
  label?: string;
}) {
  return (
    <div
      className="inline-flex h-11 items-center rounded-full border border-line bg-white"
      role="group"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-full w-10 items-center justify-center rounded-l-full text-lg text-taupe transition-colors hover:text-obsidian disabled:opacity-40"
        aria-label={label ? `Decrease ${label}` : "Decrease quantity"}
        disabled={value <= min}
      >
        −
      </button>
      <output
        id={id}
        className="w-10 text-center text-sm font-medium tabular-nums"
        aria-live="polite"
      >
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-full w-10 items-center justify-center rounded-r-full text-lg text-taupe transition-colors hover:text-obsidian disabled:opacity-40"
        aria-label={label ? `Increase ${label}` : "Increase quantity"}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}