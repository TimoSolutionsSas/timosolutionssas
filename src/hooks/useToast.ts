import { createContext, useContext } from "react";
import type { ToastItem } from "@/interfaces/component-props";

export interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (message: string, variant?: ToastItem["variant"]) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return ctx;
}
