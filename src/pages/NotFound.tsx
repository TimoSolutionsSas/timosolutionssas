import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import { SEO } from "@/components/common/SEO";
import { Button } from "@/components/common/Button";
import { fadeUp, staggerContainer } from "@/animations/variants";

export function NotFound() {
  return (
    <>
      <SEO
        title="Página no encontrada"
        description="La página que buscas no existe o fue movida."
        path="/404"
        noindex
      />
      <section className="flex min-h-[80vh] items-center justify-center px-4 pt-20">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="font-display text-8xl font-bold text-primary/20"
          >
            404
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl font-bold sm:text-4xl"
          >
            Esta página no existe
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-md text-foreground-muted">
            Puede que el enlace esté roto o que la página haya sido movida.
            Volvamos al inicio.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link to="/">
              <Button icon={<FiArrowLeft />}>Volver al inicio</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
