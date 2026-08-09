import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCpu } from "react-icons/fi";
import { ENABLED_CATEGORIES } from "@/config/catalog";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export function Categories() {
  return (
    <section className="section-y bg-background-alt">
      <div className="container-page">
        <SectionHeading
          eyebrow="Categorías"
          title="Todo lo que tu equipo necesita"
          description="Explora por categoría, entre servicios técnicos y productos disponibles."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {ENABLED_CATEGORIES.map((cat) => (
            <motion.div key={cat.id} variants={fadeUp}>
              <Link
                to={`/catalogo?categoria=${cat.slug}`}
                className="focus-ring group relative flex h-40 flex-col justify-end overflow-hidden rounded-2xl border border-border shadow-card transition-shadow hover:shadow-card-hover"
              >
                <ImageWithFallback
                  src={cat.image}
                  alt={cat.name}
                  icon={<FiCpu size={28} />}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/20 to-transparent" />
                <span className="relative p-4 font-display text-sm font-semibold text-white sm:text-base">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
