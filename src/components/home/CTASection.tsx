import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { fadeUp } from "@/animations/variants";
import { Button } from "@/components/common/Button";

export function CTASection() {
  return (
    <section className="section-y">
      <div className="container-page">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-background-alt px-8 py-16 text-center"
        >
          <h2 className="max-w-xl font-display text-3xl font-bold sm:text-4xl">
            ¿Tu equipo necesita una mano experta?
          </h2>
          <p className="max-w-lg text-lg text-foreground-muted">
            Cuéntanos qué te pasa y te ayudamos a resolverlo, con precios
            claros y garantía en cada trabajo.
          </p>
          <Link to="/contacto">
            <Button size="lg" icon={<FiArrowRight />} iconPosition="right">
              Contáctanos ahora
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
