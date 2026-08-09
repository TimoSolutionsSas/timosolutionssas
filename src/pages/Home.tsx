import { SEO } from "@/components/common/SEO";
import { Hero } from "@/components/home/Hero";
import { CompanyIntro } from "@/components/home/CompanyIntro";
import { Benefits } from "@/components/home/Benefits";
import { Laptop3DTeaser } from "@/components/home/Laptop3DTeaser";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { Categories } from "@/components/home/Categories";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";

export function Home() {
  return (
    <>
      <SEO
        title="Inicio"
        description="Mantenimiento, actualización y venta de software y hardware para computadores portátiles y de escritorio en Chía y la Sabana de Bogotá. Diagnóstico básico gratis."
        path="/"
      />
      <Hero />
      <CompanyIntro />
      <Benefits />
      <Laptop3DTeaser />
      <FeaturedItems />
      <Categories />
      <PromoBanner />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  );
}
