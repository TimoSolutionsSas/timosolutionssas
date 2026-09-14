import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SEO } from "@/components/common/SEO";
import { DsmHero } from "@/components/declara/DsmHero";
import { DsmProblema } from "@/components/declara/DsmProblema";
import { DsmBisagra } from "@/components/declara/DsmBisagra";
import { DsmRecorrido } from "@/components/declara/DsmRecorrido";
import { DsmProducto } from "@/components/declara/DsmProducto";
import { DsmConfianza } from "@/components/declara/DsmConfianza";
import { DsmPrecios } from "@/components/declara/DsmPrecios";
import { buildWhatsAppUrl, SITE } from "@/config/site";
import { assetUrl } from "@/utils/assetUrl";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/utils/cn";

/**
 * Página de producto de DeclaraSinMiedo. Va fuera de MainLayout a propósito:
 * es una marca de producto propia dentro de TI.MO SOLUTIONS y necesita su
 * propia identidad visual (serifa institucional, paleta marino de la app).
 */
export default function DeclaraSinMiedo() {
  const scrolled = useScrollPosition(80);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="DeclaraSinMiedo"
        description="Software que hace el 90% mecánico de una declaración de renta en Colombia: lee tus certificados, los cruza contra tu información exógena de la DIAN y calcula tu Formulario 210 explicando cada cifra. Funciona 100% local, sin nube."
        path="/declarasinmiedo"
      />

      {/* Barra superior */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "bg-[#071d42]/95 shadow-lg backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link
            to="/"
            className="focus-ring flex items-center gap-2 font-sans text-[13px] font-medium text-white/70 transition-colors hover:text-white"
          >
            <FiArrowLeft size={15} />
            <img
              src={assetUrl("/images/logo.png")}
              alt={SITE.name}
              className="h-6 w-6 rounded bg-white object-contain p-0.5"
            />
            <span className="hidden sm:inline">TI.MO SOLUTIONS</span>
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="#precios"
              className="focus-ring hidden rounded-md px-3 py-2 font-sans text-[13px] font-medium text-white/75 transition-colors hover:text-white sm:block"
            >
              Precios
            </a>
            <a
              href={buildWhatsAppUrl(
                "Hola, vi la página de DeclaraSinMiedo y quiero agendar una demostración de la aplicación."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-md bg-[#1668d6] px-4 py-2 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#1257b4]"
            >
              <FaWhatsapp size={14} />
              Agendar demostración
            </a>
          </div>
        </div>
      </div>

      <main>
        <DsmHero />
        <DsmProblema />
        <DsmBisagra />
        <DsmRecorrido />
        <DsmProducto />
        <DsmConfianza />
        <DsmPrecios />

        {/* Cierre */}
        <section className="bg-[#071d42] py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="max-w-[20ch] font-serif text-3xl font-semibold leading-tight text-white sm:text-[40px]">
              La mecánica interna se muestra en demostración
            </h2>
            <p className="mt-5 max-w-[58ch] font-sans text-[15.5px] leading-relaxed text-[#b8cbe6]">
              Los criterios de clasificación y el detalle de la interfaz son el activo diferencial del
              producto, y se enseñan en una demostración controlada. Escríbenos y la agendamos.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl(
                  "Hola, vi la página de DeclaraSinMiedo y quiero agendar una demostración de la aplicación."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3 font-sans text-[14px] font-semibold text-[#071d42] transition-colors hover:bg-[#dce8f8]"
              >
                <FaWhatsapp size={16} />
                Agendar por WhatsApp
              </a>
              <a
                href={`mailto:${SITE.email}?subject=Demostraci%C3%B3n%20de%20DeclaraSinMiedo`}
                className="focus-ring inline-flex items-center gap-2.5 rounded-md border border-white/25 px-6 py-3 font-sans text-[14px] font-semibold text-white transition-colors hover:border-white/60"
              >
                <FiMail size={16} />
                {SITE.email}
              </a>
            </div>

            <div className="mt-16 border-t border-white/15 pt-8">
              <p className="font-sans text-[13px] leading-relaxed text-[#8fa8c6]">
                DeclaraSinMiedo es un producto de {SITE.legalName} — Jonny Alejandro Timote Moya, CEO,
                fundador y desarrollador. Las pantallas mostradas en esta página son representaciones
                ilustrativas del flujo de la aplicación con cifras de ejemplo; no corresponden a
                ningún contribuyente real. Precios en pesos colombianos.
              </p>
              <Link
                to="/"
                className="focus-ring mt-5 inline-flex items-center gap-2 font-sans text-[13px] font-medium text-[#7fb0f5] hover:text-white"
              >
                <FiArrowLeft size={14} />
                Volver a TI.MO SOLUTIONS
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
