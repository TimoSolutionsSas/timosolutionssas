import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export function BackToTop() {
  const visible = useScrollPosition(400);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Volver arriba"
          className="focus-ring fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-white shadow-card-hover transition-colors hover:bg-primary md:bottom-8"
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
