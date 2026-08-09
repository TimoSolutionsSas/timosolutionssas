import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/site";

export function WhatsAppButton() {
  return (
    <motion.a
      href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="focus-ring fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card-hover"
    >
      <FaWhatsapp size={28} />
    </motion.a>
  );
}
