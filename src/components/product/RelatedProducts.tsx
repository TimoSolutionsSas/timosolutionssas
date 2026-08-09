import { motion } from "framer-motion";
import type { CatalogItem } from "@/types/product";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { ProductCard } from "@/components/product/Card";

export function RelatedProducts({ items }: { items: CatalogItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="section-y">
      <div className="container-page">
        <h2 className="mb-8 font-display text-2xl font-bold sm:text-3xl">
          También te puede interesar
        </h2>
        <motion.div
          key={items.map((i) => i.id).join("-")}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <ProductCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
