import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { productRepository } from "@/services/productRepository";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/product/Card";

export function FeaturedItems() {
  const items = productRepository.getFeatured(8);
  if (items.length === 0) return null;

  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Destacados"
          title="Servicios y productos más solicitados"
          description="Una selección de lo que nuestros clientes más piden. Puedes ver el catálogo completo en cualquier momento."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <ProductCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/catalogo"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Ver catálogo completo <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
