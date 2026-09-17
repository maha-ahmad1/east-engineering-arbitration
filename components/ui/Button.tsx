import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "onDark";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] px-6 min-h-[48px] text-[0.975rem] font-semibold transition-all duration-200 hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink shadow-[0_6px_20px_-8px_rgba(204,153,51,0.7)] hover:bg-gold-lt hover:shadow-[0_10px_26px_-8px_rgba(204,153,51,0.8)]",
  ghost:
    "border border-line bg-white text-ink hover:border-gold hover:bg-gold-soft/40",
  onDark:
    "border border-white/20 bg-white/5 text-white hover:border-gold hover:bg-white/10",
};

type Props = ComponentProps<"a"> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: Props) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}
