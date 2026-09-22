import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import { ToastContext } from "@/hooks/useToast";
import type { ToastItem } from "@/interfaces/component-props";
import { cn } from "@/utils/cn";

const ICONS: Record<ToastItem["variant"], ReactNode> = {
  success: <FiCheckCircle className="text-success" size={20} />,
  error: <FiAlertCircle className="text-error" size={20} />,
  info: <FiInfo className="text-primary" size={20} />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // El sitio se pre-renderiza a HTML estático en el build (ver
  // scripts/prerender.mjs) y allí no existe `document`. createPortal se
  // llamaría en cada render y rompería ese paso, así que el portal solo se
  // monta una vez que estamos en el navegador.
  const [enNavegador, setEnNavegador] = useState(false);
  useEffect(() => setEnNavegador(true), []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastItem["variant"] = "info") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, variant }]);
      setTimeout(() => dismissToast(id), 5000);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({ toasts, showToast, dismissToast }),
    [toasts, showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {enNavegador &&
        createPortal(
          <div className="fixed bottom-6 right-6 z-[110] flex w-[min(360px,calc(100vw-3rem))] flex-col gap-3">
            <AnimatePresence>
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40 }}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border border-border bg-background p-4 shadow-card-hover",
                  )}
                >
                  {ICONS[toast.variant]}
                  <p className="flex-1 text-sm text-foreground">
                    {toast.message}
                  </p>
                  <button
                    onClick={() => dismissToast(toast.id)}
                    aria-label="Cerrar notificación"
                    className="focus-ring rounded-full p-1 text-foreground-muted hover:bg-background-alt"
                  >
                    <FiX size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}
