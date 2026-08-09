import { cn } from "@/utils/cn";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<LoaderProps["size"]>, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function Loader({ size = "md", className }: LoaderProps) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={cn(
        "animate-spin rounded-full border-border border-t-primary",
        SIZE_CLASSES[size],
        className
      )}
    />
  );
}
