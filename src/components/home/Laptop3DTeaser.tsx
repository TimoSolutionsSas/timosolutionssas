import { motion } from "framer-motion";
import { FiArrowUpRight, FiBox } from "react-icons/fi";
import { fadeUp } from "@/animations/variants";
import { assetUrl } from "@/utils/assetUrl";

export function Laptop3DTeaser() {
  return (
    <section className="container-page py-4">
      <motion.a
        href={assetUrl("/laptop-3d")}
        target="_blank"
        rel="noopener noreferrer"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="group relative flex flex-col items-start gap-6 overflow-hidden rounded-3xl border border-border bg-secondary px-8 py-12 text-white sm:flex-row sm:items-center sm:justify-between sm:px-14"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.35), transparent 45%), radial-gradient(circle at 80% 70%, rgba(30,86,214,0.4), transparent 45%)",
          }}
        />

        <div className="relative max-w-xl">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            <FiBox /> Nuevo · Experiencia interactiva
          </span>
          <h3 className="mb-3 font-display text-2xl font-bold sm:text-3xl">
            Explora un portátil en 3D, por dentro
          </h3>
          <p className="text-white/70">
            Gira, acércate y descubre dónde viven la RAM, el SSD, la batería y
            el sistema de enfriamiento — una demo interactiva, 100% en tu
            navegador, sin instalar nada.
          </p>
        </div>

        <span className="focus-ring relative flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-secondary transition-transform group-hover:scale-105">
          Ver experiencia 3D
          <FiArrowUpRight />
        </span>
      </motion.a>
    </section>
  );
}
