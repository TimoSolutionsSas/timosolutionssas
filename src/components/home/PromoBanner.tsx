import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/site";
import { fadeUp } from "@/animations/variants";
import { Button } from "@/components/common/Button";

export function PromoBanner() {
  return (
    <section className="container-page py-4">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-hero-gradient px-8 py-12 text-white sm:px-14 sm:py-16"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="mb-3 font-display text-2xl font-bold sm:text-3xl">
              Tu diagnóstico básico no tiene costo
            </h3>
            <p className="text-white/75">
              Revisamos tu equipo sin abrirlo y te contamos exactamente qué
              necesita, antes de cobrarte cualquier cosa. Cotiza por
              WhatsApp y coordinamos recogida en Chía y la Sabana de Bogotá.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl(WHATSAPP_MESSAGES.contacto)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <Button variant="whatsapp" size="lg" icon={<FaWhatsapp size={20} />}>
              Solicitar diagnóstico
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
