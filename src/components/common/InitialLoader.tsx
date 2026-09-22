import { motion } from "framer-motion";
import { assetUrl } from "@/utils/assetUrl";

export function InitialLoader() {
  return (
    <motion.div
      // El pre-renderizado busca este atributo para saber si una ruta se
      // quedó en el fallback de <Suspense> en vez de renderizar su contenido.
      data-initial-loader=""
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-secondary"
    >
      <motion.img
        src={assetUrl("/images/logo.png")}
        alt="TI.MO SOLUTIONS"
        className="h-24 w-24 rounded-2xl object-contain bg-white p-2"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="h-1 w-40 overflow-hidden rounded-full bg-white/15">
        <motion.div
          className="h-full w-full origin-left bg-accent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
