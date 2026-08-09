import { forwardRef } from "react";
import { FiLoader } from "react-icons/fi";
import { cn } from "@/utils/cn";
import type { ButtonProps } from "@/interfaces/component-props";

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-card hover:shadow-card-hover",
  secondary: "bg-secondary text-white hover:bg-secondary/90",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
  ghost: "bg-transparent text-foreground hover:bg-background-alt",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-card",
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-sm px-4 py-2 gap-1.5",
  md: "text-base px-6 py-3 gap-2",
  lg: "text-lg px-8 py-4 gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "focus-ring inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {isLoading ? (
          <FiLoader className="animate-spin" aria-hidden />
        ) : (
          icon && iconPosition === "left" && icon
        )}
        <span>{children}</span>
        {!isLoading && icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";
