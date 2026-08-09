import { motion } from "framer-motion";
import {
  FiSearch,
  FiTruck,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiMessageCircle,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import benefitsData from "@/data/benefits.json";
import type { Benefit } from "@/types/content";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { SectionHeading } from "@/components/common/SectionHeading";

const ICONS: Record<string, IconType> = {
  FiSearch,
  FiTruck,
  FiZap,
  FiShield,
  FiCheckCircle,
  FiMessageCircle,
};

const benefits = benefitsData as Benefit[];

export function Benefits() {
  return (
    <section className="section-y">
      <div className="container-page">
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Confianza técnica, de principio a fin"
          description="Trabajamos con transparencia en precios y tiempos, cuidando tus equipos y tu información como si fueran nuestros."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => {
            const Icon = ICONS[benefit.icon] ?? FiCheckCircle;
            return (
              <motion.div
                key={benefit.id}
                variants={fadeUp}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </span>
                <h3 className="font-display text-lg font-semibold">
                  {benefit.title}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
