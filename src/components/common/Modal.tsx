import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { cn } from "@/utils/cn";
import type { ModalProps } from "@/interfaces/component-props";

const SIZE_CLASSES: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  // createPortal necesita `document`, que no existe durante el
  // pre-renderizado a HTML estático del build. El portal solo se monta ya en
  // el navegador; en el HTML generado el modal simplemente no aparece, que es
  // lo correcto: nace cerrado.
  const [enNavegador, setEnNavegador] = useState(false);
  useEffect(() => setEnNavegador(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!enNavegador) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-secondary/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative w-full rounded-2xl bg-background p-6 shadow-card-hover",
              SIZE_CLASSES[size]
            )}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="focus-ring absolute right-4 top-4 rounded-full p-2 text-foreground-muted hover:bg-background-alt"
            >
              <FiX size={20} />
            </button>
            {title && (
              <h3 className="mb-4 pr-8 font-display text-xl font-semibold">
                {title}
              </h3>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
