import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "cyan" | "outline" | "ghost" | "glass";
  size?: "sm" | "default" | "lg" | "icon";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const baseStyles =
      "relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "h-9 px-4 text-xs tracking-wider uppercase",
      default: "h-11 px-6 text-sm tracking-wider uppercase",
      lg: "h-13 px-8 text-base tracking-wider uppercase font-semibold",
      icon: "h-10 w-10 p-0 rounded-full",
    };

    const variantStyles = {
      primary:
        "bg-neutral-100 text-neutral-950 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]",
      gold:
        "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-bold hover:brightness-110 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]",
      cyan:
        "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:brightness-110 shadow-[0_0_25px_rgba(6,182,212,0.3)]",
      outline:
        "border border-white/20 bg-transparent text-neutral-200 hover:bg-white/10 hover:border-white/40",
      ghost:
        "bg-transparent text-neutral-300 hover:bg-white/5 hover:text-white",
      glass:
        "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-amber-500/40",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
