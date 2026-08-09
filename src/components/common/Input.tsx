import { forwardRef, useId } from "react";
import { cn } from "@/utils/cn";
import type { InputProps } from "@/interfaces/component-props";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "focus-ring w-full rounded-xl border bg-background px-4 py-3 text-foreground placeholder:text-foreground-muted transition-colors",
            error ? "border-error" : "border-border focus-visible:border-primary",
            className
          )}
          {...rest}
        />
        {error ? (
          <p id={`${inputId}-error`} className="text-sm text-error">
            {error}
          </p>
        ) : hint ? (
          <p className="text-sm text-foreground-muted">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
