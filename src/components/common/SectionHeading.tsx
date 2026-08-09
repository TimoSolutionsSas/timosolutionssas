import { motion } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { cn } from "@/utils/cn";
import type { SectionHeadingProps } from "@/interfaces/component-props";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={cn(
        "mx-auto mb-12 flex max-w-2xl flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-lg text-foreground-muted">{description}</p>
      )}
    </motion.div>
  );
}
