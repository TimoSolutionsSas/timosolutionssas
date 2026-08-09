import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/site";
import { fadeUp, slideInLeft, staggerContainer } from "@/animations/variants";
import { Button } from "@/components/common/Button";
import { HeroProductCarousel } from "./HeroProductCarousel";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pb-24 pt-32 text-white sm:pt-40">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container-page relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
          >
            Servicio técnico en Chía y la Sabana de Bogotá
          </motion.span>

          <motion.h1
            variants={slideInLeft}
            className="font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            Mantenimiento y tecnología
            <span className="text-accent"> para tu computador</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-lg text-lg text-white/75">
            Diagnóstico, mantenimiento, actualización de hardware y venta de
            repuestos y licencias originales. Recogemos y entregamos tu equipo
            donde estés.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 pt-2 sm:flex-row"
          >
            <Link to="/catalogo">
              <Button size="lg" icon={<FiArrowRight />} iconPosition="right" fullWidth>
                Ver catálogo
              </Button>
            </Link>
            <a
              href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="whatsapp"
                size="lg"
                icon={<FaWhatsapp size={20} />}
                fullWidth
              >
                Escríbenos
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <HeroProductCarousel />
        </motion.div>
      </div>
    </section>
  );
}
