import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { fadeUp, slideInRight, staggerContainer } from "@/animations/variants";
import { assetUrl } from "@/utils/assetUrl";
import { SITE } from "@/config/site";

export function CompanyIntro() {
  return (
    <section className="section-y bg-background-alt">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <img
            src={assetUrl("/images/logo.png")}
            alt={SITE.name}
            className="relative h-56 w-56 rounded-3xl bg-white object-contain p-6 shadow-card-hover"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary"
          >
            Quiénes somos
          </motion.span>
          <motion.h2
            variants={slideInRight}
            className="mb-4 font-display text-3xl font-bold sm:text-4xl"
          >
            Un equipo técnico enfocado en resolver, no en complicar
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-4 text-lg text-foreground-muted">
            En TI.MO SOLUTIONS nos dedicamos al mantenimiento, actualización y
            venta de tecnología para computadores portátiles y de escritorio.
            Atendemos a personas y pequeñas empresas de Chía y la Sabana de
            Bogotá con diagnósticos claros y precios honestos.
          </motion.p>
          <motion.p variants={fadeUp} className="mb-6 text-lg text-foreground-muted">
            Sabemos que tu equipo guarda información importante: por eso
            trabajamos con cuidado, te explicamos qué le hacemos y te
            entregamos cada servicio respaldado por garantía.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              to="/nosotros"
              className="focus-ring inline-flex items-center gap-2 font-semibold text-primary hover:gap-3"
            >
              Conoce más sobre nosotros <FiArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
