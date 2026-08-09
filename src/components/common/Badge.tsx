import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "accent" | "success" | "error" | "muted";
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent",
  success: "bg-success/15 text-success",
  error: "bg-error/15 text-error",
  muted: "bg-background-alt text-foreground-muted",
};

export function Badge({ children, variant = "primary", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
