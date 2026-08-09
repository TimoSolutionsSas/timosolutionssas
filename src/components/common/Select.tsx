import { forwardRef, useId } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/utils/cn";
import type { SelectProps } from "@/interfaces/component-props";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, id, className, ...rest }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            aria-invalid={Boolean(error)}
            className={cn(
              "focus-ring w-full appearance-none rounded-xl border bg-background px-4 py-3 pr-10 text-foreground transition-colors",
              error ? "border-error" : "border-border focus-visible:border-primary",
              className
            )}
            {...rest}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FiChevronDown
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted"
            aria-hidden
          />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
