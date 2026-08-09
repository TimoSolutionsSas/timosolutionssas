import faqsData from "@/data/faqs.json";
import type { FAQ } from "@/types/content";
import { SectionHeading } from "@/components/common/SectionHeading";
import { FAQAccordion } from "@/components/common/FAQAccordion";

const faqs = faqsData as FAQ[];

export function FAQSection() {
  return (
    <section className="section-y">
      <div className="container-page mx-auto max-w-3xl">
        <SectionHeading eyebrow="Preguntas frecuentes" title="¿Tienes dudas?" />
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}
