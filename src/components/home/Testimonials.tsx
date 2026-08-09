import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import testimonialsData from "@/data/testimonials.json";
import type { Testimonial } from "@/types/content";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

const testimonials = testimonialsData as Testimonial[];

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-y bg-background-alt">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen nuestros clientes"
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeUp}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6"
            >
              <div className="flex gap-1 text-warning">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FiStar key={i} fill="currentColor" />
                ))}
              </div>
              <p className="flex-1 text-foreground-muted">
                “{testimonial.quote}”
              </p>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-foreground-muted">
                    {[testimonial.role, testimonial.city]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
